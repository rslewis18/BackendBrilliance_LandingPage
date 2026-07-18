import { type FormEvent, useMemo, useState } from "react";
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

export function OnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const progress = useMemo(
    () => Math.round(((currentStep + 1) / steps.length) * 100),
    [currentStep],
  );

  const updateField = <Field extends keyof OnboardingData>(
    field: Field,
    value: OnboardingData[Field],
  ) => {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      delete next.form;
      return next;
    });
  };

  const toggleArrayValue = (field: "visualDirections" | "goals", value: string) => {
    setData((current) => {
      const values = current[field];
      return {
        ...current,
        [field]: values.includes(value)
          ? values.filter((item) => item !== value)
          : [...values, value],
      };
    });
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      delete next.form;
      return next;
    });
  };

  const validateStep = (stepIndex: number) => {
    const nextErrors: FieldErrors = {};
    const requiredFields = requiredByStep[stepIndex] || [];

    requiredFields.forEach((field) => {
      const value = data[field];
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

    if (stepIndex === 0 && data.email && !isValidEmail(data.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (stepIndex === 3 && data.visualDirections.length === 0) {
      nextErrors.visualDirections = "Select at least one visual direction.";
    }

    if (stepIndex === 5 && data.leadNotificationEmail && !isValidEmail(data.leadNotificationEmail)) {
      nextErrors.leadNotificationEmail = "Enter a valid lead notification email.";
    }

    if (stepIndex === 7 && data.goals.length === 0) {
      nextErrors.goals = "Select at least one goal.";
    }

    if (stepIndex === 5 && data.currentPlatform === "Other" && !data.currentPlatformOther.trim()) {
      nextErrors.currentPlatformOther = "Tell us which website platform you use.";
    }

    if (
      stepIndex === 5 &&
      data.currentBookingPlatform === "Other" &&
      !data.currentBookingPlatformOther.trim()
    ) {
      nextErrors.currentBookingPlatformOther =
        "Tell us which booking platform you use.";
    }

    setErrors(nextErrors);
    return nextErrors;
  };

  const firstStepWithErrors = () => {
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex += 1) {
      const stepErrors = validateStep(stepIndex);
      if (Object.keys(stepErrors).length > 0) {
        return stepIndex;
      }
    }
    return -1;
  };

  const goNext = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage("");

    const invalidStep = firstStepWithErrors();
    if (invalidStep >= 0) {
      setCurrentStep(invalidStep);
      setErrors((current) => ({
        ...current,
        form: "Please fix the highlighted fields before submitting.",
      }));
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

          <div className="progress-wrap" aria-label={`Step ${currentStep + 1} of ${steps.length}`}>
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
              onChange={(event) => updateField("companyWebsite", event.target.value)}
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

            <div className="form-card">{renderStep()}</div>

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

  function renderStep() {
    switch (currentStep) {
      case 0:
        return (
          <FormGrid>
            <TextField label="Contact name" field="contactName" required />
            <TextField label="Business name" field="businessName" required />
            <TextField label="Email" field="email" type="email" required />
            <TextField label="Phone" field="phone" type="tel" required />
            <SelectField
              label="Preferred contact method"
              field="preferredContactMethod"
              required
              options={["Email", "Phone", "Text"]}
            />
          </FormGrid>
        );
      case 1:
        return (
          <FormGrid>
            <TextField label="Industry" field="industry" required />
            <TextField label="Current website URL" field="currentWebsiteUrl" type="url" />
            <TextField label="Domain" field="domain" />
            <TextField label="Business address" field="businessAddress" />
            <TextField label="Primary service area" field="primaryServiceArea" required />
            <TextAreaField label="Short business description" field="businessDescription" required />
            <TextField label="Years in business" field="yearsInBusiness" />
            <TextField label="Public business phone" field="publicBusinessPhone" type="tel" />
            <TextField label="Public business email" field="publicBusinessEmail" type="email" />
          </FormGrid>
        );
      case 2:
        return (
          <FormGrid>
            <TextAreaField label="Primary services" field="primaryServices" required />
            <TextField label="Highest-priority service" field="highestPriorityService" required />
            <TextField label="Highest-revenue service" field="highestRevenueService" />
            <TextAreaField label="Current promotions" field="currentPromotions" />
            <TextAreaField label="Pricing information" field="pricingInformation" />
            <TextAreaField label="Financing information" field="financingInformation" />
            <TextAreaField label="Service areas" field="serviceAreas" />
            <TextAreaField label="Services that should not be promoted" field="servicesNotPromoted" />
          </FormGrid>
        );
      case 3:
        return (
          <FormGrid>
            <TextField label="Brand colors" field="brandColors" />
            <TextField label="Font preferences" field="fontPreferences" />
            <TextAreaField label="Existing brand guidelines" field="brandGuidelines" />
            <TextField label="Desired style" field="desiredStyle" required />
            <TextAreaField label="Words that describe the brand" field="brandWords" />
            <TextAreaField label="Websites they like" field="websitesTheyLike" />
            <TextAreaField label="Websites or styles they dislike" field="websitesTheyDislike" />
            <CheckboxGroup
              label="Visual direction"
              field="visualDirections"
              options={visualOptions}
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
            <TextField label="Shared asset-folder link" field="assetFolderLink" type="url" />
          </FormGrid>
        );
      case 5:
        return (
          <FormGrid>
            <SelectField
              label="Current hosting or website platform"
              field="currentPlatform"
              required
              options={platformOptions}
            />
            {data.currentPlatform === "Other" && (
              <TextField label="Other website platform" field="currentPlatformOther" required />
            )}
            <SelectField
              label="Current booking platform"
              field="currentBookingPlatform"
              required
              options={bookingOptions}
            />
            {data.currentBookingPlatform === "Other" && (
              <TextField label="Other booking platform" field="currentBookingPlatformOther" required />
            )}
            <TextField label="Booking URL" field="bookingUrl" type="url" />
            <TextField label="Current CRM" field="currentCrm" />
            <TextField label="Current contact-form destination" field="contactFormDestination" />
            <TextAreaField label="Who receives website inquiries?" field="inquiryRecipients" />
            <TextField
              label="Preferred lead-notification email"
              field="leadNotificationEmail"
              type="email"
              required
            />
            <TextField
              label="Preferred lead-notification phone"
              field="leadNotificationPhone"
              type="tel"
            />
            <TextAreaField label="Current follow-up process" field="followUpProcess" />
          </FormGrid>
        );
      case 6:
        return (
          <FormGrid>
            <TextField label="Facebook" field="facebook" type="url" />
            <TextField label="Instagram" field="instagram" type="url" />
            <TextField label="TikTok" field="tiktok" type="url" />
            <TextField label="LinkedIn" field="linkedin" type="url" />
            <TextField label="YouTube" field="youtube" type="url" />
            <TextField label="Google Business Profile" field="googleBusinessProfile" type="url" />
            <TextField label="Yelp" field="yelp" type="url" />
            <TextAreaField label="Other important profile links" field="otherProfiles" />
          </FormGrid>
        );
      case 7:
        return (
          <FormGrid>
            <CheckboxGroup label="Goals" field="goals" options={goalOptions} />
            {data.goals.includes("Other") && (
              <TextField label="Other goal" field="goalsOther" />
            )}
            <TextAreaField
              label="What is the most important result you want from your new or improved website?"
              field="primaryGoal"
              required
            />
          </FormGrid>
        );
      case 8:
        return (
          <FormGrid>
            <TextField label="Competitor 1" field="competitor1" type="url" />
            <TextField label="Competitor 2" field="competitor2" type="url" />
            <TextField label="Competitor 3" field="competitor3" type="url" />
            <TextAreaField label="What do you like about their websites?" field="competitorLikes" />
            <TextAreaField
              label="What should make your business feel different?"
              field="differentiator"
            />
          </FormGrid>
        );
      default:
        return (
          <FormGrid>
            <TextAreaField label="Additional information" field="additionalInformation" />
            <TextAreaField label="Special requests" field="specialRequests" />
            <TextField label="Important deadlines" field="importantDeadlines" />
            <TextAreaField label="Upcoming promotions" field="upcomingPromotions" />
            <TextAreaField label="Legal or compliance requirements" field="legalRequirements" />
            <TextField label="Best time to contact the client" field="bestTimeToContact" />
            <label className="checkbox-card confirm-card">
              <input
                type="checkbox"
                checked={data.confirmation}
                onChange={(event) => updateField("confirmation", event.target.checked)}
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

  function FormGrid({ children }: { children: React.ReactNode }) {
    return <div className="form-grid">{children}</div>;
  }

  function TextField({
    label,
    field,
    type = "text",
    required = false,
  }: {
    label: string;
    field: keyof OnboardingData;
    type?: string;
    required?: boolean;
  }) {
    const error = errors[field];
    return (
      <label className="form-field">
        <span>
          {label}
          {required && <b> *</b>}
        </span>
        <input
          type={type}
          value={String(data[field])}
          onChange={(event) => updateField(field, event.target.value)}
          aria-invalid={Boolean(error)}
        />
        {error && <small className="field-error">{error}</small>}
      </label>
    );
  }

  function TextAreaField({
    label,
    field,
    required = false,
  }: {
    label: string;
    field: keyof OnboardingData;
    required?: boolean;
  }) {
    const error = errors[field];
    return (
      <label className="form-field wide">
        <span>
          {label}
          {required && <b> *</b>}
        </span>
        <textarea
          value={String(data[field])}
          onChange={(event) => updateField(field, event.target.value)}
          aria-invalid={Boolean(error)}
        />
        {error && <small className="field-error">{error}</small>}
      </label>
    );
  }

  function SelectField({
    label,
    field,
    options,
    required = false,
  }: {
    label: string;
    field: keyof OnboardingData;
    options: readonly string[];
    required?: boolean;
  }) {
    const error = errors[field];
    return (
      <label className="form-field">
        <span>
          {label}
          {required && <b> *</b>}
        </span>
        <select
          value={String(data[field])}
          onChange={(event) => updateField(field, event.target.value)}
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
    options,
  }: {
    label: string;
    field: "visualDirections" | "goals";
    options: readonly string[];
  }) {
    const error = errors[field];
    return (
      <fieldset className="checkbox-group wide" aria-invalid={Boolean(error)}>
        <legend>{label}</legend>
        <div className="checkbox-grid">
          {options.map((option) => (
            <label className="checkbox-card" key={option}>
              <input
                type="checkbox"
                checked={data[field].includes(option)}
                onChange={() => toggleArrayValue(field, option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {error && <small className="field-error">{error}</small>}
      </fieldset>
    );
  }
}
