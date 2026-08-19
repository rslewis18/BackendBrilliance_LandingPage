import { Link, useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  CreditCard,
  FileText,
  HelpCircle,
  MessageCircle,
  Rocket,
} from "lucide-react";
import { PageMeta } from "../components/PageMeta";
import { SimpleHeader } from "../components/SimpleHeader";
import { LINKS } from "../config/links";
import { OFFER_CONFIG } from "../config/offers";
import { trackEvent } from "../utils/tracking";

const sanitizeBusinessName = (value: string | null) => {
  if (!value) {
    return "";
  }

  return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 80);
};

const howItWorksIcons = [CreditCard, FileText, MessageCircle, Rocket];

export function StartPage() {
  const [searchParams] = useSearchParams();
  const shouldReduceMotion = useReducedMotion();
  const businessName = sanitizeBusinessName(searchParams.get("business"));
  const hasAuditContext =
    Boolean(businessName) ||
    searchParams.has("audit") ||
    searchParams.get("source") === "audit";
  const checkoutCancelled = searchParams.get("checkout") === "cancelled";
  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
      };

  const personalizedMessage = businessName
    ? `Based on the opportunities identified for ${businessName}, this is the next step we recommend.`
    : hasAuditContext
      ? "Based on the opportunities identified in your audit, this is the next step we recommend."
      : "Use this page when Backend Brilliance has sent you here after a conversation, proposal, or custom payment link.";

  const summaryDetails = [
    "Custom payment link or invoice after discovery",
    "Scope confirmed before work begins",
    "Generic thank-you page after payment",
    "Universal onboarding follows after the next step is complete",
    "Backend Brilliance will follow up if anything else is needed",
  ];

  const planDetails = [
    {
      title: "Cancellation policy",
      copy: OFFER_CONFIG.policies.cancellation,
    },
    {
      title: "Third-party software and usage costs",
      copy: OFFER_CONFIG.policies.thirdPartyCosts,
    },
    {
      title: "Ongoing edits",
      copy: OFFER_CONFIG.policies.ongoingEditsScope,
    },
    {
      title: "Setup-fee clarification",
      copy: OFFER_CONFIG.policies.setupFeeLanguage,
    },
  ];

  const conciseFaqs = [
    {
      question: "Should I use this page before talking with Backend Brilliance?",
      answer:
        "No. This page is intended for prospects who already discussed a recommended solution, proposal, or payment path.",
    },
    {
      question: "What happens after payment or approval?",
      answer:
        "You will be directed to the universal business intake so Backend Brilliance can collect the details needed for setup.",
    },
    {
      question: "What if I am not sure which solution I need?",
      answer:
        "Book a growth review first. Backend Brilliance will help identify the bottleneck and recommend the right system.",
    },
    {
      question: "Are third-party costs included?",
      answer: OFFER_CONFIG.policies.thirdPartyCosts,
    },
  ];

  return (
    <>
      <PageMeta
        title="Next Step | Backend Brilliance"
        description="Confirm the right Backend Brilliance solution before payment or onboarding."
        path={OFFER_CONFIG.routes.start}
        noindex
      />
      <SimpleHeader />

      <main className="flow-page start-page">
        <section className="start-hero section-shell" aria-labelledby="start-title">
          <motion.div className="start-copy" {...reveal}>
            <p className="eyebrow">Backend Brilliance setup</p>
            {businessName && <p className="welcome-line">Welcome, {businessName}.</p>}
            <h1 id="start-title">Confirm the Right Next Step</h1>
            <p className="start-subhead">
              Backend Brilliance solutions are scoped after a conversation.
            </p>
            <p className="start-intro">
              We do not send every business into one public checkout. After
              discovery, you&apos;ll receive the appropriate proposal, invoice,
              or Stripe payment link for the solution we recommend.
            </p>
            <p className="start-personal-note">{personalizedMessage}</p>

            {checkoutCancelled && (
              <div className="notice-card" role="status">
                Your checkout was not completed. No payment was processed. You
                can try again whenever you&apos;re ready.
              </div>
            )}

            <div className="start-action-row">
              <a
                className="button button-primary"
                href={LINKS.booking}
                onClick={() => trackEvent("booking_click", { location: "start_hero" })}
                target="_blank"
                rel="noopener noreferrer"
              >
                Find the Right Solution
                <ArrowRight size={18} />
              </a>
              <a
                className="button button-secondary"
                href={LINKS.booking}
                onClick={() => trackEvent("booking_click", { location: "start_hero" })}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Growth Review
              </a>
            </div>
          </motion.div>

          <motion.aside className="start-purchase-card" {...reveal}>
            <p className="eyebrow">Start here</p>
            <h2>Need a custom payment link?</h2>
            <p>
              Book or continue your growth review first. Once scope is clear,
              Backend Brilliance can send the correct Stripe link, invoice, or
              proposal for your setup.
            </p>
            <a
              className="button button-primary"
              href={LINKS.booking}
              onClick={() => trackEvent("booking_click", { location: "start_card" })}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find the Right Solution
              <ArrowRight size={18} />
            </a>
            <small>
              If you already paid, use the thank-you or onboarding link sent
              with your payment confirmation.
            </small>
          </motion.aside>
        </section>

        <section className="start-section section-shell" aria-labelledby="included-title">
          <div className="section-heading centered compact-heading">
            <p className="eyebrow">What is included</p>
            <h2 id="included-title">Your setup depends on the recommended solution.</h2>
          </div>
          <div className="start-outcome-grid">
            {[
              "A clear implementation path after discovery",
              "A universal onboarding step for business details",
              "Service-specific setup questions where needed",
              "Follow-up from Backend Brilliance if access or clarification is required",
            ].map((feature) => (
              <article className="start-outcome-card" key={feature}>
                <CheckCircle2 size={20} />
                <p>{feature}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="start-section section-shell" aria-labelledby="works-title">
          <div className="section-heading centered compact-heading">
            <p className="eyebrow">How it works</p>
            <h2 id="works-title">From recommendation to setup.</h2>
          </div>
          <div className="start-step-grid">
            {[
              {
                title: "Confirm the next step",
                copy: "Review the recommended solution, scope, and next step.",
              },
              {
                title: "Complete onboarding",
                copy: "After payment or approval, tell us about your business, goals, and current bottleneck.",
              },
              {
                title: "We prepare implementation",
                copy: "Backend Brilliance reviews the details and starts the agreed setup.",
              },
              {
                title: "Review and launch",
                copy: "When applicable, you review or test the setup before final launch or handoff.",
              },
            ].map((step, index) => {
              const Icon = howItWorksIcons[index] || Check;
              return (
                <article className="start-step-card" key={step.title}>
                  <span>0{index + 1}</span>
                  <Icon size={22} />
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section
          className="start-section section-shell"
          id="next-step"
          aria-labelledby="summary-title"
        >
          <div className="start-summary-card">
            <div>
              <p className="eyebrow">Offer summary</p>
              <h2 id="summary-title">Custom Payment Comes After Discovery</h2>
              <p>
                Backend Brilliance uses customized payment links, invoices, or
                proposals after the right solution has been identified.
              </p>
              <ul className="summary-check-list">
                {summaryDetails.map((detail) => (
                  <li key={detail}>
                    <Check size={16} />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="start-price-panel">
              <span>Backend Brilliance setup</span>
              <strong>Talk</strong>
              <small>step confirmed before work begins</small>
              <p>
                Start with the conversation so the solution, scope, and payment
                path match your actual business problem.
              </p>
              <a
                className="button button-primary"
                href={LINKS.booking}
                onClick={() => trackEvent("booking_click", { location: "start_summary" })}
                target="_blank"
                rel="noopener noreferrer"
              >
                Find the Right Solution
                <ArrowRight size={18} />
              </a>
              <small>
                Stripe payment links and invoices are sent manually after scope
                is confirmed.
              </small>
            </div>
          </div>
        </section>

        <section className="start-section section-shell" aria-labelledby="faq-title">
          <div className="section-heading centered compact-heading">
            <p className="eyebrow">FAQs</p>
            <h2 id="faq-title">Quick questions before you start.</h2>
          </div>
          <div className="faq-list start-faq-list">
            {conciseFaqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <span>+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          className="start-section section-shell"
          id="plan-details"
          aria-labelledby="details-title"
        >
          <details className="plan-details-card">
            <summary>
              <span>
                <HelpCircle size={20} />
                <strong id="details-title">Important plan details</strong>
              </span>
              <b>+</b>
            </summary>
            <div className="plan-details-list">
              {planDetails.map((detail) => (
                <article key={detail.title}>
                  <h3>{detail.title}</h3>
                  <p>{detail.copy}</p>
                </article>
              ))}
            </div>
          </details>
        </section>

        <section className="start-support-card section-shell">
          <div>
            <h2>Need help before starting?</h2>
            <p>
              Send a quick note and Backend Brilliance will help you choose the
              cleanest next step.
            </p>
          </div>
          <a className="button button-secondary" href={LINKS.supportEmail}>
            {OFFER_CONFIG.site.supportEmail}
          </a>
        </section>
      </main>

      <footer className="flow-footer section-shell">
        <div>
          <strong>Backend Brilliance</strong>
          <p>Client acquisition systems for local service businesses.</p>
        </div>
        <nav aria-label="Start page footer links">
          <Link to={OFFER_CONFIG.routes.home}>Main website</Link>
          <a href={LINKS.supportEmail}>{OFFER_CONFIG.site.supportEmail}</a>
          <a href={LINKS.booking} target="_blank" rel="noopener noreferrer">
            Strategy call
          </a>
        </nav>
      </footer>
    </>
  );
}
