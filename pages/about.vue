<script setup lang="ts">
import { definePageMeta } from '#imports';
import type { IPage } from '@/types/types';

definePageMeta({
  layout: false, // Disable default layout to use custom layout below instead (see <NuxtLayout> in template).
  // More info: https://nuxt.com/docs/guide/directory-structure/layouts#overriding-a-layout-on-a-per-page-basis
});

const runtimeConfig = useRuntimeConfig();
const pkg = JSON.parse(runtimeConfig.public.pkg);

const { locale: currentLocale, t } = useI18n();

const { data } = await useAsyncData(`about-${currentLocale.value}`, () =>
  queryContent<IPage>()
    .where({ _locale: currentLocale.value, _path: '/about' })
    .findOne()
    .then((data) => {
      data.pkg = pkg;
      data.subtitle = pkg.description;
      data.nuxtVersion = pkg.devDependencies.nuxt;
      return data;
    }));

if (data?.value)
  useContentHead(data as Ref<IPage>);

const dependencies = computed(() => {
  return {
    ...pkg.dependencies,
  };
});

const devDependencies = computed(() => {
  return {
    ...pkg.devDependencies,
  };
});
</script>

<template>
  <main>
    <NuxtLayout v-if="data" name="content">
      <template #heroContent>
        <h1 class="dark:text-white">
          {{ data.coverTitle }}
        </h1>
        <h2 class="h3 dark:text-white">
          {{ pkg.name }}
        </h2>
        <p class="dark:text-white">
          v{{ pkg.version }}
        </p>
      </template>

      <ContentRenderer class="nuxt-content" :value="data" />

      <div class="mt-2">
        <p class="mb-0 font-bold">
          {{ t('pages.about.dependencies') }}
        </p>
        <DepsTable :dependencies="dependencies" />

        <p class="mb-0 mt-6 font-bold">
          {{ t('pages.about.devDependencies') }}
        </p>
        <DepsTable :dependencies="devDependencies" />
      </div>
    </NuxtLayout>
  </main>
</template>
