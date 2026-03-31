export const TRUST_BAR_METAOBJECT_TYPE = "trust_bar_content";
export const TRUST_BAR_METAOBJECT_HANDLE = "default";

export const TRUST_BAR_DEFAULTS = {
  heading: "Why shoppers trust CasaBloom",
  headingAlignment: "center",
  sectionStyle: "soft",
  desktopColumns: "4",
  paddingTop: 32,
  paddingBottom: 32,
  item1Title: "Secure checkout",
  item1Text: "Encrypted payments and trusted checkout experience.",
  item2Title: "Fast fulfillment",
  item2Text: "Quick dispatch and reliable delivery updates.",
  item3Title: "Premium quality",
  item3Text: "Carefully selected materials and elevated product standards.",
  item4Title: "Responsive support",
  item4Text: "Helpful customer support when shoppers need assistance.",
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

export function normalizeTrustBarSettings(input = {}) {
  return {
    heading: normalizeText(input.heading, TRUST_BAR_DEFAULTS.heading),
    headingAlignment: ["left", "center"].includes(
      String(input.headingAlignment ?? ""),
    )
      ? String(input.headingAlignment)
      : TRUST_BAR_DEFAULTS.headingAlignment,
    sectionStyle: ["soft", "dark", "outline"].includes(
      String(input.sectionStyle ?? ""),
    )
      ? String(input.sectionStyle)
      : TRUST_BAR_DEFAULTS.sectionStyle,
    desktopColumns: ["2", "4"].includes(String(input.desktopColumns ?? ""))
      ? String(input.desktopColumns)
      : TRUST_BAR_DEFAULTS.desktopColumns,
    paddingTop: clampNumber(
      input.paddingTop,
      0,
      120,
      TRUST_BAR_DEFAULTS.paddingTop,
    ),
    paddingBottom: clampNumber(
      input.paddingBottom,
      0,
      120,
      TRUST_BAR_DEFAULTS.paddingBottom,
    ),
    item1Title: normalizeText(input.item1Title, TRUST_BAR_DEFAULTS.item1Title),
    item1Text: normalizeText(input.item1Text, TRUST_BAR_DEFAULTS.item1Text),
    item2Title: normalizeText(input.item2Title, TRUST_BAR_DEFAULTS.item2Title),
    item2Text: normalizeText(input.item2Text, TRUST_BAR_DEFAULTS.item2Text),
    item3Title: normalizeText(input.item3Title, TRUST_BAR_DEFAULTS.item3Title),
    item3Text: normalizeText(input.item3Text, TRUST_BAR_DEFAULTS.item3Text),
    item4Title: normalizeText(input.item4Title, TRUST_BAR_DEFAULTS.item4Title),
    item4Text: normalizeText(input.item4Text, TRUST_BAR_DEFAULTS.item4Text),
  };
}

function mapMetaobjectFields(metaobject) {
  const fieldMap = {};

  for (const field of metaobject?.fields ?? []) {
    fieldMap[field.key] = field.value;
  }

  return normalizeTrustBarSettings({
    heading: fieldMap.heading,
    headingAlignment: fieldMap.heading_alignment,
    sectionStyle: fieldMap.section_style,
    desktopColumns: fieldMap.desktop_columns,
    paddingTop: fieldMap.padding_top,
    paddingBottom: fieldMap.padding_bottom,
    item1Title: fieldMap.item_1_title,
    item1Text: fieldMap.item_1_text,
    item2Title: fieldMap.item_2_title,
    item2Text: fieldMap.item_2_text,
    item3Title: fieldMap.item_3_title,
    item3Text: fieldMap.item_3_text,
    item4Title: fieldMap.item_4_title,
    item4Text: fieldMap.item_4_text,
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

export async function ensureTrustBarDefinition(admin) {
  const response = await admin.graphql(
    `#graphql
      mutation CreateTrustBarDefinition($definition: MetaobjectDefinitionCreateInput!) {
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
          name: "Trust Bar Content",
          type: TRUST_BAR_METAOBJECT_TYPE,
          displayNameKey: "heading",
          access: {
            storefront: "PUBLIC_READ",
          },
          fieldDefinitions: [
            {
              name: "Heading",
              key: "heading",
              type: "single_line_text_field",
            },
            {
              name: "Heading alignment",
              key: "heading_alignment",
              type: "single_line_text_field",
            },
            {
              name: "Section style",
              key: "section_style",
              type: "single_line_text_field",
            },
            {
              name: "Desktop columns",
              key: "desktop_columns",
              type: "single_line_text_field",
            },
            {
              name: "Top padding",
              key: "padding_top",
              type: "number_integer",
            },
            {
              name: "Bottom padding",
              key: "padding_bottom",
              type: "number_integer",
            },
            {
              name: "Item 1 title",
              key: "item_1_title",
              type: "single_line_text_field",
            },
            {
              name: "Item 1 text",
              key: "item_1_text",
              type: "multi_line_text_field",
            },
            {
              name: "Item 2 title",
              key: "item_2_title",
              type: "single_line_text_field",
            },
            {
              name: "Item 2 text",
              key: "item_2_text",
              type: "multi_line_text_field",
            },
            {
              name: "Item 3 title",
              key: "item_3_title",
              type: "single_line_text_field",
            },
            {
              name: "Item 3 text",
              key: "item_3_text",
              type: "multi_line_text_field",
            },
            {
              name: "Item 4 title",
              key: "item_4_title",
              type: "single_line_text_field",
            },
            {
              name: "Item 4 text",
              key: "item_4_text",
              type: "multi_line_text_field",
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

export async function getTrustBarMetaobject(admin) {
  const response = await admin.graphql(
    `#graphql
      query GetTrustBarMetaobject($handle: MetaobjectHandleInput!) {
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
          type: TRUST_BAR_METAOBJECT_TYPE,
          handle: TRUST_BAR_METAOBJECT_HANDLE,
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

export async function saveTrustBarMetaobject(admin, input) {
  await ensureTrustBarDefinition(admin);

  const settings = normalizeTrustBarSettings(input);

  const response = await admin.graphql(
    `#graphql
      mutation UpsertTrustBarMetaobject(
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
          type: TRUST_BAR_METAOBJECT_TYPE,
          handle: TRUST_BAR_METAOBJECT_HANDLE,
        },
        metaobject: {
          fields: [
            { key: "heading", value: settings.heading },
            {
              key: "heading_alignment",
              value: settings.headingAlignment,
            },
            {
              key: "section_style",
              value: settings.sectionStyle,
            },
            {
              key: "desktop_columns",
              value: settings.desktopColumns,
            },
            {
              key: "padding_top",
              value: String(settings.paddingTop),
            },
            {
              key: "padding_bottom",
              value: String(settings.paddingBottom),
            },
            {
              key: "item_1_title",
              value: settings.item1Title,
            },
            {
              key: "item_1_text",
              value: settings.item1Text,
            },
            {
              key: "item_2_title",
              value: settings.item2Title,
            },
            {
              key: "item_2_text",
              value: settings.item2Text,
            },
            {
              key: "item_3_title",
              value: settings.item3Title,
            },
            {
              key: "item_3_text",
              value: settings.item3Text,
            },
            {
              key: "item_4_title",
              value: settings.item4Title,
            },
            {
              key: "item_4_text",
              value: settings.item4Text,
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
    throw new Error(userErrors[0].message || "Failed to save Trust Bar");
  }

  return {
    id: payload?.metaobject?.id ?? null,
    handle: payload?.metaobject?.handle ?? TRUST_BAR_METAOBJECT_HANDLE,
    type: payload?.metaobject?.type ?? TRUST_BAR_METAOBJECT_TYPE,
    settings: mapMetaobjectFields(payload?.metaobject),
  };
}

export async function getTrustBarSettings(admin) {
  const savedMetaobject = await getTrustBarMetaobject(admin);

  if (!savedMetaobject) {
    return TRUST_BAR_DEFAULTS;
  }

  return savedMetaobject.settings;
}