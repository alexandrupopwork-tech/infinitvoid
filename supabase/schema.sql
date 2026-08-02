-- INFINITVOID waitlist table + Row Level Security policy.
-- Run this once in the Supabase SQL editor for your project.

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Case-insensitive uniqueness so "A@b.com" and "a@b.com" can't both join.
create unique index if not exists waitlist_email_lower_idx
  on public.waitlist (lower(email));

alter table public.waitlist enable row level security;

-- Anyone (the anon key) may insert a new row...
drop policy if exists "Public can join waitlist" on public.waitlist;
create policy "Public can join waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);

-- ...but nobody using the anon key can read, update, or delete rows back.
-- No select/update/delete policy is created for the anon role, so those
-- operations are denied by default once RLS is enabled. The admin
-- dashboard reads and deletes using the service role key instead, which
-- bypasses RLS entirely and must never be exposed to the browser.
