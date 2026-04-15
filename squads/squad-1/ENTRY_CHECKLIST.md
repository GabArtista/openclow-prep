# ENTRY_CHECKLIST.md — Checklist de Entrada do Squad 1

> **Status:** Aguardando Squad 0 concluir
> **Última atualização:** 2026-04-14

O Squad 1 deve executar este checklist **antes do primeiro commit** no repositório de produto.

---

## Pré-requisitos (verificar antes de qualquer ação)

- [ ] `squads/squad-0/EXIT_CHECKLIST.md` está 100% assinado com aprovação do Program Lead
- [ ] `squads/squad-1/INTAKE_PACKAGE.md` está com status `COMPLETO` (sem `{{PLACEHOLDER}}`)
- [ ] `handoffs/ACTIVE.md` indica que o bastão está disponível para o Squad 1
- [ ] Nenhuma issue aberta com label `blocking-exit` ou `handoff-conflict`

---

## Checklist de Orientação (primeira sessão do Squad 1)

### Leitura obrigatória (nesta ordem)
- [ ] `CLAUDE.md` — entender o contrato comportamental
- [ ] `MISSION.md` — entender o objetivo do programa
- [ ] `squads/squad-1/INTAKE_PACKAGE.md` — ler completamente, de ponta a ponta
- [ ] Todos os ADRs em `decisions/` — entender as decisões tomadas pelo Squad 0
- [ ] `squads/squad-1/INTAKE_PACKAGE.md` Seção 9 — anotar todas as questões em aberto

### Verificações
- [ ] Anotar todas as questões em aberto da Seção 9 do INTAKE_PACKAGE.md
- [ ] Verificar se há pontos de discordância com as decisões do Squad 0 (criar issues para cada)
- [ ] Confirmar que o glossário está compreensível (criar issues para termos confusos)

---

## Primeiras Ações do Squad 1

- [ ] Criar `squads/squad-1/CHARTER.md` (Squad 1 define seu próprio charter)
- [ ] Atualizar `workboard/BACKLOG.md` com as tasks do Squad 1 (vindas da Seção 10 do INTAKE_PACKAGE.md)
- [ ] Atualizar `handoffs/ACTIVE.md`: Squad 1 ativo, primeiro agente declarado como detentor do bastão
- [ ] Criar issues no GitHub para todas as tasks P0 do Squad 1
- [ ] Iniciar a primeira task P0

---

## Sobre Discordâncias com o Squad 0

Se o Squad 1 discordar de uma decisão do Squad 0:

1. Criar uma issue com label `decision` e `squad-1`
2. Descrever a discordância e a alternativa proposta
3. Criar um ADR de revisão em `decisions/` que **supersede** o ADR original (nunca modificar ADRs existentes)
4. Obter aprovação do Program Lead antes de prosseguir com a abordagem alternativa

As decisões do Squad 0 são um ponto de partida fundamentado, não uma prisão. Mas toda mudança deve ser documentada.
