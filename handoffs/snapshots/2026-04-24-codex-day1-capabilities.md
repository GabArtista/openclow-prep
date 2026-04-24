<!-- SNAPSHOT: day1 capabilities -->
# Snapshot de Contexto - TASK-025

## Estado da task

`TASK-025` concluiu a portabilidade das capacidades day-1 da Doze para `product/`.

O runtime passou a executar artefatos estruturados para:
- `marketing-dozecrew`
- `inteligencia-dozecrew`

As bindings day-1 cobrem:
- `ga4`
- `woocommerce`
- `meta-insights`
- `hotjar`
- `apify`
- `canva`
- `instagram-publisher`
- `blotato` como opcional

## Decisões tomadas

- Manter a raiz do repo intacta para o modo operacional atual da Doze.
- Não depender de reset do state local para validar o novo comportamento.
- Adicionar fallback compatível no runtime para squads persistidos antes da inclusão de `tool_slugs`.
- Tratar `blotato` como optional tool com artefato explícito de adiamento.

## Resultados de validação

- `marketing-dozecrew` produziu artefatos estruturados para GA4, WooCommerce, Hotjar, Apify, Canva e Instagram Publisher.
- `inteligencia-dozecrew` produziu artefatos estruturados para GA4, WooCommerce, Hotjar, Meta Insights e Apify.
- `blotato` apareceu como `optional_tool_skipped`.
- Os checkpoints humanos continuaram funcionando sem quebrar o fluxo.

## Próximas ações

1. Abrir `TASK-026` para registry/promotion flow.
2. Consolidar estados `draft`, `staging`, `active` e `retired`.
3. Manter a operação atual da Doze estável enquanto o produto evolui em `product/`.

## Arquivos relevantes

- [product/packages/runtime/src/service.js](/home/acer/Documentos/Projetos/openclow-prep/product/packages/runtime/src/service.js)
- [product/packages/shared/src/seeds.js](/home/acer/Documentos/Projetos/openclow-prep/product/packages/shared/src/seeds.js)
- [product/packages/tools/src/runner.js](/home/acer/Documentos/Projetos/openclow-prep/product/packages/tools/src/runner.js)
- [workboard/DONE.md](/home/acer/Documentos/Projetos/openclow-prep/workboard/DONE.md)
- [handoffs/ACTIVE.md](/home/acer/Documentos/Projetos/openclow-prep/handoffs/ACTIVE.md)
