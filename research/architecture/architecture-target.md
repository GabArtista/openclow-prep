<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# Architecture Target

> **Status:** Post-TASK-033 / MVP baseline established
> **Goal:** definir a arquitetura-alvo do OpenClow sem quebrar a operação atual da Doze na raiz do repositório

## Summary

O OpenClow deve seguir um modelo server-first, com controle central de execução, trilha de auditoria, promotion flow explícito e estado persistente.
O repositório `openclow-prep` continua sendo a base operacional da Doze; o produto novo fica isolado em `product/`.

## Target shape

### Control plane

- `api`: autenticação, CRUD de capabilities, runs, checkpoints, approvals e promotion requests
- `orchestrator`: interpretação do pipeline, scheduling, retry, pause/resume e checkpoint handling
- `registry`: lifecycle de `draft`, `staging`, `active`, `retired`
- `dashboard`: leitura de estado, outputs, run history e aprovação humana

### Execution plane

- `worker`: execução de steps `inline`, `subagent` e `tool-runner`
- `runtime`: persistência, eventos, fila e artefatos de execução
- `skills`: catálogo de ações e integrações com enforcement explícito

### Persistence and storage

- `Postgres`: estado transacional, runs, approvals, promotions, audit events
- `Redis`: locks, fila e coordenação temporal
- `MinIO`: artefatos, outputs e anexos
- `Git`: versionamento de definição de squads, pipelines e contracts

## Non-negotiable boundaries

1. Nenhuma capability pode nascer `active` sem passagem por `draft` e `staging`.
2. Nenhuma ação externa sensível pode executar sem checkpoint quando o contrato exigir.
3. Segredos nunca ficam no repo.
4. O fluxo da Doze na raiz do repositório não pode ser degradado pelo produto novo.
5. O dashboard é observável; a decisão humana continua obrigatória para publicação e promotion.

## Recommended product layout

- `product/apps/api`
- `product/apps/dashboard`
- `product/apps/worker`
- `product/packages/orchestrator`
- `product/packages/registry`
- `product/packages/runtime`
- `product/packages/skills`
- `product/packages/shared`
- `product/infra/k8s`
- `product/tests/e2e`

## Architecture principles

- declarative by default
- server-controlled execution
- explicit state transitions
- promotion with approval
- deterministic checkpoints where possible
- reversible capability lifecycle

## Consequences

- O produto fica mais auditável, porém menos permissivo que o `opensquad`.
- Parte do comportamento que era implícito no benchmark passa a ser enforcement explícito.
- O MVP exige mais trabalho de integração, mas reduz risco operacional.
