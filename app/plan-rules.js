export const PLAN_KEYS = {
  FREE: "free",
  STANDARD: "standard",
  PREMIUM: "premium",
};

export const PLAN_LABELS = {
  [PLAN_KEYS.FREE]: "Free",
  [PLAN_KEYS.STANDARD]: "Standard",
  [PLAN_KEYS.PREMIUM]: "Premium",
};

export const PLAN_ORDER = [
  PLAN_KEYS.FREE,
  PLAN_KEYS.STANDARD,
  PLAN_KEYS.PREMIUM,
];

export const BLOCK_KEYS = {
  LUXE_HERO: "luxe-hero",
  TRUST_BAR: "trust-bar",
  PREMIUM_FEATURES: "premium-features",
};

export const LUXE_HERO_FEATURE_RULES = {
  heading: PLAN_KEYS.FREE,
  subheading: PLAN_KEYS.FREE,
  backgroundImage: PLAN_KEYS.FREE,
  primaryButton: PLAN_KEYS.FREE,
  overlayOpacity: PLAN_KEYS.FREE,
  desktopSectionHeight: PLAN_KEYS.FREE,

  contentAlignment: PLAN_KEYS.STANDARD,
  secondaryButton: PLAN_KEYS.STANDARD,
  paddingTop: PLAN_KEYS.STANDARD,
  paddingBottom: PLAN_KEYS.STANDARD,

  mobileSectionHeight: PLAN_KEYS.PREMIUM,
  mobilePaddingTop: PLAN_KEYS.PREMIUM,
  mobilePaddingBottom: PLAN_KEYS.PREMIUM,
  videoBackground: PLAN_KEYS.PREMIUM,
  glowEffects: PLAN_KEYS.PREMIUM,
  advancedAnimations: PLAN_KEYS.PREMIUM,
};

export const TRUST_BAR_FEATURE_RULES = {
  heading: PLAN_KEYS.FREE,
  trustItems: PLAN_KEYS.FREE,

  headingAlignment: PLAN_KEYS.STANDARD,
  sectionStyle: PLAN_KEYS.STANDARD,
  desktopColumns: PLAN_KEYS.STANDARD,
  paddingTop: PLAN_KEYS.STANDARD,
  paddingBottom: PLAN_KEYS.STANDARD,
};

export const PREMIUM_FEATURES_FEATURE_RULES = {
  heading: PLAN_KEYS.FREE,
  subheading: PLAN_KEYS.FREE,
  featureCards: PLAN_KEYS.FREE,

  sectionStyle: PLAN_KEYS.STANDARD,
  headingAlignment: PLAN_KEYS.STANDARD,
  desktopColumns: PLAN_KEYS.STANDARD,
  paddingTop: PLAN_KEYS.STANDARD,
  paddingBottom: PLAN_KEYS.STANDARD,

  featureCardIcons: PLAN_KEYS.PREMIUM,
};

export const BLOCK_FEATURE_RULES = {
  [BLOCK_KEYS.LUXE_HERO]: LUXE_HERO_FEATURE_RULES,
  [BLOCK_KEYS.TRUST_BAR]: TRUST_BAR_FEATURE_RULES,
  [BLOCK_KEYS.PREMIUM_FEATURES]: PREMIUM_FEATURES_FEATURE_RULES,
};

export function isPlanAtLeast(currentPlan, requiredPlan) {
  return (
    PLAN_ORDER.indexOf(currentPlan) >= PLAN_ORDER.indexOf(requiredPlan)
  );
}

export function getFeatureRequiredPlan(
  featureKey,
  blockKey = BLOCK_KEYS.LUXE_HERO,
) {
  const blockRules = BLOCK_FEATURE_RULES[blockKey] ?? {};
  return blockRules[featureKey] ?? PLAN_KEYS.FREE;
}

export function canAccessFeature(
  currentPlan,
  featureKey,
  blockKey = BLOCK_KEYS.LUXE_HERO,
) {
  const requiredPlan = getFeatureRequiredPlan(featureKey, blockKey);
  return isPlanAtLeast(currentPlan, requiredPlan);
}

export function getBlockFeatureRequiredPlan(blockKey, featureKey) {
  return getFeatureRequiredPlan(featureKey, blockKey);
}

export function canAccessBlockFeature(currentPlan, blockKey, featureKey) {
  return canAccessFeature(currentPlan, featureKey, blockKey);
}