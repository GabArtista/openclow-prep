# BACKLOG.md — Backlog do Programa

> **Convenções:**
> - **Prioridade:** P0 (crítico/bloqueante) | P1 (alta) | P2 (normal)
> - **Tamanho:** S (< 2h) | M (2-8h) | L (1-3 dias) | XL (> 3 dias)
> - **Status:** `backlog` | `in-progress` | `done` | `blocked`
> - Ao pegar uma task: mover para `workboard/IN_PROGRESS.md` e criar issue no GitHub

---

## Etapa 1 — Squad 0

### P0 — Crítico (Caminho Crítico)

### TASK-001 | P0 | M | Definir escopo exato do programa OpenClow
- **Output:** `research/program-scope/mission-scope.md`
- **Critério de aceite:** documento explicita objetivo do programa, não-objetivos, hipóteses, limites, sucesso/falha e perguntas que a Etapa 1 precisa responder para liberar o Squad 1
- **Dependências:** nenhuma

### TASK-002 | P0 | M | Mapear restrições reais do ambiente e critérios de qualidade
- **Output:** `research/program-scope/environment-constraints.md`, `research/architecture/quality-criteria.md`
- **Critério de aceite:** restrições técnicas, operacionais, de budget, governança e segurança estão descritas com origem, impacto e severidade; critérios de qualidade são mensuráveis e úteis para avaliar candidatos
- **Dependências:** TASK-001

### TASK-003 | P0 | L | Estudo profundo do OpenClaw
- **Output:** `research/candidate-assessments/openclaw-assessment.md`
- **Critério de aceite:** avaliação cobre arquitetura, comunidade, ecossistema, adaptabilidade, durabilidade, segurança, custo, riscos e lacunas para o contexto OpenClow
- **Dependências:** TASK-001, TASK-002

### TASK-004 | P0 | L | Estudo profundo do Paperclip
- **Output:** `research/candidate-assessments/paperclip-assessment.md`
- **Critério de aceite:** avaliação cobre arquitetura, comunidade, ecossistema, adaptabilidade, durabilidade, segurança, custo, riscos e lacunas para o contexto OpenClow
- **Dependências:** TASK-001, TASK-002

### TASK-005 | P0 | M | Mapear ecossistema MCP e requisitos de interoperabilidade
- **Output:** `research/ecosystem-fit/mcp-landscape.md`, `research/ecosystem-fit/mcp-interoperability-checklist.md`
- **Critério de aceite:** landscape documenta componentes, padrões, riscos de interoperabilidade, agency boundaries e requisitos mínimos para o OpenClow operar com previsibilidade
- **Dependências:** TASK-001, TASK-002

### TASK-006 | P0 | M | Avaliar saúde upstream, comunidade e sinais reais de adoção
- **Output:** `research/upstream-health/upstream-health-report.md`
- **Critério de aceite:** relatório distingue popularidade de sustentabilidade; cobre mantenedores, releases, governança, issue velocity, integridade de comunidade e sinais práticos de adoção
- **Dependências:** TASK-003, TASK-004, TASK-005

### TASK-007 | P0 | L | Definir runtime durável, retomável e control plane alvo
- **Output:** `research/runtime/durable-runtime-analysis.md`, `research/architecture/control-plane-options.md`
- **Critério de aceite:** failure modes, recuperação, checkpointing, replay, filas, isolamento e control plane multiagente foram avaliados contra as restrições do programa
- **Dependências:** TASK-003, TASK-004, TASK-005, TASK-006

### TASK-008 | P0 | M | Mapear observabilidade, evals e critérios de operação
- **Output:** `research/observability/observability-and-evals.md`
- **Critério de aceite:** documento define eventos, traces, logs, métricas, auditabilidade, feedback loops e estratégia de evals contínuos compatíveis com a arquitetura alvo
- **Dependências:** TASK-003, TASK-004, TASK-005, TASK-006

### TASK-009 | P0 | M | Mapear segurança, supply chain e limites de agência
- **Output:** `research/security/security-and-agency-boundaries.md`
- **Critério de aceite:** documento cobre prompt injection, excessive agency, credenciais, isolamento, dependências, supply chain e blast radius com mitigação proposta
- **Dependências:** TASK-003, TASK-004, TASK-005, TASK-006

### TASK-010 | P0 | M | Estimar custo previsível e throughput operacional
- **Output:** `research/cost/cost-and-throughput-model.md`
- **Critério de aceite:** budgets, envelopes de custo, throughput esperado, gargalos e guardrails operacionais estão descritos com premissas e incertezas explícitas
- **Dependências:** TASK-007, TASK-008

### P1 — Alta Prioridade

### TASK-011 | P1 | M | Fazer horizon scan e calibrar a realidade da categoria técnica
- **Output:** `research/horizon/category-reality.md`, `research/horizon/horizon-scan.md`
- **Critério de aceite:** documento registra como a categoria amadureceu em 2026 e quais sinais mudam prioridades, critérios de qualidade ou arquitetura do programa
- **Dependências:** TASK-003, TASK-004, TASK-005, TASK-006

### TASK-012 | P1 | S | Ativar radar de cientistas, pesquisadores e laboratórios relevantes
- **Output:** `research/frontier/frontier-radar.md`
- **Critério de aceite:** radar lista grupos, labs, pesquisadores ou linhas aplicadas somente quando houver relevância plausível para o OpenClow e descreve impacto esperado
- **Dependências:** TASK-011

### TASK-013 | P1 | L | Consolidar arquitetura alvo e baseline de ADRs
- **Output:** `research/architecture/architecture-target.md`, ADRs em `decisions/`
- **Critério de aceite:** arquitetura alvo é coerente com restrições, candidatos avaliados, runtime, observabilidade, segurança e custo; cada decisão major tem ADR ou decisão explícita de adiar
- **Dependências:** TASK-007, TASK-008, TASK-009, TASK-010, TASK-011, TASK-012

### TASK-014 | P1 | M | Definir formalmente o Squad 1 construtor
- **Output:** `research/squad-1-package/squad-1-definition.md`
- **Critério de aceite:** documento explicita missão, responsabilidades, papéis esperados, sequência inicial de execução, dependências e critérios de prontidão do Squad 1
- **Dependências:** TASK-013

### TASK-015 | P1 | M | Montar intake package e backlog inicial do Squad 1
- **Output:** `squads/squad-1/INTAKE_PACKAGE.md`, atualização de `workboard/BACKLOG.md` com tasks do Squad 1
- **Critério de aceite:** intake package está completo, sem seções pendentes, e o backlog inicial do Squad 1 reflete a arquitetura alvo e os guardrails operacionais
- **Dependências:** TASK-014

### TASK-016 | P1 | S | Revisar critérios de saída, riscos residuais e readiness do handoff
- **Output:** atualização de `squads/squad-0/EXIT_CHECKLIST.md` e `handoffs/ACTIVE.md`
- **Critério de aceite:** checklist de saída está verificável, riscos residuais foram explicitados e a próxima ação para liberar o Squad 1 está clara
- **Dependências:** TASK-015

---

## Backlog do Squad 1 (a ser preenchido pelo Squad 0 via TASK-015)

*Esta seção será preenchida quando TASK-015 for concluída.*
