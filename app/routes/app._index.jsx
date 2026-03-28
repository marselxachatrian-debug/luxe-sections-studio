import { useLoaderData } from "react-router";
import {
  Badge,
  BlockStack,
  Button,
  Card,
  InlineGrid,
  InlineStack,
  List,
  Page,
  Text,
} from "@shopify/polaris";
import { blockLibraryItems } from "../studio-data";
import { BLOCK_KEYS, PLAN_LABELS, canAccessBlockFeature } from "../plan-rules";
import { getBlockFeatureCatalog } from "../block-feature-catalog";
import { getCurrentPlanFromRequest } from "../current-plan.server";
import { getActiveThemeFromRequest } from "../active-theme.server";
import { getThemeEditorOnboardingLinks } from "../theme-editor-links";
import { getMockBillingStatus } from "../billing-helpers";

function countAccessibleFeatures(planKey, blockKey) {
  const features = getBlockFeatureCatalog(blockKey);

  return features.filter((feature) =>
    canAccessBlockFeature(planKey, blockKey, feature.key),
  ).length;
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

export default function DashboardRoute() {
  const {
    currentPlanKey,
    currentPlanLabel,
    currentPlanSource,
    hasActivePayment,
    activeThemeName,
    activeThemeId,
    onboardingLinks,
  } = useLoaderData();

  const billingStatus = getMockBillingStatus(currentPlanKey);

  const currentPlanSnapshots = [
    {
      name: "Luxe Hero",
      value: `${countAccessibleFeatures(currentPlanKey, BLOCK_KEYS.LUXE_HERO)}/${getBlockFeatureCatalog(BLOCK_KEYS.LUXE_HERO).length}`,
    },
    {
      name: "Trust Bar",
      value: `${countAccessibleFeatures(currentPlanKey, BLOCK_KEYS.TRUST_BAR)}/${getBlockFeatureCatalog(BLOCK_KEYS.TRUST_BAR).length}`,
    },
    {
      name: "Premium Features",
      value: `${countAccessibleFeatures(currentPlanKey, BLOCK_KEYS.PREMIUM_FEATURES)}/${getBlockFeatureCatalog(BLOCK_KEYS.PREMIUM_FEATURES).length}`,
    },
  ];

  const setupSteps = [
    "Install the app and confirm it opens inside Shopify admin.",
    "Open the Theme Editor and add the blocks you want to use.",
    "Adjust content, spacing, style, and mobile presentation.",
    "Upgrade only when your store needs more control or premium visuals.",
  ];

  const pageGuide = [
    {
      name: "Dashboard",
      description: "Start here for setup guidance, current plan visibility, and quick actions.",
    },
    {
      name: "Blocks Library",
      description: "See which storefront blocks are ready to use in your theme.",
    },
    {
      name: "Pricing",
      description: "Compare plans side by side and upgrade only when it makes sense.",
    },
    {
      name: "Settings",
      description: "Check plan-based controls and preview what each plan unlocks.",
    },
  ];

  return (
    <Page
      title="Dashboard"
      subtitle="A clear starting point for merchants who want a more premium Shopify storefront."
    >
      <BlockStack gap="500">
        <Card>
          <BlockStack gap="300">
            <InlineStack align="space-between" blockAlign="center">
              <BlockStack gap="100">
                <Text as="h2" variant="headingLg">
                  Welcome to Luxe Sections Studio
                </Text>
                <Text as="p" variant="bodyMd" tone="subdued">
                  Use this page as your guide. Start with your theme, add the
                  right blocks, adjust your design, and upgrade only when your
                  store needs more control.
                </Text>
              </BlockStack>

              <Badge tone="success">{currentPlanLabel}</Badge>
            </InlineStack>

            <InlineGrid columns={{ xs: 1, md: 3 }} gap="300">
              {onboardingLinks.map((link) =>
                link.url ? (
                  <Button key={link.key} url={link.url} variant="primary">
                    Open {link.label}
                  </Button>
                ) : (
                  <Button key={link.key} disabled>
                    Open {link.label}
                  </Button>
                ),
              )}
            </InlineGrid>
          </BlockStack>
        </Card>

        <InlineGrid columns={{ xs: 1, md: 4 }} gap="400">
          <Card>
            <BlockStack gap="150">
              <Text as="h3" variant="headingSm">
                Current plan
              </Text>
              <Text as="p" variant="headingLg">
                {currentPlanLabel}
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Source: {currentPlanSource}
              </Text>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="150">
              <Text as="h3" variant="headingSm">
                Active theme
              </Text>
              <Text as="p" variant="headingLg">
                {activeThemeName ?? "Not found"}
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                {activeThemeId ? `Theme ID: ${activeThemeId}` : "No theme ID"}
              </Text>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="150">
              <Text as="h3" variant="headingSm">
                Live blocks
              </Text>
              <Text as="p" variant="headingLg">
                {blockLibraryItems.length}
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Ready for storefront use
              </Text>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="150">
              <Text as="h3" variant="headingSm">
                Mobile-ready
              </Text>
              <Text as="p" variant="headingLg">
                Yes
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Every plan supports mobile controls
              </Text>
            </BlockStack>
          </Card>
        </InlineGrid>

        <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Start here
              </Text>

              <List type="number">
                {setupSteps.map((step) => (
                  <List.Item key={step}>{step}</List.Item>
                ))}
              </List>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                What each page is for
              </Text>

              <List>
                {pageGuide.map((item) => (
                  <List.Item key={item.name}>
                    <strong>{item.name}:</strong> {item.description}
                  </List.Item>
                ))}
              </List>
            </BlockStack>
          </Card>
        </InlineGrid>

        <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Included in your current plan
              </Text>

              <List>
                {currentPlanSnapshots.map((item) => (
                  <List.Item key={item.name}>
                    {item.name}: {item.value} controls available
                  </List.Item>
                ))}
              </List>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Upgrade when it helps your store
              </Text>

              <List>
                <List.Item>
                  Paid billing active: {hasActivePayment ? "Yes" : "No"}
                </List.Item>
                <List.Item>
                  Available upgrades:{" "}
                  {billingStatus.availableUpgrades.length > 0
                    ? billingStatus.availableUpgrades.join(", ")
                    : "None"}
                </List.Item>
                <List.Item>
                  Upgrade only when you need more layout control or stronger
                  premium visuals
                </List.Item>
              </List>
            </BlockStack>
          </Card>
        </InlineGrid>

        <Card>
          <BlockStack gap="300">
            <Text as="h2" variant="headingMd">
              Ready blocks for your store
            </Text>

            <List>
              {blockLibraryItems.map((block) => (
                <List.Item key={block.handle}>
                  {block.name} — {block.status}
                </List.Item>
              ))}
            </List>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}