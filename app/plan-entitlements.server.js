import { BLOCK_KEYS, PLAN_LABELS, canAccessBlockFeature } from "./plan-rules";
import { getBlockFeatureCatalog } from "./block-feature-catalog";
import { getCurrentPlanFromRequest } from "./current-plan.server";

export function getAvailableFeaturesForBlock(planKey, blockKey) {
  const features = getBlockFeatureCatalog(blockKey);

  return features.filter((feature) =>
    canAccessBlockFeature(planKey, blockKey, feature.key),
  );
}

export function getLockedFeaturesForBlock(planKey, blockKey) {
  const features = getBlockFeatureCatalog(blockKey);

  return features.filter(
    (feature) => !canAccessBlockFeature(planKey, blockKey, feature.key),
  );
}

export function getFeatureEntitlement(planKey, blockKey, featureKey) {
  return {
    blockKey,
    featureKey,
    isAvailable: canAccessBlockFeature(planKey, blockKey, featureKey),
  };
}

export function buildPlanEntitlements(planKey) {
  return {
    planKey,
    planLabel: PLAN_LABELS[planKey],
    blocks: {
      [BLOCK_KEYS.LUXE_HERO]: {
        availableFeatures: getAvailableFeaturesForBlock(
          planKey,
          BLOCK_KEYS.LUXE_HERO,
        ),
        lockedFeatures: getLockedFeaturesForBlock(
          planKey,
          BLOCK_KEYS.LUXE_HERO,
        ),
      },
      [BLOCK_KEYS.TRUST_BAR]: {
        availableFeatures: getAvailableFeaturesForBlock(
          planKey,
          BLOCK_KEYS.TRUST_BAR,
        ),
        lockedFeatures: getLockedFeaturesForBlock(
          planKey,
          BLOCK_KEYS.TRUST_BAR,
        ),
      },
      [BLOCK_KEYS.PREMIUM_FEATURES]: {
        availableFeatures: getAvailableFeaturesForBlock(
          planKey,
          BLOCK_KEYS.PREMIUM_FEATURES,
        ),
        lockedFeatures: getLockedFeaturesForBlock(
          planKey,
          BLOCK_KEYS.PREMIUM_FEATURES,
        ),
      },
    },
  };
}

export async function getPlanEntitlementsFromRequest(request) {
  const currentPlanStatus = await getCurrentPlanFromRequest(request);
  const entitlements = buildPlanEntitlements(currentPlanStatus.planKey);

  return {
    ...entitlements,
    source: currentPlanStatus.source,
    hasActivePayment: currentPlanStatus.hasActivePayment,
  };
}