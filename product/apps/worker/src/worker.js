const apiBase = process.env.OPENCLOW_API_BASE ?? "http://127.0.0.1:3001";
const intervalMs = Number(process.env.OPENCLOW_WORKER_INTERVAL_MS ?? "1500");

async function getJson(url, options) {
  const response = await fetch(url, options);
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error ?? `HTTP ${response.status}`);
  }

  return payload;
}

async function tickLoop() {
  try {
    const claim = await getJson(`${apiBase}/v1/worker/claim`);

    if (!claim.item) {
      process.stdout.write(".");
      return;
    }

    const result = await getJson(`${apiBase}/v1/worker/runs/${claim.item.id}/tick`, {
      method: "POST"
    });

    console.log(
      `[worker] run=${result.id} squad=${result.squad_slug} status=${result.status} step=${result.current_step_id ?? "done"}`
    );
  } catch (error) {
    console.error(`[worker] ${error.message}`);
  }
}

console.log(`[worker] polling ${apiBase} every ${intervalMs}ms`);
await tickLoop();
setInterval(tickLoop, intervalMs);
