# Snapshot: Runtime persistente local com fila e probe de Ollama
- **Agente:** codex
- **Data:** 2026-04-24
- **Task em foco:** TASK-024, issue #6
- **Branch:** task/6-runtime-persistence-queue

## Estado atual da task

O core server-first passou a usar persistência em arquivo local para o workspace de desenvolvimento do `product/`:

- runs, checkpoints, approvals e outputs são salvos em `product/.local/runtime-state.json`
- a fila de execução é persistida no mesmo state file
- a API expõe estado do runtime e probe do Ollama
- o worker continua consumindo runs via HTTP, agora com estado restaurado após restart

## Decisões tomadas nesta sessão

1. Persistência local de desenvolvimento é suficiente para esse corte.
2. `Ollama` entra como adaptador opcional, com probe e health report, sem bloquear o core quando indisponível.
3. A fila precisa ser durável, mas simples o bastante para acompanhar o runtime de desenvolvimento sem depender de Redis ainda.
4. O benchmark operacional da Doze continua sendo o guia dos seeds e checkpoints do workspace `doze`.

## Próximas ações concretas

1. Abrir `TASK-025`.
2. Portar as capacidades day-1 da Doze para o runtime persistente.
3. Evoluir a camada de integração para ferramentas e envelopes de permissão.
4. Preparar o caminho para adaptar essa persistência simples aos backends reais de `Postgres`, `Redis` e `MinIO`.

## Perguntas em aberto

- O próximo corte mantém a persistência local como fallback depois do adaptador real?
- Quando a fila migrar para Redis, o contrato atual precisa de versão nova ou só troca de backend?
- O probe de Ollama deve virar health check periódico no worker ou ficar só sob demanda pela API?

## Arquivos relevantes

- `product/packages/runtime/src/persistence.js`
- `product/packages/runtime/src/ollama.js`
- `product/packages/runtime/src/service.js`
- `product/apps/api/src/state.js`
- `product/apps/api/src/server.js`
- `product/.local/runtime-state.json`
