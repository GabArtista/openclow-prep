# AGENTS.md — Contrato Operacional para Agentes IA

> Este é o arquivo canônico que qualquer agente IA deve ler ao iniciar uma sessão neste repositório.
> Tudo aqui é obrigatório, não sugestivo.
> `CLAUDE.md` e `CODEX.md` existem apenas como aliases de compatibilidade.

---

## Seção 1: O que é este repositório

Este é o repositório `openclow-prep`, a fonte de verdade do programa OpenClow durante a fase de preparação.

**O que este repositório É:**
- Base de operação do Squad 0 (pesquisa, validação, arquitetura, documentação)
- Repositório principal usado hoje pela Doze para organizar o trabalho operacional com as empresas da 12
- Repositório de decisões, evidências, templates e handoffs
- Fonte de dados para o Squad 1 construir o produto OpenClow
- Monorepo separado: a raiz continua dedicada à preparação e governança, e toda implementação do sistema fica isolada em `product/`

**O que este repositório NÃO É:**
- Um workspace livre para espalhar código de produto fora de `product/`
- Um lugar para experimentos ou prototipagem de produto sem ADR, workboard e handoff
- Um atalho para tocar produção sem staging, checkpoint e aprovação explícita

Fase atual: **Squad 0 — Ativo**

---

## Seção 2: Ordem de Leitura ao Iniciar uma Sessão

Leia estes arquivos nesta ordem antes de fazer qualquer coisa:

1. `AGENTS.md` ← você está aqui
2. `MISSION.md` — o que o programa precisa entregar
3. `context/POLICY.md` — o que você pode e não pode fazer
4. `workboard/IN_PROGRESS.md` — o que está sendo feito agora
5. `handoffs/ACTIVE.md` — estado atual, quem tem o bastão, o que fazer a seguir

**Por quê essa ordem?** MISSION define o objetivo, POLICY define os limites, IN_PROGRESS mostra o contexto imediato, ACTIVE mostra de onde continuar.

---

## Seção 2.1: Como Usar o Sistema Completo

Para operar o repositório com 100% de contexto e sem atrapalhar outros agentes:

1. Identifique o papel ativo em `squads/squad-0/ROLES.md`
2. Abra o prompt correspondente em `prompts/squad-0/`
3. Declare em `handoffs/ACTIVE.md` qual papel ou combinação de papéis está ativa na sessão
4. Use `context/POLICY.md` como limite para ferramentas, sistemas externos e autonomia
5. Registre progresso em `workboard/IN_PROGRESS.md` e resultados em `research/`, `decisions/`, `templates/` ou `product/` conforme o tipo de output

**Regra operacional:** `squads/` define responsabilidades, `prompts/` define postura de execução, `context/POLICY.md` define limites de ferramentas e ação, e `handoffs/` coordena a colaboração entre agentes.

---

## Seção 3: Protocolo de Início de Sessão

Execute este checklist toda vez que iniciar uma sessão:

- [ ] Ler `handoffs/ACTIVE.md` — verificar quem tem o bastão
- [ ] Ler `workboard/IN_PROGRESS.md` — verificar se há trabalho em voo
- [ ] Verificar se há issues abertas com label `blocking-exit` ou `handoff-conflict`
- [ ] Atualizar o campo `last-read-by` em `handoffs/ACTIVE.md` com seu ID de agente e timestamp
- [ ] Confirmar qual task você vai trabalhar antes de começar

**Formato do ID de agente:** `codex`, `claude-code`, `claude-opus`, etc. Seja consistente entre sessões.

---

## Seção 4: Protocolo de Fim de Sessão

Execute este checklist antes de encerrar qualquer sessão:

- [ ] Todos os arquivos modificados estão commitados (nenhum trabalho perdido em unstaged)
- [ ] `workboard/IN_PROGRESS.md` atualizado com o estado exato da task
- [ ] `handoffs/ACTIVE.md` atualizado com: o que foi feito, próxima ação recomendada, bloqueadores
- [ ] Se a task está completa: mover entrada de `IN_PROGRESS.md` para `workboard/DONE.md`
- [ ] Se a task é complexa e não vai terminar em uma sessão: criar snapshot em `handoffs/snapshots/`
- [ ] Commit com mensagem no formato correto (ver Seção 8)

