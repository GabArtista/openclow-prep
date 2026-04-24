# EXIT_CHECKLIST.md — Checklist de Saída do Squad 0

> **Status:** INCOMPLETO
> **Última atualização:** 2026-04-15
> **Assinatura final requerida por:** Program Lead (humano)

Este checklist é o portão de saída do Squad 0. O Squad 1 **não pode iniciar** até que todos os itens estejam assinados.

Para assinar um item: substituir `[ ]` por `[x]` e adicionar `— [agent-id] em YYYY-MM-DD`.

---

## Seção 1: Escopo, Restrições e Evidência

- [ ] Escopo exato do programa documentado em `research/program-scope/mission-scope.md`
- [ ] Não-objetivos, limites e hipóteses explícitas documentados
- [ ] Restrições reais do ambiente documentadas em `research/program-scope/environment-constraints.md`
- [ ] Critérios de qualidade documentados em `research/architecture/quality-criteria.md`
- [ ] Evidências rastreáveis e fontes suficientes para sustentar as decisões major

---

## Seção 2: Ecossistema e Viabilidade

- [ ] OpenClaw avaliado em `research/candidate-assessments/openclaw-assessment.md`
- [ ] Paperclip avaliado em `research/candidate-assessments/paperclip-assessment.md`
- [ ] Ecossistema MCP e requisitos de interoperabilidade documentados em `research/ecosystem-fit/`
- [ ] Saúde upstream, manutenção e sinais reais de adoção documentados em `research/upstream-health/`
- [ ] Adaptabilidade ao contexto OpenClow explicitada com gaps e mitigação
- [ ] Horizon scan registrado em `research/horizon/`
- [ ] Radar de cientistas, pesquisadores e laboratórios avaliado quando relevante em `research/frontier/`

---

## Seção 3: Arquitetura, Runtime e Operação

- [ ] Runtime durável, retomável e control plane avaliados em `research/runtime/`
- [ ] Observabilidade e evals documentados em `research/observability/`
- [ ] Segurança, supply chain e agency boundaries documentados em `research/security/`
- [ ] Custo previsível e throughput operacional documentados em `research/cost/`
- [ ] Arquitetura alvo consolidada em `research/architecture/`
- [ ] Cada decisão major tem um ADR correspondente em `decisions/`

---

## Seção 4: Preparação do Squad 1

- [ ] Definição formal do Squad 1 criada em `research/squad-1-package/squad-1-definition.md`
- [ ] `squads/squad-1/INTAKE_PACKAGE.md` está com status COMPLETO
- [ ] Nenhuma seção do `INTAKE_PACKAGE.md` permanece marcada como pendente
- [ ] Backlog inicial do Squad 1 criado em `workboard/BACKLOG.md`
- [ ] Perguntas abertas e riscos residuais estão explicitamente listados para o Squad 1

---

## Seção 5: Qualidade e Governança

- [ ] Os artefatos principais foram revisados por pelo menos um agente além do autor
- [ ] `squads/squad-1/INTAKE_PACKAGE.md` foi revisado pelo Program Lead
- [ ] Nenhuma issue aberta com label `blocking-exit`
- [ ] Nenhuma issue aberta com label `handoff-conflict`
- [ ] `workboard/IN_PROGRESS.md` não tem tasks em andamento
- [ ] CI (`validate-structure.yml`) passando em verde no branch `main`

---

## Assinatura Final

| Item | Assinado por | Data |
|---|---|---|
| Seção 1 — Escopo e Evidência | — | — |
| Seção 2 — Ecossistema e Viabilidade | — | — |
| Seção 3 — Arquitetura e Operação | — | — |
| Seção 4 — Preparação do Squad 1 | — | — |
| Seção 5 — Qualidade e Governança | — | — |
| **APROVAÇÃO FINAL** | **Program Lead** | **—** |

---

## Após Aprovação

1. Atualizar `handoffs/ACTIVE.md`: baton = `UNASSIGNED`, fase = `Etapa 1 concluída`
2. Criar issue no GitHub: `[MILESTONE] Squad 0 Exit — Handoff para Squad 1`
3. O Squad 1 pode iniciar seguindo `squads/squad-1/ENTRY_CHECKLIST.md`
