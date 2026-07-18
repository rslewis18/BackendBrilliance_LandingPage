import {
  type FormEvent,
  type RefObject,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { ArrowRight, X } from "lucide-react";

type AuditRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  returnFocusRef?: RefObject<HTMLElement | null>;
};

type AuditFormData = {
  businessName: string;
  websiteUrl: string;
  phone: string;
  email: string;
  companyWebsite: string;
};

type AuditFieldErrors = Partial<Record<keyof AuditFormData | "form", string>>;

const initialFormData: AuditFormData = {
  businessName: "",
  websiteUrl: "",
  phone: "",
  email: "",
  companyWebsite: "",
};

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const isValidPhone = (value: string) =>
  value.replace(/[^\d]/g, "").length >= 10;

const isValidWebsite = (value: string) => {
  try {
    const withProtocol = /^https?:\/\//i.test(value)
      ? value
      : `https://${value}`;
    const url = new URL(withProtocol);
    return Boolean(url.hostname.includes("."));
  } catch {
    return false;
  }
};

export function AuditRequestModal({
  isOpen,
  onClose,
  returnFocusRef,
}: AuditRequestModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<AuditFormData>(initialFormData);
  const [errors, setErrors] = useState<AuditFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("aria-hidden"));

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }
    onClose();
    window.setTimeout(() => returnFocusRef?.current?.focus(), 0);
  };

  const updateField = (field: keyof AuditFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      delete next.form;
      return next;
    });
  };

  const validate = () => {
    const nextErrors: AuditFieldErrors = {};

    if (!formData.businessName.trim()) {
      nextErrors.businessName = "Business name is required.";
    }

    if (!formData.websiteUrl.trim()) {
      nextErrors.websiteUrl = "Website URL is required.";
    } else if (!isValidWebsite(formData.websiteUrl)) {
      nextErrors.websiteUrl = "Enter a valid website URL.";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!isValidPhone(formData.phone)) {
      nextErrors.phone = "Enter a valid phone number.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!isValidEmail(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    return nextErrors;
  };

  const submitAuditRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0 || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/audit-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          sourcePage: window.location.pathname,
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        setErrors({
          form:
            result.message ||
            "We could not submit your request right now. Please try again or contact Backend Brilliance directly.",
        });
        return;
      }

      setFormData(initialFormData);
      setErrors({});
      setSuccessMessage(
        "Your request has been received. We'll review your website and prepare your personalized audit within approximately 24 hours.",
      );
    } catch {
      setErrors({
        form:
          "We could not submit your request right now. Please try again or contact Backend Brilliance directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={handleClose}>
      <div
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        aria-modal="true"
        className="audit-modal"
        onMouseDown={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
      >
        <button
          aria-label="Close personalized audit request"
          className="modal-close"
          disabled={isSubmitting}
          onClick={handleClose}
          type="button"
        >
          <X size={20} />
        </button>

        <p className="eyebrow">Free Personalized Audit</p>
        <h2 id={titleId}>Get Your Free Personalized Audit</h2>
        <p id={descriptionId}>
          Tell us a little about your business and website. We'll review your
          current online presence and send your personalized audit within
          approximately 24 hours.
        </p>

        {successMessage ? (
          <div className="success-card" role="status" aria-live="polite">
            <strong>Request received.</strong>
            <p>{successMessage}</p>
            <button className="button button-primary" onClick={handleClose} type="button">
              Close
            </button>
          </div>
        ) : (
          <form className="audit-form" onSubmit={submitAuditRequest} noValidate>
            {errors.form && (
              <div className="error-summary" role="alert" aria-live="assertive">
                {errors.form}
              </div>
            )}

            <input
              aria-hidden="true"
              autoComplete="off"
              className="hp-field"
              tabIndex={-1}
              type="text"
              value={formData.companyWebsite}
              onChange={(event) => updateField("companyWebsite", event.target.value)}
            />

            <label className="form-field">
              <span>Business name</span>
              <input
                autoComplete="organization"
                aria-invalid={Boolean(errors.businessName)}
                ref={firstFieldRef}
                value={formData.businessName}
                onChange={(event) => updateField("businessName", event.target.value)}
              />
              {errors.businessName && (
                <small className="field-error">{errors.businessName}</small>
              )}
            </label>

            <label className="form-field">
              <span>Website URL</span>
              <input
                autoComplete="url"
                aria-invalid={Boolean(errors.websiteUrl)}
                inputMode="url"
                value={formData.websiteUrl}
                onChange={(event) => updateField("websiteUrl", event.target.value)}
              />
              {errors.websiteUrl && (
                <small className="field-error">{errors.websiteUrl}</small>
              )}
            </label>

            <label className="form-field">
              <span>Phone number</span>
              <input
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                inputMode="tel"
                value={formData.phone}
                onChange={(event) => updateField("phone", event.target.value)}
              />
              {errors.phone && <small className="field-error">{errors.phone}</small>}
            </label>

            <label className="form-field">
              <span>Email address</span>
              <input
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                inputMode="email"
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
              />
              {errors.email && <small className="field-error">{errors.email}</small>}
            </label>

            <button className="button button-primary" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Submitting..." : "Request My Free Audit"}
              <ArrowRight size={18} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
