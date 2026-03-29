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

function getSectionSurface(sectionStyle) {
  if (sectionStyle === "soft") {
    return {
      background: "#ffffff",
      border: "1px solid rgba(15, 23, 42, 0.08)",
      boxShadow: "0 18px 34px rgba(15, 23, 42, 0.08)",
    };
  }

  if (sectionStyle === "luxe") {
    return {
      background:
        "linear-gradient(180deg, #fffdf8 0%, #ffffff 42%, #f8fafc 100%)",
      border: "1px solid rgba(124, 92, 43, 0.14)",
      boxShadow: "0 20px 38px rgba(15, 23, 42, 0.08)",
    };
  }

  return {
    background: "#f8fafc",
    border: "1px solid rgba(15, 23, 42, 0.06)",
    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.04)",
  };
}

function getCardSurface(sectionStyle) {
  if (sectionStyle === "soft") {
    return {
      background: "#f8fafc",
      border: "1px solid rgba(15, 23, 42, 0.06)",
    };
  }

  if (sectionStyle === "luxe") {
    return {
      background: "#ffffff",
      border: "1px solid rgba(124, 92, 43, 0.12)",
    };
  }

  return {
    background: "#ffffff",
    border: "1px solid rgba(15, 23, 42, 0.05)",
  };
}

