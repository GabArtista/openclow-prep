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

### TASK-027 | Instrumentar observabilidade, segurança e rollback operacional
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #12 (fechada)
- **Branch:** task/12-observability-security
- **Output produzido:**
  - `product/packages/runtime/src/service.js`
  - `product/packages/orchestrator/src/service.js`
  - `product/apps/api/src/server.js`
  - `product/packages/shared/contracts/v1/openclow-api.yaml`
  - `product/packages/runtime/src/persistence.js`
  - `product/apps/api/README.md`
  - `product/packages/registry/README.md`
  - atualização de `workboard/IN_PROGRESS.md` e `handoffs/ACTIVE.md`
- **Notas:** O MVP ganhou trilha de auditoria persistida para capabilities, promotions, runs e checkpoints, mais endpoint `GET /v1/audit`. A auditoria foi smoke-testada com capability criada e promoção aprovada.

### TASK-026 | Implementar registry, promotion flow e meta-squad do MVP
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #10 (fechada)
- **Branch:** task/10-registry-promotion
- **Output produzido:**
  - `decisions/ADR-0007-registry-promotion-approval-flow.md`
  - `product/packages/registry/src/service.js`
  - `product/apps/api/src/server.js`
  - `product/packages/shared/contracts/v1/promotion.schema.json`
  - `product/packages/shared/contracts/v1/openclow-api.yaml`
  - `product/packages/runtime/src/persistence.js`
  - `product/packages/shared/src/seeds.js`
  - `product/apps/api/README.md`
  - `product/packages/registry/README.md`
  - atualização de `workboard/IN_PROGRESS.md` e `handoffs/ACTIVE.md`
- **Notas:** O registry agora registra capabilities, promotion requests e rollback explícitos com aprovação humana. O meta-squad ganhou uma capability interna seeded como `draft`. Smoke test validou promotion `draft -> staging`, approval, rollback `staging -> draft` e trilha persistida em `approvals`/`promotions`.

### TASK-025 | Portar capacidades day-1 da Doze para o OpenClow
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #8 (fechada)
- **Branch:** task/8-day1-capabilities
- **Output produzido:**
  - `product/packages/tools/README.md`
  - `product/packages/tools/src/runner.js`
  - `product/packages/runtime/src/service.js`
  - `product/packages/shared/src/seeds.js`
  - `product/package.json`
  - atualização de `workboard/IN_PROGRESS.md` e `handoffs/ACTIVE.md`
- **Notas:** As capacidades day-1 da Doze agora executam artefatos estruturados para marketing e inteligência, com tool bindings para `ga4`, `woocommerce`, `meta-insights`, `hotjar`, `apify`, `canva` e `instagram-publisher`; `blotato` ficou como optional tool e é adiado com artefato explícito. O runtime também ganhou fallback compatível para state files locais antigos sem `tool_slugs`.

### TASK-024 | Integrar runtime local, persistencia base e fila ao core do `product/`
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #6 (fechada)
- **Branch:** task/6-runtime-persistence-queue
- **Output produzido:**
  - `product/packages/runtime/src/persistence.js`
  - `product/packages/runtime/src/ollama.js`
  - `product/packages/runtime/src/service.js`
  - `product/apps/api/src/state.js`
  - `product/apps/api/src/server.js`
  - `product/packages/orchestrator/src/service.js`
  - `product/packages/registry/src/service.js`
  - `product/package.json`
  - atualização de `workboard/IN_PROGRESS.md` e `handoffs/ACTIVE.md`
- **Notas:** O runtime agora usa persistência em arquivo local de desenvolvimento, fila durável simples e probe opcional de Ollama. Smoke test validou restart da API com o run em `waiting_checkpoint` preservado no disco.

### TASK-023 | Implementar o core server-first do OpenClow em `product/`
- **Concluída em:** 2026-04-23
- **Por:** codex
- **Issue:** #4 (fechada)
- **Branch:** task/4-core-server-first
- **Output produzido:**
  - `product/package.json`
  - `product/.gitignore`
  - `product/apps/api/src/server.js`
  - `product/apps/api/src/state.js`
  - `product/apps/worker/src/worker.js`
  - `product/apps/dashboard/src/server.js`
  - `product/apps/dashboard/src/index.html`
  - `product/apps/dashboard/src/app.js`
  - `product/packages/shared/src/`
  - `product/packages/registry/src/service.js`
  - `product/packages/orchestrator/src/service.js`
  - `product/packages/runtime/src/service.js`
  - `product/packages/skills/src/catalog.js`
  - atualização dos READMEs de `product/`
- **Notas:** O core inicial ficou sem dependências externas, com API HTTP local como fonte de verdade em memória, worker por polling HTTP e dashboard estático; smoke test validou criação de run e pausa no primeiro checkpoint humano do squad de marketing.

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
