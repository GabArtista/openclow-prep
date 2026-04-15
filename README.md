# openclow-prep

> Repositório de preparação do programa OpenClow.
> Fase atual: **Squad 0 — Pesquisa, Validação e Arquitetura**

---

## O que é este repositório

Este repositório é a **fonte de verdade** do programa OpenClow durante a fase de preparação.

O OpenClow (produto final) **não é desenvolvido aqui**. Este repositório existe para que o Squad 0 possa pesquisar, validar, documentar e entregar um pacote completo para o Squad 1, que depois construirá o produto.

---

## Navegação Rápida

| Se você é... | Comece aqui |
|---|---|
| Um agente IA iniciando uma sessão | [`CLAUDE.md`](./CLAUDE.md) |
| Membro do Squad 0 | [`squads/squad-0/CHARTER.md`](./squads/squad-0/CHARTER.md) |
| Revisando o estado atual | [`handoffs/ACTIVE.md`](./handoffs/ACTIVE.md) |
| Vendo o que está em andamento | [`workboard/IN_PROGRESS.md`](./workboard/IN_PROGRESS.md) |
| Vendo o backlog | [`workboard/BACKLOG.md`](./workboard/BACKLOG.md) |
| Preparando o Squad 1 | [`squads/squad-1/ENTRY_CHECKLIST.md`](./squads/squad-1/ENTRY_CHECKLIST.md) |
| Revisando decisões arquiteturais | [`decisions/`](./decisions/) |
| Entendendo a missão do programa | [`MISSION.md`](./MISSION.md) |
| Verificando política de acesso | [`context/POLICY.md`](./context/POLICY.md) |

---

## Status do Programa

| Campo | Valor |
|---|---|
| Fase | Squad 0 — Ativo |
| Última atualização | 2026-04-14 |
| Agente atual | ver `handoffs/ACTIVE.md` |
| Issues abertas | ver GitHub Issues |

---

## Regras Inegociáveis

1. **Nenhum código de produto** — nenhum arquivo `.ts`, `.js`, `.py`, `.go`, `.sql` ou similar
2. **Nenhuma credencial** — tokens, senhas, chaves de API nunca entram no repositório
3. **Toda decisão tem um ADR** — nada é decidido sem registro em `decisions/`
4. **O bastão é de um agente por vez** — verificar `handoffs/ACTIVE.md` antes de começar
5. **`ACTIVE.md` e `IN_PROGRESS.md` sempre atualizados** — nunca encerrar uma sessão sem atualizar
6. **Nunca commitar em `main` diretamente** — sempre via PR com revisão explícita
7. **Documentação legível por IA** — toda doc deve ser autocontida e compreensível sem contexto externo

---

## Estrutura do Repositório

```
openclow-prep/
├── CLAUDE.md              ← Contrato comportamental para agentes IA
├── MISSION.md             ← Missão e definição de "done" do Squad 0
├── context/               ← Políticas de acesso a sistemas externos
├── handoffs/              ← Estado de handoff entre agentes
├── workboard/             ← Backlog, trabalho em progresso, concluídos
├── squads/
│   ├── squad-0/           ← Charter, roles, plano, checklist de saída
│   └── squad-1/           ← Pacote de intake, checklist de entrada
├── templates/             ← Templates para tasks, ADRs, runbooks, etc.
├── decisions/             ← Architecture Decision Records (imutáveis)
├── research/              ← Outputs de pesquisa do Squad 0
└── .github/               ← Templates de issues/PRs, CI, labels
```

---

## Handoff entre Claude Code e Codex

Este repositório é projetado para ser operado por diferentes agentes IA de forma intercambiável.

O protocolo de handoff está em [`handoffs/PROTOCOL.md`](./handoffs/PROTOCOL.md).
O estado atual está em [`handoffs/ACTIVE.md`](./handoffs/ACTIVE.md).

**Regra do bastão**: apenas um agente trabalha por vez. Quem escreveu por último em `handoffs/ACTIVE.md` detém o bastão.
