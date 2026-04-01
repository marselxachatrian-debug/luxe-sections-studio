const STORE_LINK_SUGGESTIONS = [
  { label: "Home page", value: "/" },
  { label: "All products", value: "/collections/all" },
  { label: "Catalog", value: "/collections" },
  { label: "Contact page", value: "/pages/contact" },
  { label: "About page", value: "/pages/about" },
];

const HERO_COLOR_PRESETS = [
  "#ffffff",
  "#000000",
  "#0f172a",
  "#1f2937",
  "#f8e7b0",
  "#d6b37a",
  "#e5e7eb",
  "#111827",
  "#182235",
  "rgba(255,255,255,0.08)",
  "rgba(255,255,255,0.16)",
  "rgba(255,255,255,0.22)",
];

export const luxeHeroEditorSections = [
  {
    title: "Free",
    badgeTone: "success",
    badgeLabel: "Base editable features",
    description: "Core text, color, spacing, and size controls.",
    groups: [
      {
        title: "Content",
        fields: [
          {
            fieldName: "heading",
            label: "Heading",
            type: "textarea",
            multiline: 3,
          },
          {
            fieldName: "subheading",
            label: "Subheading",
            type: "textarea",
            multiline: 4,
          },
          {
            fieldName: "primaryButtonLabel",
            label: "Primary button",
            type: "text",
          },
          {
            fieldName: "primaryButtonLink",
            label: "Primary button link",
            type: "link",
            suggestions: STORE_LINK_SUGGESTIONS,
            helpText:
              "Choose a common store destination or paste a Shopify page path.",
          },
          {
            fieldName: "secondaryButtonLabel",
            label: "Secondary button",
            type: "text",
          },
          {
            fieldName: "secondaryButtonLink",
            label: "Secondary button link",
            type: "link",
            suggestions: STORE_LINK_SUGGESTIONS,
            helpText:
              "Choose a common store destination or paste a Shopify page path.",
          },
        ],
      },
      {
        title: "Colors",
        fields: [
          {
            fieldName: "textColor",
            label: "Text color",
            type: "color",
            presets: HERO_COLOR_PRESETS,
            fallback: "#ffffff",
          },
          {
            fieldName: "subtextColor",
            label: "Subtext color",
            type: "color",
            presets: HERO_COLOR_PRESETS,
            fallback: "rgba(255,255,255,0.84)",
          },
          {
            fieldName: "headingColor",
            label: "Heading color",
            type: "color",
            presets: HERO_COLOR_PRESETS,
            fallback: "#ffffff",
          },
          {
            fieldName: "backgroundColor",
            label: "Background color",
            type: "color",
            presets: HERO_COLOR_PRESETS,
            fallback: "#0f172a",
          },
          {
            fieldName: "surfaceColor",
            label: "Surface color",
            type: "color",
            presets: HERO_COLOR_PRESETS,
            fallback: "rgba(255,255,255,0.06)",
          },
          {
            fieldName: "cardBackgroundColor",
            label: "Card background color",
            type: "color",
            presets: HERO_COLOR_PRESETS,
            fallback: "rgba(255,255,255,0.08)",
          },
          {
            fieldName: "borderColor",
            label: "Border color",
            type: "color",
            presets: HERO_COLOR_PRESETS,
            fallback: "rgba(255,255,255,0.22)",
          },
          {
            fieldName: "accentColor",
            label: "Accent color",
            type: "color",
            presets: HERO_COLOR_PRESETS,
            fallback: "#f8e7b0",
          },
          {
            fieldName: "overlayColor",
            label: "Overlay color",
            type: "color",
            presets: HERO_COLOR_PRESETS,
            fallback: "#0f172a",
          },
          {
            fieldName: "iconColor",
            label: "Icon color",
            type: "color",
            presets: HERO_COLOR_PRESETS,
            fallback: "#1f2937",
          },
          {
            fieldName: "iconBackgroundColor",
            label: "Icon background color",
            type: "color",
            presets: HERO_COLOR_PRESETS,
            fallback: "rgba(248, 231, 176, 0.16)",
          },
          {
            fieldName: "primaryButtonColor",
            label: "Primary button color",
            type: "color",
            presets: HERO_COLOR_PRESETS,
            fallback: "#f8e7b0",
          },
          {
            fieldName: "primaryButtonTextColor",
            label: "Primary button text color",
            type: "color",
            presets: HERO_COLOR_PRESETS,
            fallback: "#1f2937",
          },
          {
            fieldName: "secondaryButtonColor",
            label: "Secondary button color",
            type: "color",
            presets: HERO_COLOR_PRESETS,
            fallback: "rgba(255,255,255,0.08)",
          },
          {
            fieldName: "secondaryButtonTextColor",
            label: "Secondary button text color",
            type: "color",
            presets: HERO_COLOR_PRESETS,
            fallback: "#ffffff",
          },
          {
            fieldName: "backgroundFallbackColor",
            label: "Fallback background color",
            type: "color",
            presets: HERO_COLOR_PRESETS,
            fallback: "#182235",
          },
        ],
      },
      {
        title: "Spacing and size",
        fields: [
          {
            fieldName: "borderRadius",
            label: "Border radius",
            type: "number",
          },
          {
            fieldName: "sectionStyle",
            label: "Section style",
            type: "select",
            options: [
              { label: "Minimal", value: "minimal" },
              { label: "Soft", value: "soft" },
              { label: "Luxe", value: "luxe" },
            ],
          },
          { fieldName: "paddingTop", label: "Top padding", type: "number" },
          { fieldName: "paddingBottom", label: "Bottom padding", type: "number" },
          {
            fieldName: "mobilePaddingTop",
            label: "Mobile top padding",
            type: "number",
          },
          {
            fieldName: "mobilePaddingBottom",
            label: "Mobile bottom padding",
            type: "number",
          },
          {
            fieldName: "mobileLayout",
            label: "Mobile layout",
            type: "select",
            options: [
              { label: "Stack", value: "stack" },
              { label: "Inline", value: "inline" },
            ],
          },
          {
            fieldName: "mobileSpacing",
            label: "Mobile spacing",
            type: "number",
          },
          {
            fieldName: "desktopSpacing",
            label: "Desktop spacing",
            type: "number",
          },
          {
            fieldName: "headingFontSize",
            label: "Heading font size",
            type: "number",
          },
          {
            fieldName: "subheadingFontSize",
            label: "Subheading font size",
            type: "number",
          },
          {
            fieldName: "bodyFontSize",
            label: "Body font size",
            type: "number",
          },
          {
            fieldName: "backgroundImage",
            label: "Background image",
            type: "image",
            recommendedDesktop: "1920 × 900 px",
            recommendedMobile: "1080 × 1400 px",
            helpText:
              "Use a wide hero image. Keep the main product or message near the center.",
          },
          {
            fieldName: "overlayOpacity",
            label: "Overlay opacity",
            type: "number",
          },
          {
            fieldName: "desktopHeight",
            label: "Desktop section height",
            type: "number",
          },
          {
            fieldName: "mobileHeight",
            label: "Mobile section height",
            type: "number",
          },
        ],
      },
    ],
  },
  {
    title: "Standard",
    badgeTone: "info",
    badgeLabel: "Layout and typography upgrades",
    description: "More flexible alignment, width, typography, and card styling.",
    groups: [
      {
        title: "Layout upgrades",
        fields: [
          {
            fieldName: "contentAlignment",
            label: "Content alignment",
            type: "select",
            options: [
              { label: "Left", value: "left" },
              { label: "Center", value: "center" },
              { label: "Right", value: "right" },
            ],
          },
          {
            fieldName: "headingAlignment",
            label: "Heading alignment",
            type: "select",
            options: [
              { label: "Left", value: "left" },
              { label: "Center", value: "center" },
              { label: "Right", value: "right" },
            ],
          },
          {
            fieldName: "desktopColumns",
            label: "Desktop columns",
            type: "select",
            options: [
              { label: "1 column", value: "1" },
              { label: "2 columns", value: "2" },
              { label: "3 columns", value: "3" },
            ],
          },
          {
            fieldName: "cardStyle",
            label: "Card style",
            type: "select",
            options: [
              { label: "Soft", value: "soft" },
              { label: "Solid", value: "solid" },
              { label: "Glass", value: "glass" },
              { label: "Outline", value: "outline" },
            ],
          },
          {
            fieldName: "borderWidth",
            label: "Border width",
            type: "number",
          },
          {
            fieldName: "shadowStyle",
            label: "Shadow style",
            type: "select",
            options: [
              { label: "None", value: "none" },
              { label: "Soft", value: "soft" },
              { label: "Medium", value: "medium" },
              { label: "Strong", value: "strong" },
            ],
          },
          {
            fieldName: "fontFamily",
            label: "Font family",
            type: "select",
            options: [
              { label: "Inherit", value: "inherit" },
              { label: "Sans", value: "sans" },
              { label: "Serif", value: "serif" },
              { label: "Display", value: "display" },
            ],
          },
          {
            fieldName: "fontWeight",
            label: "Font weight",
            type: "select",
            options: [
              { label: "500", value: "500" },
              { label: "600", value: "600" },
              { label: "700", value: "700" },
              { label: "800", value: "800" },
            ],
          },
          {
            fieldName: "letterSpacing",
            label: "Letter spacing",
            type: "number",
          },
          {
            fieldName: "buttonStyle",
            label: "Button style",
            type: "select",
            options: [
              { label: "Solid", value: "solid" },
              { label: "Outline", value: "outline" },
              { label: "Soft", value: "soft" },
            ],
          },
          {
            fieldName: "itemGap",
            label: "Item gap",
            type: "number",
          },
          {
            fieldName: "sectionMaxWidth",
            label: "Section max width",
            type: "number",
          },
          {
            fieldName: "secondaryButtonStyle",
            label: "Secondary button style",
            type: "select",
            options: [
              { label: "Solid", value: "solid" },
              { label: "Outline", value: "outline" },
              { label: "Soft", value: "soft" },
            ],
          },
          {
            fieldName: "heroContentWidth",
            label: "Hero content width",
            type: "number",
          },
        ],
      },
    ],
  },
  {
    title: "Premium",
    badgeTone: "attention",
    badgeLabel: "Advanced effects and motion",
    description:
      "Video background, glow, premium presets, motion, and advanced visual effects.",
    groups: [
      {
        title: "Premium effects",
        fields: [
          {
            fieldName: "backgroundVideo",
            label: "Background video",
            type: "video",
            recommendedDesktop: "1920 × 900 px video",
            recommendedMobile: "1080 × 1400 px video",
            helpText:
              "Use a short lightweight loop with the main visual focus centered.",
          },
          {
            fieldName: "layeredBackgroundEffects",
            label: "Layered background effects",
            type: "select",
            options: [
              { label: "Enabled", value: "enabled" },
              { label: "Disabled", value: "disabled" },
            ],
          },
          {
            fieldName: "backgroundPreset",
            label: "Premium hero presets",
            type: "select",
            options: [
              { label: "Midnight gold", value: "midnight" },
              { label: "Champagne glow", value: "champagne" },
              { label: "Charcoal luxe", value: "charcoal" },
            ],
          },
          {
            fieldName: "glowEffects",
            label: "Glow effects",
            type: "select",
            options: [
              { label: "Enabled", value: "enabled" },
              { label: "Disabled", value: "disabled" },
            ],
          },
          {
            fieldName: "advancedAnimations",
            label: "Advanced animations",
            type: "select",
            options: [
              { label: "Enabled", value: "enabled" },
              { label: "Disabled", value: "disabled" },
            ],
          },
          {
            fieldName: "hoverEffects",
            label: "Hover effects",
            type: "select",
            options: [
              { label: "Enabled", value: "enabled" },
              { label: "Disabled", value: "disabled" },
            ],
          },
          {
            fieldName: "animatedBorder",
            label: "Animated border",
            type: "select",
            options: [
              { label: "Enabled", value: "enabled" },
              { label: "Disabled", value: "disabled" },
            ],
          },
          {
            fieldName: "shimmerEffects",
            label: "Shimmer effects",
            type: "select",
            options: [
              { label: "Enabled", value: "enabled" },
              { label: "Disabled", value: "disabled" },
            ],
          },
          {
            fieldName: "mouseFollowEffect",
            label: "Mouse follow effect",
            type: "select",
            options: [
              { label: "Enabled", value: "enabled" },
              { label: "Disabled", value: "disabled" },
            ],
          },
          {
            fieldName: "premiumMotion",
            label: "Premium motion",
            type: "select",
            options: [
              { label: "Enabled", value: "enabled" },
              { label: "Disabled", value: "disabled" },
            ],
          },
        ],
      },
    ],
  },
];