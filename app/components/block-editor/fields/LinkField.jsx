import { BlockStack, Card, InlineStack, Text, TextField } from "@shopify/polaris";

const DEFAULT_LINK_SUGGESTIONS = [
  { label: "Home page", value: "/" },
  { label: "All products", value: "/collections/all" },
  { label: "Catalog", value: "/collections" },
  { label: "Contact page", value: "/pages/contact" },
  { label: "About page", value: "/pages/about" },
];

export function LinkField({
  label,
  value,
  onChange,
  suggestions = DEFAULT_LINK_SUGGESTIONS,
  helpText = "Use a Shopify page path like /collections/all or a full URL.",
}) {
  return (
    <BlockStack gap="200">
      <TextField
        label={label}
        value={String(value ?? "")}
        onChange={onChange}
        autoComplete="off"
        placeholder="/collections/all"
      />

      <Card>
        <BlockStack gap="150">
          <Text as="p" variant="bodySm" fontWeight="semibold">
            Suggested store links
          </Text>

          <InlineStack gap="150" wrap>
            {suggestions.map((item) => (
              <button
                key={`${item.label}-${item.value}`}
                type="button"
                onClick={() => onChange?.(item.value)}
                style={{
                  border: "1px solid rgba(15, 23, 42, 0.12)",
                  borderRadius: "999px",
                  padding: "8px 12px",
                  background: "#ffffff",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
                title={item.value}
              >
                {item.label}
              </button>
            ))}
          </InlineStack>

          <Text as="p" variant="bodySm" tone="subdued">
            {helpText}
          </Text>
        </BlockStack>
      </Card>
    </BlockStack>
  );
}