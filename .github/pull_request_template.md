## Summary

<!-- One or two sentences. What does this PR do and why? -->

Closes #<!-- issue number -->

## Type

<!-- Matches your conventional commit type — delete all that don't apply -->
- [ ] `feat` — new feature
- [ ] `fix` — bug fix
- [ ] `chore` — maintenance / config / deps
- [ ] `refactor` — no behaviour change
- [ ] `docs` — documentation only

## Changes

<!-- Bullet list of what changed. Keep it scannable. -->
-
-

## Screenshots / recordings

<!-- Required for any UI change. Delete if backend/infra only. -->
| Before | After |
|--------|-------|
|        |       |

## Checklist

- [ ] Self-reviewed the diff
- [ ] Closes the linked issue (or explains why not)
- [ ] PR is ≤ 10 files and ≤ 350 LOC (or a restructuring plan exists in `.agents/plans/`)
- [ ] Lefthook pre-push passed locally (`lint` + `typecheck` + `security:check`)
- [ ] No new `console.log` / debug code left in
- [ ] DB migrations included if schema changed (`supabase/migrations/`)
- [ ] `bun run db:types` re-run if Supabase schema changed
