# Required ADR Backlog and Decision Status

> **Status:** Draft for Plan 0 closure
> **Updated:** 2026-04-23

## Fechados para liberar bootstrap

| Tema | Status | Artefato |
|---|---|---|
| Control Plane Boundary | fechado | `decisions/ADR-0001-server-first-control-plane.md` |
| Runtime Strategy | fechado | `decisions/ADR-0002-local-first-runtime-with-ollama.md` |
| State and Memory Model | fechado | `decisions/ADR-0003-state-artifacts-and-registry-split.md` |
| Skill / Squad / Pipeline Registry | fechado | `decisions/ADR-0004-capability-registry-and-meta-squad.md` |
| Secrets and Credential Policy | fechado | `decisions/ADR-0005-production-safety-and-secrets-boundary.md` |
| Product Workspace Boundary | fechado | `decisions/ADR-0006-product-workspace-monorepo-boundary.md` |
| Opensquad Portability Decision | fechado para bootstrap | `research/ecosystem-fit/opensquad-portability-matrix.md` |

## Ainda obrigatórios antes do rollout amplo

1. **Checkpoint and Approval Model**
   - representação formal de checkpoints, rejeição e promoção

2. **Tool Permission Model**
   - allowlist por capacidade, blast radius e defaults

3. **Observability Baseline**
   - logs, métricas, tracing e critérios mínimos de auditoria
