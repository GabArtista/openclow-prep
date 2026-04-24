import { createId } from "./ids.js";

function createMarketingSteps() {
  return [
    {
      id: "coleta-dados",
      kind: "tool",
      executor: "subagent",
      label: "Coleta e analisa dados de performance",
      tool_slugs: ["ga4", "woocommerce", "hotjar"]
    },
    {
      id: "pesquisa-mercado",
      kind: "tool",
      executor: "subagent",
      label: "Pesquisa mercado e referências",
      tool_slugs: ["apify"]
    },
    {
      id: "aprovar-estrategia",
      kind: "checkpoint",
      executor: "checkpoint",
      label: "Aprovar estratégia semanal",
      requiresCheckpoint: true,
      on_reject: "coleta-dados",
      risk_level: "medium"
    },
    {
      id: "conteudo-semanal",
      kind: "prompt",
      executor: "inline",
      label: "Produz conteúdo semanal"
    },
    {
      id: "design-visual",
      kind: "subagent",
      executor: "subagent",
      label: "Gera design visual para publicação",
      tool_slugs: ["canva"]
    },
    {
      id: "aprovar-publicacao",
      kind: "checkpoint",
      executor: "checkpoint",
      label: "Aprovar publicação externa",
      requiresCheckpoint: true,
      on_reject: "conteudo-semanal",
      risk_level: "high"
    },
    {
      id: "publicacao",
      kind: "tool",
      executor: "tool-runner",
      label: "Publica ou agenda peças aprovadas",
      tool_slugs: ["instagram-publisher"],
      optional_tool_slugs: ["blotato"]
    }
  ];
}

function createIntelligenceSteps() {
  return [
    {
      id: "analise-ecommerce",
      kind: "tool",
      executor: "subagent",
      label: "Cruza WooCommerce, GA4 e Hotjar",
      tool_slugs: ["ga4", "woocommerce", "hotjar"]
    },
    {
      id: "analise-social",
      kind: "tool",
      executor: "subagent",
      label: "Analisa Meta e redes sociais",
      tool_slugs: ["meta-insights", "apify"]
    },
    {
      id: "correlacao",
      kind: "prompt",
      executor: "inline",
      label: "Correlaciona sinais de negócio"
    },
    {
      id: "aprovar-insights",
      kind: "checkpoint",
      executor: "checkpoint",
      label: "Aprovar insights para relatório",
      requiresCheckpoint: true,
      on_reject: "analise-ecommerce",
      risk_level: "medium"
    },
    {
      id: "relatorio",
      kind: "prompt",
      executor: "inline",
      label: "Gera relatório final"
    }
  ];
}

function createCreativeControlSteps() {
  return [
    {
      id: "resolver-contexto",
      kind: "subagent",
      executor: "subagent",
      label: "Resolve contexto de marca, campanha e verdade operacional",
      tool_slugs: ["brand-context-orchestrator"],
      output_contracts: ["brand_context.json"],
      machine_profile: "cpu-safe",
      environment_scope: "local-dev",
      qa_gate: "none",
      risk_level: "low"
    },
    {
      id: "construir-intencao",
      kind: "prompt",
      executor: "inline",
      label: "Consolida intenção criativa e packet de aprovação",
      input_contracts: ["brand_context.json", "reference_pack.json"],
      output_contracts: ["creative_intent.json", "approval_packet.json"],
      machine_profile: "balanced",
      environment_scope: "local-dev",
      qa_gate: "brand",
      risk_level: "medium"
    },
    {
      id: "aprovar-intencao",
      kind: "checkpoint",
      executor: "checkpoint",
      label: "Aprovar intenção criativa antes da composição",
      input_contracts: ["approval_packet.json"],
      requiresCheckpoint: true,
      on_reject: "resolver-contexto",
      machine_profile: "cpu-safe",
      environment_scope: "staging",
      qa_gate: "brand",
      risk_level: "medium"
    }
  ];
}

