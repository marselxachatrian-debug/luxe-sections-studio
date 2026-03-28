import { NavMenu, TitleBar } from "@shopify/app-bridge-react";
import { BlockStack, Box, Card, Text } from "@shopify/polaris";
import { Outlet } from "react-router";
import { authenticate } from "../shopify.server";

export async function loader({ request }) {
  await authenticate.admin(request);
  return null;
}

export default function AppLayout() {
  return (
    <>
      <TitleBar title="Luxe Sections Studio" />

      <NavMenu>
        <a href="/app" rel="home">
          Dashboard
        </a>
        <a href="/app/blocks">Blocks</a>
        <a href="/app/pricing">Pricing</a>
        <a href="/app/settings">Settings</a>
      </NavMenu>

      <Box padding="400">
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <BlockStack gap="400">
            <Card>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "72px 1fr",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(135deg, #0f172a 0%, #1f2937 55%, #7c5c2b 100%)",
                    boxShadow: "0 14px 34px rgba(15, 23, 42, 0.18)",
                    color: "#f8e7b0",
                    fontWeight: 700,
                    fontSize: "22px",
                    letterSpacing: "0.08em",
                  }}
                >
                  LS
                </div>

                <BlockStack gap="100">
                  <Text as="h1" variant="headingXl">
                    Luxe Sections Studio
                  </Text>
                  <Text as="p" variant="bodyMd" tone="subdued">
                    Build premium Shopify sections with a merchant-first editing
                    experience, cleaner setup, and stronger visual control.
                  </Text>
                </BlockStack>
              </div>
            </Card>

            <Outlet />
          </BlockStack>
        </div>
      </Box>
    </>
  );
}