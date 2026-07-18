import {
  createSubmission,
  parseOnboardingRequest,
  saveOnboardingSubmission,
  sendOnboardingNotification,
  validateOnboardingPayload,
  verifyTurnstileIfEnabled,
} from "../_shared/onboarding";

type Env = {
  GOOGLE_SHEETS_WEBHOOK_URL?: string;
  GOOGLE_SHEETS_WEBHOOK_SECRET?: string;
  EMAIL_PROVIDER_API_KEY?: string;
  EMAIL_NOTIFICATION_TO?: string;
  EMAIL_FROM?: string;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_ENABLED?: string;
};

type PagesContext = {
  request: Request;
  env: Env;
};

const rateLimitWindowMs = 60_000;
const maxRequestsPerWindow = 5;
const requestLog = new Map<string, { count: number; resetAt: number }>();

const json = (body: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

const checkRateLimit = (request: Request) => {
  const ip =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("x-forwarded-for") ||
    "unknown";
  const now = Date.now();
  const current = requestLog.get(ip);

  if (!current || current.resetAt < now) {
    requestLog.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return true;
  }

  current.count += 1;
  requestLog.set(ip, current);
  return current.count <= maxRequestsPerWindow;
};

export const onRequestOptions = () =>
  new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });

export const onRequestPost = async ({ request, env }: PagesContext) => {
  try {
    if (!checkRateLimit(request)) {
      return json(
        {
          ok: false,
          message: "Too many attempts. Please wait a moment and try again.",
        },
        { status: 429 },
      );
    }

    const payload = await parseOnboardingRequest(request);
    validateOnboardingPayload(payload);
    await verifyTurnstileIfEnabled(env, payload.turnstileToken, request);

    const submission = createSubmission(payload);
    await saveOnboardingSubmission(env, submission);

    try {
      await sendOnboardingNotification(env, submission);
    } catch (error) {
      console.error("Onboarding email notification failed", error);
    }

    return json({
      ok: true,
      submissionId: submission.submissionId,
    });
  } catch (error) {
    console.error("Onboarding submission failed", error);
    return json(
      {
        ok: false,
        message:
          "We could not submit your onboarding information right now. Please try again or contact Backend Brilliance directly.",
      },
      { status: 400 },
    );
  }
};
