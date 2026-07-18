type Env = {
  GOOGLE_SHEETS_WEBHOOK_URL?: string;
  GOOGLE_SHEETS_WEBHOOK_SECRET?: string;
  EMAIL_PROVIDER_API_KEY?: string;
  EMAIL_NOTIFICATION_TO?: string;
  EMAIL_FROM?: string;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_ENABLED?: string;
};

type OnboardingPayload = {
  selectedOffer?: string;
  formData?: Record<string, unknown>;
  honeypot?: string;
  turnstileToken?: string;
};

type SavedSubmission = {
  submissionId: string;
  submittedAt: string;
  selectedOffer: string;
  data: Record<string, unknown>;
};

const sheetHeaders = [
  "Submission ID",
  "Timestamp",
  "Status",
  "Selected Offer",
  "Business Name",
  "Contact Name",
  "Email",
  "Phone",
  "Preferred Contact Method",
  "Industry",
  "Website",
  "Domain",
  "Current Website Platform",
  "Business Address",
  "Service Area",
  "Business Description",
  "Primary Services",
  "Priority Service",
  "Highest-Revenue Service",
  "Promotions",
  "Pricing Information",
  "Financing Information",
  "Brand Colors",
  "Brand Style",
  "Brand Asset Link",
  "Booking Platform",
  "Booking URL",
  "Current CRM",
  "Lead Notification Email",
  "Lead Notification Phone",
  "Facebook",
  "Instagram",
  "TikTok",
  "LinkedIn",
  "YouTube",
  "Google Business Profile",
  "Goals",
  "Primary Goal",
  "Competitors",
  "Deadline",
  "Additional Notes",
];

const requiredFields = [
  "contactName",
  "businessName",
  "email",
  "phone",
  "preferredContactMethod",
  "industry",
  "primaryServiceArea",
  "businessDescription",
  "primaryServices",
  "highestPriorityService",
  "desiredStyle",
  "currentPlatform",
  "currentBookingPlatform",
  "leadNotificationEmail",
  "primaryGoal",
  "confirmation",
];

const asString = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  return typeof value === "string" ? value.trim() : "";
};

const isValidEmail = (value: unknown) =>
  typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export async function parseOnboardingRequest(request: Request) {
  try {
    return (await request.json()) as OnboardingPayload;
  } catch {
    throw new Error("invalid_json");
  }
}

export function validateOnboardingPayload(payload: OnboardingPayload) {
  if (payload.honeypot) {
    throw new Error("spam_detected");
  }

  if (!payload.formData || typeof payload.formData !== "object") {
    throw new Error("missing_form_data");
  }

  const missing = requiredFields.filter((field) => {
    const value = payload.formData?.[field];
    if (typeof value === "boolean") {
      return value !== true;
    }
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return !asString(value);
  });

  if (missing.length > 0) {
    throw new Error("validation_failed");
  }

  if (!isValidEmail(payload.formData.email)) {
    throw new Error("invalid_email");
  }

  if (!isValidEmail(payload.formData.leadNotificationEmail)) {
    throw new Error("invalid_lead_email");
  }
}

export async function verifyTurnstileIfEnabled(
  env: Env,
  token: string | undefined,
  request: Request,
) {
  if (env.TURNSTILE_ENABLED !== "true") {
    return;
  }

  if (!env.TURNSTILE_SECRET_KEY || !token) {
    throw new Error("turnstile_missing");
  }

  const ip = request.headers.get("CF-Connecting-IP") || "";
  const body = new FormData();
  body.append("secret", env.TURNSTILE_SECRET_KEY);
  body.append("response", token);
  if (ip) {
    body.append("remoteip", ip);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
    },
  );
  const result = (await response.json()) as { success?: boolean };
  if (!result.success) {
    throw new Error("turnstile_failed");
  }
}

