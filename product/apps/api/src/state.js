import { createSeeds } from "../../../packages/shared/src/seeds.js";
import { RegistryService } from "../../../packages/registry/src/service.js";
import { OrchestratorService } from "../../../packages/orchestrator/src/service.js";
import { RuntimeService } from "../../../packages/runtime/src/service.js";

const seedState = createSeeds();

const store = {
  capabilities: [...seedState.capabilities],
  squads: [...seedState.squads],
  runs: [],
  checkpoints: [],
  approvals: []
};

export const registry = new RegistryService(store);
export const orchestrator = new OrchestratorService(store);
export const runtime = new RuntimeService(store);
export { store };
