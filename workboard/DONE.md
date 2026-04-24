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

### TASK-039 | Implementar o primeiro corte do sistema criativo em `product/`
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #22 (fechada)
- **Branch:** task/22-creative-first-cut
- **Output produzido:**
  - `product/packages/orchestrator/src/service.js`
  - `product/packages/runtime/src/service.js`
  - `product/packages/tools/src/runner.js`
  - `product/tests/e2e/run.mjs`
  - `product/README.md`
  - `workboard/BACKLOG.md`
  - `workboard/IN_PROGRESS.md`
  - `workboard/DONE.md`
  - `handoffs/ACTIVE.md`
  - `handoffs/snapshots/2026-04-24-codex-task-039-complete.md`
- **Notas:** O produto agora expõe e executa o primeiro corte criativo seeded (`creative-control`, `reference-lab`, `creative-qa`) com outputs persistidos e regressão passando junto com marketing e inteligência.

### TASK-038 | Transformar a arquitetura criativa em contracts e seeds implementáveis
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #20 (fechada)
- **Branch:** task/20-creative-contracts-manifests
- **Output produzido:**
  - `research/architecture/creative-agent-contracts.md`
  - `research/architecture/creative-squad-manifests.md`
  - `research/architecture/README.md`
  - `product/packages/shared/contracts/v1/capability.schema.json`
  - `product/packages/shared/contracts/v1/squad.schema.json`
  - `product/packages/shared/contracts/v1/pipeline.schema.json`
  - `product/packages/shared/contracts/v1/step.schema.json`
  - `product/packages/shared/contracts/v1/run.schema.json`
  - `product/packages/shared/contracts/v1/checkpoint.schema.json`
  - `product/packages/shared/contracts/v1/approval.schema.json`
  - `product/packages/shared/contracts/v1/openclow-api.yaml`
  - `product/packages/shared/src/contracts.js`
  - `product/packages/shared/src/seeds.js`
  - `product/packages/skills/src/catalog.js`
  - `workboard/BACKLOG.md`
  - `workboard/IN_PROGRESS.md`
  - `workboard/DONE.md`
  - `handoffs/ACTIVE.md`
  - `handoffs/snapshots/2026-04-24-codex-task-038-complete.md`
- **Notas:** O produto agora tem contratos públicos e seeds iniciais para a trilha criativa. O próximo corte já pode entrar em implementação real no `product/`, ainda sob boundary de `local-dev` e `staging`.

### TASK-037 | Traduzir a pesquisa de campo em arquitetura de referência para workflows criativos
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #18 (fechada)
- **Branch:** task/18-creative-workflow-architecture
- **Output produzido:**
  - `research/architecture/creative-workflow-reference-architecture.md`
  - `research/ecosystem-fit/creative-tooling-profiles.md`
  - `research/architecture/README.md`
  - `research/ecosystem-fit/README.md`
  - `workboard/BACKLOG.md`
  - `workboard/IN_PROGRESS.md`
  - `workboard/DONE.md`
  - `handoffs/ACTIVE.md`
  - `handoffs/snapshots/2026-04-24-codex-task-037-complete.md`
- **Notas:** A trilha criativa do programa ficou pronta para sair de pesquisa ampla e entrar em definição de contracts implementáveis. A arquitetura já separa claramente o que pode começar agora em `product/` do que ainda depende de staging antes de tocar o servidor de produção.

### TASK-036 | Formalizar pesquisa de campo sobre workflows criativos com Codex, Claude Code e OpenClaw
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #16 (fechada)
- **Branch:** task/16-workflow-field-researcher
- **Output produzido:**
  - `squads/squad-0/ROLES.md`
  - `research/horizon/coding-agent-creative-workflows-field-report.md`
  - `research/horizon/README.md`
  - `workboard/BACKLOG.md`
  - `workboard/DONE.md`
  - `handoffs/ACTIVE.md`
- **Notas:** O programa ganhou um papel dedicado a estudar workflows reais de mercado com Codex, Claude Code e OpenClaw, mais um relatório inicial conectando esses sinais ao desenho futuro do OpenClow + Paperclip.

### TASK-035 | Reconciliar WORKPLAN e CHARTER do Squad 0 com o baseline concluído
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #15 (fechada)
- **Branch:** task/15-workplan-charter-closure
- **Output produzido:**
  - `squads/squad-0/CHARTER.md`
  - `squads/squad-0/WORKPLAN.md`
  - `workboard/DONE.md`
  - `handoffs/ACTIVE.md`
  - `handoffs/snapshots/2026-04-24-codex-task-035-complete.md`
- **Notas:** O charter e o workplan do Squad 0 passaram a refletir o baseline já concluído, com as fases principais marcadas como completas e o Squad 0 registrado como encerrado.

