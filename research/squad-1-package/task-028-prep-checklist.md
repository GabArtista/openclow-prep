<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# TASK-028 Prep Checklist — Staging-First E2E e Validação Controlada

> **Status:** ACTIVE PREP
> **Purpose:** transformar o estado atual do programa em uma sequência executável antes de iniciar a implementação da TASK-028.
> **Scope:** somente os artefatos que precisam existir para continuar com segurança.

## Current State

Already complete and merge-ready:
- `product/` is isolated from the prep repo and executable in local dev.
- Runtime persistence, queueing, capability registry, promotion/rollback, day-1 Doze squads, and audit trail baseline are implemented.
- GitHub issues `#8`, `#10`, and `#12` are closed; PRs `#9`, `#11`, and `#13` are merged.

Still missing before TASK-028 implementation should start:
- synthesis docs for architecture, runtime, observability, security, and cost
- a runnable staging-first E2E suite
- a staging/rollback runbook
- the remaining Squad 1 intake and exit-handoff content

## Blocking Order

| Order | Priority | Workstream | Exact file targets | Recommended owner |
|---|---|---|---|---|
| 1 | P0 | Status reconciliation | `workboard/BACKLOG.md`, `workboard/DONE.md`, `workboard/IN_PROGRESS.md`, `handoffs/ACTIVE.md` | `Documentation Agent` + `Program Architect` |
| 2 | P0 | Architecture synthesis | `research/architecture/architecture-target.md`, `decisions/ADR-0008-architecture-target.md` | `Program Architect` |
| 3 | P0 | Runtime durability | `research/runtime/durable-runtime-analysis.md`, `decisions/ADR-0009-runtime-durability.md` | `Durable Runtime Analyst` |
| 4 | P0 | Observability and evals | `research/observability/observability-and-evals.md`, `decisions/ADR-0010-observability-and-evals.md` | `Observability and Evals Analyst` |
| 5 | P0 | Security and agency boundaries | `research/security/security-and-agency-boundaries.md`, `decisions/ADR-0011-security-and-agency-boundaries.md` | `Security and Agency Boundaries Analyst` |
| 6 | P0 | Contract set verification | `product/packages/shared/contracts/v1/capability.schema.json`, `product/packages/shared/contracts/v1/squad.schema.json`, `product/packages/shared/contracts/v1/pipeline.schema.json`, `product/packages/shared/contracts/v1/step.schema.json`, `product/packages/shared/contracts/v1/checkpoint.schema.json`, `product/packages/shared/contracts/v1/run.schema.json`, `product/packages/shared/contracts/v1/approval.schema.json`, `product/packages/shared/contracts/v1/promotion.schema.json`, `product/packages/shared/contracts/v1/openclow-api.yaml` | `Program Architect` + `Registry Analyst` |
| 7 | P0 | E2E staging-first suite | `product/tests/e2e/marketing-run.spec.js`, `product/tests/e2e/intelligence-run.spec.js`, `product/tests/e2e/checkpoint-approval.spec.js`, `product/tests/e2e/promotion-rollback.spec.js`, `product/tests/e2e/persistence-restart.spec.js`, `product/tests/e2e/README.md` | `Observability and Evals Analyst` + `Durable Runtime Analyst` |
| 8 | P0 | Staging/rollback runbook | `research/observability/staging-rollout-and-rollback-runbook.md` | `Security and Agency Boundaries Analyst` + `Documentation Agent` |
| 9 | P1 | Cost guardrails | `research/cost/cost-and-throughput-model.md` | `Cost and Throughput Analyst` |
| 10 | P1 | Squad 1 handoff package | `research/squad-1-package/squad-1-definition.md`, `squads/squad-1/INTAKE_PACKAGE.md`, `squads/squad-0/EXIT_CHECKLIST.md` | `Program Architect` + `Documentation Agent` |

## Execution Sequence

1. Reconcile the operational status files first.
2. Write the synthesis docs for architecture, runtime, observability, security, and cost.
3. Normalize the versioned contracts and API contract against the implementation.
4. Turn the staging-first scenarios into executable tests in `product/tests/e2e/`.
5. Add the staging and rollback runbook.
6. Finish the Squad 1 handoff package and exit checklist.
7. Only after the checklist is green, start the TASK-028 implementation work.

## Recommended Agents

### Program Architect

Owns:
- `research/architecture/architecture-target.md`
- `decisions/ADR-0008-architecture-target.md`
- `research/squad-1-package/squad-1-definition.md`

Should not touch:
- runtime implementation details
- E2E test harness code
- security enforcement code

### Durable Runtime Analyst

Owns:
- `research/runtime/durable-runtime-analysis.md`
- `decisions/ADR-0009-runtime-durability.md`
- persistence/restart implications for the E2E suite

Should not touch:
- handoff paperwork
- security policy
- candidate evaluation content

### Observability and Evals Analyst

Owns:
- `research/observability/observability-and-evals.md`
- `decisions/ADR-0010-observability-and-evals.md`
- E2E coverage criteria and validation matrix

Should not touch:
- major architecture decisions
- secret-handling policy
- product feature design

### Security and Agency Boundaries Analyst

Owns:
- `research/security/security-and-agency-boundaries.md`
- `decisions/ADR-0011-security-and-agency-boundaries.md`
- staging/rollback runbook

Should not touch:
- runtime topology decisions
- broad product planning
- non-security refactors

### Documentation Agent

Owns:
- `workboard/BACKLOG.md`
- `workboard/DONE.md`
- `workboard/IN_PROGRESS.md`
- `handoffs/ACTIVE.md`
- `squads/squad-1/INTAKE_PACKAGE.md`
- `squads/squad-0/EXIT_CHECKLIST.md`

Should not touch:
- runtime code
- architectural tradeoffs
- test logic

## Nice-to-Have After the Blockers

- `research/candidate-assessments/openclaw-assessment.md`
- `research/candidate-assessments/paperclip-assessment.md`
- `research/upstream-health/upstream-health-report.md`
- `research/horizon/category-reality.md`
- `research/horizon/horizon-scan.md`
- `research/frontier/frontier-radar.md`

These do not block TASK-028, but they improve the quality of the Squad 1 handoff.
