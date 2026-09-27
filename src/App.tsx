import { motion, useReducedMotion } from "framer-motion";
import { Link, Route, Routes } from "react-router-dom";
import { PageMeta } from "./components/PageMeta";
import { LINKS } from "./config/links";
import { OFFER_CONFIG } from "./config/offers";
import { OnboardingPage } from "./pages/OnboardingPage";
import { OnboardingSuccessPage } from "./pages/OnboardingSuccessPage";
import { StartPage } from "./pages/StartPage";
import { ThankYouPage } from "./pages/ThankYouPage";
import { SiteFooter, VerticalLandingPage, verticalPages } from "./pages/VerticalLandingPage";
import { trackEvent } from "./utils/tracking";
import {
  ArrowRight,
  Bell,
  CalendarCheck,
  ClipboardList,
  Clock3,
  PhoneCall,
  Play,
  Plug,
  RefreshCcw,
  UserCheck,
  UsersRound,
} from "lucide-react";


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

const homeFaqs = [
  {
    question: "How fast does it respond?",
    answer:
      "Within seconds of a missed call or new inquiry — 24 hours a day, 7 days a week, including nights, weekends, and holidays.",
  },
  {
    question: "Does it replace my staff?",
    answer:
      "No. It handles the first response, qualification, and booking — then hands off to your team with the full conversation. Your people focus on the work, not the phone tag.",
  },
  {
    question: "What happens when a human is needed?",
    answer:
      "The agent recognizes when a human should step in and hands over the complete conversation instantly — nothing gets lost.",
  },
  {
    question: "Does it work for my industry?",
    answer:
      "If your business lives on the phone — missed calls, new inquiries, appointment booking — the agent fits. We have dedicated setups for home services, law firms, and med spas & dental practices.",
  },
  {
    question: "Do I keep my business number?",
    answer: "Yes. Your number stays yours. The agent works through your existing business line.",
  },
  {
    question: "What does it cost?",
    answer:
      "From $1,950/month, month-to-month. Any one-time setup and third-party messaging costs are confirmed with you before anything starts.",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a 15-minute walkthrough. We'll show you the agent working on your phone, then connect it to your business line and calendar and configure it around how you work.",
  },
];

const homeSteps = [
  {
    icon: Plug,
    title: "Connect your phones",
    copy: "We link the agent to your business line and calendar. Your number stays yours.",
  },
  {
    icon: CalendarCheck,
    title: "Set your booking rules",
    copy: "Services, qualifying questions, calendar — configured around how you work.",
  },
  {
    icon: Play,
    title: "Answer, qualify, book",
    copy: "The agent texts back missed calls in seconds, qualifies the lead, and books the job.",
  },
];

const homeCapabilities = [
  {
    icon: PhoneCall,
    title: "Missed-call text-back",
    copy: "Every unanswered call gets an instant, personal text — seconds after it rings out.",
  },
  {
    icon: Clock3,
    title: "24/7 lead response",
    copy: "Nights, weekends, holidays. New inquiries get an answer immediately, every time.",
  },
  {
    icon: UserCheck,
    title: "Lead qualification",
    copy: "The agent asks your questions and filters out the tire-kickers before they reach your calendar.",
  },
  {
    icon: CalendarCheck,
    title: "Appointment booking",
    copy: "Qualified leads book straight onto your calendar, synced with your schedule.",
  },
  {
    icon: Bell,
    title: "Confirmations and reminders",
    copy: "Automatic texts keep the calendar full and the no-shows down.",
  },
  {
    icon: RefreshCcw,
    title: "No-show recovery",
    copy: "Missed appointments get followed up automatically — and rebooked.",
  },
  {
    icon: ClipboardList,
    title: "CRM and calendar updates",
    copy: "Every conversation, lead, and booking is logged where your team can see it.",
  },
  {
    icon: UsersRound,
    title: "Live handoff to your team",
    copy: "The moment a human should step in, the agent hands over the full conversation.",
  },
];

