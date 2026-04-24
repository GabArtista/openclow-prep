<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# Security and Agency Boundaries

> **Status:** Post-TASK-033 / MVP baseline established
> **Goal:** impedir que o sistema ultrapasse os limites aprovados de autonomia e acesso

## Core rules

1. Sem segredos no repo.
2. Sem ação externa destrutiva sem checkpoint humano.
3. Sem autopublicação de capability.
4. Sem acesso a produção por default.
5. Sem expansão silenciosa de escopo de tool.

## Access model

### Read-only by default

- GA4
- Hotjar
- Meta Insights
- WooCommerce
- web_search
- web_fetch

### Write-capable, checkpoint-gated

- Canva
- Instagram Publisher
- Blotato
- Apify, quando o caso de uso envolver escrita ou publicação

## Boundary model

- `draft` capabilities can only use approved non-prod bindings.
- `staging` capabilities can exercise guarded write paths when explicitly allowed.
- `active` capabilities require promotion approval and auditing.
- `retired` capabilities remain queryable but cannot execute.

## Secrets handling

O local correto para credenciais é fora do repo, com armazenamento controlado pelo ambiente de execução.
O repo pode conter apenas:

- nome da integração
- escopo mínimo
- ambiente permitido
- requisito de checkpoint
- regra de fallback/rollback

## Staging and rollback expectations

- qualquer publicação externa deve passar por checkpoint final
- qualquer integração com risco de alteração externa deve ter fallback documentado
- rollback de capability deve ser rastreável e reversível

## Consequences

- menos autonomia implícita
- mais previsibilidade e auditabilidade
- menor chance de o sistema confundir “capacidade técnica” com “autorização operacional”
