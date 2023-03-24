// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";
import pkg from "./package.json";

export default defineNuxtConfig({
  app: {
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
          property: "og:image",
          content: "https://www.pascal-achard.me/social/social-fb.jpg",
        },
        {
          property: "twitter:image",
          content: "https://www.pascal-achard.me/social/social-fb.jpg",
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
    "@nuxt/image-edge",
  ],
  runtimeConfig: {
    public: {
      pkg: JSON.stringify(pkg),
    },
  },
});
