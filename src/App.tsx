import { type MouseEvent, type ReactNode, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Route, Routes } from "react-router-dom";
import { AuditRequestModal } from "./components/AuditRequestModal";
import { LINKS } from "./config/links";
import { type Offer, getOfferCtaUrl, OFFER_CONFIG } from "./config/offers";
import { OnboardingPage } from "./pages/OnboardingPage";
import { OnboardingSuccessPage } from "./pages/OnboardingSuccessPage";
import { StartPage } from "./pages/StartPage";
import { ThankYouPage } from "./pages/ThankYouPage";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarCheck,
  Check,
  Clock3,
  FileText,
  Globe2,
  MessageSquareText,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

const siteUrl = OFFER_CONFIG.site.siteUrl;

const navItems = [
  ["How It Works", "#journey"],
  ["What's Included", "#included"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
] as const;

type JourneyStep = {
  step: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  copy: string;
  bullets: string[];
  ctaLabel?: string;
  ctaType?: "audit" | "booking";
};

const journeySteps: JourneyStep[] = [
  {
    step: "Step 1",
    icon: Search,
    title: "Get Found",
    subtitle: "Rank Higher on Google",
    copy: "Help more local customers find your business before they find your competitors.",
    bullets: ["Google Business Profile", "Local SEO", "Reviews", "Rankings"],
    ctaLabel: "Get Your Free Personalized Audit",
    ctaType: "audit",
  },
  {
    step: "Step 2",
    icon: Globe2,
    title: "Get Them to Choose You",
    subtitle: "Turn Visitors Into Leads",
    copy: "When customers visit your website, do they trust you enough to contact you?",
    bullets: [
      "Website Design",
      "Trust Signals",
      "Calls-to-Action",
      "Mobile Experience",
      "Contact Forms",
    ],
    ctaLabel: "Book Your Strategy Call",
    ctaType: "booking",
  },
  {
    step: "Step 3",
    icon: PhoneCall,
    title: "Capture Every Opportunity",
    subtitle: "Never Miss Another Lead",
    copy: "Make it easy for customers to contact you anytime.",
    bullets: [
      "AI Chatbot",
      "Live Chat",
      "Online Booking",
      "Simple Forms",
      "Lead Routing",
    ],
  },
  {
    step: "Step 4",
    icon: Zap,
    title: "Respond Faster",
    subtitle: "Speed Wins Customers",
    copy: "The faster you respond, the more jobs you book.",
    bullets: [
      "Instant SMS",
      "Email Follow-Up",
      "Appointment Reminders",
      "Lead Nurturing",
    ],
  },
  {
    step: "Step 5",
    icon: BarChart3,
    title: "Grow Smarter",
    subtitle: "Improve Every Month",
    copy: "Use AI insights and automation to keep growing.",
    bullets: [
      "Competitor Analysis",
      "Review Growth",
      "Monthly Reporting",
      "AI Recommendations",
    ],
  },
];

const includedItems = [
  {
    icon: Globe2,
    title: "Website That Converts",
    copy: "Clear pages, strong trust signals, and calls-to-action that move visitors toward becoming leads.",
  },
  {
    icon: Bot,
    title: "AI Chatbot",
    copy: "Answer common questions, collect details, and encourage visitors to book or request help.",
  },
  {
    icon: CalendarCheck,
    title: "Forms and Scheduling",
    copy: "Make it simple for interested customers to take action without extra back-and-forth.",
  },
  {
    icon: MessageSquareText,
    title: "Automated Follow-Up",
    copy: "Send timely follow-up so interested leads are not forgotten after the first touch.",
  },
] as const;

const pricingOffers: Offer[] = OFFER_CONFIG.pricingOrder.map(
  (offerKey) => OFFER_CONFIG.offers[offerKey],
);

const faqs = [
  {
    question: "What is included in the Website Conversion System?",
    answer:
      "It includes a website built to turn visitors into leads, an AI chatbot, simple forms and scheduling, and automated follow-up so interested leads do not go cold.",
  },
  {
    question: "Does the Revenue Leak Audit still use Typeform?",
    answer:
      "Yes. The Revenue Leak Audit button opens the configured Typeform link so you can identify where leads may be slipping through your current system.",
  },
  {
    question: "When should I book a strategy call?",
    answer:
      "Book a strategy call if you want to discuss the Client Capture System, Complete Local Growth System, or the best system for your business.",
  },
  {
    question: "Do I have to sign a long-term contract?",
    answer: "No. Plans are month-to-month unless a separate written agreement says otherwise.",
  },
  {
    question: "What happens after I start my project?",
    answer:
      "You complete Stripe checkout, fill out the onboarding questionnaire, and Backend Brilliance uses your answers to prepare your system.",
  },
] as const;

const footerServices = [
  "Website Conversion System",
  "Client Capture System",
  "Complete Local Growth System",
  "Revenue Leak Audit",
  "Strategy Call",
] as const;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Backend Brilliance",
      url: siteUrl,
      logo: `${siteUrl}/backend-brilliance-logo.png`,
      description:
        "Backend Brilliance builds client acquisition systems for local service businesses.",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#localbusiness`,
      name: "Backend Brilliance",
      url: siteUrl,
      image: `${siteUrl}/backend-brilliance-logo.png`,
      description:
        "Client acquisition systems for local service businesses, including websites, AI chat, scheduling, follow-up, reviews, and growth strategy.",
      areaServed: "United States",
      parentOrganization: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path={OFFER_CONFIG.routes.start} element={<StartPage />} />
      <Route path={OFFER_CONFIG.routes.thankYou} element={<ThankYouPage />} />
      <Route path={OFFER_CONFIG.routes.onboarding} element={<OnboardingPage />} />
      <Route
        path={OFFER_CONFIG.routes.onboardingSuccess}
        element={<OnboardingSuccessPage />}
      />
    </Routes>
  );
}

