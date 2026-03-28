import { BLOCK_KEYS } from "./plan-rules";
import { LUXE_HERO_FEATURES } from "./luxe-hero-features";

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

export const TRUST_BAR_FEATURES = [
  { key: "heading", label: "Heading" },
  { key: "trustItems", label: "Trust items" },
  { key: "headingAlignment", label: "Heading alignment" },
  { key: "sectionStyle", label: "Section style" },
  { key: "desktopColumns", label: "Desktop columns" },
  { key: "paddingTop", label: "Top padding" },
  { key: "paddingBottom", label: "Bottom padding" },
];

export const PREMIUM_FEATURES_FEATURES = [
  { key: "heading", label: "Heading" },
  { key: "subheading", label: "Subheading" },
  { key: "featureCards", label: "Four feature cards" },
  { key: "sectionStyle", label: "Section style" },
  { key: "headingAlignment", label: "Heading alignment" },
  { key: "desktopColumns", label: "Desktop columns" },
  { key: "paddingTop", label: "Top padding" },
  { key: "paddingBottom", label: "Bottom padding" },
  { key: "featureCardIcons", label: "Feature card icons" },
];

export const BLOCK_FEATURE_CATALOG = {
  [BLOCK_KEYS.LUXE_HERO]: LUXE_HERO_FEATURES.map(normalizeFeature),
  [BLOCK_KEYS.TRUST_BAR]: TRUST_BAR_FEATURES,
  [BLOCK_KEYS.PREMIUM_FEATURES]: PREMIUM_FEATURES_FEATURES,
};

export function getBlockFeatureCatalog(blockKey) {
  return BLOCK_FEATURE_CATALOG[blockKey] ?? [];
}