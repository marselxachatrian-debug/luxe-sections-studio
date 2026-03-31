export const PREMIUM_FEATURES_METAOBJECT_TYPE = "premium_features_content";
export const PREMIUM_FEATURES_METAOBJECT_HANDLE = "default";

export const PREMIUM_FEATURES_DEFAULTS = {
  heading: "Designed for premium storefront growth",
  subheading:
    "Use this section to present the value behind your premium offer with polished feature cards.",
  sectionStyle: "light",
  headingAlignment: "center",
  desktopColumns: "3",

  feature1Icon: "check",
  feature1Title: "Luxury-first presentation",
  feature1Text:
    "Showcase premium positioning with cleaner layout structure and more refined visual hierarchy.",

  feature2Icon: "star",
  feature2Title: "Flexible merchandising",
  feature2Text:
    "Structure your value props into a cleaner grid that supports premium product storytelling.",

  feature3Icon: "shield",
  feature3Title: "Confident buyer messaging",
  feature3Text:
    "Highlight quality, trust, and differentiation in a format that feels premium and easy to scan.",

  feature4Icon: "crown",
  feature4Title: "Premium visual polish",
  feature4Text:
    "Add subtle icon-led card styling that helps the section feel more intentional and high-end.",
};

const SECTION_STYLE_VALUES = ["light", "dark"];
const HEADING_ALIGNMENT_VALUES = ["left", "center"];
const DESKTOP_COLUMN_VALUES = ["2", "3"];
const FEATURE_ICON_VALUES = [
  "check",
  "star",
  "shield",
  "sparkles",
  "leaf",
  "crown",
];

