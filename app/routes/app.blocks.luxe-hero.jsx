import { useEffect, useMemo, useState } from "react";
import { Link, useFetcher, useLoaderData } from "react-router";
import {
  Badge,
  BlockStack,
  Button,
  Card,
  InlineGrid,
  InlineStack,
  Page,
  Text,
} from "@shopify/polaris";
import { BLOCK_KEYS, PLAN_LABELS } from "../plan-rules";
import { getCurrentPlanFromRequest } from "../current-plan.server";
import { getActiveThemeFromRequest } from "../active-theme.server";
import { getThemeEditorOnboardingLinks } from "../theme-editor-links";
import { authenticate } from "../shopify.server";
import {
  getLuxeHeroSettings,
  normalizeLuxeHeroSettings,
  saveLuxeHeroMetaobject,
} from "../luxe-hero-metaobject.server";
import { enforceBlockPlanSettings } from "../block-plan-enforcement";
import { BlockEditorShell } from "../components/block-editor/BlockEditorShell";
import { BlockPreviewPanel } from "../components/block-editor/BlockPreviewPanel";
import {
  DeviceSwitcher,
  getPreviewDeviceWidth,
} from "../components/block-editor/DeviceSwitcher";
import { PlanLimitNotice } from "../components/block-editor/PlanLimitNotice";
import { BlockEditorGroups } from "../components/block-editor/BlockEditorGroups";
import { luxeHeroEditorSections } from "../block-editor-configs/luxe-hero";

function openInTopWindow(url) {
  if (!url || typeof window === "undefined") {
    return;
  }

  if (window.top) {
    window.top.location.href = url;
    return;
  }

  window.location.href = url;
}

function getBackgroundPresetGradient(preset) {
  if (preset === "champagne") {
    return "linear-gradient(135deg, #2c2014 0%, #6f5631 48%, #d6b37a 100%)";
  }

  if (preset === "charcoal") {
    return "linear-gradient(135deg, #111827 0%, #1f2937 58%, #4b5563 100%)";
  }

  return "linear-gradient(135deg, #0f172a 0%, #182235 56%, #8a6a2f 100%)";
}

function getShadowStyle(shadowStyle) {
  if (shadowStyle === "none") {
    return "none";
  }

  if (shadowStyle === "medium") {
    return "0 16px 36px rgba(15, 23, 42, 0.18)";
  }

  if (shadowStyle === "strong") {
    return "0 24px 56px rgba(15, 23, 42, 0.26)";
  }

  return "0 12px 28px rgba(15, 23, 42, 0.14)";
}

function getFontFamily(fontFamily) {
  if (fontFamily === "sans") {
    return "Inter, ui-sans-serif, system-ui, sans-serif";
  }

  if (fontFamily === "serif") {
    return "Georgia, 'Times New Roman', serif";
  }

  if (fontFamily === "display") {
    return "'Playfair Display', Georgia, serif";
  }

  return "inherit";
}

function getSectionSurfaceStyle(sectionStyle, surfaceColor, borderColor) {
  if (sectionStyle === "minimal") {
    return {
      background: surfaceColor,
      border: `1px solid ${borderColor}`,
      boxShadow: "none",
    };
  }

  if (sectionStyle === "soft") {
    return {
      background: surfaceColor,
      border: `1px solid ${borderColor}`,
      boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
    };
  }

  return {
    background: surfaceColor,
    border: `1px solid ${borderColor}`,
    boxShadow: "0 16px 32px rgba(15, 23, 42, 0.12)",
  };
}

function getCardStyle(cardStyle, cardBackgroundColor, borderColor, borderWidth) {
  if (cardStyle === "glass") {
    return {
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(10px)",
      border: `${borderWidth}px solid ${borderColor}`,
    };
  }

  if (cardStyle === "outline") {
    return {
      background: "transparent",
      border: `${borderWidth}px solid ${borderColor}`,
    };
  }

  if (cardStyle === "solid") {
    return {
      background: cardBackgroundColor,
      border: `${borderWidth}px solid ${borderColor}`,
    };
  }

  return {
    background: cardBackgroundColor,
    border: `${borderWidth}px solid ${borderColor}`,
    boxShadow: "0 8px 18px rgba(15, 23, 42, 0.08)",
  };
}

