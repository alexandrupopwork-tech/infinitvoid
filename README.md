# INFINITVOID

Cut-and-sew gym streetwear. Limited drops, no restocks. This repo is the
production landing site: waitlist capture, animated intro sequence, product
showcase, and a password-protected admin dashboard.

## Stack

- [Next.js 15](https://nextjs.org) (App Router) + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for UI motion
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) for the ambient hero background
- [Supabase](https://supabase.com) for the waitlist table
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
- `NEXT_PUBLIC_SITE_URL` — used in metadata, OpenGraph, and the sitemap
- `NEXT_PUBLIC_LAUNCH_DATE` — optional, ISO 8601 timestamp for the countdown

## Database

Run `supabase/schema.sql` in your Supabase project's SQL editor. It creates
the `waitlist` table and a Row Level Security policy that only allows
inserts from the public (anon) key — nobody can read the list back except
through the service-role key used by `/admin`.

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
