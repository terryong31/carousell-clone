-- Harden RLS so it no longer depends on an out-of-band object.
--
-- The rls_auto_enable() function ships in the baseline migration, but the
-- EVENT TRIGGER that actually invokes it was only ever created on the hosted
-- database (supabase db pull does not dump event triggers). A database built
-- purely from these migrations would therefore have RLS DISABLED on every
-- table, since nothing fires on CREATE TABLE.
--
-- This migration version-controls the trigger and backfills RLS on the tables
-- that were created before it. Everything here is idempotent, so it is a no-op
-- against the existing hosted database (which already has RLS enabled).

-- 1. Create the event trigger so future CREATE TABLE statements auto-enable RLS.
--    Only create it if no trigger is already bound to rls_auto_enable(), so this
--    never duplicates the trigger that already exists on the hosted database.
do $$
begin
  if not exists (
    select 1
    from pg_event_trigger et
    join pg_proc p on p.oid = et.evtfoid
    where p.proname = 'rls_auto_enable'
  ) then
    create event trigger rls_auto_enable_trigger
      on ddl_command_end
      when tag in ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      execute function public.rls_auto_enable();
  end if;
end
$$;

-- 2. Backfill RLS on tables created before the trigger existed.
alter table if exists public.profiles   enable row level security;
alter table if exists public.items      enable row level security;
alter table if exists public.categories enable row level security;
alter table if exists public.likes      enable row level security;
