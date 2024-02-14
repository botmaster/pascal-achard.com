<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError,
});

const localePath = useLocalePath();
const { t } = useI18n();

function handleError() {
  clearError({
    redirect: localePath({ name: 'index' }),
  });
  // localePath({ name: 'index' })
}
</script>

<template>
  <div>
    <NuxtLayout>
      <div class="container mx-auto mb-12 mt-8 md:mb-24 md:mt-20">
        <template v-if="props.error?.statusCode === 404">
          <h1>{{ t('pages.404.title') }}</h1>
          <p>{{ t('pages.404.sorry') }}</p>
        </template>
        <template v-else>
          <h1>{{ t('pages.error.title') }}</h1>
          <p>
            <strong>{{ props.error?.message }}</strong>
          </p>
          <p>{{ t('pages.error.intro') }}.</p>
          <p>{{ t('pages.error.sorry') }}.</p>
          <pre v-if="props.error">{{ props.error }}</pre>
        </template>

        <a href="#" class="mt-24 inline-flex" @click.prevent="handleError">
          {{ t('pages.404.goBackHome') }}
        </a>
      </div>
    </NuxtLayout>
  </div>
</template>
