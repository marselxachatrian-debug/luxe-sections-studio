import {
  BLOCK_KEYS,
  PLAN_KEYS,
  PLAN_LABELS,
  canAccessBlockFeature,
  getBlockFeatureRequiredPlan,
} from "./plan-rules";

export const BLOCK_EDITOR_FIELD_FEATURE_MAP = {
  [BLOCK_KEYS.LUXE_HERO]: {
    badgeText: "badgeText",
    heading: "heading",
    subheading: "subheading",
    primaryButtonLabel: "primaryButton",
    secondaryButtonLabel: "secondaryButton",
    primaryButtonLink: "primaryButtonLink",
    secondaryButtonLink: "secondaryButtonLink",
    contentAlignment: "contentAlignment",
    backgroundPreset: "backgroundPreset",
    overlayOpacity: "overlayOpacity",
    desktopHeight: "desktopSectionHeight",
    mobileHeight: "mobileSectionHeight",
    paddingTop: "paddingTop",
    paddingBottom: "paddingBottom",
    mobilePaddingTop: "mobilePaddingTop",
    mobilePaddingBottom: "mobilePaddingBottom",
    backgroundImage: "backgroundImage",
    backgroundVideo: "videoBackground",
    glowEffects: "glowEffects",
    advancedAnimations: "advancedAnimations",
  },

  [BLOCK_KEYS.TRUST_BAR]: {
    heading: "heading",
    subheading: "subheading",
    itemOne: "trustItems",
    itemTwo: "trustItems",
    itemThree: "trustItems",
    itemFour: "trustItems",
    headingAlignment: "headingAlignment",
    sectionStyle: "sectionStyle",
    desktopColumns: "desktopColumns",
    topPadding: "paddingTop",
    bottomPadding: "paddingBottom",
    mobilePaddingTop: "mobilePaddingTop",
    mobilePaddingBottom: "mobilePaddingBottom",
    iconTone: "iconBackgroundColor",
    iconSize: "iconSize",
    cardRadius: "cardRadius",
    glowEffects: "glowEffects",
    hoverEffects: "hoverEffects",
  },

  [BLOCK_KEYS.PREMIUM_FEATURES]: {
    heading: "heading",
    subheading: "subheading",
    cardOneTitle: "featureCardTitles",
    cardOneText: "featureCardTexts",
    cardTwoTitle: "featureCardTitles",
    cardTwoText: "featureCardTexts",
    cardThreeTitle: "featureCardTitles",
    cardThreeText: "featureCardTexts",
    cardFourTitle: "featureCardTitles",
    cardFourText: "featureCardTexts",
    headingAlignment: "headingAlignment",
    sectionStyle: "sectionStyle",
    desktopColumns: "desktopColumns",
    topPadding: "paddingTop",
    bottomPadding: "paddingBottom",
    mobilePaddingTop: "mobilePaddingTop",
    mobilePaddingBottom: "mobilePaddingBottom",
    iconTone: "iconBackgroundColor",
    iconSize: "iconSize",
    cardRadius: "cardRadius",
    glowEffects: "glowEffects",
    hoverEffects: "hoverEffects",
  },

  [BLOCK_KEYS.TRUST_PAYMENTS_SHOWCASE]: {
    eyebrow: "reviewLabel",
    heading: "heading",
    subheading: "subheading",
    trustPointOne: "trustItems",
    trustPointTwo: "trustItems",
    trustPointThree: "trustItems",
    paymentOne: "paymentIcons",
    paymentTwo: "paymentIcons",
    paymentThree: "paymentIcons",
    paymentFour: "paymentIcons",
    contentAlignment: "contentAlignment",
    sectionStyle: "sectionStyle",
    iconTone: "iconBackgroundColor",
    topPadding: "paddingTop",
    bottomPadding: "paddingBottom",
    mobilePaddingTop: "mobilePaddingTop",
    mobilePaddingBottom: "mobilePaddingBottom",
    glowEffects: "glowEffects",
    hoverEffects: "hoverEffects",
  },

  [BLOCK_KEYS.VIDEO_SHOWCASE]: {
    eyebrow: "cardSubtitle",
    heading: "heading",
    subheading: "subheading",
    videoOneTitle: "cardTitle",
    videoOneText: "cardSubtitle",
    videoTwoTitle: "cardTitle",
    videoTwoText: "cardSubtitle",
    videoThreeTitle: "cardTitle",
    videoThreeText: "cardSubtitle",
    headingAlignment: "headingAlignment",
    sectionStyle: "sectionStyle",
    desktopColumns: "desktopColumns",
    videoTone: "cardBackgroundColor",
    topPadding: "paddingTop",
    bottomPadding: "paddingBottom",
    mobilePaddingTop: "mobilePaddingTop",
    mobilePaddingBottom: "mobilePaddingBottom",
    overlayOpacity: "overlayOpacity",
    glowEffects: "glowEffects",
    premiumMotion: "premiumMotion",
  },
};

