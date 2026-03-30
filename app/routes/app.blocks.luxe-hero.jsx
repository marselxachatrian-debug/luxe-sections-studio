import { useEffect, useState } from "react";
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
  RangeSlider,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { PLAN_LABELS } from "../plan-rules";
import { getCurrentPlanFromRequest } from "../current-plan.server";
import { getActiveThemeFromRequest } from "../active-theme.server";
import { getThemeEditorOnboardingLinks } from "../theme-editor-links";
import { authenticate } from "../shopify.server";
import {
  getLuxeHeroSettings,
  normalizeLuxeHeroSettings,
  saveLuxeHeroMetaobject,
} from "../luxe-hero-metaobject.server";

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
    return "720px";
  }

  return "100%";
}

function getBackgroundStyle(preset) {
  if (preset === "champagne") {
    return "linear-gradient(135deg, #2c2014 0%, #6f5631 48%, #d6b37a 100%)";
  }

  if (preset === "charcoal") {
    return "linear-gradient(135deg, #111827 0%, #1f2937 58%, #4b5563 100%)";
  }

  return "linear-gradient(135deg, #0f172a 0%, #182235 56%, #8a6a2f 100%)";
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
  const formData = await request.formData();

  try {
    const settings = normalizeLuxeHeroSettings({
      badgeText: formData.get("badgeText"),
      heading: formData.get("heading"),
      subheading: formData.get("subheading"),
      primaryButtonLabel: formData.get("primaryButtonLabel"),
      secondaryButtonLabel: formData.get("secondaryButtonLabel"),
      contentAlignment: formData.get("contentAlignment"),
      backgroundPreset: formData.get("backgroundPreset"),
      overlayOpacity: formData.get("overlayOpacity"),
      desktopHeight: formData.get("desktopHeight"),
      mobileHeight: formData.get("mobileHeight"),
    });

    const saved = await saveLuxeHeroMetaobject(admin, settings);

    return {
      ok: true,
      savedAt: new Date().toISOString(),
      settings: saved.settings,
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
    currentPlanLabel,
    activeThemeName,
    activeThemeId,
    heroThemeEditorUrl,
    appEmbedUrl,
    savedSettings,
  } = useLoaderData();

  const fetcher = useFetcher();
  const [device, setDevice] = useState("desktop");

  const [badgeText, setBadgeText] = useState(savedSettings.badgeText);
  const [heading, setHeading] = useState(savedSettings.heading);
  const [subheading, setSubheading] = useState(savedSettings.subheading);
  const [primaryButtonLabel, setPrimaryButtonLabel] = useState(
    savedSettings.primaryButtonLabel,
  );
  const [secondaryButtonLabel, setSecondaryButtonLabel] = useState(
    savedSettings.secondaryButtonLabel,
  );
  const [contentAlignment, setContentAlignment] = useState(
    savedSettings.contentAlignment,
  );
  const [backgroundPreset, setBackgroundPreset] = useState(
    savedSettings.backgroundPreset,
  );
  const [overlayOpacity, setOverlayOpacity] = useState(
    savedSettings.overlayOpacity,
  );
  const [desktopHeight, setDesktopHeight] = useState(savedSettings.desktopHeight);
  const [mobileHeight, setMobileHeight] = useState(savedSettings.mobileHeight);
  const [saveMessage, setSaveMessage] = useState("Saved values loaded");

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.ok) {
      setSaveMessage("Saved");
    }

    if (fetcher.state === "idle" && fetcher.data?.ok === false) {
      setSaveMessage(fetcher.data.error || "Save failed");
    }
  }, [fetcher.state, fetcher.data]);

  const isSaving = fetcher.state !== "idle";
  const isMobile = device === "mobile";
  const isTablet = device === "tablet";

  const previewHeight = isMobile ? mobileHeight : desktopHeight;
  const previewWidth = getDeviceWidth(device);

  const horizontalAlignment =
    contentAlignment === "center"
      ? "center"
      : contentAlignment === "right"
        ? "flex-end"
        : "flex-start";

  const textAlignment =
    contentAlignment === "center"
      ? "center"
      : contentAlignment === "right"
        ? "right"
        : "left";

  const titleSize = isMobile ? "30px" : isTablet ? "42px" : "54px";
  const bodySize = isMobile ? "14px" : "17px";
  const contentMaxWidth = isMobile ? "100%" : "620px";

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
                <Badge tone="success">Editor ready</Badge>
                <Badge tone="success">{currentPlanLabel}</Badge>
              </InlineStack>

              <Text as="p" variant="bodyMd" tone="subdued">
                Edit the hero content here, preview it live on the right, and
                save the final version for your storefront.
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

        <InlineGrid columns={{ xs: 1, lg: "430px minmax(0, 1fr)" }} gap="300">
          <BlockStack gap="300">
            <Card>
              <BlockStack gap="150">
                <InlineStack align="space-between" blockAlign="center" wrap>
                  <Text as="h2" variant="headingMd">
                    Editor controls
                  </Text>
                  <Badge tone={saveMessage === "Saved" ? "success" : "info"}>
                    {isSaving ? "Saving..." : saveMessage}
                  </Badge>
                </InlineStack>

                <Text as="p" variant="bodySm" tone="subdued">
                  Keep changes focused: content first, then layout, then
                  responsive tuning.
                </Text>
              </BlockStack>
            </Card>

            <fetcher.Form method="post">
              <BlockStack gap="300">
                <Card>
                  <BlockStack gap="250">
                    <Text as="h3" variant="headingSm">
                      Content
                    </Text>

                    <TextField
                      label="Badge label"
                      value={badgeText}
                      onChange={setBadgeText}
                      autoComplete="off"
                    />
                    <input type="hidden" name="badgeText" value={badgeText} />

                    <TextField
                      label="Heading"
                      value={heading}
                      onChange={setHeading}
                      multiline={3}
                      autoComplete="off"
                    />
                    <input type="hidden" name="heading" value={heading} />

                    <TextField
                      label="Subheading"
                      value={subheading}
                      onChange={setSubheading}
                      multiline={4}
                      autoComplete="off"
                    />
                    <input type="hidden" name="subheading" value={subheading} />
                  </BlockStack>
                </Card>

                <Card>
                  <BlockStack gap="250">
                    <Text as="h3" variant="headingSm">
                      Buttons
                    </Text>

                    <TextField
                      label="Primary button label"
                      value={primaryButtonLabel}
                      onChange={setPrimaryButtonLabel}
                      autoComplete="off"
                    />
                    <input
                      type="hidden"
                      name="primaryButtonLabel"
                      value={primaryButtonLabel}
                    />

                    <TextField
                      label="Secondary button label"
                      value={secondaryButtonLabel}
                      onChange={setSecondaryButtonLabel}
                      autoComplete="off"
                    />
                    <input
                      type="hidden"
                      name="secondaryButtonLabel"
                      value={secondaryButtonLabel}
                    />
                  </BlockStack>
                </Card>

                <Card>
                  <BlockStack gap="250">
                    <Text as="h3" variant="headingSm">
                      Layout and style
                    </Text>

                    <Select
                      label="Content alignment"
                      options={[
                        { label: "Left", value: "left" },
                        { label: "Center", value: "center" },
                        { label: "Right", value: "right" },
                      ]}
                      value={contentAlignment}
                      onChange={setContentAlignment}
                    />
                    <input
                      type="hidden"
                      name="contentAlignment"
                      value={contentAlignment}
                    />

                    <Select
                      label="Background preset"
                      options={[
                        { label: "Midnight gold", value: "midnight" },
                        { label: "Champagne glow", value: "champagne" },
                        { label: "Charcoal luxe", value: "charcoal" },
                      ]}
                      value={backgroundPreset}
                      onChange={setBackgroundPreset}
                    />
                    <input
                      type="hidden"
                      name="backgroundPreset"
                      value={backgroundPreset}
                    />

                    <RangeSlider
                      label="Overlay opacity"
                      value={overlayOpacity}
                      onChange={setOverlayOpacity}
                      min={0}
                      max={80}
                      step={1}
                      output
                    />
                    <input
                      type="hidden"
                      name="overlayOpacity"
                      value={String(overlayOpacity)}
                    />
                  </BlockStack>
                </Card>

                <Card>
                  <BlockStack gap="250">
                    <Text as="h3" variant="headingSm">
                      Responsive sizing
                    </Text>

                    <RangeSlider
                      label="Desktop section height"
                      value={desktopHeight}
                      onChange={setDesktopHeight}
                      min={420}
                      max={760}
                      step={20}
                      output
                    />
                    <input
                      type="hidden"
                      name="desktopHeight"
                      value={String(desktopHeight)}
                    />

                    <RangeSlider
                      label="Mobile section height"
                      value={mobileHeight}
                      onChange={setMobileHeight}
                      min={360}
                      max={680}
                      step={20}
                      output
                    />
                    <input
                      type="hidden"
                      name="mobileHeight"
                      value={String(mobileHeight)}
                    />
                  </BlockStack>
                </Card>

                <Card>
                  <InlineStack align="space-between" blockAlign="center" wrap>
                    <Text as="p" variant="bodySm" tone="subdued">
                      Save stores the current hero setup as the app-managed
                      version for this block.
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
                      minHeight: "760px",
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
                          position: "relative",
                          minHeight: `${previewHeight}px`,
                          borderRadius: "30px",
                          overflow: "hidden",
                          background: getBackgroundStyle(backgroundPreset),
                          boxShadow: "0 22px 46px rgba(15, 23, 42, 0.18)",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: `rgba(15, 23, 42, ${overlayOpacity / 100})`,
                          }}
                        />

                        <div
                          style={{
                            position: "absolute",
                            right: isMobile ? "-50px" : "4%",
                            top: isMobile ? "auto" : "12%",
                            bottom: isMobile ? "-70px" : "auto",
                            width: isMobile ? "180px" : "320px",
                            height: isMobile ? "180px" : "320px",
                            borderRadius: "999px",
                            background:
                              "radial-gradient(circle, rgba(248,231,176,0.34) 0%, rgba(248,231,176,0.10) 38%, rgba(248,231,176,0) 72%)",
                            filter: "blur(10px)",
                          }}
                        />

                        <div
                          style={{
                            position: "relative",
                            zIndex: 1,
                            width: "100%",
                            minHeight: `${previewHeight}px`,
                            display: "flex",
                            justifyContent: horizontalAlignment,
                            alignItems: "center",
                            padding: isMobile ? "28px" : "48px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              maxWidth: contentMaxWidth,
                              textAlign: textAlignment,
                            }}
                          >
                            <div
                              style={{
                                display: "inline-flex",
                                padding: "7px 12px",
                                borderRadius: "999px",
                                background: "rgba(248, 231, 176, 0.16)",
                                color: "#f8e7b0",
                                fontSize: "12px",
                                fontWeight: 700,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                marginBottom: "18px",
                              }}
                            >
                              {badgeText || "Premium storefront"}
                            </div>

                            <div
                              style={{
                                fontSize: titleSize,
                                lineHeight: 1.02,
                                fontWeight: 700,
                                color: "#ffffff",
                                marginBottom: "16px",
                                maxWidth: isMobile ? "100%" : "680px",
                              }}
                            >
                              {heading || "Your hero heading"}
                            </div>

                            <div
                              style={{
                                fontSize: bodySize,
                                lineHeight: 1.7,
                                color: "rgba(255,255,255,0.84)",
                                marginBottom: "28px",
                                maxWidth: isMobile ? "100%" : "620px",
                              }}
                            >
                              {subheading || "Your hero subheading"}
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: isMobile ? "column" : "row",
                                gap: "14px",
                                justifyContent:
                                  contentAlignment === "center"
                                    ? "center"
                                    : contentAlignment === "right"
                                      ? "flex-end"
                                      : "flex-start",
                                alignItems: isMobile ? "stretch" : "center",
                              }}
                            >
                              <div
                                style={{
                                  minHeight: "50px",
                                  padding: "0 24px",
                                  borderRadius: "999px",
                                  background: "#f8e7b0",
                                  color: "#1f2937",
                                  fontWeight: 700,
                                  fontSize: "14px",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {primaryButtonLabel || "Primary action"}
                              </div>

                              <div
                                style={{
                                  minHeight: "50px",
                                  padding: "0 24px",
                                  borderRadius: "999px",
                                  border: "1px solid rgba(255,255,255,0.22)",
                                  color: "#ffffff",
                                  fontWeight: 600,
                                  fontSize: "14px",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {secondaryButtonLabel || "Secondary action"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>

                <Text as="p" variant="bodySm" tone="subdued">
                  Preview stays stable on the right while the merchant edits the
                  hero section on the left.
                </Text>
              </BlockStack>
            </Card>
          </div>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}