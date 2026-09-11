-- Adds shipment tracking to the orders table. Run this once in the
-- Supabase SQL editor, after orders.sql has already been run.

alter table public.orders
  add column if not exists tracking_number text,
  add column if not exists tracking_url text,
  add column if not exists shipped_at timestamptz;
