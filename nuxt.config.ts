// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  modules: ["@nuxtjs/tailwindcss"],
  css: [
    // SCSS file in the project
    "@/assets/styles/main.scss",
  ],
});
