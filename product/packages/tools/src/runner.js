function buildGa4Artifact(context) {
  return {
    tool: "ga4",
    artifact_type: "performance_report",
    summary: `GA4 analisado para ${context.squad_slug}`,
    details: {
      audience_trend: "stable",
      engagement: "mixed",
      conversion_focus: "week-over-week",
      workspace: context.workspace_slug
    }
  };
}

function buildWooCommerceArtifact(context) {
  return {
    tool: "woocommerce",
    artifact_type: "commerce_report",
    summary: `WooCommerce consolidado para ${context.squad_slug}`,
    details: {
      catalog_focus: "top_skus",
      order_signal: "recent_orders",
      revenue_signal: "normalized",
      workspace: context.workspace_slug
    }
  };
}

function buildMetaInsightsArtifact(context) {
  return {
    tool: "meta-insights",
    artifact_type: "social_signal_report",
    summary: `Meta Insights cruzado para ${context.squad_slug}`,
    details: {
      reach: "stable",
      engagement: "tracked",
      paid_media: "available",
      workspace: context.workspace_slug
    }
  };
}

function buildHotjarArtifact(context) {
  return {
    tool: "hotjar",
    artifact_type: "behavior_report",
    summary: `Hotjar analisado para ${context.squad_slug}`,
    details: {
      funnel_dropoff: "reviewed",
      heatmaps: "captured",
      friction_points: ["cta", "checkout"],
      workspace: context.workspace_slug
    }
  };
}

function buildApifyArtifact(context) {
  return {
    tool: "apify",
    artifact_type: "market_research_bundle",
    summary: `Apify coletou sinais de mercado para ${context.squad_slug}`,
    details: {
      sources: ["social", "web"],
      freshness: "current",
      workspace: context.workspace_slug
    }
  };
}

function buildCanvaArtifact(context) {
  return {
    tool: "canva",
    artifact_type: "design_brief",
    summary: `Brief visual montado para ${context.squad_slug}`,
    details: {
      template_set: "day1_social",
      formats: ["carousel", "static_post"],
      workspace: context.workspace_slug
    }
  };
}

function buildInstagramPublisherArtifact(context) {
  return {
    tool: "instagram-publisher",
    artifact_type: "publication_plan",
    summary: `Pacote de publicação preparado para ${context.squad_slug}`,
    details: {
      destination: "instagram",
      mode: "checkpointed",
      workspace: context.workspace_slug
    }
  };
}

function buildBlotatoArtifact(context) {
  return {
    tool: "blotato",
    artifact_type: "multi_channel_plan",
    summary: `Pacote multi-canal preparado para ${context.squad_slug}`,
    details: {
      channels: ["instagram", "tiktok", "facebook"],
      mode: "optional",
      workspace: context.workspace_slug
    }
  };
}

const toolHandlers = {
  ga4: buildGa4Artifact,
  woocommerce: buildWooCommerceArtifact,
  "meta-insights": buildMetaInsightsArtifact,
  hotjar: buildHotjarArtifact,
  apify: buildApifyArtifact,
  canva: buildCanvaArtifact,
  "instagram-publisher": buildInstagramPublisherArtifact,
  blotato: buildBlotatoArtifact
};

export function runToolBinding(toolSlug, context) {
  const handler = toolHandlers[toolSlug];

  if (!handler) {
    throw new Error(`Tool binding not implemented: ${toolSlug}`);
  }

  return handler(context);
}

export function getSupportedToolSlugs() {
  return Object.keys(toolHandlers);
}
