import { motion, useReducedMotion } from "framer-motion";
import { Route, Routes, Navigate } from "react-router-dom";
import { PageMeta } from "./components/PageMeta";
import { LINKS } from "./config/links";
import { OFFER_CONFIG } from "./config/offers";
import { OnboardingPage } from "./pages/OnboardingPage";
import { OnboardingSuccessPage } from "./pages/OnboardingSuccessPage";
import { StartPage } from "./pages/StartPage";
import { ThankYouPage } from "./pages/ThankYouPage";
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
      <Route path="/demo-pipeline" element={<DemoPipelinePage />} />
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

const services = [
  {
    icon: MapPin,
    title: "Google Visibility & Local Presence",
    intro:
      "Help more local customers discover your business when they search online.",
    bullets: [
      "Optimize your Google Business Profile.",
      "Improve your business information, services, and contact details.",
      "Make it easier for customers to call, visit your website, or request an appointment.",
      "Build a consistent process for requesting and managing customer reviews.",
      "Monitor available performance data and identify opportunities for improvement.",
    ],
  },
  {
    icon: PhoneCall,
    title: "AI Front Desk & Call Handling",
    intro:
      "Give your business a reliable first point of contact, even when your team is busy or unavailable.",
    bullets: [
      "Answer incoming calls using an AI-powered receptionist.",
      "Respond to common questions using your approved business information.",
      "Capture new customer inquiries and service requests.",
      "Help customers schedule appointments or request callbacks.",
      "Route urgent or complex inquiries to your team.",
      "Send call summaries and notifications so important opportunities don't get overlooked.",
    ],
    note: "Features depend on your business requirements and compatible systems.",
  },
  {
    icon: MessageCircle,
    title: "Lead Follow-Up & Booking Automation",
    intro:
      "Help turn inquiries into real business opportunities with timely, organized follow-up.",
    bullets: [
      "Send follow-up messages where appropriate and authorized.",
      "Notify your team when a new lead comes in.",
      "Organize customer inquiries and appointment requests.",
      "Reduce manual administrative work.",
      "Track key activity to help identify where opportunities are being lost.",
    ],
  },
];

const plans = [
  {
    title: "Local Visibility Starter",
    who: "For businesses that want to strengthen their Google presence and make it easier for customers to find them.",
    includes:
      "Includes Google Business Profile optimization, contact and booking-link improvements, and a practical review strategy.",
  },
  {
    title: "AI Front Desk",
    who: "For businesses that miss calls, receive inquiries after hours, or struggle to respond while serving customers.",
    includes:
      "Includes AI call answering, inquiry capture, call summaries, and agreed-upon booking or call-transfer workflows.",
  },
  {
    title: "Complete Customer Growth System",
    who: "For businesses that want to improve both visibility and lead handling.",
    includes:
      "Combines Google presence improvements, AI call answering, and lead follow-up workflows in one coordinated system.",
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
        description="Backend Brilliance helps local businesses improve their Google presence, respond to customer inquiries, and turn more opportunities into booked appointments and jobs."
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
                You work hard to grow your business. We help make sure potential
                customers can find you, reach you, and take the next step —
                without every inquiry depending on you being available.
              </p>
              <p className="vertical-subheading">
                Backend Brilliance helps local businesses improve their Google
                presence, respond to customer inquiries, and turn more
                opportunities into booked appointments and jobs.
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
              {services.map(({ icon: Icon, title, intro, bullets, note }) => (
                <motion.article className="vertical-capability-card" key={title} {...reveal}>
                  <span>
                    <Icon size={28} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{intro}</p>
                    <ul>
                      {bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    {note ? <p><em>{note}</em></p> : null}
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
                  <p>{includes}</p>
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
              We focus on practical systems that help local businesses operate
              more efficiently and capture more of the opportunities already
              coming their way.
            </motion.p>
            <motion.p className="vertical-watch-line" {...reveal}>
              No unnecessary complexity. No empty promises about guaranteed
              rankings or revenue. Just useful technology, thoughtful
              implementation, and measurable improvements.
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
                  Want to know where your business could be missing calls,
                  losing inquiries, or missing opportunities on Google?
                </p>
                <p>
                  Contact Backend Brilliance for a conversation about your
                  business and a tailored recommendation.
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
