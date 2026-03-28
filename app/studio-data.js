export const dashboardItems = [
  {
    title: "Project status",
    value: "Merchant-first expansion",
    description:
      "The app is moving from a simple block starter into a no-code premium storefront builder for Shopify merchants.",
  },
  {
    title: "Live blocks count",
    value: "3",
    description:
      "Premium Hero Banner, Store Trust Highlights, and Feature Highlights Grid are already live inside the theme app extension.",
  },
  {
    title: "Planned next blocks",
    value: "2",
    description:
      "Trust & Payment Showcase and Vertical Video Showcase are the next high-value merchant blocks in the roadmap.",
  },
  {
    title: "Current build scope",
    value: "Onboarding + pricing + block expansion",
    description:
      "Current focus stays on merchant onboarding, stronger plan value, and richer block controls for desktop and mobile.",
  },
];

export const blockLibraryItems = [
  {
    name: "Premium Hero Banner",
    handle: "luxe-hero",
    status: "Live",
    description:
      "Luxury-first hero banner for strong first impressions with layered media, CTA controls, mobile sizing, and a premium visual foundation.",
    features: [
      "Heading and subheading",
      "Background image",
      "Optional video background path",
      "Primary and secondary buttons",
      "Desktop and mobile section height",
      "Desktop and mobile padding",
      "Overlay opacity",
      "Content alignment",
      "Premium growth path for motion and glow effects",
    ],
  },
  {
    name: "Store Trust Highlights",
    handle: "trust-bar",
    status: "Live",
    description:
      "Merchant-friendly trust block for reassurance messaging, trust points, spacing control, and a cleaner premium storefront presentation.",
    features: [
      "Heading",
      "Trust items",
      "Heading alignment",
      "Section style",
      "Desktop columns",
      "Top and bottom padding",
      "Expandable roadmap for icons, links, and richer trust presentation",
    ],
  },
  {
    name: "Feature Highlights Grid",
    handle: "premium-features",
    status: "Live",
    description:
      "Premium feature grid built to explain product value, brand advantages, and premium offer positioning with a clean card layout.",
    features: [
      "Heading and subheading",
      "Feature cards",
      "Card icons",
      "Section style",
      "Heading alignment",
      "Desktop columns",
      "Top and bottom padding",
      "Expandable roadmap for links, richer icon control, and stronger card styling",
    ],
  },
];

export const roadmapBlockItems = [
  {
    name: "Trust & Payment Showcase",
    handle: "trust-payments-showcase",
    status: "Planned next",
    description:
      "Large two-column conversion block that combines trust messaging, review links, payment methods, and delivery partner presentation in one premium section.",
    plannedFeatures: [
      "Left and right layout direction",
      "Trust text and review link",
      "Payment systems with official icons",
      "Delivery partners with icon links",
      "Editable text, colors, spacing, and icon sizes",
      "Desktop and mobile layouts",
      "Premium hover, glow, and luxury motion effects",
    ],
  },
  {
    name: "Vertical Video Showcase",
    handle: "video-showcase",
    status: "Planned next",
    description:
      "9:16 video product showcase for premium visual storytelling, stronger product attention, and richer storefront merchandising.",
    plannedFeatures: [
      "Vertical product video cards",
      "Title, subtitle, CTA, and destination link",
      "Desktop and mobile card control",
      "Active and inactive card styling",
      "Spacing, colors, overlays, and typography",
      "Premium spotlight motion and luxury carousel polish",
    ],
  },
];

export const planTiers = [
  {
    key: "free",
    label: "Free",
    priceLabel: "$0",
    summary:
      "A strong no-code foundation for merchants who want a professional result without touching code.",
    includes: [
      "Mobile-ready editing foundation",
      "Unlimited color selection across supported controls",
      "Core text, background, spacing, and layout controls",
      "Starter links, buttons, and merchant-safe customization flow",
    ],
  },
  {
    key: "standard",
    label: "Standard",
    priceLabel: "$9.50",
    summary:
      "The working plan for merchants who need more control, stronger layouts, and richer customization.",
    includes: [
      "Everything in Free",
      "More layout flexibility and typography control",
      "Custom icon upload and extended content structure",
      "Better merchandising control for trust, feature, and showcase sections",
    ],
  },
  {
    key: "premium",
    label: "Premium",
    priceLabel: "$24.50",
    summary:
      "Luxury storefront control with premium visual polish, advanced motion, and high-end presentation tools.",
    includes: [
      "Everything in Standard",
      "Glow, shimmer, hover, and animated border effects",
      "Premium showcase motion and luxury visual presets",
      "Maximum presentation power for premium-brand storefronts",
    ],
  },
];