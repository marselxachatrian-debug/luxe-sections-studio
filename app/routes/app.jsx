import { NavMenu } from "@shopify/app-bridge-react";
import { Outlet } from "react-router";
import { authenticate } from "../shopify.server";

export async function loader({ request }) {
  await authenticate.admin(request);
  return null;
}

export default function AppLayout() {
  return (
    <>
      <NavMenu>
        <a href="/app" rel="home">
          Dashboard
        </a>
        <a href="/app/blocks">Blocks Library</a>
        <a href="/app/pricing">Pricing</a>
        <a href="/app/settings">Settings</a>
      </NavMenu>

      <Outlet />
    </>
  );
}