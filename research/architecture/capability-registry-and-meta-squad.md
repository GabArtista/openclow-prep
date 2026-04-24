<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# Capability Registry and Meta-Squad

> **Status:** Draft for Squad 1 handoff
> **Purpose:** consolidar como capabilities são registradas, promovidas e evoluem via meta-squad

## Scope

Este documento reúne o que já está decidido em:

- `decisions/ADR-0004-capability-registry-and-meta-squad.md`
- `decisions/ADR-0007-registry-promotion-approval-flow.md`
- `research/architecture/user-experience-and-meta-squad.md`

## Registry responsibilities

O registry é a fonte de verdade para:

- `skills`
- `squads`
- `pipelines`
- `tools`
- lifecycle de `draft`, `staging`, `active`, `retired`
- promotion requests
- rollback requests
- audit trail de mudanças de lifecycle

## Meta-squad responsibilities

O meta-squad é uma capability interna que pode:

- propor novas capabilities
- editar metadata e contratos
- gerar drafts de squads/pipelines/tools/skills
- sugerir promotion ou rollback
- exigir validação estática e eval mínimo antes de qualquer promoção

## What it cannot do

- autopromover para `active`
- tocar segredos
- publicar para produção sem checkpoint humano
- ampliar ferramentas permitidas sem revisão

## Lifecycle flow

1. capability nasce como `draft`
2. passa por validação e eval mínimo
3. entra em `staging`
4. recebe aprovação humana
5. pode virar `active`
6. se necessário, pode ser revertida para um estado anterior

## Operational model

- capabilities públicas e internas seguem o mesmo ciclo
- a diferença entre `draft` e `staging` está na permissividade operacional
- `active` representa uso normal
- `retired` preserva histórico, mas bloqueia execução

## Guardrails

- qualquer mudança de lifecycle precisa de trilha auditável
- o meta-squad nunca se torna um bypass de governança
- checkpoints humanos continuam obrigatórios
- o registry não deve ser manipulado diretamente por arquivos soltos fora do contrato

## Day-1 implication

O MVP só está pronto se o usuário conseguir:

- criar capability em `draft`
- validar e promover para `staging`
- aprovar promoção humana
- reverter com trilha auditável
- manter visível o impacto em squads, steps e outputs
