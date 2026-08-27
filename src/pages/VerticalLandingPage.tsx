import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bell,
  Bot,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  Clock3,
  FileText,
  Gavel,
  HeartPulse,
  Home,
  MessageCircle,
  PhoneCall,
  Play,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserCheck,
  UsersRound,
  Zap,
} from "lucide-react";
import { PageMeta } from "../components/PageMeta";
import { LINKS } from "../config/links";
import { OFFER_CONFIG } from "../config/offers";
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
  supportingCopy: string;
  primaryCta: string;
  secondaryCta: string;
  heroWatchLine: string;
  demoLabel: string;
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
    support: string;
    points: string[];
  };
  capabilitiesTitle: string;
  capabilities: Array<{
    icon: LucideIcon;
    title: string;
    copy: string;
  }>;
  howItWorks: Array<{
    icon: LucideIcon;
    title: string;
    copy: string;
  }>;
  finalHeadline: string;
  finalCopy: string;
  finalCta: string;
};

const homeServices: VerticalPageConfig = {
  slug: "home-services",
  path: "/home-services",
  metaTitle: "AI Lead Booking for Home Service Businesses | Backend Brilliance",
  metaDescription:
    "AI lead response, follow-up, information gathering, and booking support for established home-service businesses.",
  eyebrow: "Home Service Conversion System",
  headline: "AI Lead Booking Agent",
  subheading:
    "Responds to new leads, follows up automatically, qualifies prospects, and books appointments directly onto your calendar.",
  supportingCopy:
    "The AI technology powering the response, follow-up, qualification, and booking portion of a broader system built to capture more leads, convert more opportunities, book more jobs, and increase profitability.",
  primaryCta: "Get Your Agent",
  secondaryCta: "See How It Works",
  heroWatchLine: "See how the system handles new leads, missed calls, old opportunities, no-shows, and long-term follow-up.",
  demoLabel: "AI Lead Booking Agent VSL",
  videoUrl: OFFER_CONFIG.external.vslUrls.homeServices || undefined,
  demoEnabled: Boolean(OFFER_CONFIG.external.vslUrls.homeServices),
  valuePillars: [
    {
      icon: Zap,
      title: "Faster Lead Response",
      copy: "Help engage new opportunities while interest is high.",
    },
    {
      icon: RefreshCcw,
      title: "Consistent Follow-Up",
      copy: "Keep conversations moving even when staff are busy.",
    },
    {
      icon: ClipboardList,
      title: "Information Gathering",
      copy: "Collect important prospect details before team handoff.",
    },
    {
      icon: CalendarCheck,
      title: "Calendar Booking",
      copy: "Help move qualified opportunities onto the schedule.",
    },
  ],
  audienceTitle: "Built for home-service businesses already generating opportunities",
  audiences: [
    { icon: Home, label: "HVAC" },
    { icon: PhoneCall, label: "Plumbing" },
    { icon: Home, label: "Roofing" },
    { icon: Zap, label: "Electrical" },
    { icon: ShieldCheck, label: "Remodeling" },
    { icon: RefreshCcw, label: "Restoration" },
    { icon: Sparkles, label: "Tree Service" },
    { icon: CalendarDays, label: "Junk Removal" },
    { icon: Search, label: "Pest Control" },
    { icon: Home, label: "Similar Services" },
  ],
  problem: {
    headline: "You May Already Have More Revenue Opportunities Than You Think.",
    copy:
      "Slow response, missed calls, inconsistent follow-up, and unworked CRM records can quietly turn paid-for opportunities into lost jobs.",
    support:
      "The Home Service Conversion System helps your team turn more of the leads and opportunities you are already generating into booked estimates and jobs.",
    points: [
      "Missed calls",
      "Slow response to web leads",
      "Repetitive follow-up",
      "After-hours inquiries",
      "Appointment scheduling",
      "Overwhelmed front-office teams",
      "Old leads sitting untouched",
      "Inconsistent follow-up",
    ],
  },
  capabilitiesTitle: "The Home Service Conversion System",
  capabilities: [
    {
      icon: MessageCircle,
      title: "New Lead Response",
      copy: "Replies to new inquiries from forms, calls, and campaigns.",
    },
    {
      icon: PhoneCall,
      title: "Missed Call Follow-Up",
      copy: "Follows up when a call goes unanswered.",
    },
    {
      icon: UserCheck,
      title: "Lead Qualification",
      copy: "Uses your rules to collect the details your team needs before the next step.",
    },
    {
      icon: CalendarCheck,
      title: "Estimate / Appointment Booking",
      copy: "Helps qualified prospects move toward the calendar.",
    },
    {
      icon: RefreshCcw,
      title: "Old Lead Reactivation",
      copy: "Reconnects with cold or forgotten opportunities.",
    },
    {
      icon: Bell,
      title: "Confirmations & Reminders",
      copy: "Sends confirmations and reminders that help keep appointments on track.",
    },
    {
      icon: RefreshCcw,
      title: "No-Show Recovery",
      copy: "Re-engages prospects after a missed estimate or appointment.",
    },
    {
      icon: Clock3,
      title: "Long-Term Lead Follow-Up",
      copy: "Keeps longer buying cycles from going quiet.",
    },
    {
      icon: UsersRound,
      title: "CRM & Calendar Automation",
      copy: "Keeps routing, scheduling, status updates, and staff handoffs moving.",
    },
  ],
  howItWorks: [
    {
      icon: UserCheck,
      title: "Lead Comes In",
      copy: "Website, advertisements, calls, forms, or other campaigns.",
    },
    {
      icon: Bot,
      title: "Automation Supports the Conversation",
      copy: "Responds, gathers information, follows up, and helps move the prospect forward.",
    },
    {
      icon: CalendarCheck,
      title: "Your Team Takes It From There",
      copy: "Qualified opportunities can be scheduled or handed to staff for the next step.",
    },
  ],
  finalHeadline: "Capture More Leads. Convert More Opportunities. Book More Jobs.",
  finalCopy:
    "Put an AI Lead Booking Agent inside a complete home-service conversion workflow built around your business.",
  finalCta: "Get Your Agent",
};

