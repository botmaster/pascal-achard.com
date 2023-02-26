// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  tailwindcss: {
    cssPath: "~/assets/scss/main.scss",
  },
  vite: {
    plugins: [svgLoader()],
  },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@nuxtjs/color-mode"],
});
