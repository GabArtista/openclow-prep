const apiBase = window.OPENCLOW_API_BASE ?? "http://127.0.0.1:3001";

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

function renderList(target, items, renderItem) {
  target.innerHTML = "";

  for (const item of items) {
    const li = document.createElement("li");
    li.innerHTML = renderItem(item);
    target.appendChild(li);
  }
}

async function refresh() {
  const [squads, capabilities, runs, checkpoints] = await Promise.all([
    getJson("/v1/squads"),
    getJson("/v1/capabilities"),
    getJson("/v1/runs"),
    getJson("/v1/checkpoints")
  ]);

  renderList(document.querySelector("#squads"), squads.items, (item) => {
    return `<strong>${item.name}</strong><br /><span class="meta">${item.slug} · ${item.workspace_slug} · ${item.default_model_tier}</span>`;
  });

  renderList(document.querySelector("#capabilities"), capabilities.items, (item) => {
    return `<strong>${item.name}</strong><br /><span class="meta">${item.slug} · ${item.status} · risk=${item.risk_level}</span>`;
  });

  renderList(document.querySelector("#runs"), runs.items, (item) => {
    return `<strong>${item.squad_slug}</strong><br /><span class="meta">${item.status} · step=${item.current_step_id ?? "n/a"}</span>`;
  });

  const checkpointsTarget = document.querySelector("#checkpoints");
  checkpointsTarget.innerHTML = "";

  for (const item of checkpoints.items) {
    const li = document.createElement("li");
    li.className = "checkpoint";
    li.innerHTML = `<strong>${item.step_id}</strong><br /><span class="meta">${item.status} · risk=${item.risk_level}</span>`;

    if (item.status === "pending") {
      const approve = document.createElement("button");
      approve.textContent = "Aprovar";
      approve.className = "primary";
      approve.onclick = async () => {
        await getJson(`/v1/checkpoints/${item.id}/approve`, {
          method: "POST",
          body: JSON.stringify({
            actor: "dashboard"
          })
        });
        await refresh();
      };

      const reject = document.createElement("button");
      reject.textContent = "Rejeitar";
      reject.onclick = async () => {
        await getJson(`/v1/checkpoints/${item.id}/reject`, {
          method: "POST",
          body: JSON.stringify({
            actor: "dashboard"
          })
        });
        await refresh();
      };

      li.appendChild(document.createElement("br"));
      li.appendChild(approve);
      li.appendChild(reject);
    }

    checkpointsTarget.appendChild(li);
  }
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

  await refresh();
}

for (const button of document.querySelectorAll("button[data-squad]")) {
  button.addEventListener("click", () => createRun(button.dataset.squad));
}

await refresh();
setInterval(refresh, 3000);
