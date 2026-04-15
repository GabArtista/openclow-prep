# WORKPLAN.md — Plano de Trabalho do Squad 0

> **Version:** 1.0
> **Última atualização:** 2026-04-14
> **Para atualizar:** criar PR referenciando a issue correspondente

---

## Visão Geral das Fases

```
Fase 0.1: Fundação (COMPLETO)
    └── Bootstrap do repositório

Fase 0.2: Pesquisa de Domínio
    ├── Visão do produto
    ├── Pesquisa de mercado
    └── Restrições e NFRs

Fase 0.3: Arquitetura e Tecnologia
    ├── Avaliação de stack
    ├── Arquitetura de alto nível
    ├── Modelo de dados
    └── Integrações

Fase 0.4: Validação e Evidências
    ├── Validação da visão
    └── Validação da arquitetura contra NFRs

Fase 0.5: Montagem do Pacote do Squad 1
    ├── Glossário
    ├── Backlog inicial do Squad 1
    └── Intake Package completo

Fase 0.6: Revisão de Saída
    └── EXIT_CHECKLIST assinado
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

## Fase 0.2: Pesquisa de Domínio
**Status:** Não iniciado
**Tasks:**
- TASK-001: Visão do produto (P0, S)
- TASK-002: Domínio e segmentos de usuário (P0, M)
- TASK-003: Restrições duras (P0, S)
- TASK-004: NFRs (P0, M)

**Dependências:** nenhuma (pode iniciar imediatamente)
**Outputs esperados:** `research/product-vision.md`, `research/domain-research.md`, `research/competitive-analysis.md`, `research/constraints.md`, `research/nfr.md`

**Critério de conclusão da fase:** TASK-001 a TASK-004 concluídas e mergeadas.

---

## Fase 0.3: Arquitetura e Tecnologia
**Status:** Não iniciado
**Tasks:**
- TASK-005: Avaliação de stack (P1, L)
- TASK-006: Arquitetura de alto nível (P1, L)
- TASK-007: Modelo de dados (P1, M)
- TASK-008: Integrações (P1, M)

**Dependências:** Fase 0.2 deve estar ao menos 70% completa (TASK-001, TASK-003 completas)
**Outputs esperados:** `research/tech-evaluation.md`, `research/architecture-overview.md`, `research/data-model.md`, `research/integrations.md`, ADRs em `decisions/`

**Critério de conclusão da fase:** TASK-005 a TASK-008 concluídas; pelo menos 3 ADRs em `decisions/`.

---

## Fase 0.4: Validação e Evidências
**Status:** Não iniciado
**Tasks:**
- TASK-009: Validação da visão (P1, M)
- TASK-010: Validação da arquitetura contra NFRs (P1, M)

**Dependências:** Fase 0.2 e Fase 0.3 completas
**Outputs esperados:** `research/validation-evidence.md`, `research/architecture-validation.md`

**Critério de conclusão da fase:** TASK-009 e TASK-010 concluídas; todos os NFRs têm resposta arquitetural.

---

## Fase 0.5: Montagem do Pacote do Squad 1
**Status:** Não iniciado
**Tasks:**
- TASK-014: Glossário (P2, S)
- TASK-011: Backlog inicial do Squad 1 (P2, M)
- TASK-012: Intake Package completo (P2, S)

**Dependências:** Fases 0.2, 0.3 e 0.4 completas
**Outputs esperados:** `research/glossary.md`, `squads/squad-1/INTAKE_PACKAGE.md` completo, 20+ tasks do Squad 1 no backlog

**Critério de conclusão da fase:** INTAKE_PACKAGE.md sem `{{PLACEHOLDER}}`; aprovado pelo Program Lead.

---

## Fase 0.6: Revisão de Saída
**Status:** Não iniciado
**Tasks:**
- TASK-013: Revisão de saída do Squad 0 (P2, S)

**Dependências:** Fase 0.5 completa; nenhuma issue `blocking-exit` aberta
**Outputs esperados:** `squads/squad-0/EXIT_CHECKLIST.md` 100% assinado

**Critério de conclusão da fase:** Program Lead aprova formalmente. Squad 1 pode iniciar.

---

## Grafo de Dependências (Resumo)

```
TASK-001 (visão) ──→ TASK-002 (domínio)
TASK-001 ──→ TASK-004 (NFRs)
TASK-003 (restrições) ──→ TASK-004
TASK-003 ──→ TASK-005 (stack)
TASK-004 ──→ TASK-005
TASK-005 ──→ TASK-006 (arquitetura)
TASK-004 ──→ TASK-006
TASK-006 ──→ TASK-007 (dados)
TASK-006 ──→ TASK-008 (integrações)
TASK-001 ──→ TASK-009 (validação visão)
TASK-002 ──→ TASK-009
TASK-004 ──→ TASK-010 (validação arq)
TASK-006 ──→ TASK-010
TASK-001 ──→ TASK-014 (glossário)
TASK-005..010 ──→ TASK-011 (backlog S1)
TASK-011 ──→ TASK-012 (intake package)
TASK-012 ──→ TASK-013 (exit review)
```

---

## Como Atualizar Este Workplan

1. Criar uma issue com label `task` e `squad-0`
2. Criar branch `task/<issue>-update-workplan`
3. Editar este arquivo
4. Abrir PR referenciando a issue
5. Mergear após revisão
