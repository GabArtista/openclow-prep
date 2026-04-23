# openclow-prep

> Repositório-base do programa OpenClow, com preparação e governança na raiz e implementação isolada em `product/`.
> Fase atual: **Squad 0 — Pesquisa profunda, viabilidade e arquitetura**

---

## O que é este repositório

Este repositório é a **fonte de verdade** do programa OpenClow durante a fase de preparação e bootstrap.

A raiz do repositório continua dedicada ao trabalho do Squad 0: pesquisa, decisões, políticas, backlog e handoffs.
Ela também precisa continuar servindo como base operacional atual da Doze para o trabalho com as empresas da 12.
Quando houver implementação do sistema, ela deve acontecer **somente** dentro de `product/`, em layout monorepo separado e sob guardrails explícitos de staging-first, checkpoint humano e ausência de segredos no repo.

---

## Navegação Rápida

| Se você é... | Comece aqui |
|---|---|
| Um agente IA iniciando uma sessão | [`AGENTS.md`](./AGENTS.md) |
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
| Fase | Squad 0 — Etapa 1 ativa |
| Última atualização | 2026-04-15 |
| Agente atual | ver `handoffs/ACTIVE.md` |
| Issues abertas | ver GitHub Issues |

---

## Regras Inegociáveis

1. **Nenhum código de produto fora de `product/`** — a raiz do repositório continua reservada a documentação, governança e coordenação
2. **Nenhuma credencial** — tokens, senhas, chaves de API nunca entram no repositório
3. **Toda decisão tem um ADR** — nada é decidido sem registro em `decisions/`
4. **O bastão é de um agente por vez** — verificar `handoffs/ACTIVE.md` antes de começar
5. **`ACTIVE.md` e `IN_PROGRESS.md` sempre atualizados** — nunca encerrar uma sessão sem atualizar
6. **Nunca commitar em `main` diretamente** — sempre via PR com revisão explícita
7. **Staging-first sempre** — produção e integrações reais não são tocadas por default
8. **Documentação legível por IA** — toda doc deve ser autocontida e compreensível sem contexto externo

---

## Estrutura do Repositório

```
openclow-prep/
├── AGENTS.md              ← Contrato canônico para agentes IA
├── CLAUDE.md              ← Alias compatível para sessões via Claude Code
├── CODEX.md               ← Alias compatível para sessões via Codex
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
├── product/               ← Workspace isolado do sistema OpenClow
└── .github/               ← Templates de issues/PRs, CI, labels
```

---

## Handoff entre Agentes

Este repositório é projetado para ser operado por diferentes agentes IA de forma intercambiável.

`AGENTS.md` é a fonte de verdade comum.
`CLAUDE.md` e `CODEX.md` existem como pontos de entrada compatíveis para diferentes runtimes, sem alterar o protocolo operacional.

O protocolo de handoff está em [`handoffs/PROTOCOL.md`](./handoffs/PROTOCOL.md).
O estado atual está em [`handoffs/ACTIVE.md`](./handoffs/ACTIVE.md).

**Regra do bastão**: apenas um agente trabalha por vez. Quem escreveu por último em `handoffs/ACTIVE.md` detém o bastão.
