import { createId } from "../../shared/src/ids.js";
import { runToolBinding } from "../../tools/src/runner.js";

export class RuntimeService {
  constructor(store) {
    this.store = store;
  }

  recordAuditEvent(event) {
    const entry = {
      id: createId(),
      created_at: new Date().toISOString(),
      ...event
    };

    this.store.audit_events ??= [];
    this.store.audit_events.push(entry);

    return entry;
  }

  listRuns(status) {
    this.reconcileQueue();

    if (!status) {
      return this.store.runs;
    }

    return this.store.runs.filter((run) => run.status === status);
  }

  getRun(runId) {
    return this.store.runs.find((run) => run.id === runId);
  }

  claimNextRunnableRun() {
    this.reconcileQueue();

    const queuedRunId = this.store.queue.shift();

    if (queuedRunId) {
      const queuedRun = this.getRun(queuedRunId);

      if (queuedRun && ["queued", "running"].includes(queuedRun.status)) {
        this.persist();
        return queuedRun;
      }
    }

    const fallback = this.store.runs.find((run) => ["queued", "running"].includes(run.status));

    if (fallback && !this.store.queue.includes(fallback.id)) {
      this.store.queue.push(fallback.id);
      this.persist();
    }

    return fallback;
  }

  tickRun(runId) {
    const run = this.getRun(runId);

    if (!run) {
      throw new Error("Run not found");
    }

    if (run.status === "waiting_checkpoint") {
      return run;
    }

    if (run.status === "queued") {
      run.status = "running";
      run.started_at ??= new Date().toISOString();
      run.history.push({
        at: new Date().toISOString(),
        event: "run.started",
        message: "Worker iniciou o run"
      });
      this.recordAuditEvent({
        event: "run.started",
        subject_kind: "run",
        subject_id: run.id,
        actor: "worker",
        workspace_slug: run.workspace_slug,
        details: {
          squad_slug: run.squad_slug
        }
      });
    }

    const step = run.steps[run.pointer];

    if (!step) {
      run.status = "succeeded";
      run.completed_at = new Date().toISOString();
      this.dequeueRun(run.id);
      run.history.push({
        at: new Date().toISOString(),
        event: "run.completed",
        message: "Run concluído com sucesso"
      });
      this.recordAuditEvent({
        event: "run.completed",
        subject_kind: "run",
        subject_id: run.id,
        actor: "worker",
        workspace_slug: run.workspace_slug,
        details: {
          squad_slug: run.squad_slug
        }
      });
      this.persist();
      return run;
    }

    run.current_step_id = step.id;

    if (step.requiresCheckpoint || step.kind === "checkpoint") {
      const checkpoint = {
        id: createId(),
        run_id: run.id,
        step_id: step.id,
        status: "pending",
        risk_level: step.risk_level ?? "medium",
        reason: step.label,
        on_reject: step.on_reject ?? null,
        created_at: new Date().toISOString()
      };

      run.status = "waiting_checkpoint";
      this.dequeueRun(run.id);
      run.checkpoints.push(checkpoint);
      this.store.checkpoints.push(checkpoint);
      run.history.push({
        at: new Date().toISOString(),
        event: "checkpoint.created",
        message: `Checkpoint criado para ${step.id}`
      });
      this.recordAuditEvent({
        event: "checkpoint.created",
        subject_kind: "checkpoint",
        subject_id: checkpoint.id,
        actor: "worker",
        workspace_slug: run.workspace_slug,
        details: {
          run_id: run.id,
          step_id: step.id,
          risk_level: checkpoint.risk_level
        }
      });
      this.persist();
      return run;
    }

    const stepOutputs = this.executeStep(step, run);

    for (const output of stepOutputs) {
      run.outputs.push(output);
    }
    run.history.push({
      at: new Date().toISOString(),
      event: "step.completed",
      message: `${step.id} concluído`
    });
    this.recordAuditEvent({
      event: "step.completed",
      subject_kind: "run",
      subject_id: run.id,
      actor: "worker",
      workspace_slug: run.workspace_slug,
      details: {
        step_id: step.id
      }
    });
    run.pointer += 1;
    run.current_step_id = run.steps[run.pointer]?.id ?? null;

    if (!run.steps[run.pointer]) {
      run.status = "succeeded";
      run.completed_at = new Date().toISOString();
      this.dequeueRun(run.id);
      run.history.push({
        at: new Date().toISOString(),
        event: "run.completed",
        message: "Run concluído com sucesso"
      });
      this.recordAuditEvent({
        event: "run.completed",
        subject_kind: "run",
        subject_id: run.id,
        actor: "worker",
        workspace_slug: run.workspace_slug,
        details: {
          squad_slug: run.squad_slug
        }
      });
    }

    this.persist();
    return run;
  }

