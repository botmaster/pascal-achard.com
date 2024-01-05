<script setup lang="ts">
const i18nHead = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true,
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
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <slot />
    <TheFooter class="mt-auto" />
  </div>
</template>
