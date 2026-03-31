import { useEffect, useMemo, useState } from "react";
import { Link, useFetcher, useLoaderData } from "react-router";
import {
  Badge,
  BlockStack,
  Box,
  Button,
  Card,
  InlineGrid,
  InlineStack,
  Page,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { BLOCK_KEYS, PLAN_KEYS, PLAN_LABELS } from "../plan-rules";
import { getCurrentPlanFromRequest } from "../current-plan.server";
import { getActiveThemeFromRequest } from "../active-theme.server";
import { getThemeEditorOnboardingLinks } from "../theme-editor-links";
import { authenticate } from "../shopify.server";
import {
  getLuxeHeroSettings,
  normalizeLuxeHeroSettings,
  saveLuxeHeroMetaobject,
} from "../luxe-hero-metaobject.server";
import {
  enforceBlockPlanSettings,
  getFieldPlanAccess,
} from "../block-plan-enforcement";

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

function getDeviceWidth(device) {
  if (device === "mobile") {
    return "390px";
  }

  if (device === "tablet") {
    return "760px";
  }

  return "100%";
}

function getPlanBadgeTone(requiredPlan) {
  if (requiredPlan === PLAN_KEYS.PREMIUM) {
    return "attention";
  }

  if (requiredPlan === PLAN_KEYS.STANDARD) {
    return "info";
  }

  return "success";
}

function FieldPlanBadge({ currentPlanKey, fieldName }) {
  const access = getFieldPlanAccess(
    currentPlanKey,
    BLOCK_KEYS.LUXE_HERO,
    fieldName,
  );

  if (!access.isMapped || access.requiredPlan === PLAN_KEYS.FREE) {
    return <Badge tone="success">Free</Badge>;
  }

  return (
    <Badge tone={getPlanBadgeTone(access.requiredPlan)}>
      {access.requiredPlanLabel}
    </Badge>
  );
}

function DeviceSwitcher({ device, setDevice }) {
  return (
    <InlineStack gap="200" wrap>
      <Button
        variant={device === "desktop" ? "primary" : "secondary"}
        onClick={() => setDevice("desktop")}
      >
        Desktop
      </Button>

      <Button
        variant={device === "tablet" ? "primary" : "secondary"}
        onClick={() => setDevice("tablet")}
      >
        Tablet
      </Button>

      <Button
        variant={device === "mobile" ? "primary" : "secondary"}
        onClick={() => setDevice("mobile")}
      >
        Mobile
      </Button>
    </InlineStack>
  );
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

const FREE_GROUPS = [
  {
    title: "Content",
    fields: [
      {
        fieldName: "heading",
        label: "Heading",
        type: "textarea",
        multiline: 3,
      },
      {
        fieldName: "subheading",
        label: "Subheading",
        type: "textarea",
        multiline: 4,
      },
      {
        fieldName: "primaryButtonLabel",
        label: "Primary button",
        type: "text",
      },
      {
        fieldName: "primaryButtonLink",
        label: "Primary button link",
        type: "text",
      },
      {
        fieldName: "secondaryButtonLabel",
        label: "Secondary button",
        type: "text",
      },
      {
        fieldName: "secondaryButtonLink",
        label: "Secondary button link",
        type: "text",
      },
    ],
  },
  {
    title: "Colors",
    fields: [
      { fieldName: "textColor", label: "Text color", type: "text" },
      { fieldName: "subtextColor", label: "Subtext color", type: "text" },
      { fieldName: "headingColor", label: "Heading color", type: "text" },
      {
        fieldName: "backgroundColor",
        label: "Background color",
        type: "text",
      },
      { fieldName: "surfaceColor", label: "Surface color", type: "text" },
      {
        fieldName: "cardBackgroundColor",
        label: "Card background color",
        type: "text",
      },
      { fieldName: "borderColor", label: "Border color", type: "text" },
      { fieldName: "accentColor", label: "Accent color", type: "text" },
      { fieldName: "overlayColor", label: "Overlay color", type: "text" },
      { fieldName: "iconColor", label: "Icon color", type: "text" },
      {
        fieldName: "iconBackgroundColor",
        label: "Icon background color",
        type: "text",
      },
      {
        fieldName: "primaryButtonColor",
        label: "Primary button color",
        type: "text",
      },
      {
        fieldName: "primaryButtonTextColor",
        label: "Primary button text color",
        type: "text",
      },
      {
        fieldName: "secondaryButtonColor",
        label: "Secondary button color",
        type: "text",
      },
      {
        fieldName: "secondaryButtonTextColor",
        label: "Secondary button text color",
        type: "text",
      },
      {
        fieldName: "backgroundFallbackColor",
        label: "Fallback background color",
        type: "text",
      },
    ],
  },
  {
    title: "Spacing and size",
    fields: [
      {
        fieldName: "borderRadius",
        label: "Border radius",
        type: "number",
      },
      {
        fieldName: "sectionStyle",
        label: "Section style",
        type: "select",
        options: [
          { label: "Minimal", value: "minimal" },
          { label: "Soft", value: "soft" },
          { label: "Luxe", value: "luxe" },
        ],
      },
      { fieldName: "paddingTop", label: "Top padding", type: "number" },
      { fieldName: "paddingBottom", label: "Bottom padding", type: "number" },
      {
        fieldName: "mobilePaddingTop",
        label: "Mobile top padding",
        type: "number",
      },
      {
        fieldName: "mobilePaddingBottom",
        label: "Mobile bottom padding",
        type: "number",
      },
      {
        fieldName: "mobileLayout",
        label: "Mobile layout",
        type: "select",
        options: [
          { label: "Stack", value: "stack" },
          { label: "Inline", value: "inline" },
        ],
      },
      {
        fieldName: "mobileSpacing",
        label: "Mobile spacing",
        type: "number",
      },
      {
        fieldName: "desktopSpacing",
        label: "Desktop spacing",
        type: "number",
      },
      {
        fieldName: "headingFontSize",
        label: "Heading font size",
        type: "number",
      },
      {
        fieldName: "subheadingFontSize",
        label: "Subheading font size",
        type: "number",
      },
      {
        fieldName: "bodyFontSize",
        label: "Body font size",
        type: "number",
      },
      {
        fieldName: "backgroundImage",
        label: "Background image",
        type: "text",
      },
      {
        fieldName: "overlayOpacity",
        label: "Overlay opacity",
        type: "number",
      },
      {
        fieldName: "desktopHeight",
        label: "Desktop section height",
        type: "number",
      },
      {
        fieldName: "mobileHeight",
        label: "Mobile section height",
        type: "number",
      },
    ],
  },
];

const STANDARD_GROUPS = [
  {
    title: "Layout upgrades",
    fields: [
      {
        fieldName: "contentAlignment",
        label: "Content alignment",
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
        ],
      },
      {
        fieldName: "headingAlignment",
        label: "Heading alignment",
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
        ],
      },
      {
        fieldName: "desktopColumns",
        label: "Desktop columns",
        type: "select",
        options: [
          { label: "1 column", value: "1" },
          { label: "2 columns", value: "2" },
          { label: "3 columns", value: "3" },
        ],
      },
      {
        fieldName: "cardStyle",
        label: "Card style",
        type: "select",
        options: [
          { label: "Soft", value: "soft" },
          { label: "Solid", value: "solid" },
          { label: "Glass", value: "glass" },
          { label: "Outline", value: "outline" },
        ],
      },
      {
        fieldName: "borderWidth",
        label: "Border width",
        type: "number",
      },
      {
        fieldName: "shadowStyle",
        label: "Shadow style",
        type: "select",
        options: [
          { label: "None", value: "none" },
          { label: "Soft", value: "soft" },
          { label: "Medium", value: "medium" },
          { label: "Strong", value: "strong" },
        ],
      },
      {
        fieldName: "fontFamily",
        label: "Font family",
        type: "select",
        options: [
          { label: "Inherit", value: "inherit" },
          { label: "Sans", value: "sans" },
          { label: "Serif", value: "serif" },
          { label: "Display", value: "display" },
        ],
      },
      {
        fieldName: "fontWeight",
        label: "Font weight",
        type: "select",
        options: [
          { label: "500", value: "500" },
          { label: "600", value: "600" },
          { label: "700", value: "700" },
          { label: "800", value: "800" },
        ],
      },
      {
        fieldName: "letterSpacing",
        label: "Letter spacing",
        type: "number",
      },
      {
        fieldName: "buttonStyle",
        label: "Button style",
        type: "select",
        options: [
          { label: "Solid", value: "solid" },
          { label: "Outline", value: "outline" },
          { label: "Soft", value: "soft" },
        ],
      },
      {
        fieldName: "itemGap",
        label: "Item gap",
        type: "number",
      },
      {
        fieldName: "sectionMaxWidth",
        label: "Section max width",
        type: "number",
      },
      {
        fieldName: "secondaryButtonStyle",
        label: "Secondary button style",
        type: "select",
        options: [
          { label: "Solid", value: "solid" },
          { label: "Outline", value: "outline" },
          { label: "Soft", value: "soft" },
        ],
      },
      {
        fieldName: "heroContentWidth",
        label: "Hero content width",
        type: "number",
      },
    ],
  },
];

