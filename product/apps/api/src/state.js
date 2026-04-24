import { createDurableStore } from "../../../packages/storage/src/service.js";
import { RegistryService } from "../../../packages/registry/src/service.js";
import { OrchestratorService } from "../../../packages/orchestrator/src/service.js";
import { RuntimeService } from "../../../packages/runtime/src/service.js";

const store = createDurableStore({
  statePath: process.env.OPENCLOW_STATE_PATH
});

export const registry = new RegistryService(store);
export const orchestrator = new OrchestratorService(store);
export const runtime = new RuntimeService(store);
export { store };
