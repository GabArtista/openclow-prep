import { assertCapabilityInput, capabilityStatuses } from "../../shared/src/contracts.js";
import { createId } from "../../shared/src/ids.js";

const capabilityStatusRank = new Map(capabilityStatuses.map((status, index) => [status, index]));
const allowedTransitions = new Set([
  "draft->staging",
  "staging->draft",
  "staging->active",
  "active->staging",
  "active->retired",
  "retired->active"
]);

function now() {
  return new Date().toISOString();
}

function cloneCapability(capability) {
  return {
    ...capability,
    allowed_tools: [...(capability.allowed_tools ?? [])]
  };
}

function ensureValidVersion(version) {
  if (!/^v?[0-9]+\.[0-9]+\.[0-9]+$/.test(version)) {
    throw new Error("Capability version must be semver-like");
  }
}

function ensureAllowedTransition(fromStatus, toStatus) {
  if (!allowedTransitions.has(`${fromStatus}->${toStatus}`)) {
    throw new Error(`Invalid capability transition: ${fromStatus} -> ${toStatus}`);
  }
}

export class RegistryService {
  constructor(store) {
    this.store = store;
  }

  recordAuditEvent(event) {
    const entry = {
      id: createId(),
      created_at: now(),
      ...event
    };

    this.store.audit_events ??= [];
    this.store.audit_events.push(entry);

    return entry;
  }

  listCapabilities() {
    return this.store.capabilities;
  }

  getCapability(capabilityId) {
    return this.store.capabilities.find(
      (candidate) => candidate.id === capabilityId || candidate.slug === capabilityId
    );
  }

  listPromotions(capabilityId = null) {
    const promotions = this.store.promotions ?? [];

    if (!capabilityId) {
      return promotions;
    }

    return promotions.filter(
      (promotion) => promotion.capability_id === capabilityId || promotion.capability_slug === capabilityId
    );
  }

  createCapability(input) {
    assertCapabilityInput({
      ...input,
      status: input.status ?? "draft"
    });

    if (input.status && input.status !== "draft") {
      throw new Error("New capabilities must be created as draft and promoted explicitly");
    }

    ensureValidVersion(input.version ?? "1.0.0");

    const capability = {
      id: createId(),
      kind: input.kind,
      slug: input.slug,
      name: input.name ?? input.slug,
      workspace_slug: input.workspace_slug,
      status: "draft",
      version: input.version ?? "1.0.0",
      risk_level: input.risk_level ?? "medium",
      allowed_tools: [...(input.allowed_tools ?? [])],
      summary: input.summary ?? "",
      created_at: now(),
      updated_at: now()
    };

    this.store.capabilities.push(capability);
    this.recordAuditEvent({
      event: "capability.created",
      subject_kind: "capability",
      subject_id: capability.id,
      actor: input.requested_by ?? "human",
      workspace_slug: capability.workspace_slug,
      details: {
        slug: capability.slug,
        kind: capability.kind,
        status: capability.status
      }
    });
    this.store.persist?.();
    return capability;
  }

  updateCapability(capabilityId, input) {
    const capability = this.getCapability(capabilityId);

    if (!capability) {
      throw new Error("Capability not found");
    }

    if (input.slug && input.slug !== capability.slug) {
      throw new Error("Capability slug cannot be changed");
    }

    if (input.workspace_slug && input.workspace_slug !== capability.workspace_slug) {
      throw new Error("Capability workspace_slug cannot be changed");
    }

    if (input.kind && input.kind !== capability.kind) {
      throw new Error("Capability kind cannot be changed");
    }

    if (input.status && input.status !== capability.status) {
      throw new Error("Capability status can only be changed through promotion");
    }

    if (input.version) {
      ensureValidVersion(input.version);
      capability.version = input.version;
    }

    if (input.name) {
      capability.name = input.name;
    }

    if (input.risk_level) {
      capability.risk_level = input.risk_level;
    }

    if (input.summary !== undefined) {
      capability.summary = input.summary;
    }

    if (input.allowed_tools) {
      capability.allowed_tools = [...input.allowed_tools];
    }

    capability.updated_at = now();
    this.recordAuditEvent({
      event: "capability.updated",
      subject_kind: "capability",
      subject_id: capability.id,
      actor: input.requested_by ?? "human",
      workspace_slug: capability.workspace_slug,
      details: {
        changes: Object.keys(input)
      }
    });
    this.store.persist?.();
    return capability;
  }

