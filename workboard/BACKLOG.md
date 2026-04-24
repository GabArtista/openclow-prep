# BACKLOG.md — Backlog do Programa

> **Convenções:**
> - **Prioridade:** P0 (crítico/bloqueante) | P1 (alta) | P2 (normal)
> - **Tamanho:** S (< 2h) | M (2-8h) | L (1-3 dias) | XL (> 3 dias)
> - **Status:** `backlog` | `in-progress` | `done` | `blocked`
> - Ao pegar uma task: mover para `workboard/IN_PROGRESS.md` e criar issue no GitHub

---

## Etapa 1 — Squad 0

### P0 — Crítico (Caminho Crítico)

### P1 — Alta Prioridade

### TASK-042 | Implementar `publishing-control` como empacotamento dry-run do fluxo criativo
- **Tipo:** research
- **Prioridade:** P1
- **Tamanho:** M
- **Status:** `backlog`
- **Objetivo:** conectar `creative-image` e `creative-video` a um fluxo de empacotamento dry-run com receipts persistidos, sem publicação real por default.
- **Dependências:** TASK-041 concluída
- **Output esperado:**
  - fluxo `publishing-control` implementado no `product/`
  - artifacts persistidos de `publication_plan` e `publish_receipt`
  - regressão cobrindo o handoff criativo para publicação dry-run
  - documentação local/staging do empacotamento de entrega

## Backlog do Squad 1 (a ser preenchido pelo Squad 0 via TASK-015)