function createReferenceLabSteps() {
  return [
    {
      id: "ingestao-referencias",
      kind: "tool",
      executor: "subagent",
      label: "Ingesta referências explícitas e assets anexados",
      tool_slugs: ["reference-fetcher"],
      output_contracts: ["reference_pack.json"],
      machine_profile: "cpu-safe",
      environment_scope: "local-dev",
      qa_gate: "none",
      risk_level: "low"
    },
    {
      id: "enriquecimento-estilo",
      kind: "subagent",
      executor: "subagent",
      label: "Enriquece referências em sinais visuais e anti-patterns",
      tool_slugs: ["reference-enricher"],
      input_contracts: ["reference_pack.json"],
      output_contracts: ["style_signals.json", "visual_anti_patterns.json", "reference_pack.json"],
      machine_profile: "balanced",
      environment_scope: "local-dev",
      qa_gate: "brand",
      risk_level: "low"
    }
  ];
}

function createCreativeQaSteps() {
  return [
    {
      id: "qa-identidade",
      kind: "prompt",
      executor: "inline",
      label: "Executa QA de identidade da peça",
      tool_slugs: ["brand-qa"],
      input_contracts: ["creative_intent.json"],
      output_contracts: ["qa_report_brand.json"],
      machine_profile: "cpu-safe",
      environment_scope: "staging",
      qa_gate: "brand",
      risk_level: "medium"
    },
    {
      id: "qa-entrega",
      kind: "prompt",
      executor: "inline",
      label: "Executa QA técnico e readiness de entrega",
      tool_slugs: ["delivery-qa"],
      input_contracts: ["creative_intent.json"],
      output_contracts: ["qa_report_delivery.json"],
      machine_profile: "cpu-safe",
      environment_scope: "staging",
      qa_gate: "delivery",
      risk_level: "medium"
    },
    {
      id: "aprovar-qa",
      kind: "checkpoint",
      executor: "checkpoint",
      label: "Aprovar QA antes da publicação ou render final",
      input_contracts: ["qa_report_brand.json", "qa_report_delivery.json"],
      requiresCheckpoint: true,
      on_reject: "qa-identidade",
      machine_profile: "cpu-safe",
      environment_scope: "staging",
      qa_gate: "brand-and-delivery",
      risk_level: "high"
    }
  ];
}

function createCreativeImageSteps() {
  return [
    {
      id: "planejar-assets",
      kind: "prompt",
      executor: "inline",
      label: "Planeja assets, formatos e densidade do criativo",
      output_contracts: ["asset_plan.json"],
      machine_profile: "cpu-safe",
      environment_scope: "local-dev",
      qa_gate: "brand",
      risk_level: "low"
    },
    {
      id: "compor-layout",
      kind: "tool",
      executor: "tool-runner",
      label: "Compõe o layout declarativo da peça",
      tool_slugs: ["paperclip-composer"],
      input_contracts: ["asset_plan.json", "creative_intent.json", "reference_pack.json"],
      machine_profile: "balanced",
      environment_scope: "staging",
      qa_gate: "brand",
      risk_level: "medium"
    },
    {
      id: "renderizar-previews",
      kind: "tool",
      executor: "tool-runner",
      label: "Renderiza previews e pacote de entrega da peça",
      tool_slugs: ["ffmpeg-render"],
      input_contracts: ["asset_plan.json"],
      machine_profile: "balanced",
      environment_scope: "staging",
      qa_gate: "delivery",
      risk_level: "medium"
    },
    {
      id: "aprovar-render",
      kind: "checkpoint",
      executor: "checkpoint",
      label: "Aprovar render antes do QA final",
      input_contracts: ["preview_manifest.json"],
      requiresCheckpoint: true,
      on_reject: "compor-layout",
      machine_profile: "cpu-safe",
      environment_scope: "staging",
      qa_gate: "brand-and-delivery",
      risk_level: "medium"
    }
  ];
}

