<script setup lang="ts">
const { t } = useI18n();

// Color mode
const colorMode = useColorMode();

const themeList = computed(() => [
  {
    name: "system",
    label: t("theme.auto"),
    icon: "material-symbols:computer",
  },
  { name: "dark", label: t("theme.dark"), icon: "material-symbols:dark-mode" },
  {
    name: "light",
    label: t("theme.light"),
    icon: "material-symbols:light-mode",
  },
]);
const localePath = useLocalePath();
</script>

<template>
  <header class="the-header">
    <nav class="the-header__nav">
      <NuxtLink
        class="the-header__nav-item the-header__nav-link"
        :to="localePath({ name: 'index' })"
        :title="t('navigation.home')"
        ><Icon name="material-symbols:home"></Icon
        ><span class="sr-only">{{ t("navigation.home") }}</span></NuxtLink
      >
      <NuxtLink
        class="the-header__nav-item the-header__nav-link"
        :to="localePath({ name: 'about' })"
        :title="t('navigation.about')"
        ><Icon name="material-symbols:info"></Icon
        ><span class="sr-only">{{ t("navigation.about") }}</span></NuxtLink
      >
      <NuxtLink
        class="the-header__nav-item the-header__nav-link"
        :to="localePath({ name: 'news' })"
        title="News"
        ><Icon name="material-symbols:news"></Icon
        ><span class="sr-only">{{ t("navigation.about") }}</span></NuxtLink
      >
      <ThemeMenuComponent
        v-model="colorMode.preference"
        :is-unkown="colorMode.unknown"
        :theme-list="themeList"
        class="the-header__nav-item leading-tight"
        :title="t('navigation.themeSelector')"
      />
      <LangSwitcher
        class="the-header__nav-item"
        :title="t('navigation.languageSelector')"
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
    @apply min-w-[1em];
  }

  &__nav-link {
    @apply no-underline;

    &.router-link-exact-active {
      @apply text-primary;
    }
  }
}
</style>