### TASK-034 | Reconciliar pacote de handoff final do Squad 0
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #14 (fechada)
- **Branch:** task/14-handoff-reconciliation
- **Output produzido:**
  - `squads/squad-0/EXIT_CHECKLIST.md`
  - `squads/squad-1/INTAKE_PACKAGE.md`
  - `workboard/BACKLOG.md`
  - `workboard/IN_PROGRESS.md`
  - `handoffs/ACTIVE.md`
  - `research/squad-1-package/task-034-handoff-reconciliation.md`
- **Notas:** O pacote de handoff final do Squad 0 passou a refletir o baseline real do programa, com checklist e intake package em estado de signoff e o backlog voltando a zero.

### TASK-033 | Fechar o primeiro ciclo de rollout e validação controlada
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #12 (fechada)
- **Branch:** task/12-observability-security
- **Output produzido:**
  - `research/squad-1-package/task-033-rollout-validation.md`
  - `research/observability/production-rollout-runbook.md`
  - `research/observability/production-rollout-rollback.md`
  - `research/observability/production-change-safety-checklist.md`
  - `research/observability/production-change-safety-evidence.md`
  - `research/observability/README.md`
  - `research/squad-1-package/README.md`
  - `workboard/BACKLOG.md`
  - `workboard/IN_PROGRESS.md`
  - `handoffs/ACTIVE.md`
- **Notas:** O primeiro ciclo de rollout controlado ficou documentado com leitura primeiro, dry-run depois e checkpoint humano para qualquer escrita externa. A task não alterou o runtime; fechou o pacote operacional de produção segura.

### TASK-032 | Formalizar a suíte E2E como regressão automatizada
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #12 (fechada)
- **Branch:** task/12-observability-security
- **Output produzido:**
  - `product/package.json`
  - `product/tests/e2e/README.md`
  - `product/tests/e2e/REGRESSION.md`
  - `workboard/BACKLOG.md`
  - `workboard/IN_PROGRESS.md`
  - `handoffs/ACTIVE.md`
- **Notas:** O harness staging-first foi formalizado como regressão canônica do produto via `npm --prefix product run regression`, com cobertura explícita de marketing, inteligência, checkpoints, promotion/rollback, restart recovery e smoke do dashboard.

### TASK-031 | Expandir o dashboard operacional para o fluxo real de squads
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #12 (fechada)
- **Branch:** task/12-observability-security
- **Output produzido:**
  - `product/apps/dashboard/src/index.html`
  - `product/apps/dashboard/src/app.js`
  - `product/apps/dashboard/src/server.js`
  - `product/apps/api/src/server.js`
  - `product/package.json`
  - `product/tests/e2e/run.mjs`
  - `workboard/IN_PROGRESS.md`
  - `handoffs/ACTIVE.md`
- **Notas:** O dashboard foi reestruturado para run view, step view, checkpoint panel, outputs e histórico, e o harness E2E passou a validar também a superfície do dashboard com injection do `OPENCLOW_API_BASE`.

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

### TASK-028 | Rodar E2E staging-first e preparar validações controladas em produção
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #12 (fechada)
- **Branch:** task/12-observability-security
- **Output produzido:**
  - `research/ecosystem-fit/doze-marketing-content-workflows.md`
  - `research/architecture/architecture-target.md`
  - `research/runtime/durable-runtime-analysis.md`
  - `research/observability/observability-and-evals.md`
  - `research/security/security-and-agency-boundaries.md`
  - `research/observability/staging-rollout-and-rollback-runbook.md`
  - `research/cost/cost-and-throughput-model.md`
  - `research/squad-1-package/squad-1-definition.md`
  - `research/squad-1-package/e2e-contract-vs-surface.md`
  - `squads/squad-1/INTAKE_PACKAGE.md`
  - `squads/squad-0/EXIT_CHECKLIST.md`
  - `decisions/ADR-0008-architecture-target.md`
  - `decisions/ADR-0009-runtime-durability.md`
  - `decisions/ADR-0010-observability-and-evals.md`
  - `decisions/ADR-0011-security-and-agency-boundaries.md`
  - `product/tests/e2e/README.md`
  - `product/tests/e2e/SCENARIO_MATRIX.md`
  - `product/tests/e2e/README-RUNBOOK.md`
  - `product/tests/e2e/run.mjs`
  - `product/packages/shared/contracts/v1/openclow-api.yaml`
  - `workboard/IN_PROGRESS.md`
  - `workboard/BACKLOG.md`
  - `handoffs/ACTIVE.md`