**Nunca encerre uma sessão com trabalho não commitado ou `ACTIVE.md` desatualizado.**

---

## Seção 5: Comportamentos Obrigatórios

### Toda decisão importante precisa de um ADR
Se você tomou uma decisão que afeta mais do que a task atual (escolha de tecnologia, mudança de estrutura, definição de padrão), crie um ADR em `decisions/` usando `templates/ADR.md`.

O limiar é deliberadamente baixo: se você hesitou entre duas abordagens, registre o porquê da escolha.

### Branches para tudo
Nunca commite diretamente em `main`. Sempre:
1. Crie uma branch no padrão: `task/<numero-issue>-<slug>`
2. Faça o trabalho na branch
3. Abra um PR usando `.github/PULL_REQUEST_TEMPLATE.md`

### Use templates sempre
Para tasks, ADRs, runbooks, evidências e rollbacks, use sempre os templates em `templates/`. Não desvie da estrutura sem criar uma issue primeiro.

### Código do sistema só em `product/`
Qualquer arquivo de implementação do OpenClow deve viver exclusivamente dentro de `product/`.

Todo o restante do repositório continua reservado a pesquisa, decisões, handoffs, templates e governança operacional.

### Na incerteza, pare e pergunte
Se você não sabe como proceder, abra uma issue com label `question` e escreva em `handoffs/ACTIVE.md` que está bloqueado. **Nunca adivinhe.**

---

## Seção 6: Comportamentos Proibidos

Estas ações são **absolutamente proibidas**, independente de contexto:

1. **Escrever código de produto fora de `product/`** — nenhum arquivo com extensão `.ts`, `.tsx`, `.js`, `.jsx`, `.py`, `.go`, `.rs`, `.java`, `.rb`, `.php`, `.sql`, `.graphql`, `Dockerfile` (de produto), `docker-compose.yml` (de produto) pode existir fora da árvore `product/`
2. **Commitar credenciais** — tokens, senhas, chaves de API, certificados privados, qualquer valor secreto
3. **Commitar em `main` diretamente** — sempre usar PR
4. **Deletar arquivos em `decisions/`** — ADRs são imutáveis; para reverter, crie um novo ADR
5. **Deletar arquivos em `handoffs/snapshots/`** — snapshots são imutáveis
6. **Modificar `squads/squad-1/`** sem criar uma issue primeiro
7. **Fazer merge de PR sem comentário de revisão explícito** — mesmo auto-revisão deve ser textualmente declarada
8. **Acessar sistemas externos além do permitido** em `context/POLICY.md`
9. **Tocar produção por default** — qualquer teste ou ação que possa afetar `shop.dozecrew.com` ou integrações reais da Doze exige staging/dry-run quando possível, checkpoint humano e aprovação explícita

---

## Seção 7: Regra do Bastão (Handoff entre Agentes)

Apenas um agente trabalha por vez. O bastão é definido por quem escreveu por último em `handoffs/ACTIVE.md`.

**Para pegar o bastão:**
1. Ler `handoffs/ACTIVE.md`
2. Verificar que o bastão está `UNASSIGNED` ou que o agente anterior completou seu trabalho
3. Atualizar `handoffs/ACTIVE.md` com seu ID e timestamp
4. Commitar a atualização (isso é a declaração formal de posse do bastão)

**Para passar o bastão:**
1. Completar o protocolo de fim de sessão (Seção 4)
2. Atualizar `baton` em `handoffs/ACTIVE.md` para `UNASSIGNED` ou para o próximo agente esperado
3. Commitar e pushar

**Conflito de bastão:** Se dois agentes acreditam ter o bastão, abrir issue com label `handoff-conflict` e aguardar resolução humana. Ver protocolo completo em `handoffs/PROTOCOL.md`.

---

## Seção 8: Uso de Templates

