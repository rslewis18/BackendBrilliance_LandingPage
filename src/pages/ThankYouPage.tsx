import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, CalendarDays, CheckCircle2 } from "lucide-react";
import { PageMeta } from "../components/PageMeta";
import { SimpleHeader } from "../components/SimpleHeader";
import { LINKS } from "../config/links";
import { OFFER_CONFIG } from "../config/offers";
import { trackEvent } from "../utils/tracking";

const progressSteps = [
  "Next Step Confirmed",
  "Business Intake",
  "Setup",
  "Review",
  "Launch",
];

const nextSteps = [
  {
    title: "Complete onboarding",
    copy: "Tell us about your business, goals, and the service or solution we're setting up.",
  },
  {
    title: "We review everything",
    copy: "Backend Brilliance reviews the information and determines what is needed for implementation.",
  },
  {
    title: "Setup begins",
    copy: "We begin implementation and reach out if additional information, access, or clarification is required.",
  },
];

export function ThankYouPage() {
  const [searchParams] = useSearchParams();
  const service = searchParams.get("service") || searchParams.get("offer");
  const onboardingPath = service
    ? `${OFFER_CONFIG.routes.onboarding}?service=${encodeURIComponent(service)}`
    : OFFER_CONFIG.routes.onboarding;

  return (
    <>
      <PageMeta
        title="Next Step Confirmed | Backend Brilliance"
        description="Start your Backend Brilliance business intake."
        path={OFFER_CONFIG.routes.thankYou}
        noindex
      />
      <SimpleHeader />

      <main className="flow-page confirmation-page">
        <section className="confirmation-card post-purchase-card section-shell">
          <p className="eyebrow">Next step confirmed</p>
          <h1>You&apos;re in. Let&apos;s get your system set up.</h1>
          <p className="hero-lead">
            The next step is to tell us a little about your business, goals,
            and the service or solution we&apos;re setting up so we can begin
            preparing implementation.
          </p>

          <ol className="checkout-progress" aria-label="Setup progress">
            {progressSteps.map((step, index) => (
              <li
                className={index === 0 ? "is-complete" : index === 1 ? "is-next" : ""}
                key={step}
              >
                <span>{index === 0 ? <CheckCircle2 size={16} /> : index + 1}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>

          <div className="intake-next-action">
            <div>
              <strong>Step 1 — Complete onboarding</strong>
              <p>
                Tell us about your business, goals, and the service or solution
                we&apos;re setting up.
              </p>
            </div>
            <Link
              className="button button-primary"
              onClick={() => trackEvent("onboarding_cta_click", { location: "thank_you" })}
              to={onboardingPath}
            >
              Complete Your Onboarding
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="post-purchase-section">
            <h2>Here&apos;s What Happens Next</h2>
            <div className="post-purchase-steps">
              {nextSteps.map((step, index) => (
                <article className="post-purchase-step" key={step.title}>
                  <span>{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="support-strip">
            <span>Have a question before you start?</span>
            <a
              className="button button-secondary"
              href={LINKS.booking}
              onClick={() => trackEvent("booking_click", { location: "thank_you_support" })}
              rel="noopener noreferrer"
              target="_blank"
            >
              <CalendarDays size={18} />
              Book a Quick Call
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
