type Env = {
  RESEND_API_KEY?: string;
  AUDIT_NOTIFICATION_TO?: string;
  AUDIT_NOTIFICATION_FROM?: string;
  EMAIL_PROVIDER_API_KEY?: string;
  EMAIL_NOTIFICATION_TO?: string;
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
  pageUrl?: unknown;
  queryString?: unknown;
  companyWebsite?: unknown;
};

type AuditRequest = {
  businessName: string;
  websiteUrl: string;
  phone: string;
  email: string;
  sourcePage: string;
  pageUrl: string;
  queryString: string;
  trackingDetails: string;
  submittedAt: string;
  userAgent: string;
};

type EmailConfig = {
  apiKey: string;
  to: string;
  from: string;
};

const fallbackAuditRecipient = "backendbrilliance@gmail.com";
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

  if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".")) {
    throw new Error("INVALID_WEBSITE");
  }

  return url.toString();
};

const extractTrackingDetails = (pageUrl: string, queryString: string) => {
  const params = new URLSearchParams();

  const addParams = (value: string) => {
    if (!value) {
      return;
    }

    try {
      const parsed = value.startsWith("?")
        ? new URLSearchParams(value)
        : new URL(value).searchParams;
      parsed.forEach((paramValue, key) => params.set(key, paramValue));
    } catch {
      if (value.includes("=")) {
        const parsed = new URLSearchParams(value.startsWith("?") ? value : `?${value}`);
        parsed.forEach((paramValue, key) => params.set(key, paramValue));
      }
    }
  };

  addParams(pageUrl);
  addParams(queryString);

  const allowedKeys = [
    "business",
    "audit",
    "source",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
  ];

  return allowedKeys
    .map((key) => {
      const value = sanitize(params.get(key), 160);
      return value ? `${key}: ${value}` : "";
    })
    .filter(Boolean)
    .join("\n");
};

const getEmailConfig = (env: Env): EmailConfig => {
  const apiKey = env.RESEND_API_KEY || env.EMAIL_PROVIDER_API_KEY || "";
  const to =
    env.AUDIT_NOTIFICATION_TO ||
    env.EMAIL_NOTIFICATION_TO ||
    fallbackAuditRecipient;
  const from = env.AUDIT_NOTIFICATION_FROM || env.EMAIL_FROM || "";

  if (!apiKey || !from || !to) {
    throw new Error("EMAIL_NOT_CONFIGURED");
  }

  return { apiKey, to, from };
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
    throw new Error("INVALID_JSON");
  }
};

const validatePayload = (
  payload: AuditRequestPayload,
  request: Request,
): AuditRequest => {
  if (sanitize(payload.companyWebsite)) {
    throw new Error("SPAM_DETECTED");
  }

  const businessName = sanitize(payload.businessName, 120);
  const phone = sanitize(payload.phone, 40);
  const email = sanitize(payload.email, 120).toLowerCase();
  const sourcePage = sanitize(payload.sourcePage, 200) || "/";
  const pageUrl = sanitize(payload.pageUrl, 500);
  const queryString = sanitize(payload.queryString, 500);
  const rawWebsiteUrl = sanitize(payload.websiteUrl, 240);

  if (!businessName || !rawWebsiteUrl || !phone || !email) {
    throw new Error("VALIDATION_FAILED");
  }

  if (!isValidEmail(email)) {
    throw new Error("INVALID_EMAIL");
  }

  if (!isValidPhone(phone)) {
    throw new Error("INVALID_PHONE");
  }

  return {
    businessName,
    websiteUrl: normalizeWebsiteUrl(rawWebsiteUrl),
    phone,
    email,
    sourcePage,
    pageUrl,
    queryString,
    trackingDetails: extractTrackingDetails(pageUrl, queryString),
    submittedAt: new Date().toISOString(),
    userAgent: sanitize(request.headers.get("user-agent"), 320),
  };
};

const createEmailBody = (data: AuditRequest) =>
  [
    "New personalized audit request",
    "",
    `Business name: ${data.businessName}`,
    `Website URL: ${data.websiteUrl}`,
    `Phone number: ${data.phone}`,
    `Email address: ${data.email}`,
    `Submission timestamp: ${data.submittedAt}`,
    `Source page: ${data.sourcePage}`,
    data.pageUrl ? `Full page URL: ${data.pageUrl}` : "",
    data.userAgent ? `User agent: ${data.userAgent}` : "",
    data.trackingDetails ? "" : "",
    data.trackingDetails ? "Tracking / query parameters:" : "",
    data.trackingDetails,
  ]
    .filter((line) => line !== "")
    .join("\n");

const sendAuditRequestEmail = async (env: Env, data: AuditRequest) => {
  const emailConfig = getEmailConfig(env);
  const subject = `New Personalized Audit Request — ${data.businessName}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${emailConfig.apiKey}`,
    },
    body: JSON.stringify({
      from: emailConfig.from,
      to: emailConfig.to,
      subject,
      text: createEmailBody(data),
    }),
  });

  if (!response.ok) {
    let providerMessage = "";
    try {
      providerMessage = (await response.text()).slice(0, 300);
    } catch {
      providerMessage = "Could not read provider response.";
    }

    console.error("Audit email provider rejected request", {
      status: response.status,
      statusText: response.statusText,
      providerMessage,
    });

    throw new Error("EMAIL_SEND_FAILED");
  }
};

const errorResponse = (error: unknown) => {
  const code = error instanceof Error ? error.message : "UNKNOWN_ERROR";

  if (code === "EMAIL_NOT_CONFIGURED") {
    return json(
      {
        success: false,
        ok: false,
        code: "EMAIL_NOT_CONFIGURED",
        message: "Audit notifications are temporarily unavailable.",
      },
      { status: 503 },
    );
  }

  if (code === "SPAM_DETECTED") {
    return json(
      {
        success: false,
        ok: false,
        code: "SPAM_DETECTED",
        message: "We could not submit your request right now.",
      },
      { status: 400 },
    );
  }

  const validationCodes = new Set([
    "INVALID_JSON",
    "VALIDATION_FAILED",
    "INVALID_EMAIL",
    "INVALID_PHONE",
    "INVALID_WEBSITE",
  ]);

  if (validationCodes.has(code)) {
    return json(
      {
        success: false,
        ok: false,
        code,
        message: "Please check your information and try again.",
      },
      { status: 400 },
    );
  }

  return json(
    {
      success: false,
      ok: false,
      code: "EMAIL_SEND_FAILED",
      message: "Audit notifications are temporarily unavailable.",
    },
    { status: 502 },
  );
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
          success: false,
          ok: false,
          code: "RATE_LIMITED",
          message: "Too many attempts. Please wait a moment and try again.",
        },
        { status: 429 },
      );
    }

    const payload = await parsePayload(request);
    const auditRequest = validatePayload(payload, request);
    await sendAuditRequestEmail(env, auditRequest);

    return json({
      success: true,
      ok: true,
      message: "Your personalized audit request has been received.",
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : "UNKNOWN_ERROR";
    console.error("Personalized audit request failed", { code });
    return errorResponse(error);
  }
};
