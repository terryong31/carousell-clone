-- categories: 3-level reference table for product category hierarchy
-- slug is the PK and what gets stored in items.category
-- FK on items.category is added in the next migration after seed data is present
create table public.categories (
  slug        text primary key,
  label       text not null,
  parent_slug text references public.categories(slug),
  sort_order  int  default 0
);

-- reference data is read-only; RLS auto-enabled by rls_auto_enable() event trigger
create policy "categories_select_public"
  on public.categories for select
  using (true);
