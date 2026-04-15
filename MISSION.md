# MISSION.md — OpenClow Program

> **Version:** 1.0
> **Created:** 2026-04-14
> **Phase:** Squad 0 — Active

---

## Missão do Programa

O OpenClow é um produto que será construído pelo Squad 1.
Antes disso, o **Squad 0** existe para garantir que o Squad 1 não precise reeditar nenhuma decisão, repesquisar nenhum domínio ou adivinhar nenhuma restrição.

**Missão do Squad 0:**
> Produzir um pacote completo, validado e consumível por IA que o Squad 1 possa usar para construir o OpenClow sem precisar re-pesquisar nada.

---

## Definição de "Done" para o Squad 0

O Squad 0 está concluído quando **todos** os itens abaixo estiverem assinados:

1. A visão do produto está documentada e validada com evidências
2. O domínio e os segmentos de usuário estão pesquisados e documentados
3. Todas as restrições duras (legal, compliance, performance, budget) estão mapeadas
4. Os requisitos não-funcionais (NFRs) estão documentados com métricas
5. A avaliação de stack tecnológica está completa, com ADRs para cada decisão major
6. A arquitetura de alto nível está proposta e validada contra os NFRs
7. O modelo de dados está proposto (não implementado)
8. Os pontos de integração e dependências externas estão identificados
9. Todos os riscos estão registrados com nível de severidade e mitigação
10. O pacote de intake do Squad 1 (`squads/squad-1/INTAKE_PACKAGE.md`) está completo
11. O checklist de saída do Squad 0 (`squads/squad-0/EXIT_CHECKLIST.md`) está 100% assinado
12. Nenhuma issue aberta com label `blocking-exit` existe no repositório

---

## Fora de Escopo para o Squad 0

O Squad 0 **não deve**:

- Escrever código de produto (UI, backend, runtime, banco de dados, migrations, Dockerfile de produto)
- Tomar decisões arquiteturais sem criar um ADR correspondente em `decisions/`
- Fazer deploy de qualquer serviço
- Criar contas em serviços externos sem aprovação do Program Lead
- Comprometer credenciais ou segredos em qualquer branch
- Iniciar trabalho do Squad 1 antecipadamente

---

## Critérios de Sucesso (perspectiva do Squad 1)

Após receber o handoff do Squad 0, o Squad 1 deve ser capaz de dizer:

- "Sei exatamente o que o produto precisa fazer e para quem"
- "Conheço todas as restrições que não posso ignorar"
- "Sei qual stack usar e por quê cada decisão foi tomada"
- "Tenho um modelo de dados de referência para começar"
- "Sei quais integrações externas precisarei fazer"
- "Tenho uma lista priorizada de tasks para meu primeiro sprint"

---

## Referências

- Checklist de saída do Squad 0: `squads/squad-0/EXIT_CHECKLIST.md`
- Checklist de entrada do Squad 1: `squads/squad-1/ENTRY_CHECKLIST.md`
- Pacote de intake do Squad 1: `squads/squad-1/INTAKE_PACKAGE.md`
- Backlog do programa: `workboard/BACKLOG.md`
