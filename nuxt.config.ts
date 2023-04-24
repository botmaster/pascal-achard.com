// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";
import pkg from "./package.json";

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          property: "og:image",
          content: "https://www.pascal-achard.me/images/social/social-fb.jpg",
        },
        {
          property: "twitter:image",
          content: "https://www.pascal-achard.me/images/social/social-fb.jpg",
        },
        {
          name: "msapplication-TileColor",
          content: "#da532c",
        },
        {
          name: "theme-color",
          content: "#ffffff",
        },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
        {
          rel: "mask-icon",
          href: "/safari-pinned-tab.svg",
          color: "#5bbad5",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  tailwindcss: {
    cssPath: "~/assets/scss/main.scss",
    configPath: "~/tailwind.config.js",
  },

  colorMode: {
    classSuffix: "",
  },

  content: {
    // https://content.nuxtjs.org/api/configuration
    markdown: {
      anchorLinks: false,
    },
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: "github-light",
        // Theme used if `html.dark`
        dark: "github-dark",
      },
    },
    locales: ["en", "fr"],
  },

  i18n: {
    debug: false,
    vueI18n: {
      legacy: false,
      locale: "en",
      fallbackLocale: "fr",
    },

    /* precompile: {
      strictMessage: false,
      escapeHtml: true,
    }, */
    langDir: "locales",
    lazy: false,
    locales: [
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en.json",
      },
      {
        code: "fr",
        iso: "fr-FR",
        name: "Français",
        file: "fr.json",
      },
    ],
    defaultLocale: "en",
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
    detectBrowserLanguage: {
      useCookie: false,
      alwaysRedirect: false,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
  },

  // Simple robots.txt
  robots: {
    disallow: "/test",
  },

  // Simple sitemap
  routeRules: {
    "/test": {
      index: false,
    },
  },

  vite: {
    plugins: [svgLoader()],
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/content",
    "nuxt-icon",
    "nuxt-headlessui",
    "@nuxtjs/fontaine",
    "nuxt-simple-sitemap",
    "nuxt-simple-robots",
    "@nuxt/devtools",
    "@nuxtjs/i18n",
  ],

  runtimeConfig: {
    public: {
      pkg: JSON.stringify(pkg),
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
  },

  devtools: {
    enabled: true,
  },
});
