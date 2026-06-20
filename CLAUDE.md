# CLAUDE.md

## Project Overview
This is an eCommerce web application (Carousell Clone) built with Nuxt 4, Tailwind CSS v4, and Supabase. The repository is configured to support automated agent development workflows, hooks, and strict guidelines.

---

## Developer Command Guide

### Run & Build Commands
- **Start Development Server**: `bun run dev` (Runs on port 3001 as configured)
- **Production Build**: `bun run build`
- **Preview Production Build**: `bun run preview`
- **Post-Install Setup**: `bun run postinstall`

### Code Quality & Types
- **Run Linter**: `bun run lint`
- **Run Typechecking**: `bun run typecheck`

### Database Commands (Supabase)
- **Pull Database Schema**: `bun run db:pull`
- **Generate TypeScript Types**: `bun run db:types` (Generates types to `app/types/database.types.ts`)

---

## Core Guidelines & Boundaries

> [!IMPORTANT]
> ### 1. Agent Rules and Boundaries
> - **Follow AGENTS.md rules**: The user is learning to code without AI. **DO NOT WRITE APPLICATION CODE FOR THE USER UNLESS EXPLICITLY TOLD TO DO SO.** Only guide them or give hints on how to find the answer.
> - **This file (`CLAUDE.md`)** and associated configs are for the setup and configuration of development agents.

### 2. Git & PR Management Rules
- **Never push directly to `main`**: Always branch off `main`, push the branch, and open a PR via `gh pr create`. Direct pushes to `main` are not permitted.
- **Size Limits**: Keep PRs small and focused. Maximum **10 files** and **350 LOC** per PR.
- **Large PRs Plan**: If changes exceed 10 files or 300 LOC, create a PR Restructuring Plan document under `.agents/plans/` mapping the remote branches, sub-PR target hierarchy, and commit descriptions.
- **Commit Formatting**: Follow Conventional Commits format (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`). Subject line must start with **lowercase** and be **≤ 100 characters** — enforced by the commit-msg hook.
- **Pre-commit Integrity**: Never commit or push changes that fail `bun run lint`, `bun run typecheck`, or `bun run security:check`.

### 3. Frontend & Visual Guidelines
- **Frontend Framework**: Vue 3 Composition API with `<script setup>`.
- **Component Styling**: Tailwind CSS v4 utility classes. Avoid arbitrary values where possible.
- **UI Elements**: Use Nuxt UI components. **DO NOT use emojis** and avoid generic SVG icons. Use icons and styling patterns that feel modern and premium.

---

## Directory Structure Overview
- `.agents/` - Agent workflows and rules (contains `rules/AGENTS.md`)
- `.claude/` - Claude skills and settings
- `.github/` - Pull request templates and GitHub settings
- `app/` - Vue 3/Nuxt frontend application (pages, components, layouts, assets)
- `server/` - Nuxt Nitro backend APIs (`server/api/`)
- `supabase/` - Supabase migration files and schemas
- `docs/` - Architecture Decision Records (ADRs) and templates
