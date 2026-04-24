# Snapshot: TASK-028 Surface Mapping

> **Date:** 2026-04-24
> **Agent:** codex
> **Scope:** mapear o contrato E2E staging-first contra a API/runtime atuais

## What changed in this session

- read the current API, runtime, registry, orchestrator and shared contracts
- verified that the E2E contract is already supported by the product surface
- documented the coverage and partial coverage in `research/squad-1-package/e2e-contract-vs-surface.md`
- updated `product/packages/shared/contracts/v1/openclow-api.yaml` to reflect actual endpoints
- linked the E2E README to the new contract-vs-surface document
- updated `handoffs/ACTIVE.md` to indicate surface mapping completion

## Current state

- The contract is executable against the current product shape.
- The biggest gap is no longer compatibility; it is the absence of a harness that exercises the contract.
- The next useful step is implementation of the E2E execution layer or its test scaffold.

## Key findings

- marketing and intelligence runs are already seeded
- promotion and rollback are already modeled
- checkpoints can be approved/rejected already
- audit and history are already exposed
- restart safety is already observable through runtime state

## Relevant files

- `product/apps/api/src/server.js`
- `product/packages/runtime/src/service.js`
- `product/packages/registry/src/service.js`
- `product/packages/orchestrator/src/service.js`
- `product/packages/shared/contracts/v1/openclow-api.yaml`
- `research/squad-1-package/e2e-contract-vs-surface.md`
- `product/tests/e2e/README.md`
