export type OfferKey =
  | "websiteConversion"
  | "clientCapture"
  | "completeLocalGrowth";

export type OfferCtaBehavior = "stripe" | "calendar";

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
const stripeCheckoutUrl =
  import.meta.env.VITE_STRIPE_CHECKOUT_URL || "https://buy.stripe.com/3cI8wOeJd5XdexF7gA8AE01";
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
    stripeCheckoutUrl,
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
    selectedOffer: "Website Conversion System",
    billingNote:
      "Website Conversion System is a recurring monthly subscription.",
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
      price: "$297",
      priceQualifier: "/month",
      setupFee: "Setup confirmed before work begins",
      shortDescription:
        "A website and automated response foundation that helps turn visitors into leads.",
      positioning:
        "A website, chatbot, scheduling, and follow-up foundation that helps local businesses turn more visitors into leads.",
      ctaLabel: "Start My Project",
      ctaBehavior: "stripe",
      features: [
        "A website built to turn visitors into leads",
        "An AI chatbot that answers questions and encourages bookings",
        "Simple forms and scheduling that make it easy to take action",
        "Automated follow-up so interested leads don't go cold",
      ],
    },
    clientCapture: {
      key: "clientCapture",
      name: "Client Capture System",
      price: "$499",
      priceQualifier: "/month",
      setupFee: "One-time setup from $750",
      shortDescription:
        "A more complete system for managing leads, bookings, follow-up, and reviews.",
      positioning:
        "Everything in Website Conversion System, plus a more complete lead-management, booking, CRM, review, and customer follow-up system.",
      ctaLabel: "Book a Strategy Call",
      ctaBehavior: "calendar",
      features: [
        "Everything in Website Conversion System",
        "A clearer dashboard for tracking leads and booked jobs",
        "Stronger booking and customer follow-up systems",
        "Review requests that help build trust",
        "Missed-call and lead-response improvements",
        "A smoother path from inquiry to booked appointment",
      ],
    },
    completeLocalGrowth: {
      key: "completeLocalGrowth",
      name: "Complete Local Growth System",
      price: "$699",
      priceQualifier: "/month",
      setupFee: "One-time setup from $750",
      shortDescription:
        "The full system for visibility, capture, follow-up, reviews, and monthly growth.",
      positioning:
        "Everything in Client Capture System, plus ongoing local visibility, campaigns, optimization, and growth strategy.",
      ctaLabel: "Book a Strategy Call",
      ctaBehavior: "calendar",
      popular: true,
      features: [
        "Everything in Client Capture System",
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
        title: "Start Your Project",
        copy: "Complete secure hosted checkout through Stripe.",
      },
      {
        title: "Complete Onboarding",
        copy: "Tell us about your business, services, branding, current website, and goals.",
      },
      {
        title: "We Build the Foundation",
        copy: "Backend Brilliance prepares the website, chatbot, forms, scheduling, and follow-up flow.",
      },
      {
        title: "Launch and Improve",
        copy: "The system goes live and can be improved as your business grows.",
      },
    ],
    faqs: [
      {
        question: "What happens after I subscribe?",
        answer:
          "You will be sent to the onboarding questionnaire so Backend Brilliance can collect the information needed to begin your Website Conversion System project.",
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
          "Yes. The Website Conversion System includes simple scheduling or existing booking-link integration so customers can take action more easily.",
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
        question: "Does this replace the Client Capture System?",
        answer:
          "No. The Website Conversion System provides the foundation. The Client Capture System adds a more complete lead-management, booking, CRM, review, and customer follow-up system.",
      },
      {
        question: "Can I upgrade to the Client Capture System later?",
        answer:
          "Yes. If you need deeper lead management, review requests, missed-call improvements, or a more complete customer follow-up system, those can be discussed on a strategy call.",
      },
      {
        question: "How does cancellation work?",
        answer:
          "Plans are month-to-month unless a separate written agreement says otherwise. You can request cancellation before the next billing cycle.",
      },
    ],
  },
};

export const getOfferCtaUrl = (offer: Offer) =>
  offer.ctaBehavior === "stripe"
    ? OFFER_CONFIG.external.stripeCheckoutUrl
    : OFFER_CONFIG.external.calendarUrl;
