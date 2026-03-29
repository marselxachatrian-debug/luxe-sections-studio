import { Form, Link, useLoaderData, useSearchParams } from "react-router";
import {
  Badge,
  Banner,
  BlockStack,
  Button,
  Card,
  InlineGrid,
  InlineStack,
  List,
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
    helperText:
      "Hero block for stronger first impressions, clearer messaging, and premium storefront presentation.",
    features: getBlockFeatureCatalog(BLOCK_KEYS.LUXE_HERO),
  },
  {
    title: "Store Trust Highlights",
    blockKey: BLOCK_KEYS.TRUST_BAR,
    helperText:
      "Trust section for reassurance messaging, layout control, icons, and merchant-friendly proof blocks.",
    features: getBlockFeatureCatalog(BLOCK_KEYS.TRUST_BAR),
  },
  {
    title: "Feature Highlights Grid",
    blockKey: BLOCK_KEYS.PREMIUM_FEATURES,
    helperText:
      "Feature grid for benefit communication, cleaner structure, icons, and premium visual clarity.",
    features: getBlockFeatureCatalog(BLOCK_KEYS.PREMIUM_FEATURES),
  },
  {
    title: "Trust & Payment Showcase",
    blockKey: BLOCK_KEYS.TRUST_PAYMENTS_SHOWCASE,
    helperText:
      "Planned next block for trust messaging, reviews, payment systems, and delivery partners.",
    features: getBlockFeatureCatalog(BLOCK_KEYS.TRUST_PAYMENTS_SHOWCASE),
  },
  {
    title: "Vertical Video Showcase",
    blockKey: BLOCK_KEYS.VIDEO_SHOWCASE,
    helperText:
      "Planned next block for 9:16 product videos, CTA links, and premium video presentation.",
    features: getBlockFeatureCatalog(BLOCK_KEYS.VIDEO_SHOWCASE),
  },
];

