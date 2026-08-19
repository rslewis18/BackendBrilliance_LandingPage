import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { PageMeta } from "../components/PageMeta";
import { SimpleHeader } from "../components/SimpleHeader";
import { OFFER_CONFIG } from "../config/offers";
import { trackEvent } from "../utils/tracking";

type ServiceOption =
  | "AI Receptionist"
  | "AI Legal Intake System"
  | "Lead Follow-Up Automation"
  | "Website Conversion System"
  | "Local Visibility / SEO"
  | "Review Growth"
  | "Customer Reactivation"
  | "Lead Generation"
  | "Content Creation System"
  | "Paid Advertising"
  | "Property Marketing"
  | "Business Process Automation"
  | "Other / Custom Solution";

type OnboardingData = {
  selectedService: ServiceOption | "";
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

type StringField = Exclude<
  keyof OnboardingData,
  "primaryGoals" | "followUpChannels" | "systemsInvolved" | "source"
>;
type ArrayField = "primaryGoals" | "followUpChannels" | "systemsInvolved";
type FieldErrors = Partial<Record<keyof OnboardingData | "form", string>>;

const serviceOptions: ServiceOption[] = [
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

const goalOptions = [
  "Capture more leads",
  "Respond to customers faster",
  "Improve follow-up",
  "Reduce missed opportunities",
  "Improve website conversions",
  "Generate more reviews",
  "Automate repetitive tasks",
  "Improve customer experience",
  "Other",
];

const platformOptions = [
  "Website platform",
  "CRM",
  "Email platform",
  "Calendar",
  "Phone system",
  "Google Business Profile",
  "Stripe",
  "HighLevel",
  "Other",
];

const communicationOptions = ["Email", "Phone", "SMS", "Other"];
const yesNoOptions = ["Yes", "No", "Not sure"];
const followUpChannelOptions = ["Email", "SMS", "Phone", "Other"];

const steps = [
  "Service + Business",
  "Goals + Current Setup",
  "Service Details",
  "Systems + Access",
  "Communication + Notes",
  "Review + Submit",
];

const initialData: OnboardingData = {
  selectedService: "",
  customService: "",
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  businessWebsite: "",
  businessAddress: "",
  serviceArea: "",
  industry: "",
  primaryGoals: [],
  primaryGoalOther: "",
  currentSetup: "",
  businessHours: "",
  callServices: "",
  currentBusinessPhone: "",
  practiceAreas: "",
  jurisdictionsServed: "",
  consultationProcess: "",
  consultationBookingLink: "",
  intakeQuestions: "",
  qualificationCriteria: "",
  legalRoutingRules: "",
  legalEscalationRules: "",
  existingPhoneSystem: "",
  caseManagementPlatform: "",
  afterHoursAnswering: "",
  informationToCollect: "",
  requestHandling: "",
  schedulingPreferences: "",
  customerFaqs: "",
  urgentInstructions: "",
  receptionistTone: "",
  notificationPreferences: "",
  specialCallInstructions: "",
  websiteUrl: "",
  mainOffer: "",
  targetCustomer: "",
  conversionGoal: "",
  currentLeadMethod: "",
  existingFormsBooking: "",
  desiredCta: "",
  brandAssetsAvailability: "",
  websiteAccessNotes: "",
  knownWebsiteIssues: "",
  referenceSites: "",
  trackingAnalytics: "",
  currentCrm: "",
  workflowToAutomate: "",
  leadSources: "",
  followUpChannels: [],
  currentFollowUpProcess: "",
  automationTrigger: "",
  automationOutcome: "",
  calendarSystem: "",
  automationTools: "",
  teamMembers: "",
  neverAutomate: "",
  reviewPlatforms: "",
  googleBusinessProfileLink: "",
  reviewRequestProcess: "",
  reviewTiming: "",
  reviewChannel: "",
  customerListSource: "",
  negativeFeedbackRouting: "",
  reviewNotificationContact: "",
  reputationTools: "",
  customPurchase: "",
  customGoal: "",
  customSystems: "",
  customSuccess: "",
  customDeadlines: "",
  customNotes: "",
  systemsInvolved: [],
  systemsOther: "",
  accessNotes: "",
  primaryEmail: "",
  primaryPhone: "",
  preferredContactMethod: "",
  bestContactTime: "",
  additionalTeamContact: "",
  finalNotes: "",
  source: "Backend Brilliance Onboarding",
};

const fieldLabels: Partial<Record<keyof OnboardingData, string>> = {
  selectedService: "Service or solution",
  customService: "Custom solution",
  businessName: "Business name",
  contactName: "Primary contact name",
  email: "Email address",
  phone: "Phone number",
  serviceArea: "Primary service area / market",
  industry: "Industry / business type",
  primaryGoals: "Primary goal",
  currentSetup: "Current setup",
  preferredContactMethod: "Preferred communication method",
};

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const isValidPhone = (value: string) =>
  value.replace(/[^\d]/g, "").length >= 10;

function serviceFromParam(value: string | null): ServiceOption | "" {
  const normalized = (value || "").toLowerCase().replace(/[^a-z0-9]/g, "");

  if (!normalized) {
    return "";
  }

  if (normalized.includes("ai") || normalized.includes("receptionist")) {
    return "AI Receptionist";
  }

  if (normalized.includes("legal") || normalized.includes("law")) {
    return "AI Legal Intake System";
  }

  if (
    normalized.includes("website") ||
    normalized.includes("conversion") ||
    normalized.includes("clientcapture")
  ) {
    return "Website Conversion System";
  }

  if (normalized.includes("automation") || normalized.includes("followup")) {
    return "Lead Follow-Up Automation";
  }

  if (
    normalized.includes("reputation") ||
    normalized.includes("review") ||
    normalized.includes("google")
  ) {
    return "Review Growth";
  }

  if (normalized.includes("seo") || normalized.includes("visibility")) {
    return "Local Visibility / SEO";
  }

  if (normalized.includes("reactivation")) {
    return "Customer Reactivation";
  }

  if (normalized.includes("leadgeneration")) {
    return "Lead Generation";
  }

  if (normalized.includes("content")) {
    return "Content Creation System";
  }

  if (normalized.includes("advertising") || normalized.includes("paid")) {
    return "Paid Advertising";
  }

  if (normalized.includes("property")) {
    return "Property Marketing";
  }

  if (normalized.includes("process")) {
    return "Business Process Automation";
  }

  if (normalized.includes("custom")) {
    return "Other / Custom Solution";
  }

  return "Other / Custom Solution";
}

function makeInitialData(searchParams: URLSearchParams): OnboardingData {
  return {
    ...initialData,
    selectedService:
      serviceFromParam(searchParams.get("service")) ||
      serviceFromParam(searchParams.get("offer")),
  };
}

function trimValue(value: string) {
  return value.trim();
}

function normalizeData(data: OnboardingData): OnboardingData {
  return {
    ...data,
    selectedService: data.selectedService,
    customService: trimValue(data.customService),
    businessName: trimValue(data.businessName),
    contactName: trimValue(data.contactName),
    email: trimValue(data.email).toLowerCase(),
    phone: trimValue(data.phone),
    businessWebsite: trimValue(data.businessWebsite),
    businessAddress: trimValue(data.businessAddress),
    serviceArea: trimValue(data.serviceArea),
    industry: trimValue(data.industry),
    primaryGoals: data.primaryGoals.map(trimValue).filter(Boolean),
    primaryGoalOther: trimValue(data.primaryGoalOther),
    currentSetup: trimValue(data.currentSetup),
    businessHours: trimValue(data.businessHours),
    callServices: trimValue(data.callServices),
    currentBusinessPhone: trimValue(data.currentBusinessPhone),
    practiceAreas: trimValue(data.practiceAreas),
    jurisdictionsServed: trimValue(data.jurisdictionsServed),
    consultationProcess: trimValue(data.consultationProcess),
    consultationBookingLink: trimValue(data.consultationBookingLink),
    intakeQuestions: trimValue(data.intakeQuestions),
    qualificationCriteria: trimValue(data.qualificationCriteria),
    legalRoutingRules: trimValue(data.legalRoutingRules),
    legalEscalationRules: trimValue(data.legalEscalationRules),
    existingPhoneSystem: trimValue(data.existingPhoneSystem),
    caseManagementPlatform: trimValue(data.caseManagementPlatform),
    afterHoursAnswering: trimValue(data.afterHoursAnswering),
    informationToCollect: trimValue(data.informationToCollect),
    requestHandling: trimValue(data.requestHandling),
    schedulingPreferences: trimValue(data.schedulingPreferences),
    customerFaqs: trimValue(data.customerFaqs),
    urgentInstructions: trimValue(data.urgentInstructions),
    receptionistTone: trimValue(data.receptionistTone),
    notificationPreferences: trimValue(data.notificationPreferences),
    specialCallInstructions: trimValue(data.specialCallInstructions),
    websiteUrl: trimValue(data.websiteUrl),
    mainOffer: trimValue(data.mainOffer),
    targetCustomer: trimValue(data.targetCustomer),
    conversionGoal: trimValue(data.conversionGoal),
    currentLeadMethod: trimValue(data.currentLeadMethod),
    existingFormsBooking: trimValue(data.existingFormsBooking),
    desiredCta: trimValue(data.desiredCta),
    brandAssetsAvailability: trimValue(data.brandAssetsAvailability),
    websiteAccessNotes: trimValue(data.websiteAccessNotes),
    knownWebsiteIssues: trimValue(data.knownWebsiteIssues),
    referenceSites: trimValue(data.referenceSites),
    trackingAnalytics: trimValue(data.trackingAnalytics),
    currentCrm: trimValue(data.currentCrm),
    workflowToAutomate: trimValue(data.workflowToAutomate),
    leadSources: trimValue(data.leadSources),
    followUpChannels: data.followUpChannels.map(trimValue).filter(Boolean),
    currentFollowUpProcess: trimValue(data.currentFollowUpProcess),
    automationTrigger: trimValue(data.automationTrigger),
    automationOutcome: trimValue(data.automationOutcome),
    calendarSystem: trimValue(data.calendarSystem),
    automationTools: trimValue(data.automationTools),
    teamMembers: trimValue(data.teamMembers),
    neverAutomate: trimValue(data.neverAutomate),
    reviewPlatforms: trimValue(data.reviewPlatforms),
    googleBusinessProfileLink: trimValue(data.googleBusinessProfileLink),
    reviewRequestProcess: trimValue(data.reviewRequestProcess),
    reviewTiming: trimValue(data.reviewTiming),
    reviewChannel: trimValue(data.reviewChannel),
    customerListSource: trimValue(data.customerListSource),
    negativeFeedbackRouting: trimValue(data.negativeFeedbackRouting),
    reviewNotificationContact: trimValue(data.reviewNotificationContact),
    reputationTools: trimValue(data.reputationTools),
    customPurchase: trimValue(data.customPurchase),
    customGoal: trimValue(data.customGoal),
    customSystems: trimValue(data.customSystems),
    customSuccess: trimValue(data.customSuccess),
    customDeadlines: trimValue(data.customDeadlines),
    customNotes: trimValue(data.customNotes),
    systemsInvolved: data.systemsInvolved.map(trimValue).filter(Boolean),
    systemsOther: trimValue(data.systemsOther),
    accessNotes: trimValue(data.accessNotes),
    primaryEmail: trimValue(data.primaryEmail || data.email).toLowerCase(),
    primaryPhone: trimValue(data.primaryPhone || data.phone),
    preferredContactMethod: trimValue(data.preferredContactMethod),
    bestContactTime: trimValue(data.bestContactTime),
    additionalTeamContact: trimValue(data.additionalTeamContact),
    finalNotes: trimValue(data.finalNotes),
    source: "Backend Brilliance Onboarding",
  };
}

function TextField({
  label,
  field,
  value,
  error,
  onChange,
  type = "text",
  required = false,
  autoComplete,
  helper,
  inputMode,
  placeholder,
}: {
  label: string;
  field: StringField;
  value: string;
  error?: string;
  onChange: (field: StringField, value: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  helper?: string;
  inputMode?: "email" | "tel" | "url";
  placeholder?: string;
}) {
  return (
    <label className="form-field">
      <span>
        {label}
        {required && <b> *</b>}
      </span>
      <input
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(event) => onChange(field, event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
      {helper && <small className="field-helper">{helper}</small>}
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

function TextAreaField({
  label,
  field,
  value,
  error,
  onChange,
  required = false,
  helper,
  placeholder,
}: {
  label: string;
  field: StringField;
  value: string;
  error?: string;
  onChange: (field: StringField, value: string) => void;
  required?: boolean;
  helper?: string;
  placeholder?: string;
}) {
  return (
    <label className="form-field wide">
      <span>
        {label}
        {required && <b> *</b>}
      </span>
      <textarea
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(field, event.target.value)}
        placeholder={placeholder}
        required={required}
        value={value}
      />
      {helper && <small className="field-helper">{helper}</small>}
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

function SelectField({
  label,
  field,
  value,
  error,
  options,
  onChange,
  required = false,
  helper,
}: {
  label: string;
  field: StringField;
  value: string;
  error?: string;
  options: readonly string[];
  onChange: (field: StringField, value: string) => void;
  required?: boolean;
  helper?: string;
}) {
  return (
    <label className="form-field">
      <span>
        {label}
        {required && <b> *</b>}
      </span>
      <select
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(field, event.target.value)}
        required={required}
        value={value}
      >
        <option value="">Select one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {helper && <small className="field-helper">{helper}</small>}
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

function CheckboxGroup({
  label,
  field,
  values,
  options,
  error,
  onChange,
  required = false,
  helper,
}: {
  label: string;
  field: ArrayField;
  values: string[];
  options: readonly string[];
  error?: string;
  onChange: (field: ArrayField, option: string, checked: boolean) => void;
  required?: boolean;
  helper?: string;
}) {
  return (
    <fieldset className="checkbox-group wide">
      <legend>
        {label}
        {required && <b> *</b>}
      </legend>
      {helper && <small className="field-helper">{helper}</small>}
      <div className="checkbox-grid">
        {options.map((option) => (
          <label
            className={`checkbox-card ${values.includes(option) ? "is-selected" : ""}`}
            key={option}
          >
            <input
              checked={values.includes(option)}
              onChange={(event) => onChange(field, option, event.target.checked)}
              type="checkbox"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error && <small className="field-error">{error}</small>}
    </fieldset>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="review-item">
      <span>{label}</span>
      <strong>{value || "Not provided"}</strong>
    </div>
  );
}

function ServiceSpecificFields({
  data,
  errors,
  updateField,
  updateArrayField,
}: {
  data: OnboardingData;
  errors: FieldErrors;
  updateField: (field: StringField, value: string) => void;
  updateArrayField: (field: ArrayField, option: string, checked: boolean) => void;
}) {
  if (data.selectedService === "AI Receptionist") {
    return (
      <>
        <div className="form-guidance">
          <h2>AI Receptionist Setup</h2>
          <p>
            Share the call-handling details you know now. Phone-number porting is
            not required here.
          </p>
        </div>
        <TextField label="Business hours" field="businessHours" value={data.businessHours} error={errors.businessHours} onChange={updateField} />
        <TextField label="Current business phone number" field="currentBusinessPhone" value={data.currentBusinessPhone} error={errors.currentBusinessPhone} onChange={updateField} type="tel" inputMode="tel" />
        <SelectField label="Do you want after-hours answering?" field="afterHoursAnswering" value={data.afterHoursAnswering} error={errors.afterHoursAnswering} options={yesNoOptions} onChange={updateField} />
        <SelectField label="Preferred receptionist tone" field="receptionistTone" value={data.receptionistTone} error={errors.receptionistTone} options={["Warm and friendly", "Professional and concise", "Casual and conversational", "Not sure yet"]} onChange={updateField} />
        <TextAreaField label="Main services customers call about" field="callServices" value={data.callServices} error={errors.callServices} onChange={updateField} />
        <TextAreaField label="Information the receptionist should collect" field="informationToCollect" value={data.informationToCollect} error={errors.informationToCollect} onChange={updateField} />
        <TextAreaField label="How service requests should be handled" field="requestHandling" value={data.requestHandling} error={errors.requestHandling} onChange={updateField} />
        <TextAreaField label="Scheduling preferences" field="schedulingPreferences" value={data.schedulingPreferences} error={errors.schedulingPreferences} onChange={updateField} />
        <TextAreaField label="Common customer questions / FAQs" field="customerFaqs" value={data.customerFaqs} error={errors.customerFaqs} onChange={updateField} />
        <TextAreaField label="Escalation or urgent-call instructions" field="urgentInstructions" value={data.urgentInstructions} error={errors.urgentInstructions} onChange={updateField} />
        <TextAreaField label="Notification preferences" field="notificationPreferences" value={data.notificationPreferences} error={errors.notificationPreferences} onChange={updateField} />
        <TextAreaField label="Any special call-handling instructions" field="specialCallInstructions" value={data.specialCallInstructions} error={errors.specialCallInstructions} onChange={updateField} />
      </>
    );
  }

  if (data.selectedService === "AI Legal Intake System") {
    return (
      <>
        <div className="form-guidance">
          <h2>AI Legal Intake Setup</h2>
          <p>
            Share how the firm wants inquiries gathered, routed, scheduled, and
            escalated. This does not replace attorney review or provide legal
            advice.
          </p>
        </div>
        <TextAreaField label="Practice areas" field="practiceAreas" value={data.practiceAreas} error={errors.practiceAreas} onChange={updateField} />
        <TextField label="Geographic areas / jurisdictions served" field="jurisdictionsServed" value={data.jurisdictionsServed} error={errors.jurisdictionsServed} onChange={updateField} />
        <TextField label="Business hours" field="businessHours" value={data.businessHours} error={errors.businessHours} onChange={updateField} />
        <TextAreaField label="Consultation process" field="consultationProcess" value={data.consultationProcess} error={errors.consultationProcess} onChange={updateField} />
        <TextField label="Consultation booking link" field="consultationBookingLink" value={data.consultationBookingLink} error={errors.consultationBookingLink} onChange={updateField} type="url" inputMode="url" />
        <TextAreaField label="Intake questions" field="intakeQuestions" value={data.intakeQuestions} error={errors.intakeQuestions} onChange={updateField} />
        <TextAreaField label="Firm-defined qualification criteria" field="qualificationCriteria" value={data.qualificationCriteria} error={errors.qualificationCriteria} onChange={updateField} helper="Use firm-defined routing rules only. Do not include instructions that require legal conclusions from the system." />
        <TextAreaField label="Routing / disqualification rules" field="legalRoutingRules" value={data.legalRoutingRules} error={errors.legalRoutingRules} onChange={updateField} />
        <TextAreaField label="Escalation rules" field="legalEscalationRules" value={data.legalEscalationRules} error={errors.legalEscalationRules} onChange={updateField} />
        <TextField label="Existing phone system" field="existingPhoneSystem" value={data.existingPhoneSystem} error={errors.existingPhoneSystem} onChange={updateField} />
        <TextField label="Existing CRM / case management platform" field="caseManagementPlatform" value={data.caseManagementPlatform} error={errors.caseManagementPlatform} onChange={updateField} />
      </>
    );
  }

  if (
    data.selectedService === "Website Conversion System" ||
    data.selectedService === "Local Visibility / SEO" ||
    data.selectedService === "Lead Generation" ||
    data.selectedService === "Paid Advertising" ||
    data.selectedService === "Property Marketing"
  ) {
    return (
      <>
        <div className="form-guidance">
          <h2>Website, Visibility &amp; Lead Generation Setup</h2>
          <p>
            Help us understand the market, offer, traffic path, and conversion
            goal you want to improve.
          </p>
        </div>
        <TextField label="Current website URL" field="websiteUrl" value={data.websiteUrl} error={errors.websiteUrl} onChange={updateField} type="url" inputMode="url" />
        <TextField label="Main offer/service" field="mainOffer" value={data.mainOffer} error={errors.mainOffer} onChange={updateField} />
        <TextField label="Primary target customer" field="targetCustomer" value={data.targetCustomer} error={errors.targetCustomer} onChange={updateField} />
        <TextField label="Primary conversion goal" field="conversionGoal" value={data.conversionGoal} error={errors.conversionGoal} onChange={updateField} />
        <TextField label="Current lead/contact method" field="currentLeadMethod" value={data.currentLeadMethod} error={errors.currentLeadMethod} onChange={updateField} />
        <TextField label="Existing forms or booking system" field="existingFormsBooking" value={data.existingFormsBooking} error={errors.existingFormsBooking} onChange={updateField} />
        <TextField label="Desired CTA" field="desiredCta" value={data.desiredCta} error={errors.desiredCta} onChange={updateField} placeholder="Example: Call now, request a quote, book online" />
        <SelectField label="Brand assets availability" field="brandAssetsAvailability" value={data.brandAssetsAvailability} error={errors.brandAssetsAvailability} options={["Ready to share", "Some assets available", "Need help", "Not sure"]} onChange={updateField} />
        <TextAreaField label="Website access/platform details" field="websiteAccessNotes" value={data.websiteAccessNotes} error={errors.websiteAccessNotes} onChange={updateField} helper="Do not enter passwords here. If access is needed, we will provide secure instructions separately." />
        <TextAreaField label="Known website issues" field="knownWebsiteIssues" value={data.knownWebsiteIssues} error={errors.knownWebsiteIssues} onChange={updateField} />
        <TextAreaField label="Competitor/reference sites" field="referenceSites" value={data.referenceSites} error={errors.referenceSites} onChange={updateField} />
        <TextAreaField label="Any tracking/analytics already installed" field="trackingAnalytics" value={data.trackingAnalytics} error={errors.trackingAnalytics} onChange={updateField} />
      </>
    );
  }

  if (
    data.selectedService === "Lead Follow-Up Automation" ||
    data.selectedService === "Customer Reactivation" ||
    data.selectedService === "Business Process Automation" ||
    data.selectedService === "Content Creation System"
  ) {
    return (
      <>
        <div className="form-guidance">
          <h2>Automation, Follow-Up &amp; Reactivation Setup</h2>
          <p>
            Tell us what process should become smoother and what should stay
            human.
          </p>
        </div>
        <TextField label="Current CRM or customer-management system" field="currentCrm" value={data.currentCrm} error={errors.currentCrm} onChange={updateField} />
        <TextField label="Primary workflow to automate" field="workflowToAutomate" value={data.workflowToAutomate} error={errors.workflowToAutomate} onChange={updateField} />
        <TextAreaField label="Current lead sources" field="leadSources" value={data.leadSources} error={errors.leadSources} onChange={updateField} />
        <CheckboxGroup label="Desired follow-up channels" field="followUpChannels" values={data.followUpChannels} error={errors.followUpChannels} options={followUpChannelOptions} onChange={updateArrayField} />
        <TextAreaField label="Current follow-up process" field="currentFollowUpProcess" value={data.currentFollowUpProcess} error={errors.currentFollowUpProcess} onChange={updateField} />
        <TextField label="Desired trigger/event" field="automationTrigger" value={data.automationTrigger} error={errors.automationTrigger} onChange={updateField} />
        <TextField label="Desired outcome" field="automationOutcome" value={data.automationOutcome} error={errors.automationOutcome} onChange={updateField} />
        <TextField label="Existing calendar/scheduling system" field="calendarSystem" value={data.calendarSystem} error={errors.calendarSystem} onChange={updateField} />
        <TextField label="Existing automation tools" field="automationTools" value={data.automationTools} error={errors.automationTools} onChange={updateField} />
        <TextAreaField label="Team members involved" field="teamMembers" value={data.teamMembers} error={errors.teamMembers} onChange={updateField} />
        <TextAreaField label="Anything that should never be automated" field="neverAutomate" value={data.neverAutomate} error={errors.neverAutomate} onChange={updateField} />
      </>
    );
  }

  if (data.selectedService === "Review Growth") {
    return (
      <>
        <div className="form-guidance">
          <h2>Reputation &amp; Review Setup</h2>
          <p>
            Share how reviews are currently requested and where customer feedback
            should go.
          </p>
        </div>
        <TextField label="Primary review platform(s)" field="reviewPlatforms" value={data.reviewPlatforms} error={errors.reviewPlatforms} onChange={updateField} />
        <TextField label="Google Business Profile link, if available" field="googleBusinessProfileLink" value={data.googleBusinessProfileLink} error={errors.googleBusinessProfileLink} onChange={updateField} type="url" inputMode="url" />
        <TextAreaField label="Current review-request process" field="reviewRequestProcess" value={data.reviewRequestProcess} error={errors.reviewRequestProcess} onChange={updateField} />
        <TextField label="When should review requests be sent?" field="reviewTiming" value={data.reviewTiming} error={errors.reviewTiming} onChange={updateField} />
        <SelectField label="Preferred communication channel" field="reviewChannel" value={data.reviewChannel} error={errors.reviewChannel} options={communicationOptions} onChange={updateField} />
        <TextAreaField label="Customer list/CRM source" field="customerListSource" value={data.customerListSource} error={errors.customerListSource} onChange={updateField} />
        <SelectField label="Should negative feedback be routed privately?" field="negativeFeedbackRouting" value={data.negativeFeedbackRouting} error={errors.negativeFeedbackRouting} options={yesNoOptions} onChange={updateField} />
        <TextField label="Primary notification contact" field="reviewNotificationContact" value={data.reviewNotificationContact} error={errors.reviewNotificationContact} onChange={updateField} />
        <TextField label="Existing reputation-management tools" field="reputationTools" value={data.reputationTools} error={errors.reputationTools} onChange={updateField} />
      </>
    );
  }

  return (
    <>
      <div className="form-guidance">
        <h2>Tell Us About Your Project</h2>
        <p>
          For custom or less common services, give us enough context to route the
          project correctly.
        </p>
      </div>
      <TextAreaField label="What solution or next step did you discuss with us?" field="customPurchase" value={data.customPurchase} error={errors.customPurchase} onChange={updateField} />
      <TextAreaField label="What are you trying to accomplish?" field="customGoal" value={data.customGoal} error={errors.customGoal} onChange={updateField} />
      <TextAreaField label="What systems/tools are currently involved?" field="customSystems" value={data.customSystems} error={errors.customSystems} onChange={updateField} />
      <TextAreaField label="What would a successful outcome look like?" field="customSuccess" value={data.customSuccess} error={errors.customSuccess} onChange={updateField} />
      <TextField label="Any deadlines or important constraints?" field="customDeadlines" value={data.customDeadlines} error={errors.customDeadlines} onChange={updateField} />
      <TextAreaField label="Anything else we should know?" field="customNotes" value={data.customNotes} error={errors.customNotes} onChange={updateField} />
    </>
  );
}

function StepContent({
  step,
  data,
  errors,
  updateField,
  updateArrayField,
}: {
  step: number;
  data: OnboardingData;
  errors: FieldErrors;
  updateField: (field: StringField, value: string) => void;
  updateArrayField: (field: ArrayField, option: string, checked: boolean) => void;
}) {
  if (step === 0) {
    return (
      <>
        <div className="form-guidance">
          <h2>What Are We Setting Up For You?</h2>
          <p>
            Start with the service or solution we&apos;re setting up, then add
            the basic business details we need for any Backend Brilliance setup.
          </p>
        </div>
        <SelectField label="Service / Solution Being Implemented" field="selectedService" value={data.selectedService} error={errors.selectedService} options={serviceOptions} onChange={updateField} required />
        {data.selectedService === "Other / Custom Solution" && (
          <TextField label="What solution or next step did you discuss with us?" field="customService" value={data.customService} error={errors.customService} onChange={updateField} required />
        )}
        <TextField autoComplete="organization" label="Business Name" field="businessName" value={data.businessName} error={errors.businessName} onChange={updateField} required />
        <TextField autoComplete="name" label="Primary Contact Name" field="contactName" value={data.contactName} error={errors.contactName} onChange={updateField} required />
        <TextField autoComplete="email" inputMode="email" type="email" label="Email Address" field="email" value={data.email} error={errors.email} onChange={updateField} required />
        <TextField autoComplete="tel" inputMode="tel" type="tel" label="Phone Number" field="phone" value={data.phone} error={errors.phone} onChange={updateField} required />
        <TextField autoComplete="url" inputMode="url" type="url" label="Business Website" field="businessWebsite" value={data.businessWebsite} error={errors.businessWebsite} onChange={updateField} helper="Optional if you do not have a website yet." />
        <TextField autoComplete="street-address" label="Business Address" field="businessAddress" value={data.businessAddress} error={errors.businessAddress} onChange={updateField} />
        <TextField label="Primary Service Area / Market" field="serviceArea" value={data.serviceArea} error={errors.serviceArea} onChange={updateField} required />
        <TextField label="Industry / Business Type" field="industry" value={data.industry} error={errors.industry} onChange={updateField} required />
      </>
    );
  }

  if (step === 1) {
    return (
      <>
        <div className="form-guidance">
          <h2>What Are You Trying to Improve?</h2>
          <p>
            This helps us understand the business outcome behind the service or
            solution we&apos;re setting up.
          </p>
        </div>
        <CheckboxGroup label="What is your primary goal with this service?" field="primaryGoals" values={data.primaryGoals} error={errors.primaryGoals} options={goalOptions} onChange={updateArrayField} required helper="Select all that apply." />
        {data.primaryGoals.includes("Other") && (
          <TextField label="Other goal" field="primaryGoalOther" value={data.primaryGoalOther} error={errors.primaryGoalOther} onChange={updateField} required />
        )}
        <TextAreaField
          label="Current Problem / Bottleneck"
          field="currentSetup"
          value={data.currentSetup}
          error={errors.currentSetup}
          onChange={updateField}
          required
          helper="Briefly explain what is not working, plus any current website, phone system, CRM, scheduling tools, review process, existing automations, or anything else relevant to the solution being implemented."
        />
      </>
    );
  }

  if (step === 2) {
    return (
      <ServiceSpecificFields
        data={data}
        errors={errors}
        updateArrayField={updateArrayField}
        updateField={updateField}
      />
    );
  }

  if (step === 3) {
    return (
      <>
        <div className="form-guidance">
          <h2>Systems &amp; Access</h2>
          <p>
            Tell us which tools are involved. Please do not type passwords into
            this form.
          </p>
        </div>
        <CheckboxGroup label="Which platforms or systems are involved in this setup?" field="systemsInvolved" values={data.systemsInvolved} error={errors.systemsInvolved} options={platformOptions} onChange={updateArrayField} />
        {data.systemsInvolved.includes("Other") && (
          <TextField label="Other platform/system" field="systemsOther" value={data.systemsOther} error={errors.systemsOther} onChange={updateField} />
        )}
        <TextAreaField
          label="Access notes"
          field="accessNotes"
          value={data.accessNotes}
          error={errors.accessNotes}
          onChange={updateField}
          helper="If account access is needed, we'll provide secure instructions separately."
        />
      </>
    );
  }

  if (step === 4) {
    return (
      <>
        <div className="form-guidance">
          <h2>How Should We Contact You?</h2>
          <p>
            We&apos;ll use these details if we need clarification or additional
            access.
          </p>
        </div>
        <TextField autoComplete="email" inputMode="email" type="email" label="Primary email" field="primaryEmail" value={data.primaryEmail} error={errors.primaryEmail} onChange={updateField} helper="Leave blank to use the email address from Step 1." />
        <TextField autoComplete="tel" inputMode="tel" type="tel" label="Primary phone" field="primaryPhone" value={data.primaryPhone} error={errors.primaryPhone} onChange={updateField} helper="Leave blank to use the phone number from Step 1." />
        <SelectField label="Preferred communication method" field="preferredContactMethod" value={data.preferredContactMethod} error={errors.preferredContactMethod} options={communicationOptions} onChange={updateField} required />
        <TextField label="Best time to contact" field="bestContactTime" value={data.bestContactTime} error={errors.bestContactTime} onChange={updateField} />
        <TextAreaField label="Additional team contact, if applicable" field="additionalTeamContact" value={data.additionalTeamContact} error={errors.additionalTeamContact} onChange={updateField} />
        <TextAreaField
          label="Anything Else We Should Know?"
          field="finalNotes"
          value={data.finalNotes}
          error={errors.finalNotes}
          onChange={updateField}
          helper="Tell us anything else about your business, customers, systems, preferences, or goals that would help us complete your setup correctly."
        />
      </>
    );
  }

  return (
    <>
      <div className="form-guidance">
        <h2>Review Your Business Intake</h2>
        <p>
          If anything looks off, go back and adjust it. When you submit, we&apos;ll
          save the intake and begin reviewing the next stage of your setup.
        </p>
      </div>
      <div className="review-grid wide">
        <ReviewItem label="Service" value={data.selectedService || data.customService} />
        <ReviewItem label="Business" value={data.businessName} />
        <ReviewItem label="Contact" value={data.contactName} />
        <ReviewItem label="Email" value={data.email} />
        <ReviewItem label="Phone" value={data.phone} />
        <ReviewItem label="Market" value={data.serviceArea} />
        <ReviewItem label="Goals" value={data.primaryGoals.join(", ")} />
        <ReviewItem label="Preferred contact" value={data.preferredContactMethod} />
      </div>
    </>
  );
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const formTopRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(() =>
    makeInitialData(searchParams),
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const normalizedData = useMemo(() => normalizeData(data), [data]);
  const progress = Math.round(((currentStep + 1) / steps.length) * 100);

  useEffect(() => {
    trackEvent("onboarding_start", {
      service: data.selectedService || "not_selected",
    });
  }, []);

  const updateField = (field: StringField, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      delete next.form;
      return next;
    });
  };

  const updateArrayField = (
    field: ArrayField,
    option: string,
    checked: boolean,
  ) => {
    setData((current) => {
      const values = current[field];
      return {
        ...current,
        [field]: checked
          ? [...values, option]
          : values.filter((value) => value !== option),
      };
    });
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      delete next.form;
      return next;
    });
  };

  const getStepErrors = (step: number, payload: OnboardingData) => {
    const nextErrors: FieldErrors = {};

    if (step === 0) {
      [
        "selectedService",
        "businessName",
        "contactName",
        "email",
        "phone",
        "serviceArea",
        "industry",
      ].forEach((field) => {
        const value = payload[field as keyof OnboardingData];
        if (typeof value === "string" && !value.trim()) {
          nextErrors[field as keyof OnboardingData] =
            `${fieldLabels[field as keyof OnboardingData]} is required.`;
        }
      });

      if (
        payload.selectedService === "Other / Custom Solution" &&
        !payload.customService.trim()
      ) {
        nextErrors.customService = "Tell us what solution or next step you discussed.";
      }

      if (payload.email && !isValidEmail(payload.email)) {
        nextErrors.email = "Enter a valid email address.";
      }

      if (payload.phone && !isValidPhone(payload.phone)) {
        nextErrors.phone = "Enter a valid phone number.";
      }
    }

    if (step === 1) {
      if (payload.primaryGoals.length === 0) {
        nextErrors.primaryGoals = "Select at least one goal.";
      }

      if (
        payload.primaryGoals.includes("Other") &&
        !payload.primaryGoalOther.trim()
      ) {
        nextErrors.primaryGoalOther = "Tell us the other goal.";
      }

      if (!payload.currentSetup.trim()) {
        nextErrors.currentSetup = "Current setup is required.";
      }
    }

    if (step === 4) {
      if (!payload.preferredContactMethod.trim()) {
        nextErrors.preferredContactMethod =
          "Preferred communication method is required.";
      }

      if (payload.primaryEmail && !isValidEmail(payload.primaryEmail)) {
        nextErrors.primaryEmail = "Enter a valid email address.";
      }

      if (payload.primaryPhone && !isValidPhone(payload.primaryPhone)) {
        nextErrors.primaryPhone = "Enter a valid phone number.";
      }
    }

    return nextErrors;
  };

  const scrollToFormTop = () => {
    window.requestAnimationFrame(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      formTopRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  const goNext = () => {
    const stepErrors = getStepErrors(currentStep, normalizedData);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      scrollToFormTop();
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
    scrollToFormTop();
  };

  const goBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
    scrollToFormTop();
  };

  const validateAll = (payload: OnboardingData) => {
    for (let step = 0; step < steps.length - 1; step += 1) {
      const stepErrors = getStepErrors(step, payload);
      if (Object.keys(stepErrors).length > 0) {
        return { step, stepErrors };
      }
    }

    return { step: -1, stepErrors: {} as FieldErrors };
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage("");

    if (isSubmitting) {
      return;
    }

    const payload = normalizeData(data);
    const invalid = validateAll(payload);

    if (invalid.step >= 0) {
      setCurrentStep(invalid.step);
      setErrors({
        ...invalid.stepErrors,
        form: "Please fix the highlighted fields before submitting.",
      });
      scrollToFormTop();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        success?: boolean;
        ok?: boolean;
        submissionId?: string;
        message?: string;
      };

      if (!response.ok || (!result.success && !result.ok)) {
        setSubmitMessage(
          result.message ||
            "Something went wrong while submitting your business intake. Please try again or contact Backend Brilliance.",
        );
        return;
      }

      trackEvent("onboarding_submission", {
        service: payload.selectedService,
        submissionId: result.submissionId || "",
      });
      navigate(
        `${OFFER_CONFIG.routes.onboardingSuccess}?id=${encodeURIComponent(
          result.submissionId || "",
        )}`,
      );
    } catch {
      setSubmitMessage(
        "Something went wrong while submitting your business intake. Please try again or contact Backend Brilliance.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageMeta
        title="Business Intake | Backend Brilliance"
        description="Complete the Backend Brilliance business intake form."
        path={OFFER_CONFIG.routes.onboarding}
        noindex
      />
      <SimpleHeader />

      <main className="flow-page onboarding-page">
        <section className="section-shell onboarding-shell intake-shell">
          <div className="section-heading narrow">
            <p className="eyebrow">Business intake</p>
            <h1>Tell Us What We Need To Prepare Your Setup.</h1>
            <p>
              This reusable intake gives us the business details, solution,
              goals, and setup notes we need to begin. You don&apos;t need every
              detail figured out — we&apos;ll follow up if anything else is
              needed.
            </p>
          </div>

          <div
            className="progress-wrap"
            ref={formTopRef}
            aria-label={`Step ${currentStep + 1} of ${steps.length}`}
          >
            <div className="progress-label">
              <span>
                Step {currentStep + 1} of {steps.length}
              </span>
              <strong>{steps[currentStep]}</strong>
            </div>
            <div className="progress-bar" aria-hidden="true">
              <i style={{ width: `${progress}%` }} />
            </div>
          </div>

          <form className="onboarding-form intake-form" onSubmit={submitForm} noValidate>
            {errors.form && (
              <div className="error-summary" role="alert" aria-live="assertive">
                {errors.form}
              </div>
            )}

            <div className="form-card">
              <div className="form-grid">
                <StepContent
                  data={data}
                  errors={errors}
                  step={currentStep}
                  updateArrayField={updateArrayField}
                  updateField={updateField}
                />
              </div>
            </div>

            {submitMessage && (
              <div className="error-summary" role="alert" aria-live="assertive">
                {submitMessage}
              </div>
            )}

            <div className="form-actions">
              <button
                className="button button-secondary"
                disabled={currentStep === 0 || isSubmitting}
                onClick={goBack}
                type="button"
              >
                <ArrowLeft size={18} />
                Back
              </button>

              {currentStep < steps.length - 1 ? (
                <button className="button button-primary" onClick={goNext} type="button">
                  Continue
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  className="button button-primary"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Submitting..." : "Submit My Business Intake"}
                  <CheckCircle2 size={18} />
                </button>
              )}
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
