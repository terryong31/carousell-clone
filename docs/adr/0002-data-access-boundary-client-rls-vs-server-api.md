---
status: "accepted"
date: 2026-06-23
decision-makers: [Terry Ong]
consulted: []
informed: []
---

# Data-access boundary: client + RLS by default, server/api only when justified

## Context and Problem Statement

The app talks to Supabase from two places: the browser (`useSupabaseClient()`
inside composables) and Nitro server routes (`server/api/*` via
`serverSupabaseClient`). Without a written rule, this drifts — during debugging
we seriously considered "route every mutation through `server/api`", which would
have added a backend layer that Supabase's Row Level Security (RLS) already makes
unnecessary.

Where should a given read or write live — directly against Supabase from the
client (secured by RLS), or behind a `server/api` route?

## Decision Drivers

* **Security boundary** — RLS enforces per-row access at the database for *every*
  client, including the public anon key; it is the security layer, not an
  afterthought.
* **Least code / idiomatic Supabase** — direct client calls with RLS are the
  officially recommended pattern; a server route per query is boilerplate.
* **Secret protection** — service-role keys and third-party API credentials must
  never reach the browser bundle.
* **Bypassability** — some logic (privileged mutations, cross-table invariants)
  must not be expressible by a hostile client regardless of RLS.
* **Query shaping** — some reads need server-only tuning (full-text config,
  joins, a stable filtered contract) rather than exposing raw PostgREST shape.
* **SSR/ISR hydration** — client reads via `useAsyncData` still execute on the
  server during render, so "client" does not mean "no SSR" (see ADR-0001).

## Considered Options

* **Option 1 — Everything client + RLS** (no `server/api` at all)
* **Option 2 — Everything through `server/api` except auth** (a backend tier in
  front of Supabase)
* **Option 3 — Client + RLS by default, `server/api` only for specific cases**

## Decision Outcome

Chosen option: **Option 3**. Normal user CRUD goes directly to Supabase from the
client and is secured by RLS. A `server/api` route is introduced **only** when a
request hits one of these triggers:

1. **Privileged / admin work that must bypass RLS** — service-role operations,
   moderation, backfills, cron. (Backfills are migrations; runtime admin work is
   a server route.)
2. **Secrets or third-party calls** — anything needing a server-only key or
   credential: the Nominatim geocode proxy, payments, email, inbound webhooks.
3. **Logic that must not be bypassable**, or multi-table atomic operations that
   RLS alone cannot express.
4. **Query tuning / hiding shape** — server-tuned reads such as full-text search.
5. **Server-only or SSR-critical data** that should never round-trip the client.

Two standing exceptions to "client":

* **Auth/login** stays client-side — `@nuxtjs/supabase` owns the session and SSR
  cookies.
* **File uploads** always go client-direct to Storage (RLS- or signed-URL
  -protected); binary bytes are never proxied through `server/api`.

### Current conformance

| Concern | Location | Justification |
| --- | --- | --- |
| Create/read/update listings (`useItems`) | client + RLS | normal CRUD |
| Like / unlike (`useLikes`) | client + RLS | normal CRUD |
| Profile read/update (`useProfile`) | client + RLS | normal CRUD |
| Auth (`useAuth`) | client | login exception |
| Image upload (`createItem`) | client → Storage | upload exception |
| Geocode (`server/api/geocode`) | server/api | trigger #2 (3rd-party + UA policy) |
| Full-text search (`server/api/search`) | server/api | trigger #4 (query tuning) |
| Profile backfill | migration | trigger #1 (admin, bypasses RLS) |

### Consequences

* Good, because the default path is the least code and leans on RLS, which is
  already the enforced security boundary.
* Good, because the bundle never ships privileged keys — those live only in
  routes that genuinely need them.
* Good, because `server/api` stays small and each route has a clear reason to
  exist, instead of mirroring the whole schema.
* Bad, because correctness now depends on RLS policies being right; a missing or
  wrong policy is a real vulnerability (mitigated by RLS being enabled on every
  table — see ADR on the RLS auto-enable trigger).
* Neutral, because every new read/write requires a conscious classification, and
  every new `server/api` route must cite which trigger justifies it.

### Confirmation

* Every file in `server/api/` MUST open with a one-line comment naming the
  ADR-0002 trigger that justifies it. A route with no justification fails review
  and should move to a client composable.
* Code review checks that new mutations default to a client composable + RLS
  unless a trigger applies, and that no service-role/third-party secret is
  imported into `app/`.
* `server/CLAUDE.md` references this ADR so agent-authored routes follow it.

## Pros and Cons of the Options

### Option 1 — Everything client + RLS

* Good, because it is the simplest and most idiomatic Supabase setup.
* Bad, because there is nowhere to safely use a service-role key or a 3rd-party
  secret (geocode, payments, webhooks) — these genuinely need a server.
* Bad, because full-text/query tuning leaks PostgREST query shape to the client.

### Option 2 — Everything through server/api except auth

* Good, because it gives a single choke point for validation, logging, limits.
* Good, because it hides all query shape.
* Bad, because it re-implements, in Nitro, the authorization RLS already does —
  more code, more surface, and `serverSupabaseClient` *still* runs under RLS, so
  it does not even remove that dependency.
* Bad, because it tempts proxying file uploads through the server, which is
  wasteful and slower.
* Bad, because it loses Supabase ergonomics (realtime, typed queries, storage)
  for no security gain.

### Option 3 — Client + RLS by default, server/api when justified (chosen)

* Good, because each concern lands where it belongs: RLS for access control,
  server routes for secrets/tuning/privilege.
* Good, because `server/api` stays auditable — few routes, each justified.
* Neutral, because it requires the discipline to classify each new endpoint.
* Bad, because the boundary is a judgment call at the margins (e.g. search could
  arguably be client-side); the trigger list exists to make that call explicit.

## More Information

* Builds on ADR-0001: client reads use `useAsyncData` + `useSupabaseClient()`,
  which still hydrate from the SSR/ISR payload.
* Supersedes an earlier informal lean toward routing all writes through
  `server/api` ("Hybrid"); that is explicitly **not** adopted — normal writes
  stay client + RLS.
* Revisit if/when payments, messaging, or moderation land — those will add
  server routes under triggers #1–#3, not change the default.
* References:
  * Supabase — Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
  * `@nuxtjs/supabase` — server-side `serverSupabaseClient` / `serverSupabaseServiceRole`: https://supabase.nuxtjs.org/services/serverSupabaseClient
