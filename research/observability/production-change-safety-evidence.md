<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# EVD-0033: Change Safety Evidence for Controlled Production Rollout

## Metadados

| Campo | Valor |
|---|---|
| **ID** | EVD-0033 |
| **Tipo** | validation |
| **Coletado por** | codex |
| **Data de coleta** | 2026-04-24 |
| **Fonte** | `research/observability/staging-rollout-and-rollback-runbook.md`, `research/security/security-and-agency-boundaries.md`, `decisions/ADR-0005-production-safety-and-secrets-boundary.md` |
| **Data de acesso** | 2026-04-24 |
| **Confiança** | high |
| **Task relacionada** | TASK-033 |

## Resumo

Esta evidência consolida a regra operacional de que produção deve começar por leitura e dry-run, nunca por escrita direta. Ela também fixa que segredos permanecem fora do repositório, que ações externas de risco precisam de checkpoint humano e que rollback deve ser rastreável. O objetivo é fornecer uma base de operação segura para o primeiro ciclo controlado de rollout.

## Principais Achados

- A política de segurança já exige que produção, segredos e ações externas sejam tratados com checkpoint explícito.
- O runbook de staging/rollback já define a ordem correta: staging verde, validação, aprovação e só depois possível promoção para `active`.
- O fluxo de produção precisa manter o padrão read-only first e dry-run whenever possible.

## Implicações para o Produto/Arquitetura

O produto não deve ganhar qualquer atalho de autopublicação ou escrita externa implícita nesta fase. A operação segura depende de manter staging como gate obrigatório, de restringir ferramentas write-capable e de registrar cada ação sensível em artefatos auditáveis. Isso confirma que `TASK-033` é uma camada operacional e documental, não uma mudança de comportamento do runtime.

## Justificativa do Nível de Confiança

**Confiança: high**

As fontes já estão no repositório, foram derivadas das decisões e do contrato operacional atual, e se alinham entre si: segurança explícita, rollback rastreável e validação staging-first. Não há dependência de suposições novas para esta task.

## Dados Brutos / Citações Relevantes

> "read-only first"

> "dry-run quando possível"

> "nenhum segredo em repositório, nenhuma ação externa de alto impacto sem checkpoint humano"
