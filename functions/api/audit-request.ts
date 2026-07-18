type Env = {
  EMAIL_PROVIDER_API_KEY?: string;
  EMAIL_FROM?: string;
};

type PagesContext = {
  request: Request;
  env: Env;
};

type AuditRequestPayload = {
  businessName?: unknown;
  websiteUrl?: unknown;
  phone?: unknown;
  email?: unknown;
  sourcePage?: unknown;
  companyWebsite?: unknown;
};

type AuditRequest = {
  businessName: string;
  websiteUrl: string;
  phone: string;
  email: string;
  sourcePage: string;
  submittedAt: string;
};

const auditRecipient = "backendbrilliance@gmail.com";
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

const sanitize = (value: unknown, maxLength = 180) =>
  typeof value === "string"
    ? value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength)
    : "";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const isValidPhone = (value: string) =>
  value.replace(/[^\d]/g, "").length >= 10;

const normalizeWebsiteUrl = (value: string) => {
  const trimmed = value.trim();
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  const url = new URL(withProtocol);
  if (!url.hostname.includes(".")) {
    throw new Error("invalid_website");
  }
  return url.toString();
};

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

const parsePayload = async (request: Request) => {
  try {
    return (await request.json()) as AuditRequestPayload;
  } catch {
    throw new Error("invalid_json");
  }
};

const validatePayload = (payload: AuditRequestPayload): AuditRequest => {
  if (sanitize(payload.companyWebsite)) {
    throw new Error("spam_detected");
  }

  const businessName = sanitize(payload.businessName, 120);
  const phone = sanitize(payload.phone, 40);
  const email = sanitize(payload.email, 120).toLowerCase();
  const sourcePage = sanitize(payload.sourcePage, 120) || "/";
  const rawWebsiteUrl = sanitize(payload.websiteUrl, 240);

  if (!businessName || !rawWebsiteUrl || !phone || !email) {
    throw new Error("validation_failed");
  }

  if (!isValidEmail(email)) {
    throw new Error("invalid_email");
  }

  if (!isValidPhone(phone)) {
    throw new Error("invalid_phone");
  }

  return {
    businessName,
    websiteUrl: normalizeWebsiteUrl(rawWebsiteUrl),
    phone,
    email,
    sourcePage,
    submittedAt: new Date().toISOString(),
  };
};

const sendAuditRequestEmail = async (env: Env, data: AuditRequest) => {
  if (!env.EMAIL_PROVIDER_API_KEY || !env.EMAIL_FROM) {
    throw new Error("email_not_configured");
  }

  const subject = `New Personalized Audit Request - ${data.businessName}`;
  const text = [
    `Business name: ${data.businessName}`,
    `Website URL: ${data.websiteUrl}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Submission timestamp: ${data.submittedAt}`,
    `Source page: ${data.sourcePage}`,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.EMAIL_PROVIDER_API_KEY}`,
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: auditRecipient,
      subject,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error("email_send_failed");
  }
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

    const payload = await parsePayload(request);
    const auditRequest = validatePayload(payload);
    await sendAuditRequestEmail(env, auditRequest);

    return json({
      ok: true,
      message: "Audit request received.",
    });
  } catch (error) {
    console.error("Personalized audit request failed", error);
    const errorMessage = error instanceof Error ? error.message : "";
    const isEmailConfigurationError = errorMessage === "email_not_configured";

    return json(
      {
        ok: false,
        message:
          isEmailConfigurationError
            ? "Audit request notifications are not configured yet. Please contact Backend Brilliance directly."
            : "We could not submit your request right now. Please try again or contact Backend Brilliance directly.",
      },
      { status: isEmailConfigurationError ? 503 : 400 },
    );
  }
};
