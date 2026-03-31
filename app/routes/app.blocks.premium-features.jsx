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
  getPremiumFeaturesSettings,
  normalizePremiumFeaturesSettings,
  savePremiumFeaturesMetaobject,
} from "../premium-features-metaobject.server";

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

  if (sectionStyle === "dark") {
    return {
      background: "#0f172a",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      boxShadow: "0 18px 34px rgba(15, 23, 42, 0.18)",
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

  if (sectionStyle === "dark") {
    return {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
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

function getIconToneFromSectionStyle(sectionStyle) {
  if (sectionStyle === "dark") {
    return "charcoal";
  }

  if (sectionStyle === "light") {
    return "gold";
  }

  return "gold";
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

  const savedSettings = await getPremiumFeaturesSettings(admin);

  return {
    currentPlanLabel: PLAN_LABELS[currentPlanStatus.planKey],
    activeThemeName: activeThemeStatus.theme?.name ?? null,
    activeThemeId: activeThemeStatus.themeId,
    onboardingLinks,
    savedSettings,
  };
}

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();

  try {
    const normalizedSettings = normalizePremiumFeaturesSettings({
      heading: formData.get("heading"),
      subheading: formData.get("subheading"),
      sectionStyle: formData.get("sectionStyle"),
      headingAlignment: formData.get("headingAlignment"),
      desktopColumns: formData.get("desktopColumns"),
      feature1Icon: formData.get("feature1Icon"),
      feature1Title: formData.get("feature1Title"),
      feature1Text: formData.get("feature1Text"),
      feature2Icon: formData.get("feature2Icon"),
      feature2Title: formData.get("feature2Title"),
      feature2Text: formData.get("feature2Text"),
      feature3Icon: formData.get("feature3Icon"),
      feature3Title: formData.get("feature3Title"),
      feature3Text: formData.get("feature3Text"),
      feature4Icon: formData.get("feature4Icon"),
      feature4Title: formData.get("feature4Title"),
      feature4Text: formData.get("feature4Text"),
    });

    const saved = await savePremiumFeaturesMetaobject(admin, normalizedSettings);

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
          : "Failed to save Premium Features settings.",
    };
  }
}

export default function PremiumFeaturesEditorRoute() {
  const {
    currentPlanLabel,
    activeThemeName,
    activeThemeId,
    onboardingLinks,
    savedSettings,
  } = useLoaderData();

  const fetcher = useFetcher();
  const [device, setDevice] = useState("desktop");

  const [heading, setHeading] = useState(savedSettings.heading);
  const [subheading, setSubheading] = useState(savedSettings.subheading);
  const [sectionStyle, setSectionStyle] = useState(savedSettings.sectionStyle);
  const [headingAlignment, setHeadingAlignment] = useState(
    savedSettings.headingAlignment,
  );
  const [desktopColumns, setDesktopColumns] = useState(
    savedSettings.desktopColumns,
  );

  const [feature1Icon, setFeature1Icon] = useState(savedSettings.feature1Icon);
  const [feature1Title, setFeature1Title] = useState(savedSettings.feature1Title);
  const [feature1Text, setFeature1Text] = useState(savedSettings.feature1Text);

  const [feature2Icon, setFeature2Icon] = useState(savedSettings.feature2Icon);
  const [feature2Title, setFeature2Title] = useState(savedSettings.feature2Title);
  const [feature2Text, setFeature2Text] = useState(savedSettings.feature2Text);

  const [feature3Icon, setFeature3Icon] = useState(savedSettings.feature3Icon);
  const [feature3Title, setFeature3Title] = useState(savedSettings.feature3Title);
  const [feature3Text, setFeature3Text] = useState(savedSettings.feature3Text);

  const [feature4Icon, setFeature4Icon] = useState(savedSettings.feature4Icon);
  const [feature4Title, setFeature4Title] = useState(savedSettings.feature4Title);
  const [feature4Text, setFeature4Text] = useState(savedSettings.feature4Text);

  const [topPadding, setTopPadding] = useState(30);
  const [bottomPadding, setBottomPadding] = useState(30);
  const [saveMessage, setSaveMessage] = useState("Saved values loaded");

  useEffect(() => {
    if (fetcher.state !== "idle") {
      return;
    }

    if (fetcher.data?.ok) {
      setSaveMessage("Saved");
    }

    if (fetcher.data?.ok === false) {
      setSaveMessage(fetcher.data.error || "Save failed");
    }
  }, [fetcher.state, fetcher.data]);

  const themeEditorUrl =
    onboardingLinks.find((item) => item.key === "premium-features")?.url ?? null;

  const isSaving = fetcher.state !== "idle";
  const isMobile = device === "mobile";
  const isTablet = device === "tablet";

  const previewWidth = getDeviceWidth(device);
  const previewColumns = isMobile
    ? "1fr"
    : isTablet
      ? "repeat(2, minmax(0, 1fr))"
      : `repeat(${desktopColumns}, minmax(0, 1fr))`;

  const textAlign =
    headingAlignment === "center"
      ? "center"
      : headingAlignment === "right"
        ? "right"
        : "left";

  const contentJustify =
    headingAlignment === "center"
      ? "center"
      : headingAlignment === "right"
        ? "flex-end"
        : "flex-start";

  const sectionSurface = getSectionSurface(sectionStyle);
  const cardSurface = getCardSurface(sectionStyle);
  const iconTone = getIconToneFromSectionStyle(sectionStyle);
  const headingColor = sectionStyle === "dark" ? "#f8fafc" : "#111827";
  const textColor = sectionStyle === "dark" ? "rgba(248,250,252,0.72)" : "#6b7280";

  const cards = [
    { icon: feature1Icon, title: feature1Title, text: feature1Text },
    { icon: feature2Icon, title: feature2Title, text: feature2Text },
    { icon: feature3Icon, title: feature3Title, text: feature3Text },
    { icon: feature4Icon, title: feature4Title, text: feature4Text },
  ].filter((card) => card.title || card.text);

  return (
    <Page
      title="Feature Highlights Grid"
      subtitle="Short setup on top, editor on the left, stable preview on the right."
    >
      <BlockStack gap="400">
        <Card>
          <InlineGrid columns={{ xs: 1, lg: "1.25fr auto" }} gap="300">
            <BlockStack gap="200">
              <BlockStack gap="100">
                <InlineStack gap="200" blockAlign="center" wrap>
                  <Text as="h1" variant="headingLg">
                    Feature Highlights Grid
                  </Text>
                  <Badge tone="success">{currentPlanLabel}</Badge>
                </InlineStack>

                <Text as="p" variant="bodyMd" tone="subdued">
                  Two actions only: connect the block in Shopify, then edit the
                  feature grid inside Luxe Sections Studio.
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
                  <Button>Back to Blocks</Button>
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
                    Content, card structure, spacing, and responsive polish stay
                    here.
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
          <fetcher.Form method="post">
            <Card>
              <BlockStack gap="300">
                <BlockStack gap="050">
                  <InlineStack align="space-between" blockAlign="center" wrap>
                    <Text as="h2" variant="headingMd">
                      Editor controls
                    </Text>
                    <Badge tone={saveMessage === "Saved" ? "success" : "info"}>
                      {isSaving ? "Saving..." : saveMessage}
                    </Badge>
                  </InlineStack>

                  <Text as="p" variant="bodySm" tone="subdued">
                    Keep the feature grid simple: heading, cards, layout, spacing,
                    and premium visual polish in one editor panel.
                  </Text>
                </BlockStack>

                <Box
                  padding="300"
                  borderRadius="300"
                  background="bg-surface-secondary"
                >
                  <BlockStack gap="250">
                    <Text as="h3" variant="headingSm">
                      Section content
                    </Text>

                    <TextField
                      label="Heading"
                      value={heading}
                      onChange={setHeading}
                      autoComplete="off"
                    />
                    <input type="hidden" name="heading" value={heading} />

                    <TextField
                      label="Subheading"
                      value={subheading}
                      onChange={setSubheading}
                      multiline={3}
                      autoComplete="off"
                    />
                    <input type="hidden" name="subheading" value={subheading} />
                  </BlockStack>
                </Box>

                <Box
                  padding="300"
                  borderRadius="300"
                  background="bg-surface-secondary"
                >
                  <BlockStack gap="250">
                    <Text as="h3" variant="headingSm">
                      Feature cards
                    </Text>

                    <Select
                      label="Card 1 icon"
                      options={[
                        { label: "Check", value: "check" },
                        { label: "Star", value: "star" },
                        { label: "Shield", value: "shield" },
                        { label: "Sparkles", value: "sparkles" },
                        { label: "Leaf", value: "leaf" },
                        { label: "Crown", value: "crown" },
                      ]}
                      value={feature1Icon}
                      onChange={setFeature1Icon}
                    />
                    <input type="hidden" name="feature1Icon" value={feature1Icon} />

                    <TextField
                      label="Card 1 title"
                      value={feature1Title}
                      onChange={setFeature1Title}
                      autoComplete="off"
                    />
                    <input
                      type="hidden"
                      name="feature1Title"
                      value={feature1Title}
                    />

                    <TextField
                      label="Card 1 text"
                      value={feature1Text}
                      onChange={setFeature1Text}
                      multiline={3}
                      autoComplete="off"
                    />
                    <input type="hidden" name="feature1Text" value={feature1Text} />

                    <Select
                      label="Card 2 icon"
                      options={[
                        { label: "Check", value: "check" },
                        { label: "Star", value: "star" },
                        { label: "Shield", value: "shield" },
                        { label: "Sparkles", value: "sparkles" },
                        { label: "Leaf", value: "leaf" },
                        { label: "Crown", value: "crown" },
                      ]}
                      value={feature2Icon}
                      onChange={setFeature2Icon}
                    />
                    <input type="hidden" name="feature2Icon" value={feature2Icon} />

                    <TextField
                      label="Card 2 title"
                      value={feature2Title}
                      onChange={setFeature2Title}
                      autoComplete="off"
                    />
                    <input
                      type="hidden"
                      name="feature2Title"
                      value={feature2Title}
                    />

                    <TextField
                      label="Card 2 text"
                      value={feature2Text}
                      onChange={setFeature2Text}
                      multiline={3}
                      autoComplete="off"
                    />
                    <input type="hidden" name="feature2Text" value={feature2Text} />

                    <Select
                      label="Card 3 icon"
                      options={[
                        { label: "Check", value: "check" },
                        { label: "Star", value: "star" },
                        { label: "Shield", value: "shield" },
                        { label: "Sparkles", value: "sparkles" },
                        { label: "Leaf", value: "leaf" },
                        { label: "Crown", value: "crown" },
                      ]}
                      value={feature3Icon}
                      onChange={setFeature3Icon}
                    />
                    <input type="hidden" name="feature3Icon" value={feature3Icon} />

                    <TextField
                      label="Card 3 title"
                      value={feature3Title}
                      onChange={setFeature3Title}
                      autoComplete="off"
                    />
                    <input
                      type="hidden"
                      name="feature3Title"
                      value={feature3Title}
                    />

                    <TextField
                      label="Card 3 text"
                      value={feature3Text}
                      onChange={setFeature3Text}
                      multiline={3}
                      autoComplete="off"
                    />
                    <input type="hidden" name="feature3Text" value={feature3Text} />

                    <Select
                      label="Card 4 icon"
                      options={[
                        { label: "Check", value: "check" },
                        { label: "Star", value: "star" },
                        { label: "Shield", value: "shield" },
                        { label: "Sparkles", value: "sparkles" },
                        { label: "Leaf", value: "leaf" },
                        { label: "Crown", value: "crown" },
                      ]}
                      value={feature4Icon}
                      onChange={setFeature4Icon}
                    />
                    <input type="hidden" name="feature4Icon" value={feature4Icon} />

                    <TextField
                      label="Card 4 title"
                      value={feature4Title}
                      onChange={setFeature4Title}
                      autoComplete="off"
                    />
                    <input
                      type="hidden"
                      name="feature4Title"
                      value={feature4Title}
                    />

                    <TextField
                      label="Card 4 text"
                      value={feature4Text}
                      onChange={setFeature4Text}
                      multiline={3}
                      autoComplete="off"
                    />
                    <input type="hidden" name="feature4Text" value={feature4Text} />
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
                      ]}
                      value={headingAlignment}
                      onChange={setHeadingAlignment}
                    />
                    <input
                      type="hidden"
                      name="headingAlignment"
                      value={headingAlignment}
                    />

                    <Select
                      label="Section style"
                      options={[
                        { label: "Light", value: "light" },
                        { label: "Soft card", value: "soft" },
                        { label: "Luxe highlight", value: "luxe" },
                        { label: "Dark", value: "dark" },
                      ]}
                      value={sectionStyle}
                      onChange={setSectionStyle}
                    />
                    <input type="hidden" name="sectionStyle" value={sectionStyle} />

                    <Select
                      label="Desktop columns"
                      options={[
                        { label: "2 columns", value: "2" },
                        { label: "3 columns", value: "3" },
                      ]}
                      value={desktopColumns}
                      onChange={setDesktopColumns}
                    />
                    <input
                      type="hidden"
                      name="desktopColumns"
                      value={desktopColumns}
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
                      Preview spacing only
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

                    <Text as="p" variant="bodySm" tone="subdued">
                      Real storefront spacing stays minimal in Shopify Theme Editor.
                      Main content and design stay here in the app.
                    </Text>
                  </BlockStack>
                </Box>

                <InlineStack align="space-between" blockAlign="center" wrap>
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

                  <Button submit variant="primary" loading={isSaving}>
                    Save
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </fetcher.Form>

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
                            justifyContent: contentJustify,
                            marginBottom: "10px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: isMobile ? "24px" : "32px",
                              lineHeight: 1.15,
                              fontWeight: 700,
                              color: headingColor,
                              textAlign,
                              maxWidth: isMobile ? "100%" : "680px",
                            }}
                          >
                            {heading ||
                              "Feature highlights your customers can scan fast"}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: contentJustify,
                            marginBottom: "22px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: isMobile ? "14px" : "15px",
                              lineHeight: 1.65,
                              color: textColor,
                              textAlign,
                              maxWidth: isMobile ? "100%" : "700px",
                            }}
                          >
                            {subheading ||
                              "Present the strongest benefits of your products in a cleaner feature grid."}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: previewColumns,
                            gap: "14px",
                          }}
                        >
                          {cards.map((card, index) => (
                            <div
                              key={`${card.title}-${index}`}
                              style={{
                                borderRadius: "20px",
                                padding: isMobile ? "16px" : "20px",
                                ...cardSurface,
                              }}
                            >
                              <div
                                style={{
                                  width: "42px",
                                  height: "42px",
                                  borderRadius: "14px",
                                  background: getIconBackground(iconTone),
                                  marginBottom: "14px",
                                }}
                              />

                              <div
                                style={{
                                  fontSize: "15px",
                                  lineHeight: 1.4,
                                  color: headingColor,
                                  fontWeight: 700,
                                  marginBottom: "8px",
                                }}
                              >
                                {card.title || "Feature title"}
                              </div>

                              <div
                                style={{
                                  fontSize: "13px",
                                  lineHeight: 1.65,
                                  color: textColor,
                                }}
                              >
                                {card.text || "Feature description"}
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
                  stable while the merchant edits the feature grid.
                </Text>
              </BlockStack>
            </Card>
          </div>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}