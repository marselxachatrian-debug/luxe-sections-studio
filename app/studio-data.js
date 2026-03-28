export const dashboardItems = [
  {
    title: "Project status",
    value: "Core build in progress",
    description:
      "Embedded admin app, theme app extension, mock plan logic, and synced admin routes are already in place.",
  },
  {
    title: "Live blocks count",
    value: "3",
    description:
      "Luxe Hero, Trust Bar, and Premium Features are implemented inside the theme app extension.",
  },
  {
    title: "Admin pages count",
    value: "4",
    description:
      "Dashboard, Blocks Library, Pricing, and Settings are active in the embedded admin UI.",
  },
  {
    title: "Current build scope",
    value: "UI + extension + plan architecture",
    description:
      "Current focus stays on block quality, admin sync, and billing architecture preparation.",
  },
];

export const blockLibraryItems = [
  {
    name: "Luxe Hero",
    handle: "luxe-hero",
    status: "Expanded",
    description:
      "Premium storefront hero block for luxury-first brands with layered media and plan-aware feature growth.",
    features: [
      "Heading and subheading",
      "Background image",
      "Shopify-hosted video background",
      "Content alignment",
      "Primary and secondary buttons",
      "Top and bottom padding",
      "Mobile top and bottom padding",
      "Overlay opacity",
      "Desktop and mobile section height",
      "Glow effects",
      "Animation presets",
    ],
  },
  {
    name: "Trust Bar",
    handle: "trust-bar",
    status: "Expanded",
    description:
      "Compact trust-proof section for reassurance messaging, grid layout control, and cleaner spacing management.",
    features: [
      "Heading",
      "Heading alignment",
      "Section style",
      "Desktop columns",
      "Top padding",
      "Bottom padding",
      "Four trust items",
    ],
  },
  {
    name: "Premium Features",
    handle: "premium-features",
    status: "Expanded",
    description:
      "Feature grid section for premium offer communication with flexible layout controls and stronger merchandising structure.",
    features: [
      "Heading and subheading",
      "Section style",
      "Heading alignment",
      "Desktop columns",
      "Top padding",
      "Bottom padding",
      "Feature card icons",
      "Four feature cards",
    ],
  },
];

export const planTiers = [
  {
    key: "free",
    label: "Free",
    priceLabel: "$0",
    summary: "Core section controls for initial storefront setup.",
    includes: [
      "Basic hero content controls",
      "Starter admin visibility",
      "Merchant-safe mock plan flow",
    ],
  },
  {
    key: "standard",
    label: "Standard",
    priceLabel: "Planned",
    summary:
      "Mid-tier controls for stronger layout flexibility and richer content options.",
    includes: [
      "Expanded spacing and alignment controls",
      "Additional CTA flexibility",
      "More polished section customization",
    ],
  },
  {
    key: "premium",
    label: "Premium",
    priceLabel: "Planned",
    summary:
      "Full premium section experience with advanced presentation controls.",
    includes: [
      "Advanced mobile controls",
      "Video and visual effects",
      "Premium motion and merchandising options",
    ],
  },
];