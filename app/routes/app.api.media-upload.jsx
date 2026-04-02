import { authenticate } from "../shopify.server";
import { uploadFileToShopify } from "../shopify-files.server";

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();

  const file = formData.get("file");
  const mediaKind = String(formData.get("mediaKind") || "image");

  if (!(file instanceof File) || file.size <= 0) {
    return {
      ok: false,
      error: "No file was uploaded.",
    };
  }

  try {
    const uploaded = await uploadFileToShopify(admin, file, mediaKind);

    return {
      ok: true,
      url: uploaded.url,
      filename: uploaded.filename,
      resource: uploaded.resource,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Upload failed.",
    };
  }
}

export default function AppApiMediaUploadRoute() {
  return null;
}