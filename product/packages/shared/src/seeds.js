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
    }
  ];

  const marketingId = createId();
  const intelligenceId = createId();

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
    }
  ];

  return {
    capabilities,
    squads
  };
}
