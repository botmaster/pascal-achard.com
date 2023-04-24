<script setup>
definePageMeta({
  title: "pages.title.top", // set resource key
});
const { locale: currentLocale, locales, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== currentLocale.value);
});
</script>
<template>
  <div class="mt-20">
    <p>{{ t("pages.top.description") }}</p>
    <p>{{ t("pages.top.languages") }}</p>
    <nav>
      <span v-for="locale in availableLocales" :key="locale.code">
        <NuxtLink :to="switchLocalePath(locale.code) || ''">{{
          locale.name
        }}</NuxtLink>
        |
      </span>
    </nav>
  </div>
</template>
