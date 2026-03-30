import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router";
import {
  Badge,
  BlockStack,
  Button,
  Card,
  InlineGrid,
  InlineStack,
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

function getStageBadgeTone(block) {
  return block.availability === "live" ? "success" : "attention";
}

function getStageBadgeLabel(block) {
  return block.availability === "live" ? "Live" : "Coming next";
}

function renderHeroArtwork() {
  return (
    <div
      style={{
        minHeight: "188px",
        borderRadius: "20px",
        padding: "20px",
        background:
          "linear-gradient(135deg, #0f172a 0%, #182235 55%, #8a6a2f 100%)",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignSelf: "flex-start",
          padding: "6px 10px",
          borderRadius: "999px",
          background: "rgba(248, 231, 176, 0.14)",
          color: "#f8e7b0",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        Hero
      </div>

      <div>
        <div
          style={{
            fontSize: "24px",
            lineHeight: 1.05,
            fontWeight: 700,
            maxWidth: "240px",
            marginBottom: "10px",
          }}
        >
          Premium first impression
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              height: "38px",
              padding: "0 16px",
              borderRadius: "999px",
              background: "#f8e7b0",
              color: "#111827",
              display: "flex",
              alignItems: "center",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            Shop now
          </div>

          <div
            style={{
              height: "38px",
              padding: "0 16px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            Learn more
          </div>
        </div>
      </div>
    </div>
  );
}

function renderTrustArtwork() {
  return (
    <div
      style={{
        minHeight: "188px",
        borderRadius: "20px",
        padding: "18px",
        background: "#ffffff",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        boxShadow: "0 12px 24px rgba(15, 23, 42, 0.06)",
      }}
    >
      <div
        style={{
          fontSize: "18px",
          lineHeight: 1.2,
          fontWeight: 700,
          color: "#111827",
          marginBottom: "14px",
        }}
      >
        Why shoppers trust your store
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "10px",
        }}
      >
        {["Fast delivery", "Secure checkout", "Easy support"].map((item) => (
          <div
            key={item}
            style={{
              borderRadius: "16px",
              padding: "12px",
              background: "#f8fafc",
              border: "1px solid rgba(15, 23, 42, 0.06)",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                background:
                  "linear-gradient(135deg, #111827 0%, #1f2937 70%, #7c5c2b 100%)",
                marginBottom: "10px",
              }}
            />

            <div
              style={{
                fontSize: "12px",
                lineHeight: 1.4,
                fontWeight: 600,
                color: "#111827",
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

function renderFeaturesArtwork() {
  return (
    <div
      style={{
        minHeight: "188px",
        borderRadius: "20px",
        padding: "18px",
        background:
          "linear-gradient(180deg, #fffdf8 0%, #ffffff 45%, #f8fafc 100%)",
        border: "1px solid rgba(15, 23, 42, 0.08)",
      }}
    >
      <div
        style={{
          fontSize: "18px",
          lineHeight: 1.2,
          fontWeight: 700,
          color: "#111827",
          marginBottom: "14px",
        }}
      >
        Feature highlights
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "10px",
        }}
      >
        {["Premium", "Mobile", "Fast setup"].map((item) => (
          <div
            key={item}
            style={{
              borderRadius: "16px",
              padding: "12px",
              background: "#ffffff",
              border: "1px solid rgba(15, 23, 42, 0.06)",
              boxShadow: "0 8px 18px rgba(15, 23, 42, 0.04)",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                background:
                  "linear-gradient(135deg, #f8e7b0 0%, #e9c46a 100%)",
                marginBottom: "10px",
              }}
            />

            <div
              style={{
                fontSize: "12px",
                lineHeight: 1.4,
                fontWeight: 600,
                color: "#111827",
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

function renderTrustPaymentsArtwork() {
  return (
    <div
      style={{
        minHeight: "188px",
        borderRadius: "20px",
        padding: "18px",
        background: "#ffffff",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        display: "grid",
        gridTemplateColumns: "1.2fr 0.8fr",
        gap: "12px",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "18px",
            lineHeight: 1.2,
            fontWeight: 700,
            color: "#111827",
            marginBottom: "10px",
          }}
        >
          Trust + payment proof
        </div>

        <div style={{ display: "grid", gap: "8px" }}>
          {["Verified reviews", "Secure payments", "Delivery partners"].map(
            (item) => (
              <div
                key={item}
                style={{
                  borderRadius: "14px",
                  padding: "10px 12px",
                  background: "#f8fafc",
                  border: "1px solid rgba(15, 23, 42, 0.06)",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                {item}
              </div>
            ),
          )}
        </div>
      </div>

      <div
        style={{
          borderRadius: "16px",
          padding: "12px",
          background:
            "linear-gradient(180deg, #fffdf8 0%, #ffffff 45%, #f8fafc 100%)",
          border: "1px solid rgba(124, 92, 43, 0.12)",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#7c5c2b",
            marginBottom: "10px",
          }}
        >
          Payments
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "8px",
          }}
        >
          {["Visa", "MC", "PayPal", "DHL"].map((item) => (
            <div
              key={item}
              style={{
                minHeight: "42px",
                borderRadius: "12px",
                background: "#ffffff",
                border: "1px solid rgba(15, 23, 42, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
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
  );
}

function renderVideoArtwork() {
  return (
    <div
      style={{
        minHeight: "188px",
        borderRadius: "20px",
        padding: "18px",
        background:
          "linear-gradient(180deg, #0f172a 0%, #111827 55%, #1f2937 100%)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div
        style={{
          fontSize: "18px",
          lineHeight: 1.2,
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: "14px",
        }}
      >
        Vertical video showcase
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "10px",
        }}
      >
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            style={{
              borderRadius: "16px",
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
          </div>
        ))}
      </div>
    </div>
  );
}

function renderBlockArtwork(handle) {
  if (handle === "luxe-hero") {
    return renderHeroArtwork();
  }

  if (handle === "trust-bar") {
    return renderTrustArtwork();
  }

  if (handle === "premium-features") {
    return renderFeaturesArtwork();
  }

  if (handle === "trust-payments-showcase") {
    return renderTrustPaymentsArtwork();
  }

  if (handle === "video-showcase") {
    return renderVideoArtwork();
  }

  return (
    <div
      style={{
        minHeight: "188px",
        borderRadius: "20px",
        background:
          "linear-gradient(135deg, #f8fafc 0%, #eef2ff 55%, #fff7ed 100%)",
        border: "1px solid rgba(15, 23, 42, 0.08)",
      }}
    />
  );
}

function BlockCard({ block, addBlockUrl, onCustomize }) {
  const canCustomize = hasDedicatedEditor(block.handle);
  const canAdd = block.availability === "live" && Boolean(addBlockUrl);

  return (
    <Card>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          height: "100%",
        }}
      >
        <InlineStack align="space-between" blockAlign="center">
          <Text as="h2" variant="headingMd">
            {block.name}
          </Text>

          <Badge tone={getStageBadgeTone(block)}>{getStageBadgeLabel(block)}</Badge>
        </InlineStack>

        {renderBlockArtwork(block.handle)}

        <Text as="p" variant="bodySm" tone="subdued">
          {block.description}
        </Text>

        <div style={{ marginTop: "auto" }}>
          <InlineStack gap="200" wrap>
            {canAdd ? (
              <Button variant="primary" onClick={() => openInTopWindow(addBlockUrl)}>
                Add now
              </Button>
            ) : (
              <Button disabled>
                {block.availability === "live" ? "Add unavailable" : "Coming soon"}
              </Button>
            )}

            {canCustomize ? (
              <Button onClick={onCustomize}>Customize</Button>
            ) : (
              <Button disabled>Customize</Button>
            )}
          </InlineStack>
        </div>
      </div>
    </Card>
  );
}

export async function loader({ request }) {
  const currentPlanStatus = await getCurrentPlanFromRequest(request);
  const activeThemeStatus = await getActiveThemeFromRequest(request);

  const onboardingLinks = getThemeEditorOnboardingLinks(
    activeThemeStatus.shop,
    activeThemeStatus.themeId,
    process.env.SHOPIFY_API_KEY,
  );

  return {
    currentPlanLabel: PLAN_LABELS[currentPlanStatus.planKey],
    activeThemeName: activeThemeStatus.theme?.name ?? null,
    onboardingLinks,
  };
}

export default function BlocksLibraryRoute() {
  const { currentPlanLabel, activeThemeName, onboardingLinks } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname !== "/app/blocks") {
    return <Outlet />;
  }

  const liveCatalogBlocks = blockLibraryItems.map((block) => ({
    ...block,
    availability: "live",
  }));

  const plannedCatalogBlocks = roadmapBlockItems.map((block) => ({
    ...block,
    availability: "planned",
  }));

  const catalogBlocks = [...liveCatalogBlocks, ...plannedCatalogBlocks];

  const appEmbedUrl =
    onboardingLinks.find((item) => item.key === "enable-app")?.url ?? null;

  return (
    <Page>
      <BlockStack gap="400">
        <Card>
          <InlineGrid columns={{ xs: 1, md: "minmax(0, 1fr) auto" }} gap="300">
            <BlockStack gap="150">
              <InlineStack gap="200" blockAlign="center" wrap>
                <Text as="h1" variant="headingLg">
                  Blocks
                </Text>
                <Badge tone="success">{currentPlanLabel}</Badge>
                <Badge tone="info">{catalogBlocks.length} available</Badge>
              </InlineStack>

              <Text as="p" variant="bodyMd" tone="subdued">
                Build a cleaner, more premium storefront with ready-to-use
                sections. Add a block in Shopify, then customize it inside the
                app.
              </Text>
            </BlockStack>

            <BlockStack gap="100">
              <Text as="p" variant="bodySm" tone="subdued">
                Theme: {activeThemeName ?? "Main theme not found"}
              </Text>

              {appEmbedUrl ? (
                <div>
                  <Button onClick={() => openInTopWindow(appEmbedUrl)}>
                    App embeds
                  </Button>
                </div>
              ) : null}
            </BlockStack>
          </InlineGrid>
        </Card>

        <InlineGrid columns={{ xs: 1, sm: 2, lg: 3 }} gap="300">
          {catalogBlocks.map((block) => {
            const addBlockUrl =
              onboardingLinks.find((item) => item.key === block.handle)?.url ?? null;

            return (
              <BlockCard
                key={block.handle}
                block={block}
                addBlockUrl={addBlockUrl}
                onCustomize={() => navigate(getBlockEditorPath(block.handle))}
              />
            );
          })}
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}