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
const dashboardPort = 3202;
const baseUrl = `http://127.0.0.1:${port}`;
const dashboardBaseUrl = `http://127.0.0.1:${dashboardPort}`;

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

async function requestText(base, pathname) {
  const response = await fetch(`${base}${pathname}`);
  const payload = await response.text();

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
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

async function waitForDashboard() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const payload = await requestText(dashboardBaseUrl, "/");
      if (payload.includes("OpenClow Local Control Plane")) {
        return;
      }
    } catch {
      // keep waiting
    }

    await delay(250);
  }

  throw new Error("Dashboard did not become available in time");
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

function startDashboard() {
  const child = spawn("node", ["apps/dashboard/src/server.js"], {
    cwd: productRoot,
    env: {
      ...process.env,
      OPENCLOW_DASHBOARD_PORT: String(dashboardPort),
      OPENCLOW_API_BASE: baseUrl
    },
    stdio: ["ignore", "pipe", "pipe"]
  });

  child.stdout.on("data", (chunk) => process.stdout.write(`[dashboard] ${chunk}`));
  child.stderr.on("data", (chunk) => process.stderr.write(`[dashboard] ${chunk}`));

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

async function runCreativeScenario() {
  log("creative scenario");

  const squads = await requestJson("/v1/squads");
  assert(
    squads.items.some((item) => item.slug === "creative-control"),
    "Creative control squad should be listed by the API"
  );
  assert(
    squads.items.some((item) => item.slug === "reference-lab"),
    "Reference lab squad should be listed by the API"
  );
  assert(
    squads.items.some((item) => item.slug === "creative-qa"),
    "Creative QA squad should be listed by the API"
  );
  assert(
    squads.items.some((item) => item.slug === "creative-image"),
    "Creative image squad should be listed by the API"
  );

  const referenceRun = await requestJson("/v1/runs", {
    method: "POST",
    body: JSON.stringify({
      squad_slug: "reference-lab",
      workspace_slug: "doze",
      requested_by: "e2e",
      intent_kind: "creative-image",
      machine_profile: "balanced",
      environment_scope: "local-dev",
      request_context: {
        brand_slug: "doze-crew",
        campaign_slug: "spring-drop",
        reference_urls: [
          "https://example.com/ref-1",
          "https://example.com/ref-2"
        ],
        style_direction: "modern-underground"
      }
    })
  });

  const completedReference = await driveCheckpointedRun(referenceRun.id, { expectedCheckpoints: 0 });
  assert(completedReference.status === "succeeded", "Reference lab run did not finish successfully");

  const referenceOutputs = await requestJson(`/v1/runs/${referenceRun.id}/outputs`);
  assert(
    referenceOutputs.items.some((item) => item.artifact_type === "reference_pack"),
    "Reference lab should produce a reference pack artifact"
  );
  assert(
    referenceOutputs.items.some((item) => item.artifact_type === "style_signals"),
    "Reference lab should produce style signals"
  );

  const controlRun = await requestJson("/v1/runs", {
    method: "POST",
    body: JSON.stringify({
      squad_slug: "creative-control",
      workspace_slug: "doze",
      requested_by: "e2e",
      intent_kind: "creative-image",
      machine_profile: "balanced",
      environment_scope: "staging",
      request_context: {
        brand_slug: "doze-crew",
        campaign_slug: "spring-drop",
        channel: "instagram",
        style_direction: "modern-underground"
      }
    })
  });

  const completedControl = await driveCheckpointedRun(controlRun.id, { expectedCheckpoints: 1 });
  assert(completedControl.status === "succeeded", "Creative control run did not finish successfully");

  const controlOutputs = await requestJson(`/v1/runs/${controlRun.id}/outputs`);
  assert(
    controlOutputs.items.some((item) => item.artifact_type === "brand_context"),
    "Creative control should produce brand context"
  );
  assert(
    controlOutputs.items.some((item) => item.artifact_type === "creative_intent"),
    "Creative control should produce creative intent"
  );
  assert(
    controlOutputs.items.some((item) => item.artifact_type === "approval_packet"),
    "Creative control should produce approval packet"
  );

  const imageRun = await requestJson("/v1/runs", {
    method: "POST",
    body: JSON.stringify({
      squad_slug: "creative-image",
      workspace_slug: "doze",
      requested_by: "e2e",
      intent_kind: "creative-image",
      machine_profile: "balanced",
      environment_scope: "staging",
      request_context: {
        brand_slug: "doze-crew",
        campaign_slug: "spring-drop",
        channel: "instagram",
        style_direction: "modern-underground",
        output_format: "carousel",
        frame_count: 3,
        accent_color: "#ff4d4f"
      }
    })
  });

  const completedImage = await driveCheckpointedRun(imageRun.id, { expectedCheckpoints: 1 });
  assert(completedImage.status === "succeeded", "Creative image run did not finish successfully");

  const imageOutputs = await requestJson(`/v1/runs/${imageRun.id}/outputs`);
  assert(
    imageOutputs.items.some((item) => item.artifact_type === "asset_plan"),
    "Creative image should produce an asset plan"
  );
  assert(
    imageOutputs.items.some((item) => item.artifact_type === "composition_plan"),
    "Creative image should produce a composition plan"
  );
  assert(
    imageOutputs.items.some((item) => item.artifact_type === "preview_manifest"),
    "Creative image should produce a preview manifest"
  );

  const imageArtifacts = await requestJson(`/v1/runs/${imageRun.id}/artifacts`);
  const compositionArtifact = imageArtifacts.items.find((item) => item.artifact_type === "composition_plan");
  const previewArtifact = imageArtifacts.items.find((item) => item.artifact_type === "preview_manifest");

  assert(compositionArtifact, "Creative image should persist a composition artifact");
  assert(previewArtifact, "Creative image should persist a preview artifact");
  assert(existsSync(compositionArtifact.details.composition_path), "Composition plan file should exist");
  assert(
    compositionArtifact.details.frame_paths.every((framePath) => existsSync(framePath)),
    "Composition frame files should exist"
  );
  assert(existsSync(previewArtifact.details.preview_manifest_path), "Preview manifest file should exist");
  assert(
    previewArtifact.details.preview_files.every((previewPath) => existsSync(previewPath)),
    "Rendered preview files should exist"
  );
  assert(existsSync(previewArtifact.details.gallery_path), "Preview gallery file should exist");

  const qaRun = await requestJson("/v1/runs", {
    method: "POST",
    body: JSON.stringify({
      squad_slug: "creative-qa",
      workspace_slug: "doze",
      requested_by: "e2e",
      intent_kind: "creative-image",
      machine_profile: "cpu-safe",
      environment_scope: "staging",
      request_context: {
        channel: "instagram"
      }
    })
  });

  const completedQa = await driveCheckpointedRun(qaRun.id, { expectedCheckpoints: 1 });
  assert(completedQa.status === "succeeded", "Creative QA run did not finish successfully");

  const qaOutputs = await requestJson(`/v1/runs/${qaRun.id}/outputs`);
  assert(
    qaOutputs.items.some((item) => item.artifact_type === "brand_qa"),
    "Creative QA should produce brand QA output"
  );
  assert(
    qaOutputs.items.some((item) => item.artifact_type === "delivery_qa"),
    "Creative QA should produce delivery QA output"
  );

  return {
    referenceRunId: referenceRun.id,
    controlRunId: controlRun.id,
    imageRunId: imageRun.id,
    qaRunId: qaRun.id
  };
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
  const dashboardProcess = startDashboard();

  try {
    await waitForHealth();
    await waitForDashboard();

    const dashboardHtml = await requestText(dashboardBaseUrl, "/");
    assert(dashboardHtml.includes("window.OPENCLOW_API_BASE"), "Dashboard should inject API base");
    assert(dashboardHtml.includes("Run view"), "Dashboard should expose run view");
    assert(dashboardHtml.includes("Checkpoint panel"), "Dashboard should expose checkpoint panel");

    const marketingRunId = await runMarketingScenario();
    const intelligenceRunId = await runIntelligenceScenario();
    const creativeRuns = await runCreativeScenario();
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
    log(`creative runs: ${creativeRuns.referenceRunId}, ${creativeRuns.controlRunId}, ${creativeRuns.qaRunId}`);
    log("all scenarios passed");

    await stop(dashboardProcess);
    await stop(restartedApi);
  } finally {
    await stop(apiProcess);
    await stop(dashboardProcess);
    rmSync(stateDir, { recursive: true, force: true });
  }
}

await main();
