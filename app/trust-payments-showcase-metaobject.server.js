export const TRUST_PAYMENTS_SHOWCASE_METAOBJECT_TYPE =
  "trust_payments_showcase_content";
export const TRUST_PAYMENTS_SHOWCASE_METAOBJECT_HANDLE = "default";

export const TRUST_PAYMENTS_SHOWCASE_DEFAULTS = {
  eyebrow: "Trusted checkout",
  heading:
    "Build more purchase confidence with trust, payments, and delivery proof",
  subheading:
    "Combine reassurance messaging, secure payment methods, and delivery partners in one premium conversion section.",

  trustPoint1: "Verified customer confidence",
  trustPoint2: "Secure payment support",
  trustPoint3: "Delivery partner visibility",

  partner1: "Visa",
  partner2: "Mastercard",
  partner3: "PayPal",
  partner4: "DHL",

  contentAlignment: "left",
  sectionStyle: "luxe",
  iconTone: "midnight",
};

const CONTENT_ALIGNMENT_VALUES = ["left", "center", "right"];
const SECTION_STYLE_VALUES = ["minimal", "soft", "luxe"];
const ICON_TONE_VALUES = ["midnight", "gold", "charcoal"];

function normalizeText(value, fallback) {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function normalizeChoice(value, allowedValues, fallback) {
  const normalizedValue = String(value ?? "");
  return allowedValues.includes(normalizedValue) ? normalizedValue : fallback;
}

export function normalizeTrustPaymentsShowcaseSettings(input = {}) {
  return {
    eyebrow: normalizeText(input.eyebrow, TRUST_PAYMENTS_SHOWCASE_DEFAULTS.eyebrow),
    heading: normalizeText(input.heading, TRUST_PAYMENTS_SHOWCASE_DEFAULTS.heading),
    subheading: normalizeText(
      input.subheading,
      TRUST_PAYMENTS_SHOWCASE_DEFAULTS.subheading,
    ),

    trustPoint1: normalizeText(
      input.trustPoint1,
      TRUST_PAYMENTS_SHOWCASE_DEFAULTS.trustPoint1,
    ),
    trustPoint2: normalizeText(
      input.trustPoint2,
      TRUST_PAYMENTS_SHOWCASE_DEFAULTS.trustPoint2,
    ),
    trustPoint3: normalizeText(
      input.trustPoint3,
      TRUST_PAYMENTS_SHOWCASE_DEFAULTS.trustPoint3,
    ),

    partner1: normalizeText(input.partner1, TRUST_PAYMENTS_SHOWCASE_DEFAULTS.partner1),
    partner2: normalizeText(input.partner2, TRUST_PAYMENTS_SHOWCASE_DEFAULTS.partner2),
    partner3: normalizeText(input.partner3, TRUST_PAYMENTS_SHOWCASE_DEFAULTS.partner3),
    partner4: normalizeText(input.partner4, TRUST_PAYMENTS_SHOWCASE_DEFAULTS.partner4),

    contentAlignment: normalizeChoice(
      input.contentAlignment,
      CONTENT_ALIGNMENT_VALUES,
      TRUST_PAYMENTS_SHOWCASE_DEFAULTS.contentAlignment,
    ),
    sectionStyle: normalizeChoice(
      input.sectionStyle,
      SECTION_STYLE_VALUES,
      TRUST_PAYMENTS_SHOWCASE_DEFAULTS.sectionStyle,
    ),
    iconTone: normalizeChoice(
      input.iconTone,
      ICON_TONE_VALUES,
      TRUST_PAYMENTS_SHOWCASE_DEFAULTS.iconTone,
    ),
  };
}

function mapMetaobjectFields(metaobject) {
  const fieldMap = {};

  for (const field of metaobject?.fields ?? []) {
    fieldMap[field.key] = field.value;
  }

  return normalizeTrustPaymentsShowcaseSettings({
    eyebrow: fieldMap.eyebrow,
    heading: fieldMap.heading,
    subheading: fieldMap.subheading,

    trustPoint1: fieldMap.trust_point_1,
    trustPoint2: fieldMap.trust_point_2,
    trustPoint3: fieldMap.trust_point_3,

    partner1: fieldMap.partner_1,
    partner2: fieldMap.partner_2,
    partner3: fieldMap.partner_3,
    partner4: fieldMap.partner_4,

    contentAlignment: fieldMap.content_alignment,
    sectionStyle: fieldMap.section_style,
    iconTone: fieldMap.icon_tone,
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

export async function ensureTrustPaymentsShowcaseDefinition(admin) {
  const response = await admin.graphql(
    `#graphql
      mutation CreateTrustPaymentsShowcaseDefinition(
        $definition: MetaobjectDefinitionCreateInput!
      ) {
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
          name: "Trust Payments Showcase Content",
          type: TRUST_PAYMENTS_SHOWCASE_METAOBJECT_TYPE,
          displayNameKey: "heading",
          access: {
            storefront: "PUBLIC_READ",
          },
          fieldDefinitions: [
            {
              name: "Eyebrow",
              key: "eyebrow",
              type: "single_line_text_field",
            },
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
              name: "Trust point 1",
              key: "trust_point_1",
              type: "single_line_text_field",
            },
            {
              name: "Trust point 2",
              key: "trust_point_2",
              type: "single_line_text_field",
            },
            {
              name: "Trust point 3",
              key: "trust_point_3",
              type: "single_line_text_field",
            },

            {
              name: "Partner 1",
              key: "partner_1",
              type: "single_line_text_field",
            },
            {
              name: "Partner 2",
              key: "partner_2",
              type: "single_line_text_field",
            },
            {
              name: "Partner 3",
              key: "partner_3",
              type: "single_line_text_field",
            },
            {
              name: "Partner 4",
              key: "partner_4",
              type: "single_line_text_field",
            },

            {
              name: "Content alignment",
              key: "content_alignment",
              type: "single_line_text_field",
            },
            {
              name: "Section style",
              key: "section_style",
              type: "single_line_text_field",
            },
            {
              name: "Icon tone",
              key: "icon_tone",
              type: "single_line_text_field",
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
      blockingErrors[0].message ||
        "Failed to create Trust Payments Showcase definition",
    );
  }

  return payload?.metaobjectDefinition ?? null;
}

export async function getTrustPaymentsShowcaseMetaobject(admin) {
  const response = await admin.graphql(
    `#graphql
      query GetTrustPaymentsShowcaseMetaobject($handle: MetaobjectHandleInput!) {
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
          type: TRUST_PAYMENTS_SHOWCASE_METAOBJECT_TYPE,
          handle: TRUST_PAYMENTS_SHOWCASE_METAOBJECT_HANDLE,
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

export async function saveTrustPaymentsShowcaseMetaobject(admin, input) {
  await ensureTrustPaymentsShowcaseDefinition(admin);

  const settings = normalizeTrustPaymentsShowcaseSettings(input);

  const response = await admin.graphql(
    `#graphql
      mutation UpsertTrustPaymentsShowcaseMetaobject(
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
          type: TRUST_PAYMENTS_SHOWCASE_METAOBJECT_TYPE,
          handle: TRUST_PAYMENTS_SHOWCASE_METAOBJECT_HANDLE,
        },
        metaobject: {
          fields: [
            { key: "eyebrow", value: settings.eyebrow },
            { key: "heading", value: settings.heading },
            { key: "subheading", value: settings.subheading },

            { key: "trust_point_1", value: settings.trustPoint1 },
            { key: "trust_point_2", value: settings.trustPoint2 },
            { key: "trust_point_3", value: settings.trustPoint3 },

            { key: "partner_1", value: settings.partner1 },
            { key: "partner_2", value: settings.partner2 },
            { key: "partner_3", value: settings.partner3 },
            { key: "partner_4", value: settings.partner4 },

            { key: "content_alignment", value: settings.contentAlignment },
            { key: "section_style", value: settings.sectionStyle },
            { key: "icon_tone", value: settings.iconTone },
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
      userErrors[0].message ||
        "Failed to save Trust Payments Showcase settings",
    );
  }

  return {
    id: payload?.metaobject?.id ?? null,
    handle: payload?.metaobject?.handle ?? TRUST_PAYMENTS_SHOWCASE_METAOBJECT_HANDLE,
    type: payload?.metaobject?.type ?? TRUST_PAYMENTS_SHOWCASE_METAOBJECT_TYPE,
    settings: mapMetaobjectFields(payload?.metaobject),
  };
}

export async function getTrustPaymentsShowcaseSettings(admin) {
  const savedMetaobject = await getTrustPaymentsShowcaseMetaobject(admin);

  if (!savedMetaobject) {
    return TRUST_PAYMENTS_SHOWCASE_DEFAULTS;
  }

  return savedMetaobject.settings;
}