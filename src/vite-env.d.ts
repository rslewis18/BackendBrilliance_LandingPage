/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_CALENDAR_URL?: string;
  readonly VITE_STRIPE_CHECKOUT_URL?: string;
  readonly VITE_SUPPORT_EMAIL?: string;
  readonly VITE_REVENUE_AUDIT_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
