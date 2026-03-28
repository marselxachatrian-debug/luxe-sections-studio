export const THEME_BLOCK_HANDLES = {
  LUXE_HERO: "luxe-hero",
  TRUST_BAR: "trust-bar",
  PREMIUM_FEATURES: "premium-features",
};

export const THEME_BLOCK_LABELS = {
  [THEME_BLOCK_HANDLES.LUXE_HERO]: "Luxe Hero",
  [THEME_BLOCK_HANDLES.TRUST_BAR]: "Trust Bar",
  [THEME_BLOCK_HANDLES.PREMIUM_FEATURES]: "Premium Features",
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

export function buildThemeEditorBlockLibraryLink(
  shop,
  themeId,
  blockHandle,
  template = "index",
) {
  const appsUrl = buildThemeEditorAppsUrl(shop, themeId, template);

  if (!appsUrl || !blockHandle) {
    return null;
  }

  const url = new URL(appsUrl);
  url.searchParams.set("activateAppId", blockHandle);

  return url.toString();
}

export function getThemeEditorOnboardingLinks(shop, themeId) {
  return [
    {
      key: THEME_BLOCK_HANDLES.LUXE_HERO,
      label: THEME_BLOCK_LABELS[THEME_BLOCK_HANDLES.LUXE_HERO],
      url: buildThemeEditorBlockLibraryLink(
        shop,
        themeId,
        THEME_BLOCK_HANDLES.LUXE_HERO,
      ),
    },
    {
      key: THEME_BLOCK_HANDLES.TRUST_BAR,
      label: THEME_BLOCK_LABELS[THEME_BLOCK_HANDLES.TRUST_BAR],
      url: buildThemeEditorBlockLibraryLink(
        shop,
        themeId,
        THEME_BLOCK_HANDLES.TRUST_BAR,
      ),
    },
    {
      key: THEME_BLOCK_HANDLES.PREMIUM_FEATURES,
      label: THEME_BLOCK_LABELS[THEME_BLOCK_HANDLES.PREMIUM_FEATURES],
      url: buildThemeEditorBlockLibraryLink(
        shop,
        themeId,
        THEME_BLOCK_HANDLES.PREMIUM_FEATURES,
      ),
    },
  ];
}