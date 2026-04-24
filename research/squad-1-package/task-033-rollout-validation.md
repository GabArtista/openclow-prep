<!-- TEMPLATE: TASK | version: 1.0 | do not remove this line -->

# TASK-033: Fechar o primeiro ciclo de rollout e validação controlada

## Metadados

| Campo | Valor |
|---|---|
| **ID** | TASK-033 |
| **Tipo** | validation |
| **Prioridade** | P1 |
| **Tamanho** | M |
| **Owner** | codex |
| **Criada em** | 2026-04-24 |
| **Issue GitHub** | #12 |
| **Branch** | task/12-observability-security |
| **Status** | done |

## Descrição

Formalizar o primeiro ciclo seguro de rollout para o OpenClow. O objetivo é deixar explícito como sair de staging para uma validação controlada em produção sem violar checkpoints, segredos ou a política de acesso já definida para o produto. O trabalho precisa produzir um runbook de leitura/dry-run, um checklist de aprovação e uma evidência de mudança segura que possam ser executados pela equipe sem contexto adicional.

## Critérios de Aceite

1. Existe um runbook com sequência clara de leitura/dry-run e critérios de saída.
2. Existe um checklist operacional de aprovação para mudanças seguras.
3. Existe uma evidência de mudança segura que explicita limites, riscos e rollback.

## Dependências

- TASK-027: observabilidade, segurança e rollback operacional
- TASK-028: E2E staging-first e validações controladas
- TASK-030: persistência transacional e filas duráveis

## Output Esperado

Arquivos que esta task produz ou modifica:

- `research/observability/production-rollout-runbook.md`
- `research/observability/production-rollout-rollback.md`
- `research/observability/production-change-safety-checklist.md`
- `research/observability/production-change-safety-evidence.md`

## Notas

Esta task não altera o comportamento do produto. Ela fecha a camada documental e operacional necessária para qualquer validação controlada em produção, mantendo a regra de leitura primeiro, dry-run quando possível e checkpoint obrigatório para ações externas.