function normalizeText(value, fallback) {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function normalizeChoice(value, allowedValues, fallback) {
  const normalizedValue = String(value ?? "");
  return allowedValues.includes(normalizedValue) ? normalizedValue : fallback;
}

export function normalizePremiumFeaturesSettings(input = {}) {
  return {
    heading: normalizeText(input.heading, PREMIUM_FEATURES_DEFAULTS.heading),
    subheading: normalizeText(
      input.subheading,
      PREMIUM_FEATURES_DEFAULTS.subheading,
    ),
    sectionStyle: normalizeChoice(
      input.sectionStyle,
      SECTION_STYLE_VALUES,
      PREMIUM_FEATURES_DEFAULTS.sectionStyle,
    ),
    headingAlignment: normalizeChoice(
      input.headingAlignment,
      HEADING_ALIGNMENT_VALUES,
      PREMIUM_FEATURES_DEFAULTS.headingAlignment,
    ),
    desktopColumns: normalizeChoice(
      input.desktopColumns,
      DESKTOP_COLUMN_VALUES,
      PREMIUM_FEATURES_DEFAULTS.desktopColumns,
    ),

    feature1Icon: normalizeChoice(
      input.feature1Icon,
      FEATURE_ICON_VALUES,
      PREMIUM_FEATURES_DEFAULTS.feature1Icon,
    ),
    feature1Title: normalizeText(
      input.feature1Title,
      PREMIUM_FEATURES_DEFAULTS.feature1Title,
    ),
    feature1Text: normalizeText(
      input.feature1Text,
      PREMIUM_FEATURES_DEFAULTS.feature1Text,
    ),

    feature2Icon: normalizeChoice(
      input.feature2Icon,
      FEATURE_ICON_VALUES,
      PREMIUM_FEATURES_DEFAULTS.feature2Icon,
    ),
    feature2Title: normalizeText(
      input.feature2Title,
      PREMIUM_FEATURES_DEFAULTS.feature2Title,
    ),
    feature2Text: normalizeText(
      input.feature2Text,
      PREMIUM_FEATURES_DEFAULTS.feature2Text,
    ),

    feature3Icon: normalizeChoice(
      input.feature3Icon,
      FEATURE_ICON_VALUES,
      PREMIUM_FEATURES_DEFAULTS.feature3Icon,
    ),
    feature3Title: normalizeText(
      input.feature3Title,
      PREMIUM_FEATURES_DEFAULTS.feature3Title,
    ),
    feature3Text: normalizeText(
      input.feature3Text,
      PREMIUM_FEATURES_DEFAULTS.feature3Text,
    ),

    feature4Icon: normalizeChoice(
      input.feature4Icon,
      FEATURE_ICON_VALUES,
      PREMIUM_FEATURES_DEFAULTS.feature4Icon,
    ),
    feature4Title: normalizeText(
      input.feature4Title,
      PREMIUM_FEATURES_DEFAULTS.feature4Title,
    ),
    feature4Text: normalizeText(
      input.feature4Text,
      PREMIUM_FEATURES_DEFAULTS.feature4Text,
    ),
  };
}

function mapMetaobjectFields(metaobject) {
  const fieldMap = {};

  for (const field of metaobject?.fields ?? []) {
    fieldMap[field.key] = field.value;
  }

  return normalizePremiumFeaturesSettings({
    heading: fieldMap.heading,
    subheading: fieldMap.subheading,
    sectionStyle: fieldMap.section_style,
    headingAlignment: fieldMap.heading_alignment,
    desktopColumns: fieldMap.desktop_columns,

    feature1Icon: fieldMap.feature_1_icon,
    feature1Title: fieldMap.feature_1_title,
    feature1Text: fieldMap.feature_1_text,

    feature2Icon: fieldMap.feature_2_icon,
    feature2Title: fieldMap.feature_2_title,
    feature2Text: fieldMap.feature_2_text,

    feature3Icon: fieldMap.feature_3_icon,
    feature3Title: fieldMap.feature_3_title,
    feature3Text: fieldMap.feature_3_text,

    feature4Icon: fieldMap.feature_4_icon,
    feature4Title: fieldMap.feature_4_title,
    feature4Text: fieldMap.feature_4_text,
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

export async function ensurePremiumFeaturesDefinition(admin) {
  const response = await admin.graphql(
    `#graphql
      mutation CreatePremiumFeaturesDefinition($definition: MetaobjectDefinitionCreateInput!) {
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
          name: "Premium Features Content",
          type: PREMIUM_FEATURES_METAOBJECT_TYPE,
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
              name: "Subheading",
              key: "subheading",
              type: "multi_line_text_field",
            },
            {
              name: "Section style",
              key: "section_style",
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

            {
              name: "Feature 1 icon",
              key: "feature_1_icon",
              type: "single_line_text_field",
            },
            {
              name: "Feature 1 title",
              key: "feature_1_title",
              type: "single_line_text_field",
            },
            {
              name: "Feature 1 text",
              key: "feature_1_text",
              type: "multi_line_text_field",
            },

            {
              name: "Feature 2 icon",
              key: "feature_2_icon",
              type: "single_line_text_field",
            },
            {
              name: "Feature 2 title",
              key: "feature_2_title",
              type: "single_line_text_field",
            },
            {
              name: "Feature 2 text",
              key: "feature_2_text",
              type: "multi_line_text_field",
            },

            {
              name: "Feature 3 icon",
              key: "feature_3_icon",
              type: "single_line_text_field",
            },
            {
              name: "Feature 3 title",
              key: "feature_3_title",
              type: "single_line_text_field",
            },
            {
              name: "Feature 3 text",
              key: "feature_3_text",
              type: "multi_line_text_field",
            },

            {
              name: "Feature 4 icon",
              key: "feature_4_icon",
              type: "single_line_text_field",
            },
            {
              name: "Feature 4 title",
              key: "feature_4_title",
              type: "single_line_text_field",
            },
            {
              name: "Feature 4 text",
              key: "feature_4_text",
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
    throw new Error(
      blockingErrors[0].message || "Failed to create Premium Features definition",
    );
  }

  return payload?.metaobjectDefinition ?? null;
}

export async function getPremiumFeaturesMetaobject(admin) {
  const response = await admin.graphql(
    `#graphql
      query GetPremiumFeaturesMetaobject($handle: MetaobjectHandleInput!) {
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
          type: PREMIUM_FEATURES_METAOBJECT_TYPE,
          handle: PREMIUM_FEATURES_METAOBJECT_HANDLE,
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

export async function savePremiumFeaturesMetaobject(admin, input) {
  await ensurePremiumFeaturesDefinition(admin);

  const settings = normalizePremiumFeaturesSettings(input);

  const response = await admin.graphql(
    `#graphql
      mutation UpsertPremiumFeaturesMetaobject(
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
          type: PREMIUM_FEATURES_METAOBJECT_TYPE,
          handle: PREMIUM_FEATURES_METAOBJECT_HANDLE,
        },
        metaobject: {
          fields: [
            { key: "heading", value: settings.heading },
            { key: "subheading", value: settings.subheading },
            { key: "section_style", value: settings.sectionStyle },
            { key: "heading_alignment", value: settings.headingAlignment },
            { key: "desktop_columns", value: settings.desktopColumns },

            { key: "feature_1_icon", value: settings.feature1Icon },
            { key: "feature_1_title", value: settings.feature1Title },
            { key: "feature_1_text", value: settings.feature1Text },

            { key: "feature_2_icon", value: settings.feature2Icon },
            { key: "feature_2_title", value: settings.feature2Title },
            { key: "feature_2_text", value: settings.feature2Text },

            { key: "feature_3_icon", value: settings.feature3Icon },
            { key: "feature_3_title", value: settings.feature3Title },
            { key: "feature_3_text", value: settings.feature3Text },

            { key: "feature_4_icon", value: settings.feature4Icon },
            { key: "feature_4_title", value: settings.feature4Title },
            { key: "feature_4_text", value: settings.feature4Text },
          ],
        },
      },
    },
  );

  const responseJson = await response.json();
  const payload = responseJson.data?.metaobjectUpsert;
  const userErrors = payload?.userErrors ?? [];

  if (userErrors.length > 0) {
    throw new Error(
      userErrors[0].message || "Failed to save Premium Features settings",
    );
  }

  return {
    id: payload?.metaobject?.id ?? null,
    handle: payload?.metaobject?.handle ?? PREMIUM_FEATURES_METAOBJECT_HANDLE,
    type: payload?.metaobject?.type ?? PREMIUM_FEATURES_METAOBJECT_TYPE,
    settings: mapMetaobjectFields(payload?.metaobject),
  };
}

export async function getPremiumFeaturesSettings(admin) {
  const savedMetaobject = await getPremiumFeaturesMetaobject(admin);

  if (!savedMetaobject) {
    return PREMIUM_FEATURES_DEFAULTS;
  }

  return savedMetaobject.settings;
}