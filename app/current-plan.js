import { PLAN_KEYS, PLAN_LABELS } from "./plan-rules";

export const AVAILABLE_APP_PLANS = [
  PLAN_KEYS.FREE,
  PLAN_KEYS.STANDARD,
  PLAN_KEYS.PREMIUM,
];

export const CURRENT_APP_PLAN = PLAN_KEYS.FREE;

export const CURRENT_APP_PLAN_LABEL = PLAN_LABELS[CURRENT_APP_PLAN];

export function isKnownAppPlan(planKey) {
  return AVAILABLE_APP_PLANS.includes(planKey);
}

export function normalizeAppPlan(planKey) {
  return isKnownAppPlan(planKey) ? planKey : PLAN_KEYS.FREE;
}

export function getCurrentAppPlan() {
  return normalizeAppPlan(CURRENT_APP_PLAN);
}

export function getCurrentAppPlanLabel(planKey = CURRENT_APP_PLAN) {
  const normalizedPlan = normalizeAppPlan(planKey);
  return PLAN_LABELS[normalizedPlan];
}