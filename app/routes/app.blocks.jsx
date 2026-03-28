import { useLoaderData } from "react-router";
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
import { blockLibraryItems, planTiers } from "../studio-data";
import {
  BLOCK_KEYS,
  PLAN_KEYS,
  PLAN_LABELS,
  getFeatureRequiredPlan,
  getBlockFeatureRequiredPlan,
} from "../plan-rules";
import { getBlockFeatureCatalog } from "../block-feature-catalog";
import { getCurrentPlanFromRequest } from "../current-plan.server";
import { getActiveThemeFromRequest } from "../active-theme.server";
import { getThemeEditorOnboardingLinks } from "../theme-editor-links";
import {
  getBillingActionLabel,
  getBillingActionState,
} from "../billing-helpers";

const recentEnhancements = [
  "Trust Bar now includes top and bottom padding controls.",
  "Premium Features now includes icon selection for each feature card.",
  "Blocks Library now uses billing-aware server-side plan status.",
];

function getFeaturesForPlan(features, getRequiredPlan, planKey) {
  return features.filter((feature) => getRequiredPlan(feature.key) === planKey);
}

function getActionTone(actionState) {
  if (actionState === "current") {
    return "success";
  }

  if (actionState === "upgrade") {
    return "info";
  }

  if (actionState === "downgrade") {
    return "warning";
  }

  return "critical";
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
    currentPlanKey,
    currentPlanLabel,
    currentPlanSource,
    hasActivePayment,
    activeThemeName,
    activeThemeId,
    onboardingLinks,
  } = useLoaderData();

  const blockPlanMatrices = [
    {
      title: "Luxe Hero access tiers",
      blockKey: BLOCK_KEYS.LUXE_HERO,
      features: getBlockFeatureCatalog(BLOCK_KEYS.LUXE_HERO),
      getRequiredPlan: (featureKey) => getFeatureRequiredPlan(featureKey),
    },
    {
      title: "Trust Bar access tiers",
      blockKey: BLOCK_KEYS.TRUST_BAR,
      features: getBlockFeatureCatalog(BLOCK_KEYS.TRUST_BAR),
      getRequiredPlan: (featureKey) =>
        getBlockFeatureRequiredPlan(BLOCK_KEYS.TRUST_BAR, featureKey),
    },
    {
      title: "Premium Features access tiers",
      blockKey: BLOCK_KEYS.PREMIUM_FEATURES,
      features: getBlockFeatureCatalog(BLOCK_KEYS.PREMIUM_FEATURES),
      getRequiredPlan: (featureKey) =>
        getBlockFeatureRequiredPlan(BLOCK_KEYS.PREMIUM_FEATURES, featureKey),
    },
  ];

  return (
    <Page
      title="Blocks Library"
      subtitle="Current block inventory, rollout status, and plan-aware implementation structure."
    >
      <BlockStack gap="500">
        <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
          <Card>
            <BlockStack gap="300">
              <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingMd">
                  Current implementation
                </Text>
                <Badge tone="success">{currentPlanLabel}</Badge>
              </InlineStack>

              <Text as="p" variant="bodyMd" tone="subdued">
                Plan source: {currentPlanSource}. Active paid billing:{" "}
                {hasActivePayment ? "Yes" : "No"}.
              </Text>

              <List>
                <List.Item>Luxe Hero is expanded and feature-rich.</List.Item>
                <List.Item>
                  Trust Bar is expanded with layout and spacing controls.
                </List.Item>
                <List.Item>
                  Premium Features is expanded with layout, spacing, and icon
                  controls.
                </List.Item>
              </List>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Recent enhancements
              </Text>

              <List>
                {recentEnhancements.map((item) => (
                  <List.Item key={item}>{item}</List.Item>
                ))}
              </List>
            </BlockStack>
          </Card>
        </InlineGrid>

        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">
              Block cards
            </Text>

            <InlineGrid columns={{ xs: 1, md: 3 }} gap="400">
              {blockLibraryItems.map((block) => (
                <Card key={block.handle} roundedAbove="sm">
                  <BlockStack gap="300">
                    <InlineStack align="space-between" blockAlign="center">
                      <Text as="h3" variant="headingMd">
                        {block.name}
                      </Text>
                      <Badge tone="info">{block.status}</Badge>
                    </InlineStack>

                    <Text as="p" variant="bodyMd" tone="subdued">
                      {block.description}
                    </Text>

                    <Divider />

                    <BlockStack gap="200">
                      <Text as="h4" variant="headingSm">
                        Included capabilities
                      </Text>
                      <List>
                        {block.features.map((feature) => (
                          <List.Item key={feature}>{feature}</List.Item>
                        ))}
                      </List>
                    </BlockStack>
                  </BlockStack>
                </Card>
              ))}
            </InlineGrid>
          </BlockStack>
        </Card>

        {blockPlanMatrices.map((matrix) => (
          <Card key={matrix.blockKey}>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                {matrix.title}
              </Text>

              <InlineGrid columns={{ xs: 1, md: 3 }} gap="300">
                {[PLAN_KEYS.FREE, PLAN_KEYS.STANDARD, PLAN_KEYS.PREMIUM].map(
                  (planKey) => {
                    const features = getFeaturesForPlan(
                      matrix.features,
                      matrix.getRequiredPlan,
                      planKey,
                    );

                    return (
                      <Card key={planKey} roundedAbove="sm">
                        <BlockStack gap="300">
                          <InlineStack
                            align="space-between"
                            blockAlign="center"
                          >
                            <Text as="h3" variant="headingSm">
                              {PLAN_LABELS[planKey]}
                            </Text>
                            <Badge
                              tone={planKey === currentPlanKey ? "success" : "info"}
                            >
                              {planKey === currentPlanKey ? "Current" : "Planned"}
                            </Badge>
                          </InlineStack>

                          {features.length > 0 ? (
                            <List>
                              {features.map((feature) => (
                                <List.Item key={feature.key}>
                                  {feature.label}
                                </List.Item>
                              ))}
                            </List>
                          ) : (
                            <Text as="p" variant="bodySm" tone="subdued">
                              No mapped features for this tier yet.
                            </Text>
                          )}
                        </BlockStack>
                      </Card>
                    );
                  },
                )}
              </InlineGrid>
            </BlockStack>
          </Card>
        ))}

        <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Merchant onboarding flow
              </Text>

              <Text as="p" variant="bodyMd" tone="subdued">
                Active theme: {activeThemeName ?? "Not found"}{" "}
                {activeThemeId ? `(ID: ${activeThemeId})` : ""}
              </Text>

              <List type="number">
                <List.Item>Open Shopify theme editor.</List.Item>
                <List.Item>Add the app block to the target template.</List.Item>
                <List.Item>
                  Configure content, spacing, and visual controls.
                </List.Item>
                <List.Item>Match merchant plan access with block depth.</List.Item>
              </List>

              <BlockStack gap="200">
                {onboardingLinks.map((link) =>
                  link.url ? (
                    <Button key={link.key} url={link.url}>
                      Open {link.label} in Theme Editor
                    </Button>
                  ) : (
                    <Button key={link.key} disabled>
                      Open {link.label} in Theme Editor
                    </Button>
                  ),
                )}
              </BlockStack>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Plan structure
              </Text>

              {planTiers.map((plan) => {
                const actionState = getBillingActionState(
                  plan.key,
                  currentPlanKey,
                );
                const actionLabel = getBillingActionLabel(
                  plan.key,
                  currentPlanKey,
                );

                return (
                  <Box
                    key={plan.key}
                    paddingBlockEnd="300"
                    borderBlockEndWidth="025"
                    borderColor="border"
                  >
                    <BlockStack gap="200">
                      <InlineStack align="space-between" blockAlign="center">
                        <Text as="h3" variant="headingSm">
                          {plan.label}
                        </Text>
                        <InlineStack gap="200" blockAlign="center">
                          <Badge>{plan.priceLabel}</Badge>
                          <Badge tone={getActionTone(actionState)}>
                            {actionLabel}
                          </Badge>
                        </InlineStack>
                      </InlineStack>

                      <Text as="p" variant="bodyMd" tone="subdued">
                        {plan.summary}
                      </Text>

                      <List>
                        {plan.includes.map((item) => (
                          <List.Item key={item}>{item}</List.Item>
                        ))}
                      </List>
                    </BlockStack>
                  </Box>
                );
              })}
            </BlockStack>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}