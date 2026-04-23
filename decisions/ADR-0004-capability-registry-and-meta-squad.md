<!-- TEMPLATE: ADR | version: 1.0 | do not remove this line -->

# ADR-0004: Adotar registry de capacidades com ciclo draft/staging/active e meta-squad interno

## Metadados

| Campo | Valor |
|---|---|
| **Número** | ADR-0004 |
| **Status** | accepted |
| **Data** | 2026-04-23 |
| **Decisores** | codex |
| **Issue GitHub** | N/A |
| **Supersede** |  |
| **Supersedido por** |  |

---

## Contexto

O MVP precisa ser capaz de criar e evoluir `skills`, `squads`, `pipelines` e `tools` de forma útil, mas isso não pode se transformar em autopublicação insegura. A própria necessidade do produto exige um meta-squad interno, porém sem política de promoção e versionamento isso vira risco operacional direto.

---

## Decisão

**O OpenClow adotará um registry formal de capacidades com estados `draft`, `staging`, `active` e `retired`, e usará um meta-squad interno para gerar e revisar capacidades antes de qualquer promoção.**

---

## Justificativa

Essa decisão atende simultaneamente dois objetivos do MVP:

- permitir evolução rápida do sistema
- manter checkpoints humanos, avaliação e rollback

Sem um registry formal, o meta-squad produziria artefatos sem trilha clara de governança.

---

## Alternativas Consideradas

| Opção | Prós | Contras | Razão da Rejeição |
|---|---|---|---|
| Registry formal + meta-squad | Evolução controlada, promotion explícita, rollback claro | Exige mais modelagem inicial | N/A — escolhida |
| Permitir edição direta e ativação imediata | Mais rápido no curto prazo | Alto risco de regressão e permissões indevidas | Inaceitável para ambiente com integrações reais |
| Adiar meta-squad para depois do MVP | Reduz escopo inicial | Viola requisito central do produto | Não atende o objetivo declarado |

---

## Consequências

**Positivas:**
- Capacidades passam a ter ciclo de vida e estado formal.
- O meta-squad ganha função produtiva sem receber autonomia irrestrita.

**Negativas / Trade-offs:**
- A UX inicial de criação fica um pouco mais estruturada.
- Será necessário definir benchmark mínimo para promoção.

**Riscos:**
- O fluxo de criação pode ficar burocrático demais.
  Mitigação: manter `draft` e `staging` simples, com validação proporcional ao risco da capacidade.

---

## Referências

- `research/architecture/user-experience-and-meta-squad.md`
- `research/architecture/mvp-server-architecture.md`
- `research/architecture/required-adrs.md`
