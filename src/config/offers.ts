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
  import.meta.env.VITE_STRIPE_CHECKOUT_URL || "PASTE_STRIPE_CHECKOUT_URL_HERE";
const supportEmail =
  import.meta.env.VITE_SUPPORT_EMAIL || "support@backendbrilliance.com";
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
      "Most initial website builds or improvements are completed within 7-14 business days after onboarding details and assets are received.",
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
        "A professionally built or improved website designed to turn more visitors into inquiries.",
      positioning:
        "A professionally built or improved website designed to explain the business clearly, establish trust, and turn more visitors into inquiries.",
      ctaLabel: "Start My Project",
      ctaBehavior: "stripe",
      features: [
        "Conversion-focused website build or redesign",
        "Clear service messaging and page structure",
        "Mobile-responsive experience",
        "Lead inquiry or contact forms",
        "Existing booking-link integration",
        "Calls-to-action throughout the website",
        "Basic search and local SEO foundation",
        "Analytics and conversion tracking foundation",
        "Website hosting and platform management",
        "Deployment and technical maintenance",
        "Website maintenance and security updates",
        "Ongoing website content edits",
        "Monthly website performance review",
      ],
    },
    clientCapture: {
      key: "clientCapture",
      name: "Client Capture System",
      price: "$499",
      priceQualifier: "/month",
      setupFee: "One-time setup from $750",
      shortDescription:
        "A connected lead-capture and response system for businesses that need more than a website.",
      positioning:
        "Everything in Website Conversion System plus lead-response, booking, CRM, follow-up, and review workflows selected during strategy and onboarding.",
      ctaLabel: "Book a Strategy Call",
      ctaBehavior: "calendar",
      features: [
        "Everything in Website Conversion System",
        "AI receptionist or automated first-response system",
        "Lead-management dashboard",
        "CRM pipeline setup",
        "Advanced online booking workflow",
        "Automated lead follow-up",
        "Email follow-up sequences",
        "SMS follow-up sequences",
        "Missed-call response workflow",
        "Appointment and customer reminders",
        "Google review-request automation",
        "Lead-source and pipeline tracking",
      ],
    },
    completeLocalGrowth: {
      key: "completeLocalGrowth",
      name: "Complete Local Growth System",
      price: "$699",
      priceQualifier: "/month",
      setupFee: "One-time setup from $750",
      shortDescription:
        "The complete capture, follow-up, visibility, and ongoing growth system.",
      positioning:
        "Everything in Client Capture System plus local visibility, campaigns, optimization, performance analysis, and strategic growth support.",
      ctaLabel: "Book a Strategy Call",
      ctaBehavior: "calendar",
      popular: true,
      features: [
        "Everything in Client Capture System",
        "Local visibility strategy",
        "Google Business Profile content",
        "Local service-area content",
        "Neighborhood or community-focused content",
        "Seasonal campaigns",
        "Local offers and announcements",
        "Monthly conversion optimization",
        "Monthly visibility planning",
        "Performance analysis",
        "Growth recommendations",
        "Priority support",
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
        title: "Conversion-focused website build or redesign",
        copy: "We build or improve the website foundation so visitors understand what you do and how to take the next step.",
      },
      {
        title: "Clear service messaging",
        copy: "Your pages explain services, service areas, and trust factors in plain language.",
      },
      {
        title: "Mobile-responsive experience",
        copy: "Your site is structured for people browsing from phones, tablets, and desktops.",
      },
      {
        title: "Lead inquiry forms",
        copy: "Basic inquiry forms help interested visitors contact your business without friction.",
      },
      {
        title: "Existing booking-link integration",
        copy: "If you already use a booking platform, we can connect your existing booking link into the website flow.",
      },
      {
        title: "Calls-to-action throughout the website",
        copy: "Key pages guide visitors toward calling, requesting service, or booking through your existing process.",
      },
      {
        title: "Basic search and local SEO foundation",
        copy: "We organize core pages and metadata so your site has a cleaner local foundation.",
      },
      {
        title: "Analytics and tracking foundation",
        copy: "Basic performance and conversion tracking can be added so the website is easier to review.",
      },
      {
        title: "Website maintenance",
        copy: "The plan includes ongoing platform support, maintenance, and technical updates within scope.",
      },
      {
        title: "Ongoing website content edits",
        copy: "Reasonable content, copy, image, and page edits are included within the agreed website scope.",
      },
      {
        title: "Monthly website performance review",
        copy: "We review the website foundation monthly and identify practical improvements.",
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
        title: "We Build or Improve Your Website",
        copy: "Backend Brilliance creates the conversion-focused foundation.",
      },
      {
        title: "Launch and Maintain",
        copy: "The website launches and receives ongoing technical support, content updates, and performance review.",
      },
    ],
    faqs: [
      {
        question: "What happens after I subscribe?",
        answer:
          "You will be sent to the onboarding questionnaire so Backend Brilliance can collect the information needed to begin your Website Conversion System project.",
      },
      {
        question: "How long does the initial website build take?",
        answer:
          "Most initial website builds or improvements are completed within 7-14 business days after onboarding details and assets are received.",
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
          "Yes. This package can integrate an existing booking link into the website. Advanced automated booking workflows are part of higher-tier systems.",
      },
      {
        question: "What is included in ongoing website edits?",
        answer:
          "Reasonable content, copy, image, and page edits are included within the agreed website scope. Complex new functionality may require a separate quote.",
      },
      {
        question: "Are third-party software or platform fees included?",
        answer:
          "No. Third-party subscriptions, domain fees, premium plugins, text-message usage, email usage, AI usage, booking-platform fees, and platform costs are not included unless specifically confirmed in writing.",
      },
      {
        question: "Does this package include AI and automated follow-up?",
        answer:
          "The Website Conversion System provides the website foundation. AI reception, CRM pipelines, automated text and email follow-up, review automation, and other advanced workflows are available through the Client Capture System.",
      },
      {
        question: "Can I upgrade to the Client Capture System later?",
        answer:
          "Yes. If you need AI response, CRM pipelines, automated follow-up, or review automation, those can be discussed on a strategy call.",
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
