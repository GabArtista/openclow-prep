<!-- TEMPLATE: ROLLBACK | version: 1.0 | do not remove this line -->

# Como usar este template
# 1. Copie para o local adequado (ex: research/rollback-NNNN-titulo.md)
# 2. Sempre crie um Rollback junto com um Runbook para operações reversíveis
# 3. Preencha todos os campos {{PLACEHOLDER}}
# 4. Remova estas instruções (linhas começando com #)

---

# ROLLBACK-{{NNNN}}: {{Título do Rollback}}

## Metadados

| Campo | Valor |
|---|---|
| **ID** | ROLLBACK-{{NNNN}} |
| **Runbook relacionado** | RUNBOOK-{{NNNN}} |
| **Owner** | {{agent-id ou role}} |
| **Criado em** | {{YYYY-MM-DD}} |

---

## Quando Executar Este Rollback

Execute este rollback se:

- {{Condição de trigger 1}}
- {{Condição de trigger 2}}

**Não execute** se:
- {{Condição em que rollback NÃO se aplica}}

---

## Verificações Pré-Rollback

Antes de executar:

- [ ] {{Verificação 1 — o rollback ainda é possível?}}
- [ ] {{Verificação 2 — há dados que serão perdidos?}}
- [ ] {{Informar o Program Lead sobre o rollback}}

---

## Passos do Rollback

Execute **em ordem**:

### Passo 1: {{Nome do passo}}

```
{{comando ou ação de rollback}}
```

**Resultado esperado:** {{o que deve acontecer}}

---

### Passo 2: {{Nome do passo}}

{{descrição da ação}}

---

## Verificação Pós-Rollback

- [ ] {{O sistema voltou ao estado anterior?}}
- [ ] {{Confirmar que nada foi perdido além do esperado}}

---

## Notificações

Após executar o rollback:

- [ ] Atualizar `handoffs/ACTIVE.md` com o rollback executado
- [ ] Criar ou atualizar issue no GitHub descrevendo o que aconteceu
- [ ] Notificar o Program Lead
