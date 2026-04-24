<!-- TEMPLATE: ADR | version: 1.0 | do not remove this line -->

# ADR-0010: Observability and Evals

> **Status:** Accepted
> **Date:** 2026-04-24

## Context

Sem logs, métricas e evals mínimos, o sistema não consegue provar que está seguro para staging-first.

## Decision

Adotar audit trail persistida, métricas de run/step/checkpoint/promotion e uma suíte E2E mínima que valide marketing, inteligência, checkpoint handling, promotion/rollback e persistence restart.

## Alternatives considered

- depender de inspeção manual
- registrar apenas logs não estruturados
- empurrar a instrumentação para depois do rollout

## Consequences

- o comportamento passa a ser verificável
- regressões ficam mais fáceis de detectar
- staging vira gate real, não formalidade
