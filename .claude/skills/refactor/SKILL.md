# Skill: Code Refactoring

Use this skill to refactor existing code to match the repository's preferred standards, clean code principles, and modern Vue/Nuxt conventions.

## Refactoring Guidelines

1. **Vue 3 Composition API**:
   - Always refactor components to use `<script setup>` with TypeScript if they are using Options API or older setup formats.
   - Separate business logic into composables (located in `app/composables/`) if the component file exceeds ~200 lines or if the logic is reusable.

2. **Styling and Layout**:
   - Refactor custom style sheets or arbitrary inline styling to use Tailwind CSS v4 utility classes.
   - Refactor Tailwind classes that use arbitrary magic values (e.g. `w-[293px]`) to use standard scale classes or variables from `app/assets/css/main.css`.
   - Ensure the design is clean, polished, and looks premium. Never use raw emojis or low-fidelity SVG icons. Prefer Nuxt UI icons and components.

3. **Routing and Performance**:
   - Ensure routes are configured correctly under `nuxt.config.ts` routeRules where appropriate (e.g., ISR cache setting, SSR disabled for client-only auth pages).
   - Use Nuxt UI components (`UButton`, `UInput`, etc.) to maintain visual and functional consistency.

4. **Testing**:
   - Ensure refactored code has no type errors by running `bun run typecheck`.
   - Ensure refactored code passes lint check by running `bun run lint`.
