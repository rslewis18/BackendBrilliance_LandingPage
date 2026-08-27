import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, CheckCircle2, ClipboardList } from "lucide-react";
import { PageMeta } from "../components/PageMeta";
import { SimpleHeader } from "../components/SimpleHeader";
import { LINKS } from "../config/links";
import { OFFER_CONFIG } from "../config/offers";
import { trackEvent } from "../utils/tracking";

const implementationAreas = [
  "Business information and services",
  "Service areas and business hours",
  "Qualification questions",
  "Appointment and calendar rules",
  "Frequently asked questions",
  "CRM and calendar integrations",
  "Escalation and transfer rules",
  "Missed-call workflows",
  "Follow-up and reminder preferences",
  "Old-lead reactivation",
  "Agent communication boundaries",
];

const implementationSteps = [
  {
    number: "1",
    title: "Configure",
    copy: "We customize the agent around your business and workflows.",
  },
  {
    number: "2",
    title: "Test",
    copy: "We test conversations, booking rules, routing, and follow-up.",
  },
  {
    number: "3",
    title: "Approve",
    copy: "You review the configured experience before launch.",
  },
  {
    number: "4",
    title: "Launch",
    copy: "Your AI agent goes live.",
  },
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
          <p className="eyebrow">Customer implementation</p>
          <h1>Welcome to Backend Brilliance.</h1>
          <h2 className="reserved-heading">Your AI Agent Is Reserved.</h2>
          <p className="hero-lead">
            Your next step is configuring your agent around your business, services, lead process, calendar, and customer experience. Choose the setup option that works best for you.
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
              <p>Prefer to move ahead right away? Complete your implementation details online and give us the information we need to begin configuring your agent.</p>
              <Link
                className="button button-primary"
                onClick={() => trackEvent("onboarding_cta_click", { location: "thank_you_self_service" })}
                to={`${OFFER_CONFIG.routes.onboarding}?service=${encodeURIComponent("AI Lead Booking Agent")}`}
              >
                Start My Setup <ArrowRight size={18} />
              </Link>
            </article>

            <article className="setup-choice-card">
              <span className="setup-choice-number">Option 2</span>
              <CalendarDays size={30} />
              <h2>Schedule Your Implementation Call</h2>
              <p>Prefer some help? Choose a convenient time and our implementation specialist will call the phone number you provide and walk through the setup step by step. This is an implementation call, not a sales or demo call.</p>
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
                  <small className="configuration-note">Online implementation scheduling is being configured. Contact Backend Brilliance if you need help starting setup.</small>
                </>
              )}
            </article>
          </div>

          <details className="implementation-details">
            <summary>What we&apos;ll configure <span>+</span></summary>
            <p>Whether you complete the intake online or schedule a call, implementation may cover:</p>
            <ul>{implementationAreas.map((item) => <li key={item}><CheckCircle2 size={17} /> {item}</li>)}</ul>
          </details>

          <div className="setup-flow-strip" aria-label="Implementation process">
            {implementationSteps.map((step) => (
              <article key={step.title}>
                <span><b>{step.number}</b>{step.title}</span>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>

          <p className="setup-support-line">Need help with your next step? <a href={LINKS.supportEmail}>{OFFER_CONFIG.site.supportEmail}</a></p>
        </section>
      </main>
    </>
  );
}
