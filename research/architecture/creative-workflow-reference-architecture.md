<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# Creative Workflow Reference Architecture

> **Status:** TASK-037 / draft architecture baseline
> **Goal:** definir a arquitetura de referência para workflows criativos com `OpenClow + Paperclip`, em cima do baseline já provado pela Doze e sem tratar produção como ambiente default

## Executive Summary

O OpenClow já tem base suficiente para começar a desenvolver a camada de workflows criativos.
O que **não** está fechado para produção é a parte de hospedagem, segredos, staging e rollout operacional no servidor final.

Portanto:
- **sim**, temos documentação suficiente para começar a desenvolver `squads`, `skills` e `tools`
- **não**, ainda não temos documentação suficiente para assumir deploy direto no servidor de produção

O caminho correto é:
1. desenhar a arquitetura dos workflows criativos
2. implementar em `product/`
3. validar em ambiente local/staging
4. só depois conectar ao servidor de produção com rollout controlado

## What This Architecture Must Solve

O sistema novo precisa resolver quatro falhas que o benchmark `opensquad` já deixou claras:

1. boa intenção de pipeline sem cumprimento consistente dos contratos de execução
2. vídeo forte no papel e fraco na renderização real
3. QA criativo genérico demais
4. contexto de empresa disperso, com pouca precedência entre marketing, BI e gestão

## Non-Negotiable Boundaries

1. O servidor de produção não é ambiente default de desenvolvimento nem de homologação.
2. Todo fluxo criativo nasce com `draft` e `staging` antes de qualquer passo ligado a produção.
3. Segredos e credenciais nunca entram no repositório.
4. O contexto operacional real da Doze continua vindo da raiz do repositório e precisa ser preservado.
5. O sistema criativo deve funcionar em máquina fraca, média e forte, com degradação controlada.

## Reference Model

### Layer 1 — Context Control

Responsável por consolidar e resolver conflitos entre:
- `brand profile`
- `operational truth`
- `campaign context`
- `creative playbook`
- `channel constraints`

#### Context precedence

1. `operational truth`
   Ex.: estoque, bloqueios, risco, janela de publicação, integrações quebradas
2. `campaign context`
   Ex.: objetivo atual, peça da campanha, prioridade da semana
3. `brand profile`
   Ex.: tom, estética, posicionamento
4. `creative playbook`
   Ex.: padrões de formato, QA, anti-patterns

Isso impede o problema de um workflow criativo vender algo que BI/Gestão já sabe que não pode ser empurrado agora.

### Layer 2 — Creative Orchestration

Responsável por decompor o trabalho em agentes especializados.

### Layer 3 — Composition and Rendering

Responsável por montagem, motion, composição, export, previews e artefatos.

Aqui `Paperclip` entra como camada declarativa de composição.
`FFmpeg` entra como baseline técnico de mídia.
Assistências generativas entram como recurso opcional e controlado.

### Layer 4 — QA and Release Control

Responsável por:
- QA de identidade
- QA técnico
- approvals humanas
- logs e motivos de rejeição
- retry guidance
- publication gate

## Core Squads

### 1. `creative-control`

Squad principal de orquestração de peças criativas.

**Responsabilidade**
- receber briefing
- consolidar contexto
- decidir fluxo
- abrir checkpoints
- coordenar retries

**Outputs**
- `creative_run.json`
- `creative_intent.json`
- `approval_packet.json`

### 2. `reference-lab`

Squad especializado em referências.

**Responsabilidade**
- ler referências explícitas do usuário
- buscar referências adicionais
- enriquecer linguagem visual
- traduzir estética em constraints operacionais

**Outputs**
- `reference_pack.json`
- `style_signals.json`
- `visual_anti_patterns.json`

### 3. `creative-image`

Squad especializado em imagem estática e variações de criativo.

**Responsabilidade**
- layouts
- thumbnails
- posts
- stories estáticos
- carrosséis

**Outputs**
- `image_plan.json`
- `asset_manifest.json`
- previews por peça

### 4. `creative-video`

Squad especializado em vídeo vertical curto.

**Responsabilidade**
- shot plan
- timeline
- motion
- VFX
- preview por shot

**Outputs**
- `shot_plan.json`
- `edit_decision_list.json`
- `vfx_plan.json`
- `preview_manifest.json`
- artefato final renderizado

### 5. `creative-qa`

Squad de revisão especializada.

**Responsabilidade**
- validar identidade de marca
- validar legibilidade
- validar pacing
- validar qualidade de export
- bloquear peça ruim

**Outputs**
- `qa_report_brand.json`
- `qa_report_delivery.json`
- `retry_guidance.json`

### 6. `publishing-control`

Squad que cuida de publicação e agendamento, mas só após gate.

**Responsabilidade**
- transformar approved outputs em publicação/agendamento
- respeitar ambiente, canal, token e janela operacional

**Outputs**
- `publication_plan.json`
- `publish_receipt.json`

## Core Agent Roles

### `brand-context-orchestrator`
- resolve contexto
- puxa dados de squads existentes
- valida precedência das fontes

