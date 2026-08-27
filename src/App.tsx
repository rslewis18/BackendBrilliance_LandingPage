import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Route, Routes } from "react-router-dom";
import { LINKS } from "./config/links";
import { OFFER_CONFIG } from "./config/offers";
import { OnboardingPage } from "./pages/OnboardingPage";
import { OnboardingSuccessPage } from "./pages/OnboardingSuccessPage";
import { StartPage } from "./pages/StartPage";
import { ThankYouPage } from "./pages/ThankYouPage";
import { VerticalLandingPage, verticalPages } from "./pages/VerticalLandingPage";
import { trackEvent } from "./utils/tracking";
import {
  ArrowRight,
  BarChart3,
  Bot,
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
  ["Problems", "#journey"],
  ["Solutions", "#solutions"],
  ["How It Works", "#how-it-works"],
  ["FAQ", "#faq"],
] as const;

type ProblemSolution = {
  problem: string;
  icon: LucideIcon;
  title: string;
  copy: string;
  bullets: string[];
};

const problemSolutions: ProblemSolution[] = [
  {
    problem: "Need more opportunities?",
    icon: Search,
    title: "Generate them.",
    copy: "Create more qualified chances to start conversations with the right local prospects.",
    bullets: ["Lead Generation", "Paid Advertising", "Local Search / SEO", "Direct-to-home campaigns"],
  },
  {
    problem: "Missing calls?",
    icon: PhoneCall,
    title: "Capture them.",
    copy: "Make it easier to answer demand, qualify inquiries, and route people to the next step.",
    bullets: ["AI Lead Booking Agent", "Missed-call recovery", "Qualification", "Calendar booking"],
  },
  {
    problem: "Slow follow-up?",
    icon: Zap,
    title: "Respond faster.",
    copy: "Reduce the time between interest and action with cleaner reminders and follow-up.",
    bullets: ["Lead Follow-Up Automation", "SMS/email follow-up", "Appointment reminders", "Lead nurturing"],
  },
  {
    problem: "Leads aren't converting?",
    icon: Globe2,
    title: "Convert them.",
    copy: "Turn more visits, calls, forms, and quote requests into real opportunities.",
    bullets: ["Website Conversion Systems", "Landing pages", "Booking/quote flows", "Intake optimization"],
  },
  {
    problem: "Hard to get found?",
    icon: BarChart3,
    title: "Improve visibility.",
    copy: "Strengthen the places prospects check before they choose who to contact.",
    bullets: ["Google Business Profile", "Local SEO", "Map visibility", "Website search visibility"],
  },
  {
    problem: "Weak reviews?",
    icon: Star,
    title: "Build trust.",
    copy: "Create more visible proof from happy customers and make trust easier to see.",
    bullets: ["Review Growth", "Reputation systems", "Review-request automation"],
  },
  {
    problem: "Old leads sitting untouched?",
    icon: Clock3,
    title: "Reactivate them.",
    copy: "Follow up with past leads and customers who may still need help.",
    bullets: ["Customer Reactivation", "Database campaigns", "Dormant lead follow-up", "Previous customer outreach"],
  },
  {
    problem: "Too much manual work?",
    icon: Bot,
    title: "Automate it.",
    copy: "Connect repetitive growth operations so staff can focus on higher-value work.",
    bullets: ["AI workflows", "CRM automation", "Intake routing", "Lead handling"],
  },
  {
    problem: "Inconsistent content?",
    icon: FileText,
    title: "Create consistently.",
    copy: "Build repeatable content systems for campaigns, properties, services, and follow-up.",
    bullets: ["Content Creation Systems", "Short-form content", "Property/listing content", "Campaign creative"],
  },
];

