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
  TRUST_PAYMENTS_SHOWCASE: "trust-payments-showcase",
  VIDEO_SHOWCASE: "video-showcase",
};

export const COMMON_FOUNDATION_FEATURE_RULES = {
  heading: PLAN_KEYS.FREE,
  subheading: PLAN_KEYS.FREE,

  textColor: PLAN_KEYS.FREE,
  subtextColor: PLAN_KEYS.FREE,
  headingColor: PLAN_KEYS.FREE,
  backgroundColor: PLAN_KEYS.FREE,
  surfaceColor: PLAN_KEYS.FREE,
  cardBackgroundColor: PLAN_KEYS.FREE,
  borderColor: PLAN_KEYS.FREE,
  accentColor: PLAN_KEYS.FREE,
  overlayColor: PLAN_KEYS.FREE,
  iconColor: PLAN_KEYS.FREE,
  iconBackgroundColor: PLAN_KEYS.FREE,
  buttonColor: PLAN_KEYS.FREE,
  buttonTextColor: PLAN_KEYS.FREE,
  secondaryButtonColor: PLAN_KEYS.FREE,
  secondaryButtonTextColor: PLAN_KEYS.FREE,

  borderRadius: PLAN_KEYS.FREE,
  sectionStyle: PLAN_KEYS.FREE,

  paddingTop: PLAN_KEYS.FREE,
  paddingBottom: PLAN_KEYS.FREE,
  mobilePaddingTop: PLAN_KEYS.FREE,
  mobilePaddingBottom: PLAN_KEYS.FREE,

  mobileLayout: PLAN_KEYS.FREE,
  mobileSpacing: PLAN_KEYS.FREE,
  desktopSpacing: PLAN_KEYS.FREE,

  headingFontSize: PLAN_KEYS.FREE,
  subheadingFontSize: PLAN_KEYS.FREE,
  bodyFontSize: PLAN_KEYS.FREE,
};

export const STANDARD_VISUAL_UPGRADE_RULES = {
  contentAlignment: PLAN_KEYS.STANDARD,
  headingAlignment: PLAN_KEYS.STANDARD,
  desktopColumns: PLAN_KEYS.STANDARD,
  cardStyle: PLAN_KEYS.STANDARD,
  borderWidth: PLAN_KEYS.STANDARD,
  shadowStyle: PLAN_KEYS.STANDARD,
  fontFamily: PLAN_KEYS.STANDARD,
  fontWeight: PLAN_KEYS.STANDARD,
  letterSpacing: PLAN_KEYS.STANDARD,
  buttonStyle: PLAN_KEYS.STANDARD,
  itemGap: PLAN_KEYS.STANDARD,
  sectionMaxWidth: PLAN_KEYS.STANDARD,
};

export const PREMIUM_EFFECT_RULES = {
  glowEffects: PLAN_KEYS.PREMIUM,
  advancedAnimations: PLAN_KEYS.PREMIUM,
  hoverEffects: PLAN_KEYS.PREMIUM,
  animatedBorder: PLAN_KEYS.PREMIUM,
  shimmerEffects: PLAN_KEYS.PREMIUM,
  mouseFollowEffect: PLAN_KEYS.PREMIUM,
  premiumMotion: PLAN_KEYS.PREMIUM,
};

export const LUXE_HERO_FEATURE_RULES = {
  ...COMMON_FOUNDATION_FEATURE_RULES,

  backgroundImage: PLAN_KEYS.FREE,
  primaryButton: PLAN_KEYS.FREE,
  primaryButtonLink: PLAN_KEYS.FREE,
  secondaryButton: PLAN_KEYS.FREE,
  secondaryButtonLink: PLAN_KEYS.FREE,
  overlayOpacity: PLAN_KEYS.FREE,
  desktopSectionHeight: PLAN_KEYS.FREE,
  mobileSectionHeight: PLAN_KEYS.FREE,
  backgroundFallbackColor: PLAN_KEYS.FREE,

  ...STANDARD_VISUAL_UPGRADE_RULES,

  secondaryButtonStyle: PLAN_KEYS.STANDARD,
  heroContentWidth: PLAN_KEYS.STANDARD,

  videoBackground: PLAN_KEYS.PREMIUM,
  layeredBackgroundEffects: PLAN_KEYS.PREMIUM,
  premiumHeroPresets: PLAN_KEYS.PREMIUM,

  ...PREMIUM_EFFECT_RULES,
};

export const TRUST_BAR_FEATURE_RULES = {
  ...COMMON_FOUNDATION_FEATURE_RULES,

  trustItems: PLAN_KEYS.FREE,
  trustItemTitles: PLAN_KEYS.FREE,
  trustItemTexts: PLAN_KEYS.FREE,
  trustItemLinks: PLAN_KEYS.FREE,
  trustItemIcons: PLAN_KEYS.FREE,
  iconSize: PLAN_KEYS.FREE,
  cardRadius: PLAN_KEYS.FREE,

  ...STANDARD_VISUAL_UPGRADE_RULES,

  customIconsUpload: PLAN_KEYS.STANDARD,
  trustItemCountExtended: PLAN_KEYS.STANDARD,
  iconContainerStyle: PLAN_KEYS.STANDARD,
  chipStyle: PLAN_KEYS.STANDARD,

  premiumIconSets: PLAN_KEYS.PREMIUM,
  luxuryCardPresets: PLAN_KEYS.PREMIUM,

  ...PREMIUM_EFFECT_RULES,
};

