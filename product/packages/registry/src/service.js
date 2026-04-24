import { assertCapabilityInput } from "../../shared/src/contracts.js";
import { createId } from "../../shared/src/ids.js";

export class RegistryService {
  constructor(store) {
    this.store = store;
  }

  listCapabilities() {
    return this.store.capabilities;
  }

  createCapability(input) {
    assertCapabilityInput(input);

    const capability = {
      id: createId(),
      name: input.name ?? input.slug,
      version: input.version ?? "1.0.0",
      risk_level: input.risk_level ?? "medium",
      allowed_tools: input.allowed_tools ?? [],
      summary: input.summary ?? "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...input
    };

    this.store.capabilities.push(capability);
    return capability;
  }
}
