import { useState } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router";
import {
  Badge,
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  InlineGrid,
  InlineStack,
  List,
  Page,
  Text,
} from "@shopify/polaris";
import { blockLibraryItems } from "../studio-data";
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
    return "360px";
  }

  if (device === "tablet") {
    return "760px";
  }

  return "100%";
}

function getBlockEditorPath(handle) {
  if (handle === "luxe-hero") {
    return "/app/blocks/luxe-hero";
  }

  if (handle === "trust-bar") {
    return "/app/blocks/trust-bar";
  }

  if (handle === "premium-features") {
    return "/app/blocks/premium-features";
  }

  return `/app/blocks?block=${handle}`;
}

function hasDedicatedEditor(handle) {
  return (
    handle === "luxe-hero" ||
    handle === "trust-bar" ||
    handle === "premium-features"
  );
}

function getBlockEditorButtonLabel(handle, isSelected) {
  if (hasDedicatedEditor(handle)) {
    return "Open editor page";
  }

  return isSelected ? "Selected" : "Open editor";
}

function getBlockStatusLabel(handle, isSelected, fallbackStatus) {
  if (handle === "luxe-hero") {
    return "Dedicated editor ready";
  }

  if (handle === "trust-bar") {
    return "Dedicated editor ready";
  }

  if (handle === "premium-features") {
    return "Dedicated editor ready";
  }

  return isSelected ? "Open" : fallbackStatus;
}

function renderHeroPreview(device) {
  const padding = device === "mobile" ? "24px" : "40px";
  const titleSize = device === "mobile" ? "26px" : "40px";
  const stackGap = device === "mobile" ? "16px" : "22px";

  return (
    <div
      style={{
        borderRadius: "24px",
        padding,
        background:
          "linear-gradient(135deg, #0f172a 0%, #1f2937 58%, #8a6a2f 100%)",
        color: "#ffffff",
        boxShadow: "0 18px 40px rgba(15, 23, 42, 0.18)",
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
          marginBottom: "18px",
        }}
      >
        Premium storefront
      </div>

      <div
        style={{
          fontSize: titleSize,
          lineHeight: 1.05,
          fontWeight: 700,
          maxWidth: device === "mobile" ? "100%" : "520px",
          marginBottom: "14px",
        }}
      >
        A cleaner, sharper first impression for your Shopify store
      </div>

      <div
        style={{
          fontSize: device === "mobile" ? "14px" : "16px",
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.82)",
          maxWidth: device === "mobile" ? "100%" : "560px",
          marginBottom: "22px",
        }}
      >
        Show a stronger brand message, clear value, and a more premium visual
        style without needing to touch code.
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: device === "mobile" ? "column" : "row",
          gap: stackGap,
          alignItems: device === "mobile" ? "stretch" : "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "46px",
            padding: "0 20px",
            borderRadius: "999px",
            background: "#f8e7b0",
            color: "#1f2937",
            fontWeight: 700,
            fontSize: "14px",
          }}
        >
          Shop the collection
        </div>

        <div
          style={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "46px",
            padding: "0 20px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.20)",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          Learn more
        </div>
      </div>
    </div>
  );
}

