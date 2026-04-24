# Snapshot: TASK-028 Complete

> **Date:** 2026-04-24
> **Agent:** codex
> **Scope:** concluir TASK-028 com contrato E2E, mapeamento de superfície e harness executável

## What changed in this session

- documented the real marketing and content workflows from `opensquad`
- documented access patterns and secret boundaries for day-1 integrations
- created the architecture target, runtime durability, observability, security and cost syntheses
- created the Squad 1 definition, intake package and Squad 0 exit checklist
- created the E2E contract-vs-surface mapping
- updated the OpenAPI contract to reflect the actual product endpoints
- added an executable E2E harness in `product/tests/e2e/run.mjs`
- added `npm --prefix product run e2e`
- validated the harness locally with all scenarios passing
- reconciled `workboard/IN_PROGRESS.md`, `workboard/DONE.md` and `handoffs/ACTIVE.md`

## Validation result

The local harness passed:

- marketing scenario
- intelligence scenario
- promotion and rollback scenario
- restart recovery scenario
- audit trail assertions

## Current state

- The staging-first contract is executable against the current product surface.
- The prep work is complete enough to support the next implementation cycle.
- The repo keeps the Doze operating model at the root and the product isolated under `product/`.

## Relevant files

- `product/tests/e2e/run.mjs`
- `product/tests/e2e/README.md`
- `product/tests/e2e/SCENARIO_MATRIX.md`
- `product/tests/e2e/README-RUNBOOK.md`
- `product/packages/shared/contracts/v1/openclow-api.yaml`
- `research/squad-1-package/e2e-contract-vs-surface.md`
- `research/ecosystem-fit/doze-marketing-content-workflows.md`
- `research/architecture/architecture-target.md`
- `research/runtime/durable-runtime-analysis.md`
- `research/observability/observability-and-evals.md`
- `research/security/security-and-agency-boundaries.md`
- `research/observability/staging-rollout-and-rollback-runbook.md`
- `research/cost/cost-and-throughput-model.md`
- `squads/squad-1/INTAKE_PACKAGE.md`
- `squads/squad-0/EXIT_CHECKLIST.md`
