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
    highlight: {
        theme: "github-light"
    }
  },
  vite: {
    plugins: [svgLoader()],
  },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@nuxtjs/color-mode", '@nuxt/content'],
});
