<script setup lang="ts">
import type { Ref } from 'vue';

const { locale: currentLocale, locales }: { locale: Ref, locales: Ref<any[]> }
  = useI18n();

const switchLocalePath = useSwitchLocalePath();
const availableLocales = computed(() => {
  return locales.value?.filter(i => i.code !== currentLocale.value);
});

const localeIcon = computed(() => (locale: string) => {
  let icon: string;
  switch (locale) {
    case 'fr':
      icon = 'material-symbols:language-french';
      break;
    case 'en':
      icon = 'material-symbols:language-us';
      break;
    default:
      icon = 'material-symbols:language-us';
      break;
  }
  return icon;
});
</script>

<template>
  <span>
    <NuxtLink
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code) || ''"
      :title="locale.name"
    ><Icon :name="localeIcon(locale.code)" /><span class="sr-only">{{ locale.name }}</span></NuxtLink>
  </span>
</template>

<style scoped lang="scss"></style>
