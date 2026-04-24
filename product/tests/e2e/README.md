# E2E Tests

> **Status:** staging-first contract
> **Purpose:** transformar o recorte operacional do OpenClow em cenários verificáveis antes de qualquer validação controlada em produção.
> **Canonical regression command:** `npm --prefix product run regression`

## Minimum executable coverage

1. executar um squad equivalente ao `marketing-dozecrew`
2. executar um squad equivalente ao `inteligencia-dozecrew`
3. aprovar e rejeitar checkpoints
4. promover capability até `staging`
5. validar persistência de memória, outputs e histórico
6. validar restart safety para runs aguardando checkpoint
7. validar rollback de capability com trilha auditável
8. validar o primeiro fluxo renderizável de `creative-image` com artifacts persistidos
9. validar o primeiro fluxo vertical renderizável de `creative-video` com shot plan, edit plan e previews persistidos

## Scenario matrix

| Scenario | Goal | Expected result | Gate |
|---|---|---|---|
| Marketing run | reproduzir o fluxo semanal da Doze | run chega ao checkpoint de publicação com outputs completos | staging only |
| Intelligence run | reproduzir o fluxo mensal de BI | relatório consolidado e auditável | staging only |
| Checkpoint approve | liberar um passo bloqueado | run avança para o próximo step | staging only |
| Checkpoint reject | forçar retrabalho | run retorna ao step definido em `on_reject` | staging only |
| Promotion to staging | promover capability | status muda para `staging` com aprovação registrada | staging only |
| Rollback | desfazer uma promoção | status volta ao estado anterior com evento auditado | staging only |
| Restart recovery | reiniciar API/worker | run retoma do último estado seguro | staging only |
| Creative image render | renderizar a primeira peça estática/carrossel | `asset_plan`, `composition_plan`, `preview_manifest` e previews persistidos | staging only |
| Creative video render | renderizar o primeiro corte vertical curto | `shot_plan`, `edit_decision_list`, `preview_manifest` e previews verticais persistidos | staging only |

## Acceptance criteria

- nenhum cenário crítico pode depender de memória efêmera
- toda promoção e rollback precisa gerar rastreio
- checkpoints rejeitados precisam levar o run para o passo correto
- os outputs precisam permanecer consultáveis após restart
- o fluxo `creative-image` precisa persistir arquivos renderizáveis consultáveis no storage local
- o fluxo `creative-video` precisa persistir storyboard, previews e playlist consultáveis no storage local
- qualquer validação em produção continua proibida até o gate staging ficar verde
- o comando `npm --prefix product run regression` executa a suíte completa sem passos manuais intermediários

## Source of truth

- workflows de marketing/conteúdo: `../../research/ecosystem-fit/doze-marketing-content-workflows.md`
- arquitetura alvo: `../../research/architecture/architecture-target.md`
- runtime durability: `../../research/runtime/durable-runtime-analysis.md`
- observability and evals: `../../research/observability/observability-and-evals.md`
- security boundaries: `../../research/security/security-and-agency-boundaries.md`
- contract vs surface: `../../research/squad-1-package/e2e-contract-vs-surface.md`

## Implementation note

Este diretório é o contrato do que precisa ser testado; o harness de execução já existe e deve ser usado como regressão padrão.
