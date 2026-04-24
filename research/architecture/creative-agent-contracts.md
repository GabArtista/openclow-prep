<!-- TEMPLATE: EVIDENCE | version: 1.0 | do not remove this line -->

# Creative Agent Contracts

> **Status:** TASK-038 / implementable contract baseline
> **Goal:** transformar a arquitetura criativa em contratos públicos mínimos e coerentes com a superfície atual do OpenClow

## Intent

Este documento define o contrato mínimo entre os agentes do sistema criativo.
O objetivo não é detalhar toda a implementação futura, e sim fixar o que precisa existir para que o `product/` possa começar a executar o primeiro corte do workflow criativo sem quebrar os contracts já publicados.

## Contract Set

### `brand_context.json`

Responsável por consolidar:
- `brand profile`
- `operational truth`
- `campaign context`
- `creative playbook`

Campos mínimos:
- `workspace_slug`
- `brand_slug`
- `campaign_slug`
- `channel`
- `context_precedence`
- `constraints`
- `allowed_tools`

### `reference_pack.json`

Responsável por reunir:
- referências explícitas do usuário
- referências coletadas automaticamente
- sinais de estilo
- anti-patterns

Campos mínimos:
- `reference_urls`
- `reference_assets`
- `style_signals`
- `visual_anti_patterns`
- `confidence`

### `creative_intent.json`

Responsável por traduzir o objetivo criativo em direção executável.

Campos mínimos:
- `intent_kind`
- `objective`
- `audience`
- `channel`
- `format`
- `narrative_arc`
- `quality_bar`
- `approval_requirements`

### `asset_plan.json`

Responsável por decidir a origem dos assets.

Campos mínimos:
- `asset_sources`
- `reuse_existing_assets`
- `needs_generation`
- `needs_compositing`
- `needs_cleanup`
- `machine_profile`

### `shot_plan.json`

Responsável por quebrar o vídeo em shots aprováveis.

Campos mínimos:
- `shots`
- `timing_strategy`
- `camera_language`
- `type_treatment`
- `qa_gate`

### `edit_decision_list.json`

Responsável por representar a timeline executável.

Campos mínimos:
- `clips`
- `transitions`
- `sync_points`
- `preview_points`

### `vfx_plan.json`

Responsável por definir acabamento e intensidade.

Campos mínimos:
- `grade`
- `overlays`
- `distortion_controls`
- `masking`
- `text_effects`
- `effect_intensity`

### `qa_report_brand.json`

Responsável por responder:
- a peça parece excelente para esta empresa?

Campos mínimos:
- `status`
- `score`
- `issues`
- `reasons_for_reject`
- `retry_guidance`

### `qa_report_delivery.json`

Responsável por responder:
- a peça está pronta para entrega/publicação?

Campos mínimos:
- `status`
- `technical_score`
- `export_readiness`
- `issues`
- `retry_guidance`

### `approval_packet.json`

Responsável por consolidar o que o humano precisa aprovar.

Campos mínimos:
- `target_kind`
- `run_id`
- `artifacts`
- `brand_qa_status`
- `delivery_qa_status`
- `publication_risk_level`

## Contract Placement in Public Schemas

Os contracts acima não precisam virar endpoints dedicados neste corte.
Eles precisam ser suportados pelos contratos públicos existentes através destes campos:

- `Capability`
  - `system_family`
  - `machine_profile`
  - `environment_scope`
  - `supports_dry_run`
  - `requires_checkpoint`
  - `artifact_contracts`

- `Squad`
  - `system_family`
  - `machine_profile`
  - `environment_scope`
  - `context_precedence`
  - `qa_capability_ids`

- `Pipeline`
  - `name`
  - `workspace_slug`
  - `machine_profile`
  - `environment_scope`

- `Step`
  - `label`
  - `tool_slugs`
  - `optional_tool_slugs`
  - `input_contracts`
  - `output_contracts`
  - `machine_profile`
  - `environment_scope`
  - `qa_gate`
  - `risk_level`

- `Run`
  - `intent_kind`
  - `machine_profile`
  - `environment_scope`
  - `requested_capability_ids`

## First Implementable Cut

O primeiro corte implementável não deve começar pelo pipeline completo de vídeo.

Ele deve começar por:
1. `creative-control`
2. `reference-lab`
3. `creative-qa`

Com isso o produto já consegue:
- consolidar contexto
- ingerir e enriquecer referências
- produzir e validar `creative_intent.json`
- abrir approvals fortes antes de renderização final

`creative-image` e `creative-video` entram no corte seguinte, já com contracts estáveis.
