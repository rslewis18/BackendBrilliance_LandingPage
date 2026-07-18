# Cloudflare Pages Configuration

Backend Brilliance is a Vite React app with Cloudflare Pages Functions.

## Build Settings

- Framework preset: Vite
- Install command: `npm install`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `NODE_VERSION=22`

## SPA Routing

`public/_redirects` handles direct refreshes for React Router pages:

```txt
/* /index.html 200
```

Confirm these routes load directly after deployment:

- `/`
- `/start`
- `/thank-you`
- `/onboarding`
- `/onboarding-success`

## Preview and Production Environment Variables

Set public Vite variables for the frontend:

```env
VITE_SITE_URL=
VITE_CALENDAR_URL=
VITE_STRIPE_CHECKOUT_URL=
VITE_SUPPORT_EMAIL=
VITE_REVENUE_AUDIT_URL=
```

Set private variables for Pages Functions:

```env
GOOGLE_SHEETS_WEBHOOK_URL=
GOOGLE_SHEETS_WEBHOOK_SECRET=
EMAIL_PROVIDER_API_KEY=
EMAIL_NOTIFICATION_TO=
EMAIL_FROM=
TURNSTILE_SECRET_KEY=
TURNSTILE_ENABLED=false
```

Only variables beginning with `VITE_` are available to browser code. Keep
Google Sheets, email-provider, and Turnstile secrets in Cloudflare Pages
environment variables only.

## Functions

The onboarding form posts to:

```txt
/api/onboarding
```

The function is implemented in:

```txt
functions/api/onboarding.ts
```

It does not use filesystem writes and does not store submissions locally.
