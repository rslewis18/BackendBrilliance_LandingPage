import { motion, useReducedMotion } from "framer-motion";
import { Route, Routes, Navigate } from "react-router-dom";
import { PageMeta } from "./components/PageMeta";
import { LINKS } from "./config/links";
import { OFFER_CONFIG } from "./config/offers";
import { OnboardingPage } from "./pages/OnboardingPage";
import { OnboardingSuccessPage } from "./pages/OnboardingSuccessPage";
import { StartPage } from "./pages/StartPage";
import { ThankYouPage } from "./pages/ThankYouPage";
import { GetFoundPage } from "./pages/GetFoundPage";
import { DemoPipelinePage } from "./pages/DemoPipelinePage";
import { SiteFooter, VerticalLandingPage, verticalPages } from "./pages/VerticalLandingPage";
import { trackEvent } from "./utils/tracking";
import {
  ArrowRight,
  MapPin,
  MessageCircle,
  PhoneCall,
} from "lucide-react";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/landing-backup" element={<HomePage />} />
      {/* Retired 2026-10-19: Lead System Cleanup offer archived — route redirects home. Page component kept in src/pages/CrmCleanupPage.tsx. */}
      <Route path="/lead-system-cleanup" element={<Navigate to="/" replace />} />
      <Route path="/get-found" element={<GetFoundPage />} />
      <Route path="/demo-pipeline" element={<DemoPipelinePage />} />
      {/* Retired 2026-10-19: vertical pages sold the retired $1,950/mo flagship — redirect home until they're rewritten for the new 3-tier pricing. Components kept in src/pages/VerticalLandingPage.tsx. */}
      <Route path="/home-services" element={<Navigate to="/" replace />} />
      <Route path="/legal" element={<Navigate to="/" replace />} />
      <Route path="/medspa-dental" element={<Navigate to="/" replace />} />
      {/* Retired 2026-10-19: /start sold the old offer — redirect home. Component kept in src/pages/StartPage.tsx. */}
      <Route path={OFFER_CONFIG.routes.start} element={<Navigate to="/" replace />} />
      <Route path={OFFER_CONFIG.routes.thankYou} element={<ThankYouPage />} />
      <Route path={OFFER_CONFIG.routes.onboarding} element={<OnboardingPage />} />
      <Route
        path={OFFER_CONFIG.routes.onboardingSuccess}
        element={<OnboardingSuccessPage />}
      />
    </Routes>
  );
}

const services = [
  {
    icon: MapPin,
    title: "Google Visibility & Local Presence",
    line: "Your entire Google presence built done-for-you — profile, photos, reviews, posts.",
  },
  {
    icon: PhoneCall,
    title: "AI Front Desk & Call Handling",
    line: "Every call answered and every inquiry captured, even when your team is busy.",
  },
  {
    icon: MessageCircle,
    title: "Lead Follow-Up & Booking Automation",
    line: "Timely follow-up that turns inquiries into booked jobs.",
  },
];

const plans = [
  {
    title: "Local Visibility Starter",
    who: "For businesses that want to be found on Google.",
    includes: [
      "Google Business Profile setup & optimization",
      "Review generation and response management",
      "Monthly visibility report",
    ],
  },
  {
    title: "AI Front Desk",
    who: "For businesses that miss calls or can't answer after hours.",
    includes: [
      "AI answering for every incoming call",
      "Inquiry capture and qualification",
      "Call summaries and booking workflows",
    ],
  },
  {
    title: "Complete Customer Growth System",
    who: "Visibility and call handling, working as one system.",
    includes: [
      "Everything in both plans",
      "Automated follow-up sequences",
      "One unified monthly report",
    ],
  },
];

