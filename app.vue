<script setup lang="ts">
import { useTransitionComposable } from "~/composables/transition-composable";

const { t } = useI18n();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? t("layouts.title", { title: titleChunk })
      : "Pascal Achard";
  },
});

const { toggleTransitionComplete } = useTransitionComposable();

onMounted(() => {
  toggleTransitionComplete(true);
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
