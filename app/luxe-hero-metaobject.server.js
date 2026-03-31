export const LUXE_HERO_METAOBJECT_TYPE = "luxe_hero_content";
export const LUXE_HERO_METAOBJECT_HANDLE = "default";

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

const LUXE_HERO_FIELD_DEFINITIONS = [
  { name: "Badge text", key: "badge_text", type: "single_line_text_field" },
  { name: "Heading", key: "heading", type: "multi_line_text_field" },
  { name: "Subheading", key: "subheading", type: "multi_line_text_field" },

  { name: "Text color", key: "text_color", type: "single_line_text_field" },
  {
    name: "Subtext color",
    key: "subtext_color",
    type: "single_line_text_field",
  },
  {
    name: "Heading color",
    key: "heading_color",
    type: "single_line_text_field",
  },
  {
    name: "Background color",
    key: "background_color",
    type: "single_line_text_field",
  },
  {
    name: "Surface color",
    key: "surface_color",
    type: "single_line_text_field",
  },
  {
    name: "Card background color",
    key: "card_background_color",
    type: "single_line_text_field",
  },
  {
    name: "Border color",
    key: "border_color",
    type: "single_line_text_field",
  },
  {
    name: "Accent color",
    key: "accent_color",
    type: "single_line_text_field",
  },
  {
    name: "Overlay color",
    key: "overlay_color",
    type: "single_line_text_field",
  },
  { name: "Icon color", key: "icon_color", type: "single_line_text_field" },
  {
    name: "Icon background color",
    key: "icon_background_color",
    type: "single_line_text_field",
  },

  {
    name: "Primary button color",
    key: "primary_button_color",
    type: "single_line_text_field",
  },
  {
    name: "Primary button text color",
    key: "primary_button_text_color",
    type: "single_line_text_field",
  },
  {
    name: "Secondary button color",
    key: "secondary_button_color",
    type: "single_line_text_field",
  },
  {
    name: "Secondary button text color",
    key: "secondary_button_text_color",
    type: "single_line_text_field",
  },

  { name: "Border radius", key: "border_radius", type: "number_integer" },
  { name: "Section style", key: "section_style", type: "single_line_text_field" },

  { name: "Top padding", key: "padding_top", type: "number_integer" },
  { name: "Bottom padding", key: "padding_bottom", type: "number_integer" },
  {
    name: "Mobile top padding",
    key: "mobile_padding_top",
    type: "number_integer",
  },
  {
    name: "Mobile bottom padding",
    key: "mobile_padding_bottom",
    type: "number_integer",
  },

  { name: "Mobile layout", key: "mobile_layout", type: "single_line_text_field" },
  { name: "Mobile spacing", key: "mobile_spacing", type: "number_integer" },
  { name: "Desktop spacing", key: "desktop_spacing", type: "number_integer" },

  {
    name: "Heading font size",
    key: "heading_font_size",
    type: "number_integer",
  },
  {
    name: "Subheading font size",
    key: "subheading_font_size",
    type: "number_integer",
  },
  { name: "Body font size", key: "body_font_size", type: "number_integer" },

  {
    name: "Background image",
    key: "background_image",
    type: "single_line_text_field",
  },
  {
    name: "Primary button label",
    key: "primary_button_label",
    type: "single_line_text_field",
  },
  {
    name: "Primary button link",
    key: "primary_button_link",
    type: "single_line_text_field",
  },
  {
    name: "Secondary button label",
    key: "secondary_button_label",
    type: "single_line_text_field",
  },
  {
    name: "Secondary button link",
    key: "secondary_button_link",
    type: "single_line_text_field",
  },

  { name: "Overlay opacity", key: "overlay_opacity", type: "number_integer" },
  { name: "Desktop height", key: "desktop_height", type: "number_integer" },
  { name: "Mobile height", key: "mobile_height", type: "number_integer" },
  {
    name: "Background fallback color",
    key: "background_fallback_color",
    type: "single_line_text_field",
  },

  {
    name: "Content alignment",
    key: "content_alignment",
    type: "single_line_text_field",
  },
  {
    name: "Heading alignment",
    key: "heading_alignment",
    type: "single_line_text_field",
  },
  {
    name: "Desktop columns",
    key: "desktop_columns",
    type: "single_line_text_field",
  },

  { name: "Card style", key: "card_style", type: "single_line_text_field" },
  { name: "Border width", key: "border_width", type: "number_integer" },
  {
    name: "Shadow style",
    key: "shadow_style",
    type: "single_line_text_field",
  },
  { name: "Font family", key: "font_family", type: "single_line_text_field" },
  { name: "Font weight", key: "font_weight", type: "single_line_text_field" },
  { name: "Letter spacing", key: "letter_spacing", type: "number_integer" },
  {
    name: "Button style",
    key: "button_style",
    type: "single_line_text_field",
  },
  { name: "Item gap", key: "item_gap", type: "number_integer" },
  {
    name: "Section max width",
    key: "section_max_width",
    type: "number_integer",
  },
  {
    name: "Secondary button style",
    key: "secondary_button_style",
    type: "single_line_text_field",
  },
  {
    name: "Hero content width",
    key: "hero_content_width",
    type: "number_integer",
  },

  {
    name: "Background video",
    key: "background_video",
    type: "single_line_text_field",
  },
  {
    name: "Background preset",
    key: "background_preset",
    type: "single_line_text_field",
  },
  {
    name: "Layered background effects",
    key: "layered_background_effects",
    type: "single_line_text_field",
  },
  { name: "Glow effects", key: "glow_effects", type: "single_line_text_field" },
  {
    name: "Advanced animations",
    key: "advanced_animations",
    type: "single_line_text_field",
  },
  {
    name: "Hover effects",
    key: "hover_effects",
    type: "single_line_text_field",
  },
  {
    name: "Animated border",
    key: "animated_border",
    type: "single_line_text_field",
  },
  {
    name: "Shimmer effects",
    key: "shimmer_effects",
    type: "single_line_text_field",
  },
  {
    name: "Mouse follow effect",
    key: "mouse_follow_effect",
    type: "single_line_text_field",
  },
  {
    name: "Premium motion",
    key: "premium_motion",
    type: "single_line_text_field",
  },
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

function mapMetaobjectFields(metaobject) {
  const fieldMap = {};

  for (const field of metaobject?.fields ?? []) {
    fieldMap[field.key] = field.value;
  }

  return normalizeLuxeHeroSettings({
    badgeText: fieldMap.badge_text,
    heading: fieldMap.heading,
    subheading: fieldMap.subheading,

    textColor: fieldMap.text_color,
    subtextColor: fieldMap.subtext_color,
    headingColor: fieldMap.heading_color,
    backgroundColor: fieldMap.background_color,
    surfaceColor: fieldMap.surface_color,
    cardBackgroundColor: fieldMap.card_background_color,
    borderColor: fieldMap.border_color,
    accentColor: fieldMap.accent_color,
    overlayColor: fieldMap.overlay_color,
    iconColor: fieldMap.icon_color,
    iconBackgroundColor: fieldMap.icon_background_color,

    primaryButtonColor: fieldMap.primary_button_color,
    primaryButtonTextColor: fieldMap.primary_button_text_color,
    secondaryButtonColor: fieldMap.secondary_button_color,
    secondaryButtonTextColor: fieldMap.secondary_button_text_color,

    borderRadius: fieldMap.border_radius,
    sectionStyle: fieldMap.section_style,

    paddingTop: fieldMap.padding_top,
    paddingBottom: fieldMap.padding_bottom,
    mobilePaddingTop: fieldMap.mobile_padding_top,
    mobilePaddingBottom: fieldMap.mobile_padding_bottom,

    mobileLayout: fieldMap.mobile_layout,
    mobileSpacing: fieldMap.mobile_spacing,
    desktopSpacing: fieldMap.desktop_spacing,

    headingFontSize: fieldMap.heading_font_size,
    subheadingFontSize: fieldMap.subheading_font_size,
    bodyFontSize: fieldMap.body_font_size,

    backgroundImage: fieldMap.background_image,
    primaryButtonLabel: fieldMap.primary_button_label,
    primaryButtonLink: fieldMap.primary_button_link,
    secondaryButtonLabel: fieldMap.secondary_button_label,
    secondaryButtonLink: fieldMap.secondary_button_link,

    overlayOpacity: fieldMap.overlay_opacity,
    desktopHeight: fieldMap.desktop_height,
    mobileHeight: fieldMap.mobile_height,
    backgroundFallbackColor: fieldMap.background_fallback_color,

    contentAlignment: fieldMap.content_alignment,
    headingAlignment: fieldMap.heading_alignment,
    desktopColumns: fieldMap.desktop_columns,

    cardStyle: fieldMap.card_style,
    borderWidth: fieldMap.border_width,
    shadowStyle: fieldMap.shadow_style,
    fontFamily: fieldMap.font_family,
    fontWeight: fieldMap.font_weight,
    letterSpacing: fieldMap.letter_spacing,

    buttonStyle: fieldMap.button_style,
    itemGap: fieldMap.item_gap,
    sectionMaxWidth: fieldMap.section_max_width,
    secondaryButtonStyle: fieldMap.secondary_button_style,
    heroContentWidth: fieldMap.hero_content_width,

    backgroundVideo: fieldMap.background_video,
    backgroundPreset: fieldMap.background_preset,
    layeredBackgroundEffects: fieldMap.layered_background_effects,
    glowEffects: fieldMap.glow_effects,
    advancedAnimations: fieldMap.advanced_animations,
    hoverEffects: fieldMap.hover_effects,
    animatedBorder: fieldMap.animated_border,
    shimmerEffects: fieldMap.shimmer_effects,
    mouseFollowEffect: fieldMap.mouse_follow_effect,
    premiumMotion: fieldMap.premium_motion,
  });
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

async function getLuxeHeroDefinitionByType(admin) {
  const response = await admin.graphql(
    `#graphql
      query GetLuxeHeroDefinitionByType($type: String!) {
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
        type: LUXE_HERO_METAOBJECT_TYPE,
      },
    },
  );

  const responseJson = await response.json();

  return responseJson.data?.metaobjectDefinitionByType ?? null;
}

export async function ensureLuxeHeroDefinition(admin) {
  const existingDefinition = await getLuxeHeroDefinitionByType(admin);

  if (!existingDefinition) {
    const response = await admin.graphql(
      `#graphql
        mutation CreateLuxeHeroDefinition($definition: MetaobjectDefinitionCreateInput!) {
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
            name: "Luxe Hero Content",
            type: LUXE_HERO_METAOBJECT_TYPE,
            displayNameKey: "heading",
            access: {
              storefront: "PUBLIC_READ",
            },
            fieldDefinitions: LUXE_HERO_FIELD_DEFINITIONS,
          },
        },
      },
    );

    const responseJson = await response.json();
    const payload = responseJson.data?.metaobjectDefinitionCreate;
    const blockingErrors = getBlockingUserErrors(payload?.userErrors ?? []);

    if (blockingErrors.length > 0) {
      throw new Error(
        blockingErrors[0].message || "Failed to create Luxe Hero definition",
      );
    }

    return payload?.metaobjectDefinition ?? null;
  }

  const existingFieldKeys = new Set(
    (existingDefinition.fieldDefinitions ?? []).map((field) => field.key),
  );

  const missingFieldDefinitions = LUXE_HERO_FIELD_DEFINITIONS.filter(
    (field) => !existingFieldKeys.has(field.key),
  );

  if (missingFieldDefinitions.length === 0) {
    return existingDefinition;
  }

  const response = await admin.graphql(
    `#graphql
      mutation UpdateLuxeHeroDefinition(
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
          displayNameKey: "heading",
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
      blockingErrors[0].message || "Failed to update Luxe Hero definition",
    );
  }

  return payload?.metaobjectDefinition ?? existingDefinition;
}

export async function getLuxeHeroMetaobject(admin) {
  const response = await admin.graphql(
    `#graphql
      query GetLuxeHeroMetaobject($handle: MetaobjectHandleInput!) {
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
          type: LUXE_HERO_METAOBJECT_TYPE,
          handle: LUXE_HERO_METAOBJECT_HANDLE,
        },
      },
    },
  );

  const responseJson = await response.json();
  const metaobject = responseJson.data?.metaobjectByHandle ?? null;

  if (!metaobject) {
    return null;
  }

  return {
    id: metaobject.id,
    handle: metaobject.handle,
    type: metaobject.type,
    settings: mapMetaobjectFields(metaobject),
  };
}

