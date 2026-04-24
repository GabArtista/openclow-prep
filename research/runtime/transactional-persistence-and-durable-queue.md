<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# Transactional Persistence and Durable Queue

> **Status:** Draft for TASK-030
> **Purpose:** registrar como o MVP trata persistência transacional, fila durável e artefatos persistidos

## Summary

O MVP do OpenClow precisa sobreviver a restart sem perder:

- estado de run
- checkpoints
- approvals
- promotions
- queue ordering
- outputs e artefatos

O caminho adotado para o day 1 é:

- persistência em arquivo com escrita atômica
- fila persistida separadamente da store principal
- índices de artefato persistidos e arquivos individuais por run/step
- contrato operacional preparado para mapear depois para `Postgres`, `Redis` e `MinIO`

## Persistence layers

### Transactional state

Responsável por:

- capabilities
- squads
- runs
- checkpoints
- approvals
- promotions
- audit events

### Durable queue

Responsável por:

- ordem dos runs pendentes
- recomposição após restart
- eliminação de itens órfãos ou já finalizados

### Artifact store

Responsável por:

- outputs de cada step
- artefatos de tool binding
- índices consultáveis por run

## Operational mapping

| Logical layer | Current MVP implementation | Target service mapping |
|---|---|---|
| Transactional state | JSON store with atomic commit | `Postgres` |
| Durable queue | separate JSON queue snapshot | `Redis` |
| Artifact store | JSON files + index per run | `MinIO` |

## Rules

1. state and queue must commit together for mutation paths that affect scheduling
2. artifacts must be written before a run is considered durably completed
3. restart recovery must rebuild queue from persisted sources
4. no durable output may depend only on memory

## Consequences

- o MVP fica executável agora
- o contrato já aponta para os serviços reais que o Squad 1 deverá ligar depois
- a migração para infra externa fica uma troca de backend, não uma reescrita conceitual
