<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# Cost and Throughput Model

> **Status:** Post-TASK-033 / MVP baseline established
> **Purpose:** modelar custo operacional e capacidade sem depender de estimativa vaga

## Model inputs

- number of concurrent runs
- model tier used by step
- number of external tool calls
- retention period of artifacts
- frequency of marketing and intelligence cycles

## Throughput tiers

### Fast tier

- low latency
- exploratory and lightweight steps
- concurrency can be >1 when safe

### Powerful tier

- heavyweight analysis, synthesis and creative steps
- concurrency should stay conservative
- each run must be budget-aware

## Cost guardrails

1. cada step pesado precisa de limite explícito
2. publish-capable steps precisam de checkpoint
3. runs concorrentes devem ter teto por ambiente
4. artefatos precisam de retenção definida

## Practical recommendations

- começar com concorrência baixa
- medir custo por run antes de ampliar volume
- preferir reuso de outputs já persistidos
- tratar publicação e promoção como operações de maior custo operacional, não como detalhe técnico

## Consequences

- o sistema fica mais previsível para operação real
- o escalonamento sem medição deixa de ser aceitável
