// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@vercel/analytics',
    '@vercel/speed-insights',
    '@pinia/nuxt'
    // '@nuxt/content'
  ],

  $development: {
    runtimeConfig: {
      public: {
        siteUrl: 'http://localhost:3001'
      }
    }
  },
  $production: {
    runtimeConfig: {
      public: {
        siteUrl: 'https://carousell.website-clones.my'
      }
    }
  },

  ssr: true,

  devtools: {
    enabled: true
  },

  app: {
    head: {
      title: 'eCommerce',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    // Static marketing pages — built once at deploy, served as static HTML
    '/about': { prerender: true },
    '/contact': { prerender: true },

    // Public, SEO-critical, cacheable — rendered on demand then cached at the
    // edge and revalidated after the TTL (seconds). Native ISR on Vercel.
    '/': { isr: 60 }, // home shows live "Recommended" — short cache stays fresh
    '/p/**': { isr: 3600 }, // product pages — revalidate hourly
    '/u/**': { isr: 3600 }, // public profiles

    // Auth-gated / personalized — no SEO value, render on the client only
    '/sell': { ssr: false },
    '/forgot-password': { ssr: false },
    '/reset-password': { ssr: false },
    '/confirm': { ssr: false }

    // /shop and /search have no rule — they inherit the global ssr: true default
  },

  compatibilityDate: '2025-01-15',

  vite: {
    build: {
      sourcemap: false
    },
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'zod',
        'vuedraggable'
      ]
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  supabase: {
    redirect: false
  }

})
