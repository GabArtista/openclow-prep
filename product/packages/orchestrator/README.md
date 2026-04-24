# Orchestrator Package

Responsável por:

- interpretar `Pipeline`
- montar contexto de `Run`
- agendar o próximo `Step`
- pausar e retomar em checkpoints
- aplicar retry/restart sem perder audit trail

## Primeiro corte executável

`src/service.js` já cria runs a partir dos squads seeded do benchmark operacional da Doze.