function getButtonStyle(buttonStyle, buttonColor, buttonTextColor, borderColor) {
  if (buttonStyle === "outline") {
    return {
      background: "transparent",
      color: buttonTextColor,
      border: `1px solid ${borderColor}`,
    };
  }

  if (buttonStyle === "soft") {
    return {
      background: buttonColor,
      color: buttonTextColor,
      border: "1px solid transparent",
      opacity: 0.9,
    };
  }

  return {
    background: buttonColor,
    color: buttonTextColor,
    border: "1px solid transparent",
  };
}

function buildHeroSettingsFromFormData(formData) {
  return {
    badgeText: formData.get("badgeText"),
    heading: formData.get("heading"),
    subheading: formData.get("subheading"),

    textColor: formData.get("textColor"),
    subtextColor: formData.get("subtextColor"),
    headingColor: formData.get("headingColor"),
    backgroundColor: formData.get("backgroundColor"),
    surfaceColor: formData.get("surfaceColor"),
    cardBackgroundColor: formData.get("cardBackgroundColor"),
    borderColor: formData.get("borderColor"),
    accentColor: formData.get("accentColor"),
    overlayColor: formData.get("overlayColor"),
    iconColor: formData.get("iconColor"),
    iconBackgroundColor: formData.get("iconBackgroundColor"),

    primaryButtonColor: formData.get("primaryButtonColor"),
    primaryButtonTextColor: formData.get("primaryButtonTextColor"),
    secondaryButtonColor: formData.get("secondaryButtonColor"),
    secondaryButtonTextColor: formData.get("secondaryButtonTextColor"),

    borderRadius: formData.get("borderRadius"),
    sectionStyle: formData.get("sectionStyle"),

    paddingTop: formData.get("paddingTop"),
    paddingBottom: formData.get("paddingBottom"),
    mobilePaddingTop: formData.get("mobilePaddingTop"),
    mobilePaddingBottom: formData.get("mobilePaddingBottom"),

    mobileLayout: formData.get("mobileLayout"),
    mobileSpacing: formData.get("mobileSpacing"),
    desktopSpacing: formData.get("desktopSpacing"),

    headingFontSize: formData.get("headingFontSize"),
    subheadingFontSize: formData.get("subheadingFontSize"),
    bodyFontSize: formData.get("bodyFontSize"),

    backgroundImage: formData.get("backgroundImage"),
    primaryButtonLabel: formData.get("primaryButtonLabel"),
    primaryButtonLink: formData.get("primaryButtonLink"),
    secondaryButtonLabel: formData.get("secondaryButtonLabel"),
    secondaryButtonLink: formData.get("secondaryButtonLink"),

    overlayOpacity: formData.get("overlayOpacity"),
    desktopHeight: formData.get("desktopHeight"),
    mobileHeight: formData.get("mobileHeight"),
    backgroundFallbackColor: formData.get("backgroundFallbackColor"),

    contentAlignment: formData.get("contentAlignment"),
    headingAlignment: formData.get("headingAlignment"),
    desktopColumns: formData.get("desktopColumns"),

    cardStyle: formData.get("cardStyle"),
    borderWidth: formData.get("borderWidth"),
    shadowStyle: formData.get("shadowStyle"),
    fontFamily: formData.get("fontFamily"),
    fontWeight: formData.get("fontWeight"),
    letterSpacing: formData.get("letterSpacing"),

    buttonStyle: formData.get("buttonStyle"),
    itemGap: formData.get("itemGap"),
    sectionMaxWidth: formData.get("sectionMaxWidth"),
    secondaryButtonStyle: formData.get("secondaryButtonStyle"),
    heroContentWidth: formData.get("heroContentWidth"),

    backgroundVideo: formData.get("backgroundVideo"),
    backgroundPreset: formData.get("backgroundPreset"),
    layeredBackgroundEffects: formData.get("layeredBackgroundEffects"),
    glowEffects: formData.get("glowEffects"),
    advancedAnimations: formData.get("advancedAnimations"),
    hoverEffects: formData.get("hoverEffects"),
    animatedBorder: formData.get("animatedBorder"),
    shimmerEffects: formData.get("shimmerEffects"),
    mouseFollowEffect: formData.get("mouseFollowEffect"),
    premiumMotion: formData.get("premiumMotion"),
  };
}

