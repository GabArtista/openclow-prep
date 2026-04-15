# ROLES.md — Papéis do Squad 0

> **Nota:** Estes são papéis funcionais, não pessoas físicas.
> Um único agente IA pode assumir múltiplos papéis em uma sessão.
> Declare seu papel ativo em `handoffs/ACTIVE.md` ao iniciar.

---

## Program Lead

**Responsabilidades:**
- Aprovar decisões que afetam o escopo do programa
- Revisar e assinar o `EXIT_CHECKLIST.md`
- Resolver conflitos de bastão entre agentes
- Aprovar o handoff final para o Squad 1
- Priorizar o backlog quando há empate de prioridade

**Autoridade:** Decisão final em questões de escopo, timeline e handoff.

**Quem pode exercer:** Apenas o humano responsável pelo programa (não delegável a agente IA).

---

## Research Agent

**Responsabilidades:**
- Pesquisar o domínio, mercado e usuários do OpenClow
- Analisar competidores e documentar findings
- Coletar evidências externas (usando `templates/EVIDENCE.md`)
- Produzir documentos em `research/`
- Manter referências a fontes externas para rastreabilidade

**Deliverables principais:**
- `research/product-vision.md`
- `research/domain-research.md`
- `research/competitive-analysis.md`
- `research/validation-evidence.md`
- `research/glossary.md`

**Pode ser exercido por:** Qualquer agente IA.

---

## Architecture Agent

**Responsabilidades:**
- Avaliar opções de stack tecnológico
- Propor a arquitetura de alto nível
- Criar ADRs para todas as decisões arquiteturais em `decisions/`
- Propor o modelo de dados conceitual
- Mapear integrações e dependências externas
- Validar a arquitetura contra os NFRs

**Deliverables principais:**
- `research/tech-evaluation.md`
- `research/architecture-overview.md`
- `research/data-model.md`
- `research/integrations.md`
- `research/architecture-validation.md`
- ADRs em `decisions/`

**Pode ser exercido por:** Qualquer agente IA.

---

## Documentation Agent

**Responsabilidades:**
- Manter a qualidade e legibilidade de todos os documentos
- Garantir que documentos são autocontidos e compreensíveis por outra IA
- Verificar que templates estão sendo usados corretamente
- Preencher e manter `squads/squad-1/INTAKE_PACKAGE.md`
- Criar e manter o glossário

**Deliverables principais:**
- `squads/squad-1/INTAKE_PACKAGE.md` (completo)
- `research/glossary.md`
- Revisão de qualidade de todos os outros documentos

**Pode ser exercido por:** Qualquer agente IA.

---

## Backlog Manager

**Responsabilidades:**
- Manter `workboard/BACKLOG.md` atualizado e priorizado
- Criar issues no GitHub para cada task do backlog
- Garantir que cada issue tem label e template corretos
- Monitorar issues abertas com labels `blocking-exit`, `question`, `handoff-conflict`
- Mover tasks entre backlog → in_progress → done

**Pode ser exercido por:** Qualquer agente IA. Geralmente exercido junto com outro papel.

---

## Como Declarar seu Papel

Ao iniciar uma sessão, atualize o campo `Notas para o Próximo Agente` em `handoffs/ACTIVE.md` com:

```
Papel ativo nesta sessão: [Research Agent | Architecture Agent | Documentation Agent | Backlog Manager]
Task sendo trabalhada: TASK-XXX — [título]
```

Isso permite que o próximo agente entenda o contexto sem ler toda a sessão anterior.
