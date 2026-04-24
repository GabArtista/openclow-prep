# Production Change Safety Checklist

## Antes do rollout

- [ ] `npm --prefix product run regression` passou
- [ ] os segredos continuam fora do repo
- [ ] o escopo da mudança está escrito e aprovado
- [ ] existe caminho claro de rollback

## Durante a leitura em produção

- [ ] somente endpoints de leitura aprovados foram usados
- [ ] não houve escrita externa
- [ ] os resultados batem com o comportamento de staging

## Durante o dry-run

- [ ] a ação ficou limitada a simulação
- [ ] o sistema não tentou publicar ou alterar estado real
- [ ] a trilha auditável foi registrada

## Antes de qualquer escrita externa

- [ ] checkpoint humano explícito obtido
- [ ] o risco foi descrito de forma auditável
- [ ] o rollback está pronto para uso imediato

## Depois da mudança

- [ ] os artefatos e logs foram preservados
- [ ] o estado foi conferido novamente
- [ ] `handoffs/ACTIVE.md` foi atualizado