function renderTrustPreview(device) {
  const columns = device === "mobile" ? "1fr" : "repeat(3, minmax(0, 1fr))";

  return (
    <div
      style={{
        borderRadius: "24px",
        padding: device === "mobile" ? "20px" : "28px",
        background: "#ffffff",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        boxShadow: "0 18px 34px rgba(15, 23, 42, 0.08)",
      }}
    >
      <div
        style={{
          fontSize: device === "mobile" ? "22px" : "28px",
          lineHeight: 1.2,
          fontWeight: 700,
          color: "#111827",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        Why customers trust your store
      </div>

      <div
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#6b7280",
          textAlign: "center",
          maxWidth: "520px",
          margin: "0 auto 22px auto",
        }}
      >
        Highlight shipping confidence, customer support, and secure checkout in
        one clean section.
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: columns,
          gap: "14px",
        }}
      >
        {[
          "Fast tracked delivery",
          "Secure checkout",
          "Easy support access",
        ].map((item) => (
          <div
            key={item}
            style={{
              borderRadius: "18px",
              padding: "18px",
              background: "#f8fafc",
              border: "1px solid rgba(15, 23, 42, 0.06)",
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, #111827 0%, #1f2937 70%, #7c5c2b 100%)",
                marginBottom: "12px",
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
  );
}

function renderFeaturesPreview(device) {
  const columns = device === "mobile" ? "1fr" : "repeat(3, minmax(0, 1fr))";

  return (
    <div
      style={{
        borderRadius: "24px",
        padding: device === "mobile" ? "20px" : "30px",
        background:
          "linear-gradient(180deg, #fffdf8 0%, #ffffff 40%, #f8fafc 100%)",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        boxShadow: "0 18px 34px rgba(15, 23, 42, 0.08)",
      }}
    >
      <div
        style={{
          fontSize: device === "mobile" ? "24px" : "32px",
          lineHeight: 1.15,
          fontWeight: 700,
          color: "#111827",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        Feature highlights your customers can scan fast
      </div>

      <div
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#6b7280",
          textAlign: "center",
          marginBottom: "22px",
        }}
      >
        Present benefits clearly with icon-led cards and premium spacing.
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: columns,
          gap: "14px",
        }}
      >
        {[
          "Premium materials",
          "Mobile-ready layout",
          "Fast setup flow",
        ].map((item) => (
          <div
            key={item}
            style={{
              borderRadius: "20px",
              padding: "20px",
              background: "#ffffff",
              border: "1px solid rgba(15, 23, 42, 0.06)",
              boxShadow: "0 8px 20px rgba(15, 23, 42, 0.04)",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, #f8e7b0 0%, #e9c46a 100%)",
                marginBottom: "14px",
              }}
            />
            <div
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              {item}
            </div>
            <div
              style={{
                fontSize: "13px",
                lineHeight: 1.6,
                color: "#6b7280",
              }}
            >
              A cleaner presentation with stronger structure and a more premium
              storefront feel.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderGenericPreview(device, blockName) {
  return (
    <div
      style={{
        borderRadius: "24px",
        padding: device === "mobile" ? "20px" : "30px",
        background: "#ffffff",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        boxShadow: "0 18px 34px rgba(15, 23, 42, 0.08)",
      }}
    >
      <div
        style={{
          fontSize: device === "mobile" ? "24px" : "30px",
          lineHeight: 1.15,
          fontWeight: 700,
          color: "#111827",
          marginBottom: "10px",
        }}
      >
        {blockName}
      </div>

      <div
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#6b7280",
          marginBottom: "16px",
        }}
      >
        This block preview will update live as the merchant edits settings
        inside the app.
      </div>

      <div
        style={{
          height: device === "mobile" ? "180px" : "220px",
          borderRadius: "18px",
          background:
            "linear-gradient(135deg, #f8fafc 0%, #eef2ff 55%, #fff7ed 100%)",
          border: "1px solid rgba(15, 23, 42, 0.06)",
        }}
      />
    </div>
  );
}

function renderSelectedPreview(selectedIndex, device, blockName) {
  if (selectedIndex === 0) {
    return renderHeroPreview(device);
  }

  if (selectedIndex === 1) {
    return renderTrustPreview(device);
  }

  if (selectedIndex === 2) {
    return renderFeaturesPreview(device);
  }

  return renderGenericPreview(device, blockName);
}

export async function loader({ request }) {
  const currentPlanStatus = await getCurrentPlanFromRequest(request);
  const activeThemeStatus = await getActiveThemeFromRequest(request);
  const onboardingLinks = getThemeEditorOnboardingLinks(
    activeThemeStatus.shop,
    activeThemeStatus.themeId,
  );

  return {
    currentPlanKey: currentPlanStatus.planKey,
    currentPlanLabel: PLAN_LABELS[currentPlanStatus.planKey],
    currentPlanSource: currentPlanStatus.source,
    hasActivePayment: currentPlanStatus.hasActivePayment,
    activeThemeName: activeThemeStatus.theme?.name ?? null,
    activeThemeId: activeThemeStatus.themeId,
    onboardingLinks,
  };
}

export default function BlocksLibraryRoute() {
  const {
    currentPlanLabel,
    currentPlanSource,
    hasActivePayment,
    activeThemeName,
    activeThemeId,
    onboardingLinks,
  } = useLoaderData();

  const [searchParams] = useSearchParams();
  const [device, setDevice] = useState("desktop");

  const selectedHandle =
    searchParams.get("block") ?? blockLibraryItems[0]?.handle ?? null;

  const selectedIndex = blockLibraryItems.findIndex(
    (block) => block.handle === selectedHandle,
  );

  const selectedBlock =
    blockLibraryItems[selectedIndex >= 0 ? selectedIndex : 0] ?? null;

  const themeEditorUrl =
    onboardingLinks.find((item) => item.url)?.url ?? null;

  const appOwnedControls = [
    "Visual style and premium presets",
    "Spacing and layout structure",
    "Desktop and mobile tuning",
    "Effect depth and premium upgrades",
    "Merchant-friendly editing flow with live preview",
  ];

  const shopifyOwnedControls = [
    "Add the app block to the theme",
    "Turn the app block or embed on",
    "Place the block in the right template",
    "Keep only minimal fallback fields in Theme Editor",
  ];

  return (
    <Page
      title="Blocks Studio"
      subtitle="Choose a block, edit it inside the app, and preview the result before merchants publish it to the storefront."
    >
      <BlockStack gap="500">
        <Card>
          <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
            <BlockStack gap="250">
              <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingLg">
                  Merchant-first editing model
                </Text>
                <Badge tone="success">{currentPlanLabel}</Badge>
              </InlineStack>

              <Text as="p" variant="bodyMd" tone="subdued">
                Plan source: {currentPlanSource}. Active paid billing:{" "}
                {hasActivePayment ? "Yes" : "No"}.
              </Text>

              <Text as="p" variant="bodyMd" tone="subdued">
                Active theme: {activeThemeName ?? "Not found"}{" "}
                {activeThemeId ? `(ID: ${activeThemeId})` : ""}
              </Text>
            </BlockStack>

            <InlineGrid columns={{ xs: 1, md: 2 }} gap="300">
              <Card roundedAbove="sm">
                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">
                    Main editing in app
                  </Text>
                  <List>
                    {appOwnedControls.map((item) => (
                      <List.Item key={item}>{item}</List.Item>
                    ))}
                  </List>
                </BlockStack>
              </Card>

              <Card roundedAbove="sm">
                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">
                    Minimal setup in Shopify
                  </Text>
                  <List>
                    {shopifyOwnedControls.map((item) => (
                      <List.Item key={item}>{item}</List.Item>
                    ))}
                  </List>
                </BlockStack>
              </Card>
            </InlineGrid>
          </InlineGrid>
        </Card>

        <InlineGrid columns={{ xs: 1, lg: "1.1fr 0.9fr" }} gap="400">
          <BlockStack gap="400">
            <Card>
              <BlockStack gap="300">
                <InlineStack align="space-between" blockAlign="center">
                  <Text as="h2" variant="headingMd">
                    Block editors
                  </Text>
                  <Badge tone="info">
                    {blockLibraryItems.length} live blocks
                  </Badge>
                </InlineStack>

                <Text as="p" variant="bodyMd" tone="subdued">
                  Open a block editor from the list below. Premium Hero Banner,
                  Store Trust Highlights, and Feature Highlights Grid already
                  have dedicated editor pages with settings on the left and live
                  preview on the right.
                </Text>

                <BlockStack gap="200">
                  {blockLibraryItems.map((block) => {
                    const isSelected = selectedBlock?.handle === block.handle;
                    const dedicatedEditorReady = hasDedicatedEditor(block.handle);

                    return (
                      <Card key={block.handle} roundedAbove="sm">
                        <InlineStack align="space-between" gap="300">
                          <BlockStack gap="100">
                            <InlineStack gap="200" blockAlign="center">
                              <Text as="h3" variant="headingSm">
                                {block.name}
                              </Text>
                              <Badge tone={isSelected ? "success" : "info"}>
                                {getBlockStatusLabel(
                                  block.handle,
                                  isSelected,
                                  block.status,
                                )}
                              </Badge>
                            </InlineStack>

                            <Text as="p" variant="bodyMd" tone="subdued">
                              {block.description}
                            </Text>
                          </BlockStack>

                          <Link
                            to={getBlockEditorPath(block.handle)}
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              variant={
                                dedicatedEditorReady || isSelected
                                  ? "primary"
                                  : "secondary"
                              }
                            >
                              {getBlockEditorButtonLabel(block.handle, isSelected)}
                            </Button>
                          </Link>
                        </InlineStack>
                      </Card>
                    );
                  })}
                </BlockStack>
              </BlockStack>
            </Card>

            {selectedBlock ? (
              <Card>
                <BlockStack gap="300">
                  <InlineStack align="space-between" blockAlign="center">
                    <Text as="h2" variant="headingMd">
                      {selectedBlock.name}
                    </Text>
                    <Badge tone="success">
                      {hasDedicatedEditor(selectedBlock.handle)
                        ? "Dedicated editor ready"
                        : "App editor target"}
                    </Badge>
                  </InlineStack>

                  <Text as="p" variant="bodyMd" tone="subdued">
                    {hasDedicatedEditor(selectedBlock.handle)
                      ? "This block already has its own dedicated editor page inside Luxe Sections Studio."
                      : "This block will be edited mainly inside Luxe Sections Studio. Theme Editor stays minimal and is used mostly for placement and activation."}
                  </Text>

                  <Divider />

                  <InlineGrid columns={{ xs: 1, md: 2 }} gap="300">
                    <BlockStack gap="200">
                      <Text as="h3" variant="headingSm">
                        Included capabilities
                      </Text>

                      <List>
                        {selectedBlock.features.map((feature) => (
                          <List.Item key={feature}>{feature}</List.Item>
                        ))}
                      </List>
                    </BlockStack>

                    <BlockStack gap="200">
                      <Text as="h3" variant="headingSm">
                        Editing flow
                      </Text>

                      <List type="number">
                        <List.Item>Select the block editor in the app.</List.Item>
                        <List.Item>Adjust content and visual settings.</List.Item>
                        <List.Item>Check desktop, tablet, and mobile preview.</List.Item>
                        <List.Item>Open Theme Editor only for placement.</List.Item>
                      </List>

                      <InlineStack gap="200">
                        <Link
                          to={getBlockEditorPath(selectedBlock.handle)}
                          style={{ textDecoration: "none" }}
                        >
                          <Button variant="primary">
                            {hasDedicatedEditor(selectedBlock.handle)
                              ? "Open dedicated editor"
                              : "Open block"}
                          </Button>
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
                  </InlineGrid>
                </BlockStack>
              </Card>
            ) : null}
          </BlockStack>

          <BlockStack gap="400">
            <Card>
              <BlockStack gap="300">
                <InlineStack align="space-between" blockAlign="center">
                  <Text as="h2" variant="headingMd">
                    Live preview
                  </Text>
                  <Badge tone="attention">{device}</Badge>
                </InlineStack>

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
                        width: getDeviceWidth(device),
                        maxWidth: "100%",
                        transition: "all 160ms ease",
                      }}
                    >
                      {selectedBlock
                        ? renderSelectedPreview(
                            selectedIndex,
                            device,
                            selectedBlock.name,
                          )
                        : null}
                    </div>
                  </div>
                </Box>

                <Text as="p" variant="bodySm" tone="subdued">
                  This studio page now links all current live blocks to their
                  own dedicated editors. Next we can polish the dashboard flow
                  and then move into the next planned blocks.
                </Text>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="250">
                <Text as="h2" variant="headingMd">
                  Why this structure is better for merchants
                </Text>

                <List>
                  <List.Item>
                    Merchants edit in one controlled place instead of hunting
                    through Theme Editor settings.
                  </List.Item>
                  <List.Item>
                    The preview stays visible while changes are being made.
                  </List.Item>
                  <List.Item>
                    Device switching makes mobile-ready editing easier to
                    understand.
                  </List.Item>
                  <List.Item>
                    Shopify keeps only the minimum setup role it does best.
                  </List.Item>
                </List>
              </BlockStack>
            </Card>
          </BlockStack>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}