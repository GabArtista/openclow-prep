import http from "node:http";
import { methodNotAllowed, notFound, readJson, sendJson } from "../../../packages/shared/src/http.js";
import { summarizeRun } from "../../../packages/shared/src/contracts.js";
import { probeOllama } from "../../../packages/runtime/src/ollama.js";
import { orchestrator, registry, runtime, store } from "./state.js";

const host = process.env.OPENCLOW_API_HOST ?? "127.0.0.1";
const port = Number(process.env.OPENCLOW_API_PORT ?? "3001");

function getPathSegments(url) {
  return new URL(url, `http://${host}:${port}`).pathname.split("/").filter(Boolean);
}

function matchRoute(segments, expected) {
  return segments.length === expected.length && expected.every((segment, index) => segment === "*" || segment === segments[index]);
}

async function handler(request, response) {
  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,PATCH,OPTIONS",
      "access-control-allow-headers": "content-type"
    });
    response.end();
    return;
  }

  const segments = getPathSegments(request.url);

  try {
    if (request.method === "GET" && matchRoute(segments, ["healthz"])) {
      sendJson(response, 200, {
        ok: true,
        service: "openclow-api",
        runtime: runtime.getRuntimeStatus(),
        storage: {
          state_path: store.statePath
        }
      });
      return;
    }

    if (request.method === "GET" && matchRoute(segments, ["v1", "capabilities"])) {
      sendJson(response, 200, {
        items: registry.listCapabilities()
      });
      return;
    }

    if (request.method === "GET" && matchRoute(segments, ["v1", "capabilities", "*"])) {
      const capability = registry.getCapability(segments[2]);

      if (!capability) {
        notFound(response, "Capability not found");
        return;
      }

      sendJson(response, 200, capability);
      return;
    }

    if (request.method === "POST" && matchRoute(segments, ["v1", "capabilities"])) {
      const payload = await readJson(request);
      const capability = registry.createCapability(payload);
      sendJson(response, 201, capability);
      return;
    }

    if (request.method === "PATCH" && matchRoute(segments, ["v1", "capabilities", "*"])) {
      const payload = await readJson(request);
      const capability = registry.updateCapability(segments[2], payload);
      sendJson(response, 200, capability);
      return;
    }

    if (request.method === "GET" && matchRoute(segments, ["v1", "capabilities", "*", "promotions"])) {
      sendJson(response, 200, {
        items: registry.listPromotions(segments[2])
      });
      return;
    }

    if (request.method === "POST" && matchRoute(segments, ["v1", "capabilities", "*", "promotions"])) {
      const payload = await readJson(request);
      const promotion = registry.createPromotion(segments[2], payload);
      sendJson(response, 202, promotion);
      return;
    }

    if (request.method === "GET" && matchRoute(segments, ["v1", "squads"])) {
      sendJson(response, 200, {
        items: orchestrator.listSquads()
      });
      return;
    }

    if (request.method === "GET" && matchRoute(segments, ["v1", "runs"])) {
      const url = new URL(request.url, `http://${host}:${port}`);
      const status = url.searchParams.get("status");
      sendJson(response, 200, {
        items: runtime.listRuns(status).map(summarizeRun)
      });
      return;
    }

    if (request.method === "POST" && matchRoute(segments, ["v1", "runs"])) {
      const payload = await readJson(request);
      const run = orchestrator.createRun(payload);
      sendJson(response, 202, run);
      return;
    }

    if (request.method === "GET" && matchRoute(segments, ["v1", "runs", "*"])) {
      const run = runtime.getRun(segments[2]);

      if (!run) {
        notFound(response, "Run not found");
        return;
      }

      sendJson(response, 200, run);
      return;
    }

    if (request.method === "GET" && matchRoute(segments, ["v1", "runs", "*", "outputs"])) {
      const run = runtime.getRun(segments[2]);

      if (!run) {
        notFound(response, "Run not found");
        return;
      }

      sendJson(response, 200, {
        items: run.outputs
      });
      return;
    }

    if (request.method === "GET" && matchRoute(segments, ["v1", "history"])) {
      sendJson(response, 200, {
        items: store.runs.flatMap((run) =>
          run.history.map((event) => ({
            run_id: run.id,
            squad_slug: run.squad_slug,
            ...event
          }))
        )
      });
      return;
    }

    if (request.method === "GET" && matchRoute(segments, ["v1", "audit"])) {
      const url = new URL(request.url, `http://${host}:${port}`);
      const limit = Number(url.searchParams.get("limit") ?? "0");
      const items = [...(store.audit_events ?? [])].sort((left, right) => left.created_at.localeCompare(right.created_at));

      sendJson(response, 200, {
        items: limit > 0 ? items.slice(-limit) : items
      });
      return;
    }

    if (request.method === "GET" && matchRoute(segments, ["v1", "promotions"])) {
      const url = new URL(request.url, `http://${host}:${port}`);
      const capabilityId = url.searchParams.get("capability_id");
      sendJson(response, 200, {
        items: registry.listPromotions(capabilityId)
      });
      return;
    }

    if (request.method === "POST" && matchRoute(segments, ["v1", "promotions", "*", "approve"])) {
      const payload = await readJson(request);
      const result = registry.approvePromotion(segments[2], payload.actor ?? "human", payload.comment ?? "");
      sendJson(response, 200, result);
      return;
    }

    if (request.method === "POST" && matchRoute(segments, ["v1", "promotions", "*", "reject"])) {
      const payload = await readJson(request);
      const result = registry.rejectPromotion(segments[2], payload.actor ?? "human", payload.comment ?? "");
      sendJson(response, 200, result);
      return;
    }

    if (request.method === "GET" && matchRoute(segments, ["v1", "runtime"])) {
      sendJson(response, 200, {
        state_path: store.statePath,
        queue_length: store.queue.length,
        runtime: runtime.getRuntimeStatus()
      });
      return;
    }

    if (request.method === "POST" && matchRoute(segments, ["v1", "runtime", "ollama", "probe"])) {
      const ollama = await probeOllama(store.runtime.ollama.baseUrl);
      store.runtime.ollama = {
        ...store.runtime.ollama,
        ...ollama
      };
      store.persist?.();
      sendJson(response, 200, store.runtime.ollama);
      return;
    }

    if (request.method === "GET" && matchRoute(segments, ["v1", "checkpoints"])) {
      sendJson(response, 200, {
        items: store.checkpoints
      });
      return;
    }

    if (request.method === "POST" && matchRoute(segments, ["v1", "checkpoints", "*", "approve"])) {
      const payload = await readJson(request);
      const result = runtime.decideCheckpoint(segments[2], "approved", payload.actor ?? "human", payload.comment ?? "");
      sendJson(response, 200, result);
      return;
    }

    if (request.method === "POST" && matchRoute(segments, ["v1", "checkpoints", "*", "reject"])) {
      const payload = await readJson(request);
      const result = runtime.decideCheckpoint(segments[2], "rejected", payload.actor ?? "human", payload.comment ?? "");
      sendJson(response, 200, result);
      return;
    }

    if (request.method === "GET" && matchRoute(segments, ["v1", "worker", "claim"])) {
      const run = runtime.claimNextRunnableRun();
      sendJson(response, 200, {
        item: run ? summarizeRun(run) : null
      });
      return;
    }

    if (request.method === "POST" && matchRoute(segments, ["v1", "worker", "runs", "*", "tick"])) {
      const run = runtime.tickRun(segments[3]);
      sendJson(response, 200, run);
      return;
    }

    if (segments[0] === "v1") {
      methodNotAllowed(response, request.method);
      return;
    }

    notFound(response);
  } catch (error) {
    sendJson(response, 400, {
      error: error.message
    });
  }
}

const server = http.createServer(handler);

server.listen(port, host, () => {
  console.log(`openclow-api listening on http://${host}:${port}`);
});
