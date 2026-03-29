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
      subtitle="Short setup on top, editor on the left, stable preview on the right."
    >
      <BlockStack gap="400">
        <Card>
          <InlineGrid columns={{ xs: 1, lg: "1.25fr auto" }} gap="300">
            <BlockStack gap="200">
              <BlockStack gap="100">
                <InlineStack gap="200" blockAlign="center" wrap>
                  <Text as="h1" variant="headingLg">
                    Premium Hero Banner
                  </Text>
                  <Badge tone="success">{currentPlanLabel}</Badge>
                </InlineStack>

                <Text as="p" variant="bodyMd" tone="subdued">
                  Two actions only: connect the block in Shopify, then edit the
                  full hero experience inside Luxe Sections Studio.
                </Text>
              </BlockStack>

              <InlineStack gap="200" wrap>
                {themeEditorUrl ? (
                  <Button
                    variant="primary"
                    onClick={() => openInTopWindow(themeEditorUrl)}
                  >
                    Connect in Shopify
                  </Button>
                ) : (
                  <Button variant="primary" disabled>
                    Connect in Shopify
                  </Button>
                )}

                <Link to="/app/blocks" style={{ textDecoration: "none" }}>
                  <Button>Edit inside app</Button>
                </Link>
              </InlineStack>
            </BlockStack>

            <BlockStack gap="150">
              <Box
                padding="300"
                borderRadius="300"
                background="bg-surface-secondary"
              >
                <BlockStack gap="050">
                  <Text as="p" variant="bodySm" fontWeight="semibold">
                    1 · Connect in Shopify
                  </Text>
                  <Text as="p" variant="bodySm" tone="subdued">
                    Add the block to the template and turn it on.
                  </Text>
                </BlockStack>
              </Box>

              <Box
                padding="300"
                borderRadius="300"
                background="bg-surface-secondary"
              >
                <BlockStack gap="050">
                  <Text as="p" variant="bodySm" fontWeight="semibold">
                    2 · Edit inside Luxe Sections Studio
                  </Text>
                  <Text as="p" variant="bodySm" tone="subdued">
                    Content, layout, spacing, and mobile tuning stay here.
                  </Text>
                </BlockStack>
              </Box>

              <Text as="p" variant="bodySm" tone="subdued">
                Theme: {activeThemeName ?? "Not found"}{" "}
                {activeThemeId ? `(ID: ${activeThemeId})` : ""}
              </Text>
            </BlockStack>
          </InlineGrid>
        </Card>

        <InlineGrid columns={{ xs: 1, lg: "minmax(0, 1fr) 460px" }} gap="400">
          <Card>
            <BlockStack gap="300">
              <BlockStack gap="050">
                <InlineStack align="space-between" blockAlign="center" wrap>
                  <Text as="h2" variant="headingMd">
                    Editor controls
                  </Text>
                  <Badge tone="success">Editor ready</Badge>
                </InlineStack>

                <Text as="p" variant="bodySm" tone="subdued">
                  Everything important stays in one clean editor panel for faster
                  merchant editing.
                </Text>
              </BlockStack>

              <Box
                padding="300"
                borderRadius="300"
                background="bg-surface-secondary"
              >
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
              </Box>

              <Box
                padding="300"
                borderRadius="300"
                background="bg-surface-secondary"
              >
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
                </BlockStack>
              </Box>

              <Box
                padding="300"
                borderRadius="300"
                background="bg-surface-secondary"
              >
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
              </Box>

              <InlineStack gap="200" wrap>
                <Link to="/app/blocks" style={{ textDecoration: "none" }}>
                  <Button>Back to Blocks</Button>
                </Link>

                {themeEditorUrl ? (
                  <Button onClick={() => openInTopWindow(themeEditorUrl)}>
                    Open Theme Editor
                  </Button>
                ) : (
                  <Button disabled>Open Theme Editor</Button>
                )}
              </InlineStack>
            </BlockStack>
          </Card>

          <div style={{ position: "sticky", top: "24px" }}>
            <Card>
              <BlockStack gap="300">
                <InlineStack align="space-between" blockAlign="center">
                  <Text as="h2" variant="headingMd">
                    Live preview
                  </Text>
                  <Badge tone="attention">{device}</Badge>
                </InlineStack>

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
                        transition: "width 160ms ease",
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
                  Preview stays fixed on the right so device switching feels
                  stable while the merchant edits the hero block.
                </Text>
              </BlockStack>
            </Card>
          </div>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}