function uniqueItems(items) {
  return [...new Set(items.filter(Boolean))];
}

function normalizeSettingsObject(settings) {
  if (!settings || typeof settings !== "object" || Array.isArray(settings)) {
    return {};
  }

  return settings;
}

export function getBlockFieldFeatureKey(blockKey, fieldName) {
  const blockMap = BLOCK_EDITOR_FIELD_FEATURE_MAP[blockKey] ?? {};
  return blockMap[fieldName] ?? null;
}

export function getFieldPlanAccess(currentPlan, blockKey, fieldName) {
  const featureKey = getBlockFieldFeatureKey(blockKey, fieldName);

  if (!featureKey) {
    return {
      fieldName,
      featureKey: null,
      requiredPlan: PLAN_KEYS.FREE,
      requiredPlanLabel: PLAN_LABELS[PLAN_KEYS.FREE],
      isAccessible: true,
      isMapped: false,
    };
  }

  const requiredPlan = getBlockFeatureRequiredPlan(blockKey, featureKey);
  const isAccessible = canAccessBlockFeature(currentPlan, blockKey, featureKey);

  return {
    fieldName,
    featureKey,
    requiredPlan,
    requiredPlanLabel: PLAN_LABELS[requiredPlan] ?? PLAN_LABELS[PLAN_KEYS.FREE],
    isAccessible,
    isMapped: true,
  };
}

export function getBlockSettingsPlanAccessMap(currentPlan, blockKey, settings) {
  const normalizedSettings = normalizeSettingsObject(settings);
  const accessMap = {};

  for (const fieldName of Object.keys(normalizedSettings)) {
    accessMap[fieldName] = getFieldPlanAccess(currentPlan, blockKey, fieldName);
  }

  return accessMap;
}

export function enforceBlockPlanSettings(currentPlan, blockKey, settings) {
  const normalizedSettings = normalizeSettingsObject(settings);
  const allowedSettings = {};
  const blockedFields = [];
  const blockedFeatures = [];
  const blockedFeatureDetails = [];
  const accessMap = {};

  for (const [fieldName, value] of Object.entries(normalizedSettings)) {
    const access = getFieldPlanAccess(currentPlan, blockKey, fieldName);

    accessMap[fieldName] = access;

    if (access.isAccessible) {
      allowedSettings[fieldName] = value;
      continue;
    }

    blockedFields.push(fieldName);

    if (access.featureKey) {
      blockedFeatures.push(access.featureKey);
      blockedFeatureDetails.push({
        fieldName,
        featureKey: access.featureKey,
        requiredPlan: access.requiredPlan,
        requiredPlanLabel: access.requiredPlanLabel,
      });
    }
  }

  return {
    allowedSettings,
    blockedFields: uniqueItems(blockedFields),
    blockedFeatures: uniqueItems(blockedFeatures),
    blockedFeatureDetails,
    accessMap,
  };
}

export function getBlockedFeatureMessages(currentPlan, blockKey, settings) {
  const result = enforceBlockPlanSettings(currentPlan, blockKey, settings);

  return result.blockedFeatureDetails.map((item) => {
    const currentPlanLabel =
      PLAN_LABELS[currentPlan] ?? PLAN_LABELS[PLAN_KEYS.FREE];

    return `${item.fieldName} requires ${item.requiredPlanLabel}. Current plan: ${currentPlanLabel}.`;
  });
}

export function hasBlockedFeatures(currentPlan, blockKey, settings) {
  const result = enforceBlockPlanSettings(currentPlan, blockKey, settings);
  return result.blockedFeatures.length > 0;
}