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
import { getOfferCtaUrl, OFFER_CONFIG } from "../config/offers";

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
  const offer = OFFER_CONFIG.offers.websiteConversion;
  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
      };

  const personalizedMessage = businessName
    ? `Based on the opportunities identified for ${businessName}, this is the system we recommend.`
    : hasAuditContext
      ? "Based on the opportunities identified in your audit, this is the system we recommend."
      : "A clear starting point for turning more website visitors into real business inquiries.";

  const summaryDetails = [
    `${offer.price} per month`,
    "Month-to-month service",
    "Most initial setups are completed within 7-14 business days after onboarding materials are received",
    "Any one-time setup cost will be confirmed before work begins",
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
    OFFER_CONFIG.websiteConversionDetails.faqs[0],
    OFFER_CONFIG.websiteConversionDetails.faqs[1],
    OFFER_CONFIG.websiteConversionDetails.faqs[2],
    OFFER_CONFIG.websiteConversionDetails.faqs[6],
    OFFER_CONFIG.websiteConversionDetails.faqs[8],
  ].filter(Boolean);

  return (
    <>
      <PageMeta
        title="Start Your Website Conversion System | Backend Brilliance"
        description="Start the Backend Brilliance Website Conversion System: a website, chatbot, lead capture, scheduling, and follow-up foundation for local service businesses."
        path={OFFER_CONFIG.routes.start}
        noindex
      />
      <SimpleHeader />

      <main className="flow-page start-page">
        <section className="start-hero section-shell" aria-labelledby="start-title">
          <motion.div className="start-copy" {...reveal}>
            <p className="eyebrow">Website Conversion System</p>
            {businessName && <p className="welcome-line">Welcome, {businessName}.</p>}
            <h1 id="start-title">Your Website Conversion System</h1>
            <p className="start-subhead">
              A simpler way to turn website visitors into real business inquiries.
            </p>
            <p className="start-intro">
              We&apos;ll help you build a clear, professional website experience
              that answers questions, makes it easy to take action, and follows
              up with interested leads.
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
                href={getOfferCtaUrl(offer)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start My Project
                <ArrowRight size={18} />
              </a>
              <a
                className="button button-secondary"
                href={LINKS.booking}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Strategy Call
              </a>
            </div>
          </motion.div>

          <motion.aside className="start-purchase-card" {...reveal}>
            <p className="eyebrow">Start here</p>
            <h2>{offer.name}</h2>
            <div className="start-price">
              <strong>{offer.price}</strong>
              <span>{offer.priceQualifier}</span>
            </div>
            <p>
              A clear website and response system designed to help turn visitors
              into inquiries.
            </p>
            <a
              className="button button-primary"
              href={getOfferCtaUrl(offer)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Start My Project
              <ArrowRight size={18} />
            </a>
            <small>
              Secure monthly checkout through Stripe. Any applicable setup fee
              will be confirmed before work begins.
            </small>
          </motion.aside>
        </section>

        <section className="start-section section-shell" aria-labelledby="included-title">
          <div className="section-heading centered compact-heading">
            <p className="eyebrow">What is included</p>
            <h2 id="included-title">Four pieces that help visitors take action.</h2>
          </div>
          <div className="start-outcome-grid">
            {offer.features.map((feature) => (
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
            <h2 id="works-title">From checkout to launch.</h2>
          </div>
          <div className="start-step-grid">
            {OFFER_CONFIG.websiteConversionDetails.howItWorks.map((step, index) => {
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
          id="purchase"
          aria-labelledby="summary-title"
        >
          <div className="start-summary-card">
            <div>
              <p className="eyebrow">Offer summary</p>
              <h2 id="summary-title">{offer.name}</h2>
              <p>
                Your website, chatbot, lead capture, scheduling, and basic
                follow-up system - set up to help turn more visitors into
                inquiries.
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
              <span>Website Conversion System</span>
              <strong>{offer.price}</strong>
              <small>{offer.priceQualifier}</small>
              <p>
                A clear website and response system designed to help turn
                visitors into inquiries.
              </p>
              <a
                className="button button-primary"
                href={getOfferCtaUrl(offer)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start My Project
                <ArrowRight size={18} />
              </a>
              <small>
                Secure monthly checkout through Stripe. Any applicable setup fee
                will be confirmed before work begins.
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
          <a
            href={LINKS.revenueAudit}
            target="_blank"
            rel="noopener noreferrer"
          >
            Revenue Leak Audit
          </a>
        </nav>
      </footer>
    </>
  );
}
