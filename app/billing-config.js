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
    description:
      "A strong no-code starting plan for merchants who want a clean storefront result without coding.",
    highlights: [
      "Mobile-ready editing foundation",
      "Unlimited color selection across supported controls",
      "Core text, spacing, layout, and link controls",
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
    priceLabel: "$9.50",
    intervalLabel: "30 days",
    description:
      "The working plan for merchants who need more layout control, stronger typography, and richer block customization.",
    highlights: [
      "Everything in Free plus stronger layout flexibility",
      "Custom icon upload and extended content structure",
      "Better control for trust, feature, and showcase sections",
    ],
    shopifyBilling: {
      planName: "Luxe Sections Studio Standard",
      interval: "EVERY_30_DAYS",
      amount: 9.5,
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
    priceLabel: "$24.50",
    intervalLabel: "30 days",
    description:
      "Luxury storefront control with premium visual polish, advanced motion, and high-end presentation tools.",
    highlights: [
      "Everything in Standard plus premium visual effects",
      "Glow, shimmer, hover, and animated border upgrades",
      "Maximum presentation power for premium storefronts",
    ],
    shopifyBilling: {
      planName: "Luxe Sections Studio Premium",
      interval: "EVERY_30_DAYS",
      amount: 24.5,
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