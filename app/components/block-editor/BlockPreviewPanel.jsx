import { Badge, BlockStack, Box, Card, InlineStack, Text } from "@shopify/polaris";

export function BlockPreviewPanel({
  title = "Live preview",
  device,
  deviceSwitcher,
  preview,
  footerText = "Preview updates immediately while settings change.",
  stageMinHeight = "820px",
}) {
  return (
    <Card>
      <BlockStack gap="250">
        <InlineStack align="space-between" blockAlign="center" wrap>
          <Text as="h2" variant="headingMd">
            {title}
          </Text>
          <Badge tone="attention">{device}</Badge>
        </InlineStack>

        {deviceSwitcher}

        <Box
          padding="300"
          background="bg-surface-secondary"
          borderRadius="300"
        >
          <div
            style={{
              width: "100%",
              minHeight: stageMinHeight,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              overflow: "hidden",
            }}
          >
            {preview}
          </div>
        </Box>

        <Text as="p" variant="bodySm" tone="subdued">
          {footerText}
        </Text>
      </BlockStack>
    </Card>
  );
}