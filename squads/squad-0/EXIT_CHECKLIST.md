# EXIT_CHECKLIST.md — Checklist de Saída do Squad 0

> **Status:** INCOMPLETO
> **Última atualização:** 2026-04-14
> **Assinatura final requerida por:** Program Lead (humano)

Este checklist é o portão de saída do Squad 0. O Squad 1 **não pode iniciar** até que todos os itens estejam assinados.

Para assinar um item: substituir `[ ]` por `[x]` e adicionar `— [agent-id] em YYYY-MM-DD`.

---

## Seção 1: Pesquisa Completa

- [ ] Visão do produto documentada em `research/product-vision.md`
- [ ] Pesquisa de domínio documentada em `research/domain-research.md`
- [ ] Análise competitiva documentada em `research/competitive-analysis.md` (mínimo 3 competidores)
- [ ] Segmentos de usuário definidos com características em `research/domain-research.md`
- [ ] Restrições duras documentadas em `research/constraints.md` (com origem e implicação)
- [ ] NFRs documentados em `research/nfr.md` (todos mensuráveis)
- [ ] Glossário do domínio criado em `research/glossary.md` (mínimo 20 termos)

---

## Seção 2: Arquitetura Completa

- [ ] Avaliação de stack tecnológico documentada em `research/tech-evaluation.md`
- [ ] Cada decisão major de stack tem um ADR em `decisions/`
- [ ] Arquitetura de alto nível documentada em `research/architecture-overview.md`
- [ ] Padrões arquiteturais têm ADRs em `decisions/`
- [ ] NFRs abordados pela arquitetura em `research/architecture-validation.md`
- [ ] Modelo de dados conceitual documentado em `research/data-model.md`
- [ ] Integrações e dependências externas documentadas em `research/integrations.md` (com nível de risco)

---

## Seção 3: Validação Completa

- [ ] Visão do produto validada com evidências em `research/validation-evidence.md` (mínimo 5 evidências)
- [ ] Arquitetura validada contra todos os NFRs em `research/architecture-validation.md`
- [ ] Nível de confiança declarado para cada evidência

---

## Seção 4: Documentação para o Squad 1

- [ ] `squads/squad-1/INTAKE_PACKAGE.md` está com status COMPLETO
- [ ] Todos os `{{PLACEHOLDER}}` foram preenchidos no INTAKE_PACKAGE.md
- [ ] `squads/squad-1/ENTRY_CHECKLIST.md` está atualizado e verificável
- [ ] Backlog inicial do Squad 1 criado em `workboard/BACKLOG.md` (mínimo 20 tasks com label `squad-1`)

---

## Seção 5: Qualidade e Governança

- [ ] Todos os ADRs em `decisions/` foram revisados por pelo menos um agente além do autor
- [ ] `squads/squad-1/INTAKE_PACKAGE.md` foi revisado pelo Program Lead
- [ ] Nenhuma issue aberta com label `blocking-exit`
- [ ] Nenhuma issue aberta com label `handoff-conflict`
- [ ] `workboard/IN_PROGRESS.md` não tem tasks em andamento (Squad 0 encerrou trabalho)
- [ ] CI (`validate-structure.yml`) passando em verde no branch `main`

---

## Assinatura Final

| Item | Assinado por | Data |
|---|---|---|
| Seção 1 — Pesquisa | — | — |
| Seção 2 — Arquitetura | — | — |
| Seção 3 — Validação | — | — |
| Seção 4 — Docs para Squad 1 | — | — |
| Seção 5 — Qualidade | — | — |
| **APROVAÇÃO FINAL** | **Program Lead** | **—** |

---

## Após Aprovação

1. Atualizar `handoffs/ACTIVE.md`: baton = `UNASSIGNED`, fase = `Aguardando Squad 1`
2. Criar issue no GitHub: `[MILESTONE] Squad 0 Exit — Handoff para Squad 1`
3. O Squad 1 pode iniciar seguindo `squads/squad-1/ENTRY_CHECKLIST.md`
