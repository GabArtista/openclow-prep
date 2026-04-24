# MVP Execution Plan — OpenClow

> **Status:** Draft for staged rollout in `product/`
> **Updated:** 2026-04-23

## Purpose

Quebrar o MVP do OpenClow em uma sequência de auditoria, bootstrap, build e rollout segura, respeitando:

- produção real da Doze
- integrações já existentes
- workspace isolado em `product/`
- necessidade de staging-first antes de qualquer validação controlada em produção

## Preconditions

O build do produto **não deve começar** enquanto:

1. os ADRs obrigatórios não estiverem definidos
2. o espaço de implementação do produto não estiver explicitamente decidido
3. a política de segredos e fronteiras de produção não estiver fechada
4. a matriz de portabilidade do `opensquad` não estiver explícita

## Execution Sequence

### Fase A — Auditoria Comparativa do `opensquad`

Objetivo:
- fechar benchmark funcional e matriz de portabilidade

Outputs:
- `research/ecosystem-fit/opensquad-portability-matrix.md`
- recorte day-1 confirmado para marketing, inteligência e integrações reais da Doze

### Fase B — Governança do `openclow-prep`

Objetivo:
- liberar implementação apenas em `product/`

Outputs:
- ADR de fronteira do workspace
- README, AGENTS, POLICY, CHARTER, WORKPLAN e workboard atualizados
- política explícita de staging-first, segredos fora do repo e sem produção por default

### Fase C — Bootstrap do Monorepo de Produto

Objetivo:
- criar a espinha dorsal do workspace `product/`

Escopo:
- `product/apps/api`
- `product/apps/dashboard`
- `product/apps/worker`
- `product/packages/orchestrator`
- `product/packages/registry`
- `product/packages/runtime`
- `product/packages/skills`
- `product/packages/shared`
- `product/infra/k8s`
- `product/tests/e2e`
- contratos públicos mínimos versionados

### Fase D — Core Server-First

Objetivo:
- implementar o core do produto

Escopo:
- autenticação inicial
- CRUD de capabilities
- runs, checkpoints e approvals
- view operacional de squads, steps, outputs e histórico

### Fase E — Runtime e Persistência

Objetivo:
- tornar o sistema executável no ambiente atual

Escopo:
- `Ollama` como backend inicial
- tiers `fast` e `powerful`
- `Postgres`, `Redis` e `MinIO`
- scheduling, retry, restart e checkpointing

### Fase F — Portabilidade Day-1 da Doze

Objetivo:
- portar apenas o que já prova valor operacional

Escopo:
- squad equivalente ao `marketing-dozecrew`
- squad equivalente ao `inteligencia-dozecrew`
- integrações `GA4`, `WooCommerce`, `Meta Insights`, `Hotjar`, `Apify`, `Canva`, `Instagram Publisher`
- `Blotato` apenas se permanecer estável

### Fase G — Registry, Promotion e Meta-Squad

Objetivo:
- permitir autoevolução controlada

Escopo:
- lifecycle `draft/staging/active/retired`
- criação e edição de `skills`, `squads`, `pipelines`, `tools`
- validação estática
- eval mínimo
- aprovação humana obrigatória

### Fase H — Observabilidade, Segurança e Hardening

Objetivo:
- tornar o sistema auditável e recuperável

Escopo:
- logs estruturados
- tracing básico
- alertas mínimos
- hardening de segredos
- rollback de capability
- enforcement de allowlist e bloqueio de ações externas sem checkpoint

### Fase I — Testes E2E em Staging

Objetivo:
- validar o MVP completo antes de qualquer toque em produção

Escopo:
- runs equivalentes aos squads de marketing e inteligência
- aprovação/rejeição de checkpoints
- promoção até `staging`
- validação de memória, outputs e histórico

### Fase J — Validações Controladas em Produção

Objetivo:
- testar somente o mínimo necessário após staging verde

Escopo:
- leitura/consulta e dry-run primeiro
- uma integração externa de baixo risco por vez
- qualquer ação com potencial de afetar `shop.dozecrew.com` apenas com evidência e aprovação explícita

## Build Safety Rules

- não tocar produção por default
- não usar segredos de produção em `draft`
- usar staging/dry-run para integrações sempre que possível
- toda ação externa relevante exige checkpoint humano
- tudo que afetar `shop.dozecrew.com` deve ser evidenciado e aprovado antes

## Immediate Next Action

A próxima ação correta, após concluir as Fases A-C, é:

1. implementar o core server-first em `product/`
2. ligar `Ollama`, `Postgres`, `Redis` e `MinIO` no fluxo mínimo
3. só então iniciar a portabilidade day-1 e os testes E2E
