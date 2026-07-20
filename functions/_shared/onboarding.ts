type Env = {
  GOOGLE_SHEETS_WEBHOOK_URL?: string;
  GOOGLE_SHEETS_WEBHOOK_SECRET?: string;
  RESEND_API_KEY?: string;
  ONBOARDING_NOTIFICATION_TO?: string;
  ONBOARDING_NOTIFICATION_FROM?: string;
};

export type OnboardingPayload = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  currentWebsite: string;
  services: string;
  serviceArea: string;
  primaryGoal: string;
  preferredContactMethod: string;
  brandAssetsLink: string;
  additionalNotes: string;
  source: "Backend Brilliance Onboarding";
};

type SavedSubmission = {
  submissionId: string;
  submittedAt: string;
  status: "New";
  data: OnboardingPayload;
};

const requiredFields: Array<keyof OnboardingPayload> = [
  "businessName",
  "contactName",
  "email",
  "phone",
  "services",
  "serviceArea",
  "primaryGoal",
];

const asString = (value: unknown, maxLength = 1600) =>
  typeof value === "string"
    ? value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength)
    : "";

const isValidEmail = (value: unknown) =>
  typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const isValidPhone = (value: string) =>
  value.replace(/[^\d]/g, "").length >= 10;

export async function parseOnboardingRequest(request: Request) {
  try {
    return (await request.json()) as Record<string, unknown>;
  } catch {
    throw new Error("invalid_json");
  }
}

export function validateOnboardingPayload(
  payload: Record<string, unknown>,
): OnboardingPayload {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("missing_form_data");
  }

  const normalized: OnboardingPayload = {
    businessName: asString(payload.businessName, 160),
    contactName: asString(payload.contactName, 160),
    email: asString(payload.email, 180).toLowerCase(),
    phone: asString(payload.phone, 80),
    currentWebsite: asString(payload.currentWebsite, 320),
    services: asString(payload.services, 1600),
    serviceArea: asString(payload.serviceArea, 700),
    primaryGoal: asString(payload.primaryGoal, 200),
    preferredContactMethod: asString(payload.preferredContactMethod, 80),
    brandAssetsLink: asString(payload.brandAssetsLink, 500),
    additionalNotes: asString(payload.additionalNotes, 2000),
    source: "Backend Brilliance Onboarding",
  };

  const missing = requiredFields.filter((field) => !normalized[field]);

  if (missing.length > 0) {
    throw new Error("validation_failed");
  }

  if (!isValidEmail(normalized.email)) {
    throw new Error("invalid_email");
  }

  if (!isValidPhone(normalized.phone)) {
    throw new Error("invalid_phone");
  }

  return normalized;
}

export function createSubmission(data: OnboardingPayload): SavedSubmission {
  return {
    submissionId: `BB-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    submittedAt: new Date().toISOString(),
    status: "New",
    data,
  };
}

export function mapToWebhookPayload(
  env: Env,
  submission: SavedSubmission,
) {
  return {
    secret: env.GOOGLE_SHEETS_WEBHOOK_SECRET,
    timestamp: submission.submittedAt,
    status: submission.status,
    businessName: submission.data.businessName,
    contactName: submission.data.contactName,
    email: submission.data.email,
    phone: submission.data.phone,
    currentWebsite: submission.data.currentWebsite,
    services: submission.data.services,
    serviceArea: submission.data.serviceArea,
    primaryGoal: submission.data.primaryGoal,
    preferredContactMethod: submission.data.preferredContactMethod,
    brandAssetsLink: submission.data.brandAssetsLink,
    additionalNotes: submission.data.additionalNotes,
    source: submission.data.source,
  };
}

export async function saveOnboardingSubmission(
  env: Env,
  submission: SavedSubmission,
) {
  if (!env.GOOGLE_SHEETS_WEBHOOK_URL || !env.GOOGLE_SHEETS_WEBHOOK_SECRET) {
    throw new Error("google_sheets_not_configured");
  }

  const response = await fetch(env.GOOGLE_SHEETS_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.GOOGLE_SHEETS_WEBHOOK_SECRET}`,
    },
    body: JSON.stringify(mapToWebhookPayload(env, submission)),
  });

  let result: { success?: boolean; error?: string } = {};
  try {
    result = (await response.json()) as { success?: boolean; error?: string };
  } catch {
    result = {};
  }

  if (!response.ok || result.success !== true) {
    console.error("Google Sheets onboarding webhook failed", {
      status: response.status,
      statusText: response.statusText,
      webhookSuccess: result.success,
      webhookError: result.error,
    });
    throw new Error("google_sheets_save_failed");
  }
}

export async function sendOnboardingNotification(
  env: Env,
  submission: SavedSubmission,
) {
  if (
    !env.RESEND_API_KEY ||
    !env.ONBOARDING_NOTIFICATION_TO ||
    !env.ONBOARDING_NOTIFICATION_FROM
  ) {
    throw new Error("onboarding_email_not_configured");
  }

  const data = submission.data;
  const subject = `New Backend Brilliance Onboarding Submission — ${data.businessName}`;
  const text = [
    "A new onboarding form has been submitted.",
    "",
    `Business: ${data.businessName}`,
    `Contact: ${data.contactName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Website: ${data.currentWebsite || "Not provided"}`,
    `Services: ${data.services}`,
    `Service area: ${data.serviceArea}`,
    `Primary goal: ${data.primaryGoal}`,
    `Preferred contact method: ${data.preferredContactMethod || "Not provided"}`,
    `Brand assets: ${data.brandAssetsLink || "Not provided"}`,
    `Additional notes: ${data.additionalNotes || "Not provided"}`,
    "",
    "Review the full submission in the Backend Brilliance onboarding Google Sheet.",
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: env.ONBOARDING_NOTIFICATION_FROM,
      to: env.ONBOARDING_NOTIFICATION_TO,
      subject,
      text,
    }),
  });

  if (!response.ok) {
    let providerMessage = "";
    try {
      providerMessage = (await response.text()).slice(0, 300);
    } catch {
      providerMessage = "Could not read provider response.";
    }

    console.error("Onboarding email provider rejected request", {
      status: response.status,
      statusText: response.statusText,
      providerMessage,
    });

    throw new Error("onboarding_email_notification_failed");
  }
}
