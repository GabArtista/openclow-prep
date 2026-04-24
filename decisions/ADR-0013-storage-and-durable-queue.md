<!-- TEMPLATE: ADR | version: 1.0 | do not remove this line -->

# ADR-0013: Persistent State, Durable Queue and Artifact Store

> **Status:** Accepted
> **Date:** 2026-04-24

## Context

O produto precisava sobreviver a restart sem perder queue ordering ou outputs, mas a infraestrutura externa ainda não está sendo provisionada nesta etapa.
Também era necessário manter o MVP executável sem quebrar o E2E já validado.

## Decision

Adotar uma camada de storage durável com:

- estado transacional persistido com escrita atômica
- fila persistida separadamente
- artefatos gravados em disco com índice consultável
- contrato de backend mapeado para `Postgres`, `Redis` e `MinIO` como targets de produção do produto

## Alternatives considered

- manter tudo apenas em memória
- usar um único arquivo monolítico sem queue separada
- adiar qualquer forma de durabilidade até a infraestrutura externa existir

## Consequences

- o MVP passa a suportar restart com menor risco de perda de estado
- queue e artifacts deixam de ser implícitos
- o próximo passo do Squad 1 é trocar o backend local pelos serviços externos sem mudar o contrato conceitual
