import { type FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageMeta } from "../components/PageMeta";
import { SimpleHeader } from "../components/SimpleHeader";
import { OFFER_CONFIG } from "../config/offers";

type QuickStartData = {
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

type QuickStartField = keyof QuickStartData;
type FieldErrors = Partial<Record<QuickStartField | "form", string>>;

const initialData: QuickStartData = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  currentWebsite: "",
  services: "",
  serviceArea: "",
  primaryGoal: "",
  preferredContactMethod: "",
  brandAssetsLink: "",
  additionalNotes: "",
  source: "Backend Brilliance Onboarding",
};

const primaryGoalOptions = [
  "Get more phone calls",
  "Generate more leads",
  "Increase online bookings",
  "Improve credibility",
  "Replace an outdated website",
  "Other",
];

const preferredContactOptions = ["Email", "Phone", "Text"];

const requiredFields: QuickStartField[] = [
  "businessName",
  "contactName",
  "email",
  "phone",
  "services",
  "serviceArea",
  "primaryGoal",
];

const fieldLabels: Record<QuickStartField, string> = {
  businessName: "Business name",
  contactName: "Primary contact name",
  email: "Email address",
  phone: "Phone number",
  currentWebsite: "Current website, if applicable",
  services: "Main services offered",
  serviceArea: "Cities or service areas",
  primaryGoal: "What is the primary goal for your website?",
  preferredContactMethod: "Preferred contact method",
  brandAssetsLink: "Link to logo, photos, or brand assets",
  additionalNotes: "Anything else we should know?",
  source: "Source",
};

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const isValidPhone = (value: string) =>
  value.replace(/[^\d]/g, "").length >= 10;

function normalizeData(data: QuickStartData): QuickStartData {
  return {
    businessName: data.businessName.trim(),
    contactName: data.contactName.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    currentWebsite: data.currentWebsite.trim(),
    services: data.services.trim(),
    serviceArea: data.serviceArea.trim(),
    primaryGoal: data.primaryGoal.trim(),
    preferredContactMethod: data.preferredContactMethod.trim(),
    brandAssetsLink: data.brandAssetsLink.trim(),
    additionalNotes: data.additionalNotes.trim(),
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
  inputMode,
}: {
  label: string;
  field: QuickStartField;
  value: string;
  error?: string;
  onChange: (field: QuickStartField, value: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "url";
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
        required={required}
        type={type}
        value={value}
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
  field: QuickStartField;
  value: string;
  error?: string;
  onChange: (field: QuickStartField, value: string) => void;
  required?: boolean;
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
        required={required}
        value={value}
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
  field: QuickStartField;
  value: string;
  error?: string;
  options: readonly string[];
  onChange: (field: QuickStartField, value: string) => void;
  required?: boolean;
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
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [data, setData] = useState<QuickStartData>(initialData);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const updateField = (field: QuickStartField, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      delete next.form;
      return next;
    });
  };

  const validate = (payload: QuickStartData) => {
    const nextErrors: FieldErrors = {};

    requiredFields.forEach((field) => {
      if (!payload[field].trim()) {
        nextErrors[field] = `${fieldLabels[field]} is required.`;
      }
    });

    if (payload.email && !isValidEmail(payload.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (payload.phone && !isValidPhone(payload.phone)) {
      nextErrors.phone = "Enter a valid phone number.";
    }

    setErrors(nextErrors);
    return nextErrors;
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage("");

    if (isSubmitting) {
      return;
    }

    const payload = normalizeData(data);
    const validationErrors = validate(payload);

    if (Object.keys(validationErrors).length > 0) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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

  return (
    <>
      <PageMeta
        title="Client Onboarding | Backend Brilliance"
        description="Complete the Backend Brilliance quick start onboarding form."
        path={OFFER_CONFIG.routes.onboarding}
        noindex
      />
      <SimpleHeader />

      <main className="flow-page onboarding-page">
        <section className="section-shell onboarding-shell quick-onboarding-shell">
          <div className="section-heading narrow">
            <p className="eyebrow">Quick start onboarding</p>
            <h1>Let&apos;s Get Your Website Conversion System Started.</h1>
            <p>
              This quick form gives us enough information to begin. We&apos;ll
              contact you directly if we need additional details, photos, logins,
              or brand assets.
            </p>
          </div>

          <form
            className="onboarding-form quick-onboarding-form"
            onSubmit={submitForm}
            noValidate
            ref={formRef}
          >
            {errors.form && (
              <div className="error-summary" role="alert" aria-live="assertive">
                {errors.form}
              </div>
            )}

            <div className="form-card">
              <div className="form-guidance">
                <h2>Project basics</h2>
                <p>
                  Keep this simple. A few clear answers are enough for Backend
                  Brilliance to prepare the next step.
                </p>
              </div>

              <div className="form-grid">
                <TextField
                  autoComplete="organization"
                  error={errors.businessName}
                  field="businessName"
                  label="Business name"
                  onChange={updateField}
                  required
                  value={data.businessName}
                />
                <TextField
                  autoComplete="name"
                  error={errors.contactName}
                  field="contactName"
                  label="Primary contact name"
                  onChange={updateField}
                  required
                  value={data.contactName}
                />
                <TextField
                  autoComplete="email"
                  error={errors.email}
                  field="email"
                  inputMode="email"
                  label="Email address"
                  onChange={updateField}
                  required
                  type="email"
                  value={data.email}
                />
                <TextField
                  autoComplete="tel"
                  error={errors.phone}
                  field="phone"
                  inputMode="tel"
                  label="Phone number"
                  onChange={updateField}
                  required
                  type="tel"
                  value={data.phone}
                />
                <TextField
                  autoComplete="url"
                  error={errors.currentWebsite}
                  field="currentWebsite"
                  inputMode="url"
                  label="Current website, if applicable"
                  onChange={updateField}
                  type="url"
                  value={data.currentWebsite}
                />
                <SelectField
                  error={errors.preferredContactMethod}
                  field="preferredContactMethod"
                  label="Preferred contact method"
                  onChange={updateField}
                  options={preferredContactOptions}
                  value={data.preferredContactMethod}
                />
                <TextAreaField
                  error={errors.services}
                  field="services"
                  label="Main services offered"
                  onChange={updateField}
                  required
                  value={data.services}
                />
                <TextAreaField
                  error={errors.serviceArea}
                  field="serviceArea"
                  label="Cities or service areas"
                  onChange={updateField}
                  required
                  value={data.serviceArea}
                />
                <SelectField
                  error={errors.primaryGoal}
                  field="primaryGoal"
                  label="What is the primary goal for your website?"
                  onChange={updateField}
                  options={primaryGoalOptions}
                  required
                  value={data.primaryGoal}
                />
                <TextField
                  error={errors.brandAssetsLink}
                  field="brandAssetsLink"
                  inputMode="url"
                  label="Link to logo, photos, or brand assets"
                  onChange={updateField}
                  type="url"
                  value={data.brandAssetsLink}
                />
                <TextAreaField
                  error={errors.additionalNotes}
                  field="additionalNotes"
                  label="Anything else we should know?"
                  onChange={updateField}
                  value={data.additionalNotes}
                />
              </div>
            </div>

            {submitMessage && (
              <div className="error-summary" role="alert" aria-live="assertive">
                {submitMessage}
              </div>
            )}

            <div className="quick-submit-card">
              <div>
                <strong>Ready when you are.</strong>
                <p>
                  We&apos;ll save this to the Backend Brilliance onboarding
                  sheet and review it before following up.
                </p>
              </div>
              <button
                className="button button-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Quick Start Form"}
                {isSubmitting ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
