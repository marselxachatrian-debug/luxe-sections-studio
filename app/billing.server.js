import { authenticate } from "./shopify.server";
import { PLAN_KEYS } from "./plan-rules";
import { getBillingPlan } from "./billing-config";
import { getCurrentAppPlan, normalizeAppPlan } from "./current-plan";
import {
  BILLING_ACTION_STATES,
  createMockBillingTransitionUrl,
  getBillingActionState,
} from "./billing-helpers";

const PAID_PLAN_KEYS = [PLAN_KEYS.STANDARD, PLAN_KEYS.PREMIUM];

function redirectResponse(location) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: location,
    },
  });
}

export function resolveCurrentBillingPlan() {
  const currentPlanKey = getCurrentAppPlan();
  return getBillingPlan(currentPlanKey);
}

export function resolveBillingPlanByKey(planKey) {
  const normalizedPlanKey = normalizeAppPlan(planKey);
  return getBillingPlan(normalizedPlanKey);
}

export function getShopifyBillingPlanName(planKey) {
  const billingPlan = resolveBillingPlanByKey(planKey);
  return billingPlan?.shopifyBilling?.planName ?? null;
}

export function getPaidShopifyBillingPlanNames() {
  return PAID_PLAN_KEYS.map((planKey) => getShopifyBillingPlanName(planKey)).filter(
    Boolean,
  );
}

export async function checkActiveBilling(request, planKeys = PAID_PLAN_KEYS) {
  const { billing } = await authenticate.admin(request);

  const planNames = planKeys
    .map((planKey) => getShopifyBillingPlanName(planKey))
    .filter(Boolean);

  if (planNames.length === 0) {
    return {
      hasActivePayment: false,
      appSubscriptions: [],
      activePlanName: null,
    };
  }

  const billingCheck = await billing.check({
    plans: planNames,
    isTest: true,
  });

  return {
    ...billingCheck,
    activePlanName: billingCheck.appSubscriptions?.[0]?.name ?? null,
  };
}

export async function requirePaidBilling(
  request,
  failurePath = "/app/pricing",
) {
  const { billing } = await authenticate.admin(request);

  const planNames = getPaidShopifyBillingPlanNames();

  if (planNames.length === 0) {
    return redirectResponse(failurePath);
  }

  return billing.require({
    plans: planNames,
    isTest: true,
    onFailure: async () => redirectResponse(failurePath),
  });
}

export async function requestBillingForPlan(
  request,
  planKey,
  returnUrl = "/app/pricing",
) {
  const { billing } = await authenticate.admin(request);
  const billingPlan = resolveBillingPlanByKey(planKey);
  const planName = billingPlan?.shopifyBilling?.planName ?? null;

  if (!billingPlan || !planName) {
    return {
      ok: false,
      mode: "real",
      error: "Billing plan is not configured for Shopify billing yet.",
    };
  }

  await billing.request({
    plan: planName,
    isTest: billingPlan.shopifyBilling.isTest,
    returnUrl,
  });

  return {
    ok: true,
    mode: "real",
    requestedPlanKey: normalizeAppPlan(planKey),
  };
}

export function getMockBillingContext(targetPlanKey) {
  const currentPlanKey = getCurrentAppPlan();
  const targetPlan = resolveBillingPlanByKey(targetPlanKey);
  const currentPlan = resolveCurrentBillingPlan();
  const actionState = getBillingActionState(targetPlanKey, currentPlanKey);

  return {
    currentPlanKey,
    currentPlan,
    targetPlanKey: normalizeAppPlan(targetPlanKey),
    targetPlan,
    actionState,
    isMock: true,
    canContinue:
      actionState === BILLING_ACTION_STATES.UPGRADE ||
      actionState === BILLING_ACTION_STATES.DOWNGRADE,
  };
}

export function createMockBillingConfirmationUrl(targetPlanKey) {
  const context = getMockBillingContext(targetPlanKey);

  if (!context.canContinue) {
    return null;
  }

  return createMockBillingTransitionUrl(
    context.targetPlanKey,
    context.currentPlanKey,
  );
}

export async function requestMockPlanChange(targetPlanKey) {
  const context = getMockBillingContext(targetPlanKey);

  if (!context.targetPlan) {
    return {
      ok: false,
      error: "Unknown billing plan.",
      context,
    };
  }

  if (!context.canContinue) {
    return {
      ok: false,
      error: "This billing transition is not available in mock mode.",
      context,
    };
  }

  return {
    ok: true,
    mode: "mock",
    confirmationUrl: createMockBillingConfirmationUrl(targetPlanKey),
    context,
  };
}