const nichePaths = [
  {
    to: "/home-services",
    title: "Home Services",
    copy: "HVAC, plumbing, electrical, roofing, remodeling, tree service — every missed call becomes a booked job.",
  },
  {
    to: "/legal",
    title: "Legal",
    copy: "Personal injury, family law, criminal defense, and more — every inquiry becomes a scheduled consultation.",
  },
  {
    to: "/medspa-dental",
    title: "Med Spa & Dental",
    copy: "Med spas, cosmetic dentistry, orthodontics, wellness — every inquiry becomes a booked consultation.",
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
        description="Every missed call becomes a booked job. Backend Brilliance's AI Lead Booking Agent answers every missed call by text within seconds, qualifies the lead, and books the job. From $1,950/month."
        path="/"
        title="Backend Brilliance | Every Missed Call Becomes a Booked Job"
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
            <a href="#home-how-it-works">How It Works</a>
            <a href="#home-who">Who It&apos;s For</a>
            <a href="#home-pricing">Pricing</a>
            <a href="#home-faq">FAQ</a>
          </nav>
          <a
            className="button button-primary vertical-header-cta"
            href={LINKS.booking}
            onClick={() => trackBooking("header")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Demo
          </a>
        </header>

        <main>
          <section className="vertical-hero section-shell" id="top">
            <motion.div className="vertical-hero-copy" {...reveal}>
              <p className="vertical-eyebrow">AI Lead Booking Agent</p>
              <h1>Every missed call becomes a booked job.</h1>
              <p className="vertical-subheading">
                Backend Brilliance&apos;s AI Lead Booking Agent answers every
                missed call by text within seconds, qualifies the lead, and
                books the job — so no opportunity slips through.
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
                Book a Demo<ArrowRight size={20} />
              </a>
              <a
                className="button button-secondary vertical-secondary"
                href="#demo"
                onClick={() => trackEvent("secondary_cta_clicked", { vertical: "home", location: "hero" })}
              >
                <ArrowRight size={20} />
                See It In Action
              </a>
            </motion.div>
            <motion.p className="vertical-microline" {...reveal}>
              From $1,950/month · No new staff · Nothing to install
            </motion.p>
          </section>

          <section className="vertical-demo-section section-shell" id="demo">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">Watch it work</p>
              <h2>Thirty seconds. One missed call. One booked job.</h2>
            </motion.div>
            <motion.div {...reveal}>
              <div className="vertical-demo-panel is-video">
                <video
                  controls
                  onPlay={() => trackEvent("demo_video_clicked", { vertical: "home" })}
                  preload="metadata"
                  src="/demo-video.mp4"
                >
                  <track kind="captions" />
                </video>
              </div>
            </motion.div>
            <motion.p className="vertical-watch-line" {...reveal}>
              A dramatization of a real scenario — a homeowner calls after
              hours, the agent texts back in seconds, qualifies the job, and
              books the estimate. Watch the demo. It runs in under a minute.
            </motion.p>
          </section>

          <section
            className="vertical-how section-shell"
            id="home-how-it-works"
            aria-labelledby="home-how"
          >
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">How it works</p>
              <h2 id="home-how">Missed call in. Booked job out.</h2>
            </motion.div>
            <div className="vertical-how-grid">
              {homeSteps.map(({ icon: Icon, title, copy }, index) => (
                <motion.article className="vertical-how-card" key={title} {...reveal}>
                  <span className="vertical-step-number">{index + 1}</span>
                  <div className="vertical-how-icon">
                    <Icon size={34} />
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="vertical-capabilities section-shell" id="home-who">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">Who it&apos;s for</p>
              <h2>Built for the businesses that live on the phone.</h2>
            </motion.div>
            <div className="vertical-path-grid">
              {nichePaths.map((path) => (
                <motion.div key={path.to} {...reveal}>
                  <Link
                    className="vertical-path-card"
                    onClick={() => trackEvent("niche_path_clicked", { vertical: "home", path: path.to })}
                    to={path.to}
                  >
                    <h3>{path.title}</h3>
                    <p>{path.copy}</p>
                    <span>
                      See how it works<ArrowRight size={18} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="vertical-capabilities section-shell" id="home-capabilities">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">What&apos;s included</p>
              <h2>The machinery behind every booked job.</h2>
            </motion.div>
            <div className="vertical-capability-grid">
              {homeCapabilities.map(({ icon: Icon, title, copy }) => (
                <motion.article className="vertical-capability-card" key={title} {...reveal}>
                  <span>
                    <Icon size={28} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="vertical-pricing section-shell" id="home-pricing">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">Pricing</p>
              <h2>One plan. Every missed call covered.</h2>
            </motion.div>
            <motion.div className="vertical-pricing-card" {...reveal}>
              <p className="vertical-eyebrow">AI Lead Booking Agent</p>
              <p className="vertical-price">
                <strong>From $1,950</strong>
                <span>/month</span>
              </p>
              <p>
                Missed-call text-back, instant lead response, qualification,
                calendar booking, confirmations and reminders, no-show recovery,
                and CRM updates. Month-to-month. No long-term contract.
              </p>
              <a
                className="button button-primary vertical-primary"
                href={LINKS.booking}
                onClick={() => trackBooking("pricing")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Demo<ArrowRight size={18} />
              </a>
              <small>
                Any one-time setup and third-party messaging costs are confirmed
                with you before anything starts. No surprises.
              </small>
            </motion.div>
          </section>

          <section className="vertical-faq section-shell" id="home-faq">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">Questions</p>
              <h2>Questions before you book?</h2>
            </motion.div>
            <div className="vertical-faq-list">
              {homeFaqs.map((faq) => (
                <motion.details className="vertical-faq-item" key={faq.question} {...reveal}>
                  <summary>
                    {faq.question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{faq.answer}</p>
                </motion.details>
              ))}
            </div>
          </section>

          <section className="vertical-final-cta section-shell">
            <motion.div className="vertical-final-card" {...reveal}>
              <div className="vertical-final-logo" aria-hidden="true">
                BB
              </div>
              <div>
                <h2>Stop losing jobs to the businesses that answer first.</h2>
                <p>
                  Book a 15-minute walkthrough and we&apos;ll show you the agent
                  working — on your phone, with your business.
                </p>
              </div>
              <a
                className="button button-primary vertical-primary"
                href={LINKS.booking}
                onClick={() => trackBooking("final_cta")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Demo<ArrowRight size={18} />
              </a>
            </motion.div>
          </section>
        </main>

        <SiteFooter onBookingClick={() => trackBooking("footer")} />
      </div>
    </>
  );
}

export default App;
