# Snapshot: TASK-029 Complete

> **Date:** 2026-04-24
> **Agent:** codex
> **Scope:** fechar o modelo mínimo de identidade e autorização do produto

## What changed in this session

- created `research/architecture/auth-and-identity-model.md`
- created `decisions/ADR-0012-auth-and-identity-model.md`
- aligned `product/packages/shared/contracts/v1/openclow-api.yaml` with the current MVP identity surface
- moved TASK-029 out of `IN_PROGRESS` and into `DONE`
- updated `handoffs/ACTIVE.md` to `UNASSIGNED`

## Current state

- The product now has a minimum identity/authorization model that distinguishes human, worker, orchestrator, meta-squad and system actor.
- The MVP uses request-scoped identity fields already present in the surface (`requested_by`, `actor`, `workspace_slug`) as the auditable basis.
- The control plane remains server-first and the Doze operational base at the repo root remains untouched.

## Relevant files

- `research/architecture/auth-and-identity-model.md`
- `decisions/ADR-0012-auth-and-identity-model.md`
- `product/packages/shared/contracts/v1/openclow-api.yaml`
- `workboard/BACKLOG.md`
- `workboard/IN_PROGRESS.md`
- `workboard/DONE.md`
- `handoffs/ACTIVE.md`
