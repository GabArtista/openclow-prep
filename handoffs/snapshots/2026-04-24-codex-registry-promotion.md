<!-- SNAPSHOT: registry promotion -->
# Snapshot de Contexto - TASK-026

## Estado da task

`TASK-026` implementou o registry/promotion flow do MVP em `product/`.

O fluxo agora suporta:
- `GET` e `PATCH` de capability por id
- criação de promotion requests
- aprovação e rejeição explícitas
- rollback como promotion request reversa
- listagem global e por capability de promotions

## Decisões tomadas

- Promotion e rollback são requests explícitos, não `PATCH` direto de status.
- `capability.status` só muda após aprovação humana registrada em `approvals`.
- Novas capabilities começam como `draft`.
- O meta-squad ganha uma capability interna seeded como `draft`.

## Validação executada

- `npm --prefix product run check`
- create capability draft via `POST /v1/capabilities`
- promotion request draft -> staging via `POST /v1/capabilities/:id/promotions`
- approval via `POST /v1/promotions/:id/approve`
- rollback staging -> draft via `POST /v1/capabilities/:id/promotions`
- approval de rollback via `POST /v1/promotions/:id/approve`

## Resultado

- A capability testada voltou para `draft` após rollback.
- A trilha de `promotions` e `approvals` ficou persistida.
- O comportamento atual da Doze na raiz do repo não foi alterado.

## Próximas ações

1. Preparar `TASK-027` para observabilidade, segurança e rollback operacional.
2. Consolidar o dashboard e os painéis de promoção, se a próxima task exigir UX.
3. Manter a operação atual da Doze estável enquanto o `product/` evolui.

## Arquivos relevantes

- [product/packages/registry/src/service.js](/home/acer/Documentos/Projetos/openclow-prep/product/packages/registry/src/service.js)
- [product/apps/api/src/server.js](/home/acer/Documentos/Projetos/openclow-prep/product/apps/api/src/server.js)
- [product/packages/shared/contracts/v1/openclow-api.yaml](/home/acer/Documentos/Projetos/openclow-prep/product/packages/shared/contracts/v1/openclow-api.yaml)
- [product/packages/shared/contracts/v1/promotion.schema.json](/home/acer/Documentos/Projetos/openclow-prep/product/packages/shared/contracts/v1/promotion.schema.json)
- [decisions/ADR-0007-registry-promotion-approval-flow.md](/home/acer/Documentos/Projetos/openclow-prep/decisions/ADR-0007-registry-promotion-approval-flow.md)
