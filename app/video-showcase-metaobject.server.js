export const VIDEO_SHOWCASE_METAOBJECT_TYPE = "video_showcase_content";
export const VIDEO_SHOWCASE_METAOBJECT_HANDLE = "default";

export const VIDEO_SHOWCASE_DEFAULTS = {
  eyebrow: "Video showcase",
  heading: "Turn short product videos into a premium storefront section",
  subheading:
    "Show vertical product clips with cleaner spacing, stronger focus, and a more luxury mobile presentation.",

  videoOneTitle: "Product story",
  videoOneText:
    "Short premium clip with a clear visual hook and cleaner product focus.",
  videoTwoTitle: "Behind the details",
  videoTwoText:
    "Use a second video card to show texture, features, or luxury product detail.",
  videoThreeTitle: "Mobile-first CTA",
  videoThreeText:
    "Guide shoppers to the next click with clearer CTA support and better visual flow.",

  headingAlignment: "left",
  sectionStyle: "luxe",
  desktopColumns: "3",
  videoTone: "midnight",
};

const HEADING_ALIGNMENT_VALUES = ["left", "center", "right"];
const SECTION_STYLE_VALUES = ["minimal", "soft", "luxe"];
const DESKTOP_COLUMNS_VALUES = ["2", "3"];
const VIDEO_TONE_VALUES = ["midnight", "gold", "charcoal"];

