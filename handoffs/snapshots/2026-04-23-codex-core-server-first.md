# Snapshot: Core server-first inicial em `product/`
- **Agente:** codex
- **Data:** 2026-04-23
- **Task em foco:** TASK-023, issue #4
- **Branch:** task/4-core-server-first

## Estado atual da task

O scaffold documental de `product/` virou um core executável sem dependências externas:

- API HTTP local em `product/apps/api/src/server.js`
- worker por polling HTTP em `product/apps/worker/src/worker.js`
- dashboard estático em `product/apps/dashboard/src/`
- seeds operacionais do workspace `doze` baseadas no benchmark atual da Doze
- store local em memória com capabilities, squads, runs, checkpoints, approvals e histórico

## Decisões tomadas nesta sessão

1. O primeiro corte do core usa JS puro em Node 20 para reduzir fricção e evitar instalar stack pesada cedo demais.
2. A API local é a fonte de verdade do runtime de desenvolvimento.
3. Worker e dashboard falam com a API via HTTP para preservar a separação entre control plane, execução e apresentação.
4. O benchmark `marketing-dozecrew` e `inteligencia-dozecrew` já entra como seed do workspace `doze`.

## Próximas ações concretas

1. Abrir `TASK-024`.
2. Ligar o core atual a persistência real e filas (`Postgres`, `Redis`, `MinIO`).
3. Introduzir binding do `Ollama` para tiers `fast` e `powerful`.
4. Começar a endurecer o lifecycle de capabilities e o fluxo de promotion.

## Perguntas em aberto

- O próximo corte mantém JS puro ou já migra para uma stack tipada antes de integrar persistência real?
- `Ollama` entra via módulo do runtime ou já por uma camada de gateway dedicada?
- O primeiro storage persistente será implementado como adapter opcional ou substituição direta da store em memória?

## Arquivos relevantes

- `product/package.json`
- `product/apps/api/src/server.js`
- `product/apps/worker/src/worker.js`
- `product/apps/dashboard/src/`
- `product/packages/shared/src/`
- `product/packages/runtime/src/service.js`
