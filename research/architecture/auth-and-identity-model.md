<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# Auth and Identity Model

> **Status:** Post-TASK-033 / MVP baseline established
> **Purpose:** definir o modelo mínimo de identidade e autorização do OpenClow sem quebrar a separação entre operador humano, worker e meta-squad

## Context

O produto já executa runs, checkpoints, promotions e audit trail.
Para operar com segurança, o control plane precisa distinguir:

- quem está pedindo a ação
- em qual papel a ação está sendo feita
- se a ação é de leitura, execução, aprovação ou promoção
- qual workspace/capability está sendo afetado

## Identity domains

### Human actor

Pessoa operando o sistema pelo dashboard ou por uma sessão administrativa.

### Worker actor

Processo responsável por tickar runs e executar steps dentro do control plane.

### Orchestrator actor

Processo que cria runs, resolve checkpoints e coordena transições.

### Meta-squad actor

Capability interna que pode propor mudanças, mas nunca autopromover para `active`.

### System actor

Identidade implícita para ações de manutenção, bootstrap e leitura interna.

## Authorization model

O MVP deve tratar autorização como combinação de:

1. `actor_kind`
2. `workspace_slug`
3. `capability_id` ou `squad_id`
4. `operation_kind`
5. `status` atual da capability

## Operation kinds

- `read`
- `run`
- `tick`
- `approve_checkpoint`
- `reject_checkpoint`
- `request_promotion`
- `approve_promotion`
- `reject_promotion`
- `request_rollback`
- `approve_rollback`
- `create_capability`
- `update_capability`
- `administer`

## Minimal permission matrix

| Actor kind | Allowed by default | Requires explicit approval |
|---|---|---|
| Human | read, run, approve_checkpoint, reject_checkpoint, request_promotion, request_rollback | approve_promotion, approve_rollback, administer |
| Worker | tick, read run state | any approval or promotion action |
| Orchestrator | create run, resolve checkpoint state, persist runtime transitions | approve actions, direct admin changes |
| Meta-squad | create/update draft capabilities, request promotion, request rollback | activate/retire, any approval action |
| System | bootstrap, health, internal maintenance reads | anything outside maintenance/read |

## Session and request model

O MVP pode operar com:

- sessão humana emitida pelo control plane ou dashboard
- identidade de serviço para worker/orchestrator/meta-squad
- claims mínimas no request para indicar `actor_kind`, `actor_id`, `workspace_slug` e intenção

O sistema não precisa de um provedor externo de identidade para o dia 1.
O ponto crítico é que a identidade seja explícita e auditável.

## Current public contract mapping

Hoje a superfície pública do produto já carrega identidade de forma parcial por campos de request:

| Endpoint family | Identity fields already present | Interpretation |
|---|---|---|
| `POST /v1/runs` | `requested_by`, `workspace_slug` | humano ou sistema solicitando o run |
| `POST /v1/checkpoints/*/approve|reject` | `actor`, `comment` | quem tomou a decisão do checkpoint |
| `POST /v1/promotions/*/approve|reject` | `actor`, `comment` | quem aprovou ou rejeitou a promoção |
| `POST /v1/capabilities` | `requested_by`, `workspace_slug` | autor da criação da capability |
| `POST /v1/capabilities/*/promotions` | `requested_by`, `reason`, `comment` | autor e intenção da promoção/rollback |

Esse contrato é suficiente para o day-1, desde que o runtime continue tratando actor e workspace como dados auditáveis e não como detalhes opcionais.

## Enforcement rules

1. Toda mutation relevante deve registrar `actor_kind` e `actor_id`.
2. Toda promoção ou rollback deve exigir aprovação explícita.
3. Worker não pode aprovar checkpoint.
4. Meta-squad não pode promover diretamente para `active`.
5. Human operators não podem assumir privilégios de system actor sem trilha administrativa.
6. `draft` e `staging` nunca podem herdar acesso de produção por default.

## Audit requirements

Cada decisão importante precisa persistir:

- quem fez
- qual papel foi usado
- qual recurso foi afetado
- qual operação foi executada
- qual o resultado
- em qual workspace

## Post-TASK-033 implementation implications

- o dashboard deve operar em nome de um actor humano explícito
- o worker deve se identificar como worker, não como humano
- o orchestrator deve registrar transições com identidade própria
- o registry deve impedir mudanças de lifecycle sem autorização

## Non-goals

- SSO completo
- integração com IdP externo no MVP
- RBAC/ABAC complexo multi-tenant
- delegation chains avançadas

## Consequences

- o produto ganha fronteiras claras entre papéis
- o audit trail fica útil para investigação e rollback
- a implementação fica simples o bastante para o day 1 sem deixar brecha de autonomia