const PREMIUM_GROUPS = [
  {
    title: "Premium effects",
    fields: [
      {
        fieldName: "backgroundVideo",
        label: "Background video",
        type: "text",
      },
      {
        fieldName: "layeredBackgroundEffects",
        label: "Layered background effects",
        type: "select",
        options: [
          { label: "Enabled", value: "enabled" },
          { label: "Disabled", value: "disabled" },
        ],
      },
      {
        fieldName: "backgroundPreset",
        label: "Premium hero presets",
        type: "select",
        options: [
          { label: "Midnight gold", value: "midnight" },
          { label: "Champagne glow", value: "champagne" },
          { label: "Charcoal luxe", value: "charcoal" },
        ],
      },
      {
        fieldName: "glowEffects",
        label: "Glow effects",
        type: "select",
        options: [
          { label: "Enabled", value: "enabled" },
          { label: "Disabled", value: "disabled" },
        ],
      },
      {
        fieldName: "advancedAnimations",
        label: "Advanced animations",
        type: "select",
        options: [
          { label: "Enabled", value: "enabled" },
          { label: "Disabled", value: "disabled" },
        ],
      },
      {
        fieldName: "hoverEffects",
        label: "Hover effects",
        type: "select",
        options: [
          { label: "Enabled", value: "enabled" },
          { label: "Disabled", value: "disabled" },
        ],
      },
      {
        fieldName: "animatedBorder",
        label: "Animated border",
        type: "select",
        options: [
          { label: "Enabled", value: "enabled" },
          { label: "Disabled", value: "disabled" },
        ],
      },
      {
        fieldName: "shimmerEffects",
        label: "Shimmer effects",
        type: "select",
        options: [
          { label: "Enabled", value: "enabled" },
          { label: "Disabled", value: "disabled" },
        ],
      },
      {
        fieldName: "mouseFollowEffect",
        label: "Mouse follow effect",
        type: "select",
        options: [
          { label: "Enabled", value: "enabled" },
          { label: "Disabled", value: "disabled" },
        ],
      },
      {
        fieldName: "premiumMotion",
        label: "Premium motion",
        type: "select",
        options: [
          { label: "Enabled", value: "enabled" },
          { label: "Disabled", value: "disabled" },
        ],
      },
    ],
  },
];

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

  const previewWidth = getDeviceWidth(device);
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

  const blockedPlanLabels = [
    ...new Set(blockedFeatureDetails.map((item) => item.requiredPlanLabel)),
  ];

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

  function renderControl(field) {
    const commonLabel = (
      <InlineStack align="space-between" blockAlign="center" wrap>
        <Text as="p" variant="bodySm" fontWeight="semibold">
          {field.label}
        </Text>
        <FieldPlanBadge
          currentPlanKey={currentPlanKey}
          fieldName={field.fieldName}
        />
      </InlineStack>
    );

    if (field.type === "select") {
      return (
        <BlockStack key={field.fieldName} gap="100">
          {commonLabel}
          <Select
            label={field.label}
            labelHidden
            options={field.options}
            value={String(settings[field.fieldName] ?? "")}
            onChange={(value) => updateSetting(field.fieldName, value)}
          />
        </BlockStack>
      );
    }

    if (field.type === "textarea") {
      return (
        <BlockStack key={field.fieldName} gap="100">
          {commonLabel}
          <TextField
            label={field.label}
            labelHidden
            value={String(settings[field.fieldName] ?? "")}
            onChange={(value) => updateSetting(field.fieldName, value)}
            multiline={field.multiline ?? 3}
            autoComplete="off"
          />
        </BlockStack>
      );
    }

    if (field.type === "number") {
      return (
        <BlockStack key={field.fieldName} gap="100">
          {commonLabel}
          <TextField
            label={field.label}
            labelHidden
            type="number"
            value={String(settings[field.fieldName] ?? "")}
            onChange={(value) => updateSetting(field.fieldName, value)}
            autoComplete="off"
          />
        </BlockStack>
      );
    }

    return (
      <BlockStack key={field.fieldName} gap="100">
        {commonLabel}
        <TextField
          label={field.label}
          labelHidden
          value={String(settings[field.fieldName] ?? "")}
          onChange={(value) => updateSetting(field.fieldName, value)}
          autoComplete="off"
        />
      </BlockStack>
    );
  }

  return (
    <Page>
      <BlockStack gap="300">
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

        <InlineGrid columns={{ xs: 1, lg: "470px minmax(0, 1fr)" }} gap="300">
          <BlockStack gap="300">
            {blockedFeatureDetails.length > 0 ? (
              <Card>
                <div
                  style={{
                    background: "#fef3c7",
                    border: "1px solid #f59e0b",
                    borderRadius: "16px",
                    padding: "16px",
                  }}
                >
                  <BlockStack gap="150">
                    <InlineStack gap="200" blockAlign="center" wrap>
                      <Text as="h3" variant="headingSm">
                        Upgrade needed to save some settings
                      </Text>
                      <Badge tone="attention">{currentPlanLabel}</Badge>
                    </InlineStack>

                    <Text as="p" variant="bodySm">
                      These settings are visible in preview but were not saved.
                      Upgrade your plan to save them:{" "}
                      {blockedPlanLabels.join(" / ")}.
                    </Text>

                    <BlockStack gap="050">
                      {blockedFeatureDetails.map((item) => (
                        <Text
                          key={`${item.fieldName}-${item.featureKey}`}
                          as="p"
                          variant="bodySm"
                        >
                          {item.fieldName} requires {item.requiredPlanLabel}.
                        </Text>
                      ))}
                    </BlockStack>
                  </BlockStack>
                </div>
              </Card>
            ) : null}

            <fetcher.Form method="post">
              <input type="hidden" name="badgeText" value={settings.badgeText} />

              {Object.entries(settings).map(([fieldName, value]) => {
                if (fieldName === "badgeText") {
                  return null;
                }

                return (
                  <input
                    key={fieldName}
                    type="hidden"
                    name={fieldName}
                    value={String(value ?? "")}
                  />
                );
              })}

              <BlockStack gap="300">
                <Card>
                  <BlockStack gap="250">
                    <InlineStack align="space-between" blockAlign="center" wrap>
                      <Text as="h2" variant="headingMd">
                        Free
                      </Text>
                      <Badge tone="success">Base editable features</Badge>
                    </InlineStack>

                    <Text as="p" variant="bodySm" tone="subdued">
                      Core text, color, spacing, and size controls.
                    </Text>

                    {FREE_GROUPS.map((group) => (
                      <BlockStack key={group.title} gap="200">
                        <Text as="h3" variant="headingSm">
                          {group.title}
                        </Text>

                        <BlockStack gap="200">
                          {group.fields.map((field) => renderControl(field))}
                        </BlockStack>
                      </BlockStack>
                    ))}
                  </BlockStack>
                </Card>

                <Card>
                  <BlockStack gap="250">
                    <InlineStack align="space-between" blockAlign="center" wrap>
                      <Text as="h2" variant="headingMd">
                        Standard
                      </Text>
                      <Badge tone="info">Layout and typography upgrades</Badge>
                    </InlineStack>

                    <Text as="p" variant="bodySm" tone="subdued">
                      More flexible alignment, width, typography, and card
                      styling.
                    </Text>

                    {STANDARD_GROUPS.map((group) => (
                      <BlockStack key={group.title} gap="200">
                        <Text as="h3" variant="headingSm">
                          {group.title}
                        </Text>

                        <BlockStack gap="200">
                          {group.fields.map((field) => renderControl(field))}
                        </BlockStack>
                      </BlockStack>
                    ))}
                  </BlockStack>
                </Card>

                <Card>
                  <BlockStack gap="250">
                    <InlineStack align="space-between" blockAlign="center" wrap>
                      <Text as="h2" variant="headingMd">
                        Premium
                      </Text>
                      <Badge tone="attention">Advanced effects and motion</Badge>
                    </InlineStack>

                    <Text as="p" variant="bodySm" tone="subdued">
                      Video background, glow, premium presets, motion, and
                      advanced visual effects.
                    </Text>

                    {PREMIUM_GROUPS.map((group) => (
                      <BlockStack key={group.title} gap="200">
                        <Text as="h3" variant="headingSm">
                          {group.title}
                        </Text>

                        <BlockStack gap="200">
                          {group.fields.map((field) => renderControl(field))}
                        </BlockStack>
                      </BlockStack>
                    ))}
                  </BlockStack>
                </Card>

                <Card>
                  <InlineStack align="space-between" blockAlign="center" wrap>
                    <Text as="p" variant="bodySm" tone="subdued">
                      The preview always shows the full result on the right.
                      Saving only applies features available on your current
                      plan.
                    </Text>

                    <Button submit variant="primary" loading={isSaving}>
                      Save
                    </Button>
                  </InlineStack>
                </Card>
              </BlockStack>
            </fetcher.Form>
          </BlockStack>

          <div style={{ position: "sticky", top: "24px" }}>
            <Card>
              <BlockStack gap="250">
                <InlineStack align="space-between" blockAlign="center" wrap>
                  <Text as="h2" variant="headingMd">
                    Live preview
                  </Text>
                  <Badge tone="attention">{device}</Badge>
                </InlineStack>

                <DeviceSwitcher device={device} setDevice={setDevice} />

                <Box
                  padding="300"
                  background="bg-surface-secondary"
                  borderRadius="300"
                >
                  <div
                    style={{
                      width: "100%",
                      minHeight: "820px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      overflow: "hidden",
                    }}
                  >
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
                                  ...(settings.cardStyle
                                    ? contentCardStyle
                                    : {}),
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
                                    marginBottom: `${Math.max(
                                      10,
                                      previewGap * 0.65,
                                    )}px`,
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
                                    marginBottom: `${Math.max(
                                      16,
                                      previewGap,
                                    )}px`,
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
                                    {settings.primaryButtonLabel ||
                                      "Primary button"}
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
                                    {settings.secondaryButtonLabel ||
                                      "Secondary button"}
                                  </div>
                                </div>
                              </div>

                              {!isMobile && desktopColumnCount >= 2 ? (
                                <div
                                  style={{
                                    display: "grid",
                                    gap: `${Math.max(
                                      10,
                                      Number(settings.itemGap) - 2,
                                    )}px`,
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
                                        boxShadow: getShadowStyle(
                                          settings.shadowStyle,
                                        ),
                                        ...contentCardStyle,
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: "36px",
                                          height: "36px",
                                          borderRadius: "999px",
                                          background:
                                            settings.iconBackgroundColor,
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
                                    boxShadow: getShadowStyle(
                                      settings.shadowStyle,
                                    ),
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
                  </div>
                </Box>

                <Text as="p" variant="bodySm" tone="subdued">
                  The preview updates immediately, even when some settings are
                  not yet available to save on the current plan.
                </Text>
              </BlockStack>
            </Card>
          </div>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}