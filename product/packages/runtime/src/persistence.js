import fs from "node:fs";
import path from "node:path";
import { createSeeds } from "../../shared/src/seeds.js";

function ensureDirectory(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

export function getDefaultStatePath() {
  return process.env.OPENCLOW_STATE_PATH ?? path.join(process.cwd(), ".local", "runtime-state.json");
}

export function createInitialState() {
  const seeds = createSeeds();

  return {
    capabilities: [...seeds.capabilities],
    squads: [...seeds.squads],
    runs: [],
    checkpoints: [],
    approvals: [],
    queue: [],
    runtime: {
      ollama: {
        baseUrl: process.env.OPENCLOW_OLLAMA_BASE_URL ?? "http://127.0.0.1:11434",
        status: "unknown",
        checked_at: null,
        error: null,
        models: []
      }
    }
  };
}

export function loadState(filePath = getDefaultStatePath()) {
  try {
    if (!fs.existsSync(filePath)) {
      return createInitialState();
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);
    const initialState = createInitialState();

    return {
      ...initialState,
      ...parsed,
      runtime: {
        ...initialState.runtime,
        ...(parsed.runtime ?? {}),
        ollama: {
          ...initialState.runtime.ollama,
          ...(parsed.runtime?.ollama ?? {})
        }
      }
    };
  } catch (error) {
    const initialState = createInitialState();

    return {
      ...initialState,
      runtime: {
        ...initialState.runtime,
        ollama: {
          ...initialState.runtime.ollama,
          status: "degraded",
          checked_at: new Date().toISOString(),
          error: `failed to load persisted runtime state: ${error.message}`
        }
      }
    };
  }
}

export function saveState(filePath, state) {
  ensureDirectory(filePath);
  fs.writeFileSync(filePath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
}
