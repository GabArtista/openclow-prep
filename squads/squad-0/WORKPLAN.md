# WORKPLAN.md — Plano de Trabalho do Squad 0

> **Version:** 2.0
> **Última atualização:** 2026-04-23
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

Fase 0.5: Governança de Implementação e Bootstrap do Monorepo
    ├── decisão formal do espaço `product/`
    ├── política staging-first para integrações reais
    └── contratos e layout mínimos do MVP

Fase 0.6: Preparação do Squad 1
    ├── definição formal do squad construtor
    ├── intake package
    └── backlog inicial de construção

Fase 0.7: Revisão de Saída
    └── critérios de saída e riscos residuais
```

---

## Fase 0.1: Fundação
**Status:** COMPLETO ✓
**Concluída em:** 2026-04-14

**Outputs:**
- Estrutura completa do repositório
- AGENTS.md, CLAUDE.md, CODEX.md, MISSION.md, README.md
- Templates, workboard, handoffs, GitHub workflow

---

## Fase 0.2: Escopo e Restrições Reais
**Status:** Em andamento
**Tasks:**
- TASK-001: Definir escopo exato do programa OpenClow (P0, M)
- TASK-002: Mapear restrições reais do ambiente e critérios de qualidade (P0, M)
- TASK-017: Avaliar o opensquad e definir matriz de portabilidade para o OpenClow (P0, M)
- TASK-018: Inventariar o servidor de referência e validar readiness operacional do MVP (P0, S)
- TASK-019: Inventariar integrações reais da Doze e definir recorte day-1 do MVP (P0, M)

**Dependências:** nenhuma
**Outputs esperados:** `research/program-scope/mission-scope.md`, `research/program-scope/environment-constraints.md`, `research/architecture/quality-criteria.md`, `research/ecosystem-fit/opensquad-fit-assessment.md`, `research/ecosystem-fit/opensquad-portability-matrix.md`, `research/ecosystem-fit/doze-integrations-inventory.md`, `research/runtime/server-reference-inventory.md`

**Critério de conclusão da fase:** escopo, não-objetivos, restrições e critérios de qualidade documentados com evidência suficiente para orientar as próximas fases; `opensquad`, servidor e integrações da Doze já estão formalizados como insumos do MVP.

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

**Dependências:** Fase 0.2 ao menos parcialmente concluída, incluindo benchmark do `opensquad`, servidor e integrações reais da Doze
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
- TASK-020: Definir registry de capacidades e meta-squad de auto-construção (P1, M)

**Dependências:** Fase 0.3 substancialmente concluída
**Outputs esperados:** artefatos em `research/runtime/`, `research/observability/`, `research/security/`, `research/cost/`, `research/architecture/`, ADRs em `decisions/`

**Critério de conclusão da fase:** arquitetura alvo defensável, com runtime, operação, custo, segurança e governança de capacidades suficientemente mapeados para handoff.

---

## Fase 0.5: Governança de Implementação e Bootstrap do Monorepo
**Status:** Em andamento
**Tasks:**
- TASK-021: Formalizar governança do `product/` e limites do monorepo separado (P0, M)
- TASK-022: Bootstrapar `product/` com layout do MVP e contratos públicos mínimos (P0, M)

**Dependências:** TASK-013, TASK-017, TASK-018, TASK-019
**Outputs esperados:** ADR de governança do workspace, atualização de `AGENTS.md`, `MISSION.md`, `README.md`, `context/POLICY.md`, `workboard/`, `handoffs/` e scaffold inicial em `product/`

**Critério de conclusão da fase:** o repositório permite implementação apenas em `product/`, a fronteira com a camada de preparação está explícita e o layout base do MVP já existe com contratos versionados mínimos.

---

## Fase 0.6: Preparação do Squad 1
**Status:** Não iniciado
**Tasks:**
- TASK-014: Definir formalmente o Squad 1 construtor (P1, M)
- TASK-015: Montar o intake package e backlog inicial do Squad 1 (P1, M)

**Dependências:** Fase 0.5 concluída
**Outputs esperados:** `research/squad-1-package/squad-1-definition.md`, `research/squad-1-package/mvp-execution-plan.md`, `squads/squad-1/INTAKE_PACKAGE.md`, backlog inicial do Squad 1 em `workboard/BACKLOG.md`

**Critério de conclusão da fase:** o Squad 1 recebe missão, papéis, backlog inicial e pacote técnico-operacional coerente.

---

## Fase 0.7: Revisão de Saída
**Status:** Não iniciado
**Tasks:**
- TASK-016: Revisar critérios de saída, riscos residuais e readiness do handoff (P1, S)

**Dependências:** Fase 0.6 concluída; nenhuma issue `blocking-exit` aberta
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
TASK-001..002 ──→ TASK-017 (opensquad/portabilidade)
TASK-001..002 ──→ TASK-018 (servidor de referência)
TASK-001..002 ──→ TASK-019 (integrações day-1)
TASK-017..019 ──→ TASK-003 (OpenClaw)
TASK-017..019 ──→ TASK-004 (Paperclip)
TASK-017..019 ──→ TASK-005 (MCP)
TASK-003..005 ──→ TASK-006 (upstream/adaptação)
TASK-003..006 ──→ TASK-007 (runtime)
TASK-003..006 ──→ TASK-008 (observability/evals)
TASK-003..006 ──→ TASK-009 (segurança/agência)
TASK-003..008 ──→ TASK-010 (custo/throughput)
TASK-006 ──→ TASK-011 (category reality / horizon)
TASK-011 ──→ TASK-012 (frontier radar)
TASK-007..012 + TASK-017..019 ──→ TASK-013 (arquitetura alvo)
TASK-013 ──→ TASK-020 (registry + meta-squad)
TASK-013 + TASK-017..019 ──→ TASK-021 (governança do product/)
TASK-021 ──→ TASK-022 (bootstrap do monorepo)
TASK-020 + TASK-022 ──→ TASK-014 (Squad 1 formal)
TASK-014 ──→ TASK-015 (intake + backlog inicial + plano do MVP)
TASK-015 ──→ TASK-016 (exit review)
```