function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const auditTriggerRef = useRef<HTMLElement | null>(null);
  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.16 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
      };

  const openAuditModal = (event: MouseEvent<HTMLElement>) => {
    auditTriggerRef.current = event.currentTarget;
    setIsAuditModalOpen(true);
  };

  const closeAuditModal = () => {
    setIsAuditModalOpen(false);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="site-header reference-header">
        <a className="brand" href="#home" aria-label="Backend Brilliance home">
          <img src="/backend-brilliance-logo.png" alt="" />
          <span>
            <strong>Backend Brilliance</strong>
            <small>Client Acquisition Systems</small>
          </span>
        </a>

        <nav aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <button
          className="button button-primary header-button"
          onClick={openAuditModal}
          type="button"
        >
          Get Your Free Personalized Audit
        </button>
      </header>

      <main className="reference-page">
        <section className="reference-hero section-shell" id="home">
          <motion.p className="eyebrow" {...reveal}>
            How We Help You Win More Customers
          </motion.p>
          <motion.h1 {...reveal}>
            From Strangers to
            <span>Paying Customers.</span>
          </motion.h1>
          <motion.p className="reference-subhead" {...reveal}>
            We build the systems that attract, convert, and retain more
            customers for your local business.
          </motion.p>
          <motion.div className="hero-actions centered-actions" {...reveal}>
            <button
              className="button button-primary"
              onClick={openAuditModal}
              type="button"
            >
              Get Your Free Personalized Audit
              <ArrowRight size={18} />
            </button>
            <a
              className="button button-secondary"
              href={LINKS.booking}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Your Strategy Call
            </a>
          </motion.div>
        </section>

        <section className="journey-section section-shell" id="journey">
          {journeySteps.map((step) => (
            <JourneyCard
              key={step.step}
              onAuditClick={openAuditModal}
              reveal={reveal}
              step={step}
            />
          ))}
        </section>

        <section className="black-audit-card section-shell" id="revenue-audit">
          <div className="black-audit-icon">
            <BarChart3 size={34} />
          </div>
          <div>
            <h2>Find Out Where You're Losing Customers.</h2>
            <p>No obligations. 100% free.</p>
          </div>
          <a
            className="button button-primary"
            href={LINKS.revenueAudit}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Your Free Revenue Leak Audit
            <ArrowRight size={18} />
          </a>
        </section>

        <Section
          eyebrow="What's included"
          id="included"
          title="Everything Your Business Needs To Capture And Convert Leads."
          centered
        >
          <div className="feature-grid compact-feature-grid">
            {includedItems.map(({ icon: Icon, title, copy }) => (
              <motion.article className="feature-card" key={title} {...reveal}>
                <Icon size={28} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </motion.article>
            ))}
          </div>
        </Section>

        <section className="pricing-section page-section" id="pricing">
          <div className="section-shell">
            <motion.div className="section-heading centered" {...reveal}>
              <p className="eyebrow">Choose the system that fits your goals</p>
              <h2>Simple Pricing. Powerful Results.</h2>
              <p>
                Start with the right system for where your business is now, then
                expand when you are ready for more visibility and automation.
              </p>
            </motion.div>

            <div className="pricing-grid">
              {pricingOffers.map((plan) => (
                <motion.article
                  className={`pricing-card ${plan.popular ? "popular" : ""}`}
                  key={plan.key}
                  {...reveal}
                >
                  {plan.popular && <div className="popular-badge">Most Popular</div>}
                  <h3>{plan.name}</h3>
                  <p>{plan.shortDescription}</p>
                  <div className="price">
                    <span>From</span>
                    <strong>{plan.price}</strong>
                    <small>{plan.priceQualifier}</small>
                  </div>
                  <p className="setup-note">{plan.setupFee}</p>
                  <p>{plan.positioning}</p>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    className="button button-primary"
                    href={getOfferCtaUrl(plan)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {plan.ctaLabel}
                    <ArrowRight size={18} />
                  </a>
                </motion.article>
              ))}
            </div>

            <p className="pricing-note">
              {OFFER_CONFIG.policies.thirdPartyCosts} We do not guarantee local
              rankings, lead volume, appointments, or revenue.
            </p>
          </div>
        </section>

        <section className="faq-section section-shell" id="faq">
          <motion.div className="section-heading centered" {...reveal}>
            <p className="eyebrow">Frequently Asked Questions</p>
            <h2>Questions Before You Start?</h2>
          </motion.div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <motion.details key={faq.question} {...reveal}>
                <summary>
                  {faq.question}
                  <span>+</span>
                </summary>
                <p>{faq.answer}</p>
              </motion.details>
            ))}
          </div>
        </section>

        <section className="final-cta section-shell" id="booking">
          <motion.div {...reveal}>
            <h2>Ready to Build a Smarter Client System?</h2>
            <p>
              Book a strategy call to see which Backend Brilliance system fits
              your business best.
            </p>
            <a
              className="button button-primary"
              href={LINKS.booking}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Your Strategy Call
              <ArrowRight size={18} />
            </a>
          </motion.div>
          <motion.div className="clipboard-visual" {...reveal}>
            <ShieldCheck size={96} />
          </motion.div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div>
          <a className="brand" href="#home" aria-label="Backend Brilliance home">
            <img src="/backend-brilliance-logo.png" alt="" />
            <span>
              <strong>Backend Brilliance</strong>
              <small>Client Acquisition Systems</small>
            </span>
          </a>
          <p>Client acquisition systems for local service businesses.</p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
          <a href={LINKS.supportEmail}>{OFFER_CONFIG.site.supportEmail}</a>
        </div>

        <div className="footer-column">
          <h3>Services</h3>
          {footerServices.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
      </footer>

      <AuditRequestModal
        isOpen={isAuditModalOpen}
        onClose={closeAuditModal}
        returnFocusRef={auditTriggerRef}
      />
    </>
  );
}

