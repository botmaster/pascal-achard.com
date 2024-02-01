<script setup lang="ts">
const { t } = useI18n();

// Color mode
const colorMode = useColorMode();

const themeList = computed(() => [
  {
    name: 'system',
    label: t('theme.auto'),
    icon: 'material-symbols:computer',
  },
  { name: 'dark', label: t('theme.dark'), icon: 'material-symbols:dark-mode' },
  {
    name: 'light',
    label: t('theme.light'),
    icon: 'material-symbols:light-mode',
  },
]);

const localePath = useLocalePath();
</script>

<template>
  <header class="the-header">
    <nav class="the-header__nav wrapper-outline">
      <NuxtLink
        class="the-header__nav-item the-header__nav-link"
        :to="localePath({ name: 'index' })"
        :title="t('navigation.home')"
      >
        <Icon name="material-symbols:home" /><span class="sr-only">{{ t("navigation.home") }}</span>
      </NuxtLink>
      <NuxtLink
        class="the-header__nav-item the-header__nav-link"
        :to="localePath({ name: 'readings' })"
        :title="t('navigation.reading')"
      >
        <Icon name="fluent:reading-mode-mobile-20-filled" /><span class="sr-only">{{ t("navigation.reading") }}</span>
      </NuxtLink>
      <NuxtLink
        class="the-header__nav-item the-header__nav-link"
        :to="localePath({ name: 'lab' })"
        :title="t('navigation.lab')"
      >
        <Icon name="material-symbols:experiment" /><span class="sr-only">{{ t("navigation.lab") }}</span>
      </NuxtLink>
      <NuxtLink
        class="the-header__nav-item the-header__nav-link"
        :to="localePath({ name: 'about' })"
        :title="t('navigation.about')"
      >
        <Icon name="material-symbols:info" /><span class="sr-only">{{ t("navigation.about") }}</span>
      </NuxtLink>

      <div class="the-header__nav-separator" />
      <ThemeMenuComponent
        v-model="colorMode.preference"
        :is-unkown="colorMode.unknown"
        :theme-list="themeList"
        class="the-header__nav-item"
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
  @apply flex justify-between items-center mx-2 mt-1 md:mx-8 md:mt-4 z-20 fixed inset-x-0 top-0 py-1 md:py-0;

  &__nav {
    @apply relative flex items-center gap-3 ml-auto px-4 py-2.5 text-xl leading-[0px];
  }

  &__nav-item {
    @apply min-w-[1em];
  }

  &__nav-separator {
    @apply w-0.5 bg-snowstorm-nord-4 dark:bg-polarnight-nord-2 h-3 mx-1.5;
  }

  &__nav-link {
    @apply no-underline;

    &.router-link-exact-active {
      @apply text-primary;
    }
  }

  &__socials {
    @apply text-xl leading-[0px];
  }
}
</style>
