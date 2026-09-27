import { useMemo, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays, Check, CheckCircle2 } from "lucide-react";
import { PageMeta } from "../components/PageMeta";
import { SimpleHeader } from "../components/SimpleHeader";
import { LINKS } from "../config/links";
import { OFFER_CONFIG } from "../config/offers";
import { trackEvent } from "../utils/tracking";

type VerticalKey = "home-services" | "legal" | "medspa-dental";
type FitAnswers = { businessType: string; leadRange: string; handling: string; goals: string[] };
type FitResult = "qualified" | "low-fit" | "complex";

type FitCheckConfig = {
  key: VerticalKey;
  label: string;
  returnPath: string;
  intro: string;
  businessQuestion: string;
  businessOptions: readonly string[];
  volumeQuestion: string;
  handlingQuestion: string;
  handlingOptions: readonly string[];
  priorityQuestion: string;
  priorities: readonly string[];
  lowFitCopy: string;
  complexCopy: string;
  qualifiedCopy: string;
};

const leadRanges = ["Under 20", "20–50", "51–100", "101–250", "250+"] as const;

const fitCheckConfigs: Record<VerticalKey, FitCheckConfig> = {
  "home-services": {
    key: "home-services",
    label: "AI Lead Booking Agent \u00b7 Home Services",
    returnPath: "/home-services",
    intro: "Four quick questions help us confirm whether the standard agent fits your lead, estimate, and service-booking workflow.",
    businessQuestion: "What type of home-service business do you operate?",
    businessOptions: ["HVAC", "Plumbing", "Electrical", "Roofing", "Remodeling", "Restoration", "Tree service", "Junk removal", "Other home service"],
    volumeQuestion: "Approximately how many new leads or homeowner inquiries does your business receive in a typical month?",
    handlingQuestion: "How are new leads and missed calls currently handled?",
    handlingOptions: ["Owner/team responds manually", "Receptionist/front desk", "Appointment setter / inside sales", "Call center", "Marketing or sales agency", "CRM automation", "Other"],
    priorityQuestion: "What would you most like the AI Lead Booking Agent to help with?",
    priorities: ["Faster new-lead response", "Missed-call recovery", "Lead qualification", "Automated follow-up", "Booking estimates/service appointments", "Appointment reminders", "No-show recovery", "Old-lead reactivation"],
    lowFitCopy: "The agent works best for service businesses already generating a steady stream of homeowner inquiries and wanting to convert more of them into estimates, appointments, and booked jobs. It does not generate leads on its own.",
    complexCopy: "Your lead volume may require a customized routing, capacity, calendar, or multi-location implementation beyond the standard setup.",
    qualifiedCopy: "Based on what you've shared, the Brilliance AI Lead Booking Agent may be a strong fit for your lead, estimate, and service-booking process.",
  },
  legal: {
    key: "legal",
    label: "AI Lead Booking Agent \u00b7 Legal",
    returnPath: "/legal",
    intro: "Four quick questions help us confirm whether the standard agent fits your prospective-client intake and consultation workflow.",
    businessQuestion: "What type of consumer-facing law practice do you operate?",
    businessOptions: ["Personal injury", "Workers' compensation", "Criminal defense", "Family law", "Immigration", "Bankruptcy", "Employment law", "Estate planning / probate", "Other consumer law"],
    volumeQuestion: "Approximately how many new prospective-client inquiries does your firm receive in a typical month?",
    handlingQuestion: "How are new inquiries and preliminary intake currently handled?",
    handlingOptions: ["Attorneys respond directly", "Receptionist/front desk", "Internal intake team", "Call center / answering service", "Marketing or intake agency", "CRM/intake automation", "Other"],
    priorityQuestion: "What would you most like the AI Lead Booking Agent to support?",
    priorities: ["Immediate inquiry response", "Missed-call follow-up", "Preliminary intake collection", "Firm-defined screening questions", "Consultation booking", "Confirmations and reminders", "No-show recovery", "Old-inquiry reactivation"],
    lowFitCopy: "The system works best for firms already receiving a steady flow of prospective-client inquiries and wanting more qualified people to reach a scheduled consultation. It does not generate inquiries or determine whether someone has a valid case.",
    complexCopy: "Your inquiry volume may require customized intake routing, screening workflows, practice-area logic, locations, or CRM capacity beyond the standard implementation.",
    qualifiedCopy: "Based on what you've shared, the Brilliance AI Lead Booking Agent may be a strong fit for your firm's preliminary intake, follow-up, and consultation-booking workflow.",
  },
  "medspa-dental": {
    key: "medspa-dental",
    label: "AI Lead Booking Agent \u00b7 Med Spa & Dental",
    returnPath: "/medspa-dental",
    intro: "Four quick questions help us confirm whether the standard agent fits your inquiry, consultation, and appointment-booking workflow.",
    businessQuestion: "What type of consultation-driven business do you operate?",
    businessOptions: ["Med spa", "Cosmetic dentistry", "Implant dentistry", "Orthodontics", "Aesthetic practice", "Wellness clinic", "Other appointment-based business"],
    volumeQuestion: "Approximately how many new prospect or patient inquiries does your business receive in a typical month?",
    handlingQuestion: "How are new inquiries and consultation bookings currently handled?",
    handlingOptions: ["Owner/provider responds", "Front desk / receptionist", "Patient or treatment coordinator", "Appointment setter / inside sales", "Call center", "CRM/booking automation", "Other"],
    priorityQuestion: "What would you most like the AI Lead Booking Agent to help with?",
    priorities: ["Immediate inquiry response", "Missed-call recovery", "Treatment-interest questions", "Lead follow-up", "Consultation booking", "Appointment reminders", "No-show recovery", "Old-lead reactivation"],
    lowFitCopy: "The agent works best for businesses already generating a steady stream of inquiries and wanting to turn more of them into booked consultations and appointments. It does not generate leads or provide medical advice.",
    complexCopy: "Your inquiry volume may require customized location routing, booking capacity, treatment-interest workflows, calendars, or CRM integration beyond the standard setup.",
    qualifiedCopy: "Based on what you've shared, the Brilliance AI Lead Booking Agent may be a strong fit for your inquiry follow-up, consultation, and appointment-booking process.",
  },
};

