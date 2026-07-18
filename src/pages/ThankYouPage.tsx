import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { PageMeta } from "../components/PageMeta";
import { SimpleHeader } from "../components/SimpleHeader";
import { LINKS } from "../config/links";
import { OFFER_CONFIG } from "../config/offers";

export function ThankYouPage() {
  return (
    <>
      <PageMeta
        title="Thank You | Backend Brilliance"
        description="Complete your Backend Brilliance onboarding questionnaire."
        path={OFFER_CONFIG.routes.thankYou}
        noindex
      />
      <SimpleHeader />

      <main className="flow-page confirmation-page">
        <section className="confirmation-card section-shell">
          <p className="eyebrow">Checkout complete</p>
          <h1>Welcome to Backend Brilliance 🎉</h1>
          <p className="hero-lead">Your checkout has been completed.</p>
          <p>
            The final step is completing your onboarding questionnaire so we can
            begin preparing your website, AI chatbot, scheduling, and follow-up
            foundation.
          </p>
          <div className="mini-panel">
            <strong>Estimated completion time</strong>
            <span>Approximately 5-10 minutes.</span>
          </div>
          <div className="hero-actions">
            <Link className="button button-primary" to={OFFER_CONFIG.routes.onboarding}>
              Complete My Onboarding
              <ArrowRight size={18} />
            </Link>
            <a className="button button-secondary" href={LINKS.supportEmail}>
              <Mail size={18} />
              Contact Backend Brilliance
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
