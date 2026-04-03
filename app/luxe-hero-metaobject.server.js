export const LEGACY_LUXE_HERO_METAOBJECT_TYPE = "luxe_hero_content";
export const LEGACY_LUXE_HERO_METAOBJECT_HANDLE = "default";

export const LUXE_HERO_CONTENT_METAOBJECT_TYPE = "luxe_hero_content_main";
export const LUXE_HERO_CONTENT_METAOBJECT_HANDLE = "default";

export const LUXE_HERO_STYLE_METAOBJECT_TYPE = "luxe_hero_content_style";
export const LUXE_HERO_STYLE_METAOBJECT_HANDLE = "default";

export const LUXE_HERO_DEFAULTS = {
  badgeText: "Premium storefront",
  heading: "A cleaner, sharper first impression for your Shopify store",
  subheading:
    "Show a stronger brand message, clear value, and a more premium visual style without needing to touch code.",

  textColor: "#ffffff",
  subtextColor: "rgba(255,255,255,0.84)",
  headingColor: "#ffffff",
  backgroundColor: "#0f172a",
  surfaceColor: "rgba(255,255,255,0.06)",
  cardBackgroundColor: "rgba(255,255,255,0.08)",
  borderColor: "rgba(255,255,255,0.22)",
  accentColor: "#f8e7b0",
  overlayColor: "#0f172a",
  iconColor: "#1f2937",
  iconBackgroundColor: "rgba(248, 231, 176, 0.16)",

  primaryButtonColor: "#f8e7b0",
  primaryButtonTextColor: "#1f2937",
  secondaryButtonColor: "rgba(255,255,255,0.08)",
  secondaryButtonTextColor: "#ffffff",

  borderRadius: 28,
  sectionStyle: "luxe",

  paddingTop: 56,
  paddingBottom: 56,
  mobilePaddingTop: 40,
  mobilePaddingBottom: 40,

  mobileLayout: "stack",
  mobileSpacing: 14,
  desktopSpacing: 28,

  headingFontSize: 54,
  subheadingFontSize: 17,
  bodyFontSize: 17,

  backgroundImage: "",
  primaryButtonLabel: "Shop the collection",
  primaryButtonLink: "",
  secondaryButtonLabel: "Learn more",
  secondaryButtonLink: "",

  overlayOpacity: 34,
  desktopHeight: 560,
  mobileHeight: 460,
  backgroundFallbackColor: "#182235",

  contentAlignment: "left",
  headingAlignment: "left",
  desktopColumns: "1",

  cardStyle: "soft",
  borderWidth: 1,
  shadowStyle: "soft",

  fontFamily: "inherit",
  fontWeight: "700",
  letterSpacing: 0,

  buttonStyle: "solid",
  itemGap: 14,
  sectionMaxWidth: 1200,
  secondaryButtonStyle: "outline",
  heroContentWidth: 620,

  backgroundVideo: "",
  backgroundPreset: "midnight",
  layeredBackgroundEffects: "enabled",
  glowEffects: "enabled",
  advancedAnimations: "disabled",
  hoverEffects: "disabled",
  animatedBorder: "disabled",
  shimmerEffects: "disabled",
  mouseFollowEffect: "disabled",
  premiumMotion: "disabled",
};

const ALIGNMENT_VALUES = ["left", "center", "right"];
const SECTION_STYLE_VALUES = ["minimal", "soft", "luxe"];
const MOBILE_LAYOUT_VALUES = ["stack", "inline"];
const DESKTOP_COLUMNS_VALUES = ["1", "2", "3"];
const CARD_STYLE_VALUES = ["solid", "soft", "glass", "outline"];
const SHADOW_STYLE_VALUES = ["none", "soft", "medium", "strong"];
const FONT_FAMILY_VALUES = ["inherit", "sans", "serif", "display"];
const FONT_WEIGHT_VALUES = ["500", "600", "700", "800"];
const BUTTON_STYLE_VALUES = ["solid", "outline", "soft"];
const TOGGLE_VALUES = ["enabled", "disabled"];
const BACKGROUND_PRESET_VALUES = ["midnight", "champagne", "charcoal"];

