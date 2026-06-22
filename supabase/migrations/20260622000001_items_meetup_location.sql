-- Meet-up location for listings with deal_meetup enabled.
-- Sourced from the Nominatim/OpenStreetMap search on the sell page.
-- numeric(9,6) gives ~0.11m precision and covers the full lat/lng range.
alter table public.items
  add column meetup_location text,
  add column meetup_lat numeric(9, 6),
  add column meetup_lng numeric(9, 6);
