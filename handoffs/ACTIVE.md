# ACTIVE.md — Estado Ativo de Handoff

> **ARQUIVO LIVE** — Atualizado a cada início e fim de sessão.
> Se este arquivo está desatualizado, o programa está em risco.

---

## Estado do Bastão

- **baton:** UNASSIGNED
- **last-updated-by:** codex (TASK-024 / runtime persistence and queue complete)
- **last-updated-at:** 2026-04-24 10:13 -03
- **last-read-by:** codex
- **last-read-at:** 2026-04-24 10:13 -03

---

## Tasks em Voo

1. Nenhuma task ativa no momento; `TASK-024` foi concluída na branch `task/6-runtime-persistence-queue`
2. Próxima captura do bastão deve abrir `TASK-025` para portar capacidades day-1 da Doze

---

## Última Ação Completada

Conclusão de `TASK-024` com runtime local persistente e fila durável no `product/`.

**Mudanças concluídas nesta sessão:**
- issue `#6` aberta para `TASK-024`
- branch `task/6-runtime-persistence-queue` criada
- `product/packages/runtime/src/persistence.js` criado para state file local em `product/.local/runtime-state.json`
- `product/packages/runtime/src/ollama.js` criado para probe opcional de `Ollama`
- `product/packages/runtime/src/service.js` atualizado para fila durável, persistência e status de runtime
- `product/apps/api/src/state.js` e `product/apps/api/src/server.js` atualizados para carregar/persistir o state file e expor `v1/runtime`
- `product/packages/orchestrator/src/service.js` e `product/packages/registry/src/service.js` persistem mudanças
- `product/package.json` atualizado para checar os novos módulos
- smoke test executado: run do `inteligencia-dozecrew` sobreviveu a restart da API em `waiting_checkpoint`

---

## Próxima Ação Recomendada

1. Abrir `TASK-025`
2. Portar capacidades day-1 da Doze para o runtime persistente
3. Manter a raiz estável para não quebrar o modo atual de operação da Doze

**Papéis recomendados para a próxima sessão:** `Durable Runtime Analyst`, `Program Architect`, `Observability and Evals Analyst`

---

## Bloqueadores

NENHUM.

---

## Snapshot de Contexto

`handoffs/snapshots/2026-04-24-codex-runtime-persistence-queue.md`

---

## Notas para o Próximo Agente

O repositório agora tem duas camadas ativas e coerentes:

- a raiz continua sendo a base de trabalho atual da Doze com as empresas da 12
- `product/` já possui um core server-first executável para desenvolvimento local
- o benchmark `mkt-ag-dozecrew/opensquad` já influencia seeds, fluxos e checkpoints do workspace `doze`
- o próximo salto não é mais scaffold, e sim integração com runtime e persistência reais

**O que fazer a seguir:**
- abrir `TASK-025`
- portar as capacidades day-1 da Doze para o runtime persistente
- começar a endurecer o lifecycle de capabilities e as integrações reais

**Próximo agente recomendado:** `Durable Runtime Analyst` com apoio de `Program Architect`
