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

function getAvailabilityTone(availability) {
  if (availability === "live") {
    return "success";
  }

  return "attention";
}

function getAvailabilityLabel(block) {
  if (block.availability === "live") {
    return hasDedicatedEditor(block.handle)
      ? "Editor ready"
      : "Live in theme";
  }

  return block.status || "Planned next";
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

          <div
            style={{
              display: "grid",
              gap: "10px",
            }}
          >
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
  const columns =
    device === "mobile" ? "1fr" : "repeat(3, minmax(0, 1fr))";

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
        items: [
          "Heading and subheading",
          "Primary and secondary CTA",
          "Hero message structure",
        ],
      },
      {
        title: "Visual design",
        items: [
          "Background media direction",
          "Overlay depth and contrast",
          "Premium visual styling",
        ],
      },
      {
        title: "Layout and mobile",
        items: [
          "Desktop and mobile height",
          "Spacing control",
          "Alignment tuning",
        ],
      },
      {
        title: "Premium layer",
        items: [
          "Glow and shimmer path",
          "Motion upgrades",
          "Luxury presets",
        ],
      },
    ];
  }

  if (block.handle === "trust-bar") {
    return [
      {
        title: "Trust content",
        items: [
          "Trust items and reassurance copy",
          "Heading structure",
          "Merchant-safe proof points",
        ],
      },
      {
        title: "Layout",
        items: [
          "Desktop column structure",
          "Padding and spacing",
          "Section direction",
        ],
      },
      {
        title: "Visual style",
        items: [
          "Background treatment",
          "Icon presentation",
          "Premium polish",
        ],
      },
      {
        title: "Mobile-ready",
        items: [
          "Responsive spacing",
          "Compact reading flow",
          "Cleaner trust visibility",
        ],
      },
    ];
  }

  if (block.handle === "premium-features") {
    return [
      {
        title: "Feature content",
        items: [
          "Heading and subheading",
          "Feature card titles",
          "Feature descriptions",
        ],
      },
      {
        title: "Card design",
        items: [
          "Icon-led presentation",
          "Card structure",
          "Section style",
        ],
      },
      {
        title: "Layout",
        items: [
          "Desktop column count",
          "Top and bottom padding",
          "Heading alignment",
        ],
      },
      {
        title: "Growth path",
        items: [
          "Richer icon control",
          "Premium styling",
          "Stronger merchandising feel",
        ],
      },
    ];
  }

  if (block.handle === "trust-payments-showcase") {
    return [
      {
        title: "Trust messaging",
        items: [
          "Headline and support copy",
          "Review link area",
          "Confidence messaging",
        ],
      },
      {
        title: "Payments and partners",
        items: [
          "Payment icons",
          "Delivery partner icons",
          "Link support",
        ],
      },
      {
        title: "Layout",
        items: [
          "Left-right composition",
          "Desktop and mobile control",
          "Spacing and icon size",
        ],
      },
      {
        title: "Premium layer",
        items: [
          "Hover effects",
          "Glow treatment",
          "Luxury motion polish",
        ],
      },
    ];
  }

  if (block.handle === "video-showcase") {
    return [
      {
        title: "Video cards",
        items: [
          "9:16 showcase media",
          "Card titles and subtitles",
          "CTA destination",
        ],
      },
      {
        title: "Layout and flow",
        items: [
          "Desktop and mobile arrangement",
          "Active and inactive states",
          "Spacing control",
        ],
      },
      {
        title: "Visual styling",
        items: [
          "Overlay and color control",
          "Typography tuning",
          "Premium showcase framing",
        ],
      },
      {
        title: "Motion system",
        items: [
          "Carousel feel",
          "Spotlight transitions",
          "Luxury movement",
        ],
      },
    ];
  }

  return [
    {
      title: "Content",
      items: ["Core content controls", "Copy structure", "Merchant-safe setup"],
    },
    {
      title: "Layout",
      items: ["Block spacing", "Desktop and mobile structure", "Alignment"],
    },
    {
      title: "Style",
      items: ["Color system", "Visual depth", "Typography direction"],
    },
    {
      title: "Premium layer",
      items: ["Effects", "Motion", "Luxury presets"],
    },
  ];
}