export function createSubmission(payload: OnboardingPayload): SavedSubmission {
  return {
    submissionId: `BB-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    submittedAt: new Date().toISOString(),
    selectedOffer: payload.selectedOffer || "Website Conversion System",
    data: payload.formData || {},
  };
}

export function mapToSheetRow(submission: SavedSubmission) {
  const data = submission.data;
  const competitors = [data.competitor1, data.competitor2, data.competitor3]
    .map(asString)
    .filter(Boolean)
    .join(" | ");

  return {
    headers: sheetHeaders,
    row: {
      "Submission ID": submission.submissionId,
      Timestamp: submission.submittedAt,
      Status: "New Client",
      "Selected Offer": submission.selectedOffer,
      "Business Name": asString(data.businessName),
      "Contact Name": asString(data.contactName),
      Email: asString(data.email),
      Phone: asString(data.phone),
      "Preferred Contact Method": asString(data.preferredContactMethod),
      Industry: asString(data.industry),
      Website: asString(data.currentWebsiteUrl),
      Domain: asString(data.domain),
      "Current Website Platform":
        asString(data.currentPlatform) === "Other"
          ? asString(data.currentPlatformOther)
          : asString(data.currentPlatform),
      "Business Address": asString(data.businessAddress),
      "Service Area": asString(data.primaryServiceArea),
      "Business Description": asString(data.businessDescription),
      "Primary Services": asString(data.primaryServices),
      "Priority Service": asString(data.highestPriorityService),
      "Highest-Revenue Service": asString(data.highestRevenueService),
      Promotions: asString(data.currentPromotions),
      "Pricing Information": asString(data.pricingInformation),
      "Financing Information": asString(data.financingInformation),
      "Brand Colors": asString(data.brandColors),
      "Brand Style": asString(data.visualDirections),
      "Brand Asset Link": asString(data.assetFolderLink),
      "Booking Platform":
        asString(data.currentBookingPlatform) === "Other"
          ? asString(data.currentBookingPlatformOther)
          : asString(data.currentBookingPlatform),
      "Booking URL": asString(data.bookingUrl),
      "Current CRM": asString(data.currentCrm),
      "Lead Notification Email": asString(data.leadNotificationEmail),
      "Lead Notification Phone": asString(data.leadNotificationPhone),
      Facebook: asString(data.facebook),
      Instagram: asString(data.instagram),
      TikTok: asString(data.tiktok),
      LinkedIn: asString(data.linkedin),
      YouTube: asString(data.youtube),
      "Google Business Profile": asString(data.googleBusinessProfile),
      Goals: asString(data.goals),
      "Primary Goal": asString(data.primaryGoal),
      Competitors: competitors,
      Deadline: asString(data.importantDeadlines),
      "Additional Notes": asString(data.additionalInformation),
    },
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
    body: JSON.stringify({
      ...mapToSheetRow(submission),
      secret: env.GOOGLE_SHEETS_WEBHOOK_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error("google_sheets_save_failed");
  }
}

export async function sendOnboardingNotification(
  env: Env,
  submission: SavedSubmission,
) {
  if (!env.EMAIL_PROVIDER_API_KEY || !env.EMAIL_NOTIFICATION_TO || !env.EMAIL_FROM) {
    console.warn("Email notification skipped: provider is not configured.");
    return;
  }

  const data = submission.data;
  const subject = `New Website Conversion System Client — ${asString(data.businessName)}`;
  const text = [
    `Submission ID: ${submission.submissionId}`,
    `Submission time: ${submission.submittedAt}`,
    `Business name: ${asString(data.businessName)}`,
    `Contact name: ${asString(data.contactName)}`,
    `Email: ${asString(data.email)}`,
    `Phone: ${asString(data.phone)}`,
    `Website: ${asString(data.currentWebsiteUrl)}`,
    `Current platform: ${asString(data.currentPlatform)}`,
    `Booking platform: ${asString(data.currentBookingPlatform)}`,
    `Primary service: ${asString(data.highestPriorityService)}`,
    `Main goal: ${asString(data.primaryGoal)}`,
    `Asset-folder link: ${asString(data.assetFolderLink)}`,
    `Additional notes: ${asString(data.additionalInformation)}`,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.EMAIL_PROVIDER_API_KEY}`,
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: env.EMAIL_NOTIFICATION_TO,
      subject,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error("email_notification_failed");
  }
}
