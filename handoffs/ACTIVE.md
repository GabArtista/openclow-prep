# ACTIVE.md — Estado Ativo de Handoff

> **ARQUIVO LIVE** — Atualizado a cada início e fim de sessão.
> Se este arquivo está desatualizado, o programa está em risco.

---

## Estado do Bastão

- **baton:** UNASSIGNED
- **last-updated-by:** codex (TASK-025 concluída / day-1 capabilities)
- **last-updated-at:** 2026-04-24 10:52 -03
- **last-read-by:** codex
- **last-read-at:** 2026-04-24 10:52 -03

---

## Tasks em Voo

1. Nenhuma task em voo.
2. O próximo passo é abrir `TASK-026` para registry/promotion flow ou continuar a camada de runtime persistente, sem tocar o modo operacional atual da Doze.

---

## Última Ação Completada

Conclusão de `TASK-025` com capacidades day-1 da Doze portadas para o runtime persistente do `product/`.

**Mudanças concluídas nesta sessão:**
- issue `#8` aberta para `TASK-025`
- branch `task/8-day1-capabilities` criada
- `product/packages/tools/README.md` criado para documentar as bindings day-1
- `product/packages/tools/src/runner.js` criado com artefatos estruturados para `ga4`, `woocommerce`, `meta-insights`, `hotjar`, `apify`, `canva`, `instagram-publisher` e `blotato`
- `product/packages/shared/src/seeds.js` atualizado com as capacidades e bindings das squads `marketing-dozecrew` e `inteligencia-dozecrew`
- `product/packages/runtime/src/service.js` atualizado para executar tool bindings, respeitar allowlist e adiar `blotato` como opcional
- `product/package.json` atualizado para incluir o novo módulo de tools no check
- smoke test executado: runs frescos de `marketing-dozecrew` e `inteligencia-dozecrew` produziram artefatos estruturados, checkpoints foram aprovados e `blotato` apareceu como `optional_tool_skipped`

---

## Próxima Ação Recomendada

1. Implementar `TASK-026` para registry/promotion flow e estados `draft/staging/active/retired`
2. Manter a raiz estável para não quebrar o modo atual de operação da Doze
3. Só depois avançar para integrações externas reais e hardening de produção

**Papéis recomendados para a próxima sessão:** `Program Architect`, `Registry Analyst`, `Security and Agency Boundaries Analyst`

---

## Bloqueadores

NENHUM.

---

## Snapshot de Contexto

`handoffs/snapshots/2026-04-24-codex-day1-capabilities.md`

---

## Notas para o Próximo Agente

O repositório agora tem duas camadas ativas e coerentes:

- a raiz continua sendo a base de trabalho atual da Doze com as empresas da 12
- `product/` já possui um core server-first executável para desenvolvimento local
- o benchmark `mkt-ag-dozecrew/opensquad` já influencia seeds, fluxos e checkpoints do workspace `doze`
- o próximo salto não é mais scaffold, e sim integração com runtime e persistência reais

**O que fazer a seguir:**
- portar as capacidades day-1 da Doze para o runtime persistente
- adicionar tool bindings e artefatos por integração
- deixar o caminho pronto para o registry e promotion flow da próxima task

**Próximo agente recomendado:** `Durable Runtime Analyst` com apoio de `Program Architect`
