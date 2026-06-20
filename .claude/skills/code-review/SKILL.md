# Skill: Code Review

Use this skill to review code changes, pull requests, and commits to ensure they adhere to repository standards and best practices.

## Guidelines

1. **Size Limits**:
   - Verify that any pull request contains a maximum of **10 files** and **350 lines of code (LOC)**.
   - If changes exceed these limits, check if there is an approved restructuring plan in `.agents/plans/`. If not, flag the need for a restructuring plan.

2. **Commit Message and PR Formatting**:
   - Commit messages must follow the Conventional Commits format as described in `CONTRIBUTING.md`:
     - `feat:` for new features
     - `fix:` for bug fixes
     - `docs:` for documentation updates
     - `chore:` for maintenance tasks
     - `refactor:` for code refactoring
   - Example: `feat(web): add image upload to sell page`.
   - Pull requests must use the template defined in `.github/pull_request_template.md`.

3. **Code Quality and Constraints**:
   - Ensure Vue 3 components use the Composition API with `<script setup>`.
   - Styling must use Tailwind CSS v4 utility classes.
   - Do **NOT** use emojis or generic SVG icons. Use Nuxt UI icons/components where possible.
   - Avoid using arbitrary magic numbers in Tailwind unless absolutely necessary.
   - Verify that no debug code or print statements are left behind.

4. **Verification checks**:
   - Confirm that the pre-commit hook constraints pass (`bun run lint` and `bun run typecheck`).
