import db from "./db.server";

export const SHOP_SETUP_STEP_KEYS = {
  APP_EMBED_CONFIRMED: "appEmbedConfirmed",
  HERO_BLOCK_CONFIRMED: "heroBlockConfirmed",
  TRUST_BLOCK_CONFIRMED: "trustBlockConfirmed",
  FEATURES_BLOCK_CONFIRMED: "featuresBlockConfirmed",
  ONBOARDING_COMPLETED: "onboardingCompleted",
};

export const DEFAULT_SHOP_SETUP_STATE = {
  appEmbedConfirmed: false,
  heroBlockConfirmed: false,
  trustBlockConfirmed: false,
  featuresBlockConfirmed: false,
  onboardingCompleted: false,
};

function getCompletionState(state) {
  return Boolean(
    state.appEmbedConfirmed &&
      state.heroBlockConfirmed &&
      state.trustBlockConfirmed &&
      state.featuresBlockConfirmed,
  );
}

function normalizeShopSetupState(record) {
  const mergedState = {
    ...DEFAULT_SHOP_SETUP_STATE,
    ...(record ?? {}),
  };

  return {
    ...mergedState,
    onboardingCompleted: getCompletionState(mergedState),
  };
}

function pickUpdatableFields(input) {
  const data = {};

  if (typeof input.appEmbedConfirmed === "boolean") {
    data.appEmbedConfirmed = input.appEmbedConfirmed;
  }

  if (typeof input.heroBlockConfirmed === "boolean") {
    data.heroBlockConfirmed = input.heroBlockConfirmed;
  }

  if (typeof input.trustBlockConfirmed === "boolean") {
    data.trustBlockConfirmed = input.trustBlockConfirmed;
  }

  if (typeof input.featuresBlockConfirmed === "boolean") {
    data.featuresBlockConfirmed = input.featuresBlockConfirmed;
  }

  return data;
}

export async function getShopSetupState(shop) {
  if (!shop) {
    return normalizeShopSetupState(null);
  }

  const record = await db.shopSetupState.findUnique({
    where: { shop },
  });

  return normalizeShopSetupState(record);
}

export async function ensureShopSetupState(shop) {
  if (!shop) {
    throw new Error("Shop is required.");
  }

  const record = await db.shopSetupState.upsert({
    where: { shop },
    update: {},
    create: {
      shop,
      ...DEFAULT_SHOP_SETUP_STATE,
    },
  });

  return normalizeShopSetupState(record);
}

export async function updateShopSetupState(shop, input) {
  if (!shop) {
    throw new Error("Shop is required.");
  }

  const currentState = await getShopSetupState(shop);
  const updatedFields = pickUpdatableFields(input);

  const nextState = normalizeShopSetupState({
    ...currentState,
    ...updatedFields,
  });

  const record = await db.shopSetupState.upsert({
    where: { shop },
    update: {
      ...updatedFields,
      onboardingCompleted: nextState.onboardingCompleted,
    },
    create: {
      shop,
      ...DEFAULT_SHOP_SETUP_STATE,
      ...updatedFields,
      onboardingCompleted: nextState.onboardingCompleted,
    },
  });

  return normalizeShopSetupState(record);
}

export async function setShopSetupStep(shop, stepKey, value = true) {
  if (!shop) {
    throw new Error("Shop is required.");
  }

  if (!Object.values(SHOP_SETUP_STEP_KEYS).includes(stepKey)) {
    throw new Error(`Unsupported shop setup step: ${stepKey}`);
  }

  if (stepKey === SHOP_SETUP_STEP_KEYS.ONBOARDING_COMPLETED) {
    return updateShopSetupState(shop, {});
  }

  return updateShopSetupState(shop, {
    [stepKey]: Boolean(value),
  });
}

export async function resetShopSetupState(shop) {
  if (!shop) {
    throw new Error("Shop is required.");
  }

  const record = await db.shopSetupState.upsert({
    where: { shop },
    update: {
      ...DEFAULT_SHOP_SETUP_STATE,
    },
    create: {
      shop,
      ...DEFAULT_SHOP_SETUP_STATE,
    },
  });

  return normalizeShopSetupState(record);
}