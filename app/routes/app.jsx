import {
  BlockStack,
  Box,
  Button,
  Card,
  InlineStack,
  Text,
} from "@shopify/polaris";
import { Link, Outlet, useLocation } from "react-router";
import { authenticate } from "../shopify.server";

const navigationItems = [
  { label: "Dashboard", to: "/app" },
  { label: "Blocks Library", to: "/app/blocks" },
  { label: "Pricing", to: "/app/pricing" },
  { label: "Settings", to: "/app/settings" },
];

export async function loader({ request }) {
  await authenticate.admin(request);
  return null;
}

export default function AppLayout() {
  const location = useLocation();

  return (
    <Box padding="400">
      <BlockStack gap="400">
        <Card>
          <InlineStack align="space-between" blockAlign="center" gap="400">
            <InlineStack gap="300" blockAlign="center">
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, #0f172a 0%, #1f2937 55%, #7c5c2b 100%)",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.18)",
                  color: "#f8e7b0",
                  fontWeight: 700,
                  fontSize: "18px",
                  letterSpacing: "0.08em",
                }}
              >
                LS
              </div>

              <BlockStack gap="050">
                <Text as="h1" variant="headingXl">
                  Luxe Sections Studio
                </Text>
                <Text as="p" variant="bodyMd" tone="subdued">
                  Luxury storefront controls for merchants who want a cleaner,
                  sharper, and more premium store experience.
                </Text>
              </BlockStack>
            </InlineStack>

            <InlineStack gap="200">
              {navigationItems.map((item) => {
                const isActive =
                  item.to === "/app"
                    ? location.pathname === "/app"
                    : location.pathname.startsWith(item.to);

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant={isActive ? "primary" : "secondary"}>
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </InlineStack>
          </InlineStack>
        </Card>

        <Outlet />
      </BlockStack>
    </Box>
  );
}