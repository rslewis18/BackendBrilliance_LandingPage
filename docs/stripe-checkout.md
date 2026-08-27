# Stripe Payment Link Setup

The Home Services funnel sends prospects through the short `/start` fit check
before showing the AI Lead Booking Agent offer. Only the qualified result exposes
the hosted Stripe Payment Link.

## Payment Link

Create the AI Lead Booking Agent Payment Link in Stripe with:

- AI Lead Booking Agent: `$2,450/month`
- Implementation & Customization: `$950` one-time
- Due at checkout: `$3,400`
- Ongoing: `$2,450/month`

Set the public Payment Link URL in the build environment:

```env
VITE_STRIPE_PAYMENT_LINK=https://buy.stripe.com/YOUR_REAL_PAYMENT_LINK
```

Do not place Stripe secret keys in any `VITE_` variable. The browser receives
only the hosted payment URL.

## Success URL

Configure Stripe to redirect successful checkout to:

```txt
https://YOUR-DOMAIN.com/thank-you
```

The `/thank-you` page offers self-service setup or an implementation interview
with Chloe. It includes a notice that the route itself does not independently
verify payment; true payment verification still belongs in Stripe or a
server-side webhook if one is added later.

## Cancellation URL

Configure Stripe cancellation to return to:

```txt
https://YOUR-DOMAIN.com/home-services
```