function normalizeText(value, fallback) {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function normalizeChoice(value, allowedValues, fallback) {
  const normalizedValue = String(value ?? "");
  return allowedValues.includes(normalizedValue) ? normalizedValue : fallback;
}

export function normalizeVideoShowcaseSettings(input = {}) {
  return {
    eyebrow: normalizeText(input.eyebrow, VIDEO_SHOWCASE_DEFAULTS.eyebrow),
    heading: normalizeText(input.heading, VIDEO_SHOWCASE_DEFAULTS.heading),
    subheading: normalizeText(
      input.subheading,
      VIDEO_SHOWCASE_DEFAULTS.subheading,
    ),

    videoOneTitle: normalizeText(
      input.videoOneTitle,
      VIDEO_SHOWCASE_DEFAULTS.videoOneTitle,
    ),
    videoOneText: normalizeText(
      input.videoOneText,
      VIDEO_SHOWCASE_DEFAULTS.videoOneText,
    ),
    videoTwoTitle: normalizeText(
      input.videoTwoTitle,
      VIDEO_SHOWCASE_DEFAULTS.videoTwoTitle,
    ),
    videoTwoText: normalizeText(
      input.videoTwoText,
      VIDEO_SHOWCASE_DEFAULTS.videoTwoText,
    ),
    videoThreeTitle: normalizeText(
      input.videoThreeTitle,
      VIDEO_SHOWCASE_DEFAULTS.videoThreeTitle,
    ),
    videoThreeText: normalizeText(
      input.videoThreeText,
      VIDEO_SHOWCASE_DEFAULTS.videoThreeText,
    ),

    headingAlignment: normalizeChoice(
      input.headingAlignment,
      HEADING_ALIGNMENT_VALUES,
      VIDEO_SHOWCASE_DEFAULTS.headingAlignment,
    ),
    sectionStyle: normalizeChoice(
      input.sectionStyle,
      SECTION_STYLE_VALUES,
      VIDEO_SHOWCASE_DEFAULTS.sectionStyle,
    ),
    desktopColumns: normalizeChoice(
      input.desktopColumns,
      DESKTOP_COLUMNS_VALUES,
      VIDEO_SHOWCASE_DEFAULTS.desktopColumns,
    ),
    videoTone: normalizeChoice(
      input.videoTone,
      VIDEO_TONE_VALUES,
      VIDEO_SHOWCASE_DEFAULTS.videoTone,
    ),
  };
}

function mapMetaobjectFields(metaobject) {
  const fieldMap = {};

  for (const field of metaobject?.fields ?? []) {
    fieldMap[field.key] = field.value;
  }

  return normalizeVideoShowcaseSettings({
    eyebrow: fieldMap.eyebrow,
    heading: fieldMap.heading,
    subheading: fieldMap.subheading,

    videoOneTitle: fieldMap.video_1_title,
    videoOneText: fieldMap.video_1_text,
    videoTwoTitle: fieldMap.video_2_title,
    videoTwoText: fieldMap.video_2_text,
    videoThreeTitle: fieldMap.video_3_title,
    videoThreeText: fieldMap.video_3_text,

    headingAlignment: fieldMap.heading_alignment,
    sectionStyle: fieldMap.section_style,
    desktopColumns: fieldMap.desktop_columns,
    videoTone: fieldMap.video_tone,
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

export async function ensureVideoShowcaseDefinition(admin) {
  const response = await admin.graphql(
    `#graphql
      mutation CreateVideoShowcaseDefinition(
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
          name: "Video Showcase Content",
          type: VIDEO_SHOWCASE_METAOBJECT_TYPE,
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
              name: "Video 1 title",
              key: "video_1_title",
              type: "single_line_text_field",
            },
            {
              name: "Video 1 text",
              key: "video_1_text",
              type: "multi_line_text_field",
            },
            {
              name: "Video 2 title",
              key: "video_2_title",
              type: "single_line_text_field",
            },
            {
              name: "Video 2 text",
              key: "video_2_text",
              type: "multi_line_text_field",
            },
            {
              name: "Video 3 title",
              key: "video_3_title",
              type: "single_line_text_field",
            },
            {
              name: "Video 3 text",
              key: "video_3_text",
              type: "multi_line_text_field",
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
              name: "Video tone",
              key: "video_tone",
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
        "Failed to create Video Showcase definition",
    );
  }

  return payload?.metaobjectDefinition ?? null;
}

export async function getVideoShowcaseMetaobject(admin) {
  const response = await admin.graphql(
    `#graphql
      query GetVideoShowcaseMetaobject($handle: MetaobjectHandleInput!) {
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
          type: VIDEO_SHOWCASE_METAOBJECT_TYPE,
          handle: VIDEO_SHOWCASE_METAOBJECT_HANDLE,
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

export async function saveVideoShowcaseMetaobject(admin, input) {
  await ensureVideoShowcaseDefinition(admin);

  const settings = normalizeVideoShowcaseSettings(input);

  const response = await admin.graphql(
    `#graphql
      mutation UpsertVideoShowcaseMetaobject(
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
          type: VIDEO_SHOWCASE_METAOBJECT_TYPE,
          handle: VIDEO_SHOWCASE_METAOBJECT_HANDLE,
        },
        metaobject: {
          fields: [
            { key: "eyebrow", value: settings.eyebrow },
            { key: "heading", value: settings.heading },
            { key: "subheading", value: settings.subheading },

            { key: "video_1_title", value: settings.videoOneTitle },
            { key: "video_1_text", value: settings.videoOneText },
            { key: "video_2_title", value: settings.videoTwoTitle },
            { key: "video_2_text", value: settings.videoTwoText },
            { key: "video_3_title", value: settings.videoThreeTitle },
            { key: "video_3_text", value: settings.videoThreeText },

            { key: "heading_alignment", value: settings.headingAlignment },
            { key: "section_style", value: settings.sectionStyle },
            { key: "desktop_columns", value: settings.desktopColumns },
            { key: "video_tone", value: settings.videoTone },
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
      userErrors[0].message || "Failed to save Video Showcase settings",
    );
  }

  return {
    id: payload?.metaobject?.id ?? null,
    handle: payload?.metaobject?.handle ?? VIDEO_SHOWCASE_METAOBJECT_HANDLE,
    type: payload?.metaobject?.type ?? VIDEO_SHOWCASE_METAOBJECT_TYPE,
    settings: mapMetaobjectFields(payload?.metaobject),
  };
}

export async function getVideoShowcaseSettings(admin) {
  const savedMetaobject = await getVideoShowcaseMetaobject(admin);

  if (!savedMetaobject) {
    return VIDEO_SHOWCASE_DEFAULTS;
  }

  return savedMetaobject.settings;
}