import { PLAN_KEYS } from "./plan-rules";

export const BILLING_PLANS = [
  {
    key: PLAN_KEYS.FREE,
    name: "Free",
    handle: "free",
    isFree: true,
    status: "active",
    billingModel: "mock",
    priceLabel: "$0",
    intervalLabel: "forever",
    description: "Starter access for core theme block usage.",
    highlights: [
      "Safe starting point for new merchants",
      "No live Shopify billing call yet",
      "Works with current mock plan source",
    ],
    shopifyBilling: null,
  },
  {
    key: PLAN_KEYS.STANDARD,
    name: "Standard",
    handle: "standard",
    isFree: false,
    status: "planned",
    billingModel: "app_subscription",
    priceLabel: "$19",
    intervalLabel: "30 days",
    description: "Mid-tier plan for stronger section flexibility.",
    highlights: [
      "Prepared for recurring Shopify billing",
      "Good target for first paid upgrade path",
      "Keeps UI ready before real billing goes live",
    ],
    shopifyBilling: {
      planName: "Luxe Sections Studio Standard",
      interval: "EVERY_30_DAYS",
      amount: 19,
      currencyCode: "USD",
      trialDays: 7,
      replacementBehavior: "STANDARD",
      returnUrlPath: "/app/pricing",
      isTest: true,
    },
  },
  {
    key: PLAN_KEYS.PREMIUM,
    name: "Premium",
    handle: "premium",
    isFree: false,
    status: "planned",
    billingModel: "app_subscription",
    priceLabel: "$49",
    intervalLabel: "30 days",
    description: "Top-tier plan for advanced premium block controls.",
    highlights: [
      "Prepared for advanced feature unlock flow",
      "Matches premium merchandising direction",
      "Ready for future real billing wiring",
    ],
    shopifyBilling: {
      planName: "Luxe Sections Studio Premium",
      interval: "EVERY_30_DAYS",
      amount: 49,
      currencyCode: "USD",
      trialDays: 7,
      replacementBehavior: "STANDARD",
      returnUrlPath: "/app/pricing",
      isTest: true,
    },
  },
];

export function getBillingPlan(planKey) {
  return BILLING_PLANS.find((plan) => plan.key === planKey) ?? BILLING_PLANS[0];
}