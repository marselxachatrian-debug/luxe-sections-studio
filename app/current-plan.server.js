import { PLAN_KEYS } from "./plan-rules";
import { BILLING_PLANS } from "./billing-config";
import { checkActiveBilling } from "./billing.server";
import { normalizeAppPlan } from "./current-plan";

export function resolvePlanKeyFromBillingPlanName(planName) {
  if (!planName) {
    return PLAN_KEYS.FREE;
  }

  const matchedPlan = BILLING_PLANS.find(
    (plan) => plan.shopifyBilling?.planName === planName,
  );

  return normalizeAppPlan(matchedPlan?.key ?? PLAN_KEYS.FREE);
}

export async function getCurrentPlanFromRequest(request) {
  const billingStatus = await checkActiveBilling(request);

  if (!billingStatus?.hasActivePayment) {
    return {
      planKey: PLAN_KEYS.FREE,
      source: "billing-check",
      hasActivePayment: false,
      appSubscriptions: [],
    };
  }

  const activePlanName = billingStatus.activePlanName;
  const planKey = resolvePlanKeyFromBillingPlanName(activePlanName);

  return {
    planKey,
    source: "billing-check",
    hasActivePayment: billingStatus.hasActivePayment,
    activePlanName,
    appSubscriptions: billingStatus.appSubscriptions ?? [],
  };
}