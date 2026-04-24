# Snapshot: Governança do `product/` e bootstrap inicial do OpenClow
- **Agente:** codex
- **Data:** 2026-04-23
- **Task em foco:** TASK-021 / TASK-022, issue #2
- **Branch:** task/2-product-monorepo-bootstrap

## Estado atual da task

A fronteira do repositório foi formalizada: a raiz continua sendo a base operacional atual da Doze e a camada de governança do programa, enquanto o produto passa a existir exclusivamente em `product/`.

O bootstrap mínimo já existe com:

- ADR-0006 aceito
- CI validando fronteira de código
- matriz de portabilidade do `opensquad`
- contratos públicos versionados em `product/packages/shared/contracts/v1`
- layout inicial de apps, packages, infra e E2E

## Decisões tomadas nesta sessão

1. `openclow-prep` permanece como repositório-base oficial do programa e da operação atual, sem virar um repo de produto puro.
2. Toda implementação do OpenClow fica isolada em `product/`.
3. O benchmark operacional da Doze atual, especialmente `mkt-ag-dozecrew/opensquad`, passa a orientar o day-1 do produto.
4. O modo atual de operação da Doze com empresas da 12 foi tratado como restrição explícita nos documentos canônicos e contratos mínimos.

## Próximas ações concretas

1. Abrir issue para `TASK-023` e começar o core server-first em `product/`.
2. Implementar o contrato mínimo da API e do runtime sobre os schemas já criados.
3. Ligar `Ollama`, `Postgres`, `Redis` e `MinIO` ao fluxo básico de runs.
4. Portar primeiro os fluxos equivalentes a `marketing-dozecrew` e `inteligencia-dozecrew`.

## Perguntas em aberto

- Qual stack de implementação inicial será usada dentro de `product/` para API, worker e dashboard?
- O primeiro corte de multi-workspace ficará apenas no schema ou já entra no runtime inicial?
- Quais integrações terão staging/dry-run real disponível desde a primeira onda?

## Arquivos relevantes

- `decisions/ADR-0006-product-workspace-monorepo-boundary.md`
- `research/ecosystem-fit/opensquad-portability-matrix.md`
- `research/squad-1-package/mvp-execution-plan.md`
- `research/architecture/mvp-server-architecture.md`
- `product/README.md`
- `product/packages/shared/contracts/v1/`