const legal: VerticalPageConfig = {
  slug: "legal",
  path: "/legal",
  metaTitle: "Legal Intake & Conversion System | Backend Brilliance",
  metaDescription:
    "Help more qualified prospective clients reach a scheduled consultation with structured intake, follow-up, and booking support.",
  eyebrow: "Legal Intake & Conversion System",
  headline: "AI Lead Booking Agent",
  subheading:
    "Responds to prospective clients, supports structured preliminary intake, follows up consistently, and moves qualified inquiries toward scheduled consultations.",
  supportingCopy:
    "The agent applies firm-defined intake and screening criteria, routes information to your team, and never replaces attorney judgment or provides legal advice.",
  primaryCta: "Get Your Agent",
  secondaryCta: "See How It Works",
  heroWatchLine: "See how more prospective-client inquiries can become scheduled consultations.",
  demoLabel: "Legal Intake & Conversion VSL",
  videoUrl: OFFER_CONFIG.external.vslUrls.legal || undefined,
  demoEnabled: Boolean(OFFER_CONFIG.external.vslUrls.legal),
  valuePillars: [
    {
      icon: Clock3,
      title: "24/7 Inquiry Support",
      copy: "Provide an initial response even when staff are unavailable.",
    },
    {
      icon: FileText,
      title: "Structured Preliminary Intake",
      copy: "Collect case-type and intake information using questions defined by the firm.",
    },
    {
      icon: RefreshCcw,
      title: "Consistent Follow-Up",
      copy: "Help keep prospective clients from falling through the cracks.",
    },
    {
      icon: CalendarCheck,
      title: "Consultation Scheduling",
      copy: "Assist with moving appropriate inquiries onto the firm's calendar.",
    },
  ],
  audienceTitle: "Built for intake-heavy legal practices",
  audiences: [
    { icon: Gavel, label: "Personal Injury" },
    { icon: ShieldCheck, label: "Workers' Comp" },
    { icon: Gavel, label: "Criminal Defense" },
    { icon: UsersRound, label: "Family Law" },
    { icon: FileText, label: "Immigration" },
    { icon: ClipboardList, label: "Bankruptcy" },
    { icon: UserCheck, label: "Employment Law" },
    { icon: FileText, label: "Estate Planning" },
    { icon: ShieldCheck, label: "Probate" },
    { icon: MessageCircle, label: "Disability" },
  ],
  problem: {
    headline: "More Qualified Prospective Clients Should Reach Your Calendar.",
    copy:
      "Slow response, missed calls, inconsistent intake follow-up, and unworked inquiries can keep prospective clients from reaching a scheduled consultation.",
    support:
      "The Legal Intake & Conversion System supports the intake pipeline while attorneys and staff remain responsible for legal judgment, screening decisions, and client relationships.",
    points: [
      "After-hours inquiries",
      "Missed calls",
      "Repetitive initial information gathering",
      "Delayed callbacks",
      "Prospects contacting multiple firms",
      "Consultation scheduling",
      "Repeated administrative follow-up",
      "Overloaded intake staff",
    ],
  },
  capabilitiesTitle: "The Legal Intake & Conversion System",
  capabilities: [
    {
      icon: MessageCircle,
      title: "New Inquiry Response",
      copy: "Provides a prompt administrative response to new prospects.",
    },
    {
      icon: Clock3,
      title: "After-Hours Intake Support",
      copy: "Offers a consistent first touch outside normal office hours.",
    },
    {
      icon: PhoneCall,
      title: "Missed Call Follow-Up",
      copy: "Helps reconnect after unanswered calls.",
    },
    {
      icon: ClipboardList,
      title: "Firm-Defined Screening Questions",
      copy: "Applies administrative intake criteria set by the firm without making legal judgments.",
    },
    {
      icon: Gavel,
      title: "Practice-Area Routing",
      copy: "Routes inquiries according to firm-defined administrative rules.",
    },
    {
      icon: CalendarCheck,
      title: "Consultation Scheduling",
      copy: "Helps move appropriate inquiries toward a consultation.",
    },
    {
      icon: Bell,
      title: "Appointment Reminders",
      copy: "Sends administrative reminders for scheduled consultations.",
    },
    {
      icon: RefreshCcw,
      title: "No-Show & Unresponsive Follow-Up",
      copy: "Re-engages prospective clients who miss or do not schedule a consultation.",
    },
    {
      icon: Clock3,
      title: "Old-Inquiry Reactivation",
      copy: "Reconnects with prior prospective-client inquiries still eligible for firm follow-up.",
    },
    {
      icon: UsersRound,
      title: "Intake Pipeline Updates",
      copy: "Keeps CRM status, routing, and staff notifications moving according to firm rules.",
    },
  ],
  howItWorks: [
    {
      icon: MessageCircle,
      title: "Inquiry Comes In",
      copy: "From calls, forms, advertisements, referrals, or other sources.",
    },
    {
      icon: Bot,
      title: "Intake Support Begins",
      copy: "The system gathers initial information and follows firm-defined administrative workflows.",
    },
    {
      icon: UsersRound,
      title: "Staff Takes the Next Step",
      copy: "The prospect can be scheduled, routed, or handed to firm staff according to the firm's process.",
    },
  ],
  finalHeadline: "Help More Qualified Prospective Clients Reach a Consultation",
  finalCopy:
    "Add a consistent response, preliminary intake, follow-up, and consultation-booking layer that works alongside your firm.",
  finalCta: "Get Your Agent",
};

