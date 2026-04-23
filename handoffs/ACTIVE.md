# ACTIVE.md — Estado Ativo de Handoff

> **ARQUIVO LIVE** — Atualizado a cada início e fim de sessão.
> Se este arquivo está desatualizado, o programa está em risco.

---

## Estado do Bastão

- **baton:** UNASSIGNED
- **last-updated-by:** codex (product governance and bootstrap)
- **last-updated-at:** 2026-04-23 20:50 -03
- **last-read-by:** codex
- **last-read-at:** 2026-04-23 20:50 -03

---

## Tasks em Voo

1. Nenhuma task ativa no momento; `TASK-021 / TASK-022` foram concluídas na branch `task/2-product-monorepo-bootstrap`
2. Próxima captura do bastão deve abrir `TASK-023` para iniciar o core server-first em `product/`

---

## Última Ação Completada

Fechamento da governança do `product/`, aceite dos ADRs-base e bootstrap inicial do monorepo separado.

**Mudanças concluídas nesta sessão:**
- `research/ecosystem-fit/opensquad-portability-matrix.md` criado para fechar a matriz de portabilidade do benchmark operacional atual da Doze
- ADR-0001 a ADR-0005 aceitos como baseline de bootstrap
- `decisions/ADR-0006-product-workspace-monorepo-boundary.md` criado para liberar implementação apenas em `product/`
- `AGENTS.md`, `MISSION.md`, `README.md`, `context/POLICY.md`, `squads/squad-0/CHARTER.md`, `squads/squad-0/WORKPLAN.md` e `workboard/` atualizados para refletir a nova governança
- `.github/workflows/validate-structure.yml` atualizado para validar a fronteira de código em `product/`
- `product/` bootstrapado com layout inicial de apps, packages, infra, E2E e contratos públicos versionados
- o papel da raiz do repositório como base operacional atual da Doze com as empresas da 12 foi incorporado à decisão e aos guardrails

---

## Próxima Ação Recomendada

1. Abrir issue para `TASK-023`
2. Implementar o core server-first do OpenClow em `product/`
3. Manter a raiz estável para não quebrar o modo atual de operação da Doze

**Papéis recomendados para a próxima sessão:** `Program Architect`, `Backlog Manager`, `Durable Runtime Analyst`

---

## Bloqueadores

NENHUM.

---

## Snapshot de Contexto

`handoffs/snapshots/2026-04-23-codex-product-bootstrap.md`

---

## Notas para o Próximo Agente

O repositório agora tem uma regra operacional clara:

- a raiz continua sendo a base de trabalho atual da Doze com as empresas da 12
- o build do OpenClow acontece somente em `product/`
- o benchmark `mkt-ag-dozecrew/opensquad` foi assumido como referência operacional do day-1
- os contratos públicos mínimos já existem e o próximo passo correto é implementá-los

**O que fazer a seguir:**
- abrir `TASK-023` e escolher a stack inicial do core server-first
- ligar o runtime mínimo ao contrato já definido
- começar a portabilidade dos squads de marketing e inteligência sem romper o fluxo operacional atual

**Próximo agente recomendado:** `Program Architect` com apoio de `Durable Runtime Analyst`
