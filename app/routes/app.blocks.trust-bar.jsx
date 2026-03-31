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
  getTrustBarSettings,
  normalizeTrustBarSettings,
  saveTrustBarMetaobject,
} from "../trust-bar-metaobject.server";

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
  if (sectionStyle === "dark") {
    return {
      background: "#111827",
      sectionText: "#F9FAFB",
      cardBackground: "rgba(255,255,255,0.08)",
      cardBorder: "rgba(255,255,255,0.16)",
      mutedText: "rgba(249,250,251,0.72)",
    };
  }

  if (sectionStyle === "outline") {
    return {
      background: "#FFFFFF",
      sectionText: "#111827",
      cardBackground: "#FFFFFF",
      cardBorder: "rgba(17,24,39,0.14)",
      mutedText: "rgba(17,24,39,0.68)",
    };
  }

  return {
    background: "#F8F5F0",
    sectionText: "#1F2937",
    cardBackground: "rgba(255,255,255,0.78)",
    cardBorder: "rgba(17,24,39,0.08)",
    mutedText: "rgba(31,41,55,0.66)",
  };
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

  const savedSettings = await getTrustBarSettings(admin);

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
    const normalizedSettings = normalizeTrustBarSettings({
      heading: formData.get("heading"),
      headingAlignment: formData.get("headingAlignment"),
      sectionStyle: formData.get("sectionStyle"),
      desktopColumns: formData.get("desktopColumns"),
      paddingTop: formData.get("paddingTop"),
      paddingBottom: formData.get("paddingBottom"),
      item1Title: formData.get("item1Title"),
      item1Text: formData.get("item1Text"),
      item2Title: formData.get("item2Title"),
      item2Text: formData.get("item2Text"),
      item3Title: formData.get("item3Title"),
      item3Text: formData.get("item3Text"),
      item4Title: formData.get("item4Title"),
      item4Text: formData.get("item4Text"),
    });

    const saved = await saveTrustBarMetaobject(admin, normalizedSettings);

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
          : "Failed to save Trust Bar settings.",
    };
  }
}

