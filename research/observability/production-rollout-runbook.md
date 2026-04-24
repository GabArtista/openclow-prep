<!-- TEMPLATE: RUNBOOK | version: 1.0 | do not remove this line -->

# RUNBOOK-0033: Rollout de leitura e dry-run em produção

## Metadados

| Campo | Valor |
|---|---|
| **ID** | RUNBOOK-0033 |
| **Escopo** | leitura primeiro, dry-run depois, validação controlada em produção |
| **Owner** | codex |
| **Criado em** | 2026-04-24 |
| **Última atualização** | 2026-04-24 |
| **Rollback** | ROLLBACK-0033 |

## Propósito

Executar a primeira validação controlada em produção sem expor segredos, sem autopublicação e sem ações externas de alto impacto sem checkpoint. O foco é confirmar que staging verde, trilha auditável e limites de autonomia continuam válidos fora do ambiente de preparação.

## Pré-requisitos

Antes de executar:

- [ ] `npm --prefix product run regression` passou em staging
- [ ] `product/` está com audit trail e rollback operacional ativos
- [ ] a aprovação humana para qualquer ação externa está registrada
- [ ] nenhum segredo ou token está presente no repo

## Procedimento

Execute os passos **em ordem**. Não pule passos.

### Passo 1: Confirmar o gate de staging

**O que fazer:**
```
npm --prefix product run regression
```

**Resultado esperado:**
Todos os cenários staging-first passam, incluindo dashboard smoke, marketing, inteligência, promotion/rollback e restart recovery.

**Se algo der errado:**
Não siga para produção. Corrija o ambiente de staging ou reverta o último corte do produto.

### Passo 2: Executar leitura em produção

**O que fazer:**
Consultar apenas endpoints e integrações de leitura previamente aprovados, sem escrever nada.

**Resultado esperado:**
Os dados esperados estão disponíveis e o comportamento observado bate com o que staging já validou.

### Passo 3: Executar dry-run

**O que fazer:**
Simular a ação externa pretendida sem publicar nem alterar estado real.

**Resultado esperado:**
O sistema produz o plano de ação, checkpoints e logs necessários sem tocar produção.

### Passo 4: Solicitar checkpoint para qualquer escrita

**O que fazer:**
Se a ação exigir escrita, publicação ou alteração externa, obter aprovação humana explícita antes de prosseguir.

**Resultado esperado:**
Qualquer ação externa de risco fica vinculada a aprovação auditável.

## Verificação Final

Após todos os passos:

- [ ] staging continua verde
- [ ] a leitura em produção não revelou divergências críticas
- [ ] o dry-run gerou evidência auditável
- [ ] nenhuma escrita externa ocorreu sem aprovação

## Troubleshooting

| Sintoma | Causa Provável | Solução |
|---|---|---|
| leitura falha em produção | credencial ausente ou acesso não aprovado | parar e validar escopo com o Program Lead |
| dry-run tenta escrever | binding mal configurado | bloquear a ação e revisar allowlist |
| checkpoint ausente | fluxo externo tentou avançar sem aprovação | interromper e registrar o incidente |

## Rollback

Se algo der errado e precisa ser revertido, executar: `ROLLBACK-0033`
