import { randomUUID } from "node:crypto";

function guessMimeType(file) {
  const name = String(file?.name || "").toLowerCase();
  const fallbackType = String(file?.type || "").trim();

  if (fallbackType) {
    return fallbackType;
  }

  if (name.endsWith(".jpg") || name.endsWith(".jpeg")) {
    return "image/jpeg";
  }

  if (name.endsWith(".png")) {
    return "image/png";
  }

  if (name.endsWith(".webp")) {
    return "image/webp";
  }

  if (name.endsWith(".gif")) {
    return "image/gif";
  }

  if (name.endsWith(".mp4")) {
    return "video/mp4";
  }

  if (name.endsWith(".mov")) {
    return "video/quicktime";
  }

  return "application/octet-stream";
}

function guessShopifyResource(file, mediaKind = "image") {
  const mimeType = guessMimeType(file);

  if (mediaKind === "video" || mimeType.startsWith("video/")) {
    return "VIDEO";
  }

  return "FILE";
}

function sanitizeFilename(filename, fallbackExtension = "") {
  const base = String(filename || "").trim().replace(/[^\w.\-]+/g, "-");
  const cleaned = base.replace(/-+/g, "-").replace(/^-|-$/g, "");

  if (cleaned) {
    return cleaned;
  }

  return `upload-${randomUUID()}${fallbackExtension}`;
}

async function readFileAsBuffer(file) {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

function buildStagedUploadFormData(parameters, fileBuffer) {
  const formData = new FormData();

  for (const parameter of parameters ?? []) {
    formData.append(parameter.name, parameter.value);
  }

  formData.append("file", new Blob([fileBuffer]));

  return formData;
}

async function stagedUploadToTarget(target, fileBuffer) {
  const formData = buildStagedUploadFormData(target.parameters, fileBuffer);

  const response = await fetch(target.url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Staged upload failed: ${response.status} ${errorText}`);
  }
}

async function createShopifyFile(admin, originalSource, filename, contentType) {
  const response = await admin.graphql(
    `#graphql
      mutation FileCreate($files: [FileCreateInput!]!) {
        fileCreate(files: $files) {
          files {
            ... on GenericFile {
              id
              url
            }
            ... on MediaImage {
              id
              image {
                url
              }
            }
            ... on Video {
              id
              sources {
                url
                mimeType
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    {
      variables: {
        files: [
          {
            originalSource,
            filename,
            contentType,
          },
        ],
      },
    },
  );

  const json = await response.json();
  const payload = json.data?.fileCreate;

  if (payload?.userErrors?.length) {
    throw new Error(payload.userErrors[0].message || "Shopify fileCreate failed");
  }

  return payload?.files?.[0] ?? null;
}

function extractCreatedFileUrl(createdFile) {
  if (!createdFile) {
    return "";
  }

  if (createdFile.url) {
    return createdFile.url;
  }

  if (createdFile.image?.url) {
    return createdFile.image.url;
  }

  if (createdFile.sources?.length) {
    return createdFile.sources[0]?.url || "";
  }

  return "";
}

export async function uploadFileToShopify(admin, file, mediaKind = "image") {
  if (!file) {
    throw new Error("No file provided for upload.");
  }

  const mimeType = guessMimeType(file);
  const resource = guessShopifyResource(file, mediaKind);

  const extension = String(file.name || "").includes(".")
    ? ""
    : resource === "VIDEO"
      ? ".mp4"
      : ".jpg";

  const filename = sanitizeFilename(file.name, extension);
  const fileBuffer = await readFileAsBuffer(file);

  const stagedUploadsResponse = await admin.graphql(
    `#graphql
      mutation StagedUploadsCreate($input: [StagedUploadInput!]!) {
        stagedUploadsCreate(input: $input) {
          stagedTargets {
            url
            resourceUrl
            parameters {
              name
              value
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    {
      variables: {
        input: [
          {
            filename,
            mimeType,
            httpMethod: "POST",
            resource,
            fileSize: String(fileBuffer.length),
          },
        ],
      },
    },
  );

  const stagedUploadsJson = await stagedUploadsResponse.json();
  const stagedPayload = stagedUploadsJson.data?.stagedUploadsCreate;

  if (stagedPayload?.userErrors?.length) {
    throw new Error(
      stagedPayload.userErrors[0].message || "Shopify stagedUploadsCreate failed",
    );
  }

  const target = stagedPayload?.stagedTargets?.[0];

  if (!target?.url || !target?.resourceUrl) {
    throw new Error("Shopify did not return a valid staged upload target.");
  }

  await stagedUploadToTarget(target, fileBuffer);

  const createdFile = await createShopifyFile(
    admin,
    target.resourceUrl,
    filename,
    resource,
  );

  const publicUrl = extractCreatedFileUrl(createdFile);

  if (!publicUrl) {
    throw new Error("Shopify uploaded the file, but no public URL was returned.");
  }

  return {
    url: publicUrl,
    filename,
    resource,
  };
}