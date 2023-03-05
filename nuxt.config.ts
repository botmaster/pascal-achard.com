// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  app: {
    // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-app
    // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-head
    head: {
      htmlAttrs: {
        lang: "fr-fr",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "google-site-verification",
          content: "_ylnpIhPAnWMoDDWYnai5HYIKcjxnkqFS8yeNf75z-0",
        },
        {
          property: "og:image",
          content: "https://www.pascal-achard.me/social-fb.jpg",
        },
        {
          property: "twitter:image",
          content: "https://www.pascal-achard.me/social-fb.jpg",
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
  },
  tailwindcss: {
    cssPath: "~/assets/scss/main.scss",
  },
  colorMode: {
    classSuffix: "",
  },
  content: {
    // https://content.nuxtjs.org/api/configuration
    highlight: {
      theme: "nord",
    },
    markdown: {
      anchorLinks: false,
      prism: {
        theme: "prism-themes/themes/prism-material-oceanic.css",
      },
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
  ],
});
