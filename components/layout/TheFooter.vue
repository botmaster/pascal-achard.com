<script setup lang="ts">
import { socialsLinks } from '~/data/socialsLinks';

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
</script>

<template>
  <footer class="the-footer">
    <div class="the-footer__container">
      <div class="the-footer__socials wrapper-outline">
        <div class="the-footer__socials-icons">
          <SocialIcons :links="socialsLinks" />
        </div>
        <p class="the-footer__copyright">
          <span class="sr-only">copyright</span>Pascal Achard <sup><Icon name="material-symbols:copyright-outline" size="0.8em" /></sup> {{ new Date().getFullYear() }}
        </p>
      </div>

      <div
        class="the-footer__theme-switcher"
      >
        <theme-switcher-component
          v-model="colorMode.preference"
          :theme-list="themeList"
          size="md"
          class="wrapper-outline"
        />
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.the-footer {
  @apply relative py-6;

  &__container {
    @apply mx-4 md:mx-8 flex flex-col gap-y-4 items-start md:flex-row md:justify-between md:items-center;
  }

  &__socials {
    @apply overflow-y-clip md:flex md:gap-4 md:items-baseline text-xl leading-[0px];
  }

  &__copyright {
    @apply text-muted-text text-xs mt-2 md:mt-0;
  }

  &__theme-switcher {
    @apply inline-flex md:block;
  }
}
</style>