const medspaDental: VerticalPageConfig = {
  slug: "medspa-dental",
  path: "/medspa-dental",
  metaTitle: "Consultation Conversion System | Backend Brilliance",
  metaDescription:
    "AI lead response and patient booking support for med spas, dental practices, and high-value appointment-driven practices.",
  eyebrow: "Consultation Conversion System",
  headline: "AI Lead Booking Agent",
  subheading:
    "Responds to new inquiries, follows up consistently, and helps turn more prospects into booked consultations and appointments.",
  supportingCopy:
    "Support your booking team with immediate response, treatment-interest questions, reminders, no-show recovery, reactivation, and long-term nurture—without medical advice or diagnosis.",
  primaryCta: "Get Your Agent",
  secondaryCta: "See How It Works",
  heroWatchLine: "See how more inquiries can become booked consultations and appointments.",
  demoLabel: "Consultation Conversion VSL",
  videoUrl: OFFER_CONFIG.external.vslUrls.medSpaDental || undefined,
  demoEnabled: Boolean(OFFER_CONFIG.external.vslUrls.medSpaDental),
  valuePillars: [
    {
      icon: Zap,
      title: "Faster Lead Response",
      copy: "Engage inquiries while interest is high.",
    },
    {
      icon: CalendarCheck,
      title: "Consultation Booking Support",
      copy: "Help prospects take the next scheduling step.",
    },
    {
      icon: RefreshCcw,
      title: "Consistent Follow-Up",
      copy: "Continue communication when leads don't immediately book.",
    },
    {
      icon: Bell,
      title: "Lead & Appointment Recovery",
      copy: "Help reconnect with missed opportunities and no-shows.",
    },
  ],
  audienceTitle: "Built for high-value consultation-driven businesses",
  audiences: [
    { icon: Stethoscope, label: "Med Spas" },
    { icon: HeartPulse, label: "Cosmetic Dentistry" },
    { icon: Stethoscope, label: "Dental Implants" },
    { icon: CalendarCheck, label: "Orthodontics" },
    { icon: Sparkles, label: "Cosmetic Dermatology" },
    { icon: HeartPulse, label: "Elective Wellness" },
    { icon: UsersRound, label: "Patient Coordinators" },
    { icon: MessageCircle, label: "Consultation Teams" },
  ],
  problem: {
    headline: "Turn More Inquiries Into Booked Consultations.",
    copy:
      "Slow response, incomplete follow-up, missed calls, and no-shows can reduce the return from every marketing channel generating patient and prospect inquiries.",
    support:
      "The Consultation Conversion System supports response, booking, reminders, and reactivation while your staff remains responsible for patient care and all medical decisions.",
    points: [
      "Meta leads requiring quick response",
      "Google leads",
      "Staff helping current patients",
      "Prospects not answering the first callback",
      "Consultation follow-up",
      "Appointment reminders",
      "No-shows",
      "Old CRM leads",
      "Busy front-desk staff",
    ],
  },
  capabilitiesTitle: "The Consultation Conversion System",
  capabilities: [
    {
      icon: MessageCircle,
      title: "Website Lead Response",
      copy: "Responds to new website inquiries while interest is high.",
    },
    {
      icon: Sparkles,
      title: "Meta / Social Lead Follow-Up",
      copy: "Helps keep paid social leads from going cold.",
    },
    {
      icon: Search,
      title: "Google Lead Follow-Up",
      copy: "Supports quick response from search-driven inquiries.",
    },
    {
      icon: PhoneCall,
      title: "Missed Call Follow-Up",
      copy: "Reconnects when calls are missed during busy hours.",
    },
    {
      icon: CalendarCheck,
      title: "Consultation Booking",
      copy: "Helps prospects take the next scheduling step.",
    },
    {
      icon: UserCheck,
      title: "Treatment-Interest Questions",
      copy: "Collects basic, non-clinical interest details without diagnosing or giving medical advice.",
    },
    {
      icon: Bell,
      title: "Appointment Reminders",
      copy: "Sends administrative reminders to reduce missed appointments.",
    },
    {
      icon: RefreshCcw,
      title: "No-Show Follow-Up",
      copy: "Helps recover opportunities after missed visits.",
    },
    {
      icon: Clock3,
      title: "Old Lead Reactivation",
      copy: "Reconnects with CRM leads that never booked.",
    },
    {
      icon: Clock3,
      title: "Long-Term Nurture",
      copy: "Keeps appropriate unresponsive prospects from disappearing after the first follow-up.",
    },
  ],
  howItWorks: [
    {
      icon: MessageCircle,
      title: "Inquiry Comes In",
      copy: "From advertisements, websites, social platforms, calls, or campaigns.",
    },
    {
      icon: Bot,
      title: "Automation Supports Follow-Up",
      copy: "The system responds, gathers basic administrative information, and helps the prospect move forward.",
    },
    {
      icon: UsersRound,
      title: "Your Team Takes Over",
      copy: "Prospects can be scheduled or handed to staff for consultations, questions, or next steps.",
    },
  ],
  finalHeadline: "Turn More Inquiries Into Booked Consultations and Appointments",
  finalCopy:
    "Add an automated lead-response and booking layer that works alongside your practice team.",
  finalCta: "Get Your Agent",
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
  const fitCheckPath = `${OFFER_CONFIG.routes.start}?vertical=${encodeURIComponent(page.slug)}`;
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
              <p className="vertical-supporting-copy">{page.supportingCopy}</p>
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

            <motion.div className="vertical-hero-actions" {...reveal}>
              <a
                className="button button-secondary vertical-secondary"
                href="#vertical-how-it-works"
                onClick={() => trackSecondary("hero")}
              >
                <ArrowRight size={20} />
                {page.secondaryCta}
              </a>
              <Link className="button button-primary vertical-primary" onClick={() => trackBooking("hero")} to={fitCheckPath}>
                {page.primaryCta}<ArrowRight size={20} />
              </Link>
            </motion.div>
            <motion.p className="vertical-question-path" {...reveal}>
              Have questions before getting started?{" "}
              <a href={LINKS.booking} target="_blank" rel="noopener noreferrer">Book a call.</a>
            </motion.p>
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

          <section className="vertical-audience section-shell" aria-labelledby={`${page.slug}-audience`}>
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

          <section className="vertical-problem section-shell" id="vertical-problem">
            <motion.div className="vertical-section-heading" {...reveal}>
              <p className="vertical-eyebrow">Workflow pressure</p>
              <h2>{page.problem.headline}</h2>
              <p>{page.problem.copy}</p>
              <p>{page.problem.support}</p>
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
              <p className="vertical-eyebrow">Capabilities</p>
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

          <section className="vertical-human-ai section-shell">
            <motion.div className="vertical-human-card" {...reveal}>
              <div className="vertical-human-icon">
                <UsersRound size={34} />
              </div>
              <div>
                <p className="vertical-eyebrow">Human + AI</p>
                <h2>Automation Where It Helps. People Where They Matter.</h2>
                <p>
                  Backend Brilliance is designed to support your team—not replace
                  the relationships, judgment, and expertise that people bring to
                  your business.
                </p>
                <p>
                  Automation handles repetitive tasks such as immediate responses,
                  repeated follow-up, information gathering, reminders, scheduling,
                  and reactivation. Your team stays focused on customers, patients,
                  clients, sales conversations, professional judgment, and service
                  delivery.
                </p>
                <strong>
                  Use automation to extend your team&apos;s capacity, improve
                  consistency, and give people more time for the work that
                  requires a human touch.
                </strong>
              </div>
            </motion.div>
          </section>

          <section
            className="vertical-how section-shell"
            id="vertical-how-it-works"
            aria-labelledby={`${page.slug}-how`}
          >
            <motion.div className="vertical-section-heading centered" {...reveal}>
              <p className="vertical-eyebrow">How it works</p>
              <h2 id={`${page.slug}-how`}>A simple path from inquiry to next step.</h2>
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

          <section className="vertical-final-cta section-shell">
            <motion.div className="vertical-final-card" {...reveal}>
              <div className="vertical-final-logo" aria-hidden="true">
                BB
              </div>
              <div>
                <h2>{page.finalHeadline}</h2>
                <p>{page.finalCopy}</p>
              </div>
              <Link className="button button-primary vertical-primary" onClick={() => trackBooking("final_cta")} to={fitCheckPath}>
                {page.finalCta}<ArrowRight size={18} />
              </Link>
            </motion.div>
          </section>
        </main>
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
  const fitCheckPath = `${OFFER_CONFIG.routes.start}?vertical=${encodeURIComponent(page.slug)}`;
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
        <a href="#vertical-problem">Problems</a>
        <a href="#vertical-capabilities">Capabilities</a>
        <a href="#vertical-how-it-works">How It Works</a>
      </nav>
      <Link className="button button-primary vertical-header-cta" onClick={onBookingClick} to={fitCheckPath}>{page.primaryCta}</Link>
    </header>
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
