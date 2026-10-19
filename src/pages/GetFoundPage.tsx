import { motion, useReducedMotion } from "framer-motion";
import { PageMeta } from "../components/PageMeta";
import { LINKS } from "../config/links";
import { SiteFooter } from "./VerticalLandingPage";
import { trackEvent } from "../utils/tracking";
import {
  ArrowRight,
  Camera,
  MapPin,
  MessageCircle,
  Search,
  Star,
} from "lucide-react";

const problems = [
  {
    icon: MapPin,
    title: "Invisible on the map",
    copy: "When someone nearby searches for what you do, Google shows three businesses on the map. Everyone else might as well not exist.",
  },
  {
    icon: Star,
    title: "The review gap",
    copy: "Your competitor has 140 reviews. You have 12. Customers pick the business that looks alive — and they decide in seconds.",
  },
  {
    icon: Search,
    title: "A half-empty listing",
    copy: "No services listed. Old photos. Missing hours. Every blank field is a reason for a customer to call the next name down.",
  },
];

const included = [
  {
    icon: MapPin,
    title: "Claimed and verified",
    copy: "We claim your listing and get it verified in your own Google account — you own it, always.",
  },
  {
    icon: Search,
    title: "Categories and services",
    copy: "The right primary category, supporting categories, and a full services list written in plain English.",
  },
  {
    icon: Camera,
    title: "Photos that sell",
    copy: "Your photos cleaned up, renamed, and organized — exterior, interior, team, and real work.",
  },
  {
    icon: Star,
    title: "Review engine",
    copy: "A simple review-request system: custom link, QR code, and message templates your team can actually use.",
  },
  {
    icon: MessageCircle,
    title: "Q&A and posts",
    copy: "Common questions answered before customers ask, and your first Google posts published.",
  },
];

const steps = [
  {
    title: "We audit what customers see now.",
    copy: "You get an honest before snapshot — exactly what a customer finds when they Google you today.",
  },
  {
    title: "We build everything out.",
    copy: "Profile, categories, services, photos, reviews engine, Q&A, posts — the full listing, done-for-you.",
  },
  {
    title: "You approve, we hand over the keys.",
    copy: "You review the after snapshot, everything lives in your Google account, and customers start finding a business that looks like the real thing.",
  },
];

export function GetFoundPage() {
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
    trackEvent("booking_cta_clicked", { vertical: "get_found", location });
    trackEvent("primary_cta_clicked", { vertical: "get_found", location });
  };

  return (
    <>
      <PageMeta
        description="When customers Google your business, what do they see? Backend Brilliance builds out your entire Google presence done-for-you — $495 one-time."
        path="/get-found"
        title="Get Found on Google | Backend Brilliance"
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
              <p className="vertical-eyebrow">Google Visibility Build</p>
              <h1>When customers Google you, what do they see?</h1>
              <p className="vertical-subheading">
                Most local businesses are invisible where it matters most — the
                top 3 spots on the Google map. We build out your entire Google
                presence done-for-you, so customers find you, trust you, and
                call you.
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
            <motion.p className="vertical-microline" {...reveal}>
              $495 one-time · Done-for-you · Nothing technical needed on your end
            </motion.p>
          </section>

          <section className="vertical-how section-shell" aria-labelledby="getfound-problem">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">The problem</p>
              <h2 id="getfound-problem">Go Google your business. We&apos;ll wait.</h2>
            </motion.div>
            <div className="vertical-how-grid">
              {problems.map(({ icon: Icon, title, copy }) => (
                <motion.article className="vertical-how-card" key={title} {...reveal}>
                  <div className="vertical-how-icon">
                    <Icon size={34} />
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="vertical-capabilities section-shell" aria-labelledby="getfound-included">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">What we build</p>
              <h2 id="getfound-included">Your entire Google presence, done-for-you.</h2>
            </motion.div>
            <div className="vertical-capability-grid">
              {included.map(({ icon: Icon, title, copy }) => (
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

          <section
            className="vertical-how section-shell"
            aria-labelledby="getfound-steps"
          >
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">How it works</p>
              <h2 id="getfound-steps">Before and after, in three steps.</h2>
            </motion.div>
            <div className="vertical-how-grid">
              {steps.map(({ title, copy }, index) => (
                <motion.article className="vertical-how-card" key={title} {...reveal}>
                  <span className="vertical-step-number">{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="vertical-pricing section-shell" aria-labelledby="getfound-care">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">Keep it fresh</p>
              <h2 id="getfound-care">Stay visible after the build.</h2>
            </motion.div>
            <motion.div className="vertical-pricing-card" {...reveal}>
              <p className="vertical-eyebrow">Keep-It-Fresh Care Plan</p>
              <p className="vertical-price">
                <strong>$149</strong>
                <span>/month</span>
              </p>
              <p>
                Google posts, review responses, photo updates, and visibility
                monitoring — plus a plain-English monthly report. Optional,
                month-to-month, cancel anytime.
              </p>
              <a
                className="button button-primary vertical-primary"
                href={LINKS.booking}
                onClick={() => trackBooking("care_plan")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Conversation<ArrowRight size={18} />
              </a>
              <small>
                Google decides rankings — nobody honest can promise the top
                spot. What we promise: your listing becomes the best version of
                itself, and stays that way.
              </small>
            </motion.div>
          </section>

          <section className="vertical-final-cta section-shell">
            <motion.div className="vertical-final-card" {...reveal}>
              <div className="vertical-final-logo" aria-hidden="true">
                BB
              </div>
              <div>
                <h2>Let&apos;s find where you&apos;re losing business.</h2>
                <p>
                  Book a 15-minute conversation. We&apos;ll show you exactly
                  what customers see when they Google you — and what we&apos;d
                  fix first.
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
          </section>
        </main>

        <SiteFooter onBookingClick={() => trackBooking("footer")} />
      </div>
    </>
  );
}
