import {
  createSubmission,
  parseOnboardingRequest,
  saveOnboardingSubmission,
  sendOnboardingNotification,
  validateOnboardingPayload,
} from "../_shared/onboarding";

type Env = {
  GOOGLE_SHEETS_WEBHOOK_URL?: string;
  GOOGLE_SHEETS_WEBHOOK_SECRET?: string;
  RESEND_API_KEY?: string;
  ONBOARDING_NOTIFICATION_TO?: string;
  ONBOARDING_NOTIFICATION_FROM?: string;
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
    const onboardingData = validateOnboardingPayload(payload);
    const submission = createSubmission(onboardingData);
    await saveOnboardingSubmission(env, submission);

    let emailNotificationSent = true;
    try {
      await sendOnboardingNotification(env, submission);
    } catch (error) {
      emailNotificationSent = false;
      console.error("Onboarding email notification failed", error);
    }

    return json({
      success: true,
      ok: true,
      saved: true,
      emailNotificationSent,
      submissionId: submission.submissionId,
      message: emailNotificationSent
        ? "Onboarding information submitted successfully."
        : "Onboarding information was saved, but the internal email notification was not sent.",
    });
  } catch (error) {
    console.error("Onboarding submission failed", error);
    return json(
      {
        success: false,
        ok: false,
        saved: false,
        message:
          "We could not submit your onboarding information right now. Please try again or contact Backend Brilliance directly.",
      },
      { status: 400 },
    );
  }
};
