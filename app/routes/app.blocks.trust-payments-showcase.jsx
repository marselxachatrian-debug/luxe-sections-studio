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
  getTrustPaymentsShowcaseSettings,
  saveTrustPaymentsShowcaseMetaobject,
} from "../trust-payments-showcase-metaobject.server";

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

function getTrustIconBackground(iconTone) {
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
  const { admin } = await authenticate.admin(request);

  const onboardingLinks = getThemeEditorOnboardingLinks(
    activeThemeStatus.shop,
    activeThemeStatus.themeId,
    process.env.SHOPIFY_API_KEY,
  );

  const savedSettings = await getTrustPaymentsShowcaseSettings(admin);

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
    const saved = await saveTrustPaymentsShowcaseMetaobject(admin, {
      eyebrow: formData.get("eyebrow"),
      heading: formData.get("heading"),
      subheading: formData.get("subheading"),

      trustPoint1: formData.get("trustPoint1"),
      trustPoint2: formData.get("trustPoint2"),
      trustPoint3: formData.get("trustPoint3"),

      partner1: formData.get("partner1"),
      partner2: formData.get("partner2"),
      partner3: formData.get("partner3"),
      partner4: formData.get("partner4"),

      contentAlignment: formData.get("contentAlignment"),
      sectionStyle: formData.get("sectionStyle"),
      iconTone: formData.get("iconTone"),
    });

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
          : "Failed to save Trust & Payment Showcase settings.",
    };
  }
}

