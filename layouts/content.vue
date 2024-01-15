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
  <div class="flex min-h-screen flex-col">
    <TheHeader />
    <HeroComponent>
      <template #content>
        <slot name="heroContent" />
      </template>
      <template #background>
        <slot name="heroBackground" />
      </template>
    </HeroComponent>
    <div class="container mx-auto mb-12 mt-8 md:mb-24 md:mt-20">
      <Sheetelevation shadow="lg" class="lg:w-9/12">
        <slot />
      </Sheetelevation>
    </div>
    <TheFooter class="mt-auto" />
  </div>
</template>