function getGuideSteps(block, onboardingLinks) {
  const appEmbedLink =
    onboardingLinks.find((item) => item.key === "enable-app")?.url ?? null;
  const addBlockLink =
    onboardingLinks.find((item) => item.key === block.handle)?.url ?? null;
  const editorReady = hasDedicatedEditor(block.handle);

  if (block.availability === "planned") {
    return [
      {
        title: "1. Prepare the block",
        zone: "Roadmap",
        description:
          "This block is planned next and is being prepared for merchant-first editing inside the app.",
      },
      {
        title: "2. Define the install flow",
        zone: "Shopify",
        description:
          "The final flow will include adding the block to the right template and enabling any needed app support.",
      },
      {
        title: "3. Edit inside the app",
        zone: "App",
        description:
          "Main design, layout, color, mobile, and premium settings will live inside Luxe Sections Studio.",
      },
      {
        title: "4. Preview and publish",
        zone: "Preview",
        description:
          "The merchant will review desktop, tablet, and mobile presentation before publishing.",
      },
    ];
  }

  return [
    {
      title: "1. Add block to theme",
      zone: "Shopify",
      description:
        "Open Theme Editor and place this app block into the correct template for the storefront.",
      actionLabel: "Add block",
      actionUrl: addBlockLink,
    },
    {
      title: "2. Enable app support",
      zone: "Shopify",
      description:
        "Open the app embeds area when needed and keep Shopify focused on placement and activation.",
      actionLabel: "Open app embeds",
      actionUrl: appEmbedLink,
    },
    {
      title: "3. Edit inside the app",
      zone: "App",
      description:
        "Use Luxe Sections Studio for the main visual editing flow, including layout, colors, mobile, and premium controls.",
      actionPath: editorReady ? getBlockEditorPath(block.handle) : null,
      actionLabel: editorReady ? "Open editor" : "Editor coming next",
    },
    {
      title: "4. Preview and publish",
      zone: "Preview",
      description:
        "Review the live preview on desktop, tablet, and mobile before publishing changes to the storefront.",
    },
  ];
}

