import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const productRoot = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
const stateDir = mkdtempSync(path.join(tmpdir(), "openclow-e2e-"));
const statePath = path.join(stateDir, "runtime-state.json");
const queuePath = path.join(stateDir, "queue.json");
const artifactsIndexPath = path.join(stateDir, "artifacts.json");
const artifactsDir = path.join(stateDir, "artifacts");
const port = 3201;
const baseUrl = `http://127.0.0.1:${port}`;

function log(message) {
  console.log(`[e2e] ${message}`);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function requestJson(pathname, options = {}) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    headers: {
      "content-type": "application/json",
      ...(options.headers ?? {})
    },
    ...options
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error ?? `HTTP ${response.status}`);
  }

  return payload;
}

function assertDurableStorage() {
  assert(existsSync(statePath), "Persistent state file should exist");
  assert(existsSync(queuePath), "Persistent queue file should exist");
  assert(existsSync(artifactsIndexPath), "Persistent artifact index should exist");
  assert(existsSync(artifactsDir), "Persistent artifact directory should exist");
}

async function waitForHealth() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const payload = await requestJson("/healthz");
      if (payload.ok) {
        return;
      }
    } catch {
      // keep waiting
    }

    await delay(250);
  }

  throw new Error("API did not become healthy in time");
}

function startApi() {
  const child = spawn("node", ["apps/api/src/server.js"], {
    cwd: productRoot,
    env: {
      ...process.env,
      OPENCLOW_API_PORT: String(port),
      OPENCLOW_STATE_PATH: statePath,
      OPENCLOW_OLLAMA_BASE_URL: ""
    },
    stdio: ["ignore", "pipe", "pipe"]
  });

  child.stdout.on("data", (chunk) => process.stdout.write(`[api] ${chunk}`));
  child.stderr.on("data", (chunk) => process.stderr.write(`[api] ${chunk}`));

  return child;
}

async function stop(child) {
  if (!child || child.killed) {
    return;
  }

  child.kill("SIGTERM");
  await delay(250);

  if (!child.killed) {
    child.kill("SIGKILL");
  }
}

async function restartApi(child) {
  await stop(child);
  const restarted = startApi();
  await waitForHealth();
  return restarted;
}

async function driveCheckpointedRun(runId, options = {}) {
  const expectedCheckpoints = options.expectedCheckpoints ?? 1;
  let checkpointsApproved = 0;

  for (let i = 0; i < 40; i += 1) {
    const run = await requestJson(`/v1/runs/${runId}`);

    if (run.status === "waiting_checkpoint") {
      const checkpoints = await requestJson("/v1/checkpoints");
      const pending = checkpoints.items.find((item) => item.run_id === runId && item.status === "pending");

      assert(pending, `Expected pending checkpoint for run ${runId}`);

      await requestJson(`/v1/checkpoints/${pending.id}/approve`, {
        method: "POST",
        body: JSON.stringify({
          actor: options.actor ?? "e2e",
          comment: options.comment ?? "approved by staging-first harness"
        })
      });

      checkpointsApproved += 1;
      continue;
    }

    if (run.status === "queued" || run.status === "running") {
      await requestJson(`/v1/worker/runs/${runId}/tick`, {
        method: "POST"
      });
      continue;
    }

    if (run.status === "succeeded") {
      assert(
        checkpointsApproved >= expectedCheckpoints,
        `Expected at least ${expectedCheckpoints} checkpoints, got ${checkpointsApproved}`
      );
      return run;
    }

    if (run.status === "failed" || run.status === "cancelled") {
      throw new Error(`Run ${runId} ended in ${run.status}`);
    }
  }

  throw new Error(`Run ${runId} did not complete in time`);
}

async function runMarketingScenario() {
  log("marketing scenario");
  const run = await requestJson("/v1/runs", {
    method: "POST",
    body: JSON.stringify({
      squad_slug: "marketing-dozecrew",
      workspace_slug: "doze",
      requested_by: "e2e"
    })
  });

  const completed = await driveCheckpointedRun(run.id, { expectedCheckpoints: 2 });
  assert(completed.status === "succeeded", "Marketing run did not finish successfully");

  const outputs = await requestJson(`/v1/runs/${run.id}/outputs`);
  assert(outputs.items.length >= 3, "Marketing run should produce outputs");

  const artifacts = await requestJson(`/v1/runs/${run.id}/artifacts`);
  assert(artifacts.items.length > 0, "Marketing run artifacts should persist");
  assert(
    artifacts.items.some((artifact) => artifact.artifact_type === "performance_report"),
    "Marketing run should persist at least one step artifact"
  );

  const history = await requestJson("/v1/history");
  assert(
    history.items.some((event) => event.run_id === run.id && event.event === "run.completed"),
    "Marketing run history missing completion event"
  );

  return run.id;
}