export async function loader({ request }) {
  const currentPlanStatus = await getCurrentPlanFromRequest(request);
  const activeThemeStatus = await getActiveThemeFromRequest(request);
  const { admin } = await authenticate.admin(request);

  const onboardingLinks = getThemeEditorOnboardingLinks(
    activeThemeStatus.shop,
    activeThemeStatus.themeId,
    process.env.SHOPIFY_API_KEY,
  );

  const savedSettings = await getLuxeHeroSettings(admin);

  return {
    currentPlanKey: currentPlanStatus.planKey,
    currentPlanLabel: PLAN_LABELS[currentPlanStatus.planKey],
    activeThemeName: activeThemeStatus.theme?.name ?? null,
    activeThemeId: activeThemeStatus.themeId,
    heroThemeEditorUrl:
      onboardingLinks.find((item) => item.key === "luxe-hero")?.url ?? null,
    appEmbedUrl:
      onboardingLinks.find((item) => item.key === "enable-app")?.url ?? null,
    savedSettings,
  };
}

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);
  const currentPlanStatus = await getCurrentPlanFromRequest(request);
  const formData = await request.formData();

  try {
    const normalizedSettings = normalizeLuxeHeroSettings(
      buildHeroSettingsFromFormData(formData),
    );

    const enforcement = enforceBlockPlanSettings(
      currentPlanStatus.planKey,
      BLOCK_KEYS.LUXE_HERO,
      normalizedSettings,
    );

    const existingSettings = normalizeLuxeHeroSettings(
      await getLuxeHeroSettings(admin),
    );

    const settingsToSave = {
      ...existingSettings,
      ...enforcement.allowedSettings,
    };

    const saved = await saveLuxeHeroMetaobject(admin, settingsToSave);

    return {
      ok: true,
      currentPlanKey: currentPlanStatus.planKey,
      currentPlanLabel: PLAN_LABELS[currentPlanStatus.planKey],
      savedAt: new Date().toISOString(),
      settings: saved.settings,
      blockedFields: enforcement.blockedFields,
      blockedFeatures: enforcement.blockedFeatures,
      blockedFeatureDetails: enforcement.blockedFeatureDetails,
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to save Luxe Hero settings.",
    };
  }
}

