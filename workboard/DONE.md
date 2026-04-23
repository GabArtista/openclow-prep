# DONE.md — Trabalho Concluído

> Registro cronológico de todos os itens completados.
> Cada entrada inclui o output produzido para rastreabilidade.

---

## Schema de uma Entrada

```
### TASK-XXX | [título]
- **Concluída em:** YYYY-MM-DD
- **Por:** [agent-id]
- **Issue:** #<numero> (fechada)
- **Branch:** [branch mergeada]
- **Output produzido:** [lista de arquivos criados ou modificados]
- **Notas:** [qualquer contexto relevante para o futuro]
```

---

## Histórico

### TASK-021 / TASK-022 | Governança do `product/` e bootstrap inicial do monorepo separado
- **Concluída em:** 2026-04-23
- **Por:** codex
- **Issue:** #2 (fechada)
- **Branch:** task/2-product-monorepo-bootstrap
- **Output produzido:**
  - `decisions/ADR-0006-product-workspace-monorepo-boundary.md`
  - `product/README.md`
  - `product/apps/`
  - `product/packages/`
  - `product/infra/k8s/README.md`
  - `product/tests/e2e/README.md`
  - `product/packages/shared/contracts/v1/`
  - atualização de `AGENTS.md`, `MISSION.md`, `README.md`, `context/POLICY.md`, `.github/workflows/validate-structure.yml`, `squads/squad-0/WORKPLAN.md`
- **Notas:** A raiz do repositório foi preservada como base operacional atual da Doze; o produto agora nasce isolado em `product/` com política staging-first e contratos públicos mínimos.

### TASK-001 / TASK-002 / TASK-017 / TASK-018 / TASK-019 | Escopo, restrições e benchmark operacional do MVP
- **Concluída em:** 2026-04-23
- **Por:** codex
- **Issue:** N/A (consolidação local formalizada em #2)
- **Branch:** task/2-product-monorepo-bootstrap
- **Output produzido:**
  - `research/program-scope/mission-scope.md`
  - `research/program-scope/environment-constraints.md`
  - `research/architecture/quality-criteria.md`
  - `research/ecosystem-fit/opensquad-fit-assessment.md`
  - `research/ecosystem-fit/opensquad-portability-matrix.md`
  - `research/ecosystem-fit/doze-integrations-inventory.md`
  - `research/runtime/server-reference-inventory.md`
  - `research/architecture/mvp-server-architecture.md`
  - `research/runtime/local-runtime-strategy.md`
  - `research/architecture/user-experience-and-meta-squad.md`
  - `research/squad-1-package/mvp-execution-plan.md`
  - `decisions/ADR-0001-server-first-control-plane.md`
  - `decisions/ADR-0002-local-first-runtime-with-ollama.md`
  - `decisions/ADR-0003-state-artifacts-and-registry-split.md`
  - `decisions/ADR-0004-capability-registry-and-meta-squad.md`
  - `decisions/ADR-0005-production-safety-and-secrets-boundary.md`
- **Notas:** O benchmark operacional atual da Doze, incluindo o repositório `mkt-ag-dozecrew/opensquad`, foi incorporado ao recorte day-1 e às decisões de build.

### BOOTSTRAP-001 | Bootstrap do repositório openclow-prep
- **Concluída em:** 2026-04-14
- **Por:** claude-code (Bootstrap Architect)
- **Issue:** N/A (task de bootstrap, pre-issues)
- **Branch:** main (commit inicial)
- **Output produzido:**
  - `.gitignore`
  - `CLAUDE.md`
  - `MISSION.md`
  - `README.md`
  - `context/POLICY.md`
  - `handoffs/ACTIVE.md`
  - `handoffs/PROTOCOL.md`
  - `handoffs/snapshots/.gitkeep`
  - `workboard/BACKLOG.md`
  - `workboard/IN_PROGRESS.md`
  - `workboard/DONE.md`
  - `squads/squad-0/CHARTER.md`
  - `squads/squad-0/ROLES.md`
  - `squads/squad-0/WORKPLAN.md`
  - `squads/squad-0/EXIT_CHECKLIST.md`
  - `squads/squad-1/INTAKE_PACKAGE.md`
  - `squads/squad-1/ENTRY_CHECKLIST.md`
  - `templates/TASK.md`
  - `templates/ADR.md`
  - `templates/RUNBOOK.md`
  - `templates/EVIDENCE.md`
  - `templates/ROLLBACK.md`
  - `decisions/.gitkeep`
  - `research/.gitkeep`
  - `.github/ISSUE_TEMPLATE/task.yml`
  - `.github/ISSUE_TEMPLATE/adr.yml`
  - `.github/ISSUE_TEMPLATE/question.yml`
  - `.github/ISSUE_TEMPLATE/bug.yml`
  - `.github/PULL_REQUEST_TEMPLATE.md`
  - `.github/labels.yml`
  - `.github/workflows/validate-structure.yml`
- **Notas:** Repositório bootstrapado do zero. Pronto para o Squad 0 iniciar TASK-001.
