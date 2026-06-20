-- items table: product listings, FK anchored to profiles
create table public.items (
  id                  uuid primary key default gen_random_uuid(),
  seller_id           uuid not null references public.profiles (id) on delete cascade,
  -- slug default is overwritten by the on_item_inserted trigger; gen_random_uuid()::text
  -- makes the column optional in the TypeScript Insert type while ensuring uniqueness
  slug                text unique not null default gen_random_uuid()::text,
  title               text not null,
  description         text,
  price               numeric(10,2) not null,
  condition           text check (condition in ('new','like_new','good','fair','poor')),
  category            text not null,
  brand               text,
  size                text,
  images              text[] not null default '{}',
  free_shipping       boolean default false,
  accept_offer        boolean default false,
  buyer_protection    boolean default true,
  deal_west_malaysia  boolean default false,
  deal_east_malaysia  boolean default false,
  deal_meetup         boolean default false,
  status              text default 'active' check (status in ('active','sold','reserved','deleted')),
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

-- derive slug as {title-kebab}-{last-12-hex-of-uuid}, e.g. uniqlo-selvedge-jeans-ef1234567890
create or replace function public.handle_item_slug()
returns trigger language plpgsql as $$
begin
  new.slug =
    trim(both '-' from
      regexp_replace(
        regexp_replace(lower(new.title), '[^a-z0-9]+', '-', 'g'),
        '-+', '-', 'g'
      )
    )
    || '-'
    || substr(new.id::text, 25, 12);
  return new;
end;
$$;

create trigger on_item_inserted
  before insert on public.items
  for each row
  execute function public.handle_item_slug();

-- reuse handle_updated_at() defined in the profiles migration
create trigger on_item_updated
  before update on public.items
  for each row
  execute function public.handle_updated_at();

-- indexes for common query patterns
create index on public.items (seller_id);
create index on public.items (category);
create index on public.items (status);

-- RLS (rls_auto_enable() event trigger enables RLS on table creation)
-- anon sees only active listings; owner sees all their own statuses
create policy "items_select_public"
  on public.items for select
  using (status = 'active' or seller_id = auth.uid());

create policy "items_insert_auth"
  on public.items for insert
  to authenticated
  with check (seller_id = auth.uid());

create policy "items_update_owner"
  on public.items for update
  using (seller_id = auth.uid());

create policy "items_delete_owner"
  on public.items for delete
  using (seller_id = auth.uid());

-- storage: public bucket for item images, scoped uploads by uid folder prefix
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'item-images',
  'item-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict do nothing;

create policy "item_images_select_public"
  on storage.objects for select
  using (bucket_id = 'item-images');

create policy "item_images_insert_owner"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'item-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "item_images_update_owner"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'item-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "item_images_delete_owner"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'item-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
