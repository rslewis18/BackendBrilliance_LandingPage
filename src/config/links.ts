import { OFFER_CONFIG } from "./offers";

const supportEmail = OFFER_CONFIG.site.supportEmail.trim();
const supportEmailHref = supportEmail.startsWith("mailto:")
  ? supportEmail
  : `mailto:${supportEmail}`;

export const LINKS = {
  booking: OFFER_CONFIG.external.calendarUrl,
  implementationBooking: OFFER_CONFIG.external.implementationCalendarUrl,
  revenueAudit: OFFER_CONFIG.external.revenueAuditUrl,
  stripePayment: OFFER_CONFIG.external.stripePaymentUrl,
  vslVideos: OFFER_CONFIG.external.vslUrls,
  supportEmail: supportEmailHref,
};