const initialAnswers: FitAnswers = { businessType: "", leadRange: "", handling: "", goals: [] };

function getVertical(value: string | null): VerticalKey {
  return value === "legal" || value === "medspa-dental" ? value : "home-services";
}

export function StartPage() {
  const [searchParams] = useSearchParams();
  const config = fitCheckConfigs[getVertical(searchParams.get("vertical"))];
  const [answers, setAnswers] = useState(initialAnswers);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<FitResult | null>(null);

  const questions = useMemo(() => [
    { legend: config.businessQuestion, options: config.businessOptions, value: answers.businessType, field: "businessType" as const, multiple: false },
    { legend: config.volumeQuestion, options: leadRanges, value: answers.leadRange, field: "leadRange" as const, multiple: false },
    { legend: config.handlingQuestion, options: config.handlingOptions, value: answers.handling, field: "handling" as const, multiple: false },
    { legend: config.priorityQuestion, options: config.priorities, value: answers.goals, field: "goals" as const, multiple: true },
  ], [answers, config]);

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  const isCurrentAnswered = currentQuestion.multiple ? answers.goals.length > 0 : Boolean(currentQuestion.value);

  const chooseSingle = (field: "businessType" | "leadRange" | "handling", value: string) => {
    setAnswers((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const toggleGoal = (goal: string) => {
    setAnswers((current) => ({
      ...current,
      goals: current.goals.includes(goal) ? current.goals.filter((item) => item !== goal) : [...current.goals, goal],
    }));
    setError("");
  };

  const next = () => {
    if (!isCurrentAnswered) {
      setError(currentQuestion.multiple ? "Select at least one priority." : "Choose one option to continue.");
      return;
    }
    setError("");
    setStep((current) => Math.min(current + 1, questions.length - 1));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (answers.goals.length === 0) {
      setError("Select at least one priority.");
      return;
    }
    const fitResult: FitResult = answers.leadRange === "Under 20" ? "low-fit" : answers.leadRange === "250+" ? "complex" : "qualified";
    setResult(fitResult);
    trackEvent("fit_check_completed", {
      vertical: config.key,
      businessType: answers.businessType,
      leadRange: answers.leadRange,
      handling: answers.handling,
      priorities: answers.goals.join(", "),
      result: fitResult,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restart = () => {
    setAnswers(initialAnswers);
    setStep(0);
    setResult(null);
    setError("");
  };

  return (
    <>
      <PageMeta title={`${config.label} Fit Check | Backend Brilliance`} description={`Complete a short ${config.label} fit check before setting up your AI Lead Booking Agent.`} path={OFFER_CONFIG.routes.start} noindex />
      <SimpleHeader />
      <main className="flow-page fit-check-page">
        {!result ? (
          <section className="fit-check-shell section-shell" aria-labelledby="fit-check-title">
            <div className="fit-check-intro">
              <p className="eyebrow">{config.label} · Two-minute fit check</p>
              <h1 id="fit-check-title">Let&apos;s Make Sure the Agent Fits Your Workflow.</h1>
              <p>{config.intro} This is pre-purchase qualification, not onboarding.</p>
            </div>
            <form className="fit-check-card" onSubmit={submit} noValidate>
              <div className="fit-progress" aria-label={`Question ${step + 1} of ${questions.length}`}>
                <div><span>Question {step + 1} of {questions.length}</span><strong>{Math.round(progress)}%</strong></div>
                <i aria-hidden="true"><b style={{ width: `${progress}%` }} /></i>
              </div>
              <fieldset>
                <legend>{currentQuestion.legend}</legend>
                {currentQuestion.multiple && <p className="fit-hint">Select all that apply.</p>}
                <div className="fit-option-grid">
                  {currentQuestion.options.map((option) => {
                    const checked = currentQuestion.multiple ? answers.goals.includes(option) : currentQuestion.value === option;
                    return (
                      <label className={`fit-option ${checked ? "is-selected" : ""}`} key={option}>
                        <input checked={checked} name={currentQuestion.field} onChange={() => currentQuestion.multiple ? toggleGoal(option) : chooseSingle(currentQuestion.field as "businessType" | "leadRange" | "handling", option)} type={currentQuestion.multiple ? "checkbox" : "radio"} value={option} />
                        <span>{option}</span>{checked && <Check size={17} aria-hidden="true" />}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              {error && <p className="fit-error" role="alert">{error}</p>}
              <div className="fit-actions">
                <button className="button button-secondary" disabled={step === 0} onClick={() => { setStep((current) => Math.max(current - 1, 0)); setError(""); }} type="button"><ArrowLeft size={18} /> Back</button>
                {step < questions.length - 1 ? <button className="button button-primary" onClick={next} type="button">Continue <ArrowRight size={18} /></button> : <button className="button button-primary" type="submit">See My Result <ArrowRight size={18} /></button>}
              </div>
            </form>
            <p className="fit-human-path">Have questions before getting started? <a href={LINKS.booking} target="_blank" rel="noopener noreferrer">Book a call.</a></p>
          </section>
        ) : <FitResultPanel config={config} result={result} onRestart={restart} />}
      </main>
    </>
  );
}

function FitResultPanel({ config, result, onRestart }: { config: FitCheckConfig; result: FitResult; onRestart: () => void }) {
  if (result === "low-fit") {
    return <section className="fit-result-card section-shell"><p className="eyebrow">A better first step</p><h1>Let&apos;s Build More Inquiry Flow First</h1><p className="hero-lead">{config.lowFitCopy}</p><p>Let&apos;s talk about whether a lead-generation or broader conversion plan makes more sense right now.</p><div className="hero-actions"><a className="button button-primary" href={LINKS.booking} target="_blank" rel="noopener noreferrer"><CalendarDays size={18} /> Book a Call</a><button className="button button-secondary" onClick={onRestart} type="button">Review My Answers</button></div></section>;
  }
  if (result === "complex") {
    return <section className="fit-result-card section-shell"><p className="eyebrow">Custom configuration recommended</p><h1>Let&apos;s Talk First</h1><p className="hero-lead">{config.complexCopy}</p><p>We&apos;ll review the workflow before recommending the right configuration.</p><div className="hero-actions"><a className="button button-primary" href={LINKS.booking} target="_blank" rel="noopener noreferrer"><CalendarDays size={18} /> Book a Configuration Call</a><button className="button button-secondary" onClick={onRestart} type="button">Review My Answers</button></div></section>;
  }

  return (
    <section className="fit-result-card qualified-result section-shell">
      <div className="fit-result-heading"><span className="fit-result-icon"><CheckCircle2 size={28} /></span><div><p className="eyebrow">{config.label} · Fit check complete</p><h1>Your Business Looks Like a Fit</h1></div></div>
      <p className="hero-lead">{config.qualifiedCopy}</p>
      <div className="agent-offer-card">
        <div className="agent-offer-main"><p className="eyebrow">AI Lead Booking Agent</p><div className="offer-price-row"><strong>From $1,950</strong><span>/month</span></div><p className="offer-plan-note">Month-to-month. No long-term contract.</p><ul>{["Missed-call text-back within seconds, 24/7", "Lead qualification and calendar booking", "Confirmations, reminders, and no-show recovery", "CRM and calendar updates with live handoff to your team"].map((item) => <li key={item}><Check size={17} /> {item}</li>)}</ul></div>
        <aside className="agent-total-panel"><span>Next step</span><strong>Book a demo</strong><small>15-minute walkthrough — we&apos;ll show it working on your phone.</small><a className="button button-primary" href={LINKS.booking} onClick={() => trackEvent("booking_cta_clicked", { offer: "ai_lead_booking_agent", vertical: config.key })} target="_blank" rel="noopener noreferrer">Book My Demo <ArrowRight size={18} /></a></aside>
      </div>
      <div className="qualified-secondary-row"><button className="text-button" onClick={onRestart} type="button">Review my answers</button><span>Have questions? <a href={LINKS.booking} target="_blank" rel="noopener noreferrer">Book a call.</a></span></div>
      <Link className="fit-return-link" to={config.returnPath}>← Back to {config.label}</Link>
    </section>
  );
}
