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
        "linear-gradient(180deg, #0f172a 0%, #111827 55%, #1f2937 100%)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      boxShadow: "0 20px 40px rgba(15, 23, 42, 0.18)",
    };
  }

  return {
    background: "#111827",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    boxShadow: "0 16px 32px rgba(15, 23, 42, 0.16)",
  };
}

function getVideoSurface(videoTone) {
  if (videoTone === "gold") {
    return "linear-gradient(180deg, rgba(248,231,176,0.24) 0%, rgba(15,23,42,0.22) 100%)";
  }

  if (videoTone === "charcoal") {
    return "linear-gradient(180deg, rgba(75,85,99,0.24) 0%, rgba(15,23,42,0.26) 100%)";
  }

  return "linear-gradient(180deg, rgba(248,231,176,0.18) 0%, rgba(15,23,42,0.20) 100%)";
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

export default function VideoShowcaseEditorRoute() {
  const { currentPlanLabel, activeThemeName, activeThemeId, onboardingLinks } =
    useLoaderData();

  const [device, setDevice] = useState("desktop");
  const [eyebrow, setEyebrow] = useState("Video showcase");
  const [heading, setHeading] = useState(
    "Turn short product videos into a premium storefront section",
  );
  const [subheading, setSubheading] = useState(
    "Show vertical product clips with cleaner spacing, stronger focus, and a more luxury mobile presentation.",
  );

  const [videoOneTitle, setVideoOneTitle] = useState("Product story");
  const [videoOneText, setVideoOneText] = useState(
    "Short premium clip with a clear visual hook and cleaner product focus.",
  );
  const [videoTwoTitle, setVideoTwoTitle] = useState("Behind the details");
  const [videoTwoText, setVideoTwoText] = useState(
    "Use a second video card to show texture, features, or luxury product detail.",
  );
  const [videoThreeTitle, setVideoThreeTitle] = useState("Mobile-first CTA");
  const [videoThreeText, setVideoThreeText] = useState(
    "Guide shoppers to the next click with clearer CTA support and better visual flow.",
  );

  const [headingAlignment, setHeadingAlignment] = useState("left");
  const [sectionStyle, setSectionStyle] = useState("luxe");
  const [desktopColumns, setDesktopColumns] = useState("3");
  const [videoTone, setVideoTone] = useState("midnight");
  const [topPadding, setTopPadding] = useState(30);
  const [bottomPadding, setBottomPadding] = useState(30);

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

  const videos = [
    { title: videoOneTitle, text: videoOneText },
    { title: videoTwoTitle, text: videoTwoText },
    { title: videoThreeTitle, text: videoThreeText },
  ].filter((video) => video.title || video.text);

  return (
    <Page
      title="Vertical Video Showcase"
      subtitle="Short setup on top, editor on the left, stable preview on the right."
    >
      <BlockStack gap="400">
        <Card>
          <InlineGrid columns={{ xs: 1, lg: "1.25fr auto" }} gap="300">
            <BlockStack gap="200">
              <BlockStack gap="100">
                <InlineStack gap="200" blockAlign="center" wrap>
                  <Text as="h1" variant="headingLg">
                    Vertical Video Showcase
                  </Text>
                  <Badge tone="success">{currentPlanLabel}</Badge>
                  <Badge tone="info">Editor shell ready</Badge>
                </InlineStack>

                <Text as="p" variant="bodyMd" tone="subdued">
                  Two actions only: connect the block in Shopify, then shape
                  video storytelling, card structure, and mobile-focused
                  presentation inside Luxe Sections Studio.
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
                    Headline, video cards, spacing, and premium visual polish stay here.
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
                  <Badge tone="info">Editor shell ready</Badge>
                </InlineStack>

                <Text as="p" variant="bodySm" tone="subdued">
                  Keep the section simple: headline, video cards, layout, spacing,
                  and premium polish in one editor panel.
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
                    multiline={3}
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
                  <InlineStack align="space-between" blockAlign="center" wrap>
                    <Text as="h3" variant="headingSm">
                      Video cards
                    </Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      Compact merchant setup
                    </Text>
                  </InlineStack>

                  <InlineGrid columns={{ xs: 1, md: 2 }} gap="200">
                    <TextField
                      label="Video 1 title"
                      value={videoOneTitle}
                      onChange={setVideoOneTitle}
                      autoComplete="off"
                    />

                    <TextField
                      label="Video 2 title"
                      value={videoTwoTitle}
                      onChange={setVideoTwoTitle}
                      autoComplete="off"
                    />
                  </InlineGrid>

                  <InlineGrid columns={{ xs: 1, md: 2 }} gap="200">
                    <TextField
                      label="Video 1 text"
                      value={videoOneText}
                      onChange={setVideoOneText}
                      multiline={3}
                      autoComplete="off"
                    />

                    <TextField
                      label="Video 2 text"
                      value={videoTwoText}
                      onChange={setVideoTwoText}
                      multiline={3}
                      autoComplete="off"
                    />
                  </InlineGrid>

                  <InlineGrid columns={{ xs: 1, md: 2 }} gap="200">
                    <TextField
                      label="Video 3 title"
                      value={videoThreeTitle}
                      onChange={setVideoThreeTitle}
                      autoComplete="off"
                    />

                    <Box />
                  </InlineGrid>

                  <TextField
                    label="Video 3 text"
                    value={videoThreeText}
                    onChange={setVideoThreeText}
                    multiline={3}
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
                      { label: "Minimal dark", value: "minimal" },
                      { label: "Soft dark", value: "soft" },
                      { label: "Luxe spotlight", value: "luxe" },
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
                    label="Video tone"
                    options={[
                      { label: "Midnight gold", value: "midnight" },
                      { label: "Soft gold", value: "gold" },
                      { label: "Charcoal", value: "charcoal" },
                    ]}
                    value={videoTone}
                    onChange={setVideoTone}
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
                            justifyContent: contentJustify,
                            marginBottom: "12px",
                          }}
                        >
                          <div
                            style={{
                              display: "inline-flex",
                              padding: "6px 12px",
                              borderRadius: "999px",
                              background: "rgba(248, 231, 176, 0.14)",
                              color: "#f8e7b0",
                              fontSize: "12px",
                              fontWeight: 700,
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                            }}
                          >
                            {eyebrow || "Video showcase"}
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
                              color: "#ffffff",
                              textAlign,
                              maxWidth: isMobile ? "100%" : "620px",
                            }}
                          >
                            {heading ||
                              "Turn short product videos into a premium storefront section"}
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
                              color: "rgba(255,255,255,0.72)",
                              textAlign,
                              maxWidth: isMobile ? "100%" : "640px",
                            }}
                          >
                            {subheading ||
                              "Show vertical product clips with cleaner spacing, stronger focus, and a more luxury mobile presentation."}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: previewColumns,
                            gap: "14px",
                          }}
                        >
                          {videos.map((video, index) => (
                            <div
                              key={`${video.title}-${index}`}
                              style={{
                                borderRadius: "22px",
                                overflow: "hidden",
                                background: "#0b1220",
                                border: "1px solid rgba(255,255,255,0.08)",
                              }}
                            >
                              <div
                                style={{
                                  aspectRatio: "9 / 16",
                                  background: getVideoSurface(videoTone),
                                }}
                              />

                              <div style={{ padding: "14px" }}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    color: "#ffffff",
                                    marginBottom: "6px",
                                  }}
                                >
                                  {video.title || "Video title"}
                                </div>

                                <div
                                  style={{
                                    fontSize: "12px",
                                    lineHeight: 1.6,
                                    color: "rgba(255,255,255,0.68)",
                                  }}
                                >
                                  {video.text || "Video description"}
                                </div>
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
                  stable while the merchant edits the video showcase section.
                </Text>
              </BlockStack>
            </Card>
          </div>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}