function getPlanBadgeText(planKey, currentPlanKey) {
  if (planKey === currentPlanKey) {
    return "Current plan";
  }

  if (planKey === PLAN_KEYS.STANDARD) {
    return "Main plan";
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

function getPlanSummary(planKey) {
  if (planKey === PLAN_KEYS.FREE) {
    return "Best for merchants who want a strong starting point without paying upfront.";
  }

  if (planKey === PLAN_KEYS.STANDARD) {
    return "Best for stores that want deeper control and a more polished storefront result.";
  }

  return "Best for brands that want premium visual control, stronger effects, and luxury-level presentation.";
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

function countAvailableFeatures(planKey, blockKey, features) {
  return features.filter((feature) =>
    canAccessBlockFeature(planKey, blockKey, feature.key),
  ).length;
}

function getAvailableFeatures(planKey, blockKey, features) {
  return features.filter((feature) =>
    canAccessBlockFeature(planKey, blockKey, feature.key),
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

  const appEditingPoints = [
    "Main visual editing inside the app",
    "Preview-driven editing flow",
    "Desktop and mobile tuning",
    "Cleaner merchant onboarding",
    "Stronger premium upgrade path",
  ];

  const shopifyEditingPoints = [
    "Add the app block to the theme",
    "Turn the block or embed on",
    "Place the block in the right template",
    "Keep only minimal fallback fields",
    "Avoid overloaded theme-side settings",
  ];

  return (
    <Page
      title="Pricing"
      subtitle="Choose the level of control your storefront needs. Every plan supports mobile-ready editing and unlimited color selection."
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
              Shopify returned to the app for plan: {transitionPlan}. The next
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
                  Merchant-first pricing
                </Text>
                <Text as="p" variant="bodyMd" tone="subdued">
                  Start with a strong free plan, grow into deeper editing
                  control, and upgrade only when your storefront needs more
                  premium presentation.
                </Text>
              </BlockStack>

              <Badge tone="success">{currentPlanLabel}</Badge>
            </InlineStack>

            <InlineStack gap="300">
              <Text as="span" variant="bodySm" tone="subdued">
                Plan source: {currentPlanSource}
              </Text>
              <Text as="span" variant="bodySm" tone="subdued">
                Active paid billing: {hasActivePayment ? "Yes" : "No"}
              </Text>
            </InlineStack>

            <InlineStack gap="200">
              <Link to="/app/blocks" style={{ textDecoration: "none" }}>
                <Button variant="primary">Open Blocks Studio</Button>
              </Link>

              <Link to="/app" style={{ textDecoration: "none" }}>
                <Button>Back to Dashboard</Button>
              </Link>
            </InlineStack>
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
                Your current storefront editing level
              </Text>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="150">
              <Text as="h3" variant="headingSm">
                Unlimited colors
              </Text>
              <Text as="p" variant="headingLg">
                Yes
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Available across all plans
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
                Supported on every plan
              </Text>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="150">
              <Text as="h3" variant="headingSm">
                Next planned blocks
              </Text>
              <Text as="p" variant="headingLg">
                2
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Trust & Payment + Video Showcase
              </Text>
            </BlockStack>
          </Card>
        </InlineGrid>

        <InlineGrid columns={{ xs: 1, md: 3 }} gap="400">
          {BILLING_PLANS.map((plan) => {
            const actionState = getBillingActionState(plan.key, currentPlanKey);
            const actionLabel = getBillingActionLabel(plan.key, currentPlanKey);
            const isActionable =
              actionState === "upgrade" || actionState === "downgrade";
            const trialDays = plan.shopifyBilling?.trialDays ?? null;

            return (
              <Card key={plan.key} roundedAbove="sm">
                <BlockStack gap="350">
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

                  <Text as="p" variant="bodySm" tone="subdued">
                    {getPlanSummary(plan.key)}
                  </Text>

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
                </BlockStack>
              </Card>
            );
          })}
        </InlineGrid>

        <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                What merchants edit inside the app
              </Text>

              <List>
                {appEditingPoints.map((item) => (
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
                {shopifyEditingPoints.map((item) => (
                  <List.Item key={item}>{item}</List.Item>
                ))}
              </List>
            </BlockStack>
          </Card>
        </InlineGrid>

        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">
              Plan-aware block access
            </Text>

            <Text as="p" variant="bodyMd" tone="subdued">
              Free should already be useful, Standard should be the main working
              plan, and Premium should unlock stronger luxury-level visual
              control.
            </Text>

            <BlockStack gap="400">
              {featureGroups.map((group) => (
                <Card key={group.blockKey} roundedAbove="sm">
                  <BlockStack gap="300">
                    <BlockStack gap="050">
                      <Text as="h3" variant="headingMd">
                        {group.title}
                      </Text>
                      <Text as="p" variant="bodyMd" tone="subdued">
                        {group.helperText}
                      </Text>
                    </BlockStack>

                    <InlineGrid columns={{ xs: 1, md: 3 }} gap="300">
                      {[PLAN_KEYS.FREE, PLAN_KEYS.STANDARD, PLAN_KEYS.PREMIUM].map(
                        (planKey) => {
                          const availableFeatures = getAvailableFeatures(
                            planKey,
                            group.blockKey,
                            group.features,
                          );

                          return (
                            <Card key={`${group.blockKey}-${planKey}`} roundedAbove="sm">
                              <BlockStack gap="250">
                                <InlineStack
                                  align="space-between"
                                  blockAlign="center"
                                >
                                  <Text as="h4" variant="headingSm">
                                    {PLAN_LABELS[planKey]}
                                  </Text>
                                  <Badge
                                    tone={planKey === currentPlanKey ? "success" : "info"}
                                  >
                                    {countAvailableFeatures(
                                      planKey,
                                      group.blockKey,
                                      group.features,
                                    )}
                                    /{group.features.length}
                                  </Badge>
                                </InlineStack>

                                {availableFeatures.length > 0 ? (
                                  <BlockStack gap="100">
                                    {group.features.map((feature) => (
                                      <FeatureRow
                                        key={`${planKey}-${group.blockKey}-${feature.key}`}
                                        label={feature.label}
                                        isAvailable={canAccessBlockFeature(
                                          planKey,
                                          group.blockKey,
                                          feature.key,
                                        )}
                                      />
                                    ))}
                                  </BlockStack>
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
            </BlockStack>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="300">
            <Text as="h2" variant="headingMd">
              Pricing philosophy
            </Text>

            <List>
              <List.Item>
                Free should deliver a real visual upgrade, not an empty trial.
              </List.Item>
              <List.Item>
                Standard should feel like the main working plan for growing
                merchants.
              </List.Item>
              <List.Item>
                Premium should add clearly stronger visual control and premium
                effects.
              </List.Item>
              <List.Item>
                Merchants should upgrade because the value is obvious, not
                because the free plan feels broken.
              </List.Item>
            </List>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}