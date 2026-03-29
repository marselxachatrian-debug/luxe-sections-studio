import { Form, Link, useFetcher, useLoaderData } from "react-router";
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
import {
  THEME_ONBOARDING_KEYS,
  getThemeEditorOnboardingLinks,
} from "../theme-editor-links";
import { getMockBillingStatus } from "../billing-helpers";
import { getShopSetupState } from "../shop-setup-state.server";

const SETUP_STEP_FIELD_MAP = {
  [THEME_ONBOARDING_KEYS.ENABLE_APP]: "appEmbedConfirmed",
  [THEME_ONBOARDING_KEYS.LUXE_HERO]: "heroBlockConfirmed",
  [THEME_ONBOARDING_KEYS.TRUST_BAR]: "trustBlockConfirmed",
  [THEME_ONBOARDING_KEYS.PREMIUM_FEATURES]: "featuresBlockConfirmed",
};

function countAccessibleFeatures(planKey, blockKey) {
  const features = getBlockFeatureCatalog(blockKey);

  return features.filter((feature) =>
    canAccessBlockFeature(planKey, blockKey, feature.key),
  ).length;
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

function getBlockEditorPath(handle) {
  if (handle === "luxe-hero") {
    return "/app/blocks/luxe-hero";
  }

  if (handle === "trust-bar") {
    return "/app/blocks/trust-bar";
  }

  if (handle === "premium-features") {
    return "/app/blocks/premium-features";
  }

  return `/app/blocks?block=${handle}`;
}

function getOnboardingCompletionMap(shopSetupState) {
  return {
    [THEME_ONBOARDING_KEYS.ENABLE_APP]: shopSetupState.appEmbedConfirmed,
    [THEME_ONBOARDING_KEYS.LUXE_HERO]: shopSetupState.heroBlockConfirmed,
    [THEME_ONBOARDING_KEYS.TRUST_BAR]: shopSetupState.trustBlockConfirmed,
    [THEME_ONBOARDING_KEYS.PREMIUM_FEATURES]:
      shopSetupState.featuresBlockConfirmed,
  };
}

export async function loader({ request }) {
  const currentPlanStatus = await getCurrentPlanFromRequest(request);
  const activeThemeStatus = await getActiveThemeFromRequest(request);
  const onboardingLinks = getThemeEditorOnboardingLinks(
    activeThemeStatus.shop,
    activeThemeStatus.themeId,
    process.env.SHOPIFY_API_KEY,
  );
  const shopSetupState = await getShopSetupState(activeThemeStatus.shop);

  return {
    currentPlanKey: currentPlanStatus.planKey,
    currentPlanLabel: PLAN_LABELS[currentPlanStatus.planKey],
    currentPlanSource: currentPlanStatus.source,
    hasActivePayment: currentPlanStatus.hasActivePayment,
    activeThemeName: activeThemeStatus.theme?.name ?? null,
    activeThemeId: activeThemeStatus.themeId,
    onboardingLinks,
    shopSetupState,
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
    shopSetupState,
  } = useLoaderData();

  const setupFetcher = useFetcher();
  const resetFetcher = useFetcher();

  const billingStatus = getMockBillingStatus(currentPlanKey);

  const currentPlanSnapshots = [
    {
      name: "Premium Hero Banner",
      handle: "luxe-hero",
      value: `${countAccessibleFeatures(currentPlanKey, BLOCK_KEYS.LUXE_HERO)}/${getBlockFeatureCatalog(BLOCK_KEYS.LUXE_HERO).length}`,
      description:
        "Main hero editor for stronger first impressions, CTA control, and premium storefront storytelling.",
    },
    {
      name: "Store Trust Highlights",
      handle: "trust-bar",
      value: `${countAccessibleFeatures(currentPlanKey, BLOCK_KEYS.TRUST_BAR)}/${getBlockFeatureCatalog(BLOCK_KEYS.TRUST_BAR).length}`,
      description:
        "Trust editor for reassurance messaging, spacing control, and cleaner shopper confidence sections.",
    },
    {
      name: "Feature Highlights Grid",
      handle: "premium-features",
      value: `${countAccessibleFeatures(currentPlanKey, BLOCK_KEYS.PREMIUM_FEATURES)}/${getBlockFeatureCatalog(BLOCK_KEYS.PREMIUM_FEATURES).length}`,
      description:
        "Feature grid editor for product benefits, icon-led cards, and stronger visual structure.",
    },
  ];

  const studioGuide = [
    {
      name: "Dashboard",
      description:
        "Use this page as your starting point for setup, plan visibility, and quick actions.",
    },
    {
      name: "Blocks",
      description:
        "Open the block studio, choose a block, and move into dedicated block editors.",
    },
    {
      name: "Pricing",
      description:
        "Compare plans clearly and upgrade only when you want more control or premium visuals.",
    },
    {
      name: "Settings",
      description:
        "Review app-level controls and future studio configuration areas.",
    },
  ];

  const merchantFlow = [
    "Open the theme editor and add the app block to the correct template.",
    "Come back to Luxe Sections Studio and open the right block editor page.",
    "Adjust the block inside the app and review the live preview.",
    "Keep Shopify theme settings minimal and merchant-friendly.",
  ];

  const appValuePoints = [
    "Main editing should happen inside the app.",
    "Theme Editor should stay focused on placement and activation.",
    "Every plan should remain mobile-ready.",
    "Premium plans should feel meaningfully stronger, not artificially restricted.",
  ];

  const completionMap = getOnboardingCompletionMap(shopSetupState);
  const onboardingSteps = onboardingLinks.map((step) => ({
    ...step,
    stepFieldKey: SETUP_STEP_FIELD_MAP[step.key],
    isCompleted: Boolean(completionMap[step.key]),
  }));

  const completedStepsCount = onboardingSteps.filter(
    (step) => step.isCompleted,
  ).length;
  const totalStepsCount = onboardingSteps.length;
  const allStepsCompleted = completedStepsCount === totalStepsCount;
  const nextIncompleteStepIndex = onboardingSteps.findIndex(
    (step) => !step.isCompleted,
  );

  const primaryThemeEditorUrl =
    onboardingLinks.find((step) => step.url)?.url ?? null;

  return (
    <Page
      title="Dashboard"
      subtitle="A merchant-first studio home for setup, guidance, and the next best action."
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
                  Build a cleaner, sharper, and more premium storefront with a
                  simpler editing flow for merchants.
                </Text>
              </BlockStack>

              <InlineStack gap="200">
                <Badge tone="success">{currentPlanLabel}</Badge>
                <Badge tone={allStepsCompleted ? "success" : "info"}>
                  Setup {completedStepsCount}/{totalStepsCount}
                </Badge>
              </InlineStack>
            </InlineStack>

            <Text as="p" variant="bodyMd" tone="subdued">
              Your active theme is {activeThemeName ?? "not found"}
              {activeThemeId ? ` (ID: ${activeThemeId})` : ""}. Start with the
              checklist below, then continue into Blocks Studio or jump directly
              into one of the live block editors.
            </Text>

            <InlineStack gap="200">
              <Link to="/app/blocks" style={{ textDecoration: "none" }}>
                <Button variant="primary">Open Blocks Studio</Button>
              </Link>

              {primaryThemeEditorUrl ? (
                <Button onClick={() => openInTopWindow(primaryThemeEditorUrl)}>
                  Open Theme Editor
                </Button>
              ) : (
                <Button disabled>Open Theme Editor</Button>
              )}

              <Link to="/app/pricing" style={{ textDecoration: "none" }}>
                <Button variant="secondary">View Pricing</Button>
              </Link>
            </InlineStack>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <InlineStack align="space-between" blockAlign="center">
              <Text as="h2" variant="headingMd">
                Setup checklist
              </Text>
              <InlineStack gap="200">
                <Badge tone={allStepsCompleted ? "success" : "info"}>
                  {allStepsCompleted
                    ? "All steps completed"
                    : `${completedStepsCount}/${totalStepsCount} completed`}
                </Badge>

                <resetFetcher.Form method="post" action="/app/setup-status">
                  <input type="hidden" name="intent" value="reset_setup" />
                  <Button
                    submit
                    disabled={resetFetcher.state !== "idle"}
                    variant="secondary"
                  >
                    Reset checklist
                  </Button>
                </resetFetcher.Form>
              </InlineStack>
            </InlineStack>

            <InlineGrid columns={{ xs: 1, md: 2 }} gap="300">
              {onboardingSteps.map((step, index) => {
                const isNextStep =
                  !step.isCompleted && index === nextIncompleteStepIndex;

                return (
                  <Card key={step.key} roundedAbove="sm">
                    <BlockStack gap="250">
                      <InlineStack align="space-between" blockAlign="center">
                        <Text as="h3" variant="headingSm">
                          Step {index + 1}
                        </Text>
                        <Badge
                          tone={
                            step.isCompleted
                              ? "success"
                              : isNextStep
                                ? "attention"
                                : "info"
                          }
                        >
                          {step.isCompleted
                            ? "Completed"
                            : isNextStep
                              ? "Do this next"
                              : "Upcoming"}
                        </Badge>
                      </InlineStack>

                      <BlockStack gap="100">
                        <Text as="p" variant="headingMd">
                          {step.label}
                        </Text>
                        <Text as="p" variant="bodyMd" tone="subdued">
                          {step.description}
                        </Text>
                      </BlockStack>

                      <InlineStack gap="200">
                        {step.url ? (
                          <Button
                            onClick={() => openInTopWindow(step.url)}
                            variant={isNextStep ? "primary" : "secondary"}
                          >
                            {step.isCompleted
                              ? "Review step"
                              : index === 0
                                ? "Open Theme Editor"
                                : "Open this step"}
                          </Button>
                        ) : (
                          <Button disabled>
                            {index === 0 ? "Open Theme Editor" : "Open this step"}
                          </Button>
                        )}

                        {step.stepFieldKey ? (
                          <setupFetcher.Form method="post" action="/app/setup-status">
                            <input
                              type="hidden"
                              name="intent"
                              value="confirm_step"
                            />
                            <input
                              type="hidden"
                              name="stepKey"
                              value={step.stepFieldKey}
                            />
                            <input
                              type="hidden"
                              name="value"
                              value={step.isCompleted ? "false" : "true"}
                            />
                            <Button
                              submit
                              variant="secondary"
                              disabled={setupFetcher.state !== "idle"}
                            >
                              {step.isCompleted
                                ? "Mark as not completed"
                                : "Mark as completed"}
                            </Button>
                          </setupFetcher.Form>
                        ) : null}
                      </InlineStack>
                    </BlockStack>
                  </Card>
                );
              })}
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
                Setup progress
              </Text>
              <Text as="p" variant="headingLg">
                {completedStepsCount}/{totalStepsCount}
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Stored per shop in onboarding state
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

        <Card>
          <BlockStack gap="300">
            <InlineStack align="space-between" blockAlign="center">
              <Text as="h2" variant="headingMd">
                Open a live block editor
              </Text>
              <Badge tone="success">3 ready now</Badge>
            </InlineStack>

            <InlineGrid columns={{ xs: 1, md: 3 }} gap="300">
              {currentPlanSnapshots.map((item) => (
                <Card key={item.handle} roundedAbove="sm">
                  <BlockStack gap="200">
                    <InlineStack align="space-between" blockAlign="center">
                      <Text as="h3" variant="headingSm">
                        {item.name}
                      </Text>
                      <Badge tone="info">{item.value}</Badge>
                    </InlineStack>

                    <Text as="p" variant="bodyMd" tone="subdued">
                      {item.description}
                    </Text>

                    <Link
                      to={getBlockEditorPath(item.handle)}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="primary">Open editor</Button>
                    </Link>
                  </BlockStack>
                </Card>
              ))}
            </InlineGrid>
          </BlockStack>
        </Card>

        <InlineGrid columns={{ xs: 1, md: 2 }} gap="400">
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Start here inside the app
              </Text>

              <List type="number">
                {merchantFlow.map((item) => (
                  <List.Item key={item}>{item}</List.Item>
                ))}
              </List>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Product direction
              </Text>

              <List>
                {appValuePoints.map((item) => (
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
                Studio navigation guide
              </Text>

              <List>
                {studioGuide.map((item) => (
                  <List.Item key={item.name}>
                    <strong>{item.name}:</strong> {item.description}
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
                  Upgrade when you want stronger visual control, richer
                  presentation, or more premium effects.
                </List.Item>
              </List>

              <Link to="/app/pricing" style={{ textDecoration: "none" }}>
                <Button>Compare plans</Button>
              </Link>
            </BlockStack>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}