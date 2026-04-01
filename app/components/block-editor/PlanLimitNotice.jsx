import { Badge, BlockStack, Card, InlineStack, Text } from "@shopify/polaris";

export function PlanLimitNotice({
  currentPlanLabel,
  blockedFeatureDetails = [],
}) {
  if (!blockedFeatureDetails.length) {
    return null;
  }

  const blockedPlanLabels = [
    ...new Set(blockedFeatureDetails.map((item) => item.requiredPlanLabel)),
  ];

  return (
    <Card>
      <div
        style={{
          background: "#fef3c7",
          border: "1px solid #f59e0b",
          borderRadius: "16px",
          padding: "16px",
        }}
      >
        <BlockStack gap="150">
          <InlineStack gap="200" blockAlign="center" wrap>
            <Text as="h3" variant="headingSm">
              Upgrade needed to save some settings
            </Text>
            <Badge tone="attention">{currentPlanLabel}</Badge>
          </InlineStack>

          <Text as="p" variant="bodySm">
            These settings are visible in preview but were not saved.
            Upgrade your plan to save them: {blockedPlanLabels.join(" / ")}.
          </Text>

          <BlockStack gap="050">
            {blockedFeatureDetails.map((item) => (
              <Text
                key={`${item.fieldName}-${item.featureKey}`}
                as="p"
                variant="bodySm"
              >
                {item.fieldName} requires {item.requiredPlanLabel}.
              </Text>
            ))}
          </BlockStack>
        </BlockStack>
      </div>
    </Card>
  );
}