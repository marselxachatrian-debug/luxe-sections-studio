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
            <BlockStack gap="100">
              <Text as="h1" variant="headingXl">
                Luxe Sections Studio
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                Premium admin workspace for sections, pricing, and merchant setup.
              </Text>
            </BlockStack>

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