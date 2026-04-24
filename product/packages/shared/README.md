# Shared Package

Responsável por:

- contratos públicos versionados
- tipos e convenções transversais
- modelos de risco, status e lifecycle
- base de compatibilidade entre API, orchestrator, worker e dashboard

## Primeiro corte executável

`src/` agora contém:

- `contracts.js` com validações mínimas do core
- `http.js` com utilitários HTTP
- `ids.js` para IDs estáveis locais
- `seeds.js` com as sementes operacionais do workspace `doze`
