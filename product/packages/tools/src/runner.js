import fs from "node:fs";
import path from "node:path";

function ensureDirectory(directoryPath) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

function getStepArtifactsDir(context) {
  return path.join(context.artifacts_dir ?? process.cwd(), context.run_id ?? "global", context.step_id ?? "step");
}

function writeJsonArtifact(filePath, payload) {
  ensureDirectory(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

function writeTextArtifact(filePath, payload) {
  ensureDirectory(path.dirname(filePath));
  fs.writeFileSync(filePath, payload, "utf8");
}

function createSlideSvg({ title, subtitle, accent, slideIndex, slideCount, width, height }) {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    '  <defs>',
    '    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">',
    '      <stop offset="0%" stop-color="#090909" />',
    '      <stop offset="100%" stop-color="#1a1a1a" />',
    "    </linearGradient>",
    '    <filter id="grain">',
    '      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />',
    '      <feColorMatrix type="saturate" values="0" />',
    '      <feComponentTransfer><feFuncA type="table" tableValues="0 0.05" /></feComponentTransfer>',
    "    </filter>",
    "  </defs>",
    '  <rect width="100%" height="100%" fill="url(#bg)" />',
    `  <rect x="64" y="64" width="${width - 128}" height="${height - 128}" rx="28" fill="none" stroke="${accent}" stroke-width="8" />`,
    `  <circle cx="${width - 120}" cy="120" r="36" fill="${accent}" opacity="0.9" />`,
    `  <text x="96" y="180" fill="#f8f8f8" font-family="Arial, Helvetica, sans-serif" font-size="112" font-weight="700">${title}</text>`,
    `  <text x="96" y="300" fill="#d7d7d7" font-family="Arial, Helvetica, sans-serif" font-size="42">${subtitle}</text>`,
    `  <text x="96" y="${height - 116}" fill="${accent}" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700">SLIDE ${slideIndex} / ${slideCount}</text>`,
    '  <rect width="100%" height="100%" fill="#ffffff" opacity="0.08" filter="url(#grain)" />',
    "</svg>"
  ].join("\n");
}

function createStoryboardSvg({ title, subtitle, accent, beatLabel, index, count, width, height }) {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    '  <defs>',
    '    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">',
    '      <stop offset="0%" stop-color="#050505" />',
    '      <stop offset="100%" stop-color="#181818" />',
    "    </linearGradient>",
    '    <filter id="grain">',
    '      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" stitchTiles="stitch" />',
    '      <feColorMatrix type="saturate" values="0" />',
    '      <feComponentTransfer><feFuncA type="table" tableValues="0 0.08" /></feComponentTransfer>',
    "    </filter>",
    "  </defs>",
    '  <rect width="100%" height="100%" fill="url(#bg)" />',
    `  <rect x="72" y="72" width="${width - 144}" height="${height - 144}" rx="44" fill="none" stroke="${accent}" stroke-width="10" />`,
    `  <text x="96" y="180" fill="${accent}" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700">VERTICAL CUT ${index} / ${count}</text>`,
    `  <text x="96" y="310" fill="#f6f6f6" font-family="Arial, Helvetica, sans-serif" font-size="96" font-weight="700">${title}</text>`,
    `  <text x="96" y="410" fill="#d6d6d6" font-family="Arial, Helvetica, sans-serif" font-size="42">${subtitle}</text>`,
    `  <text x="96" y="${height - 220}" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="700">${beatLabel}</text>`,
    `  <line x1="96" y1="${height - 170}" x2="${width - 96}" y2="${height - 170}" stroke="${accent}" stroke-width="8" />`,
    '  <rect width="100%" height="100%" fill="#ffffff" opacity="0.07" filter="url(#grain)" />',
    "</svg>"
  ].join("\n");
}

