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
VITE_SUPPORT_EMAIL=
VITE_REVENUE_AUDIT_URL=
```

Set private variables for the personalized growth review request notification:

```env
RESEND_API_KEY=
AUDIT_NOTIFICATION_TO=backendbrilliance@gmail.com
AUDIT_NOTIFICATION_FROM=
```

`AUDIT_NOTIFICATION_FROM` must be a sender address allowed by the configured
Resend account. Use a verified sending domain for production.

Set private variables for onboarding storage and notifications:

```env
GOOGLE_SHEETS_WEBHOOK_URL=
GOOGLE_SHEETS_WEBHOOK_SECRET=
ONBOARDING_NOTIFICATION_TO=backendbrilliance@gmail.com
ONBOARDING_NOTIFICATION_FROM=
```

Expected production value:

```env
ONBOARDING_NOTIFICATION_FROM=Backend Brilliance <onboarding@resend.dev>
```

Only variables beginning with `VITE_` are available to browser code. Keep
Resend and Google Sheets secrets in Cloudflare Pages environment variables only.

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

It forwards the service-neutral business intake to the Google Sheets Apps Script
webhook as top-level JSON properties. The Apps Script should map these core
property names:

```txt
selectedService
servicePurchased
customService
businessName
contactName
email
phone
businessWebsite
businessAddress
serviceArea
industry
primaryGoals
primaryGoalOther
currentSetup
serviceSpecificDetails
serviceSpecificData
systemsInvolved
accessNotes
primaryEmail
primaryPhone
preferredContactMethod
bestContactTime
additionalTeamContact
finalNotes
universalNotes
source
```

The function also sends backward-compatible aliases for the previous quick
intake script, including `currentWebsite`, `services`, `primaryGoal`,
`brandAssetsLink`, and `additionalNotes`.

The personalized growth review request popup posts to:

```txt
/api/audit-request
```

The function is implemented in:

```txt
functions/api/audit-request.ts
```

It sends the notification email server-side through Resend and does not expose
the Resend API key to browser code.
