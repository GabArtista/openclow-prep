# IN_PROGRESS.md — Trabalho em Progresso

> **ARQUIVO LIVE** — Atualizado ao iniciar e concluir tasks.
> Uma task existe em apenas um estado: backlog, in-progress, ou done.

---

## Schema de uma Entrada

```
### TASK-XXX | [título]
- **Owner:** [agent-id]
- **Papéis ativos:** [Role A | Role B]
- **Iniciada em:** YYYY-MM-DD
- **Branch:** task/<numero-issue>-<slug>
- **Issue:** #<numero>
- **Estado atual:** [descrição específica do ponto atual na task]
- **Próxima ação:** [ação concreta e específica]
- **Bloqueadores:** [NENHUM | descrição]
```

---

## Em Progresso Agora

### TASK-027 | Instrumentar observabilidade, segurança e rollback operacional
- **Owner:** codex
- **Papéis ativos:** Security and Agency Boundaries Analyst | Program Architect | Registry Analyst
- **Iniciada em:** 2026-04-24
- **Branch:** task/12-observability-security
- **Issue:** #12
- **Estado atual:** baseline de auditoria persistida e endpoint de consulta já validados no API local; capability e promotion events entram na trilha
- **Próxima ação:** cobrir observabilidade de runtime/rollback e endurecer os pontos de enforcement restantes
- **Bloqueadores:** NENHUM
