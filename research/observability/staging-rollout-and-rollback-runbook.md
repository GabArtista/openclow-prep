<!-- TEMPLATE: RUNBOOK | version: 1.0 | do not remove this line -->

# Staging Rollout and Rollback Runbook

> **Status:** Post-TASK-033 / MVP baseline established
> **Use case:** validar changes do OpenClow sem expor produção a risco desnecessário

## Preconditions

- runtime persistente funcional
- registry com lifecycle e approvals
- audit trail ativo
- E2E staging-first disponível
- segredos fora do repo

## Rollout sequence

1. promover capability para `staging`
2. executar marketing run em staging
3. executar intelligence run em staging
4. validar checkpoints e approvals
5. confirmar audit trail e outputs
6. só então considerar `active`

## Rollback sequence

1. identificar capability afetada
2. registrar a razão do rollback
3. reverter para o último estado estável
4. validar que novas execuções não usam a versão revertida
5. confirmar persistência do evento de rollback

## Production guardrails

- read-only first
- dry-run quando possível
- publicação externa só com aprovação explícita
- qualquer mudança em `shop.dozecrew.com` precisa de evidência e autorização humana

## Failure handling

- checkpoint rejeitado: retornar para o step correto
- tool deny: falhar com erro explícito
- persistence error: parar a promoção e preservar o estado atual

## Exit criteria

- staging está verde
- rollback foi testado
- audit trail foi conferida
- o operador humano sabe o ponto exato de retorno
