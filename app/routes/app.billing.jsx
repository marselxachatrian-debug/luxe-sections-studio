import {
  requestBillingForPlan,
  requestMockPlanChange,
  resolveBillingPlanByKey,
} from "../billing.server";

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function redirectResponse(location) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: location,
    },
  });
}

function toAbsoluteReturnUrl(request, returnUrl) {
  const requestUrl = new URL(request.url);

  if (!returnUrl) {
    return `${requestUrl.origin}/app/pricing?source=real-billing`;
  }

  if (returnUrl.startsWith("http://") || returnUrl.startsWith("https://")) {
    return returnUrl;
  }

  if (returnUrl.startsWith("/")) {
    return `${requestUrl.origin}${returnUrl}`;
  }

  return `${requestUrl.origin}/${returnUrl}`;
}

export async function loader() {
  return redirectResponse("/app/pricing");
}

export async function action({ request }) {
  const formData = await request.formData();

  const planKey = String(formData.get("plan") || "").trim();
  const mode = String(formData.get("mode") || "real").trim();
  const explicitReturnUrl = String(formData.get("returnUrl") || "").trim();

  if (!planKey) {
    return jsonResponse(
      {
        ok: false,
        error: "Missing plan key.",
      },
      400,
    );
  }

  const billingPlan = resolveBillingPlanByKey(planKey);

  if (!billingPlan) {
    return jsonResponse(
      {
        ok: false,
        error: "Unknown billing plan.",
      },
      404,
    );
  }

  if (mode === "mock") {
    const mockResult = await requestMockPlanChange(planKey);

    if (mockResult.ok && mockResult.confirmationUrl) {
      return redirectResponse(mockResult.confirmationUrl);
    }

    return jsonResponse(mockResult, 400);
  }

  const absoluteReturnUrl = toAbsoluteReturnUrl(request, explicitReturnUrl);

  await requestBillingForPlan(request, planKey, absoluteReturnUrl);

  return jsonResponse({
    ok: true,
    mode: "real",
    requestedPlan: planKey,
    returnUrl: absoluteReturnUrl,
  });
}

export default function AppBillingRoute() {
  return null;
}