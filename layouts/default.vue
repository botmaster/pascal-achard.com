<script setup lang="ts">
const route = useRoute();
useHead({
  title: `${
    route.meta?.title ||
    "Senior Frontend Developer - Full stack (node.js/vue.js)"
  }`,
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
    <!--    <the-header />-->
    <slot />
    <the-footer class="mt-auto" />
  </div>
</template>
