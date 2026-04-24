const apiBase = window.OPENCLOW_API_BASE ?? "http://127.0.0.1:3001";
const selectedRunKey = "openclow.selectedRunId";
const selectedStepKey = "openclow.selectedStepId";

const state = {
  squads: [],
  capabilities: [],
  runs: [],
  selectedRunId: window.localStorage.getItem(selectedRunKey) ?? null,
  selectedStepId: window.localStorage.getItem(selectedStepKey) ?? null
};

async function getJson(path, options) {
  const response = await fetch(`${apiBase}${path}`, {
    headers: {
      "content-type": "application/json"
    },
    ...options
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error ?? `HTTP ${response.status}`);
  }

  return payload;
}

function el(selector) {
  return document.querySelector(selector);
}

function pill(label, tone = "") {
  const className = tone ? `pill ${tone}` : "pill";
  return `<span class="${className}">${label}</span>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderCards(target, items, renderItem) {
  target.innerHTML = "";

  if (items.length === 0) {
    target.innerHTML = `<div class="muted-box">Nenhum item para exibir.</div>`;
    return;
  }

  for (const item of items) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderItem(item);
    target.appendChild(wrapper.firstElementChild);
  }
}

function setSelectedRun(runId) {
  state.selectedRunId = runId;
  state.selectedStepId = null;
  window.localStorage.setItem(selectedRunKey, runId ?? "");
  window.localStorage.removeItem(selectedStepKey);
}

function setSelectedStep(stepId) {
  state.selectedStepId = stepId;
  if (stepId) {
    window.localStorage.setItem(selectedStepKey, stepId);
  } else {
    window.localStorage.removeItem(selectedStepKey);
  }
}

function getSelectedRun() {
  return state.runs.find((run) => run.id === state.selectedRunId) ?? state.runs[0] ?? null;
}

function getRunDetails(runId) {
  return getJson(`/v1/runs/${runId}`);
}

function getRunOutputs(runId) {
  return getJson(`/v1/runs/${runId}/outputs`);
}

function getRunArtifacts(runId) {
  return getJson(`/v1/runs/${runId}/artifacts`);
}

function getRunCheckpoints(runId) {
  return getJson(`/v1/runs/${runId}/checkpoints`);
}

async function tickRun(runId) {
  await getJson(`/v1/worker/runs/${runId}/tick`, {
    method: "POST"
  });
}

async function approveCheckpoint(checkpointId) {
  await getJson(`/v1/checkpoints/${checkpointId}/approve`, {
    method: "POST",
    body: JSON.stringify({ actor: "dashboard" })
  });
}

async function rejectCheckpoint(checkpointId) {
  await getJson(`/v1/checkpoints/${checkpointId}/reject`, {
    method: "POST",
    body: JSON.stringify({ actor: "dashboard" })
  });
}

async function createRun(squadSlug) {
  await getJson("/v1/runs", {
    method: "POST",
    body: JSON.stringify({
      squad_slug: squadSlug,
      workspace_slug: "doze",
      requested_by: "dashboard"
    })
  });
}

function statusTone(status) {
  if (status === "succeeded" || status === "approved" || status === "active" || status === "staging") {
    return "ok";
  }

  if (status === "failed" || status === "rejected" || status === "retired") {
    return "warn";
  }

  return "";
}

function classifyStep(step, run) {
  const index = run.steps.findIndex((candidate) => candidate.id === step.id);

  if (index < run.pointer) {
    return "completed";
  }

  if (run.current_step_id === step.id && run.status === "waiting_checkpoint") {
    return "waiting checkpoint";
  }

  if (run.current_step_id === step.id && ["queued", "running"].includes(run.status)) {
    return "current";
  }

  return "pending";
}

function renderSquads() {
  renderCards(el("#squads"), state.squads, (item) => {
    return `
      <div class="card">
        <strong>${escapeHtml(item.name)}</strong><br />
        <span class="meta">${escapeHtml(item.slug)} · ${escapeHtml(item.workspace_slug)} · ${escapeHtml(item.default_model_tier)}</span>
      </div>
    `;
  });
}

function renderCapabilities() {
  renderCards(el("#capabilities"), state.capabilities, (item) => {
    return `
      <div class="card">
        <strong>${escapeHtml(item.name)}</strong><br />
        <span class="meta">${escapeHtml(item.slug)} · ${escapeHtml(item.status)} · risk=${escapeHtml(item.risk_level)}</span>
      </div>
    `;
  });
}

function renderRuns() {
  const selectedRun = getSelectedRun();

  renderCards(el("#runs"), state.runs, (item) => {
    const active = selectedRun?.id === item.id ? "active" : "";
    const label = `${item.squad_slug} · ${item.status}`;
    return `
      <button class="card ${active}" data-run="${escapeHtml(item.id)}" type="button">
        <strong>${escapeHtml(item.squad_slug)}</strong><br />
        <span class="meta">${escapeHtml(item.status)} · step=${escapeHtml(item.current_step_id ?? "n/a")}</span>
      </button>
    `;
  });

  for (const button of document.querySelectorAll("button[data-run]")) {
    button.addEventListener("click", () => {
      setSelectedRun(button.dataset.run);
      setSelectedStep(null);
      refresh();
    });
  }
}

function renderRunSummary(run) {
  if (!run) {
    el("#run-summary").innerHTML = "Selecione um run para ver os detalhes.";
    el("#run-detail").innerHTML = "";
    return;
  }

  el("#run-summary").innerHTML = `
    <div class="kv">
      <div class="key">Squad</div><div>${escapeHtml(run.squad_slug)}</div>
      <div class="key">Status</div><div>${pill(escapeHtml(run.status), statusTone(run.status))}</div>
      <div class="key">Step atual</div><div>${escapeHtml(run.current_step_id ?? "n/a")}</div>
      <div class="key">Solicitado em</div><div>${escapeHtml(run.requested_at)}</div>
      <div class="key">Iniciado em</div><div>${escapeHtml(run.started_at ?? "n/a")}</div>
      <div class="key">Concluído em</div><div>${escapeHtml(run.completed_at ?? "n/a")}</div>
    </div>
    <div class="toolbar" style="margin-top: 12px;">
      <button class="primary" id="advance-run" type="button">Avançar run</button>
      <button class="ghost" id="refresh-run" type="button">Atualizar</button>
    </div>
  `;

  el("#run-detail").innerHTML = "";

  const detail = document.createElement("div");
  detail.className = "detail-grid";
  detail.innerHTML = `
    <div class="card">
      <strong>Pipeline</strong><br />
      <span class="meta">${escapeHtml(run.pipeline_id)}</span>
    </div>
    <div class="card">
      <strong>Etapas</strong>
      <div id="step-list" class="detail-list" style="margin-top: 12px;"></div>
    </div>
  `;
  el("#run-detail").appendChild(detail);

  el("#advance-run").addEventListener("click", async () => {
    await tickRun(run.id);
    await refresh();
  });

  el("#refresh-run").addEventListener("click", async () => {
    await refresh();
  });

  const stepList = el("#step-list");
  stepList.innerHTML = "";

  for (const [index, step] of run.steps.entries()) {
    const status = classifyStep(step, run);
    const stepButton = document.createElement("button");
    stepButton.type = "button";
    stepButton.className = `card step ${state.selectedStepId === step.id ? "selected" : ""}`;
    stepButton.innerHTML = `
      <strong>${index + 1}. ${escapeHtml(step.id)}</strong><br />
      <span class="meta">${escapeHtml(step.kind)} · ${escapeHtml(step.executor)} · ${pill(escapeHtml(status), statusTone(status))}</span>
    `;
    stepButton.addEventListener("click", () => {
      setSelectedStep(step.id);
      renderRunSummary(run);
    });
    stepList.appendChild(stepButton);
  }

  if (!state.selectedStepId && run.steps[0]) {
    setSelectedStep(run.steps[0].id);
  }

  renderStepDetail(run);
  renderRunPanels(run);
}

function renderStepDetail(run) {
  const step = run.steps.find((candidate) => candidate.id === state.selectedStepId) ?? run.steps[run.pointer] ?? run.steps[0];

  if (!step) {
    el("#step-detail").innerHTML = "Nenhuma step selecionada.";
    return;
  }

  const stepOutputs = run.outputs.filter((output) => output.step_id === step.id);
  const stepCheckpoints = run.checkpoints.filter((checkpoint) => checkpoint.step_id === step.id);
  const stepHistory = run.history.filter((entry) => entry.event.includes(step.id) || entry.event.startsWith("checkpoint"));

  el("#step-detail").innerHTML = `
    <div class="detail-grid">
      <div class="card">
        <strong>${escapeHtml(step.id)}</strong><br />
        <span class="meta">${escapeHtml(step.kind)} · ${escapeHtml(step.executor)} · risco ${escapeHtml(step.risk_level ?? "n/a")}</span>
      </div>
      <div class="card">
        <div><strong>Descrição</strong></div>
        <div class="meta">${escapeHtml(step.label ?? "Sem descrição")}</div>
      </div>
      <div class="card">
        <div><strong>Outputs do step</strong></div>
        <div class="detail-list" id="selected-step-outputs"></div>
      </div>
      <div class="card">
        <div><strong>Checkpoints do step</strong></div>
        <div class="detail-list" id="selected-step-checkpoints"></div>
      </div>
      <div class="card">
        <div><strong>Histórico do step</strong></div>
        <div class="detail-list" id="selected-step-history"></div>
      </div>
    </div>
  `;

  const outputsTarget = el("#selected-step-outputs");
  outputsTarget.innerHTML = stepOutputs.length
    ? stepOutputs.map((output) => `<div class="muted-box">${escapeHtml(output.summary)}</div>`).join("")
    : `<div class="muted-box">Sem outputs para este step.</div>`;

  const checkpointsTarget = el("#selected-step-checkpoints");
  checkpointsTarget.innerHTML = stepCheckpoints.length
    ? stepCheckpoints
        .map((checkpoint) => `<div class="muted-box">${escapeHtml(checkpoint.step_id)} · ${pill(escapeHtml(checkpoint.status), statusTone(checkpoint.status))}</div>`)
        .join("")
    : `<div class="muted-box">Sem checkpoints para este step.</div>`;

  const historyTarget = el("#selected-step-history");
  historyTarget.innerHTML = stepHistory.length
    ? stepHistory.map((entry) => `<div class="history-item"><strong>${escapeHtml(entry.event)}</strong><br /><span class="meta">${escapeHtml(entry.message)}</span></div>`).join("")
    : `<div class="muted-box">Sem eventos ligados a este step.</div>`;
}

function renderRunPanels(run) {
  const checkpoints = run.checkpoints;
  const outputs = run.outputs;
  const artifacts = state.selectedRunId ? state.selectedRunArtifacts ?? [] : [];

  const checkpointPanel = el("#checkpoints");
  checkpointPanel.innerHTML = checkpoints.length
    ? checkpoints
        .map((checkpoint) => {
          const pending = checkpoint.status === "pending";
          return `
            <div class="card checkpoint">
              <strong>${escapeHtml(checkpoint.step_id)}</strong><br />
              <span class="meta">${pill(escapeHtml(checkpoint.status), statusTone(checkpoint.status))} · risco ${escapeHtml(checkpoint.risk_level)}</span><br />
              <span class="meta">${escapeHtml(checkpoint.reason)}</span>
              ${
                pending
                  ? `
                <div class="toolbar" style="margin-top: 10px;">
                  <button class="primary" type="button" data-approve-checkpoint="${escapeHtml(checkpoint.id)}">Aprovar</button>
                  <button type="button" data-reject-checkpoint="${escapeHtml(checkpoint.id)}">Rejeitar</button>
                </div>`
                  : ""
              }
            </div>
          `;
        })
        .join("")
    : `<div class="muted-box">Sem checkpoints neste run.</div>`;

  const outputsPanel = el("#outputs");
  outputsPanel.innerHTML = `
    <div class="card">
      <strong>Run outputs</strong>
      <div class="detail-list" style="margin-top: 10px;">
        ${
          outputs.length
            ? outputs.map((output) => `<div class="muted-box">${escapeHtml(output.summary)}</div>`).join("")
            : `<div class="muted-box">Sem outputs ainda.</div>`
        }
      </div>
    </div>
    <div class="card">
      <strong>Artefatos persistidos</strong>
      <div class="detail-list" style="margin-top: 10px;">
        ${
          artifacts.length
            ? artifacts.map((artifact) => `<div class="muted-box">${escapeHtml(artifact.summary)}</div>`).join("")
            : `<div class="muted-box">Sem artefatos persistidos neste run.</div>`
        }
      </div>
    </div>
  `;

  const historyPanel = el("#history");
  historyPanel.innerHTML = run.history.length
    ? run.history
        .map((entry) => {
          const current = entry.event === "run.completed" ? "current" : "";
          return `
            <div class="card history-item ${current}">
              <strong>${escapeHtml(entry.event)}</strong><br />
              <span class="meta">${escapeHtml(entry.at)}</span><br />
              <span class="meta">${escapeHtml(entry.message)}</span>
            </div>
          `;
        })
        .join("")
    : `<div class="muted-box">Sem eventos de histórico.</div>`;

  for (const button of document.querySelectorAll("[data-approve-checkpoint]")) {
    button.addEventListener("click", async () => {
      await approveCheckpoint(button.dataset.approveCheckpoint);
      await refresh();
    });
  }

  for (const button of document.querySelectorAll("[data-reject-checkpoint]")) {
    button.addEventListener("click", async () => {
      await rejectCheckpoint(button.dataset.rejectCheckpoint);
      await refresh();
    });
  }
}

async function refresh() {
  const [squads, capabilities, runs] = await Promise.all([
    getJson("/v1/squads"),
    getJson("/v1/capabilities"),
    getJson("/v1/runs")
  ]);

  state.squads = squads.items;
  state.capabilities = capabilities.items;
  state.runs = runs.items;

  renderSquads();
  renderCapabilities();
  renderRuns();

  const selectedRun = getSelectedRun();

  if (!selectedRun) {
    el("#run-summary").innerHTML = "Nenhum run disponível.";
    el("#run-detail").innerHTML = "";
    el("#step-detail").innerHTML = "Nenhuma step selecionada.";
    el("#checkpoints").innerHTML = `<div class="muted-box">Sem checkpoints.</div>`;
    el("#outputs").innerHTML = `<div class="muted-box">Sem outputs.</div>`;
    el("#history").innerHTML = `<div class="muted-box">Sem histórico.</div>`;
    return;
  }

  const detailedRun = await getRunDetails(selectedRun.id);
  const outputs = await getRunOutputs(selectedRun.id);
  const artifacts = await getRunArtifacts(selectedRun.id);
  const checkpoints = await getRunCheckpoints(selectedRun.id);

  state.selectedRunArtifacts = artifacts.items;

  // Keep run/checkpoint lists in sync with the detailed run.
  detailedRun.outputs = outputs.items;
  detailedRun.checkpoints = checkpoints.items;

  renderRunSummary(detailedRun);
}

for (const button of document.querySelectorAll("button[data-squad]")) {
  button.addEventListener("click", async () => {
    await createRun(button.dataset.squad);
    await refresh();
  });
}

await refresh();
setInterval(refresh, 3000);
