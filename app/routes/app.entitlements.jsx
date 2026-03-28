import { getPlanEntitlementsFromRequest } from "../plan-entitlements.server";
import { getActiveThemeFromRequest } from "../active-theme.server";
import { getThemeEditorOnboardingLinks } from "../theme-editor-links";

export async function loader({ request }) {
  const entitlements = await getPlanEntitlementsFromRequest(request);
  const activeTheme = await getActiveThemeFromRequest(request);
  const onboardingLinks = getThemeEditorOnboardingLinks(
    activeTheme.shop,
    activeTheme.themeId,
  );

  return {
    ok: true,
    merchantState: {
      planKey: entitlements.planKey,
      planLabel: entitlements.planLabel,
      source: entitlements.source,
      hasActivePayment: entitlements.hasActivePayment,
      activeTheme: {
        shop: activeTheme.shop,
        themeId: activeTheme.themeId,
        themeGid: activeTheme.themeGid,
        themeName: activeTheme.theme?.name ?? null,
        themeRole: activeTheme.theme?.role ?? null,
      },
      onboardingLinks,
      entitlements: entitlements.blocks,
    },
  };
}

export default function AppEntitlementsRoute() {
  return null;
}