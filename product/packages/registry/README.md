# Registry Package

Responsável por:

- versionar `skills`, `squads`, `pipelines` e `tools`
- manter lifecycle `draft`, `staging`, `active`, `retired`
- registrar promotion, rollback e aprovação
- gerar trilha auditável de capability, promotion e rollback
- servir de base para o meta-squad

## Primeiro corte executável

`src/service.js` já lista, cria e atualiza capabilities, além de registrar promotion requests e aprovações no runtime local de desenvolvimento.
