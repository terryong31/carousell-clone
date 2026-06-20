---
status: "accepted"
date: 2026-06-20
decision-makers: [Terry Ong]
consulted: []
informed: []
---

# Per-route rendering strategy for the marketplace

## Context and Problem Statement

The app is a Carousell-style consumer marketplace built on Nuxt 4 + Nitro and
deployed to Vercel. Different pages have sharply different needs: product and
profile pages must be discoverable by search engines and are read far more often
than they change, while listing/search pages are query-driven and the
sell/auth flows are personalized and gated behind login.

What rendering strategy (SSR, CSR/SPA, SSG/prerender, ISR) should each page use
so that we get organic search traffic, fresh content, and a host bill that
scales — without prerendering content that does not exist at build time?

## Decision Drivers

* **SEO / organic discovery** — product, listing, and profile pages are the
  primary acquisition channel; they must ship server-rendered HTML and meta tags.
* **Content freshness** — prices, sold status, and new listings change
  frequently; stale pages mislead buyers.
* **User-generated content at runtime** — listings and profiles are created by
  users after deploy, so they cannot be known at build time.
* **Cost and scalability** — re-rendering hot, rarely-changing pages on every
  request is wasteful; popular pages should be cacheable.
* **No SEO value for gated/personalized pages** — `/sell` and the auth flows are
  behind login and need no server render.
* **Deploy target** — Vercel natively supports Incremental Static Regeneration
  (ISR) via the Nitro preset.

## Considered Options

* **Option 1 — Global SSR** (`ssr: true` everywhere, the framework default)
* **Option 2 — Global CSR / SPA** (`ssr: false` everywhere)
* **Option 3 — Global SSG / prerender**
* **Option 4 — Per-route hybrid** (SSR default + ISR for public cacheable pages +
  CSR for gated pages + prerender for static pages)

## Decision Outcome

Chosen option: **Option 4 — Per-route hybrid**, because it is the only option
that satisfies all decision drivers simultaneously: SEO-rendered HTML where it
drives traffic, edge caching where pages are hot but slow-changing, and cheap
client rendering where SEO is irrelevant. The global default stays `ssr: true`,
so `routeRules` only needs to declare the routes that *differ* from it.

Implemented in [`nuxt.config.ts`](../../nuxt.config.ts):

| Route(s)                         | Strategy            | Rationale                                            |
| -------------------------------- | ------------------- | ---------------------------------------------------- |
| `/about`, `/contact`             | `prerender: true`   | Static content, never changes — build once.          |
| `/`                              | `isr: 60`           | Shows live "Recommended" — short cache stays fresh.  |
| `/p/**`                          | `isr: 3600`         | SEO-critical, high-read, low-change — revalidate 1h. |
| `/u/**`                          | `isr: 3600`         | Public profiles — same profile as product pages.     |
| `/sell`, `/forgot-password`, `/reset-password`, `/confirm` | `ssr: false` | Gated/personalized, zero SEO value. |
| `/shop`, `/search`               | *(no rule)*         | Inherit global `ssr: true` — dynamic query results.  |

### Consequences

* Good, because product/profile/listing pages ship server-rendered HTML and meta
  tags, preserving organic discoverability.
* Good, because ISR serves hot pages from the edge cache at near-static speed
  while still revalidating, cutting server cost as traffic grows.
* Good, because gated pages skip SSR entirely, reducing server work and avoiding
  rendering a session we do not need on the server.
* Bad, because ISR-cached HTML is shared across all visitors — per-user content
  (e.g. "you liked this") **must** be fetched on the client, or it will leak one
  user's state into the shared cache.
* Bad, because caching behavior differs between `nuxt dev` (always SSR, no cache)
  and Vercel, so cache effects can only be verified on a deployed build.
* Neutral, because every new route now requires a conscious decision about its
  rendering mode (or it silently inherits the SSR default).

### Confirmation

* Code review of the `routeRules` block in `nuxt.config.ts`; `eslint` passes.
* On a deployed build, confirm `/p/**` and `/u/**` responses carry Vercel cache
  headers (`x-vercel-cache: HIT`, an `age` header) and that gated pages return a
  client-only shell.

## Pros and Cons of the Options

### Option 1 — Global SSR

* Good, because every page is SEO-friendly and always fresh.
* Good, because it is the simplest mental model — one mode, no per-route config.
* Bad, because every request re-renders on the server, including pages that
  rarely change — higher latency and cost at scale.
* Bad, because it wastes server rendering on gated pages that gain nothing from it.

### Option 2 — Global CSR / SPA

* Good, because it is the cheapest to host (static shell + client fetch).
* Good, because it suits app-like, gated screens.
* Bad, because product/listing pages ship an empty shell — poor SEO and slow
  first paint, which directly undercuts a marketplace's core acquisition channel.
* Bad, because social/link previews have no server-rendered meta tags.

### Option 3 — Global SSG / prerender

* Good, because fully static pages are the fastest and cheapest to serve.
* Bad, because user-generated products and profiles do not exist at build time
  and therefore cannot be prerendered.
* Bad, because prices and inventory go stale until the next rebuild, and
  rebuilding on every listing change is infeasible.
* Neutral, because it remains ideal for the few genuinely static pages
  (`/about`, `/contact`) — which is why the hybrid still uses it there.

### Option 4 — Per-route hybrid (chosen)

* Good, because each route gets the right trade-off instead of one compromise.
* Good, because ISR delivers static-like speed *and* SEO for product pages while
  still revalidating against the source of truth.
* Neutral, because it requires per-route configuration and the discipline to
  classify new routes.
* Bad, because it carries more cognitive overhead than a single global mode and
  introduces the shared-cache and dev/prod-parity caveats noted above.

## More Information

* Future enhancement: replace TTL-based ISR on `/p/**` with **on-demand
  revalidation** so a product's cache is busted the moment its price/status
  changes, rather than waiting up to an hour. Add as a follow-up ADR when the
  products backend exists.
* Related decision (to be recorded): the data layer uses `useAsyncData` +
  `useSupabaseClient()` for server data rather than Pinia, which complements the
  SSR/ISR strategy by hydrating from the server payload.
* References:
  * Nuxt — Hybrid Rendering & `routeRules`: https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering
  * Nitro — Cache & route rules (`isr`, `swr`, `prerender`): https://nitro.build/guide/cache
  * Vercel — Incremental Static Regeneration: https://vercel.com/docs/incremental-static-regeneration
