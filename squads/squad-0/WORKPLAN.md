# WORKPLAN.md — Plano de Trabalho do Squad 0

> **Version:** 2.0
> **Última atualização:** 2026-04-15
> **Objetivo:** tornar a Etapa 1 previsível e defensável antes do Squad 1 construir

---

## Visão Geral das Fases

```
Fase 0.1: Fundação (COMPLETO)
    └── Bootstrap do repositório

Fase 0.2: Escopo e Restrições Reais
    ├── Escopo exato do programa
    ├── Restrições do ambiente
    └── Critérios de qualidade

Fase 0.3: Pesquisa Profunda do Ecossistema
    ├── OpenClaw
    ├── Paperclip
    ├── MCP e interoperabilidade
    ├── saúde upstream e adaptação
    └── category reality, horizon e frontier radar

Fase 0.4: Validação Arquitetural e Operacional
    ├── runtime durável
    ├── observabilidade e evals
    ├── custo e throughput
    ├── segurança e agency boundaries
    └── arquitetura alvo consolidada

Fase 0.5: Preparação do Squad 1
    ├── definição formal do squad construtor
    ├── intake package
    └── backlog inicial de construção

Fase 0.6: Revisão de Saída
    └── critérios de saída e riscos residuais
```

---

## Fase 0.1: Fundação
**Status:** COMPLETO ✓
**Concluída em:** 2026-04-14

**Outputs:**
- Estrutura completa do repositório
- CLAUDE.md, MISSION.md, README.md
- Templates, workboard, handoffs, GitHub workflow

---

## Fase 0.2: Escopo e Restrições Reais
**Status:** Não iniciado
**Tasks:**
- TASK-001: Definir escopo exato do programa OpenClow (P0, M)
- TASK-002: Mapear restrições reais do ambiente e critérios de qualidade (P0, M)

**Dependências:** nenhuma
**Outputs esperados:** `research/program-scope/mission-scope.md`, `research/program-scope/environment-constraints.md`, `research/architecture/quality-criteria.md`

**Critério de conclusão da fase:** escopo, não-objetivos, restrições e critérios de qualidade documentados com evidência suficiente para orientar as próximas fases.

---

## Fase 0.3: Pesquisa Profunda do Ecossistema
**Status:** Não iniciado
**Tasks:**
- TASK-003: Estudo profundo do OpenClaw (P0, L)
- TASK-004: Estudo profundo do Paperclip (P0, L)
- TASK-005: Mapear ecossistema MCP e requisitos de interoperabilidade (P0, M)
- TASK-006: Avaliar saúde upstream, comunidade e sinais reais de adoção (P0, M)
- TASK-011: Horizon scan e realidade da categoria técnica (P1, M)
- TASK-012: Radar de cientistas, pesquisadores e laboratórios relevantes (P1, S)

**Dependências:** Fase 0.2 ao menos parcialmente concluída
**Outputs esperados:** artefatos em `research/candidate-assessments/`, `research/ecosystem-fit/`, `research/upstream-health/`, `research/horizon/`, `research/frontier/`

**Critério de conclusão da fase:** candidatos avaliados com profundidade suficiente para descartar, adaptar ou levar adiante; riscos upstream e sinais emergentes documentados.

---

## Fase 0.4: Validação Arquitetural e Operacional
**Status:** Não iniciado
**Tasks:**
- TASK-007: Definir runtime durável, retomável e control plane alvo (P0, L)
- TASK-008: Mapear observabilidade, evals e critérios de operação (P0, M)
- TASK-009: Mapear segurança, supply chain e limites de agência (P0, M)
- TASK-010: Estimar custo previsível e throughput operacional (P0, M)
- TASK-013: Consolidar arquitetura alvo e baseline de ADRs (P1, L)

**Dependências:** Fase 0.3 substancialmente concluída
**Outputs esperados:** artefatos em `research/runtime/`, `research/observability/`, `research/security/`, `research/cost/`, `research/architecture/`, ADRs em `decisions/`

**Critério de conclusão da fase:** arquitetura alvo defensável, com runtime, operação, custo e segurança suficientemente mapeados para handoff.

---

## Fase 0.5: Preparação do Squad 1
**Status:** Não iniciado
**Tasks:**
- TASK-014: Definir formalmente o Squad 1 construtor (P1, M)
- TASK-015: Montar o intake package e backlog inicial do Squad 1 (P1, M)

**Dependências:** Fase 0.4 concluída
**Outputs esperados:** `research/squad-1-package/squad-1-definition.md`, `squads/squad-1/INTAKE_PACKAGE.md`, backlog inicial do Squad 1 em `workboard/BACKLOG.md`

**Critério de conclusão da fase:** o Squad 1 recebe missão, papéis, backlog inicial e pacote técnico-operacional coerente.

---

## Fase 0.6: Revisão de Saída
**Status:** Não iniciado
**Tasks:**
- TASK-016: Revisar critérios de saída, riscos residuais e readiness do handoff (P1, S)

**Dependências:** Fase 0.5 concluída; nenhuma issue `blocking-exit` aberta
**Outputs esperados:** `squads/squad-0/EXIT_CHECKLIST.md` atualizado e riscos residuais explicitados

**Critério de conclusão da fase:** Program Lead aprova formalmente e o Squad 1 pode iniciar.

---

## Grafo de Dependências (Resumo)

```
TASK-001 (escopo) ──→ TASK-003 (OpenClaw)
TASK-001 ──→ TASK-004 (Paperclip)
TASK-001 ──→ TASK-005 (MCP)
TASK-002 (restrições) ──→ TASK-003
TASK-002 ──→ TASK-004
TASK-002 ──→ TASK-005
TASK-003..005 ──→ TASK-006 (upstream/adaptação)
TASK-003..006 ──→ TASK-007 (runtime)
TASK-003..006 ──→ TASK-008 (observability/evals)
TASK-003..006 ──→ TASK-009 (segurança/agência)
TASK-003..008 ──→ TASK-010 (custo/throughput)
TASK-006 ──→ TASK-011 (category reality / horizon)
TASK-011 ──→ TASK-012 (frontier radar)
TASK-007..012 ──→ TASK-013 (arquitetura alvo)
TASK-013 ──→ TASK-014 (Squad 1 formal)
TASK-014 ──→ TASK-015 (intake + backlog inicial)
TASK-015 ──→ TASK-016 (exit review)
```
