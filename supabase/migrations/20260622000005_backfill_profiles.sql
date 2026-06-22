-- Backfill profiles for any auth.users created before the handle_new_user
-- trigger existed. Without a profiles row, items.seller_id (FK -> profiles.id)
-- rejects every listing the user tries to create.
--
-- Mirrors handle_new_user(): username from the email local-part plus a short
-- random suffix to avoid collisions. Idempotent via the NOT EXISTS guard.
insert into public.profiles (id, username, display_name)
select
  u.id,
  split_part(u.email, '@', 1) || '_' || substr(md5(random()::text), 1, 4),
  u.raw_user_meta_data ->> 'display_name'
from auth.users u
where not exists (
  select 1 from public.profiles p where p.id = u.id
);
