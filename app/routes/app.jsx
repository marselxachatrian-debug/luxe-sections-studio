import { NavMenu, TitleBar } from "@shopify/app-bridge-react";
import { Box } from "@shopify/polaris";
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
          <Outlet />
        </div>
      </Box>
    </>
  );
}