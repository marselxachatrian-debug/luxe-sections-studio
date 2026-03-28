import { Form, useLoaderData, useSearchParams } from "react-router";
import { useState } from "react";
import {
  Badge,
  Banner,
  BlockStack,
  Box,
  Button,
  Card,
  InlineGrid,
  InlineStack,
  List,
  Page,
  Select,
  Text,
} from "@shopify/polaris";
import {
  PLAN_KEYS,
  PLAN_LABELS,
  PLAN_ORDER,
  BLOCK_KEYS,
  canAccessBlockFeature,
} from "../plan-rules";
import { getBlockFeatureCatalog } from "../block-feature-catalog";
import { getCurrentPlanFromRequest } from "../current-plan.server";
import { getActiveThemeFromRequest } from "../active-theme.server";
import { getThemeEditorOnboardingLinks } from "../theme-editor-links";
import {
  MOCK_BILLING_SOURCE,
  getBillingActionLabel,
  getBillingActionState,
  getMockBillingStatus,
} from "../billing-helpers";

function getAccessibleFeatures(planKey, features, blockKey) {
  return features.filter((feature) =>
    canAccessBlockFeature(planKey, blockKey, feature.key),
  );
}

function getLockedFeatures(planKey, features, blockKey) {
  return features.filter(
    (feature) => !canAccessBlockFeature(planKey, blockKey, feature.key),
  );
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

export default function SettingsRoute() {
  const [searchParams] = useSearchParams();
  const {
    currentPlanKey,
    currentPlanLabel,
    currentPlanSource,
    hasActivePayment,
    activeThemeName,
    activeThemeId,
    onboardingLinks,
  } = useLoaderData();

  const [previewPlan, setPreviewPlan] = useState(currentPlanKey);

  const billingStatus = getMockBillingStatus(currentPlanKey);

  const transitionPlan = searchParams.get("plan");
  const transitionAction = searchParams.get("action");
  const transitionSource = searchParams.get("source");

  const hasMockBillingTransition =
    transitionSource === MOCK_BILLING_SOURCE &&
    Boolean(transitionPlan) &&
    Boolean(transitionAction);

  const hasRealBillingReturn =
    transitionSource === "real-billing" && Boolean(transitionPlan);

  const luxeHeroFeatures = getBlockFeatureCatalog(BLOCK_KEYS.LUXE_HERO);
  const trustBarFeatures = getBlockFeatureCatalog(BLOCK_KEYS.TRUST_BAR);
  const premiumFeaturesFeatures = getBlockFeatureCatalog(
    BLOCK_KEYS.PREMIUM_FEATURES,
  );

  const availableLuxeHeroFeatures = getAccessibleFeatures(
    previewPlan,
    luxeHeroFeatures,
    BLOCK_KEYS.LUXE_HERO,
  );

  const lockedLuxeHeroFeatures = getLockedFeatures(
    previewPlan,
    luxeHeroFeatures,
    BLOCK_KEYS.LUXE_HERO,
  );

  const trustBarAvailable = getAccessibleFeatures(
    previewPlan,
    trustBarFeatures,
    BLOCK_KEYS.TRUST_BAR,
  );

  const premiumFeaturesAvailable = getAccessibleFeatures(
    previewPlan,
    premiumFeaturesFeatures,
    BLOCK_KEYS.PREMIUM_FEATURES,
  );

  const blockSnapshots = [
    {
      name: "Luxe Hero",
      availableCount: availableLuxeHeroFeatures.length,
      totalCount: luxeHeroFeatures.length,
      helperText: "Main premium storytelling block.",
    },
    {
      name: "Trust Bar",
      availableCount: trustBarAvailable.length,
      totalCount: trustBarFeatures.length,
      helperText: "Compact reassurance block with spacing controls.",
    },
    {
      name: "Premium Features",
      availableCount: premiumFeaturesAvailable.length,
      totalCount: premiumFeaturesFeatures.length,
      helperText: "Feature grid block with premium icon layer.",
    },
  ];

  const billingActions = PLAN_ORDER.map((planKey) => ({
    planKey,
    label: PLAN_LABELS[planKey],
    actionState: getBillingActionState(planKey, currentPlanKey),
    actionLabel: getBillingActionLabel(planKey, currentPlanKey),
  }));

  const previewPlanOptions = [
    { label: PLAN_LABELS[PLAN_KEYS.FREE], value: PLAN_KEYS.FREE },
    { label: PLAN_LABELS[PLAN_KEYS.STANDARD], value: PLAN_KEYS.STANDARD },
    { label: PLAN_LABELS[PLAN_KEYS.PREMIUM], value: PLAN_KEYS.PREMIUM },
  ];

  return (
    <Page
      title="Settings"
      subtitle="General app state, preview plan switching, and multi-block feature visibility."
    >
      <BlockStack gap="500">
        {hasMockBillingTransition ? (
          <Banner title="Mock billing transition detected" tone="info">
            <p>
              Requested action: {transitionAction}. Target plan:{" "}
              {transitionPlan}. This is still a mock-first flow and no real
              Shopify billing charge has been created.
            </p>
          </Banner>
        ) : null}

        {hasRealBillingReturn ? (
          <Banner title="Returned from Shopify billing flow" tone="success">
            <p>
              Shopify returned to Settings for plan: {transitionPlan}. The next
              step is to connect this return flow to real plan refresh and
              merchant state sync.
            </p>
          </Banner>
        ) : null}

        <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                General settings
              </Text>

              <List>
                <List.Item>Current plan source: {currentPlanSource}.</List.Item>
                <List.Item>
                  Active paid billing: {hasActivePayment ? "Yes" : "No"}.
                </List.Item>
                <List.Item>
                  Preview plan changes only affect admin-side visibility.
                </List.Item>
                <List.Item>
                  Settings now use a shared block feature catalog.
                </List.Item>
              </List>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Preview plan select
              </Text>

              <Select
                label="Preview plan"
                options={previewPlanOptions}
                value={previewPlan}
                onChange={setPreviewPlan}
              />
            </BlockStack>
          </Card>
        </InlineGrid>

        <InlineGrid columns={{ xs: 1, md: 3 }} gap="400">
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Current app plan
              </Text>
              <Badge tone="success">{currentPlanLabel}</Badge>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Preview plan
              </Text>
              <Badge tone="info">{PLAN_LABELS[previewPlan]}</Badge>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Luxe Hero summary
              </Text>
              <Text as="p" variant="bodyMd">
                {availableLuxeHeroFeatures.length} available /{" "}
                {lockedLuxeHeroFeatures.length} locked
              </Text>
            </BlockStack>
          </Card>
        </InlineGrid>

        <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Billing-aware state
              </Text>

              <List>
                <List.Item>Current plan key: {billingStatus.currentPlan}</List.Item>
                <List.Item>
                  Paid plan active: {billingStatus.hasPaidPlan ? "Yes" : "No"}
                </List.Item>
                <List.Item>
                  Available upgrades:{" "}
                  {billingStatus.availableUpgrades.length > 0
                    ? billingStatus.availableUpgrades.join(", ")
                    : "None"}
                </List.Item>
              </List>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Billing actions
              </Text>

              <BlockStack gap="300">
                {billingActions.map((item) => {
                  const isActionable =
                    item.actionState === "upgrade" ||
                    item.actionState === "downgrade";

                  return (
                    <Card key={item.planKey} roundedAbove="sm">
                      <BlockStack gap="200">
                        <InlineStack
                          align="space-between"
                          blockAlign="center"
                        >
                          <Text as="span" variant="bodyMd">
                            {item.label}
                          </Text>
                          <Badge tone={getActionTone(item.actionState)}>
                            {item.actionLabel}
                          </Badge>
                        </InlineStack>

                        {isActionable ? (
                          <Form method="post" action="/app/billing">
                            <input type="hidden" name="plan" value={item.planKey} />
                            <input type="hidden" name="mode" value="real" />
                            <input
                              type="hidden"
                              name="returnUrl"
                              value={`/app/settings?source=real-billing&plan=${item.planKey}`}
                            />
                            <Button submit variant="primary">
                              {item.actionLabel}
                            </Button>
                          </Form>
                        ) : (
                          <Button disabled>{item.actionLabel}</Button>
                        )}
                      </BlockStack>
                    </Card>
                  );
                })}
              </BlockStack>
            </BlockStack>
          </Card>
        </InlineGrid>

        <Card>
          <BlockStack gap="300">
            <Text as="h2" variant="headingMd">
              Theme Editor onboarding
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

        <Card>
          <BlockStack gap="300">
            <Text as="h2" variant="headingMd">
              Block access snapshot
            </Text>

            <InlineGrid columns={{ xs: 1, md: 3 }} gap="300">
              {blockSnapshots.map((block) => (
                <Card key={block.name} roundedAbove="sm">
                  <BlockStack gap="200">
                    <InlineStack align="space-between" blockAlign="center">
                      <Text as="h3" variant="headingSm">
                        {block.name}
                      </Text>
                      <Badge tone="info">
                        {block.availableCount}/{block.totalCount}
                      </Badge>
                    </InlineStack>

                    <Text as="p" variant="bodyMd" tone="subdued">
                      {block.helperText}
                    </Text>
                  </BlockStack>
                </Card>
              ))}
            </InlineGrid>
          </BlockStack>
        </Card>

        <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
          <Card>
            <BlockStack gap="300">
              <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingMd">
                  Available Luxe Hero features
                </Text>
                <Badge tone="success">{availableLuxeHeroFeatures.length}</Badge>
              </InlineStack>

              {availableLuxeHeroFeatures.length > 0 ? (
                <List>
                  {availableLuxeHeroFeatures.map((feature) => (
                    <List.Item key={feature.key}>{feature.label}</List.Item>
                  ))}
                </List>
              ) : (
                <Text as="p" variant="bodyMd" tone="subdued">
                  No available features for the selected preview plan.
                </Text>
              )}
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingMd">
                  Locked Luxe Hero features
                </Text>
                <Badge tone="warning">{lockedLuxeHeroFeatures.length}</Badge>
              </InlineStack>

              {lockedLuxeHeroFeatures.length > 0 ? (
                <List>
                  {lockedLuxeHeroFeatures.map((feature) => (
                    <List.Item key={feature.key}>{feature.label}</List.Item>
                  ))}
                </List>
              ) : (
                <Text as="p" variant="bodyMd" tone="subdued">
                  All Luxe Hero features are available for the selected preview
                  plan.
                </Text>
              )}
            </BlockStack>
          </Card>
        </InlineGrid>

        <Card>
          <BlockStack gap="300">
            <Text as="h2" variant="headingMd">
              Current app state
            </Text>

            <Box>
              <Text as="p" variant="bodyMd" tone="subdued">
                Settings now use server-side billing-aware plan resolution for
                current state, while preview plan switching remains available for
                admin-side testing and Theme Editor onboarding is available from
                the same page.
              </Text>
            </Box>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}