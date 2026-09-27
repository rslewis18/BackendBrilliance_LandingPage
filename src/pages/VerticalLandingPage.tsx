import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  Bell,
  Briefcase,
  CalendarCheck,
  ClipboardList,
  Clock3,
  Droplets,
  FileCheck,
  FileText,
  Flower2,
  Gavel,
  Globe,
  Hammer,
  HardHat,
  Home,
  MessageCircle,
  PhoneCall,
  Play,
  Plug,
  Plus,
  RefreshCcw,
  Scale,
  ScrollText,
  ShieldCheck,
  Smile,
  Snowflake,
  Sparkles,
  Stethoscope,
  Sun,
  TreePine,
  UserCheck,
  UsersRound,
  Wrench,
  Zap,
} from "lucide-react";
import { PageMeta } from "../components/PageMeta";
import { LINKS } from "../config/links";
import { trackEvent } from "../utils/tracking";

type VerticalSlug = "home-services" | "legal" | "medspa-dental";

type VerticalPageConfig = {
  slug: VerticalSlug;
  path: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  subheading: string;
  primaryCta: string;
  secondaryCta: string;
  heroWatchLine: string;
  demoLabel: string;
  demoHeading: string;
  demoCopy: string;
  videoUrl?: string;
  videoPoster?: string;
  demoEnabled: boolean;
  valuePillars: Array<{
    icon: LucideIcon;
    title: string;
    copy: string;
  }>;
  audienceTitle: string;
  audiences: Array<{
    icon: LucideIcon;
    label: string;
  }>;
  problem: {
    headline: string;
    copy: string;
    points: string[];
  };
  capabilitiesTitle: string;
  capabilities: Array<{
    icon: LucideIcon;
    title: string;
    copy: string;
  }>;
  howItWorksTitle: string;
  howItWorks: Array<{
    icon: LucideIcon;
    title: string;
    copy: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  finalHeadline: string;
  finalCopy: string;
  finalCta: string;
};

const homeServices: VerticalPageConfig = {
  slug: "home-services",
  path: "/home-services",
  metaTitle: "AI Lead Booking Agent for Home Services | Backend Brilliance",
  metaDescription:
    "Every missed call becomes a booked job. Backend Brilliance's AI Lead Booking Agent texts back missed calls in seconds, qualifies the lead, and books the job. From $1,950/month.",
  eyebrow: "AI Lead Booking Agent · Home Services",
  headline: "Every missed call becomes a booked job.",
  subheading:
    "Backend Brilliance's AI Lead Booking Agent answers every missed call by text within seconds, qualifies the lead, and books the job — so no opportunity slips through.",
  primaryCta: "Book a Demo",
  secondaryCta: "See It In Action",
  demoHeading: "A missed plumbing call becomes a booked estimate in 30 seconds.",
  demoCopy:
    "A dramatization of a real scenario — a homeowner calls after hours, the agent texts back in seconds, qualifies the job, and books the estimate.",
  heroWatchLine: "Watch the demo. It runs in under a minute.",
  demoLabel: "AI Lead Booking Agent demo",
  videoUrl: "/demo-video.mp4",
  demoEnabled: true,
  valuePillars: [
    {
      icon: PhoneCall,
      title: "Instant missed-call text-back",
      copy: "The moment a call goes unanswered, the agent texts back — while the homeowner is still thinking about you.",
    },
    {
      icon: Zap,
      title: "Response in seconds, 24/7",
      copy: "Nights, weekends, holidays. The agent never sleeps, never takes a day off, never lets a lead wait.",
    },
    {
      icon: CalendarCheck,
      title: "Estimates booked for you",
      copy: "Qualified leads go straight onto your calendar — you just show up and close.",
    },
    {
      icon: RefreshCcw,
      title: "No-show recovery",
      copy: "The agent follows up with no-shows and stale leads automatically, winning back jobs you'd written off.",
    },
  ],
  audienceTitle: "Built for home service pros",
  audiences: [
    { icon: Snowflake, label: "HVAC" },
    { icon: Wrench, label: "Plumbing" },
    { icon: Zap, label: "Electrical" },
    { icon: Home, label: "Roofing" },
    { icon: Hammer, label: "Remodeling" },
    { icon: TreePine, label: "Tree service" },
  ],
  problem: {
    headline: "The phone rings. The job goes to someone else.",
    copy: "You spend good money getting the phone to ring — ads, trucks, reputation. But when a call comes in during a job, after hours, or on a weekend, it goes to voicemail. Most callers don't leave one. They call the next company on the list.",
    points: [
      "60%+ of calls to small businesses go unanswered",
      "Most callers never leave a voicemail",
      "The first business to respond usually wins",
      "Every missed call is a job you already paid to earn",
    ],
  },
  capabilitiesTitle: "The machinery behind every booked job.",
  capabilities: [
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
      copy: "The agent asks your questions — service needed, timeline, location — and filters out the tire-kickers.",
    },
    {
      icon: CalendarCheck,
      title: "Estimate and job booking",
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
  ],
  howItWorksTitle: "Missed call in. Booked job out.",
  howItWorks: [
    {
      icon: Plug,
      title: "Connect your phones",
      copy: "We link the agent to your business line and calendar. Your number stays yours.",
    },
    {
      icon: CalendarCheck,
      title: "Set your booking rules",
      copy: "Services, service area, qualifying questions, calendar — configured around how you work.",
    },
    {
      icon: Play,
      title: "Answer, qualify, book",
      copy: "The agent texts back missed calls in seconds, qualifies the lead, and books the job.",
    },
  ],
  faqs: [
    {
      question: "How fast does it respond?",
      answer:
        "Within seconds of a missed call or new inquiry — 24 hours a day, 7 days a week, including nights, weekends, and holidays.",
    },
    {
      question: "Does it replace my office staff?",
      answer:
        "No. It handles the first response, qualification, and booking — then hands off to your team with the full conversation. Your people focus on the work, not the phone tag.",
    },
    {
      question: "What happens when a job needs a human?",
      answer:
        "The agent recognizes when a human should step in and hands over the complete conversation instantly — nothing gets lost.",
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
  ],
  finalHeadline: "Stop losing jobs to voicemail.",
  finalCopy:
    "Book a 15-minute walkthrough and we'll show you the agent working — on your phone, with your business.",
  finalCta: "Book a Demo",
};

const legal: VerticalPageConfig = {
  slug: "legal",
  path: "/legal",
  metaTitle: "AI Lead Booking Agent for Law Firms | Backend Brilliance",
  metaDescription:
    "Every inquiry becomes a scheduled consultation. Backend Brilliance's AI Lead Booking Agent responds in seconds, collects preliminary intake, and books consultations. From $1,950/month.",
  eyebrow: "AI Lead Booking Agent · Legal Intake",
  headline: "Every inquiry becomes a scheduled consultation.",
  subheading:
    "Backend Brilliance's AI Lead Booking Agent answers every inquiry within seconds, collects preliminary intake, and books the consultation — so no potential client slips through. It supports your intake team and never gives legal advice.",
  primaryCta: "Book a Demo",
  secondaryCta: "See It In Action",
  demoHeading: "A missed intake call becomes a booked consultation in under a minute.",
  demoCopy:
    "A dramatization of a real scenario — a potential client calls during a hearing, the agent texts back in seconds, collects preliminary intake, and books the consultation.",
  heroWatchLine: "Watch the demo. It runs in under a minute.",
  demoLabel: "AI Lead Booking Agent demo",
  videoUrl: "/demo-video.mp4",
  demoEnabled: true,
  valuePillars: [
    {
      icon: PhoneCall,
      title: "Instant inquiry text-back",
      copy: "The moment a call or form goes unanswered, the agent responds — while the potential client is still deciding.",
    },
    {
      icon: Zap,
      title: "Response in seconds, 24/7",
      copy: "After hours, weekends, during trial. The agent never misses an inquiry.",
    },
    {
      icon: UserCheck,
      title: "Preliminary intake collected",
      copy: "The agent asks your firm's screening questions and organizes the answers — ready for attorney review.",
    },
    {
      icon: CalendarCheck,
      title: "Consultations booked for you",
      copy: "Qualified inquiries go straight onto the calendar — your team just shows up prepared.",
    },
  ],
  audienceTitle: "Built for law firms",
  audiences: [
    { icon: Scale, label: "Personal injury" },
    { icon: HardHat, label: "Workers' comp" },
    { icon: Gavel, label: "Criminal defense" },
    { icon: UsersRound, label: "Family law" },
    { icon: Globe, label: "Immigration" },
    { icon: FileText, label: "Bankruptcy" },
    { icon: Briefcase, label: "Employment" },
    { icon: ScrollText, label: "Estate planning" },
  ],
  problem: {
    headline: "The inquiry arrives. The consultation goes to another firm.",
    copy: "You spend good money generating inquiries — ads, referrals, reputation. But when a call or form comes in after hours, during a hearing, or on a weekend, it sits. Most potential clients don't wait. They contact the next firm on the list.",
    points: [
      "Most clients contact multiple firms",
      "The first firm to respond usually wins",
      "After-hours inquiries pile up unanswered",
      "Every lost inquiry is a case you already paid to earn",
    ],
  },
  capabilitiesTitle: "The machinery behind every booked job.",
  capabilities: [
    {
      icon: PhoneCall,
      title: "Inquiry text-back",
      copy: "Every missed call or unanswered form gets an instant, personal response — within seconds.",
    },
    {
      icon: Clock3,
      title: "Instant response, 24/7",
      copy: "After hours, weekends, during hearings. New inquiries get an answer immediately.",
    },
    {
      icon: ClipboardList,
      title: "Preliminary intake",
      copy: "The agent asks your firm's screening questions and organizes the answers for attorney review.",
    },
    {
      icon: CalendarCheck,
      title: "Consultation booking",
      copy: "Qualified inquiries book straight onto the calendar, synced with your schedule.",
    },
    {
      icon: Bell,
      title: "Confirmations and reminders",
      copy: "Automatic texts keep consultations on the calendar and no-shows down.",
    },
    {
      icon: RefreshCcw,
      title: "No-show recovery",
      copy: "Missed consultations get followed up automatically — and rebooked.",
    },
    {
      icon: FileCheck,
      title: "CRM and intake updates",
      copy: "Every conversation and inquiry is logged where your team can see it.",
    },
    {
      icon: UsersRound,
      title: "Live handoff to your team",
      copy: "The moment a human should step in, the agent hands over the full conversation.",
    },
  ],
  howItWorksTitle: "Inquiry in. Consultation booked.",
  howItWorks: [
    {
      icon: Plug,
      title: "Connect your lines",
      copy: "We link the agent to your firm's lines, intake forms, and calendars.",
    },
    {
      icon: CalendarCheck,
      title: "Set your intake rules",
      copy: "Screening questions, practice areas, consultation types — configured around your firm.",
    },
    {
      icon: Play,
      title: "Respond, collect, book",
      copy: "The agent answers inquiries in seconds, collects preliminary intake, and books the consultation.",
    },
  ],
  faqs: [
    {
      question: "Does the agent give legal advice?",
      answer:
        "Never. It answers logistical questions, collects preliminary intake using your firm's screening questions, and books consultations. Everything is organized for attorney review.",
    },
    {
      question: "How fast does it respond?",
      answer: "Within seconds of a missed call or new inquiry — 24 hours a day, 7 days a week.",
    },
    {
      question: "What happens with complex cases?",
      answer:
        "The agent recognizes when a human should step in and hands over the complete conversation instantly — nothing gets lost.",
    },
    {
      question: "Do we keep our firm's numbers?",
      answer: "Yes. Your numbers stay yours. The agent works through your existing lines and intake forms.",
    },
    {
      question: "What does it cost?",
      answer:
        "From $1,950/month, month-to-month. Any one-time setup and third-party messaging costs are confirmed with you before anything starts.",
    },
  ],
  finalHeadline: "Stop losing consultations to slow intake.",
  finalCopy:
    "Book a 15-minute walkthrough and we'll show you the agent working — on your phone, with your firm.",
  finalCta: "Book a Demo",
};

const medspaDental: VerticalPageConfig = {
  slug: "medspa-dental",
  path: "/medspa-dental",
  metaTitle: "AI Lead Booking Agent for Med Spas & Dental | Backend Brilliance",
  metaDescription:
    "Every inquiry becomes a booked consultation. Backend Brilliance's AI Lead Booking Agent responds in seconds, answers common questions, and books consultations. From $1,950/month.",
  eyebrow: "AI Lead Booking Agent · Med Spa & Dental",
  headline: "Every inquiry becomes a booked consultation.",
  subheading:
    "Backend Brilliance's AI Lead Booking Agent answers every inquiry within seconds, answers common questions, and books the consultation — so no potential patient slips through. It supports your front desk and never gives medical advice.",
  primaryCta: "Book a Demo",
  secondaryCta: "See It In Action",
  demoHeading: "A missed call from a new patient becomes a booked consultation in under a minute.",
  demoCopy:
    "A dramatization of a real scenario — a potential patient calls after hours, the agent texts back in seconds, answers questions, and books the consultation.",
  heroWatchLine: "Watch the demo. It runs in under a minute.",
  demoLabel: "AI Lead Booking Agent demo",
  videoUrl: "/demo-video.mp4",
  demoEnabled: true,
  valuePillars: [
    {
      icon: PhoneCall,
      title: "Instant inquiry text-back",
      copy: "The moment a call or form goes unanswered, the agent responds — while the potential patient is still deciding.",
    },
    {
      icon: Zap,
      title: "Response in seconds, 24/7",
      copy: "Evenings, weekends, between appointments. The agent never misses an inquiry.",
    },
    {
      icon: CalendarCheck,
      title: "Consultations booked for you",
      copy: "Qualified inquiries go straight onto the calendar — your team just shows up and treats.",
    },
    {
      icon: RefreshCcw,
      title: "No-show recovery",
      copy: "The agent follows up with no-shows and stale inquiries automatically, filling chairs you'd written off.",
    },
  ],
  audienceTitle: "Built for med spas and dental practices",
  audiences: [
    { icon: Sparkles, label: "Med spas" },
    { icon: Stethoscope, label: "Cosmetic dentistry" },
    { icon: Plus, label: "Implants" },
    { icon: Smile, label: "Orthodontics" },
    { icon: Sun, label: "Aesthetic practices" },
    { icon: Flower2, label: "Laser & skin clinics" },
    { icon: Activity, label: "Wellness clinics" },
    { icon: Droplets, label: "IV therapy" },
  ],
  problem: {
    headline: "The inquiry arrives. The consultation goes to another practice.",
    copy: "You spend good money generating inquiries — ads, social, reputation. But when a call or form comes in after hours or between appointments, it sits. Most potential patients don't wait. They book with the next practice on the list.",
    points: [
      "Most patients contact multiple practices",
      "The first practice to respond usually wins",
      "After-hours inquiries pile up unanswered",
      "Every lost inquiry is a patient you already paid to earn",
    ],
  },
  capabilitiesTitle: "The machinery behind every booked job.",
  capabilities: [
    {
      icon: PhoneCall,
      title: "Inquiry text-back",
      copy: "Every missed call or unanswered form gets an instant, personal response — within seconds.",
    },
    {
      icon: Clock3,
      title: "Instant response, 24/7",
      copy: "Evenings, weekends, between appointments. New inquiries get an answer immediately.",
    },
    {
      icon: MessageCircle,
      title: "Question answering",
      copy: "The agent answers common questions about treatments, pricing ranges, and what to expect.",
    },
    {
      icon: CalendarCheck,
      title: "Consultation booking",
      copy: "Qualified inquiries book straight onto the calendar, synced with your providers.",
    },
    {
      icon: Bell,
      title: "Confirmations and reminders",
      copy: "Automatic texts keep consultations on the calendar and no-shows down.",
    },
    {
      icon: RefreshCcw,
      title: "No-show recovery",
      copy: "Missed appointments get followed up automatically — and rebooked.",
    },
    {
      icon: ClipboardList,
      title: "CRM and calendar updates",
      copy: "Every conversation and booking is logged where your team can see it.",
    },
    {
      icon: UsersRound,
      title: "Live handoff to your team",
      copy: "The moment a human should step in, the agent hands over the full conversation.",
    },
  ],
  howItWorksTitle: "Inquiry in. Consultation booked.",
  howItWorks: [
    {
      icon: Plug,
      title: "Connect your lines",
      copy: "We link the agent to your business lines, forms, and provider calendars.",
    },
    {
      icon: CalendarCheck,
      title: "Set your booking rules",
      copy: "Treatments, qualifying questions, consultation types — configured around your practice.",
    },
    {
      icon: Play,
      title: "Answer, qualify, book",
      copy: "The agent responds in seconds, answers common questions, and books the consultation.",
    },
  ],
  faqs: [
    {
      question: "Does the agent give medical advice?",
      answer:
        "Never. It answers common questions about treatments, pricing ranges, and what to expect — then books the consultation so your providers handle the rest.",
    },
    {
      question: "How fast does it respond?",
      answer: "Within seconds of a missed call or new inquiry — 24 hours a day, 7 days a week.",
    },
    {
      question: "What happens when a patient needs a human?",
      answer:
        "The agent recognizes when a human should step in and hands over the complete conversation instantly — nothing gets lost.",
    },
    {
      question: "Do we keep our business numbers?",
      answer: "Yes. Your numbers stay yours. The agent works through your existing lines and forms.",
    },
    {
      question: "What does it cost?",
      answer:
        "From $1,950/month, month-to-month. Any one-time setup and third-party messaging costs are confirmed with you before anything starts.",
    },
  ],
  finalHeadline: "Stop losing patients to slow response.",
  finalCopy:
    "Book a 15-minute walkthrough and we'll show you the agent working — on your phone, with your practice.",
  finalCta: "Book a Demo",
};

export const verticalPages = {
  homeServices,
  legal,
  medspaDental,
} as const;

type VerticalLandingPageProps = {
  page: VerticalPageConfig;
};

export function VerticalLandingPage({ page }: VerticalLandingPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.16 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
      };

  useEffect(() => {
    trackEvent("vertical_page_viewed", { vertical: page.slug });
  }, [page.slug]);

  const trackBooking = (location: string) => {
    trackEvent("booking_cta_clicked", {
      vertical: page.slug,
      location,
    });
    trackEvent("primary_cta_clicked", {
      vertical: page.slug,
      location,
    });
  };

  const trackSecondary = (location: string) => {
    trackEvent("secondary_cta_clicked", {
      vertical: page.slug,
      location,
    });
  };

  return (
    <>
      <PageMeta
        description={page.metaDescription}
        path={page.path}
        title={page.metaTitle}
      />

      <div className={`vertical-page vertical-page--${page.slug}`}>
        <VerticalHeader page={page} onBookingClick={() => trackBooking("header")} />

        <main>
          <section className="vertical-hero section-shell" id="top">
            <motion.div className="vertical-hero-copy" {...reveal}>
              <p className="vertical-eyebrow">{page.eyebrow}</p>
              <h1>{page.headline}</h1>
              <p className="vertical-subheading">{page.subheading}</p>
            </motion.div>

            <motion.div className="vertical-hero-actions" {...reveal}>
              <a
                className="button button-primary vertical-primary"
                href={LINKS.booking}
                onClick={() => trackBooking("hero")}
                target="_blank"
                rel="noopener noreferrer"
              >
                {page.primaryCta}<ArrowRight size={20} />
              </a>
              <a
                className="button button-secondary vertical-secondary"
                href="#demo"
                onClick={() => trackSecondary("hero")}
              >
                <ArrowRight size={20} />
                {page.secondaryCta}
              </a>
            </motion.div>
            <motion.p className="vertical-microline" {...reveal}>
              From $1,950/month · No new staff · Nothing to install
            </motion.p>
          </section>

          <section className="vertical-demo-section section-shell" id="demo">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">Watch it work</p>
              <h2>{page.demoHeading}</h2>
            </motion.div>
            <motion.div {...reveal}>
              <DemoPanel
                label={page.demoLabel}
                onDemoPlay={() =>
                  trackEvent("demo_video_clicked", { vertical: page.slug })
                }
                page={page}
              />
            </motion.div>
            <motion.p className="vertical-watch-line" {...reveal}>
              {page.heroWatchLine}
            </motion.p>
          </section>

          <section
            className="vertical-how section-shell"
            id="vertical-how-it-works"
            aria-labelledby={`${page.slug}-how`}
          >
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">How it works</p>
              <h2 id={`${page.slug}-how`}>{page.howItWorksTitle}</h2>
            </motion.div>
            <div className="vertical-how-grid">
              {page.howItWorks.map(({ icon: Icon, title, copy }, index) => (
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

          <section className="vertical-value-strip section-shell" aria-label="Core benefits">
            {page.valuePillars.map(({ icon: Icon, title, copy }) => (
              <motion.article className="vertical-value-pill" key={title} {...reveal}>
                <span>
                  <Icon size={24} />
                </span>
                <div>
                  <h2>{title}</h2>
                  <p>{copy}</p>
                </div>
              </motion.article>
            ))}
          </section>

          <section className="vertical-problem section-shell" id="vertical-problem">
            <motion.div className="vertical-section-heading" {...reveal}>
              <p className="vertical-eyebrow">The problem</p>
              <h2>{page.problem.headline}</h2>
              <p>{page.problem.copy}</p>
            </motion.div>
            <div className="vertical-problem-grid">
              {page.problem.points.map((point) => (
                <motion.article className="vertical-problem-card" key={point} {...reveal}>
                  <ShieldCheck size={18} />
                  <span>{point}</span>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="vertical-capabilities section-shell" id="vertical-capabilities">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">What&apos;s included</p>
              <h2>{page.capabilitiesTitle}</h2>
            </motion.div>
            <div className="vertical-capability-grid">
              {page.capabilities.map(({ icon: Icon, title, copy }) => (
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

          <section className="vertical-audience section-shell" id="vertical-audience" aria-labelledby={`${page.slug}-audience`}>
            <motion.h2 id={`${page.slug}-audience`} {...reveal}>
              {page.audienceTitle}
            </motion.h2>
            <div className="vertical-chip-grid">
              {page.audiences.map(({ icon: Icon, label }) => (
                <motion.article className="vertical-chip" key={label} {...reveal}>
                  <Icon size={26} />
                  <span>{label}</span>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="vertical-pricing section-shell" id="vertical-pricing">
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
                {page.primaryCta}<ArrowRight size={18} />
              </a>
              <small>
                Any one-time setup and third-party messaging costs are confirmed
                with you before anything starts. No surprises.
              </small>
            </motion.div>
          </section>

          <section className="vertical-faq section-shell" id="vertical-faq">
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">Questions</p>
              <h2>Questions before you book?</h2>
            </motion.div>
            <div className="vertical-faq-list">
              {page.faqs.map((faq) => (
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
                <h2>{page.finalHeadline}</h2>
                <p>{page.finalCopy}</p>
              </div>
              <a
                className="button button-primary vertical-primary"
                href={LINKS.booking}
                onClick={() => trackBooking("final_cta")}
                target="_blank"
                rel="noopener noreferrer"
              >
                {page.finalCta}<ArrowRight size={18} />
              </a>
            </motion.div>
          </section>
        </main>

        <SiteFooter onBookingClick={() => trackBooking("footer")} />
      </div>
    </>
  );
}

function VerticalHeader({
  onBookingClick,
  page,
}: {
  page: VerticalPageConfig;
  onBookingClick: () => void;
}) {
  return (
    <header className="vertical-header">
      <a className="vertical-brand" href="/" aria-label="Backend Brilliance home">
        <img src="/backend-brilliance-logo.png" alt="" />
        <span>
          <strong>Backend</strong>
          <strong>Brilliance</strong>
        </span>
      </a>
      <nav aria-label={`${page.headline} navigation`}>
        <a href="#vertical-how-it-works">How It Works</a>
        <a href="#vertical-audience">Who It&apos;s For</a>
        <a href="#vertical-pricing">Pricing</a>
        <a href="#vertical-faq">FAQ</a>
      </nav>
      <a
        className="button button-primary vertical-header-cta"
        href={LINKS.booking}
        onClick={onBookingClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {page.primaryCta}
      </a>
    </header>
  );
}

export function SiteFooter({ onBookingClick }: { onBookingClick?: () => void }) {
  return (
    <footer className="vertical-footer">
      <div className="vertical-footer-inner section-shell">
        <div className="vertical-footer-brand">
          <strong>Backend Brilliance</strong>
          <p>The AI Lead Booking Agent for local service businesses.</p>
        </div>
        <nav aria-label="Footer">
          <div className="vertical-footer-col">
            <strong>Niches</strong>
            <a href="/home-services">Home Services</a>
            <a href="/legal">Legal</a>
            <a href="/medspa-dental">Med Spa &amp; Dental</a>
          </div>
          <div className="vertical-footer-col">
            <strong>Company</strong>
            <a
              href={LINKS.booking}
              onClick={onBookingClick}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Demo
            </a>
            <a href="mailto:backendbrilliance@gmail.com">Contact</a>
          </div>
        </nav>
      </div>
      <p className="vertical-footer-legal">
        © {new Date().getFullYear()} Backend Brilliance. The agent assists your
        staff and customers — it does not replace professional judgment, and it
        never gives legal or medical advice.
      </p>
    </footer>
  );
}

function DemoPanel({
  label,
  onDemoPlay,
  page,
}: {
  label: string;
  onDemoPlay: () => void;
  page: VerticalPageConfig;
}) {
  if (page.demoEnabled && page.videoUrl) {
    return (
      <div className="vertical-demo-panel is-video">
        <video
          controls
          onPlay={onDemoPlay}
          poster={page.videoPoster}
          preload="metadata"
          src={page.videoUrl}
        >
          <track kind="captions" />
        </video>
      </div>
    );
  }

  return (
    <div className="vertical-demo-panel vertical-vsl-placeholder" aria-label={`${label} video placeholder`}>
      <div className="vertical-vsl-placeholder-icon" aria-hidden="true"><Play size={34} /></div>
      <strong>{label}</strong>
      <span>VSL video coming soon</span>
      <small>The final niche-specific video will appear here when its URL is configured.</small>
    </div>
  );
}
