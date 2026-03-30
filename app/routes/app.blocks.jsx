import { useState } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router";
import {
  Badge,
  BlockStack,
  Box,
  Button,
  Card,
  InlineGrid,
  InlineStack,
  List,
  Page,
  Text,
} from "@shopify/polaris";
import { blockLibraryItems, roadmapBlockItems } from "../studio-data";
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

function getPreviewWidth(device) {
  if (device === "mobile") {
    return "390px";
  }

  if (device === "tablet") {
    return "720px";
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

  if (handle === "trust-payments-showcase") {
    return "/app/blocks/trust-payments-showcase";
  }

  if (handle === "video-showcase") {
    return "/app/blocks/video-showcase";
  }

  return `/app/blocks?block=${handle}`;
}

function hasDedicatedEditor(handle) {
  return (
    handle === "luxe-hero" ||
    handle === "trust-bar" ||
    handle === "premium-features" ||
    handle === "trust-payments-showcase" ||
    handle === "video-showcase"
  );
}

function getAvailabilityTone(block) {
  if (block.availability === "live") {
    return "success";
  }

  return hasDedicatedEditor(block.handle) ? "info" : "attention";
}

function getAvailabilityLabel(block) {
  if (block.availability === "live") {
    return hasDedicatedEditor(block.handle) ? "Editor ready" : "Live";
  }

  return hasDedicatedEditor(block.handle)
    ? "Editor shell ready"
    : "Planned next";
}

function getCatalogStageTone(block) {
  if (block.availability === "live") {
    return "success";
  }

  return hasDedicatedEditor(block.handle) ? "info" : "attention";
}

function getCatalogStageLabel(block) {
  if (block.availability === "live") {
    return "Live";
  }

  return hasDedicatedEditor(block.handle) ? "Editor shell" : "Planned";
}

function getCatalogEditorTone(block) {
  if (block.availability === "live") {
    return hasDedicatedEditor(block.handle) ? "success" : "attention";
  }

  return hasDedicatedEditor(block.handle) ? "info" : "attention";
}

function getCatalogEditorLabel(block) {
  if (block.availability === "live") {
    return hasDedicatedEditor(block.handle) ? "Editor ready" : "Live block";
  }

  return hasDedicatedEditor(block.handle)
    ? "Editor shell ready"
    : "Coming next";
}

function getEditorButtonLabel(block) {
  if (block.availability === "live") {
    return "Open block editor";
  }

  return hasDedicatedEditor(block.handle)
    ? "Open editor shell"
    : "Editor coming next";
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

function renderTrustPaymentsPreview(device) {
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
          display: "grid",
          gridTemplateColumns: device === "mobile" ? "1fr" : "1.1fr 0.9fr",
          gap: "18px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: device === "mobile" ? "24px" : "30px",
              lineHeight: 1.15,
              fontWeight: 700,
              color: "#111827",
              marginBottom: "10px",
            }}
          >
            Trusted checkout and reliable delivery in one premium section
          </div>

          <div
            style={{
              fontSize: "14px",
              lineHeight: 1.6,
              color: "#6b7280",
              marginBottom: "18px",
            }}
          >
            Combine trust messaging, reviews, payment methods, and shipping
            partners in one stronger conversion block.
          </div>

          <div style={{ display: "grid", gap: "10px" }}>
            {[
              "Verified customer confidence",
              "Secure payment support",
              "Delivery partner visibility",
            ].map((item) => (
              <div
                key={item}
                style={{
                  borderRadius: "16px",
                  padding: "14px 16px",
                  background: "#f8fafc",
                  border: "1px solid rgba(15, 23, 42, 0.06)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            borderRadius: "20px",
            padding: "18px",
            background:
              "linear-gradient(180deg, #fffdf8 0%, #ffffff 45%, #f8fafc 100%)",
            border: "1px solid rgba(124, 92, 43, 0.12)",
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
            Payment and shipping
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "10px",
            }}
          >
            {["Visa", "Mastercard", "PayPal", "DHL"].map((item) => (
              <div
                key={item}
                style={{
                  borderRadius: "14px",
                  minHeight: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#ffffff",
                  border: "1px solid rgba(15, 23, 42, 0.08)",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderVideoShowcasePreview(device) {
  const columns = device === "mobile" ? "1fr" : "repeat(3, minmax(0, 1fr))";

  return (
    <div
      style={{
        borderRadius: "24px",
        padding: device === "mobile" ? "20px" : "30px",
        background:
          "linear-gradient(180deg, #0f172a 0%, #111827 55%, #1f2937 100%)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 20px 40px rgba(15, 23, 42, 0.18)",
      }}
    >
      <div
        style={{
          fontSize: device === "mobile" ? "24px" : "30px",
          lineHeight: 1.15,
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: "10px",
        }}
      >
        Vertical product videos with a luxury storefront feel
      </div>

      <div
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.74)",
          marginBottom: "20px",
        }}
      >
        Use short-form product videos, CTA links, and cleaner motion to create a
        stronger showcase section.
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: columns,
          gap: "14px",
        }}
      >
        {[1, 2, 3].map((item) => (
          <div
            key={item}
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
                background:
                  "linear-gradient(180deg, rgba(248,231,176,0.18) 0%, rgba(15,23,42,0.2) 100%)",
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
                Product video {item}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.68)",
                }}
              >
                Short premium video card with CTA and mobile-ready focus.
              </div>
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

function renderSelectedPreview(handle, device, blockName) {
  if (handle === "luxe-hero") {
    return renderHeroPreview(device);
  }

  if (handle === "trust-bar") {
    return renderTrustPreview(device);
  }

  if (handle === "premium-features") {
    return renderFeaturesPreview(device);
  }

  if (handle === "trust-payments-showcase") {
    return renderTrustPaymentsPreview(device);
  }

  if (handle === "video-showcase") {
    return renderVideoShowcasePreview(device);
  }

  return renderGenericPreview(device, blockName);
}

function getEditorSections(block) {
  if (block.handle === "luxe-hero") {
    return [
      {
        title: "Content",
        items: ["Heading and CTA copy", "Message structure", "Button flow"],
      },
      {
        title: "Layout",
        items: ["Height", "Spacing", "Desktop and mobile alignment"],
      },
      {
        title: "Style",
        items: ["Media treatment", "Overlay control", "Color direction"],
      },
      {
        title: "Premium",
        items: ["Glow path", "Motion upgrades", "Luxury presets"],
      },
    ];
  }

  if (block.handle === "trust-bar") {
    return [
      {
        title: "Content",
        items: ["Trust points", "Heading structure", "Confidence messaging"],
      },
      {
        title: "Layout",
        items: ["Columns", "Padding", "Responsive arrangement"],
      },
      {
        title: "Style",
        items: ["Icons", "Background treatment", "Visual polish"],
      },
      {
        title: "Mobile",
        items: ["Compact spacing", "Readable hierarchy", "Cleaner flow"],
      },
    ];
  }

  if (block.handle === "premium-features") {
    return [
      {
        title: "Content",
        items: ["Heading", "Cards", "Feature descriptions"],
      },
      {
        title: "Layout",
        items: ["Columns", "Section spacing", "Heading alignment"],
      },
      {
        title: "Style",
        items: ["Card treatment", "Icons", "Premium visual structure"],
      },
      {
        title: "Growth",
        items: ["Richer icon control", "Card polish", "Merchandising depth"],
      },
    ];
  }

  if (block.handle === "trust-payments-showcase") {
    return [
      {
        title: "Content",
        items: ["Trust copy", "Review link", "Confidence messaging"],
      },
      {
        title: "Partners",
        items: ["Payments", "Shipping icons", "Partner links"],
      },
      {
        title: "Layout",
        items: ["Two-column structure", "Responsive flow", "Spacing"],
      },
      {
        title: "Premium",
        items: ["Hover effects", "Glow treatment", "Luxury motion"],
      },
    ];
  }

  if (block.handle === "video-showcase") {
    return [
      {
        title: "Content",
        items: ["Video cards", "Titles and CTA", "Story flow"],
      },
      {
        title: "Layout",
        items: ["Desktop and mobile flow", "Card spacing", "Active state"],
      },
      {
        title: "Style",
        items: ["Overlay and color", "Typography", "Premium framing"],
      },
      {
        title: "Motion",
        items: ["Carousel feel", "Spotlight effect", "Luxury transitions"],
      },
    ];
  }

  return [
    {
      title: "Content",
      items: ["Core content", "Copy structure", "Merchant-safe setup"],
    },
    {
      title: "Layout",
      items: ["Spacing", "Responsive structure", "Alignment"],
    },
    {
      title: "Style",
      items: ["Color system", "Typography", "Visual depth"],
    },
    {
      title: "Premium",
      items: ["Effects", "Motion", "Luxury presets"],
    },
  ];
}

function getOutcomePoints(block) {
  if (block.handle === "luxe-hero") {
    return [
      "Stronger first impression above the fold",
      "Cleaner CTA visibility",
      "More premium storytelling",
    ];
  }

  if (block.handle === "trust-bar") {
    return [
      "Clearer reassurance before purchase",
      "Stronger shopper confidence",
      "Cleaner mobile trust presentation",
    ];
  }

  if (block.handle === "premium-features") {
    return [
      "Faster benefit scanning",
      "Cleaner value presentation",
      "Stronger merchandising structure",
    ];
  }

  if (block.handle === "trust-payments-showcase") {
    return [
      "Higher checkout confidence",
      "Better payment and shipping visibility",
      "Premium trust-focused layout",
    ];
  }

  if (block.handle === "video-showcase") {
    return [
      "Stronger product attention",
      "Better visual storytelling",
      "Higher mobile merchandising impact",
    ];
  }

  return [
    "Cleaner storefront structure",
    "Merchant-friendly editing flow",
    "Better premium presentation",
  ];
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

  const liveCatalogBlocks = blockLibraryItems.map((block) => ({
    ...block,
    availability: "live",
    capabilityList: block.features,
  }));

  const plannedCatalogBlocks = roadmapBlockItems.map((block) => ({
    ...block,
    availability: "planned",
    capabilityList: block.plannedFeatures,
  }));

  const catalogBlocks = [...liveCatalogBlocks, ...plannedCatalogBlocks];

  const selectedHandle =
    searchParams.get("block") ?? liveCatalogBlocks[0]?.handle ?? null;

  const selectedBlock =
    catalogBlocks.find((block) => block.handle === selectedHandle) ??
    liveCatalogBlocks[0] ??
    null;

  const addBlockUrl =
    onboardingLinks.find((item) => item.key === selectedBlock?.handle)?.url ??
    null;
  const appEmbedUrl =
    onboardingLinks.find((item) => item.key === "enable-app")?.url ?? null;

  const editorSections = selectedBlock ? getEditorSections(selectedBlock) : [];
  const outcomePoints = selectedBlock ? getOutcomePoints(selectedBlock) : [];

  return (
    <Page>
      <BlockStack gap="400">
        {selectedBlock ? (
          <Card>
            <InlineGrid columns={{ xs: 1, lg: "1.25fr auto" }} gap="300">
              <BlockStack gap="150">
                <InlineStack gap="200" blockAlign="center" wrap>
                  <Text as="h1" variant="headingLg">
                    Blocks Studio
                  </Text>
                  <Badge tone={getAvailabilityTone(selectedBlock)}>
                    {getAvailabilityLabel(selectedBlock)}
                  </Badge>
                  <Badge tone="success">{currentPlanLabel}</Badge>
                </InlineStack>

                <Text as="p" variant="bodyMd" tone="subdued">
                  Two actions only: connect <b>{selectedBlock.name}</b> in
                  Shopify, then edit it inside Luxe Sections Studio.
                </Text>

                <InlineStack gap="200" wrap>
                  {selectedBlock.availability === "live" && addBlockUrl ? (
                    <Button onClick={() => openInTopWindow(addBlockUrl)}>
                      Connect in Shopify
                    </Button>
                  ) : (
                    <Button disabled>
                      {selectedBlock.availability === "live"
                        ? "Connect in Shopify"
                        : "Shopify connect when live"}
                    </Button>
                  )}

                  {hasDedicatedEditor(selectedBlock.handle) ? (
                    <Link
                      to={getBlockEditorPath(selectedBlock.handle)}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="primary">Edit inside app</Button>
                    </Link>
                  ) : (
                    <Button disabled>Editor coming next</Button>
                  )}

                  {appEmbedUrl ? (
                    <Button
                      variant="secondary"
                      onClick={() => openInTopWindow(appEmbedUrl)}
                    >
                      App embeds
                    </Button>
                  ) : (
                    <Button disabled>App embeds</Button>
                  )}
                </InlineStack>
              </BlockStack>

              <BlockStack gap="100">
                <Text as="p" variant="bodySm" tone="subdued">
                  Theme: {activeThemeName ?? "Not found"}{" "}
                  {activeThemeId ? `(ID: ${activeThemeId})` : ""}
                </Text>
                <Text as="p" variant="bodySm" tone="subdued">
                  Billing: {hasActivePayment ? "Active paid plan" : "Free plan"}
                </Text>
                <Text as="p" variant="bodySm" tone="subdued">
                  Plan source: {currentPlanSource}
                </Text>
              </BlockStack>
            </InlineGrid>
          </Card>
        ) : null}

        <InlineGrid columns={{ xs: 1, lg: "280px minmax(0,1fr) 430px" }} gap="400">
          <BlockStack gap="300">
            <Card>
              <BlockStack gap="250">
                <InlineStack align="space-between" blockAlign="center">
                  <Text as="h2" variant="headingMd">
                    Block editors
                  </Text>
                  <Badge tone="info">{catalogBlocks.length}</Badge>
                </InlineStack>

                <Text as="p" variant="bodySm" tone="subdued">
                  Select a block on the left, then use the workspace and preview
                  on the right.
                </Text>

                <BlockStack gap="150">
                  {catalogBlocks.map((block) => {
                    const isSelected = selectedBlock?.handle === block.handle;

                    return (
                      <Link
                        key={block.handle}
                        to={`/app/blocks?block=${block.handle}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Box
                          padding="300"
                          borderWidth="025"
                          borderRadius="300"
                          background={
                            isSelected ? "bg-surface-secondary" : "bg-surface"
                          }
                        >
                          <BlockStack gap="100">
                            <InlineStack
                              align="space-between"
                              blockAlign="center"
                            >
                              <Text as="p" variant="bodyMd" fontWeight="semibold">
                                {block.name}
                              </Text>

                              <Badge tone={getCatalogStageTone(block)}>
                                {getCatalogStageLabel(block)}
                              </Badge>
                            </InlineStack>

                            <InlineStack gap="150" wrap>
                              <Badge tone={getCatalogEditorTone(block)}>
                                {getCatalogEditorLabel(block)}
                              </Badge>
                            </InlineStack>

                            <Text as="p" variant="bodySm" tone="subdued">
                              {block.description}
                            </Text>
                          </BlockStack>
                        </Box>
                      </Link>
                    );
                  })}
                </BlockStack>
              </BlockStack>
            </Card>
          </BlockStack>

          <BlockStack gap="300">
            {selectedBlock ? (
              <Card>
                <BlockStack gap="250">
                  <InlineStack align="space-between" blockAlign="center" wrap>
                    <BlockStack gap="050">
                      <InlineStack gap="200" blockAlign="center" wrap>
                        <Text as="h2" variant="headingLg">
                          {selectedBlock.name}
                        </Text>
                        <Badge tone={getAvailabilityTone(selectedBlock)}>
                          {getAvailabilityLabel(selectedBlock)}
                        </Badge>
                      </InlineStack>

                      <Text as="p" variant="bodyMd" tone="subdued">
                        {selectedBlock.description}
                      </Text>
                    </BlockStack>

                    <InlineStack gap="200" wrap>
                      {hasDedicatedEditor(selectedBlock.handle) ? (
                        <Link
                          to={getBlockEditorPath(selectedBlock.handle)}
                          style={{ textDecoration: "none" }}
                        >
                          <Button variant="primary">
                            {getEditorButtonLabel(selectedBlock)}
                          </Button>
                        </Link>
                      ) : (
                        <Button disabled>Editor coming next</Button>
                      )}
                    </InlineStack>
                  </InlineStack>
                </BlockStack>
              </Card>
            ) : null}

            {selectedBlock ? (
              <Card>
                <BlockStack gap="250">
                  <BlockStack gap="050">
                    <Text as="h2" variant="headingMd">
                      Editor workspace
                    </Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      Clean editing structure for merchants: content, layout,
                      responsive control, and premium styling.
                    </Text>
                  </BlockStack>

                  <InlineGrid columns={{ xs: 1, md: 2 }} gap="200">
                    {editorSections.map((section) => (
                      <Box
                        key={section.title}
                        padding="300"
                        borderWidth="025"
                        borderRadius="300"
                        background="bg-surface-secondary"
                      >
                        <BlockStack gap="150">
                          <Text as="h3" variant="headingSm">
                            {section.title}
                          </Text>

                          <List>
                            {section.items.map((item) => (
                              <List.Item key={item}>{item}</List.Item>
                            ))}
                          </List>
                        </BlockStack>
                      </Box>
                    ))}
                  </InlineGrid>
                </BlockStack>
              </Card>
            ) : null}

            {selectedBlock ? (
              <Card>
                <InlineGrid columns={{ xs: 1, md: 2 }} gap="300">
                  <BlockStack gap="200">
                    <Text as="h3" variant="headingSm">
                      Merchant controls
                    </Text>

                    <List>
                      {selectedBlock.capabilityList.map((item) => (
                        <List.Item key={item}>{item}</List.Item>
                      ))}
                    </List>
                  </BlockStack>

                  <BlockStack gap="200">
                    <Text as="h3" variant="headingSm">
                      Storefront result
                    </Text>

                    <List>
                      {outcomePoints.map((item) => (
                        <List.Item key={item}>{item}</List.Item>
                      ))}
                    </List>
                  </BlockStack>
                </InlineGrid>
              </Card>
            ) : null}
          </BlockStack>

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
                        width: getPreviewWidth(device),
                        maxWidth: "100%",
                        transition: "width 160ms ease",
                      }}
                    >
                      {selectedBlock
                        ? renderSelectedPreview(
                            selectedBlock.handle,
                            device,
                            selectedBlock.name,
                          )
                        : null}
                    </div>
                  </div>
                </Box>

                <Text as="p" variant="bodySm" tone="subdued">
                  Preview stays fixed on the right so device switching feels
                  stable while the merchant edits the block.
                </Text>
              </BlockStack>
            </Card>
          </div>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}