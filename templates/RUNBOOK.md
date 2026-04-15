<!-- TEMPLATE: RUNBOOK | version: 1.0 | do not remove this line -->

# Como usar este template
# 1. Copie para o local adequado (ex: research/runbook-NNNN-titulo.md)
# 2. Preencha todos os campos {{PLACEHOLDER}}
# 3. Teste cada passo antes de considerar o runbook pronto
# 4. Remova estas instruções (linhas começando com #)

---

# RUNBOOK-{{NNNN}}: {{Título do Procedimento}}

## Metadados

| Campo | Valor |
|---|---|
| **ID** | RUNBOOK-{{NNNN}} |
| **Escopo** | {{o que este runbook cobre}} |
| **Owner** | {{agent-id ou role}} |
| **Criado em** | {{YYYY-MM-DD}} |
| **Última atualização** | {{YYYY-MM-DD}} |
| **Rollback** | <!-- optional --> ROLLBACK-{{NNNN}} |

---

## Propósito

{{Uma ou duas frases descrevendo quando e por que executar este runbook.}}

---

## Pré-requisitos

Antes de executar:

- [ ] {{Pré-requisito 1}}
- [ ] {{Pré-requisito 2}}

---

## Procedimento

Execute os passos **em ordem**. Não pule passos.

### Passo 1: {{Nome do passo}}

**O que fazer:**
```
{{comando ou ação}}
```

**Resultado esperado:**
{{O que você deve ver/obter após este passo}}

**Se algo der errado:**
{{O que fazer se o resultado não for o esperado}}

---

### Passo 2: {{Nome do passo}}

**O que fazer:**
{{descrição da ação}}

**Resultado esperado:**
{{resultado}}

---

## Verificação Final

Após todos os passos:

- [ ] {{Verificação 1}}
- [ ] {{Verificação 2}}

---

## Troubleshooting

<!-- optional -->

| Sintoma | Causa Provável | Solução |
|---|---|---|
| {{sintoma}} | {{causa}} | {{solução}} |

---

## Rollback

<!-- optional -->
Se algo deu errado e precisa ser revertido, executar: `ROLLBACK-{{NNNN}}`
