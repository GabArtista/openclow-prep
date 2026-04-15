<!-- TEMPLATE: TASK | version: 1.0 | do not remove this line -->

# Como usar este template
# 1. Copie este arquivo para o local adequado (ou use como referência para abrir uma issue)
# 2. Preencha todos os campos {{PLACEHOLDER}}
# 3. Remova as seções marcadas como <!-- optional --> se não se aplicarem
# 4. Remova estas instruções (linhas começando com #)

---

# TASK-{{NUMERO}}: {{TÍTULO DA TASK}}

## Metadados

| Campo | Valor |
|---|---|
| **ID** | TASK-{{NUMERO}} |
| **Tipo** | {{research \| documentation \| decision \| validation}} |
| **Prioridade** | {{P0 \| P1 \| P2}} |
| **Tamanho** | {{S \| M \| L \| XL}} |
| **Owner** | {{agent-id}} |
| **Criada em** | {{YYYY-MM-DD}} |
| **Issue GitHub** | #{{numero}} |
| **Branch** | task/{{numero}}-{{slug}} |
| **Status** | {{backlog \| in-progress \| done \| blocked}} |

---

## Descrição

{{Descrição clara do que precisa ser feito e por quê. Deve ser autocontida — um agente sem contexto deve conseguir entender o que fazer.}}

---

## Critérios de Aceite

1. {{Critério mensurável 1}}
2. {{Critério mensurável 2}}
3. {{Critério mensurável 3}}

---

## Dependências

<!-- optional -->
- TASK-{{NUMERO}}: {{nome da task dependente}}

---

## Output Esperado

Arquivos que esta task produz ou modifica:

- `{{caminho/do/arquivo.md}}`

---

## Notas

<!-- optional -->
{{Qualquer contexto adicional, links para pesquisa, ou observações relevantes.}}
