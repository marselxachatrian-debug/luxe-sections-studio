import { PLAN_KEYS, PLAN_ORDER } from "./plan-rules";
import { getCurrentAppPlan, normalizeAppPlan } from "./current-plan";
import { getBillingPlan } from "./billing-config";

export const BILLING_ACTION_STATES = {
  CURRENT: "current",
  UPGRADE: "upgrade",
  DOWNGRADE: "downgrade",
  UNAVAILABLE: "unavailable",
};

export const MOCK_BILLING_SOURCE = "mock-billing";

export function isCurrentBillingPlan(planKey, currentPlan = getCurrentAppPlan()) {
  return normalizeAppPlan(planKey) === normalizeAppPlan(currentPlan);
}

export function canUpgradeToPlan(planKey, currentPlan = getCurrentAppPlan()) {
  const normalizedTargetPlan = normalizeAppPlan(planKey);
  const normalizedCurrentPlan = normalizeAppPlan(currentPlan);

  return (
    PLAN_ORDER.indexOf(normalizedTargetPlan) >
    PLAN_ORDER.indexOf(normalizedCurrentPlan)
  );
}

export function canDowngradeToPlan(planKey, currentPlan = getCurrentAppPlan()) {
  const normalizedTargetPlan = normalizeAppPlan(planKey);
  const normalizedCurrentPlan = normalizeAppPlan(currentPlan);

  return (
    PLAN_ORDER.indexOf(normalizedTargetPlan) <
    PLAN_ORDER.indexOf(normalizedCurrentPlan)
  );
}

export function getBillingActionState(planKey, currentPlan = getCurrentAppPlan()) {
  const billingPlan = getBillingPlan(planKey);

  if (!billingPlan) {
    return BILLING_ACTION_STATES.UNAVAILABLE;
  }

  if (isCurrentBillingPlan(planKey, currentPlan)) {
    return BILLING_ACTION_STATES.CURRENT;
  }

  if (canUpgradeToPlan(planKey, currentPlan)) {
    return BILLING_ACTION_STATES.UPGRADE;
  }

  if (canDowngradeToPlan(planKey, currentPlan)) {
    return BILLING_ACTION_STATES.DOWNGRADE;
  }

  return BILLING_ACTION_STATES.UNAVAILABLE;
}

export function getBillingActionLabel(
  planKey,
  currentPlan = getCurrentAppPlan(),
) {
  const actionState = getBillingActionState(planKey, currentPlan);

  switch (actionState) {
    case BILLING_ACTION_STATES.CURRENT:
      return "Current plan";
    case BILLING_ACTION_STATES.UPGRADE:
      return "Upgrade";
    case BILLING_ACTION_STATES.DOWNGRADE:
      return "Downgrade";
    default:
      return "Unavailable";
  }
}

export function getUpgradeablePlans(currentPlan = getCurrentAppPlan()) {
  return PLAN_ORDER.filter((planKey) => canUpgradeToPlan(planKey, currentPlan));
}

export function getMockBillingStatus(currentPlan = getCurrentAppPlan()) {
  const normalizedCurrentPlan = normalizeAppPlan(currentPlan);

  return {
    currentPlan: normalizedCurrentPlan,
    hasPaidPlan:
      normalizedCurrentPlan === PLAN_KEYS.STANDARD ||
      normalizedCurrentPlan === PLAN_KEYS.PREMIUM,
    availableUpgrades: getUpgradeablePlans(normalizedCurrentPlan),
  };
}

export function createMockBillingTransitionUrl(
  planKey,
  currentPlan = getCurrentAppPlan(),
) {
  const normalizedTargetPlan = normalizeAppPlan(planKey);
  const actionState = getBillingActionState(
    normalizedTargetPlan,
    currentPlan,
  );

  if (
    actionState !== BILLING_ACTION_STATES.UPGRADE &&
    actionState !== BILLING_ACTION_STATES.DOWNGRADE
  ) {
    return null;
  }

  const params = new URLSearchParams({
    plan: normalizedTargetPlan,
    action: actionState,
    source: MOCK_BILLING_SOURCE,
  });

  return `/app/pricing?${params.toString()}`;
}