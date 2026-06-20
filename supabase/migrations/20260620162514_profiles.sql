-- profiles table: FK anchor for all user-related tables
create table public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  username      text unique not null,
  display_name  text,
  avatar_url    text,
  bio           text,
  rating        numeric(3,2) default 0,
  review_count  int default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- auto-update updated_at on every row update
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger on_profile_updated
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

-- create a profile row automatically when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    split_part(new.email, '@', 1) || '_' || substr(md5(random()::text), 1, 4),
    new.raw_user_meta_data->>'display_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- RLS policies (rls_auto_enable() event trigger enables RLS on table creation)
create policy "profiles_select_public"
  on public.profiles
  for select
  using (true);

create policy "profiles_update_owner"
  on public.profiles
  for update
  using (auth.uid() = id);

create policy "profiles_delete_owner"
  on public.profiles
  for delete
  using (auth.uid() = id);
