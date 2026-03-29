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
} from "../billing-helpers";

function getAccessibleFeatures(planKey, features, blockKey) {
  return features.filter((feature) =>
    canAccessBlockFeature(planKey, blockKey, feature.key),
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

  const blockSnapshots = [
    {
      name: "Premium Hero Banner",
      availableCount: getAccessibleFeatures(
        previewPlan,
        luxeHeroFeatures,
        BLOCK_KEYS.LUXE_HERO,
      ).length,
      totalCount: luxeHeroFeatures.length,
      helperText: "Premium hero editing access for the selected preview plan.",
    },
    {
      name: "Store Trust Highlights",
      availableCount: getAccessibleFeatures(
        previewPlan,
        trustBarFeatures,
        BLOCK_KEYS.TRUST_BAR,
      ).length,
      totalCount: trustBarFeatures.length,
      helperText: "Trust section access and control visibility by plan tier.",
    },
    {
      name: "Feature Highlights Grid",
      availableCount: getAccessibleFeatures(
        previewPlan,
        premiumFeaturesFeatures,
        BLOCK_KEYS.PREMIUM_FEATURES,
      ).length,
      totalCount: premiumFeaturesFeatures.length,
      helperText: "Feature grid access snapshot for the selected plan.",
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

  return (
    <Page
      title="Settings"
      subtitle="Plan, billing, and theme connection in one cleaner studio view."
    >
      <BlockStack gap="400">
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
          <InlineGrid columns={{ xs: 1, md: "1.35fr auto" }} gap="300">
            <BlockStack gap="200">
              <BlockStack gap="100">
                <InlineStack gap="200" blockAlign="center" wrap>
                  <Text as="h2" variant="headingLg">
                    Studio settings
                  </Text>
                  <Badge tone="success">{currentPlanLabel}</Badge>
                  <Badge tone={hasActivePayment ? "success" : "attention"}>
                    {hasActivePayment ? "Billing active" : "Free plan"}
                  </Badge>
                </InlineStack>

                <Text as="p" variant="bodyMd" tone="subdued">
                  Keep Shopify setup light: connect the block in Theme Editor,
                  then do the main editing inside Luxe Sections Studio.
                </Text>
              </BlockStack>

              <InlineStack gap="200" wrap>
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

            <BlockStack gap="150">
              <Text as="p" variant="bodySm" tone="subdued">
                Theme: {activeThemeName ?? "Not found"}{" "}
                {activeThemeId ? `(ID: ${activeThemeId})` : ""}
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Plan source: {currentPlanSource}
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                App editing remains the primary merchant workflow.
              </Text>
            </BlockStack>
          </InlineGrid>
        </Card>

        <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
          <Card>
            <BlockStack gap="250">
              <BlockStack gap="050">
                <Text as="h2" variant="headingMd">
                  Studio direction
                </Text>
                <Text as="p" variant="bodySm" tone="subdued">
                  A simpler settings page for merchants and cleaner internal app
                  control.
                </Text>
              </BlockStack>

              <BlockStack gap="150">
                <Box
                  padding="300"
                  borderRadius="300"
                  background="bg-surface-secondary"
                >
                  <Text as="p" variant="bodyMd">
                    Edit blocks inside the app
                  </Text>
                </Box>

                <Box
                  padding="300"
                  borderRadius="300"
                  background="bg-surface-secondary"
                >
                  <Text as="p" variant="bodyMd">
                    Use Shopify only for placement and activation
                  </Text>
                </Box>

                <Box
                  padding="300"
                  borderRadius="300"
                  background="bg-surface-secondary"
                >
                  <Text as="p" variant="bodyMd">
                    Keep plan preview and billing visibility clean and easy to review
                  </Text>
                </Box>
              </BlockStack>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="250">
              <BlockStack gap="050">
                <Text as="h2" variant="headingMd">
                  Preview plan
                </Text>
                <Text as="p" variant="bodySm" tone="subdued">
                  Admin-side simulation only. This does not change the merchant’s
                  live subscription.
                </Text>
              </BlockStack>

              <Select
                label="Preview plan"
                options={previewPlanOptions}
                value={previewPlan}
                onChange={setPreviewPlan}
              />

              <InlineGrid columns={{ xs: 1, sm: 3 }} gap="200">
                {blockSnapshots.map((block) => (
                  <Box
                    key={block.name}
                    padding="300"
                    borderRadius="300"
                    background="bg-surface-secondary"
                  >
                    <BlockStack gap="100">
                      <InlineStack align="space-between" blockAlign="center">
                        <Text as="p" variant="bodySm" fontWeight="semibold">
                          {block.name}
                        </Text>
                        <Badge tone="info">
                          {block.availableCount}/{block.totalCount}
                        </Badge>
                      </InlineStack>

                      <Text as="p" variant="bodySm" tone="subdued">
                        {block.helperText}
                      </Text>
                    </BlockStack>
                  </Box>
                ))}
              </InlineGrid>
            </BlockStack>
          </Card>
        </InlineGrid>

        <Card>
          <BlockStack gap="300">
            <InlineStack align="space-between" blockAlign="center" wrap>
              <BlockStack gap="050">
                <Text as="h2" variant="headingMd">
                  Membership
                </Text>
                <Text as="p" variant="bodySm" tone="subdued">
                  Review the current plan and move between available billing tiers.
                </Text>
              </BlockStack>

              <InlineStack gap="200" wrap>
                <Badge tone="success">{currentPlanLabel}</Badge>
                <Badge tone={hasActivePayment ? "success" : "attention"}>
                  {hasActivePayment ? "Paid billing active" : "No paid billing"}
                </Badge>
              </InlineStack>
            </InlineStack>

            <InlineGrid columns={{ xs: 1, md: 3 }} gap="300">
              {billingActions.map((item) => {
                const isActionable =
                  item.actionState === "upgrade" ||
                  item.actionState === "downgrade";

                return (
                  <Box
                    key={item.planKey}
                    padding="300"
                    borderWidth="025"
                    borderRadius="300"
                    background="bg-surface-secondary"
                  >
                    <BlockStack gap="200">
                      <InlineStack align="space-between" blockAlign="center">
                        <Text as="span" variant="bodyMd" fontWeight="semibold">
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
                  </Box>
                );
              })}
            </InlineGrid>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="300">
            <BlockStack gap="050">
              <Text as="h2" variant="headingMd">
                Theme connection
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Keep Theme Editor minimal: placement, app embed, and activation only.
              </Text>
            </BlockStack>

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
      </BlockStack>
    </Page>
  );
}