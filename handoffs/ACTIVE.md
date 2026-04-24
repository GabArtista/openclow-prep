# ACTIVE.md — Estado Ativo de Handoff

> **ARQUIVO LIVE** — Atualizado a cada início e fim de sessão.
> Se este arquivo está desatualizado, o programa está em risco.

---

## Estado do Bastão

- **baton:** UNASSIGNED
- **last-updated-by:** codex (TASK-026 concluída / registry-promotion)
- **last-updated-at:** 2026-04-24 11:15 -03
- **last-read-by:** codex
- **last-read-at:** 2026-04-24 12:02 -03

---

## Tasks em Voo

1. Nenhuma task em voo.
2. Próximo passo: `TASK-027` para observabilidade, segurança e rollback operacional.

---

## Última Ação Completada

Conclusão de `TASK-026` com registry, promotion flow e base do meta-squad do MVP.

**Mudanças concluídas nesta sessão:**
- issue `#10` aberta para `TASK-026`
- branch `task/10-registry-promotion` criada a partir de `origin/main`
- `decisions/ADR-0007-registry-promotion-approval-flow.md` criado para formalizar promotion request + approval explícitos
- `product/packages/registry/src/service.js` atualizado para CRUD, promotion requests, approvals e rollback
- `product/apps/api/src/server.js` atualizado com endpoints de capability/promotion e approval
- `product/packages/shared/contracts/v1/promotion.schema.json` criado e `openclow-api.yaml` ampliado
- `product/packages/shared/src/seeds.js` atualizado com a capability interna `meta-squad`
- `product/packages/runtime/src/persistence.js` atualizado com `promotions: []`
- smoke test executado: capability `content-eval-suite` criada como `draft`, promovida para `staging`, aprovada, revertida para `draft` e trilha persistida com `promotions` e `approvals`

---

## Próxima Ação Recomendada

1. Implementar `TASK-027` para observabilidade, segurança e rollback operacional
2. Manter a raiz estável para não quebrar o modo atual de operação da Doze
3. Só depois avançar para integrações externas reais e hardening de produção

**Papéis recomendados para a próxima sessão:** `Program Architect`, `Registry Analyst`, `Security and Agency Boundaries Analyst`

---

## Bloqueadores

NENHUM.

---

## Snapshot de Contexto

`handoffs/snapshots/2026-04-24-codex-registry-promotion.md`

---

## Notas para o Próximo Agente

O repositório agora tem duas camadas ativas e coerentes:

- a raiz continua sendo a base de trabalho atual da Doze com as empresas da 12
- `product/` já possui um core server-first executável para desenvolvimento local
- o benchmark `mkt-ag-dozecrew/opensquad` já influencia seeds, fluxos e checkpoints do workspace `doze`
- o registry agora tem lifecycle formal e approvals explícitos

**O que fazer a seguir:**
- portar as capacidades day-1 da Doze para o runtime persistente
- adicionar tool bindings e artefatos por integração
- deixar o caminho pronto para o registry e promotion flow da próxima task

**Próximo agente recomendado:** `Durable Runtime Analyst` com apoio de `Program Architect`
