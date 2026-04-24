# API App

Responsável por:

- autenticação e autorização
- CRUD de capabilities
- promotion requests e approvals de capability
- start e consulta de runs
- checkpoints e approvals
- outputs e histórico

Contrato público inicial:

- `product/packages/shared/contracts/v1/openclow-api.yaml`

## Primeiro corte executável

Servidor HTTP sem dependências externas em `src/server.js`.

Endpoints mínimos já implementados:

- `GET /healthz`
- `GET|POST /v1/capabilities`
- `GET|PATCH /v1/capabilities/:id`
- `GET|POST /v1/capabilities/:id/promotions`
- `GET /v1/promotions`
- `POST /v1/promotions/:id/approve`
- `POST /v1/promotions/:id/reject`
- `GET /v1/squads`
- `GET|POST /v1/runs`
- `GET /v1/runs/:id`
- `GET /v1/runs/:id/outputs`
- `GET /v1/checkpoints`
- `POST /v1/checkpoints/:id/approve`
- `POST /v1/checkpoints/:id/reject`
- `GET /v1/history`
- `GET /v1/worker/claim`
- `POST /v1/worker/runs/:id/tick`