  decideCheckpoint(checkpointId, decision, actor, comment = "") {
    const checkpoint = this.store.checkpoints.find((candidate) => candidate.id === checkpointId);

    if (!checkpoint) {
      throw new Error("Checkpoint not found");
    }

    if (checkpoint.status !== "pending") {
      throw new Error("Checkpoint already decided");
    }

    const run = this.getRun(checkpoint.run_id);
    const step = run.steps.find((candidate) => candidate.id === checkpoint.step_id);

    checkpoint.status = decision;

    const approval = {
      id: createId(),
      target_kind: "checkpoint",
      target_id: checkpointId,
      decision,
      actor,
      comment,
      created_at: new Date().toISOString()
    };

    run.approvals.push(approval);
    this.store.approvals.push(approval);
    this.recordAuditEvent({
      event: `checkpoint.${decision}`,
      subject_kind: "checkpoint",
      subject_id: checkpointId,
      actor,
      workspace_slug: run.workspace_slug,
      details: {
        run_id: run.id,
        step_id: step.id,
        comment
      }
    });

    if (decision === "approved") {
      run.status = "queued";
      run.pointer += 1;
      this.enqueueRun(run.id);
      run.history.push({
        at: new Date().toISOString(),
        event: "checkpoint.approved",
        message: `${step.id} aprovado por ${actor}`
      });
      run.outputs.push({
        id: createId(),
        step_id: step.id,
        created_at: new Date().toISOString(),
        summary: `${step.label} aprovado para seguir`
      });
    } else {
      const fallbackStepId = checkpoint.on_reject;
      const fallbackIndex = run.steps.findIndex((candidate) => candidate.id === fallbackStepId);
      run.pointer = fallbackIndex >= 0 ? fallbackIndex : 0;
      run.status = "queued";
      this.enqueueRun(run.id);
      run.history.push({
        at: new Date().toISOString(),
        event: "checkpoint.rejected",
        message: `${step.id} rejeitado por ${actor}`
      });
      run.outputs.push({
        id: createId(),
        step_id: step.id,
        created_at: new Date().toISOString(),
        summary: `${step.label} rejeitado; run voltou para ${run.steps[run.pointer].id}`
      });
    }

    run.current_step_id = run.steps[run.pointer]?.id ?? null;
    this.persist();

    return {
      checkpoint,
      approval,
      run
    };
  }

  executeStep(step, run) {
    if (step.kind === "tool" || step.executor === "tool-runner" || step.executor === "subagent") {
      return this.executeToolStep(step, run);
    }

    return [
      {
        id: createId(),
        step_id: step.id,
        created_at: new Date().toISOString(),
        summary: `${step.label} executado em modo local de desenvolvimento`,
        artifact_type: "text_note"
      }
    ];
  }