export default function TrustPaymentsShowcaseEditorRoute() {
  const {
    currentPlanLabel,
    activeThemeName,
    activeThemeId,
    onboardingLinks,
    savedSettings,
  } = useLoaderData();

  const fetcher = useFetcher();
  const [device, setDevice] = useState("desktop");

  const [eyebrow, setEyebrow] = useState(savedSettings.eyebrow);
  const [heading, setHeading] = useState(savedSettings.heading);
  const [subheading, setSubheading] = useState(savedSettings.subheading);

  const [trustPointOne, setTrustPointOne] = useState(savedSettings.trustPoint1);
  const [trustPointTwo, setTrustPointTwo] = useState(savedSettings.trustPoint2);
  const [trustPointThree, setTrustPointThree] = useState(savedSettings.trustPoint3);

  const [paymentOne, setPaymentOne] = useState(savedSettings.partner1);
  const [paymentTwo, setPaymentTwo] = useState(savedSettings.partner2);
  const [paymentThree, setPaymentThree] = useState(savedSettings.partner3);
  const [paymentFour, setPaymentFour] = useState(savedSettings.partner4);

  const [contentAlignment, setContentAlignment] = useState(
    savedSettings.contentAlignment,
  );
  const [sectionStyle, setSectionStyle] = useState(savedSettings.sectionStyle);
  const [iconTone, setIconTone] = useState(savedSettings.iconTone);

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
    onboardingLinks.find((item) => item.key === "trust-payments-showcase")?.url ??
    null;

  const isSaving = fetcher.state !== "idle";
  const isMobile = device === "mobile";
  const previewWidth = getDeviceWidth(device);

  const textAlign =
    contentAlignment === "center"
      ? "center"
      : contentAlignment === "right"
        ? "right"
        : "left";

  const contentJustify =
    contentAlignment === "center"
      ? "center"
      : contentAlignment === "right"
        ? "flex-end"
        : "flex-start";

  const sectionSurface = getSectionSurface(sectionStyle);

  const trustPoints = [trustPointOne, trustPointTwo, trustPointThree].filter(
    Boolean,
  );

  const partnerItems = [paymentOne, paymentTwo, paymentThree, paymentFour].filter(
    Boolean,
  );

  return (
    <Page
      title="Trust & Payment Showcase"
      subtitle="Short setup on top, editor on the left, stable preview on the right."
    >
      <BlockStack gap="400">
        <Card>
          <InlineGrid columns={{ xs: 1, lg: "1.25fr auto" }} gap="300">
            <BlockStack gap="200">
              <BlockStack gap="100">
                <InlineStack gap="200" blockAlign="center" wrap>
                  <Text as="h1" variant="headingLg">
                    Trust & Payment Showcase
                  </Text>
                  <Badge tone="success">{currentPlanLabel}</Badge>
                  <Badge tone={saveMessage === "Saved" ? "success" : "info"}>
                    {isSaving ? "Saving..." : saveMessage}
                  </Badge>
                </InlineStack>

                <Text as="p" variant="bodyMd" tone="subdued">
                  Two actions only: connect the block in Shopify, then shape
                  trust messaging, payment proof, and delivery confidence inside
                  Luxe Sections Studio.
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
                    Trust content, partner labels, spacing, and premium polish
                    stay here.
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
                    Keep the section simple: trust copy, partner labels, layout,
                    spacing, and premium polish in one editor panel.
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
                      label="Eyebrow label"
                      value={eyebrow}
                      onChange={setEyebrow}
                      autoComplete="off"
                    />
                    <input type="hidden" name="eyebrow" value={eyebrow} />

                    <TextField
                      label="Heading"
                      value={heading}
                      onChange={setHeading}
                      multiline={2}
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
                    <InlineStack align="space-between" blockAlign="center" wrap>
                      <Text as="h3" variant="headingSm">
                        Trust points
                      </Text>
                      <Text as="p" variant="bodySm" tone="subdued">
                        Compact merchant setup
                      </Text>
                    </InlineStack>

                    <InlineGrid columns={{ xs: 1, md: 2 }} gap="200">
                      <TextField
                        label="Trust point 1"
                        value={trustPointOne}
                        onChange={setTrustPointOne}
                        autoComplete="off"
                      />
                      <input
                        type="hidden"
                        name="trustPoint1"
                        value={trustPointOne}
                      />

                      <TextField
                        label="Trust point 2"
                        value={trustPointTwo}
                        onChange={setTrustPointTwo}
                        autoComplete="off"
                      />
                      <input
                        type="hidden"
                        name="trustPoint2"
                        value={trustPointTwo}
                      />
                    </InlineGrid>

                    <TextField
                      label="Trust point 3"
                      value={trustPointThree}
                      onChange={setTrustPointThree}
                      autoComplete="off"
                    />
                    <input
                      type="hidden"
                      name="trustPoint3"
                      value={trustPointThree}
                    />
                  </BlockStack>
                </Box>

                <Box
                  padding="300"
                  borderRadius="300"
                  background="bg-surface-secondary"
                >
                  <BlockStack gap="250">
                    <InlineStack align="space-between" blockAlign="center" wrap>
                      <Text as="h3" variant="headingSm">
                        Payment and delivery labels
                      </Text>
                      <Text as="p" variant="bodySm" tone="subdued">
                        2 × 2 compact grid
                      </Text>
                    </InlineStack>

                    <InlineGrid columns={{ xs: 1, md: 2 }} gap="200">
                      <TextField
                        label="Partner 1"
                        value={paymentOne}
                        onChange={setPaymentOne}
                        autoComplete="off"
                      />
                      <input type="hidden" name="partner1" value={paymentOne} />

                      <TextField
                        label="Partner 2"
                        value={paymentTwo}
                        onChange={setPaymentTwo}
                        autoComplete="off"
                      />
                      <input type="hidden" name="partner2" value={paymentTwo} />

                      <TextField
                        label="Partner 3"
                        value={paymentThree}
                        onChange={setPaymentThree}
                        autoComplete="off"
                      />
                      <input
                        type="hidden"
                        name="partner3"
                        value={paymentThree}
                      />

                      <TextField
                        label="Partner 4"
                        value={paymentFour}
                        onChange={setPaymentFour}
                        autoComplete="off"
                      />
                      <input type="hidden" name="partner4" value={paymentFour} />
                    </InlineGrid>
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
                    <input
                      type="hidden"
                      name="contentAlignment"
                      value={contentAlignment}
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
                    <input type="hidden" name="sectionStyle" value={sectionStyle} />

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
                    <input type="hidden" name="iconTone" value={iconTone} />
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
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "1.08fr 0.92fr",
                            gap: "18px",
                            alignItems: "stretch",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: contentJustify,
                                marginBottom: "12px",
                              }}
                            >
                              <div
                                style={{
                                  display: "inline-flex",
                                  padding: "6px 12px",
                                  borderRadius: "999px",
                                  background: "rgba(248, 231, 176, 0.16)",
                                  color: "#7c5c2b",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  letterSpacing: "0.06em",
                                  textTransform: "uppercase",
                                }}
                              >
                                {eyebrow || "Trusted checkout"}
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: contentJustify,
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
                                  maxWidth: isMobile ? "100%" : "560px",
                                }}
                              >
                                {heading ||
                                  "Build more purchase confidence with trust, payments, and delivery proof"}
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: contentJustify,
                                marginBottom: "18px",
                              }}
                            >
                              <div
                                style={{
                                  fontSize: isMobile ? "14px" : "15px",
                                  lineHeight: 1.65,
                                  color: "#6b7280",
                                  textAlign,
                                  maxWidth: isMobile ? "100%" : "580px",
                                }}
                              >
                                {subheading ||
                                  "Combine reassurance messaging, secure payment methods, and delivery partners in one premium conversion section."}
                              </div>
                            </div>

                            <div style={{ display: "grid", gap: "10px" }}>
                              {trustPoints.map((item, index) => (
                                <div
                                  key={`${item}-${index}`}
                                  style={{
                                    borderRadius: "16px",
                                    padding: "14px 16px",
                                    background: "#ffffff",
                                    border: "1px solid rgba(15, 23, 42, 0.08)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "36px",
                                      height: "36px",
                                      borderRadius: "12px",
                                      background: getTrustIconBackground(iconTone),
                                      flexShrink: 0,
                                    }}
                                  />
                                  <div
                                    style={{
                                      fontSize: "14px",
                                      lineHeight: 1.5,
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

                          <div
                            style={{
                              borderRadius: "20px",
                              padding: "18px",
                              background: "#ffffff",
                              border: "1px solid rgba(15, 23, 42, 0.08)",
                              alignSelf: "stretch",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "12px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                color: "#7c5c2b",
                                marginBottom: "14px",
                              }}
                            >
                              Payments and delivery
                            </div>

                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                gap: "10px",
                              }}
                            >
                              {partnerItems.map((item, index) => (
                                <div
                                  key={`${item}-${index}`}
                                  style={{
                                    borderRadius: "14px",
                                    minHeight: "56px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "#f8fafc",
                                    border: "1px solid rgba(15, 23, 42, 0.08)",
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    color: "#111827",
                                    textAlign: "center",
                                    padding: "8px",
                                  }}
                                >
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>

                <Text as="p" variant="bodySm" tone="subdued">
                  Preview stays fixed on the right so device switching feels
                  stable while the merchant edits the trust and payment section.
                </Text>
              </BlockStack>
            </Card>
          </div>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}