<!-- TEMPLATE: ADR | version: 1.0 | do not remove this line -->

# ADR-0005: Tratar produção, segredos e ações externas sob política de segurança explícita

## Metadados

| Campo | Valor |
|---|---|
| **Número** | ADR-0005 |
| **Status** | accepted |
| **Data** | 2026-04-23 |
| **Decisores** | codex |
| **Issue GitHub** | N/A |
| **Supersede** |  |
| **Supersedido por** |  |

---

## Contexto

Existem ativos reais da Doze em produção, incluindo `shop.dozecrew.com`, contas Meta, WooCommerce e outras integrações. O estudo do `opensquad` mostrou uso real de APIs e também evidências de um padrão de documentação de credenciais que o `OpenClow` não deve repetir. Sem uma decisão explícita agora, o build pode nascer com risco operacional inaceitável.

---

## Decisão

**O OpenClow adotará política explícita de segurança para produção e segredos: nenhum segredo em repositório, nenhuma ação externa de alto impacto sem checkpoint humano, e nenhum binding de produção acessível por default a capabilities em `draft` ou `staging`.**

---

## Justificativa

O produto precisa ser útil em integrações reais, mas isso só é aceitável se a fronteira entre definição, teste e operação ativa for rígida. Produção deve ser tratada como zona protegida, e não como extensão natural do workspace.

---

## Alternativas Consideradas

| Opção | Prós | Contras | Razão da Rejeição |
|---|---|---|---|
| Política explícita de produção e segredos | Reduz risco, protege ativos reais, viabiliza auditoria | Exige desenho adicional de bindings e promotion | N/A — escolhida |
| Reusar o padrão atual de integrações do opensquad | Mais rápido para demonstrar valor | Frágil para produção, risco de exposição de segredos | Incompatível com o nível de segurança exigido |
| Postergar a política para depois do MVP | Acelera o primeiro build | Cria dívida perigosa já no começo | Rejeitada por risco alto demais |

---

## Consequências

**Positivas:**
- O programa passa a respeitar explicitamente os ativos de produção da Doze.
- Skills, tools e squads terão fronteiras mais claras entre teste e operação real.

**Negativas / Trade-offs:**
- Algumas demonstrações ficam menos “mágicas” no início.
- O fluxo de publicação externa exigirá mais passos.

**Riscos:**
- Pressão para burlar checkpoints em nome de velocidade.
  Mitigação: tornar o fluxo seguro o padrão e reservar bypass apenas a aprovações explícitas e auditáveis.

---

## Referências

- `research/program-scope/environment-constraints.md`
- `research/ecosystem-fit/doze-integrations-inventory.md`
- `research/architecture/quality-criteria.md`
