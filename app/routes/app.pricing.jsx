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
import {
  BLOCK_KEYS,
  PLAN_KEYS,
  PLAN_LABELS,
  canAccessBlockFeature,
} from "../plan-rules";
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
    title: "Premium Hero Banner",
    blockKey: BLOCK_KEYS.LUXE_HERO,
    helperText: "Hero block for first impressions, CTA control, and premium storefront storytelling.",
    features: getBlockFeatureCatalog(BLOCK_KEYS.LUXE_HERO),
  },
  {
    title: "Store Trust Highlights",
    blockKey: BLOCK_KEYS.TRUST_BAR,
    helperText: "Trust section for reassurance messaging, layout control, icons, and merchant-friendly proof blocks.",
    features: getBlockFeatureCatalog(BLOCK_KEYS.TRUST_BAR),
  },
  {
    title: "Feature Highlights Grid",
    blockKey: BLOCK_KEYS.PREMIUM_FEATURES,
    helperText: "Feature grid for value communication, icons, links, and clean product presentation.",
    features: getBlockFeatureCatalog(BLOCK_KEYS.PREMIUM_FEATURES),
  },
  {
    title: "Trust & Payment Showcase",
    blockKey: BLOCK_KEYS.TRUST_PAYMENTS_SHOWCASE,
    helperText: "Planned next block for trust messaging, reviews, payment systems, and delivery partners.",
    features: getBlockFeatureCatalog(BLOCK_KEYS.TRUST_PAYMENTS_SHOWCASE),
  },
  {
    title: "Vertical Video Showcase",
    blockKey: BLOCK_KEYS.VIDEO_SHOWCASE,
    helperText: "Planned next block for 9:16 product videos, CTA links, and premium video presentation.",
    features: getBlockFeatureCatalog(BLOCK_KEYS.VIDEO_SHOWCASE),
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
    return "Most premium";
  }

  return "Start here";
}

function getPlanBadgeTone(planKey, currentPlanKey) {
  if (planKey === currentPlanKey) {
    return "success";
  }

  if (planKey === PLAN_KEYS.STANDARD) {
    return "attention";
  }

  return "info";
}

function FeatureRow({ label, isAvailable }) {
  return (
    <InlineStack align="space-between" blockAlign="center" gap="200">
      <Text as="span" variant="bodyMd" tone={isAvailable ? undefined : "subdued"}>
        {label}
      </Text>

      <span
        style={{
          color: isAvailable ? "#008060" : "#8c9196",
          fontWeight: 700,
          fontSize: "16px",
          lineHeight: 1,
          minWidth: "18px",
          textAlign: "center",
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
    currentPlanLabel: PLAN_LABELS[currentPlanStatus.planKey],
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
      title="Tariffs"
      subtitle="Choose the level of control your storefront needs. Every plan supports mobile editing and unlimited color selection."
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
              Tariffs
            </Text>

            <Text as="p" variant="bodyMd" tone="subdued">
              Start free, build a professional result without code, and upgrade
              only when you need stronger layout control, custom icons, or
              premium visual effects.
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

                  <BlockStack gap="100">
                    {plan.highlights.map((item) => (
                      <FeatureRow
                        key={`${plan.key}-${item}`}
                        label={item}
                        isAvailable
                      />
                    ))}
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

                  <BlockStack gap="350">
                    {featureGroups.map((group) => (
                      <BlockStack key={group.blockKey} gap="200">
                        <BlockStack gap="050">
                          <Text as="h4" variant="headingSm">
                            {group.title}
                          </Text>
                          <Text as="p" variant="bodySm" tone="subdued">
                            {group.helperText}
                          </Text>
                        </BlockStack>

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