  executeToolStep(step, run) {
    const toolSlugs = step.tool_slugs ?? this.inferToolSlugs(step, run);
    const optionalToolSlugs = step.optional_tool_slugs ?? this.inferOptionalToolSlugs(step, run);

    if (toolSlugs.length === 0) {
      return [
        {
          id: createId(),
          step_id: step.id,
          created_at: new Date().toISOString(),
          summary: `${step.label} executado em modo local de desenvolvimento`,
          artifact_type: "text_note"
        }
      ];
    }

    const allowedTools = new Set(
      this.store.capabilities
        .filter((capability) => capability.workspace_slug === run.workspace_slug)
        .flatMap((capability) => capability.allowed_tools)
    );

    const outputs = [];

    for (const toolSlug of toolSlugs) {
      if (!allowedTools.has(toolSlug)) {
        throw new Error(`Tool not allowed for workspace ${run.workspace_slug}: ${toolSlug}`);
      }

      const artifact = runToolBinding(toolSlug, {
        run_id: run.id,
        squad_slug: run.squad_slug,
        workspace_slug: run.workspace_slug,
        step_id: step.id
      });

      outputs.push({
        id: createId(),
        step_id: step.id,
        created_at: new Date().toISOString(),
        tool_slug: toolSlug,
        artifact_type: artifact.artifact_type,
        summary: artifact.summary,
        details: artifact.details
      });
    }

    for (const toolSlug of optionalToolSlugs) {
      if (!allowedTools.has(toolSlug)) {
        outputs.push({
          id: createId(),
          step_id: step.id,
          created_at: new Date().toISOString(),
          tool_slug: toolSlug,
          artifact_type: "optional_tool_skipped",
          summary: `${toolSlug} adiado para fase posterior`
        });
        continue;
      }

      const artifact = runToolBinding(toolSlug, {
        run_id: run.id,
        squad_slug: run.squad_slug,
        workspace_slug: run.workspace_slug,
        step_id: step.id
      });

      outputs.push({
        id: createId(),
        step_id: step.id,
        created_at: new Date().toISOString(),
        tool_slug: toolSlug,
        artifact_type: artifact.artifact_type,
        summary: artifact.summary,
        details: artifact.details
      });
    }

    return outputs;
  }

  inferToolSlugs(step, run) {
    const fallbackBindings = {
      "marketing-dozecrew": {
        "coleta-dados": ["ga4", "woocommerce", "hotjar"],
        "pesquisa-mercado": ["apify"],
        "design-visual": ["canva"],
        "publicacao": ["instagram-publisher"]
      },
      "inteligencia-dozecrew": {
        "analise-ecommerce": ["ga4", "woocommerce", "hotjar"],
        "analise-social": ["meta-insights", "apify"]
      }
    };

    return fallbackBindings[run.squad_slug]?.[step.id] ?? [];
  }

  inferOptionalToolSlugs(step, run) {
    if (run.squad_slug === "marketing-dozecrew" && step.id === "publicacao") {
      return ["blotato"];
    }

    return [];
  }

  enqueueRun(runId) {
    if (!this.store.queue.includes(runId)) {
      this.store.queue.push(runId);
    }
  }

  dequeueRun(runId) {
    this.store.queue = this.store.queue.filter((candidate) => candidate !== runId);
  }

  reconcileQueue() {
    const activeRunIds = new Set(
      this.store.runs
        .filter((run) => ["queued", "running"].includes(run.status))
        .map((run) => run.id)
    );

    const filtered = this.store.queue.filter((runId) => activeRunIds.has(runId));
    const missing = this.store.runs
      .filter((run) => ["queued", "running"].includes(run.status))
      .map((run) => run.id)
      .filter((runId) => !filtered.includes(runId));

    this.store.queue = [...filtered, ...missing];
  }

  persist() {
    this.store.persist?.();
  }

  getRuntimeStatus() {
    return {
      queue_length: this.store.queue.length,
      ollama: this.store.runtime.ollama,
      active_runs: this.store.runs.filter((run) => ["queued", "running", "waiting_checkpoint"].includes(run.status)).length,
      audit_events: this.store.audit_events?.length ?? 0
    };
  }
}