  createPromotion(capabilityId, input) {
    const capability = this.getCapability(capabilityId);

    if (!capability) {
      throw new Error("Capability not found");
    }

    const targetStatus = input.target_status;

    if (!capabilityStatuses.includes(targetStatus)) {
      throw new Error(`Promotion target must be one of: ${capabilityStatuses.join(", ")}`);
    }

    if (targetStatus === capability.status) {
      throw new Error("Promotion target must differ from current capability status");
    }

    ensureAllowedTransition(capability.status, targetStatus);

    const promotion = {
      id: createId(),
      capability_id: capability.id,
      capability_slug: capability.slug,
      from_status: capability.status,
      to_status: targetStatus,
      operation:
        capabilityStatusRank.get(targetStatus) > capabilityStatusRank.get(capability.status)
          ? "promotion"
          : "rollback",
      status: "pending",
      requested_by: input.requested_by ?? "human",
      reason: input.reason ?? "",
      comment: input.comment ?? "",
      requested_at: now(),
      updated_at: now(),
      approval_id: null,
      approved_at: null,
      rejected_at: null
    };

    this.store.promotions.push(promotion);
    this.recordAuditEvent({
      event: "promotion.requested",
      subject_kind: "promotion",
      subject_id: promotion.id,
      actor: promotion.requested_by,
      workspace_slug: capability.workspace_slug,
      details: {
        capability_id: capability.id,
        from_status: promotion.from_status,
        to_status: promotion.to_status,
        operation: promotion.operation
      }
    });
    this.store.persist?.();
    return promotion;
  }

  approvePromotion(promotionId, actor, comment = "") {
    const promotion = this.store.promotions.find((candidate) => candidate.id === promotionId);

    if (!promotion) {
      throw new Error("Promotion not found");
    }

    if (promotion.status !== "pending") {
      throw new Error("Promotion already decided");
    }

    const capability = this.getCapability(promotion.capability_id);

    if (!capability) {
      throw new Error("Capability not found");
    }

    capability.status = promotion.to_status;
    capability.updated_at = now();

    const approval = {
      id: createId(),
      target_kind: "promotion",
      target_id: promotion.id,
      decision: "approved",
      actor,
      comment,
      created_at: now()
    };

    promotion.status = "approved";
    promotion.approval_id = approval.id;
    promotion.approved_at = approval.created_at;
    promotion.updated_at = approval.created_at;

    this.store.approvals.push(approval);
    this.recordAuditEvent({
      event: "promotion.approved",
      subject_kind: "promotion",
      subject_id: promotion.id,
      actor,
      workspace_slug: capability.workspace_slug,
      details: {
        capability_id: capability.id,
        from_status: promotion.from_status,
        to_status: promotion.to_status
      }
    });
    this.store.persist?.();

    return {
      promotion,
      approval,
      capability: cloneCapability(capability)
    };
  }

  rejectPromotion(promotionId, actor, comment = "") {
    const promotion = this.store.promotions.find((candidate) => candidate.id === promotionId);

    if (!promotion) {
      throw new Error("Promotion not found");
    }

    if (promotion.status !== "pending") {
      throw new Error("Promotion already decided");
    }

    const approval = {
      id: createId(),
      target_kind: "promotion",
      target_id: promotion.id,
      decision: "rejected",
      actor,
      comment,
      created_at: now()
    };

    promotion.status = "rejected";
    promotion.rejected_at = approval.created_at;
    promotion.updated_at = approval.created_at;

    this.store.approvals.push(approval);
    this.recordAuditEvent({
      event: "promotion.rejected",
      subject_kind: "promotion",
      subject_id: promotion.id,
      actor,
      workspace_slug: capability.workspace_slug,
      details: {
        capability_id: capability.id,
        from_status: promotion.from_status,
        to_status: promotion.to_status
      }
    });
    this.store.persist?.();

    return {
      promotion,
      approval
    };
  }
}
