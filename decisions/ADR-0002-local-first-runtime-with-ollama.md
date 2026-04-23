<!-- TEMPLATE: ADR | version: 1.0 | do not remove this line -->

# ADR-0002: Adotar runtime local-first inicial com Ollama e tiers lógicos de modelo

## Metadados

| Campo | Valor |
|---|---|
| **Número** | ADR-0002 |
| **Status** | accepted |
| **Data** | 2026-04-23 |
| **Decisores** | codex |
| **Issue GitHub** | N/A |
| **Supersede** |  |
| **Supersedido por** |  |

---

## Contexto

O servidor de referência já possui `Ollama` em operação com modelos locais carregados, mas não há GPU NVIDIA confirmada. O MVP precisa funcionar desde o day-1 com previsibilidade operacional, sem introduzir várias camadas de inferência ao mesmo tempo. Se não decidirmos um runtime inicial simples, o build pode travar em comparações prematuras entre `Ollama`, `vLLM`, `LiteLLM`, `LM Studio` e outros.

---

## Decisão

**O MVP usará `Ollama` como runtime inicial de inferência, com dois tiers lógicos de modelo (`fast` e `powerful`) e política conservadora de concorrência.**

---

## Justificativa

`Ollama` já está ativo no servidor, reduz moving parts e permite começar com modelos suficientes para estratégia, BI, pesquisa, copy, revisão e orquestração. O custo principal do MVP está no control plane e nas integrações; não há justificativa para introduzir serving mais complexo antes de benchmark real.

---

## Alternativas Consideradas

| Opção | Prós | Contras | Razão da Rejeição |
|---|---|---|---|
| `Ollama` inicial com tiers lógicos | Já disponível, simples, compatível com o host atual | Throughput limitado, sem aceleração pesada | N/A — escolhida |
| Introduzir `vLLM` desde o início | Melhor throughput potencial | Maior complexidade, depende mais de GPU para valer a pena | Prematuro para o servidor atual |
| Introduzir `LiteLLM` desde o início | Gateway unificado e fallback | Mais camada operacional sem necessidade imediata | Adiado até existir demanda real de multi-backend |
| Esperar GPU e só então escolher runtime | Evita retrabalho futuro | Atrasa o MVP e bloqueia day-1 | Não atende o objetivo do programa |

---

## Consequências

**Positivas:**
- O MVP pode começar a operar imediatamente no servidor atual.
- A estratégia de runtime fica simples e observável no início.

**Negativas / Trade-offs:**
- Concurrency precisa ser conservadora.
- Vídeo, multimodal pesado e criativos locais intensivos ficam limitados no day-1.

**Riscos:**
- O desempenho pode frustrar expectativas em workloads pesados.
  Mitigação: separar jobs pesados em fila, medir uso real e só então evoluir o stack de inferência.

---

## Referências

- `research/runtime/local-runtime-strategy.md`
- `research/runtime/server-reference-inventory.md`
- `research/program-scope/environment-constraints.md`