export async function saveLuxeHeroMetaobject(admin, input) {
  await ensureLuxeHeroDefinition(admin);

  const settings = normalizeLuxeHeroSettings(input);

  const response = await admin.graphql(
    `#graphql
      mutation UpsertLuxeHeroMetaobject(
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
          type: LUXE_HERO_METAOBJECT_TYPE,
          handle: LUXE_HERO_METAOBJECT_HANDLE,
        },
        metaobject: {
          fields: [
            { key: "badge_text", value: settings.badgeText },
            { key: "heading", value: settings.heading },
            { key: "subheading", value: settings.subheading },

            { key: "text_color", value: settings.textColor },
            { key: "subtext_color", value: settings.subtextColor },
            { key: "heading_color", value: settings.headingColor },
            { key: "background_color", value: settings.backgroundColor },
            { key: "surface_color", value: settings.surfaceColor },
            {
              key: "card_background_color",
              value: settings.cardBackgroundColor,
            },
            { key: "border_color", value: settings.borderColor },
            { key: "accent_color", value: settings.accentColor },
            { key: "overlay_color", value: settings.overlayColor },
            { key: "icon_color", value: settings.iconColor },
            {
              key: "icon_background_color",
              value: settings.iconBackgroundColor,
            },

            {
              key: "primary_button_color",
              value: settings.primaryButtonColor,
            },
            {
              key: "primary_button_text_color",
              value: settings.primaryButtonTextColor,
            },
            {
              key: "secondary_button_color",
              value: settings.secondaryButtonColor,
            },
            {
              key: "secondary_button_text_color",
              value: settings.secondaryButtonTextColor,
            },

            { key: "border_radius", value: String(settings.borderRadius) },
            { key: "section_style", value: settings.sectionStyle },

            { key: "padding_top", value: String(settings.paddingTop) },
            { key: "padding_bottom", value: String(settings.paddingBottom) },
            {
              key: "mobile_padding_top",
              value: String(settings.mobilePaddingTop),
            },
            {
              key: "mobile_padding_bottom",
              value: String(settings.mobilePaddingBottom),
            },

            { key: "mobile_layout", value: settings.mobileLayout },
            { key: "mobile_spacing", value: String(settings.mobileSpacing) },
            { key: "desktop_spacing", value: String(settings.desktopSpacing) },

            {
              key: "heading_font_size",
              value: String(settings.headingFontSize),
            },
            {
              key: "subheading_font_size",
              value: String(settings.subheadingFontSize),
            },
            { key: "body_font_size", value: String(settings.bodyFontSize) },

            { key: "background_image", value: settings.backgroundImage },
            {
              key: "primary_button_label",
              value: settings.primaryButtonLabel,
            },
            { key: "primary_button_link", value: settings.primaryButtonLink },
            {
              key: "secondary_button_label",
              value: settings.secondaryButtonLabel,
            },
            {
              key: "secondary_button_link",
              value: settings.secondaryButtonLink,
            },

            { key: "overlay_opacity", value: String(settings.overlayOpacity) },
            { key: "desktop_height", value: String(settings.desktopHeight) },
            { key: "mobile_height", value: String(settings.mobileHeight) },
            {
              key: "background_fallback_color",
              value: settings.backgroundFallbackColor,
            },

            { key: "content_alignment", value: settings.contentAlignment },
            { key: "heading_alignment", value: settings.headingAlignment },
            { key: "desktop_columns", value: settings.desktopColumns },

            { key: "card_style", value: settings.cardStyle },
            { key: "border_width", value: String(settings.borderWidth) },
            { key: "shadow_style", value: settings.shadowStyle },
            { key: "font_family", value: settings.fontFamily },
            { key: "font_weight", value: settings.fontWeight },
            { key: "letter_spacing", value: String(settings.letterSpacing) },

            { key: "button_style", value: settings.buttonStyle },
            { key: "item_gap", value: String(settings.itemGap) },
            {
              key: "section_max_width",
              value: String(settings.sectionMaxWidth),
            },
            {
              key: "secondary_button_style",
              value: settings.secondaryButtonStyle,
            },
            {
              key: "hero_content_width",
              value: String(settings.heroContentWidth),
            },

            { key: "background_video", value: settings.backgroundVideo },
            { key: "background_preset", value: settings.backgroundPreset },
            {
              key: "layered_background_effects",
              value: settings.layeredBackgroundEffects,
            },
            { key: "glow_effects", value: settings.glowEffects },
            {
              key: "advanced_animations",
              value: settings.advancedAnimations,
            },
            { key: "hover_effects", value: settings.hoverEffects },
            { key: "animated_border", value: settings.animatedBorder },
            { key: "shimmer_effects", value: settings.shimmerEffects },
            {
              key: "mouse_follow_effect",
              value: settings.mouseFollowEffect,
            },
            { key: "premium_motion", value: settings.premiumMotion },
          ],
        },
      },
    },
  );

  const responseJson = await response.json();
  const payload = responseJson.data?.metaobjectUpsert;
  const userErrors = payload?.userErrors ?? [];

  if (userErrors.length > 0) {
    throw new Error(userErrors[0].message || "Failed to save Luxe Hero");
  }

  return {
    id: payload?.metaobject?.id ?? null,
    handle: payload?.metaobject?.handle ?? LUXE_HERO_METAOBJECT_HANDLE,
    type: payload?.metaobject?.type ?? LUXE_HERO_METAOBJECT_TYPE,
    settings: mapMetaobjectFields(payload?.metaobject),
  };
}

export async function getLuxeHeroSettings(admin) {
  const savedMetaobject = await getLuxeHeroMetaobject(admin);

  if (!savedMetaobject) {
    return LUXE_HERO_DEFAULTS;
  }

  return savedMetaobject.settings;
}