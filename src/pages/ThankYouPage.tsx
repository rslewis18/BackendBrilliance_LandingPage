import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, CheckCircle2, ClipboardList } from "lucide-react";
import { PageMeta } from "../components/PageMeta";
import { SimpleHeader } from "../components/SimpleHeader";
import { LINKS } from "../config/links";
import { OFFER_CONFIG } from "../config/offers";
import { trackEvent } from "../utils/tracking";

const implementationAreas = [
  "Business, services, service areas, and hours",
  "Qualification rules and appointment types",
  "Calendar availability, FAQs, and team handoffs",
  "CRM, phone, missed-call, and SMS preferences",
  "Reminder, no-show, nurture, and reactivation workflows",
];

export function ThankYouPage() {
  const implementationCallConfigured = Boolean(LINKS.implementationBooking);

  return (
    <>
      <PageMeta
        title="AI Lead Booking Agent Setup | Backend Brilliance"
        description="Choose how to begin configuring your Backend Brilliance AI Lead Booking Agent."
        path={OFFER_CONFIG.routes.thankYou}
        noindex
      />
      <SimpleHeader />

      <main className="flow-page confirmation-page setup-choice-page">
        <section className="confirmation-card post-purchase-card section-shell">
          <p className="eyebrow">Post-purchase setup</p>
          <h1>Welcome to Backend Brilliance.</h1>
          <h2 className="reserved-heading">Your AI Agent Is Reserved.</h2>
          <p className="hero-lead">
            The next step is configuring your agent around your business, services, lead process, calendar, and customer experience.
          </p>
          <div className="payment-safety-note" role="note">
            <CheckCircle2 size={19} />
            <span>This page does not independently verify payment. Continue only if you reached it after completing checkout or were sent here by Backend Brilliance.</span>
          </div>

          <div className="setup-choice-grid" aria-label="Choose your setup path">
            <article className="setup-choice-card is-primary">
              <span className="setup-choice-number">Option 1</span>
              <ClipboardList size={30} />
              <h2>Set Up Now</h2>
              <p>Use the existing guided intake to start providing the information needed to customize your agent.</p>
              <Link
                className="button button-primary"
                onClick={() => trackEvent("onboarding_cta_click", { location: "thank_you_self_service" })}
                to={`${OFFER_CONFIG.routes.onboarding}?service=${encodeURIComponent("AI Lead Booking Agent")}`}
              >
                Set Up My Agent <ArrowRight size={18} />
              </Link>
            </article>

            <article className="setup-choice-card">
              <span className="setup-choice-number">Option 2</span>
              <CalendarDays size={30} />
              <h2>Have Chloe Walk Me Through It</h2>
              <p>Chloe can conduct the implementation interview and collect what we need to configure your agent.</p>
              {implementationCallConfigured ? (
                <a
                  className="button button-secondary"
                  href={LINKS.implementationBooking}
                  onClick={() => trackEvent("implementation_call_click", { location: "thank_you" })}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Schedule My Implementation Call <ArrowRight size={18} />
                </a>
              ) : (
                <>
                  <button className="button button-secondary" disabled type="button">Schedule My Implementation Call</button>
                  <small className="configuration-note">Available once the implementation scheduling URL is configured.</small>
                </>
              )}
            </article>
          </div>

          <details className="implementation-details">
            <summary>What we&apos;ll configure <span>+</span></summary>
            <p>Whether you complete the intake or meet with Chloe, implementation may cover:</p>
            <ul>{implementationAreas.map((item) => <li key={item}><CheckCircle2 size={17} /> {item}</li>)}</ul>
          </details>

          <div className="setup-flow-strip" aria-label="Implementation process">
            {[
              ["1", "Configure"],
              ["2", "Test"],
              ["3", "Approve"],
              ["4", "Launch"],
            ].map(([number, label]) => <span key={label}><b>{number}</b>{label}</span>)}
          </div>

          <p className="setup-support-line">Need help with your next step? <a href={LINKS.supportEmail}>{OFFER_CONFIG.site.supportEmail}</a></p>
        </section>
      </main>
    </>
  );
}
