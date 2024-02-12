<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError,
});

const localePath = useLocalePath();
</script>

<template>
  <div>
    <NuxtLayout>
      <div class="container mx-auto mb-12 mt-8 md:mb-24 md:mt-20">
        <h1>{{ error?.statusCode }}</h1>
        <pre v-if="error">{{ error }}</pre>
        <NuxtLink :to="localePath({ name: 'index' })">
          Go back home
        </NuxtLink>
      </div>
    </NuxtLayout>
  </div>
</template>
