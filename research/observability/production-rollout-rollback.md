<!-- TEMPLATE: ROLLBACK | version: 1.0 | do not remove this line -->

# ROLLBACK-0033: Reverter validação controlada em produção

## Metadados

| Campo | Valor |
|---|---|
| **ID** | ROLLBACK-0033 |
| **Runbook relacionado** | RUNBOOK-0033 |
| **Owner** | codex |
| **Criado em** | 2026-04-24 |

## Quando Executar Este Rollback

Execute este rollback se:

- uma leitura em produção mostrar divergência crítica
- um dry-run tentar extrapolar para ação escrita
- uma ação externa for iniciada sem checkpoint humano

**Não execute** se:
- o problema estiver restrito a staging e não houver impacto em produção

## Verificações Pré-Rollback

Antes de executar:

- [ ] o estado atual foi registrado em `handoffs/ACTIVE.md`
- [ ] a equipe confirmou que nenhuma escrita irreversível ocorreu
- [ ] o Program Lead foi informado

## Passos do Rollback

Execute **em ordem**:

### Passo 1: Interromper qualquer ação externa ativa

```
Cancelar a execução em andamento e bloquear novas escritas externas.
```

**Resultado esperado:** o sistema volta para leitura/dry-run apenas.

### Passo 2: Reverter para o último estado estável

Restaurar a versão aprovada no staging ou no ponto de corte anterior.

## Verificação Pós-Rollback

- [ ] o sistema voltou ao estado anterior
- [ ] nada foi perdido além do que já estava sem aprovação

## Notificações

Após executar o rollback:

- [ ] Atualizar `handoffs/ACTIVE.md` com o rollback executado
- [ ] Atualizar a issue do programa com a evidência do incidente
- [ ] Notificar o Program Lead
