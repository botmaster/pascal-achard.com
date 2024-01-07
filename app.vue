<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({ markers: process.env.NODE_ENV === 'development' });

const { t } = useI18n();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? t('layouts.title', { title: titleChunk })
      : 'Pascal Achard';
  },
});
</script>

<template>
  <NuxtLoadingIndicator color="hsl(var(--color-secondary))" :throttle="150" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