const PRIMARY_FIELD_CONFIGS = [
  {
    settingKey: "badgeText",
    name: "Badge text",
    key: "badge_text",
    type: "single_line_text_field",
  },
  {
    settingKey: "heading",
    name: "Heading",
    key: "heading",
    type: "multi_line_text_field",
  },
  {
    settingKey: "subheading",
    name: "Subheading",
    key: "subheading",
    type: "multi_line_text_field",
  },
  {
    settingKey: "textColor",
    name: "Text color",
    key: "text_color",
    type: "single_line_text_field",
  },
  {
    settingKey: "subtextColor",
    name: "Subtext color",
    key: "subtext_color",
    type: "single_line_text_field",
  },
  {
    settingKey: "headingColor",
    name: "Heading color",
    key: "heading_color",
    type: "single_line_text_field",
  },
  {
    settingKey: "backgroundColor",
    name: "Background color",
    key: "background_color",
    type: "single_line_text_field",
  },
  {
    settingKey: "surfaceColor",
    name: "Surface color",
    key: "surface_color",
    type: "single_line_text_field",
  },
  {
    settingKey: "cardBackgroundColor",
    name: "Card background color",
    key: "card_background_color",
    type: "single_line_text_field",
  },
  {
    settingKey: "borderColor",
    name: "Border color",
    key: "border_color",
    type: "single_line_text_field",
  },
  {
    settingKey: "accentColor",
    name: "Accent color",
    key: "accent_color",
    type: "single_line_text_field",
  },
  {
    settingKey: "overlayColor",
    name: "Overlay color",
    key: "overlay_color",
    type: "single_line_text_field",
  },
  {
    settingKey: "iconColor",
    name: "Icon color",
    key: "icon_color",
    type: "single_line_text_field",
  },
  {
    settingKey: "iconBackgroundColor",
    name: "Icon background color",
    key: "icon_background_color",
    type: "single_line_text_field",
  },
  {
    settingKey: "primaryButtonColor",
    name: "Primary button color",
    key: "primary_button_color",
    type: "single_line_text_field",
  },
  {
    settingKey: "primaryButtonTextColor",
    name: "Primary button text color",
    key: "primary_button_text_color",
    type: "single_line_text_field",
  },
  {
    settingKey: "secondaryButtonColor",
    name: "Secondary button color",
    key: "secondary_button_color",
    type: "single_line_text_field",
  },
  {
    settingKey: "secondaryButtonTextColor",
    name: "Secondary button text color",
    key: "secondary_button_text_color",
    type: "single_line_text_field",
  },
  {
    settingKey: "borderRadius",
    name: "Border radius",
    key: "border_radius",
    type: "number_integer",
  },
  {
    settingKey: "sectionStyle",
    name: "Section style",
    key: "section_style",
    type: "single_line_text_field",
  },
  {
    settingKey: "paddingTop",
    name: "Top padding",
    key: "padding_top",
    type: "number_integer",
  },
  {
    settingKey: "paddingBottom",
    name: "Bottom padding",
    key: "padding_bottom",
    type: "number_integer",
  },
  {
    settingKey: "mobilePaddingTop",
    name: "Mobile top padding",
    key: "mobile_padding_top",
    type: "number_integer",
  },
  {
    settingKey: "mobilePaddingBottom",
    name: "Mobile bottom padding",
    key: "mobile_padding_bottom",
    type: "number_integer",
  },
  {
    settingKey: "mobileLayout",
    name: "Mobile layout",
    key: "mobile_layout",
    type: "single_line_text_field",
  },
  {
    settingKey: "mobileSpacing",
    name: "Mobile spacing",
    key: "mobile_spacing",
    type: "number_integer",
  },
  {
    settingKey: "desktopSpacing",
    name: "Desktop spacing",
    key: "desktop_spacing",
    type: "number_integer",
  },
  {
    settingKey: "headingFontSize",
    name: "Heading font size",
    key: "heading_font_size",
    type: "number_integer",
  },
  {
    settingKey: "subheadingFontSize",
    name: "Subheading font size",
    key: "subheading_font_size",
    type: "number_integer",
  },
  {
    settingKey: "bodyFontSize",
    name: "Body font size",
    key: "body_font_size",
    type: "number_integer",
  },
  {
    settingKey: "backgroundImage",
    name: "Background image",
    key: "background_image",
    type: "single_line_text_field",
  },
  {
    settingKey: "primaryButtonLabel",
    name: "Primary button label",
    key: "primary_button_label",
    type: "single_line_text_field",
  },
  {
    settingKey: "primaryButtonLink",
    name: "Primary button link",
    key: "primary_button_link",
    type: "single_line_text_field",
  },
  {
    settingKey: "secondaryButtonLabel",
    name: "Secondary button label",
    key: "secondary_button_label",
    type: "single_line_text_field",
  },
  {
    settingKey: "secondaryButtonLink",
    name: "Secondary button link",
    key: "secondary_button_link",
    type: "single_line_text_field",
  },
  {
    settingKey: "overlayOpacity",
    name: "Overlay opacity",
    key: "overlay_opacity",
    type: "number_integer",
  },
];