async function runIntelligenceScenario() {
  log("intelligence scenario");
  const run = await requestJson("/v1/runs", {
    method: "POST",
    body: JSON.stringify({
      squad_slug: "inteligencia-dozecrew",
      workspace_slug: "doze",
      requested_by: "e2e"
    })
  });

  const completed = await driveCheckpointedRun(run.id, { expectedCheckpoints: 0 });
  assert(completed.status === "succeeded", "Intelligence run did not finish successfully");

  const outputs = await requestJson(`/v1/runs/${run.id}/outputs`);
  assert(outputs.items.length >= 3, "Intelligence run should produce outputs");

  const artifacts = await requestJson(`/v1/runs/${run.id}/artifacts`);
  assert(artifacts.items.length > 0, "Intelligence run artifacts should persist");
  assert(
    artifacts.items.some((artifact) => artifact.artifact_type === "commerce_report" || artifact.artifact_type === "social_signal_report"),
    "Intelligence run should persist at least one step artifact"
  );

  return run.id;
}

async function runPromotionScenario() {
  log("promotion scenario");
  const capability = await requestJson("/v1/capabilities", {
    method: "POST",
    body: JSON.stringify({
      kind: "tool",
      slug: "e2e-temp-tool",
      workspace_slug: "doze",
      version: "1.0.0",
      risk_level: "low",
      allowed_tools: ["ga4"],
      name: "E2E Temp Tool",
      summary: "Temporary capability used by the E2E harness",
      requested_by: "e2e"
    })
  });

  const stagingPromotion = await requestJson(`/v1/capabilities/${capability.id}/promotions`, {
    method: "POST",
    body: JSON.stringify({
      target_status: "staging",
      requested_by: "e2e",
      reason: "staging-first harness"
    })
  });

  await requestJson(`/v1/promotions/${stagingPromotion.id}/approve`, {
    method: "POST",
    body: JSON.stringify({
      actor: "e2e",
      comment: "approved for staging"
    })
  });

  const staged = await requestJson(`/v1/capabilities/${capability.id}`);
  assert(staged.status === "staging", "Capability should be in staging after approval");

  const rollbackPromotion = await requestJson(`/v1/capabilities/${capability.id}/promotions`, {
    method: "POST",
    body: JSON.stringify({
      target_status: "draft",
      requested_by: "e2e",
      reason: "rollback after staging verification"
    })
  });

  await requestJson(`/v1/promotions/${rollbackPromotion.id}/approve`, {
    method: "POST",
    body: JSON.stringify({
      actor: "e2e",
      comment: "approved rollback"
    })
  });

  const rolledBack = await requestJson(`/v1/capabilities/${capability.id}`);
  assert(rolledBack.status === "draft", "Capability should return to draft after rollback");
}

async function runRestartRecoveryScenario(apiProcess) {
  log("restart recovery scenario");
  const run = await requestJson("/v1/runs", {
    method: "POST",
    body: JSON.stringify({
      squad_slug: "inteligencia-dozecrew",
      workspace_slug: "doze",
      requested_by: "e2e"
    })
  });

  while (true) {
    const current = await requestJson(`/v1/runs/${run.id}`);

    if (current.status === "waiting_checkpoint") {
      break;
    }

    await requestJson(`/v1/worker/runs/${run.id}/tick`, {
      method: "POST"
    });
  }

  const beforeRestart = await requestJson(`/v1/runs/${run.id}`);
  assert(beforeRestart.status === "waiting_checkpoint", "Run should be waiting on checkpoint before restart");

  apiProcess = await restartApi(apiProcess);

  const afterRestart = await requestJson(`/v1/runs/${run.id}`);
  assert(afterRestart.status === "waiting_checkpoint", "Run state should survive restart");

  const checkpoints = await requestJson("/v1/checkpoints");
  const pending = checkpoints.items.find((item) => item.run_id === run.id && item.status === "pending");
  assert(pending, "Checkpoint should still exist after restart");

  await requestJson(`/v1/checkpoints/${pending.id}/approve`, {
    method: "POST",
    body: JSON.stringify({
      actor: "e2e",
      comment: "approved after restart"
    })
  });

  const completed = await driveCheckpointedRun(run.id, { expectedCheckpoints: 0 });
  assert(completed.status === "succeeded", "Run should complete after restart recovery");

  assertDurableStorage();

  return apiProcess;
}

async function main() {
  const apiProcess = startApi();

  try {
    await waitForHealth();

    const marketingRunId = await runMarketingScenario();
    const intelligenceRunId = await runIntelligenceScenario();
    await runPromotionScenario();
    const restartedApi = await runRestartRecoveryScenario(apiProcess);

    const audit = await requestJson("/v1/audit");
    assert(
      audit.items.some((event) => event.event === "promotion.approved"),
      "Audit trail should include promotion approval"
    );
    assert(
      audit.items.some((event) => event.event === "checkpoint.approved"),
      "Audit trail should include checkpoint approval"
    );
    assert(
      audit.items.some((event) => event.event === "run.completed"),
      "Audit trail should include completed runs"
    );

    const runtime = await requestJson("/v1/runtime");
    assert(runtime.queue_path, "Runtime should expose durable queue path");
    assert(runtime.artifacts_index_path, "Runtime should expose artifact index path");
    assert(runtime.runtime.artifact_count > 0, "Runtime should report persisted artifacts");

    log(`marketing run: ${marketingRunId}`);
    log(`intelligence run: ${intelligenceRunId}`);
    log("all scenarios passed");

    await stop(restartedApi);
  } finally {
    await stop(apiProcess);
    rmSync(stateDir, { recursive: true, force: true });
  }
}

await main();
