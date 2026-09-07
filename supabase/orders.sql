-- INFINITVOID orders table. Run this once in the Supabase SQL editor,
-- alongside schema.sql, before enabling checkout.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text not null unique,
  email text not null,
  size text not null,
  amount_total integer not null, -- cents
  currency text not null default 'eur',
  status text not null default 'paid',
  shipping_address jsonb,
  created_at timestamptz not null default now()
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);

alter table public.orders enable row level security;

-- No policies are created for the anon or authenticated roles, so all
-- access is denied by default once RLS is enabled. Orders are only ever
-- written and read using the service-role key from server-side code
-- (the checkout confirmation route and the admin dashboard), which
-- bypasses RLS entirely and must never be exposed to the browser.
