# Frontend Development Guidelines (app/)

This directory contains the Vue 3 & Nuxt frontend codebase.

## Component & Page Development

1. **Vue Composition API**:
   - Always use `<script setup lang="ts">` for all Vue components.
   - Use strict TypeScript type definitions for all `props` and `emits`.

2. **Directory Conventions**:
   - `app/components/`: Reusable Vue components.
   - `app/composables/`: Reusable state and logic composables.
   - `app/pages/`: Nuxt route-matched pages.
   - `app/layouts/`: Nuxt application layout wrappers.
   - `app/assets/`: Styling entry points, images, fonts.

3. **Styling Rules (Tailwind CSS v4 & Nuxt UI)**:
   - Leverage Nuxt UI components (`UButton`, `UInput`, `UCard`, etc.) to build interfaces.
   - Use Tailwind CSS v4 utility classes.
   - **NO EMOJIS OR GENERIC SVG ICONS**: Never use raw emojis or plain SVGs in the markup. Use standard Nuxt UI icons/Iconify collections (e.g., Lucide icons `@iconify-json/lucide` or Simple Icons `@iconify-json/simple-icons`).
   - Avoid using arbitrary Tailwind values (like `w-[123px]`) unless standard scale sizes are completely insufficient.

4. **Rendering & Performance**:
   - Respect route rendering configurations defined in `nuxt.config.ts`.
   - Dynamic pages requiring fast loads should leverage ISR/edge-caching where possible.
   - For client-only/auth-gated forms (e.g., `/sell`), wrap component client-only parts or use `ssr: false` in route rules to avoid hydration mismatches.
