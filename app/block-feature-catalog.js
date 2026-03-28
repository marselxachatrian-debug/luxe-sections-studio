import { BLOCK_KEYS } from "./plan-rules";

function toTitleCase(value) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}

function normalizeFeature(feature) {
  if (typeof feature === "string") {
    return {
      key: feature,
      label: toTitleCase(feature),
    };
  }

  return {
    key: feature.key ?? feature.id ?? feature.name,
    label:
      feature.label ??
      feature.title ??
      toTitleCase(feature.key ?? feature.id ?? feature.name ?? "Feature"),
  };
}

const COMMON_FOUNDATION_FEATURES = [
  { key: "heading", label: "Heading" },
  { key: "subheading", label: "Subheading" },

  { key: "textColor", label: "Text color" },
  { key: "subtextColor", label: "Subtext color" },
  { key: "headingColor", label: "Heading color" },
  { key: "backgroundColor", label: "Background color" },
  { key: "surfaceColor", label: "Surface color" },
  { key: "cardBackgroundColor", label: "Card background color" },
  { key: "borderColor", label: "Border color" },
  { key: "accentColor", label: "Accent color" },
  { key: "overlayColor", label: "Overlay color" },
  { key: "iconColor", label: "Icon color" },
  { key: "iconBackgroundColor", label: "Icon background color" },
  { key: "buttonColor", label: "Primary button color" },
  { key: "buttonTextColor", label: "Primary button text color" },
  { key: "secondaryButtonColor", label: "Secondary button color" },
  { key: "secondaryButtonTextColor", label: "Secondary button text color" },

  { key: "borderRadius", label: "Border radius" },
  { key: "sectionStyle", label: "Section style" },

  { key: "paddingTop", label: "Top padding" },
  { key: "paddingBottom", label: "Bottom padding" },
  { key: "mobilePaddingTop", label: "Mobile top padding" },
  { key: "mobilePaddingBottom", label: "Mobile bottom padding" },

  { key: "mobileLayout", label: "Mobile layout" },
  { key: "mobileSpacing", label: "Mobile spacing" },
  { key: "desktopSpacing", label: "Desktop spacing" },

  { key: "headingFontSize", label: "Heading font size" },
  { key: "subheadingFontSize", label: "Subheading font size" },
  { key: "bodyFontSize", label: "Body font size" },
];

const STANDARD_VISUAL_UPGRADE_FEATURES = [
  { key: "contentAlignment", label: "Content alignment" },
  { key: "headingAlignment", label: "Heading alignment" },
  { key: "desktopColumns", label: "Desktop columns" },
  { key: "cardStyle", label: "Card style" },
  { key: "borderWidth", label: "Border width" },
  { key: "shadowStyle", label: "Shadow style" },
  { key: "fontFamily", label: "Font family" },
  { key: "fontWeight", label: "Font weight" },
  { key: "letterSpacing", label: "Letter spacing" },
  { key: "buttonStyle", label: "Button style" },
  { key: "itemGap", label: "Item gap" },
  { key: "sectionMaxWidth", label: "Section max width" },
];

const PREMIUM_EFFECT_FEATURES = [
  { key: "glowEffects", label: "Glow effects" },
  { key: "advancedAnimations", label: "Advanced animations" },
  { key: "hoverEffects", label: "Hover effects" },
  { key: "animatedBorder", label: "Animated border" },
  { key: "shimmerEffects", label: "Shimmer effects" },
  { key: "mouseFollowEffect", label: "Mouse follow effect" },
  { key: "premiumMotion", label: "Premium motion" },
];

export const LUXE_HERO_FEATURES = [
  ...COMMON_FOUNDATION_FEATURES,
  { key: "backgroundImage", label: "Background image" },
  { key: "primaryButton", label: "Primary button" },
  { key: "primaryButtonLink", label: "Primary button link" },
  { key: "secondaryButton", label: "Secondary button" },
  { key: "secondaryButtonLink", label: "Secondary button link" },
  { key: "overlayOpacity", label: "Overlay opacity" },
  { key: "desktopSectionHeight", label: "Desktop section height" },
  { key: "mobileSectionHeight", label: "Mobile section height" },
  { key: "backgroundFallbackColor", label: "Fallback background color" },

  ...STANDARD_VISUAL_UPGRADE_FEATURES,
  { key: "secondaryButtonStyle", label: "Secondary button style" },
  { key: "heroContentWidth", label: "Hero content width" },

  { key: "videoBackground", label: "Background video" },
  { key: "layeredBackgroundEffects", label: "Layered background effects" },
  { key: "premiumHeroPresets", label: "Premium hero presets" },

  ...PREMIUM_EFFECT_FEATURES,
].map(normalizeFeature);

export const TRUST_BAR_FEATURES = [
  ...COMMON_FOUNDATION_FEATURES,
  { key: "trustItems", label: "Trust items" },
  { key: "trustItemTitles", label: "Trust item titles" },
  { key: "trustItemTexts", label: "Trust item texts" },
  { key: "trustItemLinks", label: "Trust item links" },
  { key: "trustItemIcons", label: "Trust item icons" },
  { key: "iconSize", label: "Icon size" },
  { key: "cardRadius", label: "Card radius" },

  ...STANDARD_VISUAL_UPGRADE_FEATURES,
  { key: "customIconsUpload", label: "Custom icon upload" },
  { key: "trustItemCountExtended", label: "Extended trust items count" },
  { key: "iconContainerStyle", label: "Icon container style" },
  { key: "chipStyle", label: "Chip style" },

  { key: "premiumIconSets", label: "Premium icon sets" },
  { key: "luxuryCardPresets", label: "Luxury card presets" },

  ...PREMIUM_EFFECT_FEATURES,
].map(normalizeFeature);

