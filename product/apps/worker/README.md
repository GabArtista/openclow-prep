# Worker App

Responsável por:

- executar steps `inline`, `subagent` e `tool-runner`
- persistir outputs e metadados
- respeitar allowlist de tools por capability
- bloquear ações externas sem checkpoint quando a policy exigir

## Primeiro corte executável

Worker HTTP em `src/worker.js`.

No bootstrap ele:

- faz polling da API local
- reivindica runs em `queued` ou `running`
- executa um passo por tick
- para automaticamente em checkpoints pendentes
