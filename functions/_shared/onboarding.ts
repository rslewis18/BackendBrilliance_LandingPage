type Env = {
  GOOGLE_SHEETS_WEBHOOK_URL?: string;
  GOOGLE_SHEETS_WEBHOOK_SECRET?: string;
  RESEND_API_KEY?: string;
  ONBOARDING_NOTIFICATION_TO?: string;
  ONBOARDING_NOTIFICATION_FROM?: string;
};

export type OnboardingPayload = {
  selectedService: string;
  customService: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessWebsite: string;
  businessAddress: string;
  serviceArea: string;
  industry: string;
  primaryGoals: string[];
  primaryGoalOther: string;
  currentSetup: string;
  businessHours: string;
  callServices: string;
  currentBusinessPhone: string;
  practiceAreas: string;
  jurisdictionsServed: string;
  consultationProcess: string;
  consultationBookingLink: string;
  intakeQuestions: string;
  qualificationCriteria: string;
  legalRoutingRules: string;
  legalEscalationRules: string;
  existingPhoneSystem: string;
  caseManagementPlatform: string;
  afterHoursAnswering: string;
  informationToCollect: string;
  requestHandling: string;
  schedulingPreferences: string;
  customerFaqs: string;
  urgentInstructions: string;
  receptionistTone: string;
  notificationPreferences: string;
  specialCallInstructions: string;
  websiteUrl: string;
  mainOffer: string;
  targetCustomer: string;
  conversionGoal: string;
  currentLeadMethod: string;
  existingFormsBooking: string;
  desiredCta: string;
  brandAssetsAvailability: string;
  websiteAccessNotes: string;
  knownWebsiteIssues: string;
  referenceSites: string;
  trackingAnalytics: string;
  currentCrm: string;
  workflowToAutomate: string;
  leadSources: string;
  followUpChannels: string[];
  currentFollowUpProcess: string;
  automationTrigger: string;
  automationOutcome: string;
  calendarSystem: string;
  automationTools: string;
  teamMembers: string;
  neverAutomate: string;
  reviewPlatforms: string;
  googleBusinessProfileLink: string;
  reviewRequestProcess: string;
  reviewTiming: string;
  reviewChannel: string;
  customerListSource: string;
  negativeFeedbackRouting: string;
  reviewNotificationContact: string;
  reputationTools: string;
  customPurchase: string;
  customGoal: string;
  customSystems: string;
  customSuccess: string;
  customDeadlines: string;
  customNotes: string;
  systemsInvolved: string[];
  systemsOther: string;
  accessNotes: string;
  primaryEmail: string;
  primaryPhone: string;
  preferredContactMethod: string;
  bestContactTime: string;
  additionalTeamContact: string;
  finalNotes: string;
  source: "Backend Brilliance Onboarding";
};

type SavedSubmission = {
  submissionId: string;
  submittedAt: string;
  status: "New";
  data: OnboardingPayload;
};

const validServices = [
  "AI Receptionist",
  "AI Legal Intake System",
  "Lead Follow-Up Automation",
  "Website Conversion System",
  "Local Visibility / SEO",
  "Review Growth",
  "Customer Reactivation",
  "Lead Generation",
  "Content Creation System",
  "Paid Advertising",
  "Property Marketing",
  "Business Process Automation",
  "Other / Custom Solution",
];

const asString = (value: unknown, maxLength = 2200) =>
  typeof value === "string"
    ? value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength)
    : "";

const asStringList = (value: unknown, maxLength = 80) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => asString(item, maxLength))
    .filter(Boolean)
    .slice(0, 20);
};

const isValidEmail = (value: unknown) =>
  typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const isValidPhone = (value: string) =>
  value.replace(/[^\d]/g, "").length >= 10;

const joinList = (value: string[]) => value.join(", ");

const compactObject = (input: Record<string, string | string[]>) =>
  Object.fromEntries(
    Object.entries(input).filter(([, value]) =>
      Array.isArray(value) ? value.length > 0 : Boolean(value),
    ),
  );