const approachSteps = [
  {
    title: "Understand your business.",
    copy: "We identify how customers find you, contact you, and book your services.",
  },
  {
    title: "Identify opportunities.",
    copy: "We look for practical improvements in visibility, call handling, and follow-up.",
  },
  {
    title: "Build your system.",
    copy: "We configure and test the agreed services around your business.",
  },
  {
    title: "Monitor and improve.",
    copy: "We review performance and recommend changes based on actual results.",
  },
];

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

  const trackBooking = (location: string) => {
    trackEvent("booking_cta_clicked", { vertical: "home", location });
    trackEvent("primary_cta_clicked", { vertical: "home", location });
  };

  return (
    <>
      <PageMeta
        description="We help local businesses get found on Google, answer every call, and turn more inquiries into booked jobs."
        path="/"
        title="Backend Brilliance | Get Found. Answer Every Opportunity. Book More Customers."
      />

      <div className="vertical-page vertical-page--home">
        <header className="vertical-header">
          <a className="vertical-brand" href="/" aria-label="Backend Brilliance home">
            <img src="/backend-brilliance-logo.png" alt="" />
            <span>
              <strong>Backend</strong>
              <strong>Brilliance</strong>
            </span>
          </a>
          <nav aria-label="Homepage navigation">
            <a href="#home-services">Services</a>
            <a href="#home-plans">Plans</a>
            <a href="#home-approach">Our Approach</a>
            <a href="#home-why">Why Us</a>
          </nav>
          <a
            className="button button-primary vertical-header-cta"
            href={LINKS.booking}
            onClick={() => trackBooking("header")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Conversation
          </a>
        </header>

        <main>
          <section className="vertical-hero section-shell" id="top">
            <motion.div className="vertical-hero-copy" {...reveal}>
              <p className="vertical-eyebrow">Backend Brilliance</p>
              <h1>Get Found. Answer Every Opportunity. Book More Customers.</h1>
              <p className="vertical-subheading">
                We help local businesses get found on Google, answer every
                call, and turn more inquiries into booked jobs.
              </p>
            </motion.div>

            <motion.div className="vertical-hero-actions" {...reveal}>
              <a
                className="button button-primary vertical-primary"
                href={LINKS.booking}
                onClick={() => trackBooking("hero")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Conversation<ArrowRight size={20} />
              </a>
            </motion.div>
          </section>

          <section className="vertical-capabilities section-shell" id="home-services">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">What we do</p>
              <h2>Our Services</h2>
            </motion.div>
            <div className="vertical-capability-grid">
              {services.map(({ icon: Icon, title, line }) => (
                <motion.article className="vertical-capability-card" key={title} {...reveal}>
                  <span>
                    <Icon size={28} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{line}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="vertical-pricing section-shell" id="home-plans">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">Find your fit</p>
              <h2>Choose the Support That Fits Your Business</h2>
            </motion.div>
            <div className="vertical-how-grid">
              {plans.map(({ title, who, includes }) => (
                <motion.article className="vertical-how-card" key={title} {...reveal}>
                  <h3>{title}</h3>
                  <p>{who}</p>
                  <ul>
                    {includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </section>

          <section
            className="vertical-how section-shell"
            id="home-approach"
            aria-labelledby="home-approach-heading"
          >
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">How we work</p>
              <h2 id="home-approach-heading">Our Approach</h2>
            </motion.div>
            <div className="vertical-how-grid">
              {approachSteps.map(({ title, copy }, index) => (
                <motion.article className="vertical-how-card" key={title} {...reveal}>
                  <span className="vertical-step-number">{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="vertical-nevermiss section-shell" id="home-why">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">Why us</p>
              <h2>Why Backend Brilliance?</h2>
            </motion.div>
            <motion.p className="vertical-watch-line" {...reveal}>
              Practical systems, honestly sold. No guaranteed rankings, no
              unnecessary complexity — just useful technology that captures
              more of the opportunities already coming your way.
            </motion.p>
          </section>

          <section className="vertical-final-cta section-shell">
            <motion.div className="vertical-final-card" {...reveal}>
              <div className="vertical-final-logo" aria-hidden="true">
                BB
              </div>
              <div>
                <h2>Let&apos;s Find Your Opportunities</h2>
                <p>
                  See exactly where your business is missing calls, losing
                  inquiries, or invisible on Google.
                </p>
              </div>
              <a
                className="button button-primary vertical-primary"
                href={LINKS.booking}
                onClick={() => trackBooking("final_cta")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Conversation<ArrowRight size={18} />
              </a>
            </motion.div>
            <motion.p className="vertical-watch-line" {...reveal}>
              Backend Brilliance — Smarter Systems. Better Customer Experiences.
              More Opportunities.
            </motion.p>
          </section>
        </main>

        <SiteFooter onBookingClick={() => trackBooking("footer")} />
      </div>
    </>
  );
}

export default App;
