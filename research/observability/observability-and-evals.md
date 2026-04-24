<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# Observability and Evals

> **Status:** Post-TASK-033 / MVP baseline established
> **Scope:** logs, audit, metrics, eval gates and staging validation

## Purpose

O sistema precisa permitir diagnóstico rápido e validação objetiva antes de qualquer rollout mais sensível.

## Observability surfaces

### Logs

- start/end por run
- start/end por step
- checkpoint requests and decisions
- promotion and rollback events
- external tool calls

### Audit trail

- quem aprovou
- o que foi aprovado
- em que estado estava
- qual capability foi afetada
- qual resultado foi persistido

### Metrics

- tempo por step
- tempo por run
- taxa de aprovação/rejeição
- taxa de retry
- taxa de rollback
- número de eventos auditáveis por run

## Evals

### Minimum eval set

- marketing-run completes to publication gate
- intelligence-run completes to report gate
- checkpoint reject sends execution back to the correct step
- promotion to `staging` is persisted and reversible
- restart preserves queued and waiting runs

### Passing criteria

- nenhum run crítico deve desaparecer sem rastro
- a aprovação humana deve ser rastreável
- o dashboard deve refletir estado persistido, não cache local
- o sistema deve falhar com erro claro quando um tool fora da allowlist for chamado

## Staging-first validation

1. rodar runs de marketing e inteligência
2. aprovar e rejeitar checkpoints manualmente
3. validar promotion/rollback
4. reiniciar a API/worker e conferir retomada
5. somente depois considerar qualquer leitura ou dry-run em produção

## Consequences

- mais instrumentação significa mais confiança no rollout
- os evals viram contrato de regressão, não só teste manual
