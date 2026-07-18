import { OFFER_CONFIG } from "./offers";

export const LINKS = {
  booking: OFFER_CONFIG.external.calendarUrl,
  revenueAudit: OFFER_CONFIG.external.revenueAuditUrl,
  stripeCheckout: OFFER_CONFIG.external.stripeCheckoutUrl,
  supportEmail: `mailto:${OFFER_CONFIG.site.supportEmail}`,
};
