<!-- TEMPLATE: ADR | version: 1.0 | do not remove this line -->

# ADR-0008: Architecture Target for OpenClow

> **Status:** Accepted
> **Date:** 2026-04-24

## Context

O `openclow-prep` continua sustentando a operação atual da Doze, enquanto o produto novo precisa nascer isolado em `product/`.
O benchmark `opensquad` mostrou valor operacional, mas também traz acoplamentos que não podem ser copiados literalmente.

## Decision

Adotar uma arquitetura server-first com:

- `api` como control plane
- `orchestrator` como interpretador de pipeline e checkpoints
- `worker` como executor
- `registry` como lifecycle manager de capabilities
- `runtime` como camada de persistência e eventos
- `dashboard` como superfície operacional

## Alternatives considered

- copiar a estrutura do `opensquad` sem mudanças
- manter o produto acoplado à raiz operacional
- adiar a definição arquitetural até depois do código

## Consequences

- mais isolamento entre preparação e produto
- promoção e rollback passam a ser contratuais
- a base fica mais segura para staging-first
