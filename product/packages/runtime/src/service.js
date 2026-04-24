import { createId } from "../../shared/src/ids.js";

export class RuntimeService {
  constructor(store) {
    this.store = store;
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
      this.persist();
      return run;
    }

    run.outputs.push({
      id: createId(),
      step_id: step.id,
      created_at: new Date().toISOString(),
      summary: `${step.label} executado em modo local de desenvolvimento`
    });
    run.history.push({
      at: new Date().toISOString(),
      event: "step.completed",
      message: `${step.id} concluído`
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
      active_runs: this.store.runs.filter((run) => ["queued", "running", "waiting_checkpoint"].includes(run.status)).length
    };
  }
}