function createCreativeVideoSteps() {
  return [
    {
      id: "planejar-frames",
      kind: "prompt",
      executor: "inline",
      label: "Planeja beats, shots e linguagem de VFX do video",
      output_contracts: ["shot_plan.json", "vfx_plan.json"],
      machine_profile: "balanced",
      environment_scope: "local-dev",
      qa_gate: "brand",
      risk_level: "medium"
    },
    {
      id: "compor-storyboard",
      kind: "tool",
      executor: "tool-runner",
      label: "Compõe storyboard vertical e quadros-guia do video",
      tool_slugs: ["paperclip-composer"],
      input_contracts: ["shot_plan.json", "vfx_plan.json", "creative_intent.json", "reference_pack.json"],
      machine_profile: "balanced",
      environment_scope: "staging",
      qa_gate: "brand",
      risk_level: "medium"
    },
    {
      id: "montar-edl",
      kind: "prompt",
      executor: "inline",
      label: "Monta o edit decision list do video curto",
      output_contracts: ["edit_decision_list.json"],
      machine_profile: "balanced",
      environment_scope: "staging",
      qa_gate: "delivery",
      risk_level: "medium"
    },
    {
      id: "renderizar-video",
      kind: "tool",
      executor: "tool-runner",
      label: "Renderiza previews verticais e pacote de entrega do video",
      tool_slugs: ["ffmpeg-render"],
      input_contracts: ["shot_plan.json", "edit_decision_list.json", "vfx_plan.json"],
      machine_profile: "balanced",
      environment_scope: "staging",
      qa_gate: "delivery",
      risk_level: "medium"
    },
    {
      id: "aprovar-previas-video",
      kind: "checkpoint",
      executor: "checkpoint",
      label: "Aprovar previews do video antes do QA final",
      input_contracts: ["preview_manifest.json"],
      requiresCheckpoint: true,
      on_reject: "compor-storyboard",
      machine_profile: "cpu-safe",
      environment_scope: "staging",
      qa_gate: "brand-and-delivery",
      risk_level: "high"
    }
  ];
}

