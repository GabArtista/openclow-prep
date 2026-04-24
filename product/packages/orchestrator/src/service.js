import { createId } from "../../shared/src/ids.js";

export class OrchestratorService {
  constructor(store) {
    this.store = store;
  }

  listSquads() {
    return this.store.squads.map((squad) => ({
      id: squad.id,
      slug: squad.slug,
      name: squad.name,
      workspace_slug: squad.workspace_slug,
      version: squad.version,
      default_model_tier: squad.default_model_tier
    }));
  }

  createRun(input) {
    const squad = this.store.squads.find((candidate) => {
      return candidate.id === input.squad_id || candidate.slug === input.squad_slug;
    });

    if (!squad) {
      throw new Error("Squad not found");
    }

    const run = {
      id: createId(),
      squad_id: squad.id,
      squad_slug: squad.slug,
      pipeline_id: squad.pipeline_id,
      workspace_slug: input.workspace_slug ?? squad.workspace_slug,
      status: "queued",
      requested_at: new Date().toISOString(),
      started_at: null,
      completed_at: null,
      current_step_id: null,
      requested_by: input.requested_by ?? "unknown",
      history: [
        {
          at: new Date().toISOString(),
          event: "run.requested",
          message: `Run solicitado para ${squad.slug}`
        }
      ],
      outputs: [],
      approvals: [],
      checkpoints: [],
      steps: squad.steps,
      pointer: 0
    };

    this.store.runs.push(run);
    return run;
  }
}
