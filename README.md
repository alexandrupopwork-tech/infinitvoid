# INFINITVOID

Cut-and-sew gym streetwear. Limited drops, no restocks. This repo is the
production landing site: waitlist capture, animated intro sequence, product
showcase, and a password-protected admin dashboard.

## Stack

- [Next.js 15](https://nextjs.org) (App Router) + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for UI motion, including the DOM-based star field
- [Supabase](https://supabase.com) for the waitlist and orders tables
- [Resend](https://resend.com) for waitlist and order confirmation emails
- [Stripe Checkout](https://stripe.com) for payments
- Deploys to [Vercel](https://vercel.com)

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in real values, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example` for the full list. You need:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — from your Supabase project
- `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` — protect `/admin`
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL` — send the waitlist confirmation email; omit both and the app still works, it just skips sending
- `NEXT_PUBLIC_SITE_URL` — used in metadata, OpenGraph, and the sitemap
- `NEXT_PUBLIC_LAUNCH_DATE` — optional, ISO 8601 timestamp for the countdown
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — from your Stripe dashboard, see below
- `NEXT_PUBLIC_CHECKOUT_ENABLED` — the buy button on the product section stays hidden until this is `"true"`

## Database

Run `supabase/schema.sql` in your Supabase project's SQL editor. It creates
the `waitlist` table and a Row Level Security policy that only allows
inserts from the public (anon) key — nobody can read the list back except
through the service-role key used by `/admin`.

Also run `supabase/orders.sql` before enabling checkout — it creates the
`orders` table that Stripe payments get recorded into. Without it, payments
still go through fine (Stripe is always the source of truth), but the order
won't show up in `/admin` until the table exists.

## Waitlist confirmation email

When someone joins the waitlist, `/api/waitlist` sends a "Welcome to the
void" confirmation email via Resend after the row is saved — a failed or
unconfigured email never blocks the signup itself. To enable it:

1. Create a free account at [resend.com](https://resend.com).
2. **Domains** → add your domain and add the DNS records it gives you (this
   proves to email providers that you're allowed to send as you). Until
   that's verified, you can test with the shared `onboarding@resend.dev`
   address instead of `RESEND_FROM_EMAIL`.
3. **API Keys** → create a key, set it as `RESEND_API_KEY`.
4. Set `RESEND_FROM_EMAIL` to an address on your verified domain (e.g.
   `hello@your-domain.com`).

## Checkout

Checkout is built on Stripe's hosted Checkout page (redirect-based, not an
embedded card form) — no card data ever touches this codebase, and no
third-party script loads on our own pages. To enable it:

1. Create a free account at [stripe.com](https://stripe.com) — no business
   verification needed to use test-mode keys.
2. **Developers → API keys** → copy the publishable and secret keys into
   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`. Use the
   `pk_test_`/`sk_test_` pair while testing; swap in the live pair
   (`pk_live_`/`sk_live_`) only once Stripe has verified the account and
   you're ready to accept real payments.
3. Run `supabase/orders.sql` (see Database, above).
4. Set `NEXT_PUBLIC_CHECKOUT_ENABLED=true` once you actually want the buy
   button visible to real visitors — until then it stays hidden even
   though the flow underneath is fully functional.
5. Test with Stripe's test card `4242 4242 4242 4242`, any future
   expiry date, any 3-digit CVC, any postal code.

Price, sizes, and shipping all live in `PRODUCT`/`SHIPPING` in
`lib/config.ts`. `/api/checkout` creates the Checkout Session;
`/checkout/success` verifies payment, records the order, and sends the
confirmation email; `/checkout/cancel` is a friendly dead end if someone
backs out. `/api/webhooks/stripe` is an optional, more robust path for
production (see the comment at the top of that file for how to wire it up)
— not required for checkout to work today.

## Admin dashboard

`/admin` is gated by `ADMIN_PASSWORD`. Once signed in you get the waitlist
(subscriber count, newest-first list, CSV export, delete per row) and, once
`supabase/orders.sql` has been run, an orders list below it. The session is
a signed, httpOnly cookie valid for 8 hours.

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```
