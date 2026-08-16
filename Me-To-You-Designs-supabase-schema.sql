-- ME TO YOU DESIGNS • SUPABASE SHOP FOUNDATION
-- Run this in Supabase SQL Editor.
-- IMPORTANT: use only your publishable/anon key in the browser. Never expose service_role.

create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  short_description text,
  description text,
  price numeric(10,2) not null default 0,
  compare_at_price numeric(10,2),
  sku text,
  image_url text,
  badge text,
  tags text[] not null default '{}',
  options jsonb not null default '{}'::jsonb,
  is_best_seller boolean not null default false,
  active boolean not null default true,
  instant_download boolean not null default false,
  seo_title text,
  seo_description text,
  seo_keywords text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products(category_id);
create index if not exists products_active_idx on public.products(active);
create index if not exists products_best_seller_idx on public.products(is_best_seller);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.site_settings enable row level security;

-- CUSTOMER WEBSITE: public visitors can read active catalogue items/categories.
drop policy if exists "Public can read active categories" on public.categories;
create policy "Public can read active categories"
on public.categories for select to anon, authenticated
using (active = true);

drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products"
on public.products for select to anon, authenticated
using (active = true);

-- ADMIN: restrict writes to the store owner's email.
-- This avoids putting a service_role key in the HTML.
drop policy if exists "Owner can manage categories" on public.categories;
create policy "Owner can manage categories"
on public.categories for all to authenticated
using ((select auth.jwt()->>'email') = 'metoyoudesigns@outlook.com')
with check ((select auth.jwt()->>'email') = 'metoyoudesigns@outlook.com');

drop policy if exists "Owner can manage products" on public.products;
create policy "Owner can manage products"
on public.products for all to authenticated
using ((select auth.jwt()->>'email') = 'metoyoudesigns@outlook.com')
with check ((select auth.jwt()->>'email') = 'metoyoudesigns@outlook.com');

drop policy if exists "Owner can manage settings" on public.site_settings;
create policy "Owner can manage settings"
on public.site_settings for all to authenticated
using ((select auth.jwt()->>'email') = 'metoyoudesigns@outlook.com')
with check ((select auth.jwt()->>'email') = 'metoyoudesigns@outlook.com');

-- OPTIONAL IMAGE STORAGE:
-- Create a bucket named "product-images" in Supabase Storage.
-- Make it public if customer product images should be served directly.
-- Then add these policies for the owner to upload/update/delete.
drop policy if exists "Owner uploads product images" on storage.objects;
create policy "Owner uploads product images"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'product-images'
  and (select auth.jwt()->>'email') = 'metoyoudesigns@outlook.com'
);

drop policy if exists "Owner updates product images" on storage.objects;
create policy "Owner updates product images"
on storage.objects for update to authenticated
using (
  bucket_id = 'product-images'
  and (select auth.jwt()->>'email') = 'metoyoudesigns@outlook.com'
)
with check (
  bucket_id = 'product-images'
  and (select auth.jwt()->>'email') = 'metoyoudesigns@outlook.com'
);

drop policy if exists "Owner deletes product images" on storage.objects;
create policy "Owner deletes product images"
on storage.objects for delete to authenticated
using (
  bucket_id = 'product-images'
  and (select auth.jwt()->>'email') = 'metoyoudesigns@outlook.com'
);

-- If the bucket is public, public visitors can read the images through their public URLs.
-- Do not put a service_role key in the admin HTML.
