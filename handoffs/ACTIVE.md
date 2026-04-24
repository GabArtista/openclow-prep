# ACTIVE.md — Estado Ativo de Handoff

> **ARQUIVO LIVE** — Atualizado a cada início e fim de sessão.
> Se este arquivo está desatualizado, o programa está em risco.

---

## Estado do Bastão

- **baton:** UNASSIGNED
- **last-updated-by:** codex (TASK-023 / core server-first complete)
- **last-updated-at:** 2026-04-23 21:06 -03
- **last-read-by:** codex
- **last-read-at:** 2026-04-23 21:06 -03

---

## Tasks em Voo

1. Nenhuma task ativa no momento; `TASK-023` foi concluída na branch `task/4-core-server-first`
2. Próxima captura do bastão deve abrir `TASK-024` para integrar runtime real, filas e persistência base

---

## Última Ação Completada

Conclusão de `TASK-023` com core server-first executável em `product/`.

**Mudanças concluídas nesta sessão:**
- issue `#4` aberta para `TASK-023`
- branch `task/4-core-server-first` criada
- `product/package.json` criado com scripts de API, worker, dashboard e check sintático
- API HTTP local implementada com endpoints para capabilities, squads, runs, checkpoints, outputs, history e worker tick
- worker local implementado com polling HTTP e pausa em checkpoints humanos
- dashboard estático implementado para visualizar workspace `doze`, iniciar runs e decidir checkpoints
- services iniciais de `shared`, `registry`, `orchestrator`, `runtime` e `skills` criados
- smoke test executado: criação de run do `marketing-dozecrew`, avanço do worker e pausa correta no primeiro checkpoint humano

---

## Próxima Ação Recomendada

1. Abrir `TASK-024`
2. Integrar `Ollama`, persistência real e filas ao core atual
3. Manter a raiz estável para não quebrar o modo atual de operação da Doze

**Papéis recomendados para a próxima sessão:** `Durable Runtime Analyst`, `Program Architect`, `Observability and Evals Analyst`

---

## Bloqueadores

NENHUM.

---

## Snapshot de Contexto

`handoffs/snapshots/2026-04-23-codex-core-server-first.md`

---

## Notas para o Próximo Agente

O repositório agora tem duas camadas ativas e coerentes:

- a raiz continua sendo a base de trabalho atual da Doze com as empresas da 12
- `product/` já possui um core server-first executável para desenvolvimento local
- o benchmark `mkt-ag-dozecrew/opensquad` já influencia seeds, fluxos e checkpoints do workspace `doze`
- o próximo salto não é mais scaffold, e sim integração com runtime e persistência reais

**O que fazer a seguir:**
- abrir `TASK-024`
- ligar `Ollama`, `Postgres`, `Redis` e `MinIO` ao core já implementado
- preparar o endurecimento do lifecycle de capabilities e a portabilidade day-1

**Próximo agente recomendado:** `Durable Runtime Analyst` com apoio de `Program Architect`
