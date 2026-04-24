<!-- TEMPLATE: ADR | version: 1.0 | do not remove this line -->

# ADR-0009: Runtime Durability Model

> **Status:** Accepted
> **Date:** 2026-04-24

## Context

O produto precisa sobreviver a restart, preservar checkpoints e manter audit trail confiável.

## Decision

Adotar estado persistido por run, checkpoint e capability, com fila e locks no backend de runtime e sem dependência de memória de processo para controle crítico.

## Alternatives considered

- runtime efêmero baseado só em memória
- arquivos locais como fonte principal de verdade
- persistência parcial apenas para outputs

## Consequences

- runs podem retomar após restart
- checkpoints ficam auditáveis
- retry e rollback ficam previsíveis
