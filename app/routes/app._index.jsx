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
import { dashboardItems, blockLibraryItems } from "../studio-data";
import { BLOCK_KEYS, PLAN_LABELS, canAccessBlockFeature } from "../plan-rules";
import { getBlockFeatureCatalog } from "../block-feature-catalog";
import { getCurrentPlanFromRequest } from "../current-plan.server";
import { getActiveThemeFromRequest } from "../active-theme.server";
import { getThemeEditorOnboardingLinks } from "../theme-editor-links";
import { getMockBillingStatus } from "../billing-helpers";

const recentProgress = [
  "Trust Bar now includes top and bottom padding controls.",
  "Premium Features now includes icon selection for all four feature cards.",
  "Billing config is now normalized for future Shopify subscription wiring.",
  "Blocks Library now includes real Theme Editor deep links.",
];

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

  return (
    <Page
      title="Dashboard"
      subtitle="Current project status for Luxe Sections Studio."
    >
      <BlockStack gap="500">
        <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
          {dashboardItems.map((item) => (
            <Card key={item.title}>
              <BlockStack gap="200">
                <Text as="h2" variant="headingSm">
                  {item.title}
                </Text>
                <Text as="p" variant="headingLg">
                  {item.value}
                </Text>
                <Text as="p" variant="bodyMd" tone="subdued">
                  {item.description}
                </Text>
              </BlockStack>
            </Card>
          ))}
        </InlineGrid>

        <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
          <Card>
            <BlockStack gap="300">
              <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingMd">
                  Current app plan
                </Text>
                <Badge tone="success">{currentPlanLabel}</Badge>
              </InlineStack>

              <Text as="p" variant="bodyMd" tone="subdued">
                Plan source: {currentPlanSource}. Active paid billing:{" "}
                {hasActivePayment ? "Yes" : "No"}.
              </Text>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Current build scope
              </Text>

              <List>
                <List.Item>Admin UI</List.Item>
                <List.Item>Theme app extension blocks</List.Item>
                <List.Item>Billing-aware plan resolution</List.Item>
                <List.Item>Theme Editor onboarding flow</List.Item>
              </List>
            </BlockStack>
          </Card>
        </InlineGrid>

        <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Live blocks overview
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

          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Recent progress
              </Text>

              <List>
                {recentProgress.map((item) => (
                  <List.Item key={item}>{item}</List.Item>
                ))}
              </List>
            </BlockStack>
          </Card>
        </InlineGrid>

        <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Current plan block access
              </Text>

              <List>
                {currentPlanSnapshots.map((item) => (
                  <List.Item key={item.name}>
                    {item.name}: {item.value} features available
                  </List.Item>
                ))}
              </List>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Billing-ready status
              </Text>

              <List>
                <List.Item>
                  Current billing-aware plan: {billingStatus.currentPlan}
                </List.Item>
                <List.Item>
                  Paid plan active: {billingStatus.hasPaidPlan ? "Yes" : "No"}
                </List.Item>
                <List.Item>
                  Available upgrades:{" "}
                  {billingStatus.availableUpgrades.length > 0
                    ? billingStatus.availableUpgrades.join(", ")
                    : "None"}
                </List.Item>
                <List.Item>Server-side plan resolution is active</List.Item>
              </List>
            </BlockStack>
          </Card>
        </InlineGrid>

        <Card>
          <BlockStack gap="300">
            <Text as="h2" variant="headingMd">
              Merchant quick launch
            </Text>

            <Text as="p" variant="bodyMd" tone="subdued">
              Active theme: {activeThemeName ?? "Not found"}{" "}
              {activeThemeId ? `(ID: ${activeThemeId})` : ""}
            </Text>

            <InlineGrid columns={{ xs: 1, md: 3 }} gap="300">
              {onboardingLinks.map((link) =>
                link.url ? (
                  <Button key={link.key} url={link.url}>
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
      </BlockStack>
    </Page>
  );
}