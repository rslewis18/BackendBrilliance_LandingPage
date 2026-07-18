import { type FormEvent, type ReactNode, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PageMeta } from "../components/PageMeta";
import { SimpleHeader } from "../components/SimpleHeader";
import { OFFER_CONFIG } from "../config/offers";

type OnboardingData = {
  contactName: string;
  businessName: string;
  email: string;
  phone: string;
  preferredContactMethod: string;
  industry: string;
  currentWebsiteUrl: string;
  domain: string;
  businessAddress: string;
  primaryServiceArea: string;
  businessDescription: string;
  yearsInBusiness: string;
  publicBusinessPhone: string;
  publicBusinessEmail: string;
  primaryServices: string;
  highestPriorityService: string;
  highestRevenueService: string;
  currentPromotions: string;
  pricingInformation: string;
  financingInformation: string;
  serviceAreas: string;
  servicesNotPromoted: string;
  brandColors: string;
  fontPreferences: string;
  brandGuidelines: string;
  desiredStyle: string;
  brandWords: string;
  websitesTheyLike: string;
  websitesTheyDislike: string;
  visualDirections: string[];
  assetFolderLink: string;
  currentPlatform: string;
  currentPlatformOther: string;
  currentBookingPlatform: string;
  currentBookingPlatformOther: string;
  bookingUrl: string;
  currentCrm: string;
  contactFormDestination: string;
  inquiryRecipients: string;
  leadNotificationEmail: string;
  leadNotificationPhone: string;
  followUpProcess: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  linkedin: string;
  youtube: string;
  googleBusinessProfile: string;
  yelp: string;
  otherProfiles: string;
  goals: string[];
  goalsOther: string;
  primaryGoal: string;
  competitor1: string;
  competitor2: string;
  competitor3: string;
  competitorLikes: string;
  differentiator: string;
  additionalInformation: string;
  specialRequests: string;
  importantDeadlines: string;
  upcomingPromotions: string;
  legalRequirements: string;
  bestTimeToContact: string;
  confirmation: boolean;
  companyWebsite: string;
  turnstileToken: string;
};

type FieldErrors = Partial<Record<keyof OnboardingData | "form", string>>;

type StringField = {
  [Key in keyof OnboardingData]: OnboardingData[Key] extends string ? Key : never;
}[keyof OnboardingData];

type BooleanField = {
  [Key in keyof OnboardingData]: OnboardingData[Key] extends boolean ? Key : never;
}[keyof OnboardingData];

type ArrayField = {
  [Key in keyof OnboardingData]: OnboardingData[Key] extends string[] ? Key : never;
}[keyof OnboardingData];

type UpdateStringField = (field: StringField, value: string) => void;
type UpdateBooleanField = (field: BooleanField, value: boolean) => void;
type ToggleArrayValue = (field: ArrayField, value: string) => void;

const initialData: OnboardingData = {
  contactName: "",
  businessName: "",
  email: "",
  phone: "",
  preferredContactMethod: "",
  industry: "",
  currentWebsiteUrl: "",
  domain: "",
  businessAddress: "",
  primaryServiceArea: "",
  businessDescription: "",
  yearsInBusiness: "",
  publicBusinessPhone: "",
  publicBusinessEmail: "",
  primaryServices: "",
  highestPriorityService: "",
  highestRevenueService: "",
  currentPromotions: "",
  pricingInformation: "",
  financingInformation: "",
  serviceAreas: "",
  servicesNotPromoted: "",
  brandColors: "",
  fontPreferences: "",
  brandGuidelines: "",
  desiredStyle: "",
  brandWords: "",
  websitesTheyLike: "",
  websitesTheyDislike: "",
  visualDirections: [],
  assetFolderLink: "",
  currentPlatform: "",
  currentPlatformOther: "",
  currentBookingPlatform: "",
  currentBookingPlatformOther: "",
  bookingUrl: "",
  currentCrm: "",
  contactFormDestination: "",
  inquiryRecipients: "",
  leadNotificationEmail: "",
  leadNotificationPhone: "",
  followUpProcess: "",
  facebook: "",
  instagram: "",
  tiktok: "",
  linkedin: "",
  youtube: "",
  googleBusinessProfile: "",
  yelp: "",
  otherProfiles: "",
  goals: [],
  goalsOther: "",
  primaryGoal: "",
  competitor1: "",
  competitor2: "",
  competitor3: "",
  competitorLikes: "",
  differentiator: "",
  additionalInformation: "",
  specialRequests: "",
  importantDeadlines: "",
  upcomingPromotions: "",
  legalRequirements: "",
  bestTimeToContact: "",
  confirmation: false,
  companyWebsite: "",
  turnstileToken: "",
};