export function createSeeds() {
  const capabilities = [
    {
      id: createId(),
      kind: "tool",
      slug: "ga4",
      name: "GA4",
      workspace_slug: "doze",
      status: "staging",
      version: "1.0.0",
      risk_level: "medium",
      allowed_tools: ["ga4"],
      summary: "Analytics do site da Doze"
    },
    {
      id: createId(),
      kind: "tool",
      slug: "woocommerce",
      name: "WooCommerce",
      workspace_slug: "doze",
      status: "staging",
      version: "1.0.0",
      risk_level: "high",
      allowed_tools: ["woocommerce"],
      summary: "Catálogo, pedidos e vendas"
    },
    {
      id: createId(),
      kind: "tool",
      slug: "meta-insights",
      name: "Meta Insights",
      workspace_slug: "doze",
      status: "staging",
      version: "1.0.0",
      risk_level: "high",
      allowed_tools: ["meta-insights"],
      summary: "Dados sociais e de mídia paga"
    },
    {
      id: createId(),
      kind: "tool",
      slug: "hotjar",
      name: "Hotjar",
      workspace_slug: "doze",
      status: "staging",
      version: "1.0.0",
      risk_level: "medium",
      allowed_tools: ["hotjar"],
      summary: "Comportamento e heatmaps"
    },
    {
      id: createId(),
      kind: "tool",
      slug: "apify",
      name: "Apify",
      workspace_slug: "doze",
      status: "staging",
      version: "1.0.0",
      risk_level: "medium",
      allowed_tools: ["apify"],
      summary: "Coleta web e mercado"
    },
    {
      id: createId(),
      kind: "tool",
      slug: "canva",
      name: "Canva",
      workspace_slug: "doze",
      status: "staging",
      version: "1.0.0",
      risk_level: "medium",
      allowed_tools: ["canva"],
      summary: "Design operacional"
    },
    {
      id: createId(),
      kind: "tool",
      slug: "instagram-publisher",
      name: "Instagram Publisher",
      workspace_slug: "doze",
      status: "draft",
      version: "1.0.0",
      risk_level: "critical",
      allowed_tools: ["instagram-publisher"],
      summary: "Publicação direta sujeita a checkpoint"
    },
    {
      id: createId(),
      kind: "squad",
      slug: "meta-squad",
      name: "Meta Squad",
      workspace_slug: "openclow",
      status: "draft",
      version: "1.0.0",
      risk_level: "high",
      allowed_tools: [],
      summary: "Capability interna para criar, revisar e promover outras capabilities"
    },
    {
      id: createId(),
      kind: "skill",
      slug: "brand-context-orchestrator",
      name: "Brand Context Orchestrator",
      workspace_slug: "doze",
      status: "draft",
      version: "1.0.0",
      risk_level: "medium",
      allowed_tools: ["brand-context-orchestrator"],
      summary: "Resolve brand profile, campaign context e verdade operacional",
      system_family: "creative",
      machine_profile: "cpu-safe",
      environment_scope: "local-dev",
      supports_dry_run: true,
      requires_checkpoint: false,
      artifact_contracts: ["brand_context.json"]
    },
    {
      id: createId(),
      kind: "tool",
      slug: "reference-fetcher",
      name: "Reference Fetcher",
      workspace_slug: "doze",
      status: "draft",
      version: "1.0.0",
      risk_level: "low",
      allowed_tools: ["reference-fetcher"],
      summary: "Ingesta links e assets de referência",
      system_family: "creative",
      machine_profile: "cpu-safe",
      environment_scope: "local-dev",
      supports_dry_run: true,
      requires_checkpoint: false,
      artifact_contracts: ["reference_pack.json"]
    },
    {
      id: createId(),
      kind: "skill",
      slug: "reference-enricher",
      name: "Reference Enricher",
      workspace_slug: "doze",
      status: "draft",
      version: "1.0.0",
      risk_level: "low",
      allowed_tools: ["reference-enricher"],
      summary: "Traduz referências em sinais visuais e anti-patterns",
      system_family: "creative",
      machine_profile: "balanced",
      environment_scope: "local-dev",
      supports_dry_run: true,
      requires_checkpoint: false,
      artifact_contracts: ["reference_pack.json", "style_signals.json", "visual_anti_patterns.json"]
    },
    {
      id: createId(),
      kind: "skill",
      slug: "creative-director",
      name: "Creative Director",
      workspace_slug: "doze",
      status: "draft",
      version: "1.0.0",
      risk_level: "medium",
      allowed_tools: ["creative-director"],
      summary: "Consolida intenção criativa e treatment executável",
      system_family: "creative",
      machine_profile: "balanced",
      environment_scope: "local-dev",
      supports_dry_run: true,
      requires_checkpoint: true,
      artifact_contracts: ["creative_intent.json", "approval_packet.json"]
    },
    {
      id: createId(),
      kind: "skill",
      slug: "frame-planner",
      name: "Frame Planner",
      workspace_slug: "doze",
      status: "draft",
      version: "1.0.0",
      risk_level: "medium",
      allowed_tools: ["frame-planner"],
      summary: "Quebra o video em beats, shots e ritmos aprovaveis",
      system_family: "creative",
      machine_profile: "balanced",
      environment_scope: "local-dev",
      supports_dry_run: true,
      requires_checkpoint: false,
      artifact_contracts: ["shot_plan.json"]
    },
    {
      id: createId(),
      kind: "skill",
      slug: "motion-editor",
      name: "Motion Editor",
      workspace_slug: "doze",
      status: "draft",
      version: "1.0.0",
      risk_level: "medium",
      allowed_tools: ["motion-editor"],
      summary: "Traduz shots em ritmo, cortes e decisoes de montagem",
      system_family: "creative",
      machine_profile: "balanced",
      environment_scope: "staging",
      supports_dry_run: true,
      requires_checkpoint: false,
      artifact_contracts: ["edit_decision_list.json"]
    },
    {
      id: createId(),
      kind: "skill",
      slug: "vfx-finisher",
      name: "VFX Finisher",
      workspace_slug: "doze",
      status: "draft",
      version: "1.0.0",
      risk_level: "medium",
      allowed_tools: ["vfx-finisher"],
      summary: "Define overlays, textura, tipografia e linguagem de VFX",
      system_family: "creative",
      machine_profile: "balanced",
      environment_scope: "staging",
      supports_dry_run: true,
      requires_checkpoint: false,
      artifact_contracts: ["vfx_plan.json"]
    },
    {
      id: createId(),
      kind: "skill",
      slug: "brand-qa",
      name: "Brand QA",
      workspace_slug: "doze",
      status: "draft",
      version: "1.0.0",
      risk_level: "medium",
      allowed_tools: ["brand-qa"],
      summary: "Valida aderência da peça à identidade da empresa",
      system_family: "creative",
      machine_profile: "cpu-safe",
      environment_scope: "staging",
      supports_dry_run: true,
      requires_checkpoint: true,
      artifact_contracts: ["qa_report_brand.json"]
    },
    {
      id: createId(),
      kind: "skill",
      slug: "delivery-qa",
      name: "Delivery QA",
      workspace_slug: "doze",
      status: "draft",
      version: "1.0.0",
      risk_level: "medium",
      allowed_tools: ["delivery-qa"],
      summary: "Valida export, pacing e readiness de entrega",
      system_family: "creative",
      machine_profile: "cpu-safe",
      environment_scope: "staging",
      supports_dry_run: true,
      requires_checkpoint: true,
      artifact_contracts: ["qa_report_delivery.json"]
    },
    {
      id: createId(),
      kind: "tool",
      slug: "paperclip-composer",
      name: "Paperclip Composer",
      workspace_slug: "doze",
      status: "draft",
      version: "1.0.0",
      risk_level: "medium",
      allowed_tools: ["paperclip-composer"],
      summary: "Composição declarativa de layouts, timelines e overlays",
      system_family: "creative",
      machine_profile: "balanced",
      environment_scope: "staging",
      supports_dry_run: true,
      requires_checkpoint: false,
      artifact_contracts: ["asset_plan.json", "shot_plan.json"]
    },
    {
      id: createId(),
      kind: "tool",
      slug: "ffmpeg-render",
      name: "FFmpeg Render",
      workspace_slug: "doze",
      status: "draft",
      version: "1.0.0",
      risk_level: "medium",
      allowed_tools: ["ffmpeg-render"],
      summary: "Render, transformações de mídia e extração de previews",
      system_family: "creative",
      machine_profile: "balanced",
      environment_scope: "staging",
      supports_dry_run: true,
      requires_checkpoint: false,
      artifact_contracts: ["edit_decision_list.json", "preview_manifest.json", "vfx_plan.json"]
    },
    {
      id: createId(),
      kind: "tool",
      slug: "publish-dry-run",
      name: "Publish Dry Run",
      workspace_slug: "doze",
      status: "draft",
      version: "1.0.0",
      risk_level: "high",
      allowed_tools: ["publish-dry-run"],
      summary: "Empacota publicação em modo dry-run e gera receipts",
      system_family: "publishing",
      machine_profile: "cpu-safe",
      environment_scope: "staging",
      supports_dry_run: true,
      requires_checkpoint: true,
      artifact_contracts: ["publication_plan.json", "publish_receipt.json"]
    }
  ];

  const marketingId = createId();
  const intelligenceId = createId();
  const creativeControlId = createId();
  const referenceLabId = createId();
  const creativeQaId = createId();
  const creativeImageId = createId();
  const creativeVideoId = createId();

  const squads = [
    {
      id: marketingId,
      slug: "marketing-dozecrew",
      name: "Marketing Doze Crew",
      workspace_slug: "doze",
      version: "1.0.0",
      pipeline_id: createId(),
      capability_ids: capabilities.map((capability) => capability.id),
      memory_scope: "squad",
      default_model_tier: "fast",
      steps: createMarketingSteps()
    },
    {
      id: intelligenceId,
      slug: "inteligencia-dozecrew",
      name: "Inteligência Doze Crew",
      workspace_slug: "doze",
      version: "1.0.0",
      pipeline_id: createId(),
      capability_ids: capabilities
        .filter((capability) => ["ga4", "woocommerce", "meta-insights", "hotjar", "apify"].includes(capability.slug))
        .map((capability) => capability.id),
      memory_scope: "squad",
      default_model_tier: "powerful",
      steps: createIntelligenceSteps()
    },
    {
      id: creativeControlId,
      slug: "creative-control",
      name: "Creative Control",
      workspace_slug: "doze",
      version: "1.0.0",
      pipeline_id: createId(),
      capability_ids: capabilities
        .filter((capability) =>
          ["brand-context-orchestrator", "creative-director", "brand-qa", "delivery-qa"].includes(capability.slug)
        )
        .map((capability) => capability.id),
      memory_scope: "run",
      default_model_tier: "powerful",
      system_family: "creative",
      machine_profile: "balanced",
      environment_scope: "staging",
      context_precedence: ["operational-truth", "campaign-context", "brand-profile", "creative-playbook"],
      qa_capability_ids: capabilities
        .filter((capability) => ["brand-qa", "delivery-qa"].includes(capability.slug))
        .map((capability) => capability.id),
      steps: createCreativeControlSteps()
    },
    {
      id: referenceLabId,
      slug: "reference-lab",
      name: "Reference Lab",
      workspace_slug: "doze",
      version: "1.0.0",
      pipeline_id: createId(),
      capability_ids: capabilities
        .filter((capability) => ["reference-fetcher", "reference-enricher"].includes(capability.slug))
        .map((capability) => capability.id),
      memory_scope: "run",
      default_model_tier: "powerful",
      system_family: "creative",
      machine_profile: "balanced",
      environment_scope: "local-dev",
      context_precedence: ["operational-truth", "campaign-context", "brand-profile", "creative-playbook"],
      qa_capability_ids: [],
      steps: createReferenceLabSteps()
    },
    {
      id: creativeQaId,
      slug: "creative-qa",
      name: "Creative QA",
      workspace_slug: "doze",
      version: "1.0.0",
      pipeline_id: createId(),
      capability_ids: capabilities
        .filter((capability) => ["brand-qa", "delivery-qa"].includes(capability.slug))
        .map((capability) => capability.id),
      memory_scope: "run",
      default_model_tier: "fast",
      system_family: "creative",
      machine_profile: "cpu-safe",
      environment_scope: "staging",
      context_precedence: ["operational-truth", "campaign-context", "brand-profile", "creative-playbook"],
      qa_capability_ids: capabilities
        .filter((capability) => ["brand-qa", "delivery-qa"].includes(capability.slug))
        .map((capability) => capability.id),
      steps: createCreativeQaSteps()
    },
    {
      id: creativeImageId,
      slug: "creative-image",
      name: "Creative Image",
      workspace_slug: "doze",
      version: "1.0.0",
      pipeline_id: createId(),
      capability_ids: capabilities
        .filter((capability) => ["paperclip-composer", "ffmpeg-render", "brand-qa", "delivery-qa"].includes(capability.slug))
        .map((capability) => capability.id),
      memory_scope: "run",
      default_model_tier: "powerful",
      system_family: "creative",
      machine_profile: "balanced",
      environment_scope: "staging",
      context_precedence: ["operational-truth", "campaign-context", "brand-profile", "creative-playbook"],
      qa_capability_ids: capabilities
        .filter((capability) => ["brand-qa", "delivery-qa"].includes(capability.slug))
        .map((capability) => capability.id),
      steps: createCreativeImageSteps()
    },
    {
      id: creativeVideoId,
      slug: "creative-video",
      name: "Creative Video",
      workspace_slug: "doze",
      version: "1.0.0",
      pipeline_id: createId(),
      capability_ids: capabilities
        .filter((capability) =>
          [
            "frame-planner",
            "motion-editor",
            "vfx-finisher",
            "paperclip-composer",
            "ffmpeg-render",
            "brand-qa",
            "delivery-qa"
          ].includes(capability.slug)
        )
        .map((capability) => capability.id),
      memory_scope: "run",
      default_model_tier: "powerful",
      system_family: "creative",
      machine_profile: "balanced",
      environment_scope: "staging",
      context_precedence: ["operational-truth", "campaign-context", "brand-profile", "creative-playbook"],
      qa_capability_ids: capabilities
        .filter((capability) => ["brand-qa", "delivery-qa"].includes(capability.slug))
        .map((capability) => capability.id),
      steps: createCreativeVideoSteps()
    }
  ];

  return {
    capabilities,
    squads
  };
}
