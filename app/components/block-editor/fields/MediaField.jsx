import { useEffect, useMemo, useState } from "react";
import { useFetcher } from "react-router";
import {
  BlockStack,
  Button,
  Card,
  DropZone,
  InlineStack,
  Text,
  TextField,
  Thumbnail,
} from "@shopify/polaris";

function getFileKind(accept) {
  if (accept === "video") {
    return "video";
  }

  return "image";
}

function matchesAccept(file, accept) {
  if (!file) {
    return false;
  }

  if (accept === "video") {
    return String(file.type || "").startsWith("video/");
  }

  return String(file.type || "").startsWith("image/");
}

export function MediaField({
  label,
  value,
  onChange,
  accept = "image",
  recommendedDesktop = "1920 × 900 px",
  recommendedMobile = "1080 × 1400 px",
  helpText,
}) {
  const fetcher = useFetcher();
  const [localFile, setLocalFile] = useState(null);
  const [uploadError, setUploadError] = useState("");

  const kind = getFileKind(accept);
  const isUploading = fetcher.state !== "idle";

  const localPreviewUrl = useMemo(() => {
    if (!localFile) {
      return "";
    }

    return URL.createObjectURL(localFile);
  }, [localFile]);

  useEffect(() => {
    return () => {
      if (localPreviewUrl) {
        URL.revokeObjectURL(localPreviewUrl);
      }
    };
  }, [localPreviewUrl]);

  useEffect(() => {
    if (fetcher.state !== "idle") {
      return;
    }

    if (fetcher.data?.ok && fetcher.data.url) {
      onChange?.(fetcher.data.url);
      setLocalFile(null);
      setUploadError("");
      return;
    }

    if (fetcher.data?.ok === false) {
      setUploadError(fetcher.data.error || "Upload failed.");
    }
  }, [fetcher.state, fetcher.data, onChange]);

  const previewUrl = localPreviewUrl || String(value || "").trim();

  function handleDrop(_droppedFiles, acceptedFiles) {
    const firstFile = acceptedFiles?.[0];

    if (!firstFile || !matchesAccept(firstFile, accept)) {
      setUploadError(
        accept === "video"
          ? "Please choose a video file."
          : "Please choose an image file.",
      );
      return;
    }

    setUploadError("");
    setLocalFile(firstFile);

    const formData = new FormData();
    formData.append("file", firstFile);
    formData.append("mediaKind", kind);

    fetcher.submit(formData, {
      method: "post",
      action: "/app/api/media-upload",
      encType: "multipart/form-data",
    });
  }

  function clearLocalSelection() {
    setLocalFile(null);
    setUploadError("");
  }

  return (
    <BlockStack gap="200">
      <TextField
        label={`${label} URL`}
        value={String(value ?? "")}
        onChange={onChange}
        autoComplete="off"
        placeholder={
          accept === "video"
            ? "Paste a hosted video URL"
            : "Paste an image URL"
        }
      />

      <Card>
        <BlockStack gap="200">
          <Text as="p" variant="bodySm" fontWeight="semibold">
            Upload {kind}
          </Text>

          <DropZone
            accept={accept === "video" ? "video/*" : "image/*"}
            type={accept === "video" ? "video" : "image"}
            allowMultiple={false}
            onDrop={handleDrop}
            disabled={isUploading}
          >
            <DropZone.FileUpload
              actionHint={
                accept === "video"
                  ? "Recommended: MP4 or MOV"
                  : "Recommended: JPG, PNG, or WebP"
              }
            />
          </DropZone>

          <BlockStack gap="050">
            <Text as="p" variant="bodySm" tone="subdued">
              Recommended desktop: {recommendedDesktop}
            </Text>
            <Text as="p" variant="bodySm" tone="subdued">
              Recommended mobile: {recommendedMobile}
            </Text>
          </BlockStack>

          {isUploading ? (
            <Text as="p" variant="bodySm" tone="subdued">
              Uploading to Shopify...
            </Text>
          ) : null}

          {uploadError ? (
            <Text as="p" variant="bodySm" tone="critical">
              {uploadError}
            </Text>
          ) : null}

          {previewUrl ? (
            <div
              style={{
                border: "1px solid rgba(15, 23, 42, 0.08)",
                borderRadius: "12px",
                padding: "12px",
                background: "#ffffff",
              }}
            >
              <BlockStack gap="150">
                <InlineStack align="space-between" blockAlign="center">
                  <Text as="p" variant="bodySm" fontWeight="semibold">
                    Preview
                  </Text>

                  {localFile ? (
                    <Button
                      size="micro"
                      onClick={clearLocalSelection}
                      disabled={isUploading}
                    >
                      Remove local file
                    </Button>
                  ) : null}
                </InlineStack>

                {accept === "video" ? (
                  <video
                    src={previewUrl}
                    controls
                    style={{
                      width: "100%",
                      maxHeight: "220px",
                      borderRadius: "10px",
                      background: "#111827",
                    }}
                  />
                ) : (
                  <Thumbnail source={previewUrl} alt={label} size="large" />
                )}

                <Text as="p" variant="bodySm" tone="subdued">
                  {localFile
                    ? `Selected file: ${localFile.name}`
                    : "Using saved URL value"}
                </Text>
              </BlockStack>
            </div>
          ) : null}

          {helpText ? (
            <Text as="p" variant="bodySm" tone="subdued">
              {helpText}
            </Text>
          ) : null}
        </BlockStack>
      </Card>
    </BlockStack>
  );
}