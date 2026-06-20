# Contributing Guidelines

Thank you for your interest in contributing to the Carousell Clone! We welcome contributions of all sizes.

## Getting Started

1. **Fork and Clone** the repository.
2. Install dependencies using Bun:
   ```bash
   bun install
   ```
3. Set up your `.env` file based on `.env.example`.

## Issue First, Code Second

**Every change must start with a GitHub issue.** No code should be written without a linked issue.

1. Check [existing issues](https://github.com/terryong31/carousell-clone/issues) to avoid duplicates.
2. Open a new issue (use the appropriate template — bug report or feature request).
3. Get the issue assigned or acknowledged before branching.
4. Create a branch tied to the issue:
   ```bash
   git checkout -b feat/your-feature-name
   ```

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/) format.

| Type | When to use |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `chore:` | Maintenance, deps, config |
| `refactor:` | Code change with no behaviour change |

**Rules enforced by the commit-msg hook:**
- Subject line must **start with lowercase**
- Subject line must be **≤ 100 characters**
- Merge, revert, fixup, and squash commits are exempt

Example: `feat(web): add image upload to sell page`

## Git Workflow

**Never push directly to `main`.** Always:

```bash
git checkout -b feat/your-feature-name
# make changes, commit
git push -u origin feat/your-feature-name
gh pr create
```

## Pre-Commit & Pre-Push Checks

This project uses **Lefthook** to run quality gates automatically.

| Hook | Checks |
|---|---|
| `commit-msg` | Commit subject format |
| `pre-commit` | Lint, typecheck, security (staged files only) |
| `pre-push` | Lint, typecheck, security (full codebase) |

Run them manually:

```bash
bun run lint
bun run typecheck
bun run security:check
```

## Pull Requests

- Keep PRs small and focused — max **10 files** and **350 LOC**.
- If your PR is large (>10 files or >300 LOC), break it down and create a plan in `.agents/plans/`.
- Ensure all CI checks pass before requesting review.
- Fill out the PR template completely.

## Code Style

- Use Vue 3 Composition API with `<script setup>`.
- Use Nuxt UI components where applicable.
- Style with Tailwind CSS v4 using utility classes.
- Avoid using arbitrary magic numbers in Tailwind unless absolutely necessary.
