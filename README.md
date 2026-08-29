# INFINITVOID

Cut-and-sew gym streetwear. Limited drops, no restocks. This repo is the
production landing site: waitlist capture, animated intro sequence, product
showcase, and a password-protected admin dashboard.

## Stack

- [Next.js 15](https://nextjs.org) (App Router) + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for UI motion, including the DOM-based star field
- [Supabase](https://supabase.com) for the waitlist table
- [Resend](https://resend.com) for the waitlist confirmation email
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

## Database

Run `supabase/schema.sql` in your Supabase project's SQL editor. It creates
the `waitlist` table and a Row Level Security policy that only allows
inserts from the public (anon) key — nobody can read the list back except
through the service-role key used by `/admin`.

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

## Admin dashboard

`/admin` is gated by `ADMIN_PASSWORD`. Once signed in you get the total
subscriber count, a newest-first list, a CSV export, and a delete action per
row. The session is a signed, httpOnly cookie valid for 8 hours.

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```
