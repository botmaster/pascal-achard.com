<script setup lang="ts">
const { t } = useI18n();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? t("layouts.title", { title: titleChunk })
      : "Pascal Achard";
  },
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
