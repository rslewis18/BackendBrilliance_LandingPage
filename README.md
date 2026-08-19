# Backend Brilliance Website

Production-ready Vite, React, TypeScript, Tailwind CSS, Framer Motion, and
Lucide site for Backend Brilliance.

The site now supports:

- Public homepage with consultative growth-system positioning
- On-page personalized growth review request popup
- `/start` payment/proposal handoff path for approved solutions
- `/api/audit-request` email notification endpoint
- Post-sale Stripe Payment Link or invoice flow for approved solutions
- `/thank-you` next-step page after payment or approval
- `/onboarding` reusable multi-service business intake form
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

Editable offer, policy, route, Stripe, calendar, support, and site URL
configuration lives in:

```txt
src/config/offers.ts
```

Legacy CTA aliases are kept in:

```txt
src/config/links.ts
```

The homepage CTAs and `/start` handoff page both read from centralized
configuration.

The personalized growth review popup submits to `/api/audit-request` and sends
a Resend email notification server-side. `VITE_REVENUE_AUDIT_URL` remains
available for legacy Typeform links if needed, but it is not the primary public
CTA.

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
VITE_SUPPORT_EMAIL=
VITE_REVENUE_AUDIT_URL=
```

Private Cloudflare Pages Function variables for personalized growth review
requests:

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

Use hosted Stripe Checkout / Payment Links after discovery. Do not build a
custom payment form and do not expose one universal public checkout link on the
main website.

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

The browser submits a service-neutral, top-level business-intake payload. Core
fields include:

```txt
selectedService
customService
businessName
contactName
email
phone
servicePurchased
businessWebsite
businessAddress
serviceArea
industry
primaryGoals
currentSetup
systemsInvolved
preferredContactMethod
serviceSpecificDetails
serviceSpecificData
```

Service-specific answers are collected conditionally for AI Receptionist, AI
Legal Intake System, Lead Follow-Up Automation, Website Conversion System,
Local Visibility / SEO, Review Growth, Customer Reactivation, Lead Generation,
Content Creation System, Paid Advertising, Property Marketing, Business Process
Automation, and Other / Custom Solution.

See [docs/google-sheets-apps-script.md](docs/google-sheets-apps-script.md).

## Email notification

Personalized growth review requests use the Resend API from the Cloudflare Pages
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

Personalized growth review requests are sent to:

```txt
backendbrilliance@gmail.com
```

Growth review requests are not marked successful in the browser unless the Resend API
accepts the email request. If onboarding Google Sheets succeeds and onboarding
email fails, the onboarding submission is still treated as successful and the
email failure is logged server-side.

Growth review requests do not currently use backup storage. The existing Google Sheets
Apps Script is shaped for onboarding rows; if backup storage is needed later,
create a distinct growth-review sheet/webhook payload with submission type
`personalized_growth_review_request` so review-request fields are not mixed into onboarding rows.

## Notes before launch

Before production launch:

1. Confirm the Cal.com URL.
2. Configure Google Sheets Apps Script and test a real submission.
3. Configure email notification credentials and test delivery for both
   `/api/audit-request` and `/api/onboarding`.
4. Configure each custom Stripe Payment Link or invoice to redirect successful
   customers to `/thank-you`.
5. Confirm Preview and Production environment variables in Cloudflare Pages.
6. Run `npm run lint` and `npm run build`.

Do not report Stripe, Google Sheets, or email as fully verified until real
credentials are configured and a real test succeeds.
