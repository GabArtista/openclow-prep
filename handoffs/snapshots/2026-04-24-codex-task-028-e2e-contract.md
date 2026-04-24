# Snapshot: TASK-028 E2E Contract

> **Date:** 2026-04-24
> **Agent:** codex
> **Scope:** formalizar o contrato executável de staging-first antes da implementação

## What changed in this session

- expanded `product/tests/e2e/README.md` into a staging-first contract
- added `product/tests/e2e/SCENARIO_MATRIX.md`
- added `product/tests/e2e/README-RUNBOOK.md`
- moved `TASK-028` from backlog into `IN_PROGRESS`
- aligned `handoffs/ACTIVE.md` with the E2E contract state

## Current state

- The prep phase now has a documented E2E contract.
- The remaining work is to implement the harness or next executable layer that satisfies the contract.
- The repo still preserves the Doze operating model at the root and isolates the product in `product/`.

## Open questions

- whether the next step should be harness implementation or contract refinement against the current product API surface
- whether some scenario names should be normalized to the exact run/status vocabulary already used by the product

## Recommended next action

1. map the contract against the current runtime and registry implementation
2. identify any gaps between the E2E scenarios and the existing API surface
3. then implement the next executable layer

## Relevant files

- `product/tests/e2e/README.md`
- `product/tests/e2e/SCENARIO_MATRIX.md`
- `product/tests/e2e/README-RUNBOOK.md`
- `workboard/IN_PROGRESS.md`
- `workboard/BACKLOG.md`
- `handoffs/ACTIVE.md`
