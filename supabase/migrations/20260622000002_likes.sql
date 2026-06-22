-- likes: a user's favourited items. Composite PK prevents duplicate likes.
create table public.likes (
  user_id    uuid not null references public.profiles (id) on delete cascade,
  item_id    uuid not null references public.items (id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, item_id)
);

create index on public.likes (item_id);

-- RLS (rls_auto_enable() event trigger enables RLS on table creation)
-- public read so anyone can see like counts; users manage only their own likes
create policy "likes_select_public"
  on public.likes for select
  using (true);

create policy "likes_insert_owner"
  on public.likes for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "likes_delete_owner"
  on public.likes for delete
  using (user_id = auth.uid());