function getIconBackground(iconTone) {
  if (iconTone === "gold") {
    return "linear-gradient(135deg, #f8e7b0 0%, #e8c56f 100%)";
  }

  if (iconTone === "charcoal") {
    return "linear-gradient(135deg, #111827 0%, #374151 100%)";
  }

  return "linear-gradient(135deg, #0f172a 0%, #1f2937 70%, #7c5c2b 100%)";
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

export default function TrustBarEditorRoute() {
  const { currentPlanLabel, activeThemeName, activeThemeId, onboardingLinks } =
    useLoaderData();

  const [device, setDevice] = useState("desktop");
  const [heading, setHeading] = useState("Why customers trust your store");
  const [subheading, setSubheading] = useState(
    "Highlight reassurance points in a cleaner section that helps shoppers feel more confident before they buy.",
  );
  const [itemOne, setItemOne] = useState("Fast tracked delivery");
  const [itemTwo, setItemTwo] = useState("Secure checkout");
  const [itemThree, setItemThree] = useState("Easy support access");
  const [headingAlignment, setHeadingAlignment] = useState("center");
  const [sectionStyle, setSectionStyle] = useState("luxe");
  const [desktopColumns, setDesktopColumns] = useState("3");
  const [topPadding, setTopPadding] = useState(28);
  const [bottomPadding, setBottomPadding] = useState(28);
  const [iconTone, setIconTone] = useState("midnight");

  const themeEditorUrl =
    onboardingLinks.find((item) => item.url)?.url ?? null;

  const isMobile = device === "mobile";
  const isTablet = device === "tablet";

  const previewWidth = getDeviceWidth(device);
  const previewColumns = isMobile
    ? "1fr"
    : isTablet
      ? "repeat(2, minmax(0, 1fr))"
      : `repeat(${desktopColumns}, minmax(0, 1fr))`;

  const textAlignment =
    headingAlignment === "center"
      ? "center"
      : headingAlignment === "right"
        ? "right"
        : "left";

  const contentAlignment =
    headingAlignment === "center"
      ? "center"
      : headingAlignment === "right"
        ? "flex-end"
        : "flex-start";

  const sectionSurface = getSectionSurface(sectionStyle);
  const cardSurface = getCardSurface(sectionStyle);
  const trustItems = [itemOne, itemTwo, itemThree].filter(Boolean);

  return (
    <Page
      title="Store Trust Highlights"
      subtitle="Short setup on top, editor on the left, stable preview on the right."
    >
      <BlockStack gap="400">
        <Card>
          <InlineGrid columns={{ xs: 1, lg: "1.25fr auto" }} gap="300">
            <BlockStack gap="200">
              <BlockStack gap="100">
                <InlineStack gap="200" blockAlign="center" wrap>
                  <Text as="h1" variant="headingLg">
                    Store Trust Highlights
                  </Text>
                  <Badge tone="success">{currentPlanLabel}</Badge>
                </InlineStack>

                <Text as="p" variant="bodyMd" tone="subdued">
                  Two actions only: connect the block in Shopify, then edit the
                  trust section inside Luxe Sections Studio.
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
                    Content, layout, spacing, and responsive polish stay here.
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
                  Keep the trust block simple: message, layout, spacing, and visual polish in one editor panel.
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
                    label="Heading"
                    value={heading}
                    onChange={setHeading}
                    autoComplete="off"
                  />

                  <TextField
                    label="Subheading"
                    value={subheading}
                    onChange={setSubheading}
                    multiline={3}
                    autoComplete="off"
                  />

                  <TextField
                    label="Trust item 1"
                    value={itemOne}
                    onChange={setItemOne}
                    autoComplete="off"
                  />

                  <TextField
                    label="Trust item 2"
                    value={itemTwo}
                    onChange={setItemTwo}
                    autoComplete="off"
                  />

                  <TextField
                    label="Trust item 3"
                    value={itemThree}
                    onChange={setItemThree}
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
                    label="Heading alignment"
                    options={[
                      { label: "Left", value: "left" },
                      { label: "Center", value: "center" },
                      { label: "Right", value: "right" },
                    ]}
                    value={headingAlignment}
                    onChange={setHeadingAlignment}
                  />

                  <Select
                    label="Section style"
                    options={[
                      { label: "Minimal", value: "minimal" },
                      { label: "Soft card", value: "soft" },
                      { label: "Luxe highlight", value: "luxe" },
                    ]}
                    value={sectionStyle}
                    onChange={setSectionStyle}
                  />

                  <Select
                    label="Desktop columns"
                    options={[
                      { label: "2 columns", value: "2" },
                      { label: "3 columns", value: "3" },
                    ]}
                    value={desktopColumns}
                    onChange={setDesktopColumns}
                  />

                  <Select
                    label="Icon tone"
                    options={[
                      { label: "Midnight gold", value: "midnight" },
                      { label: "Soft gold", value: "gold" },
                      { label: "Charcoal", value: "charcoal" },
                    ]}
                    value={iconTone}
                    onChange={setIconTone}
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
                    Responsive spacing
                  </Text>

                  <RangeSlider
                    label="Top padding"
                    value={topPadding}
                    onChange={setTopPadding}
                    min={12}
                    max={72}
                    step={2}
                    output
                  />

                  <RangeSlider
                    label="Bottom padding"
                    value={bottomPadding}
                    onChange={setBottomPadding}
                    min={12}
                    max={72}
                    step={2}
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
                          borderRadius: "28px",
                          paddingTop: `${topPadding}px`,
                          paddingBottom: `${bottomPadding}px`,
                          paddingLeft: isMobile ? "18px" : "28px",
                          paddingRight: isMobile ? "18px" : "28px",
                          ...sectionSurface,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: contentAlignment,
                            marginBottom: "10px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: isMobile ? "24px" : "30px",
                              lineHeight: 1.15,
                              fontWeight: 700,
                              color: "#111827",
                              textAlign,
                              maxWidth: isMobile ? "100%" : "620px",
                            }}
                          >
                            {heading || "Why customers trust your store"}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: contentAlignment,
                            marginBottom: "22px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: isMobile ? "14px" : "15px",
                              lineHeight: 1.65,
                              color: "#6b7280",
                              textAlign,
                              maxWidth: isMobile ? "100%" : "640px",
                            }}
                          >
                            {subheading ||
                              "Add reassurance messaging that helps shoppers feel more confident."}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: previewColumns,
                            gap: "14px",
                          }}
                        >
                          {trustItems.map((item, index) => (
                            <div
                              key={`${item}-${index}`}
                              style={{
                                borderRadius: "20px",
                                padding: isMobile ? "16px" : "18px",
                                ...cardSurface,
                              }}
                            >
                              <div
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "12px",
                                  background: getIconBackground(iconTone),
                                  marginBottom: "12px",
                                }}
                              />

                              <div
                                style={{
                                  fontSize: "14px",
                                  lineHeight: 1.55,
                                  color: "#111827",
                                  fontWeight: 600,
                                }}
                              >
                                {item}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>

                <Text as="p" variant="bodySm" tone="subdued">
                  Preview stays fixed on the right so device switching feels
                  stable while the merchant edits the trust block.
                </Text>
              </BlockStack>
            </Card>
          </div>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}