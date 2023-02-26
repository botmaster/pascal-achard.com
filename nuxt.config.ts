// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  tailwindcss: {
    cssPath: "~/assets/scss/main.scss",
  },
  modules: ["@nuxtjs/tailwindcss"],
});
