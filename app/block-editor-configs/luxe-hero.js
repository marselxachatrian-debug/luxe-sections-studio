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
            type: "text",
          },
          {
            fieldName: "secondaryButtonLabel",
            label: "Secondary button",
            type: "text",
          },
          {
            fieldName: "secondaryButtonLink",
            label: "Secondary button link",
            type: "text",
          },
        ],
      },
      {
        title: "Colors",
        fields: [
          { fieldName: "textColor", label: "Text color", type: "text" },
          { fieldName: "subtextColor", label: "Subtext color", type: "text" },
          { fieldName: "headingColor", label: "Heading color", type: "text" },
          {
            fieldName: "backgroundColor",
            label: "Background color",
            type: "text",
          },
          { fieldName: "surfaceColor", label: "Surface color", type: "text" },
          {
            fieldName: "cardBackgroundColor",
            label: "Card background color",
            type: "text",
          },
          { fieldName: "borderColor", label: "Border color", type: "text" },
          { fieldName: "accentColor", label: "Accent color", type: "text" },
          { fieldName: "overlayColor", label: "Overlay color", type: "text" },
          { fieldName: "iconColor", label: "Icon color", type: "text" },
          {
            fieldName: "iconBackgroundColor",
            label: "Icon background color",
            type: "text",
          },
          {
            fieldName: "primaryButtonColor",
            label: "Primary button color",
            type: "text",
          },
          {
            fieldName: "primaryButtonTextColor",
            label: "Primary button text color",
            type: "text",
          },
          {
            fieldName: "secondaryButtonColor",
            label: "Secondary button color",
            type: "text",
          },
          {
            fieldName: "secondaryButtonTextColor",
            label: "Secondary button text color",
            type: "text",
          },
          {
            fieldName: "backgroundFallbackColor",
            label: "Fallback background color",
            type: "text",
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
            type: "text",
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
            type: "text",
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