const steps = [
  "Contact Information",
  "Business Information",
  "Services and Offers",
  "Branding and Style",
  "Brand Files and Images",
  "Website, Booking, and Lead Handling",
  "Social and Business Profiles",
  "Goals",
  "Competitors and Inspiration",
  "Final Notes",
] as const;

const visualOptions = [
  "Modern",
  "Luxury",
  "Minimal",
  "Bold",
  "Friendly",
  "Clinical",
  "Corporate",
  "Local and approachable",
];

const goalOptions = [
  "Generate more website inquiries",
  "Increase calls",
  "Increase booking requests",
  "Improve brand credibility",
  "Explain services more clearly",
  "Improve mobile experience",
  "Promote a specific service",
  "Replace the current website",
  "Improve website performance",
  "Prepare for future automation",
  "Other",
];

const platformOptions = [
  "WordPress",
  "Wix",
  "Squarespace",
  "Shopify",
  "GoHighLevel",
  "Webflow",
  "Cloudflare-based site",
  "Custom website",
  "Not sure",
  "Other",
];

const bookingOptions = [
  "None",
  "Calendly",
  "Square",
  "Vagaro",
  "GlossGenius",
  "Boulevard",
  "Mindbody",
  "Acuity",
  "GoHighLevel",
  "Other",
];

const requiredByStep: Partial<Record<number, (keyof OnboardingData)[]>> = {
  0: ["contactName", "businessName", "email", "phone", "preferredContactMethod"],
  1: ["industry", "primaryServiceArea", "businessDescription"],
  2: ["primaryServices", "highestPriorityService"],
  3: ["desiredStyle"],
  5: ["currentPlatform", "currentBookingPlatform", "leadNotificationEmail"],
  7: ["primaryGoal"],
  9: ["confirmation"],
};

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const getFieldLabel = (field: keyof OnboardingData) =>
  field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (value) => value.toUpperCase());

