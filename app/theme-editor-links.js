export const THEME_BLOCK_HANDLES = {
  LUXE_HERO: "luxe-hero",
  TRUST_BAR: "trust-bar",
  PREMIUM_FEATURES: "premium-features",
};

export const THEME_EMBED_HANDLES = {
  APP_EMBED: "luxe-app-embed",
};

export const THEME_BLOCK_LABELS = {
  [THEME_BLOCK_HANDLES.LUXE_HERO]: "Premium Hero Banner",
  [THEME_BLOCK_HANDLES.TRUST_BAR]: "Store Trust Highlights",
  [THEME_BLOCK_HANDLES.PREMIUM_FEATURES]: "Feature Highlights Grid",
};

export const THEME_ONBOARDING_KEYS = {
  ENABLE_APP: "enable-app",
  LUXE_HERO: THEME_BLOCK_HANDLES.LUXE_HERO,
  TRUST_BAR: THEME_BLOCK_HANDLES.TRUST_BAR,
  PREMIUM_FEATURES: THEME_BLOCK_HANDLES.PREMIUM_FEATURES,
};

export function buildThemeEditorBaseUrl(shop, themeId) {
  if (!shop || !themeId) {
    return null;
  }

  return `https://${shop}/admin/themes/${themeId}/editor`;
}

export function buildThemeEditorAppsUrl(shop, themeId, template = "index") {
  const baseUrl = buildThemeEditorBaseUrl(shop, themeId);

  if (!baseUrl) {
    return null;
  }

  const params = new URLSearchParams({
    context: "apps",
    template,
  });

  return `${baseUrl}?${params.toString()}`;
}

export function buildThemeEditorEnableAppLink(
  shop,
  themeId,
  apiKey,
  template = "index",
) {
  return buildThemeEditorAppsUrl(shop, themeId, template);
}

export function buildThemeEditorAppBlockLink(
  shop,
  themeId,
  apiKey,
  blockHandle,
  template = "index",
  target = "newAppsSection",
) {
  const baseUrl = buildThemeEditorBaseUrl(shop, themeId);

  if (!baseUrl || !apiKey || !blockHandle) {
    return null;
  }

  const url = new URL(baseUrl);
  url.searchParams.set("template", template);
  url.searchParams.set("addAppBlockId", `${apiKey}/${blockHandle}`);
  url.searchParams.set("target", target);

  return url.toString();
}

export function getThemeEditorOnboardingLinks(shop, themeId, apiKey) {
  return [
    {
      key: THEME_ONBOARDING_KEYS.ENABLE_APP,
      label: "Enable app in Theme Editor",
      description:
        "Open the App embeds panel and turn Luxe Sections Studio on manually.",
      url: buildThemeEditorEnableAppLink(shop, themeId, apiKey),
    },
    {
      key: THEME_ONBOARDING_KEYS.LUXE_HERO,
      label: THEME_BLOCK_LABELS[THEME_BLOCK_HANDLES.LUXE_HERO],
      description:
        "Add your main hero section and set up the first visual message for your storefront.",
      url: buildThemeEditorAppBlockLink(
        shop,
        themeId,
        apiKey,
        THEME_BLOCK_HANDLES.LUXE_HERO,
      ),
    },
    {
      key: THEME_ONBOARDING_KEYS.TRUST_BAR,
      label: THEME_BLOCK_LABELS[THEME_BLOCK_HANDLES.TRUST_BAR],
      description:
        "Add trust-focused proof points to help shoppers feel confident before buying.",
      url: buildThemeEditorAppBlockLink(
        shop,
        themeId,
        apiKey,
        THEME_BLOCK_HANDLES.TRUST_BAR,
      ),
    },
    {
      key: THEME_ONBOARDING_KEYS.PREMIUM_FEATURES,
      label: THEME_BLOCK_LABELS[THEME_BLOCK_HANDLES.PREMIUM_FEATURES],
      description:
        "Show your strongest product or brand advantages in a clean feature grid.",
      url: buildThemeEditorAppBlockLink(
        shop,
        themeId,
        apiKey,
        THEME_BLOCK_HANDLES.PREMIUM_FEATURES,
      ),
    },
  ];
}