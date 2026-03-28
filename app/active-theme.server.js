import { authenticate } from "./shopify.server";

function extractNumericThemeId(themeGid) {
  if (!themeGid) {
    return null;
  }

  return themeGid.split("/").pop() ?? null;
}

export async function getActiveThemeFromRequest(request) {
  const { admin, session } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
      query GetActiveTheme {
        themes(first: 1, roles: [MAIN]) {
          nodes {
            id
            name
            role
          }
        }
      }
    `,
  );

  const responseJson = await response.json();
  const activeTheme = responseJson.data?.themes?.nodes?.[0] ?? null;

  if (!activeTheme) {
    return {
      shop: session.shop,
      theme: null,
      themeId: null,
      themeGid: null,
    };
  }

  return {
    shop: session.shop,
    theme: activeTheme,
    themeId: extractNumericThemeId(activeTheme.id),
    themeGid: activeTheme.id,
  };
}