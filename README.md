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
- `/onboarding` short Quick Start client onboarding form
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
personalized audit popup submits to `/api/audit-request` and sends a Resend
email notification server-side.

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

Public frontend/build variables:

```env
VITE_SITE_URL=
VITE_CALENDAR_URL=
VITE_STRIPE_CHECKOUT_URL=
VITE_SUPPORT_EMAIL=
VITE_REVENUE_AUDIT_URL=
```

Private Cloudflare Pages Function variables for personalized audit requests:

```env
RESEND_API_KEY=
AUDIT_NOTIFICATION_TO=backendbrilliance@gmail.com
AUDIT_NOTIFICATION_FROM=
```

Private Cloudflare Pages Function variables for onboarding storage and
notifications:

```env
GOOGLE_SHEETS_WEBHOOK_URL=
GOOGLE_SHEETS_WEBHOOK_SECRET=
ONBOARDING_NOTIFICATION_TO=backendbrilliance@gmail.com
ONBOARDING_NOTIFICATION_FROM=
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

The browser submits this canonical top-level payload:

```json
{
  "businessName": "",
  "contactName": "",
  "email": "",
  "phone": "",
  "currentWebsite": "",
  "services": "",
  "serviceArea": "",
  "primaryGoal": "",
  "preferredContactMethod": "",
  "brandAssetsLink": "",
  "additionalNotes": "",
  "source": "Backend Brilliance Onboarding"
}
```

See [docs/google-sheets-apps-script.md](docs/google-sheets-apps-script.md).

## Email notification

Personalized audit requests use the Resend API from the Cloudflare Pages
Function at `/api/audit-request`. Configure these private server-side variables:

```env
RESEND_API_KEY=
AUDIT_NOTIFICATION_TO=backendbrilliance@gmail.com
AUDIT_NOTIFICATION_FROM=
```

`AUDIT_NOTIFICATION_FROM` must be a sender address allowed by the configured
Resend account. For production, verify the sending domain in Resend and use an
address on that domain. For temporary Resend testing, use a sender allowed by
your Resend account, such as the Resend-provided testing sender if available.

The onboarding internal notification is sent only after the Google Sheets
webhook confirms the row was saved. It uses the same Resend API key with these
onboarding-specific variables:

```env
RESEND_API_KEY=
ONBOARDING_NOTIFICATION_TO=backendbrilliance@gmail.com
ONBOARDING_NOTIFICATION_FROM=
```

Expected production value:

```env
ONBOARDING_NOTIFICATION_FROM=Backend Brilliance <onboarding@resend.dev>
```

Use a sender address allowed by the configured Resend account.

Personalized audit requests are sent to:

```txt
backendbrilliance@gmail.com
```

Audit requests are not marked successful in the browser unless the Resend API
accepts the email request. If onboarding Google Sheets succeeds and onboarding
email fails, the onboarding submission is still treated as successful and the
email failure is logged server-side.

Audit requests do not currently use backup storage. The existing Google Sheets
Apps Script is shaped for onboarding rows; if backup storage is needed later,
create a distinct audit-request sheet/webhook payload with submission type
`personalized_audit_request` so audit fields are not mixed into onboarding rows.

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

Do not report Stripe, Google Sheets, or email as fully verified until real
credentials are configured and a real test succeeds.
