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

function buildBrandContextArtifact(context) {
  return {
    tool: "brand-context-orchestrator",
    artifact_type: "brand_context",
    summary: `Contexto consolidado para ${context.squad_slug}`,
    details: {
      workspace: context.workspace_slug,
      brand_slug: context.request_context?.brand_slug ?? "doze-crew",
      campaign_slug: context.request_context?.campaign_slug ?? "creative-baseline",
      machine_profile: context.machine_profile ?? "cpu-safe",
      environment_scope: context.environment_scope ?? "local-dev"
    }
  };
}

function buildReferenceFetcherArtifact(context) {
  const referenceUrls = context.request_context?.reference_urls ?? [];

  return {
    tool: "reference-fetcher",
    artifact_type: "reference_pack",
    summary: `Referencias ingeridas para ${context.squad_slug}`,
    details: {
      workspace: context.workspace_slug,
      reference_count: referenceUrls.length,
      reference_urls: referenceUrls
    }
  };
}

function buildReferenceEnricherArtifact(context) {
  const styleDirection = context.request_context?.style_direction ?? "modern-underground";

  return {
    tool: "reference-enricher",
    artifact_type: "style_signals",
    summary: `Sinais visuais enriquecidos para ${context.squad_slug}`,
    details: {
      workspace: context.workspace_slug,
      style_direction: styleDirection,
      anti_patterns: ["generic-stock-look", "weak-contrast", "template-motion"]
    }
  };
}

function buildBrandQaArtifact(context) {
  return {
    tool: "brand-qa",
    artifact_type: "brand_qa",
    summary: `QA de identidade executado para ${context.squad_slug}`,
    details: {
      workspace: context.workspace_slug,
      score: 8.4,
      status: "approved-with-notes"
    }
  };
}

function buildDeliveryQaArtifact(context) {
  return {
    tool: "delivery-qa",
    artifact_type: "delivery_qa",
    summary: `QA tecnico executado para ${context.squad_slug}`,
    details: {
      workspace: context.workspace_slug,
      export_readiness: "staging-ready",
      status: "approved-with-notes"
    }
  };
}

function buildPaperclipComposerArtifact(context) {
  return {
    tool: "paperclip-composer",
    artifact_type: "composition_plan",
    summary: `Composicao declarativa preparada para ${context.squad_slug}`,
    details: {
      workspace: context.workspace_slug,
      machine_profile: context.machine_profile ?? "balanced"
    }
  };
}

function buildFfmpegRenderArtifact(context) {
  return {
    tool: "ffmpeg-render",
    artifact_type: "preview_manifest",
    summary: `Manifesto de previews preparado para ${context.squad_slug}`,
    details: {
      workspace: context.workspace_slug,
      environment_scope: context.environment_scope ?? "staging"
    }
  };
}

function buildPublishDryRunArtifact(context) {
  return {
    tool: "publish-dry-run",
    artifact_type: "publish_receipt",
    summary: `Dry-run de publicacao preparado para ${context.squad_slug}`,
    details: {
      workspace: context.workspace_slug,
      mode: "dry-run",
      destination: context.request_context?.channel ?? "instagram"
    }
  };
}

const toolHandlers = {
  "brand-context-orchestrator": buildBrandContextArtifact,
  "reference-fetcher": buildReferenceFetcherArtifact,
  "reference-enricher": buildReferenceEnricherArtifact,
  "brand-qa": buildBrandQaArtifact,
  "delivery-qa": buildDeliveryQaArtifact,
  "paperclip-composer": buildPaperclipComposerArtifact,
  "ffmpeg-render": buildFfmpegRenderArtifact,
  "publish-dry-run": buildPublishDryRunArtifact,
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
