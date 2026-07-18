# Stripe Checkout Setup

The Website Conversion System uses hosted Stripe Checkout through a Stripe
Payment Link.

## Payment Link

Create a Stripe Payment Link for:

- Product: Website Conversion System
- Price: $297/month recurring

Copy the hosted payment-link URL into:

```env
VITE_STRIPE_CHECKOUT_URL=
```

or into `src/config/offers.ts` as the default fallback value.

## Success URL

Configure Stripe to redirect successful checkout to:

```txt
https://YOUR-DOMAIN.com/thank-you
```

If the production domain is `https://backendbrilliance.com`, use:

```txt
https://backendbrilliance.com/thank-you
```

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
