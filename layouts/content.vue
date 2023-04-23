<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const route = useRoute();

useHead(() => ({
  link: [
    {
      rel: "canonical",
      href: runtimeConfig.public.siteUrl + route.path,
    },
  ],
}));
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <the-header />
    <HeroComponent>
      <template #content>
        <slot name="heroContent" />
      </template>
      <template #background>
        <slot name="heroBackground" />
      </template>
    </HeroComponent>
    <div class="container mx-auto mt-8 mb-12 md:mt-20 md:mb-24">
      <SheetElevation shadow="lg" class="md:w-9/12">
        <slot />
      </SheetElevation>
    </div>
    <the-footer class="mt-auto" />
  </div>
</template>