const stringifyDetails = (details: Record<string, string | string[]>) => {
  const compacted = compactObject(details);
  return Object.keys(compacted).length > 0
    ? JSON.stringify(compacted, null, 2)
    : "";
};

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

  const selectedService = asString(payload.selectedService, 120);

  const normalized: OnboardingPayload = {
    selectedService: validServices.includes(selectedService)
      ? selectedService
      : selectedService || "Other",
    customService: asString(payload.customService, 220),
    businessName: asString(payload.businessName, 180),
    contactName: asString(payload.contactName, 180),
    email: asString(payload.email, 180).toLowerCase(),
    phone: asString(payload.phone, 80),
    businessWebsite: asString(payload.businessWebsite, 360),
    businessAddress: asString(payload.businessAddress, 360),
    serviceArea: asString(payload.serviceArea, 360),
    industry: asString(payload.industry, 160),
    primaryGoals: asStringList(payload.primaryGoals, 120),
    primaryGoalOther: asString(payload.primaryGoalOther, 300),
    currentSetup: asString(payload.currentSetup, 2200),
    businessHours: asString(payload.businessHours, 300),
    callServices: asString(payload.callServices, 1800),
    currentBusinessPhone: asString(payload.currentBusinessPhone, 80),
    practiceAreas: asString(payload.practiceAreas, 1800),
    jurisdictionsServed: asString(payload.jurisdictionsServed, 700),
    consultationProcess: asString(payload.consultationProcess, 1800),
    consultationBookingLink: asString(payload.consultationBookingLink, 500),
    intakeQuestions: asString(payload.intakeQuestions, 2200),
    qualificationCriteria: asString(payload.qualificationCriteria, 1800),
    legalRoutingRules: asString(payload.legalRoutingRules, 1800),
    legalEscalationRules: asString(payload.legalEscalationRules, 1800),
    existingPhoneSystem: asString(payload.existingPhoneSystem, 500),
    caseManagementPlatform: asString(payload.caseManagementPlatform, 500),
    afterHoursAnswering: asString(payload.afterHoursAnswering, 80),
    informationToCollect: asString(payload.informationToCollect, 1800),
    requestHandling: asString(payload.requestHandling, 1800),
    schedulingPreferences: asString(payload.schedulingPreferences, 1800),
    customerFaqs: asString(payload.customerFaqs, 2200),
    urgentInstructions: asString(payload.urgentInstructions, 1800),
    receptionistTone: asString(payload.receptionistTone, 120),
    notificationPreferences: asString(payload.notificationPreferences, 1200),
    specialCallInstructions: asString(payload.specialCallInstructions, 1800),
    websiteUrl: asString(payload.websiteUrl, 360),
    mainOffer: asString(payload.mainOffer, 500),
    targetCustomer: asString(payload.targetCustomer, 500),
    conversionGoal: asString(payload.conversionGoal, 500),
    currentLeadMethod: asString(payload.currentLeadMethod, 500),
    existingFormsBooking: asString(payload.existingFormsBooking, 500),
    desiredCta: asString(payload.desiredCta, 220),
    brandAssetsAvailability: asString(payload.brandAssetsAvailability, 140),
    websiteAccessNotes: asString(payload.websiteAccessNotes, 1800),
    knownWebsiteIssues: asString(payload.knownWebsiteIssues, 1800),
    referenceSites: asString(payload.referenceSites, 1800),
    trackingAnalytics: asString(payload.trackingAnalytics, 1200),
    currentCrm: asString(payload.currentCrm, 300),
    workflowToAutomate: asString(payload.workflowToAutomate, 800),
    leadSources: asString(payload.leadSources, 1200),
    followUpChannels: asStringList(payload.followUpChannels, 80),
    currentFollowUpProcess: asString(payload.currentFollowUpProcess, 1800),
    automationTrigger: asString(payload.automationTrigger, 500),
    automationOutcome: asString(payload.automationOutcome, 500),
    calendarSystem: asString(payload.calendarSystem, 300),
    automationTools: asString(payload.automationTools, 500),
    teamMembers: asString(payload.teamMembers, 1000),
    neverAutomate: asString(payload.neverAutomate, 1200),
    reviewPlatforms: asString(payload.reviewPlatforms, 500),
    googleBusinessProfileLink: asString(payload.googleBusinessProfileLink, 500),
    reviewRequestProcess: asString(payload.reviewRequestProcess, 1800),
    reviewTiming: asString(payload.reviewTiming, 500),
    reviewChannel: asString(payload.reviewChannel, 100),
    customerListSource: asString(payload.customerListSource, 800),
    negativeFeedbackRouting: asString(payload.negativeFeedbackRouting, 80),
    reviewNotificationContact: asString(payload.reviewNotificationContact, 300),
    reputationTools: asString(payload.reputationTools, 500),
    customPurchase: asString(payload.customPurchase, 1200),
    customGoal: asString(payload.customGoal, 1200),
    customSystems: asString(payload.customSystems, 1200),
    customSuccess: asString(payload.customSuccess, 1200),
    customDeadlines: asString(payload.customDeadlines, 500),
    customNotes: asString(payload.customNotes, 1800),
    systemsInvolved: asStringList(payload.systemsInvolved, 120),
    systemsOther: asString(payload.systemsOther, 300),
    accessNotes: asString(payload.accessNotes, 1800),
    primaryEmail: asString(payload.primaryEmail, 180).toLowerCase(),
    primaryPhone: asString(payload.primaryPhone, 80),
    preferredContactMethod: asString(payload.preferredContactMethod, 80),
    bestContactTime: asString(payload.bestContactTime, 180),
    additionalTeamContact: asString(payload.additionalTeamContact, 700),
    finalNotes: asString(payload.finalNotes, 2200),
    source: "Backend Brilliance Onboarding",
  };

  const missingSharedFields = [
    "selectedService",
    "businessName",
    "contactName",
    "email",
    "phone",
    "serviceArea",
    "industry",
    "currentSetup",
    "preferredContactMethod",
  ].filter((field) => !normalized[field as keyof OnboardingPayload]);

  if (normalized.primaryGoals.length === 0) {
    missingSharedFields.push("primaryGoals");
  }

  if (
    normalized.selectedService === "Other / Custom Solution" &&
    !normalized.customService
  ) {
    missingSharedFields.push("customService");
  }

  if (missingSharedFields.length > 0) {
    throw new Error("validation_failed");
  }

  if (!isValidEmail(normalized.email)) {
    throw new Error("invalid_email");
  }

  if (!isValidPhone(normalized.phone)) {
    throw new Error("invalid_phone");
  }

  if (normalized.primaryEmail && !isValidEmail(normalized.primaryEmail)) {
    throw new Error("invalid_primary_email");
  }

  if (normalized.primaryPhone && !isValidPhone(normalized.primaryPhone)) {
    throw new Error("invalid_primary_phone");
  }

  normalized.primaryEmail = normalized.primaryEmail || normalized.email;
  normalized.primaryPhone = normalized.primaryPhone || normalized.phone;

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