const serviceCards = [
  {
    icon: Bot,
    title: "Home Service Conversion System",
    copy: "Turn more existing inquiries into booked jobs with instant response, missed-call recovery, qualification, follow-up, booking, reminders, reactivation, and CRM/calendar automation.",
  },
  {
    icon: FileText,
    title: "AI Legal Intake",
    copy: "Capture inquiries, gather initial case information, route prospects by firm-defined rules, schedule consultations, and follow up.",
  },
  {
    icon: MessageSquareText,
    title: "Lead Follow-Up Automation",
    copy: "Send timely SMS and email follow-up so interested prospects do not disappear after the first touch.",
  },
  {
    icon: Globe2,
    title: "Website Conversion Systems",
    copy: "Improve pages, landing experiences, quote flows, and booking paths so more visitors take action.",
  },
  {
    icon: Search,
    title: "Local Visibility / SEO",
    copy: "Improve search, Google Business Profile, map visibility, and local trust signals.",
  },
  {
    icon: Star,
    title: "Review Growth",
    copy: "Request, organize, and use reviews to build trust with prospects before they call.",
  },
  {
    icon: Clock3,
    title: "Customer Reactivation",
    copy: "Reach dormant leads, previous customers, and old opportunities with focused campaigns.",
  },
  {
    icon: BarChart3,
    title: "Lead Generation & Paid Advertising",
    copy: "Build campaigns designed to create more qualified opportunities for the right services and markets.",
  },
  {
    icon: Sparkles,
    title: "Content & Property Marketing",
    copy: "Create repeatable content systems for local campaigns, property promotion, and consistent visibility.",
  },
  {
    icon: ShieldCheck,
    title: "Business Process Automation",
    copy: "Automate intake, routing, CRM tasks, reporting, and repetitive growth operations.",
  },
] as const;

const howItWorks = [
  {
    step: "01",
    title: "We diagnose the bottleneck",
    copy: "We look at where prospects are getting lost: visibility, calls, conversion, follow-up, reviews, content, or manual operations.",
  },
  {
    step: "02",
    title: "We recommend the right system",
    copy: "You get a practical recommendation based on the actual revenue problem instead of a one-size-fits-all product.",
  },
  {
    step: "03",
    title: "We build and improve it",
    copy: "Backend Brilliance configures the agreed solution, reviews it with you, and keeps the path clear for future improvements.",
  },
];

const faqs = [
  {
    question: "What does Backend Brilliance actually build?",
    answer:
      "We build growth and automation systems that help businesses get found, capture inquiries, respond faster, follow up, earn trust, reactivate customers, and reduce manual work.",
  },
  {
    question: "Do I need to know which service I need first?",
    answer:
      "No. The first step is a conversation about the bottleneck. From there, Backend Brilliance recommends the most practical solution.",
  },
  {
    question: "What is the Home Service Conversion System?",
    answer:
      "It is a lead-conversion workflow for home-service businesses. The AI Lead Booking Agent powers response, follow-up, qualification, and booking while the broader system supports missed calls, reminders, no-shows, reactivation, nurture, CRM, and calendar workflows.",
  },
  {
    question: "Do you work with law firms?",
    answer:
      "Yes. AI Legal Intake can help law firms capture inquiries, gather initial information, route prospects by firm-defined rules, schedule consultations, and notify staff. It does not provide legal advice or replace attorney review.",
  },
  {
    question: "Do I have to sign a long-term contract?",
    answer:
      "Engagement structure depends on the recommended solution. Any pricing, scope, and terms are confirmed before work begins.",
  },
  {
    question: "What happens after I book a growth review?",
    answer:
      "We review your current growth path, identify the biggest bottlenecks, and discuss the cleanest next step.",
  },
] as const;