export const PREMIUM_FEATURES_FEATURE_RULES = {
  ...COMMON_FOUNDATION_FEATURE_RULES,

  featureCards: PLAN_KEYS.FREE,
  featureCardTitles: PLAN_KEYS.FREE,
  featureCardTexts: PLAN_KEYS.FREE,
  featureCardLinks: PLAN_KEYS.FREE,
  featureCardIcons: PLAN_KEYS.FREE,
  iconSize: PLAN_KEYS.FREE,
  cardRadius: PLAN_KEYS.FREE,

  ...STANDARD_VISUAL_UPGRADE_RULES,

  customIconsUpload: PLAN_KEYS.STANDARD,
  featureCardCountExtended: PLAN_KEYS.STANDARD,
  iconContainerStyle: PLAN_KEYS.STANDARD,
  cardMediaSupport: PLAN_KEYS.STANDARD,

  premiumIconSets: PLAN_KEYS.PREMIUM,
  spotlightCardStyle: PLAN_KEYS.PREMIUM,

  ...PREMIUM_EFFECT_RULES,
};

export const TRUST_PAYMENTS_SHOWCASE_FEATURE_RULES = {
  ...COMMON_FOUNDATION_FEATURE_RULES,

  layoutDirection: PLAN_KEYS.FREE,
  leftColumnContent: PLAN_KEYS.FREE,
  rightColumnContent: PLAN_KEYS.FREE,

  reviewLabel: PLAN_KEYS.FREE,
  reviewText: PLAN_KEYS.FREE,
  reviewLink: PLAN_KEYS.FREE,
  trustChips: PLAN_KEYS.FREE,
  trustItems: PLAN_KEYS.FREE,
  trustItemLinks: PLAN_KEYS.FREE,

  paymentHeading: PLAN_KEYS.FREE,
  paymentIcons: PLAN_KEYS.FREE,
  paymentIconLinks: PLAN_KEYS.FREE,
  deliveryHeading: PLAN_KEYS.FREE,
  deliveryIcons: PLAN_KEYS.FREE,
  deliveryIconLinks: PLAN_KEYS.FREE,

  iconSize: PLAN_KEYS.FREE,
  iconCardSize: PLAN_KEYS.FREE,
  cardRadius: PLAN_KEYS.FREE,
  chipRadius: PLAN_KEYS.FREE,

  ...STANDARD_VISUAL_UPGRADE_RULES,

  customIconsUpload: PLAN_KEYS.STANDARD,
  paymentStyleVariants: PLAN_KEYS.STANDARD,
  deliveryStyleVariants: PLAN_KEYS.STANDARD,
  socialIcons: PLAN_KEYS.STANDARD,
  socialLinks: PLAN_KEYS.STANDARD,
  reviewBadgeStyle: PLAN_KEYS.STANDARD,
  splitLayoutRatio: PLAN_KEYS.STANDARD,

  premiumPaymentPresets: PLAN_KEYS.PREMIUM,
  premiumDeliveryPresets: PLAN_KEYS.PREMIUM,
  luxuryGlassCards: PLAN_KEYS.PREMIUM,

  ...PREMIUM_EFFECT_RULES,
};

export const VIDEO_SHOWCASE_FEATURE_RULES = {
  ...COMMON_FOUNDATION_FEATURE_RULES,

  videoCards: PLAN_KEYS.FREE,
  videoUpload: PLAN_KEYS.FREE,
  posterImage: PLAN_KEYS.FREE,
  cardTitle: PLAN_KEYS.FREE,
  cardSubtitle: PLAN_KEYS.FREE,
  cardButton: PLAN_KEYS.FREE,
  cardButtonLink: PLAN_KEYS.FREE,
  cardBackgroundColor: PLAN_KEYS.FREE,
  overlayOpacity: PLAN_KEYS.FREE,
  cardRadius: PLAN_KEYS.FREE,
  videoAspectRatio: PLAN_KEYS.FREE,

  ...STANDARD_VISUAL_UPGRADE_RULES,

  videoCardCountExtended: PLAN_KEYS.STANDARD,
  activeCardScale: PLAN_KEYS.STANDARD,
  inactiveCardOpacity: PLAN_KEYS.STANDARD,
  carouselSpacing: PLAN_KEYS.STANDARD,
  customPosterUpload: PLAN_KEYS.STANDARD,
  cardShadowStyle: PLAN_KEYS.STANDARD,

  autoplayPreview: PLAN_KEYS.PREMIUM,
  spotlightAnimation: PLAN_KEYS.PREMIUM,
  luxuryCarouselMotion: PLAN_KEYS.PREMIUM,
  activeGlowEffect: PLAN_KEYS.PREMIUM,

  ...PREMIUM_EFFECT_RULES,
};

export const BLOCK_FEATURE_RULES = {
  [BLOCK_KEYS.LUXE_HERO]: LUXE_HERO_FEATURE_RULES,
  [BLOCK_KEYS.TRUST_BAR]: TRUST_BAR_FEATURE_RULES,
  [BLOCK_KEYS.PREMIUM_FEATURES]: PREMIUM_FEATURES_FEATURE_RULES,
  [BLOCK_KEYS.TRUST_PAYMENTS_SHOWCASE]: TRUST_PAYMENTS_SHOWCASE_FEATURE_RULES,
  [BLOCK_KEYS.VIDEO_SHOWCASE]: VIDEO_SHOWCASE_FEATURE_RULES,
};

export function isPlanAtLeast(currentPlan, requiredPlan) {
  return PLAN_ORDER.indexOf(currentPlan) >= PLAN_ORDER.indexOf(requiredPlan);
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