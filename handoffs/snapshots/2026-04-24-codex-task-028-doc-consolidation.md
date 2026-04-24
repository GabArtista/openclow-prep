# Snapshot: TASK-028 Document Consolidation

> **Date:** 2026-04-24
> **Agent:** codex
> **Scope:** consolidar os artefatos de preparação antes de retomar o desenvolvimento da TASK-028

## What changed in this session

- documented the marketing and content workflows from `opensquad`
- documented the access pattern for `marketing-dozecrew` and `inteligencia-dozecrew`
- created the architecture target synthesis
- created runtime durability analysis
- created observability and evals synthesis
- created security and agency boundaries synthesis
- created staging rollout / rollback runbook
- created cost and throughput model
- created the Squad 1 definition
- completed the Squad 1 intake package draft
- completed the Squad 0 exit checklist draft
- added ADRs for architecture, durability, observability, and security
- reconciled `handoffs/ACTIVE.md` to show the consolidation in progress

## Current state

- The repo still treats `openclow-prep` as the operational base for the Doze.
- `product/` remains the isolated product workspace.
- The `opensquad` benchmark is now explicitly mapped into operational workflows and guardrails.
- The remaining work is not a missing concept, but an executable E2E and validation layer.

## Open questions

- whether the next cut should start with executable E2E scaffolding or with contract normalization in `product/packages/shared/contracts/v1`
- whether `TASK-028` should be split into explicit test and rollout subtasks

## Recommended next action

1. convert the documented flows into a staging-first E2E contract
2. confirm the validation sequence for marketing and intelligence runs
3. then move back to implementation work

## Relevant files

- `research/ecosystem-fit/doze-marketing-content-workflows.md`
- `research/architecture/architecture-target.md`
- `research/runtime/durable-runtime-analysis.md`
- `research/observability/observability-and-evals.md`
- `research/security/security-and-agency-boundaries.md`
- `research/observability/staging-rollout-and-rollback-runbook.md`
- `research/cost/cost-and-throughput-model.md`
- `research/squad-1-package/squad-1-definition.md`
- `squads/squad-1/INTAKE_PACKAGE.md`
- `squads/squad-0/EXIT_CHECKLIST.md`
- `decisions/ADR-0008-architecture-target.md`
- `decisions/ADR-0009-runtime-durability.md`
- `decisions/ADR-0010-observability-and-evals.md`
- `decisions/ADR-0011-security-and-agency-boundaries.md`