export default function TrustBarEditorRoute() {
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
  const [headingAlignment, setHeadingAlignment] = useState(
    savedSettings.headingAlignment,
  );
  const [sectionStyle, setSectionStyle] = useState(savedSettings.sectionStyle);
  const [desktopColumns, setDesktopColumns] = useState(
    savedSettings.desktopColumns,
  );
  const [paddingTop, setPaddingTop] = useState(savedSettings.paddingTop);
  const [paddingBottom, setPaddingBottom] = useState(savedSettings.paddingBottom);
  const [item1Title, setItem1Title] = useState(savedSettings.item1Title);
  const [item1Text, setItem1Text] = useState(savedSettings.item1Text);
  const [item2Title, setItem2Title] = useState(savedSettings.item2Title);
  const [item2Text, setItem2Text] = useState(savedSettings.item2Text);
  const [item3Title, setItem3Title] = useState(savedSettings.item3Title);
  const [item3Text, setItem3Text] = useState(savedSettings.item3Text);
  const [item4Title, setItem4Title] = useState(savedSettings.item4Title);
  const [item4Text, setItem4Text] = useState(savedSettings.item4Text);
  const [saveMessage, setSaveMessage] = useState("Saved values loaded");

  function applySavedSettingsToEditor(nextSettings) {
    setHeading(nextSettings.heading);
    setHeadingAlignment(nextSettings.headingAlignment);
    setSectionStyle(nextSettings.sectionStyle);
    setDesktopColumns(nextSettings.desktopColumns);
    setPaddingTop(nextSettings.paddingTop);
    setPaddingBottom(nextSettings.paddingBottom);
    setItem1Title(nextSettings.item1Title);
    setItem1Text(nextSettings.item1Text);
    setItem2Title(nextSettings.item2Title);
    setItem2Text(nextSettings.item2Text);
    setItem3Title(nextSettings.item3Title);
    setItem3Text(nextSettings.item3Text);
    setItem4Title(nextSettings.item4Title);
    setItem4Text(nextSettings.item4Text);
  }

  useEffect(() => {
    if (fetcher.state !== "idle") {
      return;
    }

    if (fetcher.data?.ok) {
      if (fetcher.data.settings) {
        applySavedSettingsToEditor(fetcher.data.settings);
      }

      setSaveMessage("Saved");
    }

    if (fetcher.data?.ok === false) {
      setSaveMessage(fetcher.data.error || "Save failed");
    }
  }, [fetcher.state, fetcher.data]);

  const themeEditorUrl =
    onboardingLinks.find((item) => item.key === "trust-bar")?.url ??
    onboardingLinks.find((item) => item.url)?.url ??
    null;

  const isSaving = fetcher.state !== "idle";
  const isMobile = device === "mobile";
  const isTablet = device === "tablet";

  const previewWidth = getDeviceWidth(device);
  const previewColumns = isMobile
    ? "repeat(1, minmax(0, 1fr))"
    : isTablet
      ? "repeat(2, minmax(0, 1fr))"
      : `repeat(${desktopColumns}, minmax(0, 1fr))`;

  const textAlignment = headingAlignment === "center" ? "center" : "left";
  const contentAlignment =
    headingAlignment === "center" ? "center" : "flex-start";

  const sectionSurface = getSectionSurface(sectionStyle);

  const trustItems = [
    { title: item1Title, text: item1Text },
    { title: item2Title, text: item2Text },
    { title: item3Title, text: item3Text },
    { title: item4Title, text: item4Text },
  ].filter((item) => item.title || item.text);

  return (
    <Page>
      <BlockStack gap="400">
        <Card>
          <InlineGrid columns={{ xs: 1, lg: "1.25fr auto" }} gap="300">
            <BlockStack gap="200">
              <BlockStack gap="100">
                <InlineStack gap="200" blockAlign="center" wrap>
                  <Text as="h1" variant="headingLg">
                    Store Trust Highlights
                  </Text>
                  <Badge tone="success">Editor ready</Badge>
                  <Badge tone="success">{currentPlanLabel}</Badge>
                </InlineStack>

                <Text as="p" variant="bodyMd" tone="subdued">
                  Connect the block in Shopify, then edit and save the trust
                  section inside Luxe Sections Studio.
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
                    2 · Edit and save inside the app
                  </Text>
                  <Text as="p" variant="bodySm" tone="subdued">
                    Heading, trust items, layout, and spacing now save from the
                    app editor.
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
                    This editor now saves app-managed Trust Bar settings instead
                    of acting like a local-only preview shell.
                  </Text>
                </BlockStack>

                <Box
                  padding="300"
                  borderRadius="300"
                  background="bg-surface-secondary"
                >
                  <BlockStack gap="250">
                    <Text as="h3" variant="headingSm">
                      Section
                    </Text>

                    <TextField
                      label="Heading"
                      value={heading}
                      onChange={setHeading}
                      autoComplete="off"
                    />
                    <input type="hidden" name="heading" value={heading} />

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
                        { label: "Soft", value: "soft" },
                        { label: "Dark", value: "dark" },
                        { label: "Outline", value: "outline" },
                      ]}
                      value={sectionStyle}
                      onChange={setSectionStyle}
                    />
                    <input
                      type="hidden"
                      name="sectionStyle"
                      value={sectionStyle}
                    />

                    <Select
                      label="Desktop columns"
                      options={[
                        { label: "2 columns", value: "2" },
                        { label: "4 columns", value: "4" },
                      ]}
                      value={desktopColumns}
                      onChange={setDesktopColumns}
                    />
                    <input
                      type="hidden"
                      name="desktopColumns"
                      value={desktopColumns}
                    />

                    <RangeSlider
                      label="Top padding"
                      value={paddingTop}
                      onChange={setPaddingTop}
                      min={0}
                      max={120}
                      step={4}
                      output
                    />
                    <input
                      type="hidden"
                      name="paddingTop"
                      value={String(paddingTop)}
                    />

                    <RangeSlider
                      label="Bottom padding"
                      value={paddingBottom}
                      onChange={setPaddingBottom}
                      min={0}
                      max={120}
                      step={4}
                      output
                    />
                    <input
                      type="hidden"
                      name="paddingBottom"
                      value={String(paddingBottom)}
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
                      Trust item 1
                    </Text>

                    <TextField
                      label="Title"
                      value={item1Title}
                      onChange={setItem1Title}
                      autoComplete="off"
                    />
                    <input type="hidden" name="item1Title" value={item1Title} />

                    <TextField
                      label="Text"
                      value={item1Text}
                      onChange={setItem1Text}
                      multiline={3}
                      autoComplete="off"
                    />
                    <input type="hidden" name="item1Text" value={item1Text} />
                  </BlockStack>
                </Box>

                <Box
                  padding="300"
                  borderRadius="300"
                  background="bg-surface-secondary"
                >
                  <BlockStack gap="250">
                    <Text as="h3" variant="headingSm">
                      Trust item 2
                    </Text>

                    <TextField
                      label="Title"
                      value={item2Title}
                      onChange={setItem2Title}
                      autoComplete="off"
                    />
                    <input type="hidden" name="item2Title" value={item2Title} />

                    <TextField
                      label="Text"
                      value={item2Text}
                      onChange={setItem2Text}
                      multiline={3}
                      autoComplete="off"
                    />
                    <input type="hidden" name="item2Text" value={item2Text} />
                  </BlockStack>
                </Box>

                <Box
                  padding="300"
                  borderRadius="300"
                  background="bg-surface-secondary"
                >
                  <BlockStack gap="250">
                    <Text as="h3" variant="headingSm">
                      Trust item 3
                    </Text>

                    <TextField
                      label="Title"
                      value={item3Title}
                      onChange={setItem3Title}
                      autoComplete="off"
                    />
                    <input type="hidden" name="item3Title" value={item3Title} />

                    <TextField
                      label="Text"
                      value={item3Text}
                      onChange={setItem3Text}
                      multiline={3}
                      autoComplete="off"
                    />
                    <input type="hidden" name="item3Text" value={item3Text} />
                  </BlockStack>
                </Box>

                <Box
                  padding="300"
                  borderRadius="300"
                  background="bg-surface-secondary"
                >
                  <BlockStack gap="250">
                    <Text as="h3" variant="headingSm">
                      Trust item 4
                    </Text>

                    <TextField
                      label="Title"
                      value={item4Title}
                      onChange={setItem4Title}
                      autoComplete="off"
                    />
                    <input type="hidden" name="item4Title" value={item4Title} />

                    <TextField
                      label="Text"
                      value={item4Text}
                      onChange={setItem4Text}
                      multiline={3}
                      autoComplete="off"
                    />
                    <input type="hidden" name="item4Text" value={item4Text} />
                  </BlockStack>
                </Box>

                <InlineStack gap="200" wrap align="space-between">
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
                        transition: "width 160ms ease",
                      }}
                    >
                      <div
                        style={{
                          borderRadius: "28px",
                          paddingTop: `${paddingTop}px`,
                          paddingBottom: `${paddingBottom}px`,
                          paddingLeft: isMobile ? "20px" : "20px",
                          paddingRight: isMobile ? "20px" : "20px",
                          background: sectionSurface.background,
                          color: sectionSurface.sectionText,
                        }}
                      >
                        <div
                          style={{
                            margin: "0 0 24px",
                            textAlign: textAlignment,
                            fontSize: isMobile ? "24px" : "28px",
                            lineHeight: 1.2,
                            letterSpacing: "-0.02em",
                            fontWeight: 700,
                            color: sectionSurface.sectionText,
                            display: "flex",
                            justifyContent: contentAlignment,
                          }}
                        >
                          <div style={{ maxWidth: "620px" }}>
                            {heading || "Why shoppers trust CasaBloom"}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "grid",
                            gap: "16px",
                            gridTemplateColumns: previewColumns,
                          }}
                        >
                          {trustItems.map((item, index) => (
                            <div
                              key={`${item.title}-${index}`}
                              style={{
                                background: sectionSurface.cardBackground,
                                border: `1px solid ${sectionSurface.cardBorder}`,
                                borderRadius: "18px",
                                padding: "20px 18px",
                              }}
                            >
                              {item.title ? (
                                <div
                                  style={{
                                    margin: "0 0 6px",
                                    color: sectionSurface.sectionText,
                                    fontSize: "16px",
                                    lineHeight: 1.3,
                                    fontWeight: 600,
                                  }}
                                >
                                  {item.title}
                                </div>
                              ) : null}

                              {item.text ? (
                                <div
                                  style={{
                                    margin: 0,
                                    color: sectionSurface.mutedText,
                                    fontSize: "14px",
                                    lineHeight: 1.55,
                                  }}
                                >
                                  {item.text}
                                </div>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>

                <Text as="p" variant="bodySm" tone="subdued">
                  Preview now matches the same data contract that the Trust Bar storefront block expects.
                </Text>
              </BlockStack>
            </Card>
          </div>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}