function getServiceSpecificDetails(data: OnboardingPayload) {
  if (data.selectedService === "AI Receptionist") {
    return stringifyDetails({
      businessHours: data.businessHours,
      callServices: data.callServices,
      currentBusinessPhone: data.currentBusinessPhone,
      afterHoursAnswering: data.afterHoursAnswering,
      informationToCollect: data.informationToCollect,
      requestHandling: data.requestHandling,
      schedulingPreferences: data.schedulingPreferences,
      customerFaqs: data.customerFaqs,
      urgentInstructions: data.urgentInstructions,
      receptionistTone: data.receptionistTone,
      notificationPreferences: data.notificationPreferences,
      specialCallInstructions: data.specialCallInstructions,
    });
  }

  if (data.selectedService === "AI Legal Intake System") {
    return stringifyDetails({
      practiceAreas: data.practiceAreas,
      jurisdictionsServed: data.jurisdictionsServed,
      businessHours: data.businessHours,
      consultationProcess: data.consultationProcess,
      consultationBookingLink: data.consultationBookingLink,
      intakeQuestions: data.intakeQuestions,
      qualificationCriteria: data.qualificationCriteria,
      legalRoutingRules: data.legalRoutingRules,
      legalEscalationRules: data.legalEscalationRules,
      existingPhoneSystem: data.existingPhoneSystem,
      caseManagementPlatform: data.caseManagementPlatform,
    });
  }

  if (
    data.selectedService === "Website Conversion System" ||
    data.selectedService === "Local Visibility / SEO" ||
    data.selectedService === "Lead Generation" ||
    data.selectedService === "Paid Advertising" ||
    data.selectedService === "Property Marketing"
  ) {
    return stringifyDetails({
      websiteUrl: data.websiteUrl,
      mainOffer: data.mainOffer,
      targetCustomer: data.targetCustomer,
      conversionGoal: data.conversionGoal,
      currentLeadMethod: data.currentLeadMethod,
      existingFormsBooking: data.existingFormsBooking,
      desiredCta: data.desiredCta,
      brandAssetsAvailability: data.brandAssetsAvailability,
      websiteAccessNotes: data.websiteAccessNotes,
      knownWebsiteIssues: data.knownWebsiteIssues,
      referenceSites: data.referenceSites,
      trackingAnalytics: data.trackingAnalytics,
    });
  }

  if (
    data.selectedService === "Lead Follow-Up Automation" ||
    data.selectedService === "Customer Reactivation" ||
    data.selectedService === "Business Process Automation" ||
    data.selectedService === "Content Creation System"
  ) {
    return stringifyDetails({
      currentCrm: data.currentCrm,
      workflowToAutomate: data.workflowToAutomate,
      leadSources: data.leadSources,
      followUpChannels: data.followUpChannels,
      currentFollowUpProcess: data.currentFollowUpProcess,
      automationTrigger: data.automationTrigger,
      automationOutcome: data.automationOutcome,
      calendarSystem: data.calendarSystem,
      automationTools: data.automationTools,
      teamMembers: data.teamMembers,
      neverAutomate: data.neverAutomate,
    });
  }

  if (data.selectedService === "Review Growth") {
    return stringifyDetails({
      reviewPlatforms: data.reviewPlatforms,
      googleBusinessProfileLink: data.googleBusinessProfileLink,
      reviewRequestProcess: data.reviewRequestProcess,
      reviewTiming: data.reviewTiming,
      reviewChannel: data.reviewChannel,
      customerListSource: data.customerListSource,
      negativeFeedbackRouting: data.negativeFeedbackRouting,
      reviewNotificationContact: data.reviewNotificationContact,
      reputationTools: data.reputationTools,
    });
  }

  return stringifyDetails({
    customService: data.customService,
    customPurchase: data.customPurchase,
    customGoal: data.customGoal,
    customSystems: data.customSystems,
    customSuccess: data.customSuccess,
    customDeadlines: data.customDeadlines,
    customNotes: data.customNotes,
  });
}

