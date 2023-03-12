<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
  layout: false,
});

const runtimeConfig = useRuntimeConfig();
const pkg = JSON.parse(runtimeConfig.pkg);

const { data } = await useAsyncData("About", () => {
  return queryContent("/about")
    .findOne()
    .then((data) => {
      data.pkg = runtimeConfig.pkg;
      return data;
    });
});

const dependencies = computed(() => {
  return {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };
});
</script>

<template>
  <div>
    <NuxtLayout name="custom">
      <template #heroBackground>
        <img src="~/assets/images/hero.jpg" alt="" />
      </template>
      <template #heroContent>
        <h1 class="text-white">Info</h1>
        <h2 class="text-white h3">{{ pkg.name }}</h2>
        <p class="text-white mt-0">v{{ pkg.version }}</p>
      </template>
      <ContentRenderer class="nuxt-content" :value="data" />
      <div class="nuxt-content mt-2">
        <div class="flex">
          <ul class="!list-none">
            <li v-for="(value, key, index) in dependencies" :key="index">
              <span>
                {{ key }}: <span class="text-aurora-nord-14">{{ value }}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped></style>