function JourneyCard({
  onAuditClick,
  reveal,
  step,
}: {
  onAuditClick: (event: MouseEvent<HTMLElement>) => void;
  reveal: object;
  step: JourneyStep;
}) {
  const Icon = step.icon;

  return (
    <motion.article className="journey-card" {...reveal}>
      <div className="journey-marker">
        <span>{step.step}</span>
        <div>
          <Icon size={58} />
        </div>
      </div>

      <div className="journey-copy">
        <h2>{step.title}</h2>
        <h3>{step.subtitle}</h3>
        <p>{step.copy}</p>
      </div>

      <div className="journey-details">
        <ul>
          {step.bullets.map((item) => (
            <li key={item}>
              <Check size={18} />
              {item}
            </li>
          ))}
        </ul>
        {step.ctaType === "audit" && step.ctaLabel && (
          <button className="outline-cta" onClick={onAuditClick} type="button">
            {step.ctaLabel}
            <ArrowRight size={18} />
          </button>
        )}
        {step.ctaType === "booking" && step.ctaLabel && (
          <a
            className="outline-cta"
            href={LINKS.booking}
            target="_blank"
            rel="noopener noreferrer"
          >
            {step.ctaLabel}
            <ArrowRight size={18} />
          </a>
        )}
      </div>
    </motion.article>
  );
}

function Section({
  children,
  centered = false,
  eyebrow,
  id,
  title,
}: {
  children: ReactNode;
  centered?: boolean;
  eyebrow: string;
  id: string;
  title: string;
}) {
  return (
    <section className="content-section section-shell" id={id}>
      <div className={`section-heading ${centered ? "centered" : ""}`}>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default App;