function getServicesSummary(data: OnboardingPayload) {
  return (
    data.callServices ||
    data.practiceAreas ||
    data.mainOffer ||
    data.workflowToAutomate ||
    data.reviewPlatforms ||
    data.customPurchase ||
    data.customService ||
    data.selectedService
  );
}

export function mapToWebhookPayload(env: Env, submission: SavedSubmission) {
  const data = submission.data;
  const serviceSpecificDetails = getServiceSpecificDetails(data);
  const primaryGoals = joinList(data.primaryGoals);
  const systemsInvolved = joinList(
    data.systemsInvolved.includes("Other") && data.systemsOther
      ? [...data.systemsInvolved, data.systemsOther]
      : data.systemsInvolved,
  );

  return {
    secret: env.GOOGLE_SHEETS_WEBHOOK_SECRET,
    timestamp: submission.submittedAt,
    status: submission.status,
    submissionId: submission.submissionId,
    selectedService: data.selectedService,
    servicePurchased: data.selectedService,
    customService: data.customService,
    businessName: data.businessName,
    contactName: data.contactName,
    email: data.email,
    phone: data.phone,
    businessWebsite: data.businessWebsite,
    businessAddress: data.businessAddress,
    serviceArea: data.serviceArea,
    industry: data.industry,
    primaryGoals,
    primaryGoal: primaryGoals,
    primaryGoalOther: data.primaryGoalOther,
    currentProblem: data.currentSetup,
    currentSetup: data.currentSetup,
    serviceSpecificDetails,
    serviceSpecificData: serviceSpecificDetails,
    systemsInvolved,
    accessNotes: data.accessNotes,
    primaryEmail: data.primaryEmail,
    primaryPhone: data.primaryPhone,
    preferredContactMethod: data.preferredContactMethod,
    bestContactTime: data.bestContactTime,
    additionalTeamContact: data.additionalTeamContact,
    finalNotes: data.finalNotes,
    universalNotes: data.finalNotes,
    source: data.source,

    // Backward-compatible aliases for the previous short intake Apps Script.
    currentWebsite: data.businessWebsite || data.websiteUrl,
    services: getServicesSummary(data),
    brandAssetsLink: data.brandAssetsAvailability,
    additionalNotes: data.finalNotes || data.customNotes,
    addressOrServiceArea: data.businessAddress || data.serviceArea,
    submissionStatus: submission.status,
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
  const serviceSpecificDetails = getServiceSpecificDetails(data);
  const subject = `New Backend Brilliance Onboarding Submission - ${data.businessName}`;
  const text = [
    "A new Backend Brilliance business intake has been submitted.",
    "",
    `Service / solution: ${data.selectedService}`,
    data.customService ? `Custom service: ${data.customService}` : "",
    "",
    `Business: ${data.businessName}`,
    `Contact: ${data.contactName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Website: ${data.businessWebsite || "Not provided"}`,
    `Address: ${data.businessAddress || "Not provided"}`,
    `Service area: ${data.serviceArea}`,
    `Industry: ${data.industry}`,
    "",
    `Primary goals: ${joinList(data.primaryGoals)}`,
    data.primaryGoalOther ? `Other goal: ${data.primaryGoalOther}` : "",
    `Current setup: ${data.currentSetup}`,
    "",
    serviceSpecificDetails
      ? `Service-specific details:\n${serviceSpecificDetails}`
      : "Service-specific details: Not provided",
    "",
    `Systems involved: ${joinList(data.systemsInvolved) || "Not provided"}`,
    `Access notes: ${data.accessNotes || "Not provided"}`,
    "",
    `Primary email: ${data.primaryEmail}`,
    `Primary phone: ${data.primaryPhone}`,
    `Preferred contact method: ${data.preferredContactMethod}`,
    `Best time to contact: ${data.bestContactTime || "Not provided"}`,
    `Additional team contact: ${data.additionalTeamContact || "Not provided"}`,
    `Final notes: ${data.finalNotes || "Not provided"}`,
    "",
    "Review the full submission in the Backend Brilliance onboarding Google Sheet.",
  ]
    .filter((line) => line !== "")
    .join("\n");

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