- **Notas:** O contrato staging-first foi formalizado, mapeado contra a superfície real da API/runtime e validado com harness executável. Os cenários de marketing, inteligência, checkpoints, promotion/rollback e restart recovery passaram localmente.

### TASK-029 | Fechar o contrato de identidade e autorização do produto
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #12 (fechada)
- **Branch:** task/12-observability-security
- **Output produzido:**
  - `research/architecture/auth-and-identity-model.md`
  - `decisions/ADR-0012-auth-and-identity-model.md`
  - `product/packages/shared/contracts/v1/openclow-api.yaml`
  - `workboard/IN_PROGRESS.md`
  - `handoffs/ACTIVE.md`
- **Notas:** O produto ficou com um modelo mínimo de identidade/autorização que diferencia human, worker, orchestrator, meta-squad e system actor, usando os campos de request já existentes como base de auditoria no MVP.

### TASK-030 | Integrar persistência transacional e filas duráveis do produto
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #12 (fechada)
- **Branch:** task/12-observability-security
- **Output produzido:**
  - `research/runtime/transactional-persistence-and-durable-queue.md`
  - `decisions/ADR-0013-storage-and-durable-queue.md`
  - `product/packages/storage/README.md`
  - `product/packages/storage/src/service.js`
  - `product/packages/runtime/src/persistence.js`
  - `product/packages/runtime/src/service.js`
  - `product/apps/api/src/state.js`
  - `product/apps/api/src/server.js`
  - `product/package.json`
  - `product/tests/e2e/run.mjs`
  - `workboard/IN_PROGRESS.md`
  - `handoffs/ACTIVE.md`
- **Notas:** O MVP agora persiste estado transacional com escrita atômica, queue separada e índices de artefatos. O harness E2E validou marketing, inteligência, promotion/rollback, restart recovery e a trilha durável em disco.

### TASK-016 | Revisar critérios de saída, riscos residuais e readiness do handoff
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #12 (fechada)
- **Branch:** task/12-observability-security
- **Output produzido:**
  - `squads/squad-0/EXIT_CHECKLIST.md`
  - `handoffs/ACTIVE.md`
  - `handoffs/snapshots/2026-04-24-codex-task-028-complete.md`
- **Notas:** O checklist de saída ficou verificável, os riscos residuais ficaram explicitados e a recomendação de handoff passou a apontar claramente a próxima ação.

### TASK-015 | Montar intake package e backlog inicial do Squad 1
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #12 (fechada)
- **Branch:** task/12-observability-security
- **Output produzido:**
  - `squads/squad-1/INTAKE_PACKAGE.md`
  - `research/squad-1-package/mvp-execution-plan.md`
  - `research/squad-1-package/squad-1-definition.md`
  - `research/squad-1-package/e2e-contract-vs-surface.md`
  - `workboard/BACKLOG.md`
- **Notas:** O intake package passou a consolidar a arquitetura alvo, os guardrails operacionais e o recorte do MVP server-first em fases executáveis.

### TASK-014 | Definir formalmente o Squad 1 construtor
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #12 (fechada)
- **Branch:** task/12-observability-security
- **Output produzido:**
  - `research/squad-1-package/squad-1-definition.md`
  - `research/architecture/user-experience-and-meta-squad.md`
  - `research/architecture/capability-registry-and-meta-squad.md`
- **Notas:** O Squad 1 ficou definido como o time construtor do produto em `product/`, com critérios claros de prontidão, sequência inicial de execução e fronteiras operacionais.

### TASK-013 | Consolidar arquitetura alvo e baseline de ADRs
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #12 (fechada)
- **Branch:** task/12-observability-security
- **Output produzido:**
  - `research/architecture/architecture-target.md`
  - `decisions/ADR-0008-architecture-target.md`
  - `decisions/ADR-0009-runtime-durability.md`
  - `decisions/ADR-0010-observability-and-evals.md`
  - `decisions/ADR-0011-security-and-agency-boundaries.md`
- **Notas:** A arquitetura-alvo foi consolidada em torno de um control plane server-first, com runtime persistente, observabilidade, segurança e staging-first como baseline.

### TASK-020 | Definir registry de capacidades e meta-squad de auto-construção
- **Concluída em:** 2026-04-24
- **Por:** codex
- **Issue:** #12 (fechada)
- **Branch:** task/12-observability-security
- **Output produzido:**
  - `research/architecture/capability-registry-and-meta-squad.md`
  - `decisions/ADR-0007-registry-promotion-approval-flow.md`
  - `decisions/ADR-0004-capability-registry-and-meta-squad.md`
- **Notas:** O registry ficou definido como lifecycle manager de capabilities com promoção, rollback e aprovação humana; o meta-squad passou a operar como capability interna sem autopublicação.

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
