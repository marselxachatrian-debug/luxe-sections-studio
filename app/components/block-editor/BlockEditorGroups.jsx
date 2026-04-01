import { Badge, BlockStack, Card, InlineStack, Text } from "@shopify/polaris";
import { BlockEditorField } from "./BlockEditorField";

function getGroupBadgeTone(planTone) {
  if (planTone === "attention") {
    return "attention";
  }

  if (planTone === "info") {
    return "info";
  }

  return "success";
}

export function BlockEditorGroups({
  currentPlanKey,
  blockKey,
  settings,
  onChange,
  sections = [],
}) {
  return (
    <BlockStack gap="300">
      {sections.map((section) => (
        <Card key={section.title}>
          <BlockStack gap="250">
            <InlineStack align="space-between" blockAlign="center" wrap>
              <Text as="h2" variant="headingMd">
                {section.title}
              </Text>
              <Badge tone={getGroupBadgeTone(section.badgeTone)}>
                {section.badgeLabel}
              </Badge>
            </InlineStack>

            {section.description ? (
              <Text as="p" variant="bodySm" tone="subdued">
                {section.description}
              </Text>
            ) : null}

            {(section.groups ?? []).map((group) => (
              <BlockStack key={group.title} gap="200">
                <Text as="h3" variant="headingSm">
                  {group.title}
                </Text>

                <BlockStack gap="200">
                  {(group.fields ?? []).map((field) => (
                    <BlockEditorField
                      key={field.fieldName}
                      currentPlanKey={currentPlanKey}
                      blockKey={blockKey}
                      field={field}
                      value={settings[field.fieldName]}
                      onChange={(value) => onChange(field.fieldName, value)}
                    />
                  ))}
                </BlockStack>
              </BlockStack>
            ))}
          </BlockStack>
        </Card>
      ))}
    </BlockStack>
  );
}