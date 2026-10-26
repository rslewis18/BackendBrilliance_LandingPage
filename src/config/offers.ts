export type OfferKey = "getFound" | "aiFrontDesk" | "completeGrowth";

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

const siteUrl = import.meta.env.VITE_SITE_URL || "https://backendbrilliance.co";
const calendarUrl =
  import.meta.env.VITE_CALENDAR_URL || "https://cal.com/backendbrilliance/15min";
const supportEmail =
  import.meta.env.VITE_SUPPORT_EMAIL || "ryan@backendbrilliance.co";
const revenueAuditUrl = import.meta.env.VITE_REVENUE_AUDIT_URL || "";
const stripePaymentUrl = import.meta.env.VITE_STRIPE_PAYMENT_LINK?.trim() || "";
const implementationSchedulingUrl =
  import.meta.env.VITE_IMPLEMENTATION_SCHEDULING_URL?.trim() || "";
const homeServicesVslUrl =
  import.meta.env.VITE_HOME_SERVICES_VSL_URL?.trim() ||
  import.meta.env.VITE_VSL_VIDEO_URL?.trim() ||
  "/demo-video.mp4";
const legalVslUrl = import.meta.env.VITE_LEGAL_VSL_URL?.trim() || "/demo-video.mp4";
const medSpaDentalVslUrl =
  import.meta.env.VITE_MEDSPA_DENTAL_VSL_URL?.trim() || "/demo-video.mp4";

export const OFFER_CONFIG = {
  site: {
    name: "Backend Brilliance",
    siteUrl,
    supportEmail,
  },
  external: {
    calendarUrl,
    revenueAuditUrl,
    stripePaymentUrl,
    implementationSchedulingUrl,
    vslUrls: {
      homeServices: homeServicesVslUrl,
      legal: legalVslUrl,
      medSpaDental: medSpaDentalVslUrl,
    },
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
      "Get Found is a one-time $495 build (optional Keep-It-Fresh Care Plan $249/mo). AI Front Desk is $750 setup + $497/mo. Complete Customer Growth System is $997 setup + $697/mo.",
    setupFeeLanguage:
      "Any one-time setup fee, if applicable, will be confirmed before work begins.",
    cancellation:
      "Plans are month-to-month unless a separate written agreement says otherwise. You can request cancellation before the next billing cycle.",
    thirdPartyCosts:
      "Third-party subscriptions, domain fees, premium plugins, text-message usage, email usage, AI usage, booking-platform fees, and platform costs are not included unless specifically confirmed in writing.",
    responseTime:
      "Backend Brilliance typically responds within 1-2 business days.",
    typicalBuildTimeline:
      "The Google Visibility Build is live within 7 business days after onboarding details are received. AI Front Desk and Complete Growth System timelines are confirmed during setup.",
    ongoingEditsScope:
      "Ongoing website edits cover reasonable content, copy, image, and page updates within the agreed website scope. New complex functionality or major rebuilds may require a separate quote.",
  },
  offers: {
    getFound: {
      key: "getFound",
      name: "Get Found \u2014 Google Visibility Build",
      price: "$495",
      priceQualifier: "one-time",
      setupFee: "No separate setup fee \u2014 the $495 build covers setup",
      shortDescription:
        "A done-for-you Google Business Profile build that helps local shops get found on Google.",
      positioning:
        "The front door: a complete, accurate Google listing \u2014 categories, services, photos, hours, and a review engine \u2014 built for you.",
      ctaLabel: "Book a Conversation",
      ctaBehavior: "calendar",
      features: [
        "Complete Google Business Profile build or cleanup",
        "Categories, services, photos, and hours set correctly",
        "Review request flow so happy customers build your rating",
        "Live within 7 business days of receiving your business info",
        "Optional Keep-It-Fresh Care Plan at $249/mo to keep it current",
      ],
    },
    aiFrontDesk: {
      key: "aiFrontDesk",
      name: "AI Front Desk",
      price: "$497/mo",
      priceQualifier: "per month",
      setupFee: "$750 setup fee",
      shortDescription:
        "An AI front desk that answers, qualifies, and books \u2014 so no call or lead goes unanswered.",
      positioning:
        "AI answering, FAQ handling, lead capture and qualification, booking, transfer and escalation, missed-call text-back, and call summaries.",
      ctaLabel: "Book a Conversation",
      ctaBehavior: "calendar",
      features: [
        "AI answering for calls you can't get to",
        "Lead capture and qualification, day or night",
        "Booking, transfer, and escalation rules you approve",
        "Missed-call text-back so callers don't move on",
        "Call summaries and lead reporting",
      ],
    },
    completeGrowth: {
      key: "completeGrowth",
      name: "Complete Customer Growth System",
      price: "$697/mo",
      priceQualifier: "per month",
      setupFee: "$997 setup fee",
      shortDescription:
        "The full system: get found, answer every opportunity, and follow up until it books.",
      positioning:
        "Get Found plus the AI Front Desk plus follow-up and booking automation, with reporting that shows what's working.",
      ctaLabel: "Book a Conversation",
      ctaBehavior: "calendar",
      popular: true,
      features: [
        "Everything in Get Found and the AI Front Desk",
        "Follow-up and booking automation for every lead",
        "Review growth and customer reactivation",
        "Monthly reporting on calls, leads, and bookings",
        "Priority support as your system expands",
      ],
    },
  } satisfies Record<OfferKey, Offer>,
  pricingOrder: ["getFound", "aiFrontDesk", "completeGrowth"] satisfies OfferKey[],
};

export const getOfferCtaUrl = (_offer: Offer) => OFFER_CONFIG.external.calendarUrl;
