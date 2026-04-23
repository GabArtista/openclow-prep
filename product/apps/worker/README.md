# Worker App

Responsável por:

- executar steps `inline`, `subagent` e `tool-runner`
- persistir outputs e metadados
- respeitar allowlist de tools por capability
- bloquear ações externas sem checkpoint quando a policy exigir