const SECONDARY_FIELD_CONFIGS = [
  {
    settingKey: "desktopHeight",
    name: "Desktop height",
    key: "desktop_height",
    type: "number_integer",
  },
  {
    settingKey: "mobileHeight",
    name: "Mobile height",
    key: "mobile_height",
    type: "number_integer",
  },
  {
    settingKey: "backgroundFallbackColor",
    name: "Background fallback color",
    key: "background_fallback_color",
    type: "single_line_text_field",
  },
  {
    settingKey: "contentAlignment",
    name: "Content alignment",
    key: "content_alignment",
    type: "single_line_text_field",
  },
  {
    settingKey: "headingAlignment",
    name: "Heading alignment",
    key: "heading_alignment",
    type: "single_line_text_field",
  },
  {
    settingKey: "desktopColumns",
    name: "Desktop columns",
    key: "desktop_columns",
    type: "single_line_text_field",
  },
  {
    settingKey: "cardStyle",
    name: "Card style",
    key: "card_style",
    type: "single_line_text_field",
  },
  {
    settingKey: "borderWidth",
    name: "Border width",
    key: "border_width",
    type: "number_integer",
  },
  {
    settingKey: "shadowStyle",
    name: "Shadow style",
    key: "shadow_style",
    type: "single_line_text_field",
  },
  {
    settingKey: "fontFamily",
    name: "Font family",
    key: "font_family",
    type: "single_line_text_field",
  },
  {
    settingKey: "fontWeight",
    name: "Font weight",
    key: "font_weight",
    type: "single_line_text_field",
  },
  {
    settingKey: "letterSpacing",
    name: "Letter spacing",
    key: "letter_spacing",
    type: "number_integer",
  },
  {
    settingKey: "buttonStyle",
    name: "Button style",
    key: "button_style",
    type: "single_line_text_field",
  },
  {
    settingKey: "itemGap",
    name: "Item gap",
    key: "item_gap",
    type: "number_integer",
  },
  {
    settingKey: "sectionMaxWidth",
    name: "Section max width",
    key: "section_max_width",
    type: "number_integer",
  },
  {
    settingKey: "secondaryButtonStyle",
    name: "Secondary button style",
    key: "secondary_button_style",
    type: "single_line_text_field",
  },
  {
    settingKey: "heroContentWidth",
    name: "Hero content width",
    key: "hero_content_width",
    type: "number_integer",
  },
  {
    settingKey: "backgroundVideo",
    name: "Background video",
    key: "background_video",
    type: "single_line_text_field",
  },
  {
    settingKey: "backgroundPreset",
    name: "Background preset",
    key: "background_preset",
    type: "single_line_text_field",
  },
  {
    settingKey: "layeredBackgroundEffects",
    name: "Layered background effects",
    key: "layered_background_effects",
    type: "single_line_text_field",
  },
  {
    settingKey: "glowEffects",
    name: "Glow effects",
    key: "glow_effects",
    type: "single_line_text_field",
  },
  {
    settingKey: "advancedAnimations",
    name: "Advanced animations",
    key: "advanced_animations",
    type: "single_line_text_field",
  },
  {
    settingKey: "hoverEffects",
    name: "Hover effects",
    key: "hover_effects",
    type: "single_line_text_field",
  },
  {
    settingKey: "animatedBorder",
    name: "Animated border",
    key: "animated_border",
    type: "single_line_text_field",
  },
  {
    settingKey: "shimmerEffects",
    name: "Shimmer effects",
    key: "shimmer_effects",
    type: "single_line_text_field",
  },
  {
    settingKey: "mouseFollowEffect",
    name: "Mouse follow effect",
    key: "mouse_follow_effect",
    type: "single_line_text_field",
  },
  {
    settingKey: "premiumMotion",
    name: "Premium motion",
    key: "premium_motion",
    type: "single_line_text_field",
  },
];

