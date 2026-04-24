# Dashboard App

Responsável por:

- listar squads e capabilities
- mostrar runs, steps, checkpoints e outputs
- expor histórico operacional
- concentrar a aprovação humana do MVP

O dashboard deve copiar a utilidade operacional já provada no `opensquad`, sem depender da IDE host.

## Primeiro corte executável

Dashboard estático servido por `src/server.js` e consumindo a API local.

Já permite:

- visualizar squads e capabilities seeded para o workspace `doze`
- iniciar runs de marketing e inteligência
- aprovar ou rejeitar checkpoints
- acompanhar o estado dos runs em tempo quase real
