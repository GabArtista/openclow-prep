# Product Workspace — OpenClow

> **Status:** Bootstrap
> **Boundary:** todo código do sistema vive somente nesta árvore

## Propósito

`product/` é o workspace isolado do OpenClow dentro do `openclow-prep`.

A raiz do repositório continua sendo a camada de pesquisa, governança, backlog, ADRs e handoff. Tudo que for implementação do sistema deve nascer aqui.
Ela também continua servindo a operação atual da Doze com as empresas da 12, então o bootstrap do produto precisa preservar essa realidade em vez de substituí-la abruptamente.

## Guardrails

- sem segredos no repositório
- sem produção por default
- staging/dry-run obrigatório quando existir
- qualquer ação externa destrutiva exige checkpoint humano
- capabilities novas entram em `draft` ou `staging`, nunca em `active` direto

## Layout Inicial

```text
product/
├── apps/
│   ├── api/
│   ├── dashboard/
│   └── worker/
├── packages/
│   ├── orchestrator/
│   ├── registry/
│   ├── runtime/
│   ├── skills/
│   └── shared/
├── infra/
│   └── k8s/
└── tests/
    └── e2e/
```

## Contratos Públicos

Os contratos mínimos do MVP estão versionados em `product/packages/shared/contracts/v1/`.

Eles definem o wire contract inicial para:

- `Squad`
- `Pipeline`
- `Step`
- `Checkpoint`
- `Capability`
- `Run`
- `Approval`
- API mínima do MVP

Esses contratos já reservam espaço para identificar o workspace/empresa associado a squads, capabilities e runs, porque o modo atual de operação da Doze não é single-context.

## Primeiro corte criativo

O baseline do produto agora também inclui o primeiro corte da trilha criativa:

- `creative-control`
- `reference-lab`
- `creative-qa`
- `creative-image`
- `creative-video`

Neste corte:
- os squads já existem como seeds do produto
- o fluxo `contexto -> referencia -> composicao/render -> QA` já pode ser iniciado localmente para imagem e video curto
- `creative-image` persiste plano de assets, composicao declarativa, previews renderizaveis em SVG e gallery HTML de dry-run
- `creative-video` persiste `shot_plan`, `vfx_plan`, `edit_decision_list`, storyboard vertical, previews SVG e playlist de dry-run
- o objetivo ainda é `local-dev` e `staging`
- produção continua fora do caminho default

O que ainda nao entra neste corte:
- deploy no servidor de produção
- publicação real por default
- render final dependente de stack externa além do dry-run local/staging
- integrações multimodais pesadas fora do perfil local/staging