function createStaticHtmlPreview({ title, subtitle, previewFiles }) {
  const cards = previewFiles
    .map(
      (previewFile, index) => `
      <article>
        <h2>Preview ${index + 1}</h2>
        <img src="${path.basename(previewFile)}" alt="Preview ${index + 1}" />
      </article>`
    )
    .join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <style>
      body { background: #111; color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 24px; }
      header { margin-bottom: 24px; }
      main { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
      article { background: #1a1a1a; border: 1px solid #333; border-radius: 16px; padding: 16px; }
      img { width: 100%; height: auto; border-radius: 12px; display: block; background: #000; }
      p { color: #cfcfcf; max-width: 70ch; }
    </style>
  </head>
  <body>
    <header>
      <h1>${title}</h1>
      <p>${subtitle}</p>
    </header>
    <main>${cards}</main>
  </body>
</html>`;
}

function resolveOutputFormat(context) {
  if (context.request_context?.output_format) {
    return context.request_context.output_format;
  }

  if (context.intent_kind === "creative-video") {
    return "vertical-video";
  }

  return "static-post";
}

function resolveFrameCount(outputFormat, requestedFrameCount) {
  if (requestedFrameCount) {
    return Math.max(1, Number(requestedFrameCount));
  }

  if (outputFormat === "carousel") {
    return 3;
  }

  if (outputFormat === "vertical-video") {
    return 6;
  }

  return 1;
}

function resolveCanvas(outputFormat) {
  if (outputFormat === "stories" || outputFormat === "vertical-video") {
    return { width: 1080, height: 1920 };
  }

  return { width: 1080, height: 1350 };
}

function resolveCompositionDir(context) {
  const runRoot = path.join(context.artifacts_dir ?? process.cwd(), context.run_id ?? "global");
  const candidates = [
    path.join(runRoot, "compor-layout", "composition"),
    path.join(runRoot, "compor-storyboard", "composition")
  ];

  return candidates.find((candidate) => fs.existsSync(candidate)) ?? candidates[0];
}

function collectPublishableArtifacts(context) {
  const artifactRoot = path.join(context.artifacts_dir ?? process.cwd(), context.run_id ?? "global");
  const requestedRunIds = context.request_context?.asset_run_ids ?? [];
  const previewCandidates = [];

  for (const referencedRunId of requestedRunIds) {
    const renderDirs = [
      path.join(context.artifacts_dir ?? process.cwd(), referencedRunId, "renderizar-previews", "render"),
      path.join(context.artifacts_dir ?? process.cwd(), referencedRunId, "renderizar-video", "render")
    ];

    for (const renderDir of renderDirs) {
      if (!fs.existsSync(renderDir)) {
        continue;
      }

      const files = fs
        .readdirSync(renderDir)
        .filter((entry) => entry.endsWith(".svg"))
        .map((entry) => path.join(renderDir, entry));

      previewCandidates.push(...files);
    }
  }

  if (previewCandidates.length > 0) {
    return previewCandidates;
  }

  const fallbackFiles = fs.existsSync(artifactRoot)
    ? fs.readdirSync(artifactRoot, { recursive: true })
        .filter((entry) => typeof entry === "string" && entry.endsWith(".svg"))
        .map((entry) => path.join(artifactRoot, entry))
    : [];

  return fallbackFiles;
}

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
  const stepArtifactsDir = getStepArtifactsDir(context);
  const outputFormat = resolveOutputFormat(context);
  const slideCount = resolveFrameCount(outputFormat, context.request_context?.frame_count);
  const { width, height } = resolveCanvas(outputFormat);
  const accent = context.request_context?.accent_color ?? "#ff4d4f";
  const campaignName = context.request_context?.campaign_slug ?? "creative-baseline";
  const brandName = context.request_context?.brand_slug ?? "doze-crew";
  const framesDir = path.join(stepArtifactsDir, "composition");
  const framePaths = [];

  ensureDirectory(framesDir);

  for (let index = 1; index <= slideCount; index += 1) {
    const framePath = path.join(framesDir, `frame-${String(index).padStart(2, "0")}.svg`);
    const frameSvg =
      outputFormat === "vertical-video"
        ? createStoryboardSvg({
            title: brandName.toUpperCase(),
            subtitle: `${campaignName} • ${context.intent_kind ?? "creative-video"}`,
            accent,
            beatLabel: `Beat ${index}`,
            index,
            count: slideCount,
            width,
            height
          })
        : createSlideSvg({
            title: brandName.toUpperCase(),
            subtitle: `${campaignName} • ${outputFormat} • ${context.intent_kind ?? "creative-image"}`,
            accent,
            slideIndex: index,
            slideCount,
            width,
            height
          });

    writeTextArtifact(framePath, frameSvg);
    framePaths.push(framePath);
  }

  const compositionPath = path.join(stepArtifactsDir, "composition-plan.json");
  const composition = {
    tool: "paperclip-composer",
    output_format: outputFormat,
    machine_profile: context.machine_profile ?? "balanced",
    environment_scope: context.environment_scope ?? "staging",
    canvas: {
      width,
      height
    },
    frames: framePaths.map((framePath, index) => ({
      index: index + 1,
      path: framePath
    }))
  };

  writeJsonArtifact(compositionPath, composition);

  return {
    tool: "paperclip-composer",
    artifact_type: "composition_plan",
    summary: `Composicao declarativa preparada para ${context.squad_slug}`,
    details: {
      workspace: context.workspace_slug,
      machine_profile: context.machine_profile ?? "balanced",
      output_format: outputFormat,
      frame_count: slideCount,
      composition_path: compositionPath,
      frame_paths: framePaths
    }
  };
}

function buildFfmpegRenderArtifact(context) {
  const stepArtifactsDir = getStepArtifactsDir(context);
  const renderDir = path.join(stepArtifactsDir, "render");
  const previewManifestPath = path.join(stepArtifactsDir, "preview-manifest.json");
  const galleryPath = path.join(stepArtifactsDir, "preview-gallery.html");
  const compositionDir = resolveCompositionDir(context);
  const previewFiles = [];
  const outputFormat = resolveOutputFormat(context);
  const requestedFrames = resolveFrameCount(outputFormat, context.request_context?.frame_count);
  const playlistPath = path.join(stepArtifactsDir, "preview-playlist.json");

  ensureDirectory(renderDir);

  for (let index = 1; index <= requestedFrames; index += 1) {
    const sourcePath = path.join(compositionDir, `frame-${String(index).padStart(2, "0")}.svg`);
    const targetPath = path.join(renderDir, `preview-${String(index).padStart(2, "0")}.svg`);

    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
    } else {
      const { width, height } = resolveCanvas(outputFormat);
      const fallbackSvg =
        outputFormat === "vertical-video"
          ? createStoryboardSvg({
              title: (context.request_context?.brand_slug ?? "doze-crew").toUpperCase(),
              subtitle: `${context.request_context?.campaign_slug ?? "creative-baseline"} • preview fallback`,
              accent: context.request_context?.accent_color ?? "#ff4d4f",
              beatLabel: `Fallback beat ${index}`,
              index,
              count: requestedFrames,
              width,
              height
            })
          : createSlideSvg({
              title: (context.request_context?.brand_slug ?? "doze-crew").toUpperCase(),
              subtitle: `${context.request_context?.campaign_slug ?? "creative-baseline"} • preview fallback`,
              accent: context.request_context?.accent_color ?? "#ff4d4f",
              slideIndex: index,
              slideCount: requestedFrames,
              width,
              height
            });
      writeTextArtifact(targetPath, fallbackSvg);
    }

    previewFiles.push(targetPath);
  }

  const galleryHtml = createStaticHtmlPreview({
    title: `${context.squad_slug} preview gallery`,
    subtitle: `Render dry-run para ${context.request_context?.campaign_slug ?? "creative-baseline"}`,
    previewFiles
  });

  writeTextArtifact(galleryPath, galleryHtml);

  const manifest = {
    tool: "ffmpeg-render",
    output_format: outputFormat,
    environment_scope: context.environment_scope ?? "staging",
    previews: previewFiles.map((filePath, index) => ({
      index: index + 1,
      path: filePath
    })),
    gallery_path: galleryPath,
    playlist_path: playlistPath
  };

  writeJsonArtifact(previewManifestPath, manifest);
  writeJsonArtifact(playlistPath, {
    tool: "ffmpeg-render",
    sequence_kind: outputFormat === "vertical-video" ? "vertical-preview-cut" : "image-preview-strip",
    items: previewFiles.map((filePath, index) => ({
      index: index + 1,
      path: filePath,
      duration_ms: outputFormat === "vertical-video" ? 850 : null
    }))
  });

  return {
    tool: "ffmpeg-render",
    artifact_type: "preview_manifest",
    summary: `Manifesto de previews preparado para ${context.squad_slug}`,
    details: {
      workspace: context.workspace_slug,
      environment_scope: context.environment_scope ?? "staging",
      output_format: outputFormat,
      preview_manifest_path: previewManifestPath,
      preview_files: previewFiles,
      gallery_path: galleryPath,
      playlist_path: playlistPath
    }
  };
}

function buildPublishDryRunArtifact(context) {
  const stepArtifactsDir = getStepArtifactsDir(context);
  const publishBundlePath = path.join(stepArtifactsDir, "publication-plan.json");
  const publishReceiptPath = path.join(stepArtifactsDir, "publish-receipt.json");
  const previewFiles = collectPublishableArtifacts(context);
  const destination = context.request_context?.channel ?? "instagram";
  const bundle = {
    tool: "publish-dry-run",
    destination,
    mode: "dry-run",
    assets: previewFiles.map((filePath, index) => ({
      index: index + 1,
      path: filePath
    })),
    requested_asset_run_ids: context.request_context?.asset_run_ids ?? []
  };

  const receipt = {
    tool: "publish-dry-run",
    mode: "dry-run",
    destination,
    status: "packaged",
    packaged_assets: previewFiles.length,
    requested_at: new Date().toISOString(),
    source_run_id: context.run_id,
    publication_plan_path: publishBundlePath
  };

  writeJsonArtifact(publishBundlePath, bundle);
  writeJsonArtifact(publishReceiptPath, receipt);

  return {
    tool: "publish-dry-run",
    artifact_type: "publish_receipt",
    summary: `Dry-run de publicacao preparado para ${context.squad_slug}`,
    details: {
      workspace: context.workspace_slug,
      mode: "dry-run",
      destination,
      publication_plan_path: publishBundlePath,
      publish_receipt_path: publishReceiptPath,
      packaged_assets: previewFiles.length,
      asset_run_ids: context.request_context?.asset_run_ids ?? []
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
