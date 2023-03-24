<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `Pascal Achard - ${titleChunk}` : "Pascal Achard";
  },
  title: "Pascal Achard",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
