export const capabilityKinds = ["skill", "squad", "pipeline", "tool"];
export const capabilityStatuses = ["draft", "staging", "active", "retired"];
export const machineProfiles = ["cpu-safe", "balanced", "quality-first"];
export const environmentScopes = ["local-dev", "staging", "production"];
export const runStatuses = [
  "queued",
  "running",
  "waiting_checkpoint",
  "succeeded",
  "failed",
  "cancelled"
];
export const checkpointStatuses = ["pending", "approved", "rejected"];

export function assertCapabilityInput(input) {
  if (!capabilityKinds.includes(input.kind)) {
    throw new Error(`Capability kind must be one of: ${capabilityKinds.join(", ")}`);
  }

  if (!capabilityStatuses.includes(input.status)) {
    throw new Error(`Capability status must be one of: ${capabilityStatuses.join(", ")}`);
  }

  if (!input.slug) {
    throw new Error("Capability slug is required");
  }

  if (!input.workspace_slug) {
    throw new Error("Capability workspace_slug is required");
  }

  if (input.machine_profile && !machineProfiles.includes(input.machine_profile)) {
    throw new Error(`Capability machine_profile must be one of: ${machineProfiles.join(", ")}`);
  }

  if (input.environment_scope && !environmentScopes.includes(input.environment_scope)) {
    throw new Error(`Capability environment_scope must be one of: ${environmentScopes.join(", ")}`);
  }
}

export function summarizeRun(run) {
  return {
    id: run.id,
    squad_id: run.squad_id,
    squad_slug: run.squad_slug,
    workspace_slug: run.workspace_slug,
    status: run.status,
    current_step_id: run.current_step_id,
    requested_at: run.requested_at,
    started_at: run.started_at,
    completed_at: run.completed_at
  };
}
