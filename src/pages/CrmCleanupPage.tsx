import { motion, useReducedMotion } from "framer-motion";
import { PageMeta } from "../components/PageMeta";
import { LINKS } from "../config/links";
import { SiteFooter } from "./VerticalLandingPage";
import { trackEvent } from "../utils/tracking";
import {
  ArrowRight,
  ClipboardList,
  Database,
  ListChecks,
  MessageCircle,
  RefreshCcw,
  Search,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";

const PATH = "/lead-system-cleanup";

const scopeItems = [
  {
    icon: Search,
    title: "CRM audit",
    copy: "We look at how leads currently enter your system, how they're tracked, and exactly where follow-up dies.",
  },
  {
    icon: Database,
    title: "Database cleanup",
    copy: "We dedupe contacts, remove dead leads, and organize what's real — so you're working from clean data, not a junk drawer.",
  },
  {
    icon: ListChecks,
    title: "Pipeline stages",
    copy: "Your CRM gets clear stages, so every lead has a defined next step and nothing sits in limbo.",
  },
  {
    icon: MessageCircle,
    title: "Missed-call text-back",
    copy: "Automated and wired up — when a call goes unanswered, the lead gets a text within seconds instead of silence.",
  },
  {
    icon: RefreshCcw,
    title: "30-day follow-up sequences",
    copy: "Old quotes and cold leads get worked automatically for 30 days. The follow-up happens whether you're busy or not.",
  },
];

const processSteps = [
  {
    icon: ClipboardList,
    title: "We audit",
    copy: "We map your current lead flow — where leads come from, where they stall, and what's falling through the cracks.",
  },
  {
    icon: Wrench,
    title: "We clean and automate",
    copy: "We clean the database, set up the pipeline, and wire in the automation: missed-call text-back and 30-day follow-up.",
  },
  {
    icon: Zap,
    title: "You run on autopilot",
    copy: "In 7 days you have a system that catches every lead and follows up on its own. No more leads dying in a spreadsheet.",
  },
];

const faqs = [
  {
    question: "Do I need a CRM already?",
    answer:
      "No. If you have one, we clean it up and automate it. If you don't, we set up a simple one as part of the 7 days — the $950 covers it either way.",
  },
  {
    question: "What if my data is a mess?",
    answer:
      "That's the point. Messy data is the normal starting point — duplicates, dead numbers, leads in three different spreadsheets. The cleanup exists precisely for that. Automation on top of dirty data is garbage in, garbage out, so we clean first, then automate.",
  },
  {
    question: "What exactly gets automated?",
    answer:
      "Two things, and they're the two that matter most: missed-call text-back (every unanswered call gets an instant text so the lead keeps talking to you) and 30-day follow-up sequences (old quotes and cold leads get worked automatically). Both run without you touching anything.",
  },
  {
    question: "What happens after the 7 days?",
    answer:
      "You own the system — it's yours, running in your CRM. From there you pick your lane: keep it running with us at $450/month (we maintain the CRM, tune the follow-up sequences, and send you a monthly lead report — cancel anytime), or go full system with the AI Lead Booking Agent ($1,950/month, month-to-month), which takes over answering, qualifying, booking, and following up on every call. Your $950 cleanup fee is fully credited toward the first month if you upgrade within 30 days.",
  },
  {
    question: "Is this the AI Lead Booking Agent?",
    answer:
      "No — this is the foundation it runs on. The cleanup gets your CRM and follow-up working. The agent is the ongoing system that answers every call live, qualifies, books, and follows up forever. Many clients start here, then upgrade — that's what the $950 credit is for.",
  },
];

export function CrmCleanupPage() {
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
    trackEvent("booking_cta_clicked", { vertical: "lead-system-cleanup", location });
    trackEvent("primary_cta_clicked", { vertical: "lead-system-cleanup", location });
  };

  return (
    <>
      <PageMeta
        description="CRM Cleanup + Automation for local service businesses. We audit your CRM, clean your database, and wire up missed-call text-back and 30-day follow-up automation — done in 7 days for $950 one-time."
        path={PATH}
        title="Lead System Cleanup | Backend Brilliance"
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
          <nav aria-label="Cleanup page navigation">
            <a href="#cleanup-scope">What&apos;s Included</a>
            <a href="#cleanup-process">How It Works</a>
            <a href="#cleanup-pricing">Pricing</a>
            <a href="#cleanup-faq">FAQ</a>
          </nav>
          <a
            className="button button-primary vertical-header-cta"
            href={LINKS.booking}
            onClick={() => trackBooking("header")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Walkthrough
          </a>
        </header>

        <main>
          <section className="vertical-hero section-shell" id="top">
            <motion.div className="vertical-hero-copy" {...reveal}>
              <p className="vertical-eyebrow">
                <Sparkles size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} />
                Lead System Cleanup — one-time service
              </p>
              <h1>CRM cleanup + automation, done for you.</h1>
              <p className="vertical-subheading">
                Your leads are leaking. They land in a messy CRM, nobody
                follows up, and missed calls vanish into voicemail. We clean
                up the system and wire in the automation — missed-call
                text-back and 30-day follow-up — so every lead gets worked,
                whether you&apos;re busy or not. Done in 7 days.
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
                Book a Walkthrough<ArrowRight size={20} />
              </a>
            </motion.div>
            <motion.p className="vertical-microline" {...reveal}>
              $950 one-time · Done in 7 days · You own the system
            </motion.p>
          </section>

          <section className="vertical-nevermiss section-shell">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <h2>Automation on dirty data is garbage in, garbage out.</h2>
            </motion.div>
            <motion.p className="vertical-watch-line" {...reveal}>
              Most shops don&apos;t have a lead problem — they have a system
              problem. Leads in spreadsheets, duplicate contacts, no follow-up
              after the first call. We fix the foundation first, then put the
              automation on top of clean data. That&apos;s the order that
              actually works.
            </motion.p>
          </section>

          <section className="vertical-capabilities section-shell" id="cleanup-scope">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">What&apos;s included</p>
              <h2>Five things. One clean, automated system.</h2>
            </motion.div>
            <div className="vertical-capability-grid">
              {scopeItems.map(({ icon: Icon, title, copy }) => (
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

          <section className="vertical-how section-shell" id="cleanup-process" aria-labelledby="cleanup-how">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">How it works</p>
              <h2 id="cleanup-how">Clean first. Automate second. Done in 7 days.</h2>
            </motion.div>
            <div className="vertical-how-grid">
              {processSteps.map(({ icon: Icon, title, copy }, index) => (
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

          <section className="vertical-pricing section-shell" id="cleanup-pricing">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">Pricing</p>
              <h2>One price. Yours in a week.</h2>
            </motion.div>
            <motion.div className="vertical-pricing-card" {...reveal}>
              <p className="vertical-eyebrow">Lead System Cleanup</p>
              <p className="vertical-price">
                <strong>$950</strong>
                <span>one-time</span>
              </p>
              <p>
                CRM audit, database cleanup and dedupe, pipeline stages,
                missed-call text-back automation, and 30-day follow-up
                sequences. Delivered in 7 days. You own the system.
              </p>
              <a
                className="button button-primary vertical-primary"
                href={LINKS.booking}
                onClick={() => trackBooking("pricing")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Walkthrough<ArrowRight size={18} />
              </a>
              <small>
                Upgrade to the AI Lead Booking Agent ($1,950/month,
                month-to-month) within 30 days and the full $950 is credited
                toward your first month.
              </small>
            </motion.div>
          </section>

          <section className="vertical-faq section-shell" id="cleanup-keep-running">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">After the 7 days</p>
              <h2>Keep it running, hands off.</h2>
              <p>
                The cleanup gets your system working. If you&apos;d rather
                never think about it again, we keep it running for you —
                clean data, working follow-up, no babysitting.
              </p>
            </motion.div>
            <motion.div className="vertical-pricing-card" {...reveal}>
              <p className="vertical-eyebrow">Keep It Running</p>
              <p className="vertical-price">
                <strong>$450</strong>
                <span>/month</span>
              </p>
              <p>
                Ongoing CRM hygiene and dedupe, follow-up sequences managed
                and tuned, missed-call text-back kept running, and a monthly
                lead report showing what got worked. Month-to-month — cancel
                anytime.
              </p>
              <a
                className="button button-primary vertical-primary"
                href={LINKS.booking}
                onClick={() => trackBooking("keep_running")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Walkthrough<ArrowRight size={18} />
              </a>
              <small>
                Prefer the full system? Upgrade to the AI Lead Booking Agent
                ($1,950/month, month-to-month) within 30 days and the full
                $950 cleanup fee is credited toward your first month.
              </small>
            </motion.div>
          </section>

          <section className="vertical-faq section-shell" id="cleanup-faq">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">Questions</p>
              <h2>Questions before you book?</h2>
            </motion.div>
            <div className="vertical-faq-list">
              {faqs.map((faq) => (
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
                <h2>Stop letting leads die in a messy system.</h2>
                <p>
                  Book a 15-minute walkthrough and we&apos;ll show you exactly
                  what your cleanup would look like — then get it done in 7 days.
                </p>
              </div>
              <a
                className="button button-primary vertical-primary"
                href={LINKS.booking}
                onClick={() => trackBooking("final_cta")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Walkthrough<ArrowRight size={18} />
              </a>
            </motion.div>
          </section>
        </main>

        <SiteFooter onBookingClick={() => trackBooking("footer")} />
      </div>
    </>
  );
}
