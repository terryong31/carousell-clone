-- Full-text search over title + description.
-- Generated tsvector column keeps the index in sync automatically; queried from
-- PostgREST via .textSearch('search_vector', q, { type: 'websearch' }).
alter table public.items
  add column search_vector tsvector
  generated always as (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, ''))
  ) stored;

create index items_search_idx on public.items using gin (search_vector);
