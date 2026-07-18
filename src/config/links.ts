import { OFFER_CONFIG } from "./offers";

const supportEmail = OFFER_CONFIG.site.supportEmail.trim();
const supportEmailHref = supportEmail.startsWith("mailto:")
  ? supportEmail
  : `mailto:${supportEmail}`;

export const LINKS = {
  booking: OFFER_CONFIG.external.calendarUrl,
  revenueAudit: OFFER_CONFIG.external.revenueAuditUrl,
  stripeCheckout: OFFER_CONFIG.external.stripeCheckoutUrl,
  supportEmail: supportEmailHref,
};
