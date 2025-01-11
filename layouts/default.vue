<script setup lang="ts">
const i18nHead = useLocaleHead({
  dir: true,
  seo: true,
});
useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
});
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <TheHeader />
    <slot />
    <TheFooter class="mt-auto" />
  </div>
</template>
