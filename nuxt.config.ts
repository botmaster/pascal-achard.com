// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader';
import pkg from './package.json';

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          property: 'og:image',
          content: `${process.env.NUXT_PUBLIC_SITE_URL}/images/social/social-fb.jpg`,
        },
        {
          property: 'og:url',
          content: process.env.NUXT_PUBLIC_SITE_URL,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'twitter:image',
          content: `${process.env.NUXT_PUBLIC_SITE_URL}/images/social/social-fb.jpg`,
        },
        {
          name: 'msapplication-TileColor',
          content: '#da532c',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
          color: '#5bbad5',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  components: {
    dirs: [
      { path: '~/components', pathPrefix: false },
    ],
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  tailwindcss: {
    cssPath: '~/assets/scss/main.scss',
    configPath: '~/tailwind.config.js',
    viewer: false,
  },

  colorMode: {
    classSuffix: '',
  },

  content: {
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
      },
    },
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
  },

  i18n: {
    debug: false,
    vueI18n: './i18n.config.ts',
    langDir: 'locales',
    lazy: false,
    locales: [
      {
        code: 'fr',
        language: 'fr-FR',
        name: 'Français',
        file: 'fr.json',
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json',
      },
    ],
    defaultLocale: 'fr',
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: false,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
  },

  fonts: {
    defaults: {
      weights: [400, 900],
      styles: ['normal', 'italic'],
      subsets: [
        'latin-ext',
        'latin',
      ],
    },
  },

  vite: {
    plugins: [svgLoader()],

    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern', // or "modern", "legacy"
        },
      },
    },
  },

  runtimeConfig: {
    notionApiKey: process.env.NUXT_NOTION_API_PRIVATE_KEY,
    public: {
      pkg: JSON.stringify(pkg),
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      lastFmApiKey: process.env.NUXT_PUBLIC_LASTFM_API_KEY,
      notionDatabaseId: process.env.NUXT_NOTION_DATABASE_ID,
    },
  },

  routeRules: {
    '/test': { robots: false },
  },

  sitemap: {
    strictNuxtContentPaths: false,
    sitemaps: false,
    discoverImages: true,
    autoLastmod: true,
  },

  build: {
    transpile: ['gsap'],
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    'nuxt-headlessui',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@nuxt/devtools',
    '@nuxtjs/sitemap',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/fonts',
  ],

  features: {
    inlineStyles: false,
  },

  devtools: {
    // Enable devtools (default: true)
    enabled: true,
  },

  compatibilityDate: '2025-01-11',
});