export const PREMIUM_FEATURES_FEATURES = [
  ...COMMON_FOUNDATION_FEATURES,
  { key: "featureCards", label: "Feature cards" },
  { key: "featureCardTitles", label: "Feature card titles" },
  { key: "featureCardTexts", label: "Feature card texts" },
  { key: "featureCardLinks", label: "Feature card links" },
  { key: "featureCardIcons", label: "Feature card icons" },
  { key: "iconSize", label: "Icon size" },
  { key: "cardRadius", label: "Card radius" },

  ...STANDARD_VISUAL_UPGRADE_FEATURES,
  { key: "customIconsUpload", label: "Custom icon upload" },
  { key: "featureCardCountExtended", label: "Extended feature cards count" },
  { key: "iconContainerStyle", label: "Icon container style" },
  { key: "cardMediaSupport", label: "Card media support" },

  { key: "premiumIconSets", label: "Premium icon sets" },
  { key: "spotlightCardStyle", label: "Spotlight card style" },

  ...PREMIUM_EFFECT_FEATURES,
].map(normalizeFeature);

export const TRUST_PAYMENTS_SHOWCASE_FEATURES = [
  ...COMMON_FOUNDATION_FEATURES,
  { key: "layoutDirection", label: "Layout direction" },
  { key: "leftColumnContent", label: "Left column content" },
  { key: "rightColumnContent", label: "Right column content" },

  { key: "reviewLabel", label: "Review label" },
  { key: "reviewText", label: "Review text" },
  { key: "reviewLink", label: "Review link" },
  { key: "trustChips", label: "Trust chips" },
  { key: "trustItems", label: "Trust items" },
  { key: "trustItemLinks", label: "Trust item links" },

  { key: "paymentHeading", label: "Payment heading" },
  { key: "paymentIcons", label: "Payment icons" },
  { key: "paymentIconLinks", label: "Payment icon links" },
  { key: "deliveryHeading", label: "Delivery heading" },
  { key: "deliveryIcons", label: "Delivery icons" },
  { key: "deliveryIconLinks", label: "Delivery icon links" },

  { key: "iconSize", label: "Icon size" },
  { key: "iconCardSize", label: "Icon card size" },
  { key: "cardRadius", label: "Card radius" },
  { key: "chipRadius", label: "Chip radius" },

  ...STANDARD_VISUAL_UPGRADE_FEATURES,
  { key: "customIconsUpload", label: "Custom icon upload" },
  { key: "paymentStyleVariants", label: "Payment style variants" },
  { key: "deliveryStyleVariants", label: "Delivery style variants" },
  { key: "socialIcons", label: "Social icons" },
  { key: "socialLinks", label: "Social links" },
  { key: "reviewBadgeStyle", label: "Review badge style" },
  { key: "splitLayoutRatio", label: "Split layout ratio" },

  { key: "premiumPaymentPresets", label: "Premium payment presets" },
  { key: "premiumDeliveryPresets", label: "Premium delivery presets" },
  { key: "luxuryGlassCards", label: "Luxury glass cards" },

  ...PREMIUM_EFFECT_FEATURES,
].map(normalizeFeature);

export const VIDEO_SHOWCASE_FEATURES = [
  ...COMMON_FOUNDATION_FEATURES,
  { key: "videoCards", label: "Video cards" },
  { key: "videoUpload", label: "Video upload" },
  { key: "posterImage", label: "Poster image" },
  { key: "cardTitle", label: "Card title" },
  { key: "cardSubtitle", label: "Card subtitle" },
  { key: "cardButton", label: "Card button" },
  { key: "cardButtonLink", label: "Card button link" },
  { key: "cardBackgroundColor", label: "Card background color" },
  { key: "overlayOpacity", label: "Overlay opacity" },
  { key: "cardRadius", label: "Card radius" },
  { key: "videoAspectRatio", label: "Video aspect ratio" },

  ...STANDARD_VISUAL_UPGRADE_FEATURES,
  { key: "videoCardCountExtended", label: "Extended video cards count" },
  { key: "activeCardScale", label: "Active card scale" },
  { key: "inactiveCardOpacity", label: "Inactive card opacity" },
  { key: "carouselSpacing", label: "Carousel spacing" },
  { key: "customPosterUpload", label: "Custom poster upload" },
  { key: "cardShadowStyle", label: "Card shadow style" },

  { key: "autoplayPreview", label: "Autoplay preview" },
  { key: "spotlightAnimation", label: "Spotlight animation" },
  { key: "luxuryCarouselMotion", label: "Luxury carousel motion" },
  { key: "activeGlowEffect", label: "Active glow effect" },

  ...PREMIUM_EFFECT_FEATURES,
].map(normalizeFeature);

export const BLOCK_FEATURE_CATALOG = {
  [BLOCK_KEYS.LUXE_HERO]: LUXE_HERO_FEATURES,
  [BLOCK_KEYS.TRUST_BAR]: TRUST_BAR_FEATURES,
  [BLOCK_KEYS.PREMIUM_FEATURES]: PREMIUM_FEATURES_FEATURES,
  [BLOCK_KEYS.TRUST_PAYMENTS_SHOWCASE]: TRUST_PAYMENTS_SHOWCASE_FEATURES,
  [BLOCK_KEYS.VIDEO_SHOWCASE]: VIDEO_SHOWCASE_FEATURES,
};

export function getBlockFeatureCatalog(blockKey) {
  return BLOCK_FEATURE_CATALOG[blockKey] ?? [];
}