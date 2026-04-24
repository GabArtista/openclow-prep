# Runtime Package

Responsável por:

- integrar com `Ollama`
- aplicar tiers `fast` e `powerful`
- coordenar filas, locks e eventos
- conectar runtime state (`Postgres`), coordenação (`Redis`) e artefatos (`MinIO`)

## Primeiro corte executável

`src/service.js` implementa o runtime local de desenvolvimento:

- claim de runs
- execução de step por tick
- criação e decisão de checkpoints
- outputs e histórico em memória
