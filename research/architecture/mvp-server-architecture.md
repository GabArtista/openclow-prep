# MVP Server Architecture — OpenClow

> **Status:** Post-TASK-033 / MVP baseline established
> **Updated:** 2026-04-24
> **Reference host:** `root@78.109.16.236`

## Objective

Definir a arquitetura técnica mínima para um MVP server-first do OpenClow que seja utilizável pela Doze desde o day-1 e que já inclua:

- squads executáveis com checkpoints humanos
- integrações reais da Doze
- memória e artefatos persistidos
- dashboard de execução
- meta-squad interno para criar e evoluir capacidades

## Core Architectural Principle

O sistema deve separar quatro camadas:

1. **Control plane**
   - recebe pedidos
   - valida permissões
   - agenda runs e steps
   - aplica checkpoints
   - promove ou bloqueia capacidades

2. **Execution runtime**
   - executa agentes, steps e tools
   - roteia requests para modelos e integrações
   - isola jobs e limita blast radius

3. **State and artifact layer**
   - guarda estado do run, memória, outputs, logs e histórico

4. **Presentation layer**
   - dashboard, aprovações, inspeção de outputs e edição assistida

## Proposed Service Topology

### 1. `openclow-api`

Serviço HTTP principal.

Responsabilidades:
- autenticação e autorização
- CRUD de `skills`, `squads`, `pipelines`, `tools`
- criação e start de runs
- checkpoints e aprovações
- leitura de histórico e outputs

Persistência principal:
- `Postgres`

### 2. `openclow-orchestrator`

Serviço responsável por interpretar o pipeline e decidir o próximo step.

Responsabilidades:
- ler definição versionada do squad/pipeline
- montar contexto do run
- despachar steps para workers
- pausar em checkpoints
- retomar runs

Dependências:
- `Postgres`
- `Redis`

### 3. `openclow-worker`

Pool de workers para execução.

Tipos de worker no MVP:
- `inline-worker`
- `subagent-worker`
- `tool-worker`

Responsabilidades:
- executar prompts/steps
- chamar model gateway
- acionar skills/tools
- salvar outputs

### 4. `openclow-model-gateway`

Camada de acesso aos modelos.

No day-1:
- usar o `Ollama` já ativo no servidor

Responsabilidades:
- mapear `model_tier`
- impor limites de concorrência
- centralizar timeouts e retries
- expor observabilidade por modelo

### 5. `openclow-skill-runner`

Camada de execução de skills e tools.

Responsabilidades:
- executar adaptadores de integração
- aplicar allowlist de tools por capability
- separar `script`, `mcp` e `hybrid`
- registrar input, output, erro e duração

### 6. `openclow-dashboard`

Interface web para o usuário.

Responsabilidades:
- listar squads
- criar/editar capacidades
- iniciar runs
- mostrar progresso por step/agent
- aprovar ou rejeitar checkpoints
- visualizar outputs e histórico

### 7. `openclow-registry`

Pode nascer como módulo lógico, não necessariamente serviço separado.

Responsabilidades:
- versionar `skills`, `squads`, `pipelines` e `tools`
- manter estados `draft`, `staging`, `active`, `retired`
- registrar promotion/rollback
- integrar com o meta-squad

## Implementation Workspace Mapping

O bootstrap do monorepo separado deve refletir essa topologia diretamente em `product/`:

- `product/apps/api` → `openclow-api`
- `product/apps/dashboard` → `openclow-dashboard`
- `product/apps/worker` → `openclow-worker`
- `product/packages/orchestrator` → interpretação de pipeline, scheduling e retomada
- `product/packages/registry` → lifecycle de capabilities e promotion
- `product/packages/runtime` → bindings com `Ollama`, filas, locks e artefatos
- `product/packages/skills` → catálogo e execução de skills/tools
- `product/packages/shared` → contratos públicos, tipos compartilhados e convenções transversais
- `product/infra/k8s` → manifests e overlays do ambiente alvo
- `product/tests/e2e` → fluxos staging-first de homologação

## Data and Storage Model

### Postgres

Fonte de verdade operacional para:
- squads
- pipelines
- agents
- skills registry metadata
- runs
- steps
- checkpoints
- approvals
- audit trail

### Redis

Coordenação efêmera para:
- filas
- locks de execução
- eventos de progresso
- scheduling de jobs

### MinIO

Armazenamento de artefatos para:
- outputs grandes
- imagens
- assets
- relatórios
- snapshots exportáveis

### Filesystem / Git-backed source

Usado para:
- definições versionadas de capacidades
- templates
- prompts base
- assets de referência

No MVP, a recomendação é manter:
- **Git** como source of truth das definições
- **Postgres** como source of truth do runtime

## Security Boundaries

### Mandatory

- segredos fora do repositório
- tools com allowlist explícita por capability
- `draft` e `staging` antes de `active`
- checkpoints humanos para publicação, promoção e ações destrutivas
- logs e audit trail por execução

### Explicitly Not Allowed

- autopublicação de capability nova
- dependência exclusiva da IDE para enforcement
- skill com shell irrestrito por padrão
- segredos persistidos em outputs

## MVP baseline functional coverage

O MVP deve suportar no mínimo:

- um squad equivalente ao `marketing-dozecrew`
- um squad equivalente ao `inteligencia-dozecrew`
- memória por squad
- checkpoints formais com rejeição/retrabalho
- integrações day-1 da Doze
- dashboard operacional
- meta-squad para definição e evolução de capacidades

## What Is Intentionally Deferred

- serving multimodal pesado local
- vídeo intensivo no servidor sem aceleração adequada
- multi-tenant externo
- autonomia sem aprovação
- marketplace público de capacidades

## Recommended k3s Layout

### Namespace `openclow-system`

- `openclow-api`
- `openclow-orchestrator`
- `openclow-worker`
- `openclow-dashboard`
- `openclow-postgres` (ou serviço dedicado existente, se isolado)
- `openclow-redis`

### Shared platform services already present

- `monitoring`
- `storage`
- `ingress`

## Acceptance for This Architecture

Esta arquitetura é aceitável para o MVP se:

- suportar o recorte day-1 da Doze
- permitir enforcement próprio de checkpoints e permissões
- aproveitar o servidor atual sem exigir GPU
- permitir evolução controlada do sistema via meta-squad
