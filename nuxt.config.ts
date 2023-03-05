// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
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
      anchorLinks: {
        level: [2, 3, 4],
      },
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
