<script setup lang="ts">
// Color mode
const colorMode = useColorMode();
const themeList = [
  { name: "system", label: "System", icon: "mi-computer" },
  { name: "dark", label: "Dark", icon: "mi-moon" },
  { name: "light", label: "Light", icon: "mi-sun" },
];
</script>

<template>
  <header class="the-header">
    <nav class="the-header__nav">
      <NuxtLink
        class="the-header__nav-item the-header__nav-link"
        to="/"
        title="Page d'accueil"
        ><Icon name="material-symbols:home"></Icon
        ><span class="sr-only">Page d'accueil</span></NuxtLink
      >
      <NuxtLink
        class="the-header__nav-item the-header__nav-link"
        to="/info"
        title="Page info"
        ><Icon name="material-symbols:info"></Icon
        ><span class="sr-only">Page info</span></NuxtLink
      >
      <ThemeMenuComponent
        v-model="colorMode.preference"
        :theme-list="themeList"
        class="the-header__nav-item leading-tight"
      />
    </nav>
  </header>
</template>

<style scoped lang="scss">
.the-header {
  @apply flex justify-between items-center mx-2 mt-1 md:mx-8 md:mt-4 z-10 fixed inset-x-0 top-0 py-1 md:py-0;

  &__nav {
    @apply relative flex items-center gap-4 ml-auto px-4 pt-2 pb-2 text-xl uppercase leading-none bg-body-background
    dark:bg-body-backgrounddark rounded-lg ring-1 ring-inset ring-snowstorm-nord-4 dark:ring-polarnight-nord-2;
  }

  &__nav-item {
    //@apply no-underline;
  }

  &__nav-link {
    @apply no-underline;

    &.router-link-exact-active {
      @apply text-frost-nord-10 dark:text-[inherit];
    }
  }
}
</style>
