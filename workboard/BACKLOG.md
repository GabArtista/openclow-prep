# BACKLOG.md — Backlog do Programa

> **Convenções:**
> - **Prioridade:** P0 (crítico/bloqueante) | P1 (alta) | P2 (normal)
> - **Tamanho:** S (< 2h) | M (2-8h) | L (1-3 dias) | XL (> 3 dias)
> - **Status:** `backlog` | `in-progress` | `done` | `blocked`
> - Ao pegar uma task: mover para `workboard/IN_PROGRESS.md` e criar issue no GitHub

---

## Etapa 1 — Squad 0

### P0 — Crítico (Caminho Crítico)

### TASK-023 | P0 | L | Implementar o core server-first do OpenClow em `product/`
- **Output:** scaffold funcional em `product/apps/api`, `product/apps/dashboard`, `product/apps/worker` e pacotes base
- **Critério de aceite:** o core mínimo consegue modelar capabilities, iniciar runs, registrar checkpoints e expor histórico sem quebrar a operação atual da Doze na raiz do repositório
- **Dependências:** TASK-021, TASK-022

### TASK-024 | P0 | M | Integrar runtime local, filas e persistência base
- **Output:** wiring inicial com `Ollama`, `Postgres`, `Redis` e `MinIO` em `product/`
- **Critério de aceite:** tiers `fast` e `powerful`, run state, artifact persistence e retry/restart funcionam no ambiente de referência sem tocar produção por default
- **Dependências:** TASK-023

### TASK-025 | P0 | L | Portar capacidades day-1 da Doze para o OpenClow
- **Output:** capacidades equivalentes a `marketing-dozecrew` e `inteligencia-dozecrew`, mais integrações reais day-1
- **Critério de aceite:** o produto reproduz os fluxos que hoje já sustentam o trabalho da Doze com as empresas da 12, mas com enforcement próprio e lifecycle `draft/staging/active`
- **Dependências:** TASK-023, TASK-024

### TASK-026 | P0 | M | Implementar registry, promotion flow e meta-squad do MVP
- **Output:** lifecycle de capabilities, promotion/rollback e base do meta-squad
- **Critério de aceite:** novas capabilities podem ser criadas e promovidas até `staging`, nunca autopublicadas, com aprovação humana e trilha auditável
- **Dependências:** TASK-023, TASK-024, TASK-025

### TASK-027 | P0 | M | Instrumentar observabilidade, segurança e rollback operacional
- **Output:** baseline de logs, tracing, allowlist de tools, rollback e hardening de segredos
- **Critério de aceite:** ações externas sem checkpoint falham, capabilities sem permissão não executam tools fora da allowlist e o sistema produz trilha operacional útil
- **Dependências:** TASK-024, TASK-025, TASK-026

### TASK-028 | P0 | M | Rodar E2E staging-first e preparar validações controladas em produção
- **Output:** suíte E2E em `product/tests/e2e` e runbook de homologação
- **Critério de aceite:** marketing, inteligência, checkpoints, promotion e persistência passam em staging; qualquer validação em produção fica restrita a leitura/dry-run com aprovação explícita
- **Dependências:** TASK-025, TASK-026, TASK-027

### P1 — Alta Prioridade

### TASK-013 | P1 | L | Consolidar arquitetura alvo e baseline de ADRs
- **Output:** `research/architecture/architecture-target.md`, ADRs em `decisions/`
- **Critério de aceite:** arquitetura alvo é coerente com o benchmark operacional atual da Doze, runtime, observabilidade, segurança e custo; cada decisão major tem ADR ou decisão explícita de adiar
- **Dependências:** TASK-023, TASK-024, TASK-025, TASK-026, TASK-027

### TASK-020 | P1 | M | Definir registry de capacidades e meta-squad de auto-construção
- **Output:** `research/architecture/capability-registry-and-meta-squad.md`
- **Critério de aceite:** documento define como `skills`, `squads`, `pipelines` e `tools` são versionados, validados, promovidos, revertidos e evoluídos por um meta-squad com checkpoints humanos
- **Dependências:** TASK-026

### TASK-014 | P1 | M | Definir formalmente o Squad 1 construtor
- **Output:** `research/squad-1-package/squad-1-definition.md`
- **Critério de aceite:** documento explicita missão, responsabilidades, papéis esperados, sequência inicial de execução, dependências e critérios de prontidão do Squad 1
- **Dependências:** TASK-013, TASK-020, TASK-028

### TASK-015 | P1 | M | Montar intake package e backlog inicial do Squad 1
- **Output:** `squads/squad-1/INTAKE_PACKAGE.md`, `research/squad-1-package/mvp-execution-plan.md`, atualização de `workboard/BACKLOG.md` com tasks do Squad 1
- **Critério de aceite:** intake package está completo, sem seções pendentes, o backlog inicial do Squad 1 reflete a arquitetura alvo e os guardrails operacionais, e o MVP server-first está quebrado em fases executáveis
- **Dependências:** TASK-014

### TASK-016 | P1 | S | Revisar critérios de saída, riscos residuais e readiness do handoff
- **Output:** atualização de `squads/squad-0/EXIT_CHECKLIST.md` e `handoffs/ACTIVE.md`
- **Critério de aceite:** checklist de saída está verificável, riscos residuais foram explicitados e a próxima ação para liberar o Squad 1 está clara
- **Dependências:** TASK-015

---

## Backlog do Squad 1 (a ser preenchido pelo Squad 0 via TASK-015)

*Esta seção será preenchida quando TASK-015 for concluída.*