const ALL_FIELD_CONFIGS = [
  ...PRIMARY_FIELD_CONFIGS,
  ...SECONDARY_FIELD_CONFIGS,
];

function clampNumber(value, min, max, fallback) {
  const parsed = Number.parseInt(String(value ?? ""), 10);

  if (Number.isNaN(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(parsed, min), max);
}

function normalizeText(value, fallback) {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function normalizeChoice(value, allowedValues, fallback) {
  const normalizedValue = String(value ?? "");
  return allowedValues.includes(normalizedValue) ? normalizedValue : fallback;
}

function normalizeToggle(value, fallback) {
  return normalizeChoice(value, TOGGLE_VALUES, fallback);
}

export function normalizeLuxeHeroSettings(input = {}) {
  return {
    badgeText: normalizeText(input.badgeText, LUXE_HERO_DEFAULTS.badgeText),
    heading: normalizeText(input.heading, LUXE_HERO_DEFAULTS.heading),
    subheading: normalizeText(input.subheading, LUXE_HERO_DEFAULTS.subheading),

    textColor: normalizeText(input.textColor, LUXE_HERO_DEFAULTS.textColor),
    subtextColor: normalizeText(
      input.subtextColor,
      LUXE_HERO_DEFAULTS.subtextColor,
    ),
    headingColor: normalizeText(
      input.headingColor,
      LUXE_HERO_DEFAULTS.headingColor,
    ),
    backgroundColor: normalizeText(
      input.backgroundColor,
      LUXE_HERO_DEFAULTS.backgroundColor,
    ),
    surfaceColor: normalizeText(
      input.surfaceColor,
      LUXE_HERO_DEFAULTS.surfaceColor,
    ),
    cardBackgroundColor: normalizeText(
      input.cardBackgroundColor,
      LUXE_HERO_DEFAULTS.cardBackgroundColor,
    ),
    borderColor: normalizeText(
      input.borderColor,
      LUXE_HERO_DEFAULTS.borderColor,
    ),
    accentColor: normalizeText(
      input.accentColor,
      LUXE_HERO_DEFAULTS.accentColor,
    ),
    overlayColor: normalizeText(
      input.overlayColor,
      LUXE_HERO_DEFAULTS.overlayColor,
    ),
    iconColor: normalizeText(input.iconColor, LUXE_HERO_DEFAULTS.iconColor),
    iconBackgroundColor: normalizeText(
      input.iconBackgroundColor,
      LUXE_HERO_DEFAULTS.iconBackgroundColor,
    ),

    primaryButtonColor: normalizeText(
      input.primaryButtonColor,
      LUXE_HERO_DEFAULTS.primaryButtonColor,
    ),
    primaryButtonTextColor: normalizeText(
      input.primaryButtonTextColor,
      LUXE_HERO_DEFAULTS.primaryButtonTextColor,
    ),
    secondaryButtonColor: normalizeText(
      input.secondaryButtonColor,
      LUXE_HERO_DEFAULTS.secondaryButtonColor,
    ),
    secondaryButtonTextColor: normalizeText(
      input.secondaryButtonTextColor,
      LUXE_HERO_DEFAULTS.secondaryButtonTextColor,
    ),

    borderRadius: clampNumber(
      input.borderRadius,
      0,
      48,
      LUXE_HERO_DEFAULTS.borderRadius,
    ),
    sectionStyle: normalizeChoice(
      input.sectionStyle,
      SECTION_STYLE_VALUES,
      LUXE_HERO_DEFAULTS.sectionStyle,
    ),

    paddingTop: clampNumber(
      input.paddingTop,
      0,
      200,
      LUXE_HERO_DEFAULTS.paddingTop,
    ),
    paddingBottom: clampNumber(
      input.paddingBottom,
      0,
      200,
      LUXE_HERO_DEFAULTS.paddingBottom,
    ),
    mobilePaddingTop: clampNumber(
      input.mobilePaddingTop,
      0,
      200,
      LUXE_HERO_DEFAULTS.mobilePaddingTop,
    ),
    mobilePaddingBottom: clampNumber(
      input.mobilePaddingBottom,
      0,
      200,
      LUXE_HERO_DEFAULTS.mobilePaddingBottom,
    ),

    mobileLayout: normalizeChoice(
      input.mobileLayout,
      MOBILE_LAYOUT_VALUES,
      LUXE_HERO_DEFAULTS.mobileLayout,
    ),
    mobileSpacing: clampNumber(
      input.mobileSpacing,
      0,
      80,
      LUXE_HERO_DEFAULTS.mobileSpacing,
    ),
    desktopSpacing: clampNumber(
      input.desktopSpacing,
      0,
      120,
      LUXE_HERO_DEFAULTS.desktopSpacing,
    ),

    headingFontSize: clampNumber(
      input.headingFontSize,
      18,
      120,
      LUXE_HERO_DEFAULTS.headingFontSize,
    ),
    subheadingFontSize: clampNumber(
      input.subheadingFontSize,
      10,
      48,
      LUXE_HERO_DEFAULTS.subheadingFontSize,
    ),
    bodyFontSize: clampNumber(
      input.bodyFontSize,
      10,
      40,
      LUXE_HERO_DEFAULTS.bodyFontSize,
    ),

    backgroundImage: normalizeText(
      input.backgroundImage,
      LUXE_HERO_DEFAULTS.backgroundImage,
    ),
    primaryButtonLabel: normalizeText(
      input.primaryButtonLabel,
      LUXE_HERO_DEFAULTS.primaryButtonLabel,
    ),
    primaryButtonLink: normalizeText(
      input.primaryButtonLink,
      LUXE_HERO_DEFAULTS.primaryButtonLink,
    ),
    secondaryButtonLabel: normalizeText(
      input.secondaryButtonLabel,
      LUXE_HERO_DEFAULTS.secondaryButtonLabel,
    ),
    secondaryButtonLink: normalizeText(
      input.secondaryButtonLink,
      LUXE_HERO_DEFAULTS.secondaryButtonLink,
    ),

    overlayOpacity: clampNumber(
      input.overlayOpacity,
      0,
      100,
      LUXE_HERO_DEFAULTS.overlayOpacity,
    ),
    desktopHeight: clampNumber(
      input.desktopHeight,
      320,
      1200,
      LUXE_HERO_DEFAULTS.desktopHeight,
    ),
    mobileHeight: clampNumber(
      input.mobileHeight,
      240,
      900,
      LUXE_HERO_DEFAULTS.mobileHeight,
    ),
    backgroundFallbackColor: normalizeText(
      input.backgroundFallbackColor,
      LUXE_HERO_DEFAULTS.backgroundFallbackColor,
    ),

    contentAlignment: normalizeChoice(
      input.contentAlignment,
      ALIGNMENT_VALUES,
      LUXE_HERO_DEFAULTS.contentAlignment,
    ),
    headingAlignment: normalizeChoice(
      input.headingAlignment,
      ALIGNMENT_VALUES,
      LUXE_HERO_DEFAULTS.headingAlignment,
    ),
    desktopColumns: normalizeChoice(
      input.desktopColumns,
      DESKTOP_COLUMNS_VALUES,
      LUXE_HERO_DEFAULTS.desktopColumns,
    ),

    cardStyle: normalizeChoice(
      input.cardStyle,
      CARD_STYLE_VALUES,
      LUXE_HERO_DEFAULTS.cardStyle,
    ),
    borderWidth: clampNumber(
      input.borderWidth,
      0,
      12,
      LUXE_HERO_DEFAULTS.borderWidth,
    ),
    shadowStyle: normalizeChoice(
      input.shadowStyle,
      SHADOW_STYLE_VALUES,
      LUXE_HERO_DEFAULTS.shadowStyle,
    ),
    fontFamily: normalizeChoice(
      input.fontFamily,
      FONT_FAMILY_VALUES,
      LUXE_HERO_DEFAULTS.fontFamily,
    ),
    fontWeight: normalizeChoice(
      String(input.fontWeight ?? ""),
      FONT_WEIGHT_VALUES,
      LUXE_HERO_DEFAULTS.fontWeight,
    ),
    letterSpacing: clampNumber(
      input.letterSpacing,
      -8,
      20,
      LUXE_HERO_DEFAULTS.letterSpacing,
    ),

    buttonStyle: normalizeChoice(
      input.buttonStyle,
      BUTTON_STYLE_VALUES,
      LUXE_HERO_DEFAULTS.buttonStyle,
    ),
    itemGap: clampNumber(input.itemGap, 0, 80, LUXE_HERO_DEFAULTS.itemGap),
    sectionMaxWidth: clampNumber(
      input.sectionMaxWidth,
      720,
      1800,
      LUXE_HERO_DEFAULTS.sectionMaxWidth,
    ),
    secondaryButtonStyle: normalizeChoice(
      input.secondaryButtonStyle,
      BUTTON_STYLE_VALUES,
      LUXE_HERO_DEFAULTS.secondaryButtonStyle,
    ),
    heroContentWidth: clampNumber(
      input.heroContentWidth,
      320,
      1200,
      LUXE_HERO_DEFAULTS.heroContentWidth,
    ),

    backgroundVideo: normalizeText(
      input.backgroundVideo,
      LUXE_HERO_DEFAULTS.backgroundVideo,
    ),
    backgroundPreset: normalizeChoice(
      input.backgroundPreset,
      BACKGROUND_PRESET_VALUES,
      LUXE_HERO_DEFAULTS.backgroundPreset,
    ),
    layeredBackgroundEffects: normalizeToggle(
      input.layeredBackgroundEffects,
      LUXE_HERO_DEFAULTS.layeredBackgroundEffects,
    ),
    glowEffects: normalizeToggle(
      input.glowEffects,
      LUXE_HERO_DEFAULTS.glowEffects,
    ),
    advancedAnimations: normalizeToggle(
      input.advancedAnimations,
      LUXE_HERO_DEFAULTS.advancedAnimations,
    ),
    hoverEffects: normalizeToggle(
      input.hoverEffects,
      LUXE_HERO_DEFAULTS.hoverEffects,
    ),
    animatedBorder: normalizeToggle(
      input.animatedBorder,
      LUXE_HERO_DEFAULTS.animatedBorder,
    ),
    shimmerEffects: normalizeToggle(
      input.shimmerEffects,
      LUXE_HERO_DEFAULTS.shimmerEffects,
    ),
    mouseFollowEffect: normalizeToggle(
      input.mouseFollowEffect,
      LUXE_HERO_DEFAULTS.mouseFollowEffect,
    ),
    premiumMotion: normalizeToggle(
      input.premiumMotion,
      LUXE_HERO_DEFAULTS.premiumMotion,
    ),
  };
}

function getBlockingUserErrors(errors = []) {
  return errors.filter((error) => {
    const message = String(error?.message ?? "").toLowerCase();

    return (
      !message.includes("already exists") &&
      !message.includes("taken") &&
      !message.includes("must be unique")
    );
  });
}

function configsToFieldDefinitions(configs) {
  return configs.map(({ name, key, type }) => ({
    name,
    key,
    type,
  }));
}

function serializeFieldValue(value) {
  return String(value ?? "");
}

function mapFieldValuesFromMetaobject(metaobject, configs) {
  const fieldMap = {};

  for (const field of metaobject?.fields ?? []) {
    fieldMap[field.key] = field.value;
  }

  const result = {};

  for (const config of configs) {
    result[config.settingKey] = fieldMap[config.key];
  }

  return result;
}

function mergeSettingsParts(...parts) {
  return normalizeLuxeHeroSettings(Object.assign({}, ...parts));
}

async function getMetaobjectDefinitionByType(admin, type) {
  const response = await admin.graphql(
    `#graphql
      query GetMetaobjectDefinitionByType($type: String!) {
        metaobjectDefinitionByType(type: $type) {
          id
          name
          type
          displayNameKey
          fieldDefinitions {
            key
          }
        }
      }
    `,
    {
      variables: {
        type,
      },
    },
  );

  const responseJson = await response.json();
  return responseJson.data?.metaobjectDefinitionByType ?? null;
}

async function ensureMetaobjectDefinition(admin, options) {
  const {
    type,
    name,
    displayNameKey,
    fieldDefinitions,
    storefrontAccess = "PUBLIC_READ",
  } = options;

  const existingDefinition = await getMetaobjectDefinitionByType(admin, type);

  if (!existingDefinition) {
    const response = await admin.graphql(
      `#graphql
        mutation CreateMetaobjectDefinition($definition: MetaobjectDefinitionCreateInput!) {
          metaobjectDefinitionCreate(definition: $definition) {
            metaobjectDefinition {
              id
              name
              type
              displayNameKey
              fieldDefinitions {
                key
              }
            }
            userErrors {
              field
              message
              code
            }
          }
        }
      `,
      {
        variables: {
          definition: {
            name,
            type,
            displayNameKey,
            access: {
              storefront: storefrontAccess,
            },
            fieldDefinitions,
          },
        },
      },
    );

    const responseJson = await response.json();
    const payload = responseJson.data?.metaobjectDefinitionCreate;
    const blockingErrors = getBlockingUserErrors(payload?.userErrors ?? []);

    if (blockingErrors.length > 0) {
      throw new Error(
        blockingErrors[0].message || `Failed to create definition for ${type}`,
      );
    }

    return payload?.metaobjectDefinition ?? null;
  }

  const existingFieldKeys = new Set(
    (existingDefinition.fieldDefinitions ?? []).map((field) => field.key),
  );

  const missingFieldDefinitions = fieldDefinitions.filter(
    (field) => !existingFieldKeys.has(field.key),
  );

  if (missingFieldDefinitions.length === 0) {
    return existingDefinition;
  }

  const response = await admin.graphql(
    `#graphql
      mutation UpdateMetaobjectDefinition(
        $id: ID!
        $definition: MetaobjectDefinitionUpdateInput!
      ) {
        metaobjectDefinitionUpdate(id: $id, definition: $definition) {
          metaobjectDefinition {
            id
            name
            type
            displayNameKey
            fieldDefinitions {
              key
            }
          }
          userErrors {
            field
            message
            code
          }
        }
      }
    `,
    {
      variables: {
        id: existingDefinition.id,
        definition: {
          displayNameKey,
          fieldDefinitions: missingFieldDefinitions.map((field) => ({
            create: {
              key: field.key,
              name: field.name,
              type: field.type,
            },
          })),
        },
      },
    },
  );

  const responseJson = await response.json();
  const payload = responseJson.data?.metaobjectDefinitionUpdate;
  const blockingErrors = getBlockingUserErrors(payload?.userErrors ?? []);

  if (blockingErrors.length > 0) {
    throw new Error(
      blockingErrors[0].message || `Failed to update definition for ${type}`,
    );
  }

  return payload?.metaobjectDefinition ?? existingDefinition;
}

async function getMetaobjectByHandle(admin, type, handle) {
  const response = await admin.graphql(
    `#graphql
      query GetMetaobjectByHandle($handle: MetaobjectHandleInput!) {
        metaobjectByHandle(handle: $handle) {
          id
          handle
          type
          fields {
            key
            value
          }
        }
      }
    `,
    {
      variables: {
        handle: {
          type,
          handle,
        },
      },
    },
  );

  const responseJson = await response.json();
  return responseJson.data?.metaobjectByHandle ?? null;
}

async function upsertMetaobjectByHandle(admin, type, handle, configs, settings) {
  const response = await admin.graphql(
    `#graphql
      mutation UpsertMetaobject(
        $handle: MetaobjectHandleInput!
        $metaobject: MetaobjectUpsertInput!
      ) {
        metaobjectUpsert(handle: $handle, metaobject: $metaobject) {
          metaobject {
            id
            handle
            type
            fields {
              key
              value
            }
          }
          userErrors {
            field
            message
            code
          }
        }
      }
    `,
    {
      variables: {
        handle: {
          type,
          handle,
        },
        metaobject: {
          fields: configs.map((config) => ({
            key: config.key,
            value: serializeFieldValue(settings[config.settingKey]),
          })),
        },
      },
    },
  );

  const responseJson = await response.json();
  const payload = responseJson.data?.metaobjectUpsert;
  const userErrors = payload?.userErrors ?? [];

  if (userErrors.length > 0) {
    throw new Error(userErrors[0].message || `Failed to save ${type}`);
  }

  return payload?.metaobject ?? null;
}

export async function ensureLuxeHeroDefinition(admin) {
  await ensureMetaobjectDefinition(admin, {
    type: LUXE_HERO_CONTENT_METAOBJECT_TYPE,
    name: "Luxe Hero Content",
    displayNameKey: "heading",
    fieldDefinitions: configsToFieldDefinitions(PRIMARY_FIELD_CONFIGS),
  });

  await ensureMetaobjectDefinition(admin, {
    type: LUXE_HERO_STYLE_METAOBJECT_TYPE,
    name: "Luxe Hero Style",
    displayNameKey: "background_preset",
    fieldDefinitions: configsToFieldDefinitions(SECONDARY_FIELD_CONFIGS),
  });

  return true;
}

export async function getLuxeHeroMetaobject(admin) {
  const [contentMetaobject, styleMetaobject, legacyMetaobject] =
    await Promise.all([
      getMetaobjectByHandle(
        admin,
        LUXE_HERO_CONTENT_METAOBJECT_TYPE,
        LUXE_HERO_CONTENT_METAOBJECT_HANDLE,
      ),
      getMetaobjectByHandle(
        admin,
        LUXE_HERO_STYLE_METAOBJECT_TYPE,
        LUXE_HERO_STYLE_METAOBJECT_HANDLE,
      ),
      getMetaobjectByHandle(
        admin,
        LEGACY_LUXE_HERO_METAOBJECT_TYPE,
        LEGACY_LUXE_HERO_METAOBJECT_HANDLE,
      ),
    ]);

  const hasSplitMetaobjects = Boolean(contentMetaobject || styleMetaobject);
  const hasLegacyMetaobject = Boolean(legacyMetaobject);

  if (!hasSplitMetaobjects && !hasLegacyMetaobject) {
    return null;
  }

  const legacySettingsPart =
    !hasSplitMetaobjects && hasLegacyMetaobject
      ? mapFieldValuesFromMetaobject(legacyMetaobject, ALL_FIELD_CONFIGS)
      : !contentMetaobject || !styleMetaobject
        ? mapFieldValuesFromMetaobject(legacyMetaobject, ALL_FIELD_CONFIGS)
        : {};

  const contentSettingsPart = mapFieldValuesFromMetaobject(
    contentMetaobject,
    PRIMARY_FIELD_CONFIGS,
  );

  const styleSettingsPart = mapFieldValuesFromMetaobject(
    styleMetaobject,
    SECONDARY_FIELD_CONFIGS,
  );

  return {
    id:
      contentMetaobject?.id ??
      styleMetaobject?.id ??
      legacyMetaobject?.id ??
      null,
    handle:
      contentMetaobject?.handle ??
      styleMetaobject?.handle ??
      legacyMetaobject?.handle ??
      LUXE_HERO_CONTENT_METAOBJECT_HANDLE,
    type: "luxe_hero_content_combined",
    settings: mergeSettingsParts(
      legacySettingsPart,
      contentSettingsPart,
      styleSettingsPart,
    ),
  };
}

export async function saveLuxeHeroMetaobject(admin, input) {
  await ensureLuxeHeroDefinition(admin);

  const settings = normalizeLuxeHeroSettings(input);

  const [savedContentMetaobject, savedStyleMetaobject] = await Promise.all([
    upsertMetaobjectByHandle(
      admin,
      LUXE_HERO_CONTENT_METAOBJECT_TYPE,
      LUXE_HERO_CONTENT_METAOBJECT_HANDLE,
      PRIMARY_FIELD_CONFIGS,
      settings,
    ),
    upsertMetaobjectByHandle(
      admin,
      LUXE_HERO_STYLE_METAOBJECT_TYPE,
      LUXE_HERO_STYLE_METAOBJECT_HANDLE,
      SECONDARY_FIELD_CONFIGS,
      settings,
    ),
  ]);

  return {
    id: savedContentMetaobject?.id ?? savedStyleMetaobject?.id ?? null,
    handle:
      savedContentMetaobject?.handle ??
      savedStyleMetaobject?.handle ??
      LUXE_HERO_CONTENT_METAOBJECT_HANDLE,
    type: "luxe_hero_content_combined",
    settings: mergeSettingsParts(
      mapFieldValuesFromMetaobject(savedContentMetaobject, PRIMARY_FIELD_CONFIGS),
      mapFieldValuesFromMetaobject(savedStyleMetaobject, SECONDARY_FIELD_CONFIGS),
    ),
  };
}

export async function getLuxeHeroSettings(admin) {
  const savedMetaobject = await getLuxeHeroMetaobject(admin);

  if (!savedMetaobject) {
    return LUXE_HERO_DEFAULTS;
  }

  return savedMetaobject.settings;
}