import { Link, useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
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

export function StartPage() {
  const [searchParams] = useSearchParams();
  const shouldReduceMotion = useReducedMotion();
  const businessName = sanitizeBusinessName(searchParams.get("business"));
  const checkoutCancelled = searchParams.get("checkout") === "cancelled";
  const offer = OFFER_CONFIG.offers.websiteConversion;
  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <>
      <PageMeta
        title="Start Your Website Conversion System | Backend Brilliance"
        description="Start the Backend Brilliance Website Conversion System after reviewing your personalized website audit."
        path={OFFER_CONFIG.routes.start}
        noindex
      />
      <SimpleHeader />

      <main className="flow-page">
        <section className="flow-hero section-shell">
          <motion.div className="flow-hero-copy" {...reveal}>
            <p className="eyebrow">Personalized Website Audit</p>
            {businessName ? (
              <p className="welcome-line">Welcome, {businessName}.</p>
            ) : (
              <p className="welcome-line">Thanks for reviewing your personalized website audit.</p>
            )}
            <h1>Turn More Website Visitors Into Real Business Opportunities.</h1>
            <p className="hero-lead">
              Your website should clearly explain what you offer, build trust
              quickly, and make it easy for potential customers to contact or
              book with you.
            </p>
            <p className="hero-text">
              {businessName
                ? `Thanks for reviewing your personalized website audit. Based on the opportunities we identified, here is the ${offer.name} we recommend.`
                : `Here is the ${offer.name} we recommend to help turn more of your existing website traffic into inquiries and opportunities.`}
            </p>

            {checkoutCancelled && (
              <div className="notice-card" role="status">
                Your checkout was not completed. No payment was processed. You
                can try again whenever you&apos;re ready.
              </div>
            )}

            <div className="hero-actions">
              <a
                className="button button-primary"
                href={getOfferCtaUrl(offer)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start My Project — {offer.price}/month
                <ArrowRight size={18} />
              </a>
            </div>
            <p className="secondary-link-line">
              Need a more advanced capture or automation system?{" "}
              <a href={LINKS.booking} target="_blank" rel="noopener noreferrer">
                Book a strategy call.
              </a>
            </p>
          </motion.div>

          <motion.aside className="offer-summary-card" {...reveal}>
            <Sparkles size={26} />
            <h2>{offer.name}</h2>
            <div className="price">
              <span>Recurring subscription</span>
              <strong>{offer.price}</strong>
              <small>{offer.priceQualifier}</small>
            </div>
            <p>{offer.positioning}</p>
            <ul>
              {offer.features.slice(0, 7).map((feature) => (
                <li key={feature}>
                  <Check size={16} />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.aside>
        </section>

        <section className="flow-section section-shell">
          <div className="section-heading narrow">
            <p className="eyebrow">Audit to Action</p>
            <h2>We Found the Opportunities. Now Let&apos;s Fix Them.</h2>
            <p>
              Your personalized audit identified areas where your website could
              communicate more clearly, build more trust, and make it easier for
              potential customers to take action. The Website Conversion System
              is the foundational service Backend Brilliance uses to implement
              those improvements.
            </p>
          </div>
        </section>

        <section className="flow-section section-shell">
          <div className="section-heading centered">
            <p className="eyebrow">What is included</p>
            <h2>Website Improvements That Support Real Inquiries.</h2>
          </div>
          <div className="compact-card-grid">
            {OFFER_CONFIG.websiteConversionDetails.included.map((item) => (
              <article className="compact-card" key={item.title}>
                <Check size={20} />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <div className="upgrade-note">
            <h3>Need AI response, automated follow-up, CRM pipelines, or review automation?</h3>
            <p>
              Those capabilities are available through the Client Capture System
              and can be discussed on a strategy call.
            </p>
            <a href={LINKS.booking} target="_blank" rel="noopener noreferrer">
              Book a strategy call
            </a>
          </div>
        </section>

        <section className="flow-section section-shell">
          <div className="section-heading centered">
            <p className="eyebrow">How it works</p>
            <h2>From Checkout to Launch.</h2>
          </div>
          <div className="step-grid four">
            {OFFER_CONFIG.websiteConversionDetails.howItWorks.map((step, index) => (
              <article className="step-card" key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="flow-section section-shell">
          <div className="offer-detail-card">
            <div>
              <p className="eyebrow">Offer summary</p>
              <h2>{offer.name}</h2>
              <p>{OFFER_CONFIG.policies.billingNote}</p>
              <p>{OFFER_CONFIG.policies.setupFeeLanguage}</p>
              <p>{OFFER_CONFIG.policies.typicalBuildTimeline}</p>
              <p>{OFFER_CONFIG.policies.ongoingEditsScope}</p>
              <p>{OFFER_CONFIG.policies.thirdPartyCosts}</p>
              <p>{OFFER_CONFIG.policies.cancellation}</p>
            </div>
            <div className="offer-price-panel">
              <strong>{offer.price}</strong>
              <span>{offer.priceQualifier}</span>
              <a
                className="button button-primary"
                href={getOfferCtaUrl(offer)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {offer.ctaLabel}
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        <section className="flow-section section-shell">
          <div className="section-heading centered">
            <p className="eyebrow">FAQs</p>
            <h2>Questions Before You Start?</h2>
          </div>
          <div className="faq-list">
            {OFFER_CONFIG.websiteConversionDetails.faqs.map((faq) => (
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

        <section className="final-cta section-shell">
          <div>
            <h2>Ready to Put Your Website to Work?</h2>
            <p>
              Start the Website Conversion System and complete onboarding so we
              can begin preparing your project.
            </p>
            <a
              className="button button-primary"
              href={getOfferCtaUrl(offer)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Start My Project — {offer.price}/month
              <ArrowRight size={18} />
            </a>
          </div>
          <div className="secondary-cta-panel">
            <p>Prefer to talk first?</p>
            <a href={LINKS.booking} target="_blank" rel="noopener noreferrer">
              Book a Strategy Call
            </a>
          </div>
        </section>
      </main>

      <footer className="flow-footer section-shell">
        <div>
          <strong>Backend Brilliance</strong>
          <p>{OFFER_CONFIG.policies.billingNote}</p>
          <p>{OFFER_CONFIG.policies.thirdPartyCosts}</p>
        </div>
        <nav aria-label="Start page footer links">
          <Link to={OFFER_CONFIG.routes.home}>Main website</Link>
          <a href={LINKS.supportEmail}>{OFFER_CONFIG.site.supportEmail}</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </nav>
      </footer>
    </>
  );
}
