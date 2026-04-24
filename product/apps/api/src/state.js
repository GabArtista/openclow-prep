import { getDefaultStatePath, loadState, saveState } from "../../../packages/runtime/src/persistence.js";
import { RegistryService } from "../../../packages/registry/src/service.js";
import { OrchestratorService } from "../../../packages/orchestrator/src/service.js";
import { RuntimeService } from "../../../packages/runtime/src/service.js";

const statePath = getDefaultStatePath();
const store = loadState(statePath);

store.statePath = statePath;
store.persist = () => saveState(statePath, store);

export const registry = new RegistryService(store);
export const orchestrator = new OrchestratorService(store);
export const runtime = new RuntimeService(store);
export { store };
