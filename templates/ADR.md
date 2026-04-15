<!-- TEMPLATE: ADR | version: 1.0 | do not remove this line -->

# Como usar este template
# 1. Copie para decisions/ADR-NNNN-titulo-curto.md (número sequencial, zero-padded)
# 2. Preencha todos os campos {{PLACEHOLDER}}
# 3. ADRs são IMUTÁVEIS após merge. Para reverter, crie um novo ADR que supersede este.
# 4. Remova estas instruções (linhas começando com #)

---

# ADR-{{NNNN}}: {{Título da Decisão}}

## Metadados

| Campo | Valor |
|---|---|
| **Número** | ADR-{{NNNN}} |
| **Status** | {{proposed \| accepted \| rejected \| superseded}} |
| **Data** | {{YYYY-MM-DD}} |
| **Decisores** | {{agent-id(s)}} |
| **Issue GitHub** | #{{numero}} |
| **Supersede** | <!-- optional --> ADR-{{NNNN anterior}} |
| **Supersedido por** | <!-- optional --> ADR-{{NNNN posterior}} |

---

## Contexto

{{Descreva a situação ou problema que motivou esta decisão. Inclua:
- Qual é a pressão ou requisito que força uma decisão agora?
- Quais restrições existem (técnicas, de negócio, de tempo)?
- O que acontece se não decidirmos?}}

---

## Decisão

**{{Enunciado claro e direto da decisão, em uma ou duas frases.}}**

---

## Justificativa

{{Por que esta opção foi escolhida em detrimento das alternativas?
Conecte aos critérios de avaliação usados.}}

---

## Alternativas Consideradas

| Opção | Prós | Contras | Razão da Rejeição |
|---|---|---|---|
| {{Opção A (escolhida)}} | {{prós}} | {{contras}} | N/A — escolhida |
| {{Opção B}} | {{prós}} | {{contras}} | {{razão}} |
| {{Opção C}} | {{prós}} | {{contras}} | {{razão}} |

---

## Consequências

**Positivas:**
- {{Consequência positiva 1}}
- {{Consequência positiva 2}}

**Negativas / Trade-offs:**
- {{Trade-off 1}}
- {{Trade-off 2}}

**Riscos:**
- {{Risco 1 e como mitigar}}

---

## Referências

<!-- optional -->
- {{Link para documentação, paper, ou evidência que embasou a decisão}}
- `{{caminho/para/arquivo/relevante.md}}`