const footerServices = [
  "Home Service Conversion System",
  "AI Legal Intake",
  "Lead Follow-Up Automation",
  "Website Conversion Systems",
  "Local Visibility / SEO",
  "Review Growth",
  "Customer Reactivation",
  "Business Process Automation",
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
        "Backend Brilliance identifies and fixes growth, revenue, and automation bottlenecks for local businesses.",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#localbusiness`,
      name: "Backend Brilliance",
      url: siteUrl,
      image: `${siteUrl}/backend-brilliance-logo.png`,
      description:
        "Growth and automation systems for local businesses, including lead generation, intake, websites, follow-up, visibility, reviews, reactivation, content, and operations.",
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
      <Route path="/landing-backup" element={<HomePage />} />
      <Route
        path={verticalPages.homeServices.path}
        element={<VerticalLandingPage page={verticalPages.homeServices} />}
      />
      <Route
        path={verticalPages.legal.path}
        element={<VerticalLandingPage page={verticalPages.legal} />}
      />
      <Route
        path={verticalPages.medspaDental.path}
        element={<VerticalLandingPage page={verticalPages.medspaDental} />}
      />
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
  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.16 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
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
            <small>Growth &amp; Automation Systems</small>
          </span>
        </a>

        <nav aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <a
          className="button button-primary header-button"
          href={LINKS.booking}
          onClick={() => trackEvent("booking_click", { location: "header" })}
          rel="noopener noreferrer"
          target="_blank"
        >
          Find the Right Solution
        </a>
      </header>

      <main className="reference-page">
        <section className="reference-hero section-shell" id="home">
          <motion.p className="eyebrow" {...reveal}>
            Growth and Automation Systems for Local Businesses
          </motion.p>
          <motion.h1 {...reveal}>
            Find the Bottleneck.
            <span>Build the Right System.</span>
          </motion.h1>
          <motion.p className="reference-subhead" {...reveal}>
            Backend Brilliance helps businesses generate more opportunities,
            capture more inquiries, respond faster, convert more leads, build
            trust, reactivate past customers, and automate repetitive growth
            operations.
          </motion.p>
          <motion.div className="hero-actions centered-actions" {...reveal}>
            <a
              className="button button-primary"
              href={LINKS.booking}
              onClick={() => trackEvent("booking_click", { location: "hero" })}
              rel="noopener noreferrer"
              target="_blank"
            >
              Find the Right Solution
              <ArrowRight size={18} />
            </a>
            <a
              className="button button-secondary"
              href="#journey"
              onClick={() =>
                trackEvent("section_nav_click", {
                  location: "hero",
                  target: "journey",
                })
              }
            >
              See How We Help
            </a>
          </motion.div>
        </section>

        <section className="journey-section section-shell" id="journey">
          <motion.div className="section-heading centered" {...reveal}>
            <p className="eyebrow">Problem → Solution</p>
            <h2>Where growth usually gets stuck.</h2>
            <p>
              Most businesses do not have one single problem. They have a few
              small breakdowns across visibility, intake, follow-up, conversion,
              trust, and operations.
            </p>
          </motion.div>
          <div className="solution-map-grid">
            {problemSolutions.map(({ bullets, copy, icon: Icon, problem, title }) => (
              <motion.article className="solution-map-card" key={problem} {...reveal}>
                <Icon size={28} />
                <p>{problem}</p>
                <h3>{title}</h3>
                <span>{copy}</span>
                <ul>
                  {bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="black-audit-card section-shell" id="growth-review-request">
          <div className="black-audit-icon">
            <BarChart3 size={34} />
          </div>
          <div>
            <h2>Not Sure What to Fix First?</h2>
            <p>Start with a conversation or request a personalized review.</p>
          </div>
          <a
            className="button button-primary"
            href={LINKS.booking}
            onClick={() => trackEvent("booking_click", { location: "midpage_cta" })}
            target="_blank"
            rel="noopener noreferrer"
          >
            Talk About My Business
            <ArrowRight size={18} />
          </a>
        </section>

        <Section
          eyebrow="Solution categories"
          id="solutions"
          title="The right system depends on the actual bottleneck."
          centered
        >
          <div className="feature-grid service-category-grid">
            {serviceCards.map(({ icon: Icon, title, copy }) => (
              <motion.article className="feature-card" key={title} {...reveal}>
                <Icon size={28} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </motion.article>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="How it works"
          id="how-it-works"
          title="Diagnose first. Then build what solves the problem."
          centered
        >
          <div className="step-grid three-step-grid">
            {howItWorks.map((step) => (
              <motion.article className="step-card" key={step.step} {...reveal}>
                <span>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </motion.article>
            ))}
          </div>
        </Section>

        <section className="pricing-section page-section" id="growth-review">
          <div className="section-shell">
            <motion.div className="section-heading centered" {...reveal}>
              <p className="eyebrow">Consultative next step</p>
              <h2>Find the right solution before you buy anything.</h2>
              <p>
                Backend Brilliance is not here to force every business into one
                product. The goal is to understand the revenue problem, then
                recommend the right growth or automation system.
              </p>
            </motion.div>

            <div className="consult-card-grid">
              {[
                "Identify the highest-friction part of your current growth path.",
                "Match the problem to the right service category.",
                "Confirm scope, requirements, proposal, or invoice path before implementation.",
              ].map((item, index) => (
                <motion.article className="pricing-card consult-card" key={item} {...reveal}>
                  <span>0{index + 1}</span>
                  <p>{item}</p>
                </motion.article>
              ))}
            </div>

            <p className="pricing-note">
              Specific pricing and scope depend on the solution recommended.
              Third-party software, advertising spend, usage fees, and platform
              costs are confirmed before work begins.
            </p>
            <div className="centered-actions">
              <a
                className="button button-primary"
                href={LINKS.booking}
                onClick={() => trackEvent("booking_click", { location: "consult_section" })}
                target="_blank"
                rel="noopener noreferrer"
              >
                Find the Right Solution
                <ArrowRight size={18} />
              </a>
            </div>
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
              onClick={() => trackEvent("booking_click", { location: "final_cta" })}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find the Right Solution
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
              <small>Growth &amp; Automation Systems</small>
            </span>
          </a>
          <p>Growth and automation systems for local businesses.</p>
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
    </>
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
