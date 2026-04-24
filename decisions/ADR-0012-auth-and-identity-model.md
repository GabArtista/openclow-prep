<!-- TEMPLATE: ADR | version: 1.0 | do not remove this line -->

# ADR-0012: Minimal Identity and Authorization Model

> **Status:** Accepted
> **Date:** 2026-04-24

## Context

O OpenClow já executa runs, checkpoints, promotions e audit trail, mas ainda precisava de uma fronteira explícita entre operador humano, worker, orchestrator e meta-squad.
Sem isso, o control plane poderia registrar ações sem o ator correto ou confundir permissões operacionais com autonomia de execução.

## Decision

Adotar um modelo mínimo de identidade e autorização baseado em `actor_kind`, `actor_id`, `workspace_slug` e `operation_kind`, com enforcement por estado da capability e trilha auditável em toda mutação relevante.

## Alternatives considered

- integração imediata com IdP externo
- RBAC complexo multi-tenant
- requests sem identidade explícita, confiando só no endpoint

## Consequences

- human, worker, orchestrator e meta-squad ficam semanticamente separados
- promoções e rollbacks exigem aprovação explícita
- o MVP não depende de SSO para ficar seguro no dia 1
- o audit trail passa a responder “quem fez o quê” com clareza
