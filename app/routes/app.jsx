import { NavMenu } from "@shopify/app-bridge-react";
import { Link, Outlet } from "react-router";
import { authenticate } from "../shopify.server";

export async function loader({ request }) {
  await authenticate.admin(request);
  return null;
}

export default function AppLayout() {
  return (
    <>
      <NavMenu>
        <Link to="/app" rel="home">
          Dashboard
        </Link>
        <Link to="/app/blocks">Blocks Library</Link>
        <Link to="/app/pricing">Pricing</Link>
        <Link to="/app/settings">Settings</Link>
      </NavMenu>

      <Outlet />
    </>
  );
}