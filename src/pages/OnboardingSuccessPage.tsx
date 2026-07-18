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
        title="Onboarding Received | Backend Brilliance"
        description="Backend Brilliance has received your onboarding information."
        path={OFFER_CONFIG.routes.onboardingSuccess}
        noindex
      />
      <SimpleHeader />

      <main className="flow-page confirmation-page">
        <section className="confirmation-card section-shell">
          <p className="eyebrow">Onboarding received</p>
          <h1>You&apos;re All Set 🎉</h1>
          <p className="hero-lead">
            We&apos;ve received your onboarding information and now have what we
            need to begin reviewing your Website Conversion System project.
          </p>
          <p>
            Backend Brilliance will use your answers to prepare the website,
            chatbot, scheduling, and follow-up foundation, then contact you with
            next steps.
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
              Back to Homepage
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
