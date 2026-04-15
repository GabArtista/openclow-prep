# PROTOCOL.md — Protocolo de Handoff entre Agentes

> **Version:** 1.0
> **Aplica-se a:** Claude Code, Codex, e qualquer agente IA operando neste repositório
> **Última atualização:** 2026-04-14

---

## Definições

**Sessão:** Um período contínuo de trabalho por um único agente, do início à parada.

**Handoff:** A transferência formal do bastão de um agente para outro (ou de volta para o estado UNASSIGNED).

**Bastão:** O token virtual que indica qual agente está autorizado a trabalhar no repositório. Apenas o detentor do bastão deve commitar novos trabalhos.

**Snapshot de Contexto:** Um documento em `handoffs/snapshots/` que captura o estado detalhado de uma tarefa complexa para que o próximo agente possa continuar sem perda de contexto.

---

## Modelo do Bastão

```
UNASSIGNED → Agent A (agente pega o bastão)
Agent A → UNASSIGNED (agente termina ou pausa)
UNASSIGNED → Agent B (agente B pega o bastão)
```

Ou, em transferência direta planejada:
```
Agent A → Agent B (Agent A transfere explicitamente para Agent B)
```

Nunca:
```
Agent A → Agent A + Agent B (dois agentes simultâneos — PROIBIDO)
```

---

## Checklist de Pré-Handoff (Agente que SAI)

Execute estes passos **antes** de encerrar a sessão ou passar o bastão:

### Obrigatório
- [ ] Todo trabalho em progresso está commitado (verificar `git status`)
- [ ] `workboard/IN_PROGRESS.md` reflete o estado exato da task (não "em progresso" genérico — estado específico)
- [ ] `handoffs/ACTIVE.md` está atualizado com todos os campos (ver schema abaixo)
- [ ] O campo `baton` em `handoffs/ACTIVE.md` foi definido como `UNASSIGNED` ou o ID do próximo agente
- [ ] Commit de atualização do `handoffs/ACTIVE.md` foi feito e pusado

### Condicional
- [ ] Se a task é complexa (> 1 sessão estimada): snapshot criado em `handoffs/snapshots/`
- [ ] Se há bloqueadores: issue aberta no GitHub com label adequada
- [ ] Se uma decisão foi tomada: ADR criado em `decisions/`
- [ ] Se a task foi concluída: entrada movida de `IN_PROGRESS.md` para `workboard/DONE.md`

---

## Checklist de Pós-Handoff (Agente que CHEGA)

Execute estes passos **antes** de começar qualquer trabalho:

- [ ] Ler `handoffs/ACTIVE.md` completamente
- [ ] Ler `workboard/IN_PROGRESS.md`
- [ ] Verificar se há issues com label `handoff-conflict` ou `blocking-exit`
- [ ] Se referenciado: ler snapshot em `handoffs/snapshots/`
- [ ] Atualizar campo `last-read-by` em `handoffs/ACTIVE.md` com seu ID e timestamp
- [ ] Confirmar que o bastão está disponível (UNASSIGNED ou direcionado para você)
- [ ] Commitar a atualização do `last-read-by` (isso é a declaração formal de recebimento)

---

## Schema Obrigatório do `handoffs/ACTIVE.md`

Todo agente deve manter estes campos atualizados:

```markdown
## Estado do Bastão
- **baton:** [UNASSIGNED | agent-id]
- **last-updated-by:** [agent-id]
- **last-updated-at:** [YYYY-MM-DD HH:MM UTC]
- **last-read-by:** [agent-id | —]
- **last-read-at:** [YYYY-MM-DD HH:MM UTC | —]

## Tasks em Voo
<!-- Lista de tasks atualmente em progresso, com branch e issue -->

## Última Ação Completada
<!-- Uma linha descrevendo o que foi feito por último -->

## Próxima Ação Recomendada
<!-- Uma linha dizendo o que o próximo agente deve fazer primeiro -->

## Bloqueadores
<!-- NENHUM ou lista numerada de bloqueadores com link para issue -->

## Snapshot de Contexto
<!-- NENHUM ou caminho para handoffs/snapshots/YYYY-MM-DD-slug.md -->

## Notas para o Próximo Agente
<!-- Contexto livre: o que o próximo agente precisa saber que não está em outro lugar -->
```

---

## Formato de Snapshot de Contexto

Arquivo: `handoffs/snapshots/YYYY-MM-DD-<agent-id>-<slug>.md`

Conteúdo mínimo:

```markdown
# Snapshot: <título>
- **Agente:** <agent-id>
- **Data:** YYYY-MM-DD
- **Task em foco:** <nome da task e link da issue>
- **Branch:** <nome da branch>

## Estado atual da task
<!-- Onde a task está, o que foi feito, o que falta -->

## Decisões tomadas nesta sessão
<!-- Decisões que ainda não têm ADR, ou links para ADRs criados -->

## Próximas ações concretas
<!-- Lista numerada do que fazer a seguir, em ordem -->

## Perguntas em aberto
<!-- O que ficou sem resposta e pode bloquear -->

## Arquivos relevantes
<!-- Lista de arquivos mais importantes para esta task -->
```

---

## Resolução de Conflito de Bastão

Se dois agentes acreditam ter o bastão (detectado por commits conflitantes em `ACTIVE.md`):

1. **Ambos param imediatamente**
2. Um agente abre issue com label `handoff-conflict` descrevendo o conflito
3. Nenhum dos agentes commita nada novo até resolução
4. O Program Lead (humano) decide qual estado é canônico
5. O estado conflitante é revertido ou mergeado manualmente
6. `handoffs/ACTIVE.md` é atualizado com estado resolvido
7. Apenas um agente retoma o trabalho

**Regra de desempate automático:** se não for possível contatar o Program Lead em 24h, o agente com o commit mais recente em `handoffs/ACTIVE.md` é considerado detentor do bastão. O outro agente deve aguardar.

---

## Escalação

| Situação | Ação | Label da Issue |
|---|---|---|
| Dois agentes com bastão | Parar, abrir issue | `handoff-conflict` |
| Situação não coberta por política | Parar, abrir issue | `policy-gap` |
| Bloqueador técnico sem solução | Documentar, abrir issue | `blocking-exit` (se bloqueia saída Squad 0) ou `blocked` |
| ADR necessário mas decisão incerta | Abrir issue de discussão | `decision`, `question` |
