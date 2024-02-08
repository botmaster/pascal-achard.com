<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { provideUseId } from '@headlessui/vue';

// Fix headlessui warning. See https://github.com/P4sca1/nuxt-headlessui/issues/41
provideUseId(() => useId());

// ScrollTrigger.defaults({ markers: process.env.NODE_ENV === 'development' });
gsap.registerPlugin(ScrollTrigger);

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
