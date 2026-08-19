export type OfferKey =
  | "websiteConversion"
  | "clientCapture"
  | "completeLocalGrowth";

export type OfferCtaBehavior = "calendar";

export type Offer = {
  key: OfferKey;
  name: string;
  price: string;
  priceQualifier: string;
  setupFee: string;
  shortDescription: string;
  positioning: string;
  features: string[];
  ctaLabel: string;
  ctaBehavior: OfferCtaBehavior;
  popular?: boolean;
};

const siteUrl = import.meta.env.VITE_SITE_URL || "https://backendbrilliance.com";
const calendarUrl =
  import.meta.env.VITE_CALENDAR_URL || "https://cal.com/backendbrilliance/15min";
const supportEmail =
  import.meta.env.VITE_SUPPORT_EMAIL || "backendbrilliance@gmail.com";
const revenueAuditUrl =
  import.meta.env.VITE_REVENUE_AUDIT_URL || "https://form.typeform.com/to/bpgvWxsk";

export const OFFER_CONFIG = {
  site: {
    name: "Backend Brilliance",
    siteUrl,
    supportEmail,
  },
  external: {
    calendarUrl,
    revenueAuditUrl,
  },
  routes: {
    home: "/",
    start: "/start",
    thankYou: "/thank-you",
    onboarding: "/onboarding",
    onboardingSuccess: "/onboarding-success",
  },
  policies: {
    selectedOffer: "Backend Brilliance Solution",
    billingNote:
      "Backend Brilliance solutions may be one-time, monthly, or proposal-based depending on scope.",
    setupFeeLanguage:
      "Any one-time setup fee, if applicable, will be confirmed before work begins.",
    cancellation:
      "Plans are month-to-month unless a separate written agreement says otherwise. You can request cancellation before the next billing cycle.",
    thirdPartyCosts:
      "Third-party subscriptions, domain fees, premium plugins, text-message usage, email usage, AI usage, booking-platform fees, and platform costs are not included unless specifically confirmed in writing.",
    responseTime:
      "Backend Brilliance typically responds within 1-2 business days.",
    typicalBuildTimeline:
      "Most initial website, chatbot, scheduling, and follow-up foundations are prepared within 7-14 business days after onboarding details and assets are received.",
    ongoingEditsScope:
      "Ongoing website edits cover reasonable content, copy, image, and page updates within the agreed website scope. New complex functionality or major rebuilds may require a separate quote.",
  },
  offers: {
    websiteConversion: {
      key: "websiteConversion",
      name: "Website Conversion System",
      price: "Proposal",
      priceQualifier: "confirmed before work begins",
      setupFee: "Scope and setup confirmed before work begins",
      shortDescription:
        "A website and automated response foundation that helps turn visitors into leads.",
      positioning:
        "A website, chatbot, scheduling, and follow-up foundation that helps local businesses turn more visitors into leads.",
      ctaLabel: "Find the Right Solution",
      ctaBehavior: "calendar",
      features: [
        "A website built to turn visitors into leads",
        "An AI chatbot that answers questions and encourages bookings",
        "Simple forms and scheduling that make it easy to take action",
        "Automated follow-up so interested leads don't go cold",
      ],
    },
    clientCapture: {
      key: "clientCapture",
      name: "Client Capture & Follow-Up System",
      price: "Custom",
      priceQualifier: "based on scope",
      setupFee: "Scope confirmed before work begins",
      shortDescription:
        "A more complete system for managing leads, bookings, follow-up, and reviews.",
      positioning:
        "A more complete lead-management, booking, CRM, review, and customer follow-up system.",
      ctaLabel: "Find the Right Solution",
      ctaBehavior: "calendar",
      features: [
        "Lead capture and follow-up workflow",
        "A clearer dashboard for tracking leads and booked jobs",
        "Stronger booking and customer follow-up systems",
        "Review requests that help build trust",
        "Missed-call and lead-response improvements",
        "A smoother path from inquiry to booked appointment",
      ],
    },
    completeLocalGrowth: {
      key: "completeLocalGrowth",
      name: "Complete Growth & Automation System",
      price: "Custom",
      priceQualifier: "based on scope",
      setupFee: "Scope confirmed before work begins",
      shortDescription:
        "The full system for visibility, capture, follow-up, reviews, and monthly growth.",
      positioning:
        "A broader growth and automation system with visibility, campaigns, follow-up, optimization, and strategy.",
      ctaLabel: "Find the Right Solution",
      ctaBehavior: "calendar",
      popular: true,
      features: [
        "Growth bottleneck review and implementation roadmap",
        "Local visibility and Google Business Profile support",
        "Campaigns that promote services and seasonal offers",
        "Monthly optimization based on performance",
        "Growth recommendations for what to improve next",
        "Priority support as your system expands",
      ],
    },
  } satisfies Record<OfferKey, Offer>,
  pricingOrder: [
    "websiteConversion",
    "clientCapture",
    "completeLocalGrowth",
  ] satisfies OfferKey[],
  websiteConversionDetails: {
    included: [
      {
        title: "A website built to turn visitors into leads",
        copy: "Your website explains what you do, builds trust quickly, and guides visitors toward the next step.",
      },
      {
        title: "An AI chatbot that encourages bookings",
        copy: "Visitors can ask questions, get guidance, and move closer to booking even when you are busy.",
      },
      {
        title: "Simple forms and scheduling",
        copy: "Customers can request help, share details, or schedule a time without unnecessary friction.",
      },
      {
        title: "Automated follow-up",
        copy: "Interested leads receive follow-up so fewer opportunities disappear after the first visit.",
      },
    ],
    howItWorks: [
      {
        title: "Start your project",
        copy: "Confirm the recommended solution, proposal, or invoice path.",
      },
      {
        title: "Tell us about your business",
        copy: "Complete the onboarding form with your website, services, branding, and goals.",
      },
      {
        title: "We build your system",
        copy: "We create or improve the website, chatbot, lead capture, scheduling, and follow-up foundation.",
      },
      {
        title: "Review and launch",
        copy: "We confirm the setup with you and prepare it for launch.",
      },
    ],
    faqs: [
      {
        question: "What happens after the solution is approved?",
        answer:
          "You will be sent to the onboarding questionnaire so Backend Brilliance can collect the information needed to begin your setup.",
      },
      {
        question: "How long does the initial setup take?",
        answer:
          "Most initial website, chatbot, scheduling, and follow-up foundations are prepared within 7-14 business days after onboarding details and assets are received.",
      },
      {
        question: "Can you improve my current website?",
        answer:
          "Yes. We can improve an existing website or recommend a rebuild if that is the cleaner path.",
      },
      {
        question: "Can I keep my existing domain?",
        answer:
          "Yes. In most cases, your existing domain can stay in place while the website setup is improved.",
      },
      {
        question: "Can you work with my current hosting provider?",
        answer:
          "Yes. The implementation platform may vary based on your current setup and business needs.",
      },
      {
        question: "Will I have to move my website?",
        answer:
          "Not necessarily. Onboarding helps us determine whether to improve your current platform, rebuild on the existing platform, or recommend another setup.",
      },
      {
        question: "Can you connect my current booking platform?",
        answer:
          "Yes. When scheduling or booking is part of the recommended solution, Backend Brilliance can work with existing booking links or recommend a cleaner path.",
      },
      {
        question: "What happens to leads after they reach out?",
        answer:
          "The system is designed to capture the inquiry and support simple automated follow-up so interested leads don't go cold.",
      },
      {
        question: "Are third-party software or platform fees included?",
        answer:
          "No. Third-party subscriptions, domain fees, premium plugins, text-message usage, email usage, AI usage, booking-platform fees, and platform costs are not included unless specifically confirmed in writing.",
      },
      {
        question: "Does this replace a growth review?",
        answer:
          "No. A growth review helps identify which system makes the most sense before scope is confirmed.",
      },
      {
        question: "Can the system expand later?",
        answer:
          "Yes. Many clients start with the most urgent bottleneck, then expand into follow-up, reviews, visibility, reactivation, or automation later.",
      },
      {
        question: "How does cancellation work?",
        answer:
          "Plans are month-to-month unless a separate written agreement says otherwise. You can request cancellation before the next billing cycle.",
      },
    ],
  },
};

export const getOfferCtaUrl = (_offer: Offer) => OFFER_CONFIG.external.calendarUrl;
