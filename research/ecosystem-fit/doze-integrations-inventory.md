# Doze Integrations Inventory

> **Status:** Post-TASK-033 / MVP baseline established
> **Updated:** 2026-04-24
> **Primary source:** local `opensquad` skill catalog and active Doze squads

## Purpose

Este inventário lista as integrações reais já usadas pela Doze e que devem orientar o recorte do baseline do OpenClow MVP.

## Proven Integrations

| Integration | Current role in Doze workflows | Baseline status |
|---|---|---|
| `GA4` | analytics e tráfego | required |
| `WooCommerce` | catálogo, pedidos e vendas | required |
| `Meta Insights` | Instagram, Facebook Page e Meta Ads | required |
| `Hotjar` | comportamento e apoio analítico | required |
| `Apify` | coleta web e mercado | required |
| `Canva` | design operacional | required |
| `Instagram Publisher` | publicação direta | required |
| `Blotato` | agendamento/publicação multi-canal | important |

## Visual and Creative Capabilities

Além das integrações acima, o ecossistema estudado mostra valor em:

- `template-designer`
- `image-fetcher`
- `image-creator`
- `image-ai-generator`

Essas capacidades são relevantes para o OpenClow, mas nem todas precisam entrar no baseline se comprometerem estabilidade operacional.

## Baseline Recommendation

### Required

- `GA4`
- `WooCommerce`
- `Meta Insights`
- `Hotjar`
- `Apify`
- `Canva`
- `Instagram Publisher`

### Important but Can Follow

- `Blotato`
- `template-designer`
- `image-fetcher`
- `image-creator`

### Later / Conditional

- `image-ai-generator`
- workflows mais pesados de vídeo
- integrações novas ainda não provadas na operação da Doze

## Operational Implications

Para portar essas integrações com segurança, o OpenClow precisará de:

- bindings de segredos fora do repo
- contratos de tool e skill versionados
- execução em staging/dry-run quando possível
- política clara de promoção para produção
