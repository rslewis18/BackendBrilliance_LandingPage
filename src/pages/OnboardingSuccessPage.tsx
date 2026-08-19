import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { PageMeta } from "../components/PageMeta";
import { SimpleHeader } from "../components/SimpleHeader";
import { LINKS } from "../config/links";
import { OFFER_CONFIG } from "../config/offers";

export function OnboardingSuccessPage() {
  const [searchParams] = useSearchParams();
  const submissionId = searchParams.get("id");

  return (
    <>
      <PageMeta
        title="Business Intake Received | Backend Brilliance"
        description="Backend Brilliance has received your business intake information."
        path={OFFER_CONFIG.routes.onboardingSuccess}
        noindex
      />
      <SimpleHeader />

      <main className="flow-page confirmation-page">
        <section className="confirmation-card section-shell">
          <p className="eyebrow">Business intake received</p>
          <h1>We&apos;ve Got It</h1>
          <p className="hero-lead">
            Your onboarding information has been submitted successfully.
            We&apos;ll review the details and begin preparing the next stage of
            your setup.
          </p>
          <p>
            If we need clarification or additional access, we&apos;ll contact you
            using the information you provided.
          </p>
          <div className="mini-panel">
            <strong>Response expectation</strong>
            <span>{OFFER_CONFIG.policies.responseTime}</span>
          </div>
          {submissionId && (
            <div className="mini-panel">
              <strong>Confirmation number</strong>
              <span>{submissionId}</span>
            </div>
          )}
          <div className="hero-actions">
            <Link className="button button-primary" to={OFFER_CONFIG.routes.home}>
              Back to Backend Brilliance
              <ArrowRight size={18} />
            </Link>
            <a className="button button-secondary" href={LINKS.supportEmail}>
              <Mail size={18} />
              {OFFER_CONFIG.site.supportEmail}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
