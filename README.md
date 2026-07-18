# Backend Brilliance Website

Production-ready Vite, React, TypeScript, Tailwind CSS, Framer Motion, and
Lucide site for Backend Brilliance.

The site now supports:

- Public homepage and three-offer pricing ladder
- On-page personalized audit request popup
- Personalized `/start` path for prospects who received an audit
- `/api/audit-request` email notification endpoint
- Hosted Stripe Checkout handoff for Website Conversion System
- `/thank-you` checkout next-step page
- `/onboarding` multi-step client onboarding form
- `/onboarding-success` confirmation page
- Cloudflare Pages Functions submission endpoint

## Local setup

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Verification

```bash
npm run lint
npm run build
```

The production build is written to:

```txt
dist
```

## Central configuration

Editable offer, pricing, policy, route, Stripe, calendar, support, and site URL
configuration lives in:

```txt
src/config/offers.ts
```

Legacy CTA aliases are kept in:

```txt
src/config/links.ts
```

The homepage pricing cards and `/start` page both read from the same offer
configuration.

The Revenue Leak Audit CTA still uses `VITE_REVENUE_AUDIT_URL`. The
personalized audit popup submits to `/api/audit-request` and sends an email
notification server-side.

## Routes

- `/`
- `/start`
- `/thank-you`
- `/onboarding`
- `/onboarding-success`

The following private/conversion pages are noindexed by route-level metadata:

- `/start`
- `/thank-you`
- `/onboarding`
- `/onboarding-success`

## Cloudflare Pages

Use these settings:

- Framework preset: **Vite**
- Install command: `npm install`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version environment variable: `NODE_VERSION=22`

SPA routing is handled by:

```txt
public/_redirects
```

with:

```txt
/* /index.html 200
```

See [docs/cloudflare-pages.md](docs/cloudflare-pages.md).

## Environment variables

Copy `.env.example` to `.env.local` for local values.

Public frontend variables:

```env
VITE_SITE_URL=
VITE_CALENDAR_URL=
VITE_STRIPE_CHECKOUT_URL=
VITE_SUPPORT_EMAIL=
VITE_REVENUE_AUDIT_URL=
```

Private Cloudflare Pages Function variables:

```env
GOOGLE_SHEETS_WEBHOOK_URL=
GOOGLE_SHEETS_WEBHOOK_SECRET=
EMAIL_PROVIDER_API_KEY=
EMAIL_NOTIFICATION_TO=
EMAIL_FROM=
TURNSTILE_SECRET_KEY=
TURNSTILE_ENABLED=false
```

Only `VITE_` variables are exposed to frontend browser code.

## Stripe Checkout

Use hosted Stripe Checkout / Payment Links. Do not build a custom payment form.

Website Conversion System checkout URL is configured through:

```env
VITE_STRIPE_CHECKOUT_URL=
```

Stripe success URL:

```txt
https://YOUR-DOMAIN.com/thank-you
```

Stripe cancellation URL:

```txt
https://YOUR-DOMAIN.com/start?checkout=cancelled
```

See [docs/stripe-checkout.md](docs/stripe-checkout.md).

## Google Sheets onboarding storage

The onboarding form posts to:

```txt
/api/onboarding
```

The Cloudflare Pages Function saves through a server-side Google Apps Script
webhook. The browser never receives the webhook URL or secret.

See [docs/google-sheets-apps-script.md](docs/google-sheets-apps-script.md).

## Email notification

The notification service is modular and Cloudflare-compatible. The current
implementation supports Resend-style API delivery when these are configured:

```env
EMAIL_PROVIDER_API_KEY=
EMAIL_NOTIFICATION_TO=
EMAIL_FROM=
```

Personalized audit requests are sent to:

```txt
backendbrilliance@gmail.com
```

If Google Sheets succeeds and email fails, the submission is still treated as
successful and the email failure is logged server-side.

## Notes before launch

Before production launch:

1. Replace the Stripe checkout placeholder with the real Payment Link.
2. Confirm the Cal.com URL.
3. Configure Google Sheets Apps Script and test a real submission.
4. Configure email notification credentials and test delivery for both
   `/api/audit-request` and `/api/onboarding`.
5. Configure Stripe success/cancellation URLs.
6. Confirm Preview and Production environment variables in Cloudflare Pages.
7. Run `npm run lint` and `npm run build`.

Do not report Stripe, Google Sheets, email, or Turnstile as fully verified until
real credentials are configured and a real test succeeds.