| Situação | Template |
|---|---|
| Nova task de trabalho | `templates/TASK.md` |
| Decisão arquitetural | `templates/ADR.md` |
| Procedimento operacional | `templates/RUNBOOK.md` |
| Evidência de pesquisa/validação | `templates/EVIDENCE.md` |
| Plano de rollback | `templates/ROLLBACK.md` |

**Como usar:** copie o template para o diretório adequado, preencha todos os campos `{{PLACEHOLDER}}`, remova os comentários `<!-- optional -->` que não se aplicam.

Os templates têm um header `<!-- TEMPLATE: ... -->` — nunca remova essa linha, ela permite auditoria.

---

## Seção 9: Convenções do Workboard

Três arquivos, três estados:

| Arquivo | Estado | Quando atualizar |
|---|---|---|
| `workboard/BACKLOG.md` | Não iniciado | Ao criar ou priorizar tasks |
| `workboard/IN_PROGRESS.md` | Em andamento | Ao iniciar uma task (mover do backlog) |
| `workboard/DONE.md` | Concluído | Ao completar uma task (mover do in_progress) |

**Regra:** uma task existe em apenas um estado por vez. Nunca deixe uma task em dois arquivos simultaneamente.

**Prioridades:** P0 (crítico/bloqueante), P1 (alta), P2 (normal)
**Tamanhos:** S (< 2h), M (2-8h), L (1-3 dias), XL (> 3 dias)

---

## Seção 10: Estratégia de Branches e PRs

### Nomenclatura de Branches
```
task/<numero-issue>-<slug-curto>       # trabalho de task
decision/<numero-issue>-<slug-curto>   # ADR ou decisão
research/<numero-issue>-<slug-curto>   # pesquisa
```
Máximo 60 caracteres. Slug em kebab-case.

### Convenção de Commits
```
type(scope): descrição no imperativo
```
Types: `docs`, `chore`, `decision`, `research`, `template`, `backlog`, `meta`
Scope: diretório ou arquivo sendo tocado (ex: `docs(squad-0): adiciona charter`)

### PRs
- Todo PR deve referenciar a issue que o originou (`Closes #N`)
- Usar o template `.github/PULL_REQUEST_TEMPLATE.md` sem exceções
- Checar todos os itens do checklist antes de marcar pronto para revisão

---

## Seção 11: Política de Snapshots de Contexto

Quando criar um snapshot:
- Antes de uma task longa que vai durar múltiplas sessões
- Antes de passar o bastão para um agente diferente
- Quando o contexto acumulado da sessão está ficando grande

Como criar:
1. Copie `templates/` (não existe template de snapshot, use formato livre)
2. Salve em `handoffs/snapshots/YYYY-MM-DD-<agent-id>-<slug>.md`
3. Inclua: estado da task, decisões tomadas, próximas ações, perguntas abertas, links para arquivos relevantes
4. Referencie o snapshot em `handoffs/ACTIVE.md`

Snapshots são **imutáveis** após criados. Para atualizar, crie um novo.

---

## Seção 12: Definição de "Done" para Qualquer Task

Uma task está **done** quando:

- [ ] O artefato de output existe e está commitado (arquivo de pesquisa, ADR, template preenchido, etc.)
- [ ] A issue relacionada está fechada ou atualizada com link para o output
- [ ] A entrada em `workboard/IN_PROGRESS.md` foi movida para `workboard/DONE.md`
- [ ] `handoffs/ACTIVE.md` foi atualizado
- [ ] Se foi uma decisão: existe um ADR em `decisions/`
- [ ] Nenhum `{{PLACEHOLDER}}` permanece nos arquivos criados (exceto em `templates/`)
- [ ] O PR foi mergeado (se aplicável)

---

## Glossário Rápido

| Termo | Significado |
|---|---|
| Bastão | Permissão de trabalhar no repositório (um agente por vez) |
| ADR | Architecture Decision Record — registro imutável de uma decisão |
| Squad 0 | Time de pesquisa e preparação (ativo agora) |
| Squad 1 | Time que construirá o produto OpenClow (futuro) |
| Program Lead | Humano responsável pelo programa |
| Intake Package | Pacote completo que Squad 0 entrega para Squad 1 |
| Snapshot | Captura do estado de contexto de uma sessão longa |
