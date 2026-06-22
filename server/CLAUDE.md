# Backend Development Guidelines (server/)

This directory houses the Nitro backend APIs, server routes, and middleware.

> [!IMPORTANT]
> **When does a `server/api` route belong here at all?** See
> [ADR-0002](../docs/adr/0002-data-access-boundary-client-rls-vs-server-api.md).
> Default to client-side Supabase + RLS for normal CRUD. Add a route **only** for:
> (1) privileged/admin ops that bypass RLS, (2) secrets / third-party calls,
> (3) non-bypassable or multi-table logic, (4) query tuning / hiding shape,
> (5) server-only data. Every route file MUST open with a comment naming its
> trigger (e.g. `// ADR-0002 trigger #2 (third-party call): …`). Never proxy file
> uploads through a route.

## API & Server Route Development

1. **Nitro Event Handlers**:
   - Write API routes inside `server/api/` matching resource locations.
   - Use `defineEventHandler` for all server endpoints:
     ```typescript
     export default defineEventHandler(async (event) => {
       // logic here
     })
     ```

2. **Validation**:
   - Validate incoming query params and request body payloads using Zod or built-in Nuxt methods (e.g. `readBody`, `getQuery`).
   - Throw structured error responses using `createError` helper:
     ```typescript
     throw createError({
       statusCode: 400,
       statusMessage: 'Invalid input parameters'
     })
     ```

3. **Database Access (Supabase)**:
   - Use Supabase Server Client (`serverSupabaseClient(event)`) for all database operations inside event handlers.
   - Ensure you use type definitions from `app/types/database.types.ts` for database operations:
     ```typescript
     import { serverSupabaseClient } from '#supabase/server'
     import type { Database } from '~/types/database.types'
     
     const client = await serverSupabaseClient<Database>(event)
     ```

4. **Return Types**:
   - All server responses should have strict type definitions so front-end agents can consume the typed API correctly.
