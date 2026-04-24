# ACTIVE.md — Estado Ativo de Handoff

> **ARQUIVO LIVE** — Atualizado a cada início e fim de sessão.
> Se este arquivo está desatualizado, o programa está em risco.

---

## Estado do Bastão

- **baton:** UNASSIGNED
- **last-updated-by:** codex (status reestruturado / TASK-028 prep)
- **last-updated-at:** 2026-04-24 12:20 -03
- **last-read-by:** codex
- **last-read-at:** 2026-04-24 12:20 -03

---

## Tasks em Voo

1. Nenhuma task em voo.
2. Próximo passo: seguir o checklist de preparação da `TASK-028`.

---

## Última Ação Completada

Reestruturação do status operacional para refletir o estado real do projeto após TASK-024 a TASK-027.

**Mudanças concluídas nesta sessão:**
- backlog limpo para deixar só trabalho futuro em `workboard/BACKLOG.md`
- `workboard/DONE.md` atualizado para incluir `TASK-027`
- `workboard/IN_PROGRESS.md` zerado
- `handoffs/ACTIVE.md` reescrito para baton `UNASSIGNED`
- checklist de preparação da `TASK-028` em criação

---

## Próxima Ação Recomendada

1. Executar o checklist de preparação da `TASK-028`
2. Completar `research/architecture/architecture-target.md` e as trilhas de runtime/observability/security/cost
3. Depois disso, iniciar a suíte E2E staging-first da `TASK-028`

**Papéis recomendados para a próxima sessão:** `Program Architect`, `Durable Runtime Analyst`, `Observability and Evals Analyst`, `Security and Agency Boundaries Analyst`, `Documentation Agent`

---

## Bloqueadores

NENHUM.

---

## Snapshot de Contexto

`handoffs/snapshots/2026-04-24-codex-task-028-prep-checklist.md`

---

## Notas para o Próximo Agente

O repositório agora tem duas camadas ativas e coerentes:

- a raiz continua sendo a base de trabalho atual da Doze com as empresas da 12
- `product/` já possui um core server-first executável para desenvolvimento local
- o benchmark `mkt-ag-dozecrew/opensquad` já influencia seeds, fluxos e checkpoints do workspace `doze`
- o registry agora tem lifecycle formal e approvals explícitos

**O que fazer a seguir:**
- portar as capacidades day-1 da Doze para o runtime persistente
- adicionar tool bindings e artefatos por integração
- deixar o caminho pronto para o registry e promotion flow da próxima task

**Próximo agente recomendado:** `Durable Runtime Analyst` com apoio de `Program Architect`
