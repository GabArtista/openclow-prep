<!-- TEMPLATE: ADR | version: 1.0 | do not remove this line -->

# ADR-0011: Security and Agency Boundaries

> **Status:** Accepted
> **Date:** 2026-04-24

## Context

O sistema lida com integrações reais e ações potencialmente externas, o que exige fronteiras explícitas de autonomia.

## Decision

Adotar secrets fora do repo, allowlists por capability, checkpoints para ação externa sensível, promotion humana e acesso read-only por default.

## Alternatives considered

- permitir ação externa por heurística
- colocar credenciais no repo para facilitar bootstrap
- permitir autopublicação de capabilities

## Consequences

- menos risco operacional
- menos autonomia implícita
- mais rastreabilidade e governança
