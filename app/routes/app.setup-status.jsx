import { authenticate } from "../shopify.server";
import {
  SHOP_SETUP_STEP_KEYS,
  getShopSetupState,
  resetShopSetupState,
  setShopSetupStep,
} from "../shop-setup-state.server";

function parseBooleanValue(value) {
  if (typeof value === "string") {
    return value === "true" || value === "1" || value === "on";
  }

  return Boolean(value);
}

function isSupportedStepKey(stepKey) {
  return Object.values(SHOP_SETUP_STEP_KEYS).includes(stepKey);
}

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  const state = await getShopSetupState(session.shop);

  return {
    ok: true,
    state,
  };
}

export async function action({ request }) {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();

  const intent = String(formData.get("intent") || "confirm_step");

  if (intent === "reset_setup") {
    const state = await resetShopSetupState(session.shop);

    return {
      ok: true,
      state,
    };
  }

  const stepKey = String(formData.get("stepKey") || "");
  const value = parseBooleanValue(formData.get("value"));

  if (!isSupportedStepKey(stepKey)) {
    return new Response("Invalid setup step key.", {
      status: 400,
    });
  }

  const state = await setShopSetupStep(session.shop, stepKey, value);

  return {
    ok: true,
    state,
  };
}

export default function AppSetupStatusRoute() {
  return null;
}