import { Form, useLoaderData, useSearchParams } from "react-router";
import {
  Badge,
  Banner,
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
import { planTiers } from "../studio-data";
import {
  PLAN_KEYS,
  PLAN_LABELS,
  BLOCK_KEYS,
  getFeatureRequiredPlan,
  getBlockFeatureRequiredPlan,
} from "../plan-rules";
import { BILLING_PLANS } from "../billing-config";
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

const nextBillingLogicSteps = [
  "Persist merchant billing state outside the current mock-only layer.",
  "Connect billing return flow to real plan refresh.",
  "Apply runtime feature gating inside the real theme experience.",
  "Finalize merchant onboarding and release flow.",
];

function getPlanTone(planKey, currentPlanKey) {
  if (planKey === currentPlanKey) {
    return "success";
  }

  return "info";
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

function renderFeatureList(features) {
  if (features.length === 0) {
    return (
      <Text as="p" variant="bodySm" tone="subdued">
        No mapped features yet.
      </Text>
    );
  }

  return (
    <List>
      {features.map((feature) => (
        <List.Item key={feature.key}>{feature.label}</List.Item>
      ))}
    </List>
  );
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

export default function PricingRoute() {
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

  const blockMatrices = [
    {
      title: "Luxe Hero feature matrix",
      blockKey: BLOCK_KEYS.LUXE_HERO,
      features: getBlockFeatureCatalog(BLOCK_KEYS.LUXE_HERO),
      getRequiredPlan: (featureKey) => getFeatureRequiredPlan(featureKey),
    },
    {
      title: "Trust Bar feature matrix",
      blockKey: BLOCK_KEYS.TRUST_BAR,
      features: getBlockFeatureCatalog(BLOCK_KEYS.TRUST_BAR),
      getRequiredPlan: (featureKey) =>
        getBlockFeatureRequiredPlan(BLOCK_KEYS.TRUST_BAR, featureKey),
    },
    {
      title: "Premium Features matrix",
      blockKey: BLOCK_KEYS.PREMIUM_FEATURES,
      features: getBlockFeatureCatalog(BLOCK_KEYS.PREMIUM_FEATURES),
      getRequiredPlan: (featureKey) =>
        getBlockFeatureRequiredPlan(BLOCK_KEYS.PREMIUM_FEATURES, featureKey),
    },
  ];

  return (
    <Page
      title="Pricing"
      subtitle="Plan structure, billing architecture, and multi-block feature value."
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
              Shopify returned to the app for plan: {transitionPlan}. The next
              step is to connect this return flow to real plan refresh and
              merchant state sync.
            </p>
          </Banner>
        ) : null}

        <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
          <Card>
            <BlockStack gap="300">
              <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingMd">
                  Current pricing structure
                </Text>
                <Badge tone="success">{currentPlanLabel}</Badge>
              </InlineStack>

              <Text as="p" variant="bodyMd" tone="subdued">
                Pricing now reads the plan from a server-side billing check.
                Source: {currentPlanSource}. Active paid billing:{" "}
                {hasActivePayment ? "Yes" : "No"}.
              </Text>

              <List>
                <List.Item>
                  Free still works as the fallback plan when no active
                  subscription exists.
                </List.Item>
                <List.Item>
                  Standard and Premium are prepared as paid app subscription
                  plans.
                </List.Item>
                <List.Item>
                  Plan value is mapped across multiple blocks.
                </List.Item>
                <List.Item>
                  Billing entry now starts from a dedicated server-side route.
                </List.Item>
              </List>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Billing architecture overview
              </Text>

              <Text as="p" variant="bodyMd" tone="subdued">
                Current billing-aware plan: {billingStatus.currentPlan}. Paid
                plan active: {billingStatus.hasPaidPlan ? "Yes" : "No"}.
              </Text>

              <Text as="p" variant="bodyMd" tone="subdued">
                Available upgrades:{" "}
                {billingStatus.availableUpgrades.length > 0
                  ? billingStatus.availableUpgrades.join(", ")
                  : "None"}
              </Text>

              {BILLING_PLANS.map((plan) => (
                <Box
                  key={plan.key}
                  paddingBlockEnd="300"
                  borderBlockEndWidth="025"
                  borderColor="border"
                >
                  <BlockStack gap="200">
                    <InlineStack align="space-between" blockAlign="center">
                      <Text as="h3" variant="headingSm">
                        {plan.name}
                      </Text>
                      <Badge tone={plan.status === "active" ? "success" : "info"}>
                        {plan.billingModel}
                      </Badge>
                    </InlineStack>

                    <Text as="p" variant="bodyMd" tone="subdued">
                      {plan.description}
                    </Text>

                    <InlineStack gap="300">
                      <Text as="span" variant="bodySm">
                        Price: {plan.priceLabel}
                      </Text>
                      <Text as="span" variant="bodySm">
                        Interval: {plan.intervalLabel}
                      </Text>
                      <Text as="span" variant="bodySm">
                        Status: {plan.status}
                      </Text>
                    </InlineStack>

                    {plan.shopifyBilling ? (
                      <List>
                        <List.Item>
                          Shopify plan name: {plan.shopifyBilling.planName}
                        </List.Item>
                        <List.Item>
                          Interval: {plan.shopifyBilling.interval}
                        </List.Item>
                        <List.Item>
                          Trial days: {plan.shopifyBilling.trialDays}
                        </List.Item>
                        <List.Item>
                          Return path: {plan.shopifyBilling.returnUrlPath}
                        </List.Item>
                      </List>
                    ) : (
                      <Text as="p" variant="bodySm" tone="subdued">
                        No Shopify billing object is needed for the Free plan.
                      </Text>
                    )}
                  </BlockStack>
                </Box>
              ))}
            </BlockStack>
          </Card>
        </InlineGrid>

        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">
              Plan cards
            </Text>

            <InlineGrid columns={{ xs: 1, md: 3 }} gap="400">
              {planTiers.map((tier) => {
                const billingPlan =
                  BILLING_PLANS.find((plan) => plan.key === tier.key) ?? null;
                const actionState = getBillingActionState(
                  tier.key,
                  currentPlanKey,
                );
                const actionLabel = getBillingActionLabel(
                  tier.key,
                  currentPlanKey,
                );
                const isActionable =
                  actionState === "upgrade" || actionState === "downgrade";

                return (
                  <Card key={tier.key} roundedAbove="sm">
                    <BlockStack gap="300">
                      <InlineStack align="space-between" blockAlign="center">
                        <Text as="h3" variant="headingMd">
                          {tier.label}
                        </Text>
                        <Badge tone={getActionTone(actionState)}>
                          {actionLabel}
                        </Badge>
                      </InlineStack>

                      <Text as="p" variant="bodyMd" tone="subdued">
                        {tier.summary}
                      </Text>

                      <Text as="p" variant="headingLg">
                        {billingPlan?.priceLabel ?? tier.priceLabel}
                      </Text>

                      <Text as="p" variant="bodySm" tone="subdued">
                        {billingPlan?.intervalLabel ?? "Mock interval"}
                      </Text>

                      <Divider />

                      <List>
                        {tier.includes.map((item) => (
                          <List.Item key={item}>{item}</List.Item>
                        ))}
                      </List>

                      {isActionable ? (
                        <Form method="post" action="/app/billing">
                          <input type="hidden" name="plan" value={tier.key} />
                          <input type="hidden" name="mode" value="real" />
                          <input
                            type="hidden"
                            name="returnUrl"
                            value={`/app/pricing?source=real-billing&plan=${tier.key}`}
                          />
                          <Button submit variant="primary">
                            {actionLabel}
                          </Button>
                        </Form>
                      ) : (
                        <Button disabled>{actionLabel}</Button>
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
              Post-billing onboarding
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

        {blockMatrices.map((matrix) => (
          <Card key={matrix.blockKey}>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                {matrix.title}
              </Text>

              <InlineGrid columns={{ xs: 1, md: 3 }} gap="300">
                {[PLAN_KEYS.FREE, PLAN_KEYS.STANDARD, PLAN_KEYS.PREMIUM].map(
                  (planKey) => {
                    const featuresForPlan = matrix.features.filter(
                      (feature) => matrix.getRequiredPlan(feature.key) === planKey,
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
                            <Badge tone={getPlanTone(planKey, currentPlanKey)}>
                              {planKey === currentPlanKey ? "Current" : "Planned"}
                            </Badge>
                          </InlineStack>

                          {renderFeatureList(featuresForPlan)}
                        </BlockStack>
                      </Card>
                    );
                  },
                )}
              </InlineGrid>
            </BlockStack>
          </Card>
        ))}

        <Card>
          <BlockStack gap="300">
            <Text as="h2" variant="headingMd">
              Next billing logic steps
            </Text>

            <List type="number">
              {nextBillingLogicSteps.map((step) => (
                <List.Item key={step}>{step}</List.Item>
              ))}
            </List>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}