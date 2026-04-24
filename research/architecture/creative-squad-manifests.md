<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# Creative Squad Manifests

> **Status:** TASK-038 / manifest baseline
> **Goal:** definir os manifests iniciais de squads, skills e tools especializados para o sistema criativo

## Intent

Este documento fixa o recorte inicial de `squads`, `skills` e `tools` que devem existir no OpenClow para desenvolver o sistema criativo de forma progressiva.

O foco é o primeiro corte implementável, não a cobertura completa do roadmap.

## Initial Squads

### `creative-control`

**Role**
- orquestra o workflow
- resolve contexto
- decide o fluxo
- consolida approvals

**Required capabilities**
- `brand-context-orchestrator`
- `creative-director`
- `approval-gatekeeper`

**Environment**
- `local-dev`
- `staging`

**Machine profile**
- `balanced`

### `reference-lab`

**Role**
- recebe referências
- pesquisa referências adicionais
- enriquece o estilo

**Required capabilities**
- `reference-fetcher`
- `reference-enricher`
- `style-signal-extractor`

**Environment**
- `local-dev`
- `staging`

**Machine profile**
- `balanced`

### `creative-qa`

**Role**
- faz QA de marca e de entrega
- gera score e motivos de rejeição

**Required capabilities**
- `brand-qa`
- `delivery-qa`

**Environment**
- `local-dev`
- `staging`

**Machine profile**
- `cpu-safe`

### `creative-image`

**Role**
- compõe imagem estática, carrossel e stories estáticos

**Required capabilities**
- `paperclip-composer`
- `asset-strategist`
- `preview-extractor`

**Environment**
- `local-dev`
- `staging`

**Machine profile**
- `balanced`

### `creative-video`

**Role**
- compõe vídeo vertical curto

**Required capabilities**
- `frame-planner`
- `motion-editor`
- `vfx-finisher`
- `ffmpeg-render`

**Environment**
- `local-dev`
- `staging`

**Machine profile**
- `balanced`

### `publishing-control`

**Role**
- empacota para publicação ou agendamento
- roda somente após gate

**Required capabilities**
- `publish-dry-run`
- `publication-gatekeeper`

**Environment**
- `staging`
- `production`

**Machine profile**
- `cpu-safe`

## Initial Skill/Tool Set

### Core control
- `brand-context-orchestrator`
- `creative-director`
- `approval-gatekeeper`

### References
- `reference-fetcher`
- `reference-enricher`
- `style-signal-extractor`

### Composition
- `paperclip-composer`
- `asset-strategist`
- `frame-planner`

### Render and finishing
- `motion-editor`
- `vfx-finisher`
- `ffmpeg-render`
- `preview-extractor`

### QA
- `brand-qa`
- `delivery-qa`

### Publishing
- `publish-dry-run`
- `publication-gatekeeper`

## First Product Cut

### What should be seeded now

- creative capabilities in `product/packages/shared/src/seeds.js`
- creative skill catalog entries in `product/packages/skills/src/catalog.js`
- public schemas updated in `product/packages/shared/contracts/v1/`

### What should be implemented next

1. `creative-control` seed
2. `reference-lab` seed
3. `creative-qa` seed
4. endpoint/document contract alignment

### What stays for the next cut

1. full `creative-image` execution
2. full `creative-video` execution
3. publishing integration beyond dry-run
4. server deployment path

## Production Boundary

Mesmo com esses manifests prontos, o sistema ainda não está pronto para subir direto no servidor de produção.

Antes disso ainda faltam:
- staging comprovado
- política de segredos do serviço
- rollout/rollback do serviço criativo
- validação dos perfis de máquina no ambiente-alvo
