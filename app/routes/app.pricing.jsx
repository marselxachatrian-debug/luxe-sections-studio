import { Form, useLoaderData, useSearchParams } from "react-router";
import {
  Badge,
  Banner,
  BlockStack,
  Button,
  Card,
  Divider,
  InlineGrid,
  InlineStack,
  Page,
  Text,
} from "@shopify/polaris";
import { BLOCK_KEYS, PLAN_KEYS, canAccessBlockFeature } from "../plan-rules";
import { BILLING_PLANS } from "../billing-config";
import { getBlockFeatureCatalog } from "../block-feature-catalog";
import { getCurrentPlanFromRequest } from "../current-plan.server";
import {
  MOCK_BILLING_SOURCE,
  getBillingActionLabel,
  getBillingActionState,
} from "../billing-helpers";

const featureGroups = [
  {
    title: "Luxe Hero",
    blockKey: BLOCK_KEYS.LUXE_HERO,
    features: getBlockFeatureCatalog(BLOCK_KEYS.LUXE_HERO),
  },
  {
    title: "Trust Bar",
    blockKey: BLOCK_KEYS.TRUST_BAR,
    features: getBlockFeatureCatalog(BLOCK_KEYS.TRUST_BAR),
  },
  {
    title: "Premium Features",
    blockKey: BLOCK_KEYS.PREMIUM_FEATURES,
    features: getBlockFeatureCatalog(BLOCK_KEYS.PREMIUM_FEATURES),
  },
];

function getPlanBadgeText(planKey, currentPlanKey) {
  if (planKey === currentPlanKey) {
    return "Current plan";
  }

  if (planKey === PLAN_KEYS.STANDARD) {
    return "Best value";
  }

  if (planKey === PLAN_KEYS.PREMIUM) {
    return "All included";
  }

  return "Start free";
}

function getPlanBadgeTone(planKey, currentPlanKey) {
  if (planKey === currentPlanKey) {
    return "success";
  }

  return "info";
}

function FeatureRow({ label, isAvailable }) {
  return (
    <InlineStack align="space-between" blockAlign="center">
      <Text as="span" variant="bodyMd" tone={isAvailable ? undefined : "subdued"}>
        {label}
      </Text>
      <span
        style={{
          color: isAvailable ? "#008060" : "#8c9196",
          fontWeight: 700,
          fontSize: "16px",
          lineHeight: 1,
        }}
      >
        {isAvailable ? "✓" : "—"}
      </span>
    </InlineStack>
  );
}

export async function loader({ request }) {
  const currentPlanStatus = await getCurrentPlanFromRequest(request);

  return {
    currentPlanKey: currentPlanStatus.planKey,
    currentPlanLabel: currentPlanStatus.planLabel,
    currentPlanSource: currentPlanStatus.source,
    hasActivePayment: currentPlanStatus.hasActivePayment,
  };
}

export default function PricingRoute() {
  const [searchParams] = useSearchParams();
  const {
    currentPlanKey,
    currentPlanLabel,
    currentPlanSource,
    hasActivePayment,
  } = useLoaderData();

  const transitionPlan = searchParams.get("plan");
  const transitionAction = searchParams.get("action");
  const transitionSource = searchParams.get("source");

  const hasMockBillingTransition =
    transitionSource === MOCK_BILLING_SOURCE &&
    Boolean(transitionPlan) &&
    Boolean(transitionAction);

  const hasRealBillingReturn =
    transitionSource === "real-billing" && Boolean(transitionPlan);

  return (
    <Page
      title="Pricing"
      subtitle="Choose the plan that fits your store and unlock the controls you need."
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

        <Card>
          <BlockStack gap="200">
            <Text as="h2" variant="headingLg">
              Plans
            </Text>
            <Text as="p" variant="bodyMd" tone="subdued">
              Every plan is mobile-ready. Start free, upgrade only when you need
              more control, and keep your store easy to manage.
            </Text>
            <InlineStack gap="300">
              <Badge tone="success">{currentPlanLabel}</Badge>
              <Text as="span" variant="bodySm" tone="subdued">
                Plan source: {currentPlanSource}
              </Text>
              <Text as="span" variant="bodySm" tone="subdued">
                Active paid billing: {hasActivePayment ? "Yes" : "No"}
              </Text>
            </InlineStack>
          </BlockStack>
        </Card>

        <InlineGrid columns={{ xs: 1, md: 3 }} gap="400">
          {BILLING_PLANS.map((plan) => {
            const actionState = getBillingActionState(plan.key, currentPlanKey);
            const actionLabel = getBillingActionLabel(plan.key, currentPlanKey);
            const isActionable =
              actionState === "upgrade" || actionState === "downgrade";
            const trialDays = plan.shopifyBilling?.trialDays ?? null;

            return (
              <Card key={plan.key} roundedAbove="sm">
                <BlockStack gap="400">
                  <InlineStack align="space-between" blockAlign="center">
                    <Text as="h3" variant="headingLg">
                      {plan.name}
                    </Text>
                    <Badge tone={getPlanBadgeTone(plan.key, currentPlanKey)}>
                      {getPlanBadgeText(plan.key, currentPlanKey)}
                    </Badge>
                  </InlineStack>

                  <Text as="p" variant="bodyMd" tone="subdued">
                    {plan.description}
                  </Text>

                  <BlockStack gap="050">
                    <Text as="p" variant="heading2xl">
                      {plan.priceLabel}
                    </Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      {plan.isFree
                        ? "Forever free"
                        : `${plan.intervalLabel} • ${trialDays} day trial`}
                    </Text>
                  </BlockStack>

                  {isActionable ? (
                    <Form method="post" action="/app/billing">
                      <input type="hidden" name="plan" value={plan.key} />
                      <input type="hidden" name="mode" value="real" />
                      <input
                        type="hidden"
                        name="returnUrl"
                        value={`/app/pricing?source=real-billing&plan=${plan.key}`}
                      />
                      <Button submit variant="primary" fullWidth>
                        {actionLabel}
                      </Button>
                    </Form>
                  ) : (
                    <Button disabled fullWidth>
                      {actionLabel}
                    </Button>
                  )}

                  <Divider />

                  <BlockStack gap="300">
                    {featureGroups.map((group) => (
                      <BlockStack key={group.blockKey} gap="200">
                        <Text as="h4" variant="headingSm">
                          {group.title}
                        </Text>

                        <BlockStack gap="150">
                          {group.features.map((feature) => (
                            <FeatureRow
                              key={`${plan.key}-${group.blockKey}-${feature.key}`}
                              label={feature.label}
                              isAvailable={canAccessBlockFeature(
                                plan.key,
                                group.blockKey,
                                feature.key,
                              )}
                            />
                          ))}
                        </BlockStack>
                      </BlockStack>
                    ))}
                  </BlockStack>
                </BlockStack>
              </Card>
            );
          })}
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}