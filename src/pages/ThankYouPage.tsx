import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, ClipboardList } from "lucide-react";
import { PageMeta } from "../components/PageMeta";
import { SimpleHeader } from "../components/SimpleHeader";
import { LINKS } from "../config/links";
import { OFFER_CONFIG } from "../config/offers";
import { trackEvent } from "../utils/tracking";

type ThankYouPath = "getFound" | "aiFrontDesk" | "completeGrowth";

function pathFromParam(value: string | null): ThankYouPath {
  const normalized = (value || "").toLowerCase().replace(/[^a-z0-9]/g, "");

  if (
    normalized.includes("complete") ||
    normalized.includes("growthsystem")
  ) {
    return "completeGrowth";
  }

  if (
    normalized.includes("frontdesk") ||
    normalized.includes("leadbooking") ||
    normalized.includes("bookingagent") ||
    normalized.includes("receptionist") ||
    normalized.includes("ai")
  ) {
    return "aiFrontDesk";
  }

  return "getFound";
}

const pathContent: Record<
  ThankYouPath,
  {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    heading: string;
    lead: string;
    formService: string;
    formCardCopy: string;
    steps: { number: string; title: string; copy: string }[];
    note?: string;
  }
> = {
  getFound: {
    metaTitle: "Google Visibility Build — Next Steps | Backend Brilliance",
    metaDescription:
      "Next steps for your Backend Brilliance Google Visibility Build.",
    eyebrow: "Get Found — Google Visibility Build",
    heading: "You're in — let's get you found on Google",
    lead: "Your Google Visibility Build starts with one short form. Tell us about your business, and we build your Google listing out properly — categories, services, photos, hours, and a review flow — so customers in your area actually find you.",
    formService: "Get Found — Google Visibility Build",
    formCardCopy:
      "Complete the short info form online — business details, services, hours, and photos if you have them. It takes a few minutes, and it's everything we need to start your build.",
    steps: [
      {
        number: "1",
        title: "Complete the info form",
        copy: "A few minutes of business basics — that's all we need from you to start.",
      },
      {
        number: "2",
        title: "We build your listing",
        copy: "Your build is live within 7 business days of us receiving your info.",
      },
      {
        number: "3",
        title: "Walkthrough together",
        copy: "When it's done, Ryan walks you through your new listing live and shows you what changed.",
      },
    ],
    note: "One honest note: Google decides rankings, and nobody can promise a specific spot. What this build guarantees is a complete, accurate listing that stops being the reason customers skip you.",
  },
  aiFrontDesk: {
    metaTitle: "AI Front Desk — Next Steps | Backend Brilliance",
    metaDescription: "Next steps for your Backend Brilliance AI Front Desk.",
    eyebrow: "AI Front Desk",
    heading: "You're in — let's set up your AI Front Desk",
    lead: "Your AI Front Desk setup starts with one short form. Tell us how your calls and leads work today, and we configure your front desk around your business — you approve everything before it goes live.",
    formService: "AI Front Desk",
    formCardCopy:
      "Complete the setup form online — business hours, services, booking rules, and how you want calls handled. That's the information we need to begin configuring your AI Front Desk.",
    steps: [
      {
        number: "1",
        title: "Complete the setup form",
        copy: "How your business takes calls, books jobs, and follows up today.",
      },
      {
        number: "2",
        title: "Configure and test",
        copy: "We set up your front desk and test conversations, booking, and routing.",
      },
      {
        number: "3",
        title: "Approve",
        copy: "You review the configured experience before anything goes live.",
      },
      {
        number: "4",
        title: "Launch",
        copy: "Your AI Front Desk goes live and starts answering for you.",
      },
    ],
  },
  completeGrowth: {
    metaTitle:
      "Complete Customer Growth System — Next Steps | Backend Brilliance",
    metaDescription:
      "Next steps for your Backend Brilliance Complete Customer Growth System.",
    eyebrow: "Complete Customer Growth System",
    heading: "You're in — let's build your growth system",
    lead: "Your Complete Customer Growth System starts with one short form. Tell us about your business, and we build the whole system — get found on Google, answer every opportunity with your AI Front Desk, and follow up until it books.",
    formService: "Complete Customer Growth System",
    formCardCopy:
      "Complete the setup form online — business details, services, hours, and how your calls and leads work today. That's everything we need to start building your system.",
    steps: [
      {
        number: "1",
        title: "Complete the setup form",
        copy: "Your business basics plus how calls and leads are handled today.",
      },
      {
        number: "2",
        title: "We build the system",
        copy: "Your Google listing, AI Front Desk, and follow-up automation, built together.",
      },
      {
        number: "3",
        title: "Approve",
        copy: "You review everything before it goes live — nothing launches unapproved.",
      },
      {
        number: "4",
        title: "Launch and walkthrough",
        copy: "Ryan walks you through the live system and your first reports.",
      },
    ],
    note: "One honest note: Google decides rankings, and nobody can promise a specific spot. What this system guarantees is a complete, accurate listing and a front desk that never lets an opportunity sit unanswered.",
  },
};

export function ThankYouPage() {
  const [searchParams] = useSearchParams();
  const path = pathFromParam(
    searchParams.get("service") || searchParams.get("offer"),
  );
  const content = pathContent[path];

  return (
    <>
      <PageMeta
        title={content.metaTitle}
        description={content.metaDescription}
        path={OFFER_CONFIG.routes.thankYou}
        noindex
      />
      <SimpleHeader />

      <main className="flow-page confirmation-page setup-choice-page">
        <section className="confirmation-card post-purchase-card section-shell">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>Welcome to Backend Brilliance.</h1>
          <h2 className="reserved-heading">{content.heading}</h2>
          <p className="hero-lead">{content.lead}</p>
          <div className="payment-safety-note" role="note">
            <CheckCircle2 size={19} />
            <span>This page does not independently verify payment. Continue only if you reached it after completing checkout or were sent here by Backend Brilliance.</span>
          </div>

          <div className="setup-choice-grid" aria-label="Start your setup">
            <article className="setup-choice-card is-primary">
              <span className="setup-choice-number">Next step</span>
              <ClipboardList size={30} />
              <h2>Complete Your Info Form</h2>
              <p>{content.formCardCopy}</p>
              <Link
                className="button button-primary"
                onClick={() => trackEvent("onboarding_cta_click", { location: "thank_you_self_service" })}
                to={`${OFFER_CONFIG.routes.onboarding}?service=${encodeURIComponent(content.formService)}`}
              >
                Start My Form <ArrowRight size={18} />
              </Link>
            </article>
          </div>

          <div className="setup-flow-strip" aria-label="What happens next">
            {content.steps.map((step) => (
              <article key={step.title}>
                <span><b>{step.number}</b>{step.title}</span>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>

          {content.note && (
            <p className="setup-support-line">{content.note}</p>
          )}

          <p className="setup-support-line">Need help with your next step? <a href={LINKS.supportEmail}>{OFFER_CONFIG.site.supportEmail}</a></p>
        </section>
      </main>
    </>
  );
}
