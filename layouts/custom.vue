<script setup lang="ts">
// Head info for this layout. Can be overriden by child pages
useHead({
  meta: [
    {
      property: "og:image",
      content: "https://www.pascal-achard.me/social-fb.jpg",
    },
    {
      property: "twitter:image",
      content: "https://www.pascal-achard.me/social-fb.jpg",
    },
  ],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `Pascal Achard - ${titleChunk}` : "Pascal Achard";
  },
});
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
    <div class="container mx-auto mt-20">
      <div class="md:w-10/12">
        <slot />
      </div>
    </div>
    <the-footer class="mt-auto" />
  </div>
</template>
