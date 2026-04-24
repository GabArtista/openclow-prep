<!-- TEMPLATE: ADR | version: 1.0 | do not remove this line -->

# ADR-0006: Permitir implementação do OpenClow somente em `product/` dentro do `openclow-prep`

## Metadados

| Campo | Valor |
|---|---|
| **Número** | ADR-0006 |
| **Status** | accepted |
| **Data** | 2026-04-23 |
| **Decisores** | codex |
| **Issue GitHub** | #2 |
| **Supersede** |  |
| **Supersedido por** |  |

---

## Contexto

O plano de auditoria, build e rollout do OpenClow passou a tratar o `openclow-prep` como base oficial de desenvolvimento, mas o repositório ainda proibia qualquer código de produto. Ao mesmo tempo, abrir um segundo repositório agora adicionaria fricção, duplicaria governança e separaria arquitetura, backlog, ADRs e implementação logo no início do build.

Além disso, a raiz deste repositório já é usada hoje como base operacional da Doze para organizar trabalho com as empresas da 12. Não podemos convertê-la em um repo de produto puro nem quebrar a forma atual de operação.

Precisamos de uma decisão explícita que permita o bootstrap do sistema sem corromper a camada de preparação do Squad 0 nem abrir espaço para código espalhado, segredos em repositório ou validações improvisadas em produção.

## Decisão

**O `openclow-prep` adotará um layout de monorepo separado, no qual toda implementação do OpenClow fica restrita a `product/`, enquanto a raiz do repositório continua reservada a pesquisa, decisões, handoffs, templates, backlog e governança.**

**Esse workspace `product/` nasce sob política staging-first: sem segredos no repo, sem produção por default, sem ações externas destrutivas sem checkpoint humano e sem código de produto fora da árvore isolada.**

## Justificativa

A solução preserva uma única fonte de verdade para o programa, mantém o histórico de decisão junto do bootstrap do produto e evita o custo operacional de sincronizar dois repositórios enquanto o escopo ainda está consolidando. Ao mesmo tempo, a fronteira `product/` cria uma regra objetiva e auditável para impedir que a camada de preparação e a operação atual da Doze virem um workspace difuso de implementação.

## Alternativas Consideradas

| Opção | Prós | Contras | Razão da Rejeição |
|---|---|---|---|
| Monorepo separado com `product/` isolado | Fonte de verdade única, baixa fricção inicial, governança próxima da implementação | Exige disciplina forte de fronteira e CI | N/A — escolhida |
| Criar um segundo repositório agora | Separação máxima entre preparação e produto | Duplica backlog, ADRs, handoffs e sincronização logo no bootstrap | Rejeitada por overhead precoce |
| Permitir implementação em qualquer ponto do repo atual | Flexibilidade imediata | Repositório perde legibilidade, aumenta risco de mistura entre docs e código | Rejeitada por falta de governança |

## Consequências

**Positivas:**
- O programa pode iniciar o build sem abandonar a governança já consolidada.
- A regra “código do sistema só em `product/`” fica simples de auditar e automatizar.
- Squad 0 e Squad 1 passam a compartilhar um contexto operacional único.
- A forma atual de trabalho da Doze com as empresas da 12 permanece preservada na raiz do repositório.

**Negativas / Trade-offs:**
- O repositório fica híbrido e exige documentação mais cuidadosa para evitar confusão.
- CI, backlog e políticas precisam considerar explicitamente a fronteira entre raiz e `product/`.

**Riscos:**
- Risco de agentes espalharem código fora de `product/`.
  Mitigação: atualizar `AGENTS.md`, `MISSION.md`, `POLICY.md`, workboard e CI para validar a fronteira.
- Risco de tratar `product/` como autorização implícita para tocar produção.
  Mitigação: staging-first como regra explícita, com checkpoint humano e aprovação documentada para qualquer exceção.

## Referências

- `research/squad-1-package/mvp-execution-plan.md`
- `research/ecosystem-fit/opensquad-portability-matrix.md`
- `research/architecture/mvp-server-architecture.md`
- `context/POLICY.md`