function getBlockOutcomePoints(block) {
  if (block.handle === "luxe-hero") {
    return [
      "Stronger first impression above the fold",
      "Cleaner CTA visibility",
      "More premium storefront storytelling",
    ];
  }

  if (block.handle === "trust-bar") {
    return [
      "Clearer reassurance before purchase",
      "Cleaner support for trust messaging",
      "Better confidence for shoppers on mobile",
    ];
  }

  if (block.handle === "premium-features") {
    return [
      "Faster benefit scanning",
      "Cleaner product value presentation",
      "Stronger merchandising structure",
    ];
  }

  if (block.handle === "trust-payments-showcase") {
    return [
      "Higher checkout confidence",
      "Clear payment and delivery visibility",
      "Premium conversion-focused trust layout",
    ];
  }

  if (block.handle === "video-showcase") {
    return [
      "Stronger product attention",
      "Richer premium storytelling",
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

  const guideSteps = selectedBlock
    ? getGuideSteps(selectedBlock, onboardingLinks)
    : [];

  const editorSections = selectedBlock ? getEditorSections(selectedBlock) : [];
  const outcomePoints = selectedBlock ? getBlockOutcomePoints(selectedBlock) : [];

  return (
    <Page
      title="Blocks Studio"
      subtitle="A merchant-first workspace where blocks are selected, installed, edited, previewed, and prepared for publishing."
    >
      <BlockStack gap="500">
        <Card>
          <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
            <BlockStack gap="250">
              <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingLg">
                  Premium block editing hub
                </Text>
                <Badge tone="success">{currentPlanLabel}</Badge>
              </InlineStack>

              <Text as="p" variant="bodyMd" tone="subdued">
                Main editing belongs inside Luxe Sections Studio. Shopify Theme
                Editor should stay focused on block placement, activation, and
                only minimal fallback setup.
              </Text>

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
                    App owns the real editing
                  </Text>
                  <List>
                    <List.Item>Colors, spacing, and layout structure</List.Item>
                    <List.Item>Desktop, tablet, and mobile tuning</List.Item>
                    <List.Item>Visual depth, effects, and premium presets</List.Item>
                    <List.Item>Merchant-friendly editing flow with preview</List.Item>
                  </List>
                </BlockStack>
              </Card>

              <Card roundedAbove="sm">
                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">
                    Shopify stays minimal
                  </Text>
                  <List>
                    <List.Item>Add the app block to the right template</List.Item>
                    <List.Item>Turn the block or app embed on</List.Item>
                    <List.Item>Keep only light fallback fields in theme settings</List.Item>
                    <List.Item>Avoid overwhelming merchants inside Theme Editor</List.Item>
                  </List>
                </BlockStack>
              </Card>
            </InlineGrid>
          </InlineGrid>
        </Card>

        <InlineGrid columns={{ xs: 1, lg: "260px 1fr 0.95fr" }} gap="400">
          <BlockStack gap="300">
            <Card>
              <BlockStack gap="250">
                <InlineStack align="space-between" blockAlign="center">
                  <Text as="h2" variant="headingMd">
                    Block catalog
                  </Text>
                  <Badge tone="info">{catalogBlocks.length} total</Badge>
                </InlineStack>

                <Text as="p" variant="bodySm" tone="subdued">
                  Select a block from the studio library. Live blocks already
                  have editor pages. Planned blocks show the next expansion path.
                </Text>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="250">
                <Text as="h3" variant="headingSm">
                  Live now
                </Text>

                <BlockStack gap="150">
                  {liveCatalogBlocks.map((block) => {
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
                          <BlockStack gap="150">
                            <InlineStack
                              align="space-between"
                              blockAlign="center"
                            >
                              <Text as="p" variant="bodyMd" fontWeight="semibold">
                                {block.name}
                              </Text>
                              <Badge tone="success">
                                {getAvailabilityLabel(block)}
                              </Badge>
                            </InlineStack>

                            <Text as="p" variant="bodySm" tone="subdued">
                              {block.status}
                            </Text>
                          </BlockStack>
                        </Box>
                      </Link>
                    );
                  })}
                </BlockStack>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="250">
                <Text as="h3" variant="headingSm">
                  Planned next
                </Text>

                <BlockStack gap="150">
                  {plannedCatalogBlocks.map((block) => {
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
                          <BlockStack gap="150">
                            <InlineStack
                              align="space-between"
                              blockAlign="center"
                            >
                              <Text as="p" variant="bodyMd" fontWeight="semibold">
                                {block.name}
                              </Text>
                              <Badge tone="attention">
                                {getAvailabilityLabel(block)}
                              </Badge>
                            </InlineStack>

                            <Text as="p" variant="bodySm" tone="subdued">
                              {block.status}
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

          <BlockStack gap="400">
            {selectedBlock ? (
              <Card>
                <BlockStack gap="300">
                  <InlineStack align="space-between" blockAlign="center">
                    <Text as="h2" variant="headingMd">
                      Install guide for {selectedBlock.name}
                    </Text>
                    <Badge tone={getAvailabilityTone(selectedBlock.availability)}>
                      {selectedBlock.availability === "live"
                        ? "Ready to use"
                        : "Planned next"}
                    </Badge>
                  </InlineStack>

                  <InlineGrid columns={{ xs: 1, md: 2, xl: 4 }} gap="300">
                    {guideSteps.map((step) => (
                      <Card key={step.title} roundedAbove="sm">
                        <BlockStack gap="200">
                          <InlineStack align="space-between" blockAlign="center">
                            <Text as="h3" variant="headingSm">
                              {step.title}
                            </Text>
                            <Badge tone="info">{step.zone}</Badge>
                          </InlineStack>

                          <Text as="p" variant="bodyMd" tone="subdued">
                            {step.description}
                          </Text>

                          {step.actionUrl ? (
                            <Button onClick={() => openInTopWindow(step.actionUrl)}>
                              {step.actionLabel}
                            </Button>
                          ) : null}

                          {step.actionPath ? (
                            <Link
                              to={step.actionPath}
                              style={{ textDecoration: "none" }}
                            >
                              <Button variant="primary">{step.actionLabel}</Button>
                            </Link>
                          ) : null}

                          {!step.actionUrl && !step.actionPath && step.actionLabel ? (
                            <Button disabled>{step.actionLabel}</Button>
                          ) : null}
                        </BlockStack>
                      </Card>
                    ))}
                  </InlineGrid>
                </BlockStack>
              </Card>
            ) : null}

            {selectedBlock ? (
              <Card>
                <BlockStack gap="300">
                  <InlineStack align="space-between" blockAlign="center">
                    <BlockStack gap="100">
                      <InlineStack gap="200" blockAlign="center">
                        <Text as="h2" variant="headingLg">
                          {selectedBlock.name}
                        </Text>
                        <Badge tone={getAvailabilityTone(selectedBlock.availability)}>
                          {getAvailabilityLabel(selectedBlock)}
                        </Badge>
                      </InlineStack>

                      <Text as="p" variant="bodyMd" tone="subdued">
                        {selectedBlock.description}
                      </Text>
                    </BlockStack>

                    {hasDedicatedEditor(selectedBlock.handle) ? (
                      <Link
                        to={getBlockEditorPath(selectedBlock.handle)}
                        style={{ textDecoration: "none" }}
                      >
                        <Button variant="primary">Open full editor</Button>
                      </Link>
                    ) : (
                      <Button disabled>Editor coming next</Button>
                    )}
                  </InlineStack>

                  <Divider />

                  <InlineGrid columns={{ xs: 1, md: 2 }} gap="300">
                    {editorSections.map((section) => (
                      <Card key={section.title} roundedAbove="sm">
                        <BlockStack gap="200">
                          <Text as="h3" variant="headingSm">
                            {section.title}
                          </Text>

                          <List>
                            {section.items.map((item) => (
                              <List.Item key={item}>{item}</List.Item>
                            ))}
                          </List>
                        </BlockStack>
                      </Card>
                    ))}
                  </InlineGrid>

                  <InlineGrid columns={{ xs: 1, md: 2 }} gap="300">
                    <Card roundedAbove="sm">
                      <BlockStack gap="200">
                        <Text as="h3" variant="headingSm">
                          What the merchant can control
                        </Text>

                        <List>
                          {selectedBlock.capabilityList.map((item) => (
                            <List.Item key={item}>{item}</List.Item>
                          ))}
                        </List>
                      </BlockStack>
                    </Card>

                    <Card roundedAbove="sm">
                      <BlockStack gap="200">
                        <Text as="h3" variant="headingSm">
                          Storefront outcome
                        </Text>

                        <List>
                          {outcomePoints.map((item) => (
                            <List.Item key={item}>{item}</List.Item>
                          ))}
                        </List>
                      </BlockStack>
                    </Card>
                  </InlineGrid>

                  <InlineStack gap="200">
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

                    {selectedBlock.availability === "live" ? (
                      <Button
                        onClick={() =>
                          openInTopWindow(
                            onboardingLinks.find(
                              (item) => item.key === selectedBlock.handle,
                            )?.url,
                          )
                        }
                      >
                        Add in Theme Editor
                      </Button>
                    ) : (
                      <Button disabled>Add in Theme Editor</Button>
                    )}
                  </InlineStack>
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
                            selectedBlock.handle,
                            device,
                            selectedBlock.name,
                          )
                        : null}
                    </div>
                  </div>
                </Box>

                <Text as="p" variant="bodySm" tone="subdued">
                  The preview on the right stays visible while the merchant moves
                  through install, editing, and publishing steps inside the app.
                </Text>
              </BlockStack>
            </Card>

            {selectedBlock ? (
              <Card>
                <BlockStack gap="250">
                  <Text as="h2" variant="headingMd">
                    Selected block summary
                  </Text>

                  <List>
                    <List.Item>
                      Block type:{" "}
                      {selectedBlock.availability === "live"
                        ? "Live block"
                        : "Planned block"}
                    </List.Item>
                    <List.Item>
                      Main editing location:{" "}
                      {hasDedicatedEditor(selectedBlock.handle)
                        ? "Inside Luxe Sections Studio"
                        : "Editor planned inside Luxe Sections Studio"}
                    </List.Item>
                    <List.Item>
                      Theme Editor role: placement, activation, and light fallback
                      setup
                    </List.Item>
                  </List>
                </BlockStack>
              </Card>
            ) : null}
          </BlockStack>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}