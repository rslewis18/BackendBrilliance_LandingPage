# Stripe Checkout Setup

Backend Brilliance may use hosted Stripe Checkout or Payment Links after a
prospect has completed a conversation, proposal review, or approved payment
path.

The main public website should not force every visitor into one standardized
product checkout. Use the Stripe link only for an agreed solution.

## Payment Link

Create the appropriate Stripe Payment Link or invoice for the approved Backend
Brilliance solution inside Stripe, then send that hosted Stripe URL directly to
the customer after discovery.

Do not hard-code product-specific checkout links in frontend source. The public
website should route prospects to a conversation first, not one universal
checkout page.

## Success URL

Configure Stripe to redirect successful checkout to:

```txt
https://YOUR-DOMAIN.com/thank-you
```

If the production domain is `https://backendbrilliance.com`, use:

```txt
https://backendbrilliance.com/thank-you
```

If useful, Stripe can append a `service` or `offer` query parameter so the
universal onboarding page can preselect the selected solution.

## Cancellation URL

Configure Stripe cancellation to return to:

```txt
https://YOUR-DOMAIN.com/start?checkout=cancelled
```

If the production domain is `https://backendbrilliance.com`, use:

```txt
https://backendbrilliance.com/start?checkout=cancelled
```

The `/thank-you` page uses safe language and does not treat route access alone
as webhook-verified proof of payment.