function FormGrid({ children }: { children: ReactNode }) {
  return <div className="form-grid">{children}</div>;
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
}: {
  label: string;
  field: StringField;
  value: string;
  error?: string;
  onChange: UpdateStringField;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="form-field">
      <span>
        {label}
        {required && <b> *</b>}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(event) => onChange(field, event.target.value)}
        aria-invalid={Boolean(error)}
      />
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
}: {
  label: string;
  field: StringField;
  value: string;
  error?: string;
  onChange: UpdateStringField;
  required?: boolean;
}) {
  return (
    <label className="form-field wide">
      <span>
        {label}
        {required && <b> *</b>}
      </span>
      <textarea
        value={value}
        required={required}
        onChange={(event) => onChange(field, event.target.value)}
        aria-invalid={Boolean(error)}
      />
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
}: {
  label: string;
  field: StringField;
  value: string;
  error?: string;
  options: readonly string[];
  onChange: UpdateStringField;
  required?: boolean;
}) {
  return (
    <label className="form-field">
      <span>
        {label}
        {required && <b> *</b>}
      </span>
      <select
        value={value}
        required={required}
        onChange={(event) => onChange(field, event.target.value)}
        aria-invalid={Boolean(error)}
      >
        <option value="">Select one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

function CheckboxGroup({
  label,
  field,
  values,
  error,
  options,
  onToggle,
}: {
  label: string;
  field: ArrayField;
  values: string[];
  error?: string;
  options: readonly string[];
  onToggle: ToggleArrayValue;
}) {
  return (
    <fieldset className="checkbox-group wide" aria-invalid={Boolean(error)}>
      <legend>{label}</legend>
      <div className="checkbox-grid">
        {options.map((option) => (
          <label className="checkbox-card" key={option}>
            <input
              type="checkbox"
              checked={values.includes(option)}
              onChange={() => onToggle(field, option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error && <small className="field-error">{error}</small>}
    </fieldset>
  );
}

function StepContent({
  currentStep,
  data,
  errors,
  updateStringField,
  updateBooleanField,
  toggleArrayValue,
}: {
  currentStep: number;
  data: OnboardingData;
  errors: FieldErrors;
  updateStringField: UpdateStringField;
  updateBooleanField: UpdateBooleanField;
  toggleArrayValue: ToggleArrayValue;
}) {
  switch (currentStep) {
    case 0:
      return (
        <FormGrid>
          <TextField
            label="Contact name"
            field="contactName"
            value={data.contactName}
            error={errors.contactName}
            onChange={updateStringField}
            autoComplete="name"
            required
          />
          <TextField
            label="Business name"
            field="businessName"
            value={data.businessName}
            error={errors.businessName}
            onChange={updateStringField}
            autoComplete="organization"
            required
          />
          <TextField
            label="Email"
            field="email"
            value={data.email}
            error={errors.email}
            onChange={updateStringField}
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            label="Phone"
            field="phone"
            value={data.phone}
            error={errors.phone}
            onChange={updateStringField}
            type="tel"
            autoComplete="tel"
            required
          />
          <SelectField
            label="Preferred contact method"
            field="preferredContactMethod"
            value={data.preferredContactMethod}
            error={errors.preferredContactMethod}
            onChange={updateStringField}
            required
            options={["Email", "Phone", "Text"]}
          />
        </FormGrid>
      );
    case 1:
      return (
        <FormGrid>
          <TextField
            label="Industry"
            field="industry"
            value={data.industry}
            error={errors.industry}
            onChange={updateStringField}
            required
          />
          <TextField
            label="Current website URL"
            field="currentWebsiteUrl"
            value={data.currentWebsiteUrl}
            error={errors.currentWebsiteUrl}
            onChange={updateStringField}
            type="url"
            autoComplete="url"
          />
          <TextField
            label="Domain"
            field="domain"
            value={data.domain}
            error={errors.domain}
            onChange={updateStringField}
            type="url"
          />
          <TextField
            label="Business address"
            field="businessAddress"
            value={data.businessAddress}
            error={errors.businessAddress}
            onChange={updateStringField}
            autoComplete="street-address"
          />
          <TextField
            label="Primary service area"
            field="primaryServiceArea"
            value={data.primaryServiceArea}
            error={errors.primaryServiceArea}
            onChange={updateStringField}
            required
          />
          <TextAreaField
            label="Short business description"
            field="businessDescription"
            value={data.businessDescription}
            error={errors.businessDescription}
            onChange={updateStringField}
            required
          />
          <TextField
            label="Years in business"
            field="yearsInBusiness"
            value={data.yearsInBusiness}
            error={errors.yearsInBusiness}
            onChange={updateStringField}
          />
          <TextField
            label="Public business phone"
            field="publicBusinessPhone"
            value={data.publicBusinessPhone}
            error={errors.publicBusinessPhone}
            onChange={updateStringField}
            type="tel"
            autoComplete="tel"
          />
          <TextField
            label="Public business email"
            field="publicBusinessEmail"
            value={data.publicBusinessEmail}
            error={errors.publicBusinessEmail}
            onChange={updateStringField}
            type="email"
            autoComplete="email"
          />
        </FormGrid>
      );
    case 2:
      return (
        <FormGrid>
          <TextAreaField
            label="Primary services"
            field="primaryServices"
            value={data.primaryServices}
            error={errors.primaryServices}
            onChange={updateStringField}
            required
          />
          <TextField
            label="Highest-priority service"
            field="highestPriorityService"
            value={data.highestPriorityService}
            error={errors.highestPriorityService}
            onChange={updateStringField}
            required
          />
          <TextField
            label="Highest-revenue service"
            field="highestRevenueService"
            value={data.highestRevenueService}
            error={errors.highestRevenueService}
            onChange={updateStringField}
          />
          <TextAreaField
            label="Current promotions"
            field="currentPromotions"
            value={data.currentPromotions}
            error={errors.currentPromotions}
            onChange={updateStringField}
          />
          <TextAreaField
            label="Pricing information"
            field="pricingInformation"
            value={data.pricingInformation}
            error={errors.pricingInformation}
            onChange={updateStringField}
          />
          <TextAreaField
            label="Financing information"
            field="financingInformation"
            value={data.financingInformation}
            error={errors.financingInformation}
            onChange={updateStringField}
          />
          <TextAreaField
            label="Service areas"
            field="serviceAreas"
            value={data.serviceAreas}
            error={errors.serviceAreas}
            onChange={updateStringField}
          />
          <TextAreaField
            label="Services that should not be promoted"
            field="servicesNotPromoted"
            value={data.servicesNotPromoted}
            error={errors.servicesNotPromoted}
            onChange={updateStringField}
          />
        </FormGrid>
      );
    case 3:
      return (
        <FormGrid>
          <TextField
            label="Brand colors"
            field="brandColors"
            value={data.brandColors}
            error={errors.brandColors}
            onChange={updateStringField}
          />
          <TextField
            label="Font preferences"
            field="fontPreferences"
            value={data.fontPreferences}
            error={errors.fontPreferences}
            onChange={updateStringField}
          />
          <TextAreaField
            label="Existing brand guidelines"
            field="brandGuidelines"
            value={data.brandGuidelines}
            error={errors.brandGuidelines}
            onChange={updateStringField}
          />
          <TextField
            label="Desired style"
            field="desiredStyle"
            value={data.desiredStyle}
            error={errors.desiredStyle}
            onChange={updateStringField}
            required
          />
          <TextAreaField
            label="Words that describe the brand"
            field="brandWords"
            value={data.brandWords}
            error={errors.brandWords}
            onChange={updateStringField}
          />
          <TextAreaField
            label="Websites they like"
            field="websitesTheyLike"
            value={data.websitesTheyLike}
            error={errors.websitesTheyLike}
            onChange={updateStringField}
          />
          <TextAreaField
            label="Websites or styles they dislike"
            field="websitesTheyDislike"
            value={data.websitesTheyDislike}
            error={errors.websitesTheyDislike}
            onChange={updateStringField}
          />
          <CheckboxGroup
            label="Visual direction"
            field="visualDirections"
            values={data.visualDirections}
            error={errors.visualDirections}
            options={visualOptions}
            onToggle={toggleArrayValue}
          />
        </FormGrid>
      );
    case 4:
      return (
        <FormGrid>
          <div className="form-guidance">
            <h2>Share Brand Files and Images</h2>
            <p>
              Please add a Google Drive, Dropbox, OneDrive, or other shareable
              asset-folder link. Include logos, team photos, location photos,
              service photos, brand guidelines, brochures, and other helpful
              materials.
            </p>
          </div>
          <TextField
            label="Shared asset-folder link"
            field="assetFolderLink"
            value={data.assetFolderLink}
            error={errors.assetFolderLink}
            onChange={updateStringField}
            type="url"
          />
        </FormGrid>
      );
    case 5:
      return (
        <FormGrid>
          <SelectField
            label="Current hosting or website platform"
            field="currentPlatform"
            value={data.currentPlatform}
            error={errors.currentPlatform}
            onChange={updateStringField}
            required
            options={platformOptions}
          />
          {data.currentPlatform === "Other" && (
            <TextField
              label="Other website platform"
              field="currentPlatformOther"
              value={data.currentPlatformOther}
              error={errors.currentPlatformOther}
              onChange={updateStringField}
              required
            />
          )}
          <SelectField
            label="Current booking platform"
            field="currentBookingPlatform"
            value={data.currentBookingPlatform}
            error={errors.currentBookingPlatform}
            onChange={updateStringField}
            required
            options={bookingOptions}
          />
          {data.currentBookingPlatform === "Other" && (
            <TextField
              label="Other booking platform"
              field="currentBookingPlatformOther"
              value={data.currentBookingPlatformOther}
              error={errors.currentBookingPlatformOther}
              onChange={updateStringField}
              required
            />
          )}
          <TextField
            label="Booking URL"
            field="bookingUrl"
            value={data.bookingUrl}
            error={errors.bookingUrl}
            onChange={updateStringField}
            type="url"
          />
          <TextField
            label="Current CRM"
            field="currentCrm"
            value={data.currentCrm}
            error={errors.currentCrm}
            onChange={updateStringField}
          />
          <TextField
            label="Current contact-form destination"
            field="contactFormDestination"
            value={data.contactFormDestination}
            error={errors.contactFormDestination}
            onChange={updateStringField}
          />
          <TextAreaField
            label="Who receives website inquiries?"
            field="inquiryRecipients"
            value={data.inquiryRecipients}
            error={errors.inquiryRecipients}
            onChange={updateStringField}
          />
          <TextField
            label="Preferred lead-notification email"
            field="leadNotificationEmail"
            value={data.leadNotificationEmail}
            error={errors.leadNotificationEmail}
            onChange={updateStringField}
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            label="Preferred lead-notification phone"
            field="leadNotificationPhone"
            value={data.leadNotificationPhone}
            error={errors.leadNotificationPhone}
            onChange={updateStringField}
            type="tel"
            autoComplete="tel"
          />
          <TextAreaField
            label="Current follow-up process"
            field="followUpProcess"
            value={data.followUpProcess}
            error={errors.followUpProcess}
            onChange={updateStringField}
          />
        </FormGrid>
      );
    case 6:
      return (
        <FormGrid>
          <TextField label="Facebook" field="facebook" value={data.facebook} error={errors.facebook} onChange={updateStringField} type="url" />
          <TextField label="Instagram" field="instagram" value={data.instagram} error={errors.instagram} onChange={updateStringField} type="url" />
          <TextField label="TikTok" field="tiktok" value={data.tiktok} error={errors.tiktok} onChange={updateStringField} type="url" />
          <TextField label="LinkedIn" field="linkedin" value={data.linkedin} error={errors.linkedin} onChange={updateStringField} type="url" />
          <TextField label="YouTube" field="youtube" value={data.youtube} error={errors.youtube} onChange={updateStringField} type="url" />
          <TextField label="Google Business Profile" field="googleBusinessProfile" value={data.googleBusinessProfile} error={errors.googleBusinessProfile} onChange={updateStringField} type="url" />
          <TextField label="Yelp" field="yelp" value={data.yelp} error={errors.yelp} onChange={updateStringField} type="url" />
          <TextAreaField label="Other important profile links" field="otherProfiles" value={data.otherProfiles} error={errors.otherProfiles} onChange={updateStringField} />
        </FormGrid>
      );
    case 7:
      return (
        <FormGrid>
          <CheckboxGroup
            label="Goals"
            field="goals"
            values={data.goals}
            error={errors.goals}
            options={goalOptions}
            onToggle={toggleArrayValue}
          />
          {data.goals.includes("Other") && (
            <TextField
              label="Other goal"
              field="goalsOther"
              value={data.goalsOther}
              error={errors.goalsOther}
              onChange={updateStringField}
            />
          )}
          <TextAreaField
            label="What is the most important result you want from your new or improved website?"
            field="primaryGoal"
            value={data.primaryGoal}
            error={errors.primaryGoal}
            onChange={updateStringField}
            required
          />
        </FormGrid>
      );
    case 8:
      return (
        <FormGrid>
          <TextField label="Competitor 1" field="competitor1" value={data.competitor1} error={errors.competitor1} onChange={updateStringField} type="url" />
          <TextField label="Competitor 2" field="competitor2" value={data.competitor2} error={errors.competitor2} onChange={updateStringField} type="url" />
          <TextField label="Competitor 3" field="competitor3" value={data.competitor3} error={errors.competitor3} onChange={updateStringField} type="url" />
          <TextAreaField label="What do you like about their websites?" field="competitorLikes" value={data.competitorLikes} error={errors.competitorLikes} onChange={updateStringField} />
          <TextAreaField label="What should make your business feel different?" field="differentiator" value={data.differentiator} error={errors.differentiator} onChange={updateStringField} />
        </FormGrid>
      );
    default:
      return (
        <FormGrid>
          <TextAreaField label="Additional information" field="additionalInformation" value={data.additionalInformation} error={errors.additionalInformation} onChange={updateStringField} />
          <TextAreaField label="Special requests" field="specialRequests" value={data.specialRequests} error={errors.specialRequests} onChange={updateStringField} />
          <TextField label="Important deadlines" field="importantDeadlines" value={data.importantDeadlines} error={errors.importantDeadlines} onChange={updateStringField} />
          <TextAreaField label="Upcoming promotions" field="upcomingPromotions" value={data.upcomingPromotions} error={errors.upcomingPromotions} onChange={updateStringField} />
          <TextAreaField label="Legal or compliance requirements" field="legalRequirements" value={data.legalRequirements} error={errors.legalRequirements} onChange={updateStringField} />
          <TextField label="Best time to contact the client" field="bestTimeToContact" value={data.bestTimeToContact} error={errors.bestTimeToContact} onChange={updateStringField} />
          <label className="checkbox-card confirm-card">
            <input
              type="checkbox"
              checked={data.confirmation}
              onChange={(event) => updateBooleanField("confirmation", event.target.checked)}
              aria-invalid={Boolean(errors.confirmation)}
            />
            <span>
              I confirm that the information provided is accurate and that I
              have permission to provide the submitted business assets.
            </span>
          </label>
          {errors.confirmation && <p className="field-error">{errors.confirmation}</p>}
        </FormGrid>
      );
  }
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const formTopRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const progress = useMemo(
    () => Math.round(((currentStep + 1) / steps.length) * 100),
    [currentStep],
  );

  const clearFieldError = (field: keyof OnboardingData) => {
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      delete next.form;
      return next;
    });
  };

  const updateStringField: UpdateStringField = (field, value) => {
    setData((current) => ({ ...current, [field]: value }));
    clearFieldError(field);
  };

  const updateBooleanField: UpdateBooleanField = (field, value) => {
    setData((current) => ({ ...current, [field]: value }));
    clearFieldError(field);
  };

  const toggleArrayValue: ToggleArrayValue = (field, value) => {
    setData((current) => {
      const values = current[field];
      return {
        ...current,
        [field]: values.includes(value)
          ? values.filter((item) => item !== value)
          : [...values, value],
      };
    });
    clearFieldError(field);
  };

  const getStepErrors = (stepIndex: number, formData: OnboardingData) => {
    const nextErrors: FieldErrors = {};
    const requiredFields = requiredByStep[stepIndex] || [];

    requiredFields.forEach((field) => {
      const value = formData[field];
      if (typeof value === "boolean") {
        if (!value) {
          nextErrors[field] = "Please confirm before submitting.";
        }
        return;
      }

      if (Array.isArray(value)) {
        if (value.length === 0) {
          nextErrors[field] = `${getFieldLabel(field)} is required.`;
        }
        return;
      }

      if (!String(value).trim()) {
        nextErrors[field] = `${getFieldLabel(field)} is required.`;
      }
    });

    if (stepIndex === 0 && formData.email && !isValidEmail(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (stepIndex === 3 && formData.visualDirections.length === 0) {
      nextErrors.visualDirections = "Select at least one visual direction.";
    }

    if (
      stepIndex === 5 &&
      formData.leadNotificationEmail &&
      !isValidEmail(formData.leadNotificationEmail)
    ) {
      nextErrors.leadNotificationEmail = "Enter a valid lead notification email.";
    }

    if (stepIndex === 7 && formData.goals.length === 0) {
      nextErrors.goals = "Select at least one goal.";
    }

    if (
      stepIndex === 5 &&
      formData.currentPlatform === "Other" &&
      !formData.currentPlatformOther.trim()
    ) {
      nextErrors.currentPlatformOther = "Tell us which website platform you use.";
    }

    if (
      stepIndex === 5 &&
      formData.currentBookingPlatform === "Other" &&
      !formData.currentBookingPlatformOther.trim()
    ) {
      nextErrors.currentBookingPlatformOther =
        "Tell us which booking platform you use.";
    }

    return nextErrors;
  };

  const validateStep = (stepIndex: number) => {
    const nextErrors = getStepErrors(stepIndex, data);
    setErrors(nextErrors);
    return nextErrors;
  };

  const firstStepWithErrors = () => {
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex += 1) {
      const stepErrors = getStepErrors(stepIndex, data);
      if (Object.keys(stepErrors).length > 0) {
        return { stepIndex, stepErrors };
      }
    }
    return { stepIndex: -1, stepErrors: {} as FieldErrors };
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
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
      scrollToFormTop();
    }
  };

  const goBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
    scrollToFormTop();
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage("");

    const invalid = firstStepWithErrors();
    if (invalid.stepIndex >= 0) {
      setCurrentStep(invalid.stepIndex);
      setErrors({
        ...invalid.stepErrors,
        form: "Please fix the highlighted fields before submitting.",
      });
      scrollToFormTop();
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedOffer: OFFER_CONFIG.policies.selectedOffer,
          formData: data,
          honeypot: data.companyWebsite,
          turnstileToken: data.turnstileToken,
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        submissionId?: string;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        setSubmitMessage(
          result.message ||
            "Something went wrong while submitting your onboarding information. Please try again or contact Backend Brilliance.",
        );
        return;
      }

      navigate(
        `${OFFER_CONFIG.routes.onboardingSuccess}?id=${encodeURIComponent(
          result.submissionId || "",
        )}`,
      );
    } catch {
      setSubmitMessage(
        "Something went wrong while submitting your onboarding information. Please try again or contact Backend Brilliance.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentErrors = Object.entries(errors).filter(([field]) => field !== "form");

  return (
    <>
      <PageMeta
        title="Client Onboarding | Backend Brilliance"
        description="Complete the Backend Brilliance Website Conversion System onboarding questionnaire."
        path={OFFER_CONFIG.routes.onboarding}
        noindex
      />
      <SimpleHeader />

      <main className="flow-page onboarding-page">
        <section className="section-shell onboarding-shell">
          <div className="section-heading narrow">
            <p className="eyebrow">Client onboarding</p>
            <h1>Tell Us What We Need To Build Your Client System Foundation.</h1>
            <p>
              This questionnaire collects the business, website, brand, services,
              scheduling, and lead-handling details needed to prepare your
              website, chatbot, forms, and follow-up foundation. Your answers
              stay in place as you move between steps.
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

          <form className="onboarding-form" onSubmit={submitForm} noValidate>
            <input
              className="hp-field"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={data.companyWebsite}
              onChange={(event) =>
                updateStringField("companyWebsite", event.target.value)
              }
              aria-hidden="true"
            />

            {errors.form && (
              <div className="error-summary" role="alert" aria-live="assertive">
                <strong>{errors.form}</strong>
                {currentErrors.length > 0 && (
                  <ul>
                    {currentErrors.map(([field, message]) => (
                      <li key={field}>{message}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="form-card">
              <StepContent
                currentStep={currentStep}
                data={data}
                errors={errors}
                updateStringField={updateStringField}
                updateBooleanField={updateBooleanField}
                toggleArrayValue={toggleArrayValue}
              />
            </div>

            {submitMessage && (
              <div className="error-summary" role="alert" aria-live="assertive">
                {submitMessage}
              </div>
            )}

            <div className="form-actions">
              <button
                className="button button-secondary"
                type="button"
                onClick={goBack}
                disabled={currentStep === 0 || isSubmitting}
              >
                <ArrowLeft size={18} />
                Back
              </button>

              {currentStep < steps.length - 1 ? (
                <button className="button button-primary" type="button" onClick={goNext}>
                  Continue
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button className="button button-primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Onboarding"}
                  <Check size={18} />
                </button>
              )}
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
