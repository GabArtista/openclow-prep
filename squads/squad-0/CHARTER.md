# CHARTER.md — Charter do Squad 0

> **Version:** 1.0
> **Status:** Ativo
> **Criado em:** 2026-04-14
> **Encerramento previsto:** Quando `EXIT_CHECKLIST.md` estiver 100% assinado

---

## Missão do Squad 0

O Squad 0 existe para eliminar incerteza antes do Squad 1 começar a construir.

Sua entrega final é um **pacote de intake completo** (`squads/squad-1/INTAKE_PACKAGE.md`) que permite ao Squad 1 iniciar o desenvolvimento do OpenClow sem precisar re-pesquisar domínio, re-avaliar tecnologias, ou adivinhar restrições.

---

## Mandato

O Squad 0 está autorizado a:

- Pesquisar o domínio, mercado, usuários e competidores do OpenClow
- Definir e documentar a visão do produto
- Avaliar opções tecnológicas e registrar as decisões como ADRs
- Propor a arquitetura de alto nível do sistema
- Documentar restrições, NFRs, riscos e integrações
- Criar e manter todos os documentos de `research/` e `decisions/`
- Criar issues no GitHub, abrir PRs, mergear PRs após revisão
- Atualizar `squads/squad-1/INTAKE_PACKAGE.md` incrementalmente

---

## Restrições

O Squad 0 **não está autorizado** a:

- Escrever qualquer código de produto (ver `CLAUDE.md` Seção 6 para lista completa)
- Tomar decisões arquiteturais finais sem registrar um ADR
- Modificar `squads/squad-1/ENTRY_CHECKLIST.md` ou `squads/squad-1/INTAKE_PACKAGE.md` após a revisão final sem aprovação do Program Lead
- Contratar serviços externos, criar contas ou assinar planos
- Trabalhar no repositório final `openclow` (ainda não existe)

---

## Duração

O Squad 0 está ativo desde o bootstrap (2026-04-14) até o momento em que:

1. Todos os itens de `EXIT_CHECKLIST.md` estiverem assinados
2. O Program Lead aprovar formalmente o handoff para o Squad 1
3. `handoffs/ACTIVE.md` for atualizado para refletir "Squad 1 ativo"

---

## Composição

Ver `squads/squad-0/ROLES.md` para a descrição completa dos papéis.

O Squad 0 pode ser composto por:
- Agentes IA (Claude Code, Codex) operando de forma intercambiável
- O Program Lead (humano) como revisor e aprovador final

---

## Autoridade de Decisão

| Tipo de Decisão | Quem decide | Registro obrigatório |
|---|---|---|
| Estrutura de documento | Agente ativo | Commit message |
| Escolha de tecnologia | Agente ativo + revisão | ADR obrigatório |
| Padrão arquitetural | Agente ativo + revisão | ADR obrigatório |
| Mudança no escopo do Squad 0 | Program Lead | Issue + ADR |
| Handoff para Squad 1 | Program Lead | Checklist assinado |

---

## Relacionamento com o Squad 1

O Squad 0 entrega ao Squad 1, não trabalha com o Squad 1.

- O Squad 0 não persiste para o Squad 1
- As decisões do Squad 0 podem ser questionadas pelo Squad 1 via ADR de revisão
- O Squad 0 não tem autoridade para aprovar trabalho do Squad 1

---

## Critério de Sucesso do Squad 0

Ver `MISSION.md` para a definição completa.

Em resumo: o Squad 1 pode iniciar o desenvolvimento sem fazer nenhuma pergunta que não esteja respondida nos documentos produzidos pelo Squad 0.
