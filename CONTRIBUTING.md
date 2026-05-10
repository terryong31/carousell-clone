# Contributing Guidelines

Thank you for your interest in contributing to the Carousell Clone! We welcome contributions of all sizes.

## Getting Started

1. **Fork and Clone** the repository.
2. Install dependencies using Bun:
   ```bash
   bun install
   ```
3. Set up your `.env` file based on `.env.example`.
4. Create a new branch for your feature/bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Commit Conventions

We follow Conventional Commits format for our commit messages:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation updates
- `chore:` for maintenance tasks
- `refactor:` for code refactoring

Example: `feat(web): add image upload to sell page`

## Pre-Commit Checks

This project uses **Lefthook** to manage git hooks. When you run `git commit`, Lefthook will automatically run:

- Linting (`bun run lint`)
- Typechecking (`bun run typecheck`)

Please ensure these pass before pushing your code. You can run them manually with:

```bash
bun run lint
bun run typecheck
```

## Pull Requests

- Keep your PRs small and focused (preferably max 10 files and max 350 LOC).
- If your PR is large (>15 files or >300 LOC), please break it down into smaller PRs and create a plan document in `.agents/plans/`.
- Ensure all CI tests pass.
- Fill out the PR template completely.

## Code Style

- Use Vue 3 Composition API with `<script setup>`.
- Use Nuxt UI components where applicable.
- Style with Tailwind CSS v4 using utility classes.
- Avoid using arbitrary magic numbers in Tailwind unless absolutely necessary.
