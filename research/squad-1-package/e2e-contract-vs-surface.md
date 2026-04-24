<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# E2E Contract vs Product Surface

> **Status:** Draft for TASK-028 prep
> **Purpose:** mapear o contrato staging-first contra a API/runtime atuais do `product/`

## Summary

O contrato E2E já pode ser suportado pela superfície atual do produto com pequenas ressalvas de modelagem:

- o core de runs, checkpoints, promotions, audit, runtime e worker está exposto
- os cenários de marketing e inteligência já têm seeds e tool bindings
- approvals existem como parte de runs/checkpoints/promotions, não como recurso separado
- os cenários de restart recovery e rollback dependem de persistência já presente no runtime local

## Coverage matrix

| Contract item | Current surface | Status | Notes |
|---|---|---|---|
| executar `marketing-dozecrew` | `POST /v1/runs`, `GET /v1/runs/:id`, `POST /v1/worker/runs/:id/tick` | covered | seed e steps já existem |
| executar `inteligencia-dozecrew` | `POST /v1/runs`, `GET /v1/runs/:id` | covered | seed e steps já existem |
| aprovar checkpoint | `POST /v1/checkpoints/:id/approve` | covered | decision gravada no run e audit trail |
| rejeitar checkpoint | `POST /v1/checkpoints/:id/reject` | covered | run pode voltar via `on_reject` |
| promover capability a `staging` | `POST /v1/capabilities/:id/promotions`, `POST /v1/promotions/:id/approve` | covered | promotion registrada e auditada |
| aprovar rollback | `POST /v1/promotions/:id/approve` com operação rollback | covered | rollback já é operação de promotion |
| validar outputs | `GET /v1/runs/:id/outputs` | covered | outputs persistidos no run |
| validar histórico | `GET /v1/history`, `GET /v1/audit` | covered | eventos de run e audit disponíveis |
| validar restart | `GET /v1/runtime`, `GET /healthz` | covered | state path e queue visíveis |

## Partial / implicit coverage

| Contract item | Current surface | Status | Notes |
|---|---|---|---|
| approvals as first-class list | embedded in run/checkpoint/promotion state | partial | suficiente para E2E, mas não como coleção isolada |
| worker execution trace | `GET /v1/worker/claim`, `POST /v1/worker/runs/:id/tick` | partial | útil para inspeção, não contrato final de produto |
| public contract schema for checkpoints/runs/promotions | `openclow-api.yaml` | partial | precisa refletir endpoints reais para não divergir |

## Gaps to keep explicit

1. Não existe um recurso público `approvals` isolado.
2. A persistência ainda é local no MVP, então o E2E precisa assumir ambiente de staging local/isolado.
3. A validação em produção continua fora do escopo do contrato executável.

## Conclusion

O contrato E2E staging-first está viável com a superfície atual.
O que falta agora é normalizar a documentação do OpenAPI e transformar esses cenários em harness executável, sem mudar a semântica já validada.
