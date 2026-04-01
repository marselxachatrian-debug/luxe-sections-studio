import { Badge, BlockStack, InlineStack, Select, Text, TextField } from "@shopify/polaris";
import { BLOCK_KEYS, PLAN_KEYS } from "../../plan-rules";
import { getFieldPlanAccess } from "../../block-plan-enforcement";

function getPlanBadgeTone(requiredPlan) {
  if (requiredPlan === PLAN_KEYS.PREMIUM) {
    return "attention";
  }

  if (requiredPlan === PLAN_KEYS.STANDARD) {
    return "info";
  }

  return "success";
}

function FieldPlanBadge({ currentPlanKey, blockKey, fieldName }) {
  const access = getFieldPlanAccess(currentPlanKey, blockKey, fieldName);

  if (!access.isMapped || access.requiredPlan === PLAN_KEYS.FREE) {
    return <Badge tone="success">Free</Badge>;
  }

  return (
    <Badge tone={getPlanBadgeTone(access.requiredPlan)}>
      {access.requiredPlanLabel}
    </Badge>
  );
}

export function BlockEditorField({
  currentPlanKey,
  blockKey = BLOCK_KEYS.LUXE_HERO,
  field,
  value,
  onChange,
}) {
  const commonLabel = (
    <InlineStack align="space-between" blockAlign="center" wrap>
      <Text as="p" variant="bodySm" fontWeight="semibold">
        {field.label}
      </Text>

      <FieldPlanBadge
        currentPlanKey={currentPlanKey}
        blockKey={blockKey}
        fieldName={field.fieldName}
      />
    </InlineStack>
  );

  if (field.type === "select") {
    return (
      <BlockStack key={field.fieldName} gap="100">
        {commonLabel}
        <Select
          label={field.label}
          labelHidden
          options={field.options ?? []}
          value={String(value ?? "")}
          onChange={onChange}
        />
      </BlockStack>
    );
  }

  if (field.type === "textarea") {
    return (
      <BlockStack key={field.fieldName} gap="100">
        {commonLabel}
        <TextField
          label={field.label}
          labelHidden
          value={String(value ?? "")}
          onChange={onChange}
          multiline={field.multiline ?? 3}
          autoComplete="off"
        />
      </BlockStack>
    );
  }

  if (field.type === "number") {
    return (
      <BlockStack key={field.fieldName} gap="100">
        {commonLabel}
        <TextField
          label={field.label}
          labelHidden
          type="number"
          value={String(value ?? "")}
          onChange={onChange}
          autoComplete="off"
        />
      </BlockStack>
    );
  }

  return (
    <BlockStack key={field.fieldName} gap="100">
      {commonLabel}
      <TextField
        label={field.label}
        labelHidden
        value={String(value ?? "")}
        onChange={onChange}
        autoComplete="off"
      />
    </BlockStack>
  );
}