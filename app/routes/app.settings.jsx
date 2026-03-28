import { Form, Link, useLoaderData, useSearchParams } from "react-router";
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
      name: "Premium Hero Banner",
      availableCount: availableLuxeHeroFeatures.length,
      totalCount: luxeHeroFeatures.length,
      helperText: "Main premium storytelling block with layered visual control.",
    },
    {
      name: "Store Trust Highlights",
      availableCount: trustBarAvailable.length,
      totalCount: trustBarFeatures.length,
      helperText: "Reassurance block with clean structure and spacing control.",
    },
    {
      name: "Feature Highlights Grid",
      availableCount: premiumFeaturesAvailable.length,
      totalCount: premiumFeaturesFeatures.length,
      helperText: "Feature grid block with icon support and premium layout depth.",
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

  const primaryThemeEditorUrl =
    onboardingLinks.find((item) => item.url)?.url ?? null;

  const appOwnedSettings = [
    "Main visual editing should happen inside the app.",
    "Preview plan switching is for admin-side testing only.",
    "Desktop and mobile control should stay consistent across plans.",
    "Feature visibility should follow the shared plan rules architecture.",
  ];

  const shopifyMinimalSettings = [
    "Add the app block to the theme.",
    "Turn the block or embed on.",
    "Place the block in the correct template.",
    "Keep theme-side settings minimal and easy to understand.",
  ];

  return (
    <Page
      title="Settings"
      subtitle="Studio-level app state, plan preview, billing visibility, and theme connection guidance."
    >
      <BlockStack gap="500">
        {hasMockBillingTransition ? (
          <Banner title="Mock billing transition detected" tone="info">
            <p>
              Requested action: {transitionAction}. Target plan: {transitionPlan}.
              This is still a mock-first flow and no real Shopify billing charge
              has been created.
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

        <Card>
          <BlockStack gap="300">
            <InlineStack align="space-between" blockAlign="center">
              <BlockStack gap="100">
                <Text as="h2" variant="headingLg">
                  Studio settings overview
                </Text>
                <Text as="p" variant="bodyMd" tone="subdued">
                  Use this page to review app state, preview plan-based feature
                  visibility, and keep Shopify-side setup minimal.
                </Text>
              </BlockStack>

              <Badge tone="success">{currentPlanLabel}</Badge>
            </InlineStack>

            <Text as="p" variant="bodyMd" tone="subdued">
              Active theme: {activeThemeName ?? "Not found"}
              {activeThemeId ? ` (ID: ${activeThemeId})` : ""}. Current plan
              source: {currentPlanSource}. Active paid billing:{" "}
              {hasActivePayment ? "Yes" : "No"}.
            </Text>

            <InlineStack gap="200">
              <Link to="/app" style={{ textDecoration: "none" }}>
                <Button>Dashboard</Button>
              </Link>

              <Link to="/app/blocks" style={{ textDecoration: "none" }}>
                <Button variant="primary">Open Blocks Studio</Button>
              </Link>

              <Link to="/app/pricing" style={{ textDecoration: "none" }}>
                <Button>Pricing</Button>
              </Link>

              {primaryThemeEditorUrl ? (
                <Button onClick={() => openInTopWindow(primaryThemeEditorUrl)}>
                  Open Theme Editor
                </Button>
              ) : (
                <Button disabled>Open Theme Editor</Button>
              )}
            </InlineStack>
          </BlockStack>
        </Card>

        <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                What this page controls
              </Text>

              <List>
                {appOwnedSettings.map((item) => (
                  <List.Item key={item}>{item}</List.Item>
                ))}
              </List>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                What stays minimal in Shopify
              </Text>

              <List>
                {shopifyMinimalSettings.map((item) => (
                  <List.Item key={item}>{item}</List.Item>
                ))}
              </List>
            </BlockStack>
          </Card>
        </InlineGrid>

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
                Active storefront access level
              </Text>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="150">
              <Text as="h3" variant="headingSm">
                Preview plan
              </Text>
              <Text as="p" variant="headingLg">
                {PLAN_LABELS[previewPlan]}
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Admin-side simulation only
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
                Paid billing
              </Text>
              <Text as="p" variant="headingLg">
                {hasActivePayment ? "Active" : "Inactive"}
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Billing-aware state is enabled
              </Text>
            </BlockStack>
          </Card>
        </InlineGrid>

        <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Preview plan simulator
              </Text>

              <Text as="p" variant="bodyMd" tone="subdued">
                Change the preview plan to inspect which features are available
                for each tier without changing the merchant's real plan.
              </Text>

              <Select
                label="Preview plan"
                options={previewPlanOptions}
                value={previewPlan}
                onChange={setPreviewPlan}
              />
            </BlockStack>
          </Card>

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
        </InlineGrid>

        <Card>
          <BlockStack gap="300">
            <Text as="h2" variant="headingMd">
              Billing actions
            </Text>

            <InlineGrid columns={{ xs: 1, md: 3 }} gap="300">
              {billingActions.map((item) => {
                const isActionable =
                  item.actionState === "upgrade" ||
                  item.actionState === "downgrade";

                return (
                  <Card key={item.planKey} roundedAbove="sm">
                    <BlockStack gap="200">
                      <InlineStack align="space-between" blockAlign="center">
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
                          <Button submit variant="primary" fullWidth>
                            {item.actionLabel}
                          </Button>
                        </Form>
                      ) : (
                        <Button disabled fullWidth>
                          {item.actionLabel}
                        </Button>
                      )}
                    </BlockStack>
                  </Card>
                );
              })}
            </InlineGrid>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="300">
            <Text as="h2" variant="headingMd">
              Theme connection
            </Text>

            <Text as="p" variant="bodyMd" tone="subdued">
              Merchants should still use Theme Editor for placement and
              activation, while the main editing experience continues moving
              inside the app.
            </Text>

            <InlineGrid columns={{ xs: 1, md: 3 }} gap="300">
              {onboardingLinks.map((link) =>
                link.url ? (
                  <Button
                    key={link.key}
                    onClick={() => openInTopWindow(link.url)}
                  >
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
                  Available Premium Hero Banner features
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
                  Locked Premium Hero Banner features
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
                  All Premium Hero Banner features are available for the selected
                  preview plan.
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
                Settings now follow the studio direction: app-side editing is
                becoming the main experience, plan visibility stays billing-aware,
                preview simulation remains useful for admin-side testing, and
                Theme Editor keeps a simpler setup role.
              </Text>
            </Box>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}