export default function LuxeHeroEditorRoute() {
  const {
    currentPlanKey,
    currentPlanLabel,
    activeThemeName,
    activeThemeId,
    heroThemeEditorUrl,
    appEmbedUrl,
    savedSettings,
  } = useLoaderData();

  const fetcher = useFetcher();
  const [device, setDevice] = useState("desktop");
  const [settings, setSettings] = useState(() => ({ ...savedSettings }));
  const [saveMessage, setSaveMessage] = useState("Saved values loaded");

  function updateSetting(fieldName, value) {
    setSettings((current) => ({
      ...current,
      [fieldName]: value,
    }));
  }

  function applySavedSettingsToEditor(nextSettings) {
    setSettings({ ...nextSettings });
  }

  function handleSave() {
    const formData = new FormData();

    for (const [fieldName, value] of Object.entries(settings)) {
      formData.append(fieldName, String(value ?? ""));
    }

    setSaveMessage("Saving...");
    fetcher.submit(formData, { method: "post" });
  }

  useEffect(() => {
    if (fetcher.state !== "idle") {
      return;
    }

    if (fetcher.data?.ok) {
      const blockedCount = (fetcher.data.blockedFeatureDetails ?? []).length;

      if (blockedCount > 0) {
        setSaveMessage("Upgrade required to save some settings");
      } else {
        if (fetcher.data.settings) {
          applySavedSettingsToEditor(fetcher.data.settings);
        }

        setSaveMessage("Saved");
      }
    }

    if (fetcher.data?.ok === false) {
      setSaveMessage(fetcher.data.error || "Save failed");
    }
  }, [fetcher.state, fetcher.data]);

  const blockedFeatureDetails = fetcher.data?.blockedFeatureDetails ?? [];
  const isSaving = fetcher.state !== "idle";
  const isMobile = device === "mobile";
  const isTablet = device === "tablet";

  const previewWidth = getPreviewDeviceWidth(device);
  const previewHeight = isMobile
    ? settings.mobileHeight
    : settings.desktopHeight;
  const previewPaddingTop = isMobile
    ? settings.mobilePaddingTop
    : settings.paddingTop;
  const previewPaddingBottom = isMobile
    ? settings.mobilePaddingBottom
    : settings.paddingBottom;
  const previewGap = isMobile ? settings.mobileSpacing : settings.desktopSpacing;

  const horizontalAlignment =
    settings.contentAlignment === "center"
      ? "center"
      : settings.contentAlignment === "right"
        ? "flex-end"
        : "flex-start";

  const bodyTextAlign =
    settings.contentAlignment === "center"
      ? "center"
      : settings.contentAlignment === "right"
        ? "right"
        : "left";

  const headingTextAlign =
    settings.headingAlignment === "center"
      ? "center"
      : settings.headingAlignment === "right"
        ? "right"
        : "left";

  const saveBadgeTone =
    blockedFeatureDetails.length > 0
      ? "attention"
      : saveMessage === "Saved"
        ? "success"
        : "info";

  const sectionSurfaceStyle = getSectionSurfaceStyle(
    settings.sectionStyle,
    settings.surfaceColor,
    settings.borderColor,
  );

  const contentCardStyle = getCardStyle(
    settings.cardStyle,
    settings.cardBackgroundColor,
    settings.borderColor,
    settings.borderWidth,
  );

  const primaryButtonStyle = getButtonStyle(
    settings.buttonStyle,
    settings.primaryButtonColor,
    settings.primaryButtonTextColor,
    settings.borderColor,
  );

  const secondaryButtonStyle = getButtonStyle(
    settings.secondaryButtonStyle,
    settings.secondaryButtonColor,
    settings.secondaryButtonTextColor,
    settings.borderColor,
  );

  const desktopColumnCount = Number.parseInt(settings.desktopColumns, 10);
  const previewGridTemplateColumns =
    !isMobile && desktopColumnCount === 3
      ? "minmax(0, 1fr) 240px 160px"
      : !isMobile && desktopColumnCount === 2
        ? "minmax(0, 1fr) 240px"
        : "minmax(0, 1fr)";

  const previewBackgroundStyle = useMemo(() => {
    const baseGradient = getBackgroundPresetGradient(settings.backgroundPreset);
    const fallbackColor =
      settings.backgroundFallbackColor || settings.backgroundColor;
    const imageLayer =
      settings.backgroundImage && settings.backgroundImage.trim()
        ? `linear-gradient(135deg, rgba(15,23,42,0.20), rgba(15,23,42,0.42)), url(${settings.backgroundImage.trim()})`
        : null;

    return {
      backgroundColor: fallbackColor,
      backgroundImage: imageLayer || baseGradient,
      backgroundSize: imageLayer ? "cover" : "auto",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  }, [settings]);

  const header = (
    <Card>
      <InlineGrid columns={{ xs: 1, md: "minmax(0, 1fr) auto" }} gap="300">
        <BlockStack gap="150">
          <InlineStack gap="200" blockAlign="center" wrap>
            <Text as="h1" variant="headingLg">
              Premium Hero Banner
            </Text>
            <Badge tone="success">{currentPlanLabel}</Badge>
            <Badge tone={saveBadgeTone}>
              {isSaving ? "Saving..." : saveMessage}
            </Badge>
          </InlineStack>

          <Text as="p" variant="bodyMd" tone="subdued">
            All settings stay visible in one editor page in this order:
            Free, Standard, Premium. Every change updates the preview
            immediately, but saving only applies features available on the
            current plan.
          </Text>
        </BlockStack>

        <BlockStack gap="100">
          <Text as="p" variant="bodySm" tone="subdued">
            Theme: {activeThemeName ?? "Not found"}{" "}
            {activeThemeId ? `(ID: ${activeThemeId})` : ""}
          </Text>

          <InlineStack gap="200" wrap>
            {heroThemeEditorUrl ? (
              <Button
                variant="primary"
                onClick={() => openInTopWindow(heroThemeEditorUrl)}
              >
                Open in Shopify
              </Button>
            ) : (
              <Button variant="primary" disabled>
                Open in Shopify
              </Button>
            )}

            {appEmbedUrl ? (
              <Button onClick={() => openInTopWindow(appEmbedUrl)}>
                App embeds
              </Button>
            ) : (
              <Button disabled>App embeds</Button>
            )}

            <Link to="/app/blocks" style={{ textDecoration: "none" }}>
              <Button>Back to Blocks</Button>
            </Link>
          </InlineStack>
        </BlockStack>
      </InlineGrid>
    </Card>
  );

  const sidebar = (
    <BlockStack gap="300">
      <PlanLimitNotice
        currentPlanLabel={currentPlanLabel}
        blockedFeatureDetails={blockedFeatureDetails}
      />

      <BlockStack gap="300">
        <BlockEditorGroups
          currentPlanKey={currentPlanKey}
          blockKey={BLOCK_KEYS.LUXE_HERO}
          settings={settings}
          onChange={updateSetting}
          sections={luxeHeroEditorSections}
        />

        <Card>
          <InlineStack align="space-between" blockAlign="center" wrap>
            <Text as="p" variant="bodySm" tone="subdued">
              The preview always shows the full result on the right.
              Saving only applies features available on your current
              plan.
            </Text>

            <Button
              variant="primary"
              loading={isSaving}
              onClick={handleSave}
            >
              Save
            </Button>
          </InlineStack>
        </Card>
      </BlockStack>
    </BlockStack>
  );

  const preview = (
    <BlockPreviewPanel
      device={device}
      deviceSwitcher={<DeviceSwitcher device={device} setDevice={setDevice} />}
      footerText="The preview updates immediately, even when some settings are not yet available to save on the current plan."
      stageMinHeight="820px"
      preview={
        <div
          style={{
            width: previewWidth,
            maxWidth: "100%",
            transition: "width 180ms ease",
          }}
        >
          <div
            style={{
              maxWidth: `${settings.sectionMaxWidth}px`,
              margin: "0 auto",
              padding: "14px",
              borderRadius: `${settings.borderRadius + 4}px`,
              ...sectionSurfaceStyle,
            }}
          >
            <div
              style={{
                position: "relative",
                minHeight: `${previewHeight}px`,
                borderRadius: `${settings.borderRadius}px`,
                overflow: "hidden",
                boxShadow: getShadowStyle(settings.shadowStyle),
                ...previewBackgroundStyle,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: settings.overlayColor,
                  opacity: Number(settings.overlayOpacity) / 100,
                }}
              />

              {settings.layeredBackgroundEffects === "enabled" ? (
                <>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(circle at top left, rgba(255,255,255,0.10), transparent 34%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "-80px",
                      bottom: "-80px",
                      width: "220px",
                      height: "220px",
                      borderRadius: "999px",
                      background: `${settings.accentColor}22`,
                      filter: "blur(20px)",
                    }}
                  />
                </>
              ) : null}

              {settings.glowEffects === "enabled" ? (
                <div
                  style={{
                    position: "absolute",
                    right: isMobile ? "-50px" : "4%",
                    top: isMobile ? "auto" : "12%",
                    bottom: isMobile ? "-70px" : "auto",
                    width: isMobile ? "180px" : "320px",
                    height: isMobile ? "180px" : "320px",
                    borderRadius: "999px",
                    background: `radial-gradient(circle, ${settings.accentColor}66 0%, ${settings.accentColor}24 38%, transparent 72%)`,
                    filter: "blur(10px)",
                  }}
                />
              ) : null}

              {settings.mouseFollowEffect === "enabled" ? (
                <div
                  style={{
                    position: "absolute",
                    left: "10%",
                    top: "20%",
                    width: "180px",
                    height: "180px",
                    borderRadius: "999px",
                    background: `${settings.accentColor}18`,
                    filter: "blur(22px)",
                  }}
                />
              ) : null}

              {settings.shimmerEffects === "enabled" ? (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-20%",
                    width: "40%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.16) 50%, transparent 100%)",
                    transform: "skewX(-18deg)",
                  }}
                />
              ) : null}

              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  minHeight: `${previewHeight}px`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: horizontalAlignment,
                  paddingTop: `${previewPaddingTop}px`,
                  paddingBottom: `${previewPaddingBottom}px`,
                  paddingLeft: isMobile ? "18px" : "28px",
                  paddingRight: isMobile ? "18px" : "28px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    maxWidth: `${settings.sectionMaxWidth}px`,
                    display: "grid",
                    gridTemplateColumns: previewGridTemplateColumns,
                    gap: `${settings.itemGap}px`,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      maxWidth: `${settings.heroContentWidth}px`,
                      justifySelf:
                        settings.contentAlignment === "center"
                          ? "center"
                          : settings.contentAlignment === "right"
                            ? "end"
                            : "start",
                      padding: "20px",
                      borderRadius: `${settings.borderRadius}px`,
                      fontFamily: getFontFamily(settings.fontFamily),
                      fontWeight: settings.fontWeight,
                      letterSpacing: `${settings.letterSpacing}px`,
                      transition:
                        settings.advancedAnimations === "enabled"
                          ? "all 220ms ease"
                          : "none",
                      transform:
                        settings.premiumMotion === "enabled"
                          ? "translateY(-2px)"
                          : "none",
                      ...(settings.cardStyle ? contentCardStyle : {}),
                    }}
                  >
                    {settings.backgroundVideo ? (
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "14px",
                          padding: "6px 12px",
                          borderRadius: "999px",
                          background: settings.iconBackgroundColor,
                          color: settings.iconColor,
                          fontSize: "12px",
                          fontWeight: 700,
                        }}
                      >
                        <span
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "999px",
                            background: settings.iconColor,
                            color: settings.iconBackgroundColor,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "10px",
                            lineHeight: 1,
                          }}
                        >
                          ▶
                        </span>
                        Background video set
                      </div>
                    ) : null}

                    <div
                      style={{
                        display: "inline-flex",
                        padding: "7px 12px",
                        borderRadius: "999px",
                        background: settings.iconBackgroundColor,
                        color: settings.accentColor,
                        fontSize: "12px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        marginBottom: `${Math.max(12, previewGap)}px`,
                      }}
                    >
                      {settings.badgeText || "Premium storefront"}
                    </div>

                    <div
                      style={{
                        color: settings.headingColor,
                        fontSize: isMobile
                          ? `${Math.max(
                              20,
                              Number(settings.headingFontSize) - 14,
                            )}px`
                          : isTablet
                            ? `${Math.max(
                                28,
                                Number(settings.headingFontSize) - 8,
                              )}px`
                            : `${settings.headingFontSize}px`,
                        lineHeight: 1.02,
                        textAlign: headingTextAlign,
                        marginBottom: `${Math.max(10, previewGap * 0.65)}px`,
                      }}
                    >
                      {settings.heading || "Your hero heading"}
                    </div>

                    <div
                      style={{
                        color: settings.subtextColor,
                        fontSize: isMobile
                          ? `${Math.max(
                              12,
                              Number(settings.bodyFontSize) - 3,
                            )}px`
                          : `${settings.bodyFontSize}px`,
                        lineHeight: 1.7,
                        textAlign: bodyTextAlign,
                        marginBottom: `${Math.max(16, previewGap)}px`,
                      }}
                    >
                      {settings.subheading || "Your hero subheading"}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection:
                          isMobile && settings.mobileLayout === "stack"
                            ? "column"
                            : "row",
                        gap: `${Math.max(10, Number(settings.itemGap))}px`,
                        justifyContent: horizontalAlignment,
                        alignItems:
                          isMobile && settings.mobileLayout === "stack"
                            ? "stretch"
                            : "center",
                      }}
                    >
                      <div
                        style={{
                          minHeight: "50px",
                          padding: "0 24px",
                          borderRadius: "999px",
                          fontSize: "14px",
                          fontWeight: 700,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textDecoration: "none",
                          transition:
                            settings.hoverEffects === "enabled"
                              ? "transform 180ms ease, opacity 180ms ease"
                              : "none",
                          transform:
                            settings.hoverEffects === "enabled"
                              ? "translateY(-1px)"
                              : "none",
                          ...primaryButtonStyle,
                        }}
                      >
                        {settings.primaryButtonLabel || "Primary button"}
                      </div>

                      <div
                        style={{
                          minHeight: "50px",
                          padding: "0 24px",
                          borderRadius: "999px",
                          fontSize: "14px",
                          fontWeight: 600,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textDecoration: "none",
                          transition:
                            settings.hoverEffects === "enabled"
                              ? "transform 180ms ease, opacity 180ms ease"
                              : "none",
                          transform:
                            settings.hoverEffects === "enabled"
                              ? "translateY(-1px)"
                              : "none",
                          ...secondaryButtonStyle,
                        }}
                      >
                        {settings.secondaryButtonLabel || "Secondary button"}
                      </div>
                    </div>
                  </div>

                  {!isMobile && desktopColumnCount >= 2 ? (
                    <div
                      style={{
                        display: "grid",
                        gap: `${Math.max(10, Number(settings.itemGap) - 2)}px`,
                      }}
                    >
                      {[1, 2].map((item) => (
                        <div
                          key={item}
                          style={{
                            minHeight: "120px",
                            borderRadius: `${Math.max(
                              16,
                              Number(settings.borderRadius) - 6,
                            )}px`,
                            padding: "14px",
                            color: settings.textColor,
                            boxShadow: getShadowStyle(settings.shadowStyle),
                            ...contentCardStyle,
                          }}
                        >
                          <div
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "999px",
                              background: settings.iconBackgroundColor,
                              color: settings.iconColor,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "14px",
                              marginBottom: "12px",
                            }}
                          >
                            ★
                          </div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: 700,
                              marginBottom: "6px",
                              color: settings.textColor,
                            }}
                          >
                            Premium card {item}
                          </div>
                          <div
                            style={{
                              fontSize: "12px",
                              lineHeight: 1.6,
                              color: settings.subtextColor,
                            }}
                          >
                            Preview for card style, border width,
                            icon colors, and section spacing.
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {!isMobile && desktopColumnCount === 3 ? (
                    <div
                      style={{
                        minHeight: "260px",
                        borderRadius: `${Math.max(
                          16,
                          Number(settings.borderRadius) - 8,
                        )}px`,
                        padding: "14px",
                        color: settings.textColor,
                        boxShadow: getShadowStyle(settings.shadowStyle),
                        ...contentCardStyle,
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color: settings.accentColor,
                          marginBottom: "10px",
                        }}
                      >
                        Extra column
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          lineHeight: 1.6,
                          color: settings.subtextColor,
                        }}
                      >
                        Desktop columns preview is active here.
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {settings.animatedBorder === "enabled" ? (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: `${settings.borderRadius}px`,
                    border: `2px solid ${settings.accentColor}`,
                    opacity: 0.45,
                    pointerEvents: "none",
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      }
    />
  );

  return (
    <Page fullWidth>
      <div style={{ minHeight: 0 }}>
        <BlockEditorShell
          header={header}
          sidebar={sidebar}
          preview={preview}
          sidebarWidth="470px"
          minDesktopHeight={720}
          viewportOffset={220}
        />
      </div>
    </Page>
  );
}