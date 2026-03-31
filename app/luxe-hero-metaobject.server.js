export const LUXE_HERO_METAOBJECT_TYPE = "luxe_hero_content";
export const LUXE_HERO_METAOBJECT_HANDLE = "default";

export const LUXE_HERO_DEFAULTS = {
  badgeText: "Premium storefront",
  heading: "A cleaner, sharper first impression for your Shopify store",
  subheading:
    "Show a stronger brand message, clear value, and a more premium visual style without needing to touch code.",
  primaryButtonLabel: "Shop the collection",
  secondaryButtonLabel: "Learn more",
  contentAlignment: "left",
  backgroundPreset: "midnight",
  overlayOpacity: 34,
  desktopHeight: 560,
  mobileHeight: 460,
};

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

export function normalizeLuxeHeroSettings(input = {}) {
  return {
    badgeText: normalizeText(input.badgeText, LUXE_HERO_DEFAULTS.badgeText),
    heading: normalizeText(input.heading, LUXE_HERO_DEFAULTS.heading),
    subheading: normalizeText(
      input.subheading,
      LUXE_HERO_DEFAULTS.subheading,
    ),
    primaryButtonLabel: normalizeText(
      input.primaryButtonLabel,
      LUXE_HERO_DEFAULTS.primaryButtonLabel,
    ),
    secondaryButtonLabel: normalizeText(
      input.secondaryButtonLabel,
      LUXE_HERO_DEFAULTS.secondaryButtonLabel,
    ),
    contentAlignment: ["left", "center", "right"].includes(
      String(input.contentAlignment ?? ""),
    )
      ? String(input.contentAlignment)
      : LUXE_HERO_DEFAULTS.contentAlignment,
    backgroundPreset: ["midnight", "champagne", "charcoal"].includes(
      String(input.backgroundPreset ?? ""),
    )
      ? String(input.backgroundPreset)
      : LUXE_HERO_DEFAULTS.backgroundPreset,
    overlayOpacity: clampNumber(
      input.overlayOpacity,
      0,
      80,
      LUXE_HERO_DEFAULTS.overlayOpacity,
    ),
    desktopHeight: clampNumber(
      input.desktopHeight,
      420,
      760,
      LUXE_HERO_DEFAULTS.desktopHeight,
    ),
    mobileHeight: clampNumber(
      input.mobileHeight,
      360,
      680,
      LUXE_HERO_DEFAULTS.mobileHeight,
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
    primaryButtonLabel: fieldMap.primary_button_label,
    secondaryButtonLabel: fieldMap.secondary_button_label,
    contentAlignment: fieldMap.content_alignment,
    backgroundPreset: fieldMap.background_preset,
    overlayOpacity: fieldMap.overlay_opacity,
    desktopHeight: fieldMap.desktop_height,
    mobileHeight: fieldMap.mobile_height,
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

export async function ensureLuxeHeroDefinition(admin) {
  const response = await admin.graphql(
    `#graphql
      mutation CreateLuxeHeroDefinition($definition: MetaobjectDefinitionCreateInput!) {
        metaobjectDefinitionCreate(definition: $definition) {
          metaobjectDefinition {
            id
            name
            type
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
          fieldDefinitions: [
            {
              name: "Badge text",
              key: "badge_text",
              type: "single_line_text_field",
            },
            {
              name: "Heading",
              key: "heading",
              type: "multi_line_text_field",
            },
            {
              name: "Subheading",
              key: "subheading",
              type: "multi_line_text_field",
            },
            {
              name: "Primary button label",
              key: "primary_button_label",
              type: "single_line_text_field",
            },
            {
              name: "Secondary button label",
              key: "secondary_button_label",
              type: "single_line_text_field",
            },
            {
              name: "Content alignment",
              key: "content_alignment",
              type: "single_line_text_field",
            },
            {
              name: "Background preset",
              key: "background_preset",
              type: "single_line_text_field",
            },
            {
              name: "Overlay opacity",
              key: "overlay_opacity",
              type: "number_integer",
            },
            {
              name: "Desktop height",
              key: "desktop_height",
              type: "number_integer",
            },
            {
              name: "Mobile height",
              key: "mobile_height",
              type: "number_integer",
            },
          ],
        },
      },
    },
  );

  const responseJson = await response.json();
  const payload = responseJson.data?.metaobjectDefinitionCreate;
  const blockingErrors = getBlockingUserErrors(payload?.userErrors ?? []);

  if (blockingErrors.length > 0) {
    throw new Error(blockingErrors[0].message || "Failed to create definition");
  }

  return payload?.metaobjectDefinition ?? null;
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
            {
              key: "primary_button_label",
              value: settings.primaryButtonLabel,
            },
            {
              key: "secondary_button_label",
              value: settings.secondaryButtonLabel,
            },
            {
              key: "content_alignment",
              value: settings.contentAlignment,
            },
            {
              key: "background_preset",
              value: settings.backgroundPreset,
            },
            {
              key: "overlay_opacity",
              value: String(settings.overlayOpacity),
            },
            {
              key: "desktop_height",
              value: String(settings.desktopHeight),
            },
            {
              key: "mobile_height",
              value: String(settings.mobileHeight),
            },
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