### `reference-hunter`
- coleta referência explícita e implícita

### `reference-enricher`
- traduz referência em estilo, pacing, framing, texture, type treatment

### `creative-director`
- cria a intenção criativa e a narrativa da peça

### `frame-planner`
- quebra o vídeo em shots e frames aprováveis

### `asset-strategist`
- decide origem dos assets: real, tratado, composto ou gerado

### `motion-editor`
- monta timeline, cortes, câmera virtual, overlays e sync

### `vfx-finisher`
- aplica grade, masks, distortion control, text treatment e acabamento

### `brand-qa`
- julga se a peça parece excelente para aquela empresa específica

### `delivery-qa`
- julga export, pacing, readability, timing e readiness de publicação

## Skill Families

### `context-skills`
- resolver contexto da empresa
- ler memória consolidada
- consultar BI/gestão/marketing

### `reference-skills`
- ingestão de links
- captura de metadata
- classificação estética
- enriquecimento de estilo

### `planning-skills`
- creative treatment
- shot planning
- asset planning
- QA planning

### `composition-skills`
- paperclip composition
- typography layout
- image compositing
- timeline assembly

### `media-skills`
- ffmpeg editing
- preview extraction
- audio timing
- encode/export

### `assist-skills`
- background cleanup
- upscale
- mask assist
- optional generation

### `qa-skills`
- brand scoring
- technical scoring
- diff review
- regression validation

### `publishing-skills`
- publish dry-run
- schedule dry-run
- channel packaging

## Tool Registry Model

Cada tool precisa ser classificada por:
- `kind`
- `risk_level`
- `machine_profile`
- `environment_scope`
- `requires_checkpoint`
- `supports_dry_run`
- `allowed_channels`

### Minimum tool classes

- `context-reader`
- `reference-fetcher`
- `timeline-composer`
- `render-engine`
- `qa-inspector`
- `publisher`

## Agent Contracts

O workflow criativo não deve depender de texto livre entre agentes.
Contratos mínimos:

- `brand_context.json`
- `creative_intent.json`
- `reference_pack.json`
- `shot_plan.json`
- `asset_plan.json`
- `edit_decision_list.json`
- `vfx_plan.json`
- `qa_report_brand.json`
- `qa_report_delivery.json`
- `approval_packet.json`

## Paperclip’s Role

`Paperclip` não deve ser tratado como “a IA do vídeo”.
O papel correto dele é:
- composição declarativa
- estrutura de timeline visual
- regras de tipografia e layout
- overlays e variações consistentes
- previsibilidade de render

Em resumo:
- `OpenClow` decide e coordena
- `Paperclip` compõe
- `FFmpeg` renderiza e transforma
- tools auxiliares fazem tratamento pontual

## Machine Profiles

### `cpu-safe`

Objetivo: máquina fraca, saída previsível, sem depender de geração pesada.

Stack base:
- `FFmpeg`
- `Paperclip`
- análise leve de áudio/imagem

Permitido:
- composição
- text treatment
- cortes
- overlays
- previews

Evitar:
- geração pesada
- pipelines multimodais caras

### `balanced`

Objetivo: máquina média, composição forte com análise visual melhor.

Stack base:
- `FFmpeg`
- `Paperclip`
- VLM/local assist quando fizer sentido

Permitido:
- classificação visual
- QA mais rico
- pequenos assists

### `quality-first`

Objetivo: máquina forte ou servidor dedicado de staging.

Stack base:
- `FFmpeg`
- `Paperclip`
- assistências generativas open-source controladas

Permitido:
- composição com assists
- cleanup avançado
- geração pontual
- VFX mais pesado

## Production Server Boundary

O servidor de produção que já existe deve ser tratado, nesta fase, como **destino futuro de hospedagem**, não como ambiente de teste.

Antes de qualquer deploy real, ainda faltam pelo menos:
- desenho explícito de staging para a stack criativa
- política de segredos para runtime e publicação
- definição de volumes/artefatos no servidor
- rollback operacional do serviço criativo
- validação de carga e previsibilidade de render

Portanto, a arquitetura desta task autoriza:
- desenvolvimento
- modelagem
- implementação em `product/`
- validação local
- preparação de staging

Ela **não** autoriza ainda:
- subir serviço diretamente em produção
- ligar publicação real por default
- plugar credenciais do servidor final sem checklist específico

## Recommended Build Sequence

1. modelar contracts dos agentes criativos
2. modelar context control com precedência forte
3. implementar `creative-control` + `reference-lab`
4. implementar pipeline `creative-image`
5. implementar pipeline `creative-video`
6. implementar `creative-qa`
7. conectar `publishing-control` em dry-run/staging
8. preparar a trilha de deploy para staging antes de produção

## Decision

O programa está pronto para começar a desenvolver o sistema criativo.
O ponto de corte seguro é:

- começar agora o desenvolvimento dos `squads`, `skills` e `tools`
- manter o deploy no servidor de produção fora do caminho crítico imediato
- usar `TASK-038+` para transformar esta arquitetura em contracts e backlog implementável
