import { Link, useLoaderData } from "react-router";
import { useState } from "react";
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

function getBackgroundStyle(preset) {
  if (preset === "champagne") {
    return "linear-gradient(135deg, #2f2417 0%, #6f5631 45%, #d4b47a 100%)";
  }

  if (preset === "charcoal") {
    return "linear-gradient(135deg, #111827 0%, #1f2937 55%, #4b5563 100%)";
  }

  return "linear-gradient(135deg, #0f172a 0%, #1f2937 58%, #8a6a2f 100%)";
}

export async function loader({ request }) {
  const currentPlanStatus = await getCurrentPlanFromRequest(request);
  const activeThemeStatus = await getActiveThemeFromRequest(request);
  const onboardingLinks = getThemeEditorOnboardingLinks(
    activeThemeStatus.shop,
    activeThemeStatus.themeId,
  );

  return {
    currentPlanLabel: PLAN_LABELS[currentPlanStatus.planKey],
    activeThemeName: activeThemeStatus.theme?.name ?? null,
    activeThemeId: activeThemeStatus.themeId,
    onboardingLinks,
  };
}

export default function LuxeHeroEditorRoute() {
  const { currentPlanLabel, activeThemeName, activeThemeId, onboardingLinks } =
    useLoaderData();

  const [device, setDevice] = useState("desktop");
  const [badgeText, setBadgeText] = useState("Premium storefront");
  const [heading, setHeading] = useState(
    "A cleaner, sharper first impression for your Shopify store",
  );
  const [subheading, setSubheading] = useState(
    "Show a stronger brand message, clear value, and a more premium visual style without needing to touch code.",
  );
  const [primaryButtonLabel, setPrimaryButtonLabel] =
    useState("Shop the collection");
  const [secondaryButtonLabel, setSecondaryButtonLabel] =
    useState("Learn more");
  const [contentAlignment, setContentAlignment] = useState("left");
  const [backgroundPreset, setBackgroundPreset] = useState("midnight");
  const [overlayOpacity, setOverlayOpacity] = useState(34);
  const [desktopHeight, setDesktopHeight] = useState(560);
  const [mobileHeight, setMobileHeight] = useState(460);

  const themeEditorUrl =
    onboardingLinks.find((item) => item.url)?.url ?? null;

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

  const titleSize = isMobile ? "28px" : isTablet ? "36px" : "44px";
  const bodySize = isMobile ? "14px" : "16px";
  const contentMaxWidth = isMobile ? "100%" : "620px";

  return (
    <Page
      title="Premium Hero Banner"
      subtitle="First dedicated block editor with left-side controls and live preview on the right."
    >
      <BlockStack gap="500">
        <Card>
          <InlineStack align="space-between" blockAlign="center">
            <BlockStack gap="100">
              <Text as="h2" variant="headingLg">
                Premium Hero Banner editor
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                Edit the main hero experience inside the app, then use Shopify
                Theme Editor only for placement and activation.
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Active theme: {activeThemeName ?? "Not found"}
                {activeThemeId ? ` (ID: ${activeThemeId})` : ""}
              </Text>
            </BlockStack>

            <Badge tone="success">{currentPlanLabel}</Badge>
          </InlineStack>
        </Card>

        <InlineGrid columns={{ xs: 1, lg: "0.95fr 1.05fr" }} gap="400">
          <BlockStack gap="400">
            <Card>
              <BlockStack gap="300">
                <Text as="h2" variant="headingMd">
                  Content
                </Text>

                <TextField
                  label="Badge label"
                  value={badgeText}
                  onChange={setBadgeText}
                  autoComplete="off"
                />

                <TextField
                  label="Heading"
                  value={heading}
                  onChange={setHeading}
                  multiline={2}
                  autoComplete="off"
                />

                <TextField
                  label="Subheading"
                  value={subheading}
                  onChange={setSubheading}
                  multiline={4}
                  autoComplete="off"
                />

                <TextField
                  label="Primary button label"
                  value={primaryButtonLabel}
                  onChange={setPrimaryButtonLabel}
                  autoComplete="off"
                />

                <TextField
                  label="Secondary button label"
                  value={secondaryButtonLabel}
                  onChange={setSecondaryButtonLabel}
                  autoComplete="off"
                />
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="300">
                <Text as="h2" variant="headingMd">
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

                <RangeSlider
                  label="Overlay opacity"
                  value={overlayOpacity}
                  onChange={setOverlayOpacity}
                  min={0}
                  max={80}
                  step={1}
                  output
                />

                <RangeSlider
                  label="Desktop section height"
                  value={desktopHeight}
                  onChange={setDesktopHeight}
                  min={420}
                  max={760}
                  step={20}
                  output
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
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="300">
                <Text as="h2" variant="headingMd">
                  Preview device
                </Text>

                <InlineStack gap="200">
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
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="250">
                <Text as="h2" variant="headingMd">
                  Theme connection
                </Text>

                <Text as="p" variant="bodyMd" tone="subdued">
                  The main editing experience is here. Use Theme Editor only to
                  place the hero block in the right template and turn it on.
                </Text>

                <InlineStack gap="200">
                  <Link to="/app/blocks" style={{ textDecoration: "none" }}>
                    <Button>Back to Blocks</Button>
                  </Link>

                  {themeEditorUrl ? (
                    <Button
                      variant="primary"
                      onClick={() => openInTopWindow(themeEditorUrl)}
                    >
                      Open Theme Editor
                    </Button>
                  ) : (
                    <Button disabled variant="primary">
                      Open Theme Editor
                    </Button>
                  )}
                </InlineStack>
              </BlockStack>
            </Card>
          </BlockStack>

          <Card>
            <BlockStack gap="300">
              <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingMd">
                  Live preview
                </Text>
                <Badge tone="attention">{device}</Badge>
              </InlineStack>

              <Box
                padding="300"
                background="bg-surface-secondary"
                borderRadius="300"
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: previewWidth,
                      maxWidth: "100%",
                      transition: "all 160ms ease",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        minHeight: `${previewHeight}px`,
                        borderRadius: "28px",
                        overflow: "hidden",
                        background: getBackgroundStyle(backgroundPreset),
                        boxShadow: "0 20px 44px rgba(15, 23, 42, 0.18)",
                        display: "flex",
                        alignItems: "stretch",
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
                          position: "relative",
                          zIndex: 1,
                          width: "100%",
                          display: "flex",
                          justifyContent: horizontalAlignment,
                          alignItems: "center",
                          padding: isMobile ? "28px" : "42px",
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
                              padding: "6px 12px",
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
                              lineHeight: 1.05,
                              fontWeight: 700,
                              color: "#ffffff",
                              marginBottom: "14px",
                            }}
                          >
                            {heading || "Your hero heading"}
                          </div>

                          <div
                            style={{
                              fontSize: bodySize,
                              lineHeight: 1.65,
                              color: "rgba(255,255,255,0.84)",
                              marginBottom: "24px",
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
                                minHeight: "48px",
                                padding: "0 22px",
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
                                minHeight: "48px",
                                padding: "0 22px",
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
                This is the first dedicated editor shell. Next we will connect
                Blocks Studio to this page and then continue building the same
                pattern for the other blocks.
              </Text>
            </BlockStack>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}