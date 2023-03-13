<script setup lang="ts">
import { Ref } from "vue";
import { ParsedContent } from "@nuxt/content/dist/runtime/types";
import { definePageMeta } from "#imports";

definePageMeta({
  layout: false,
});

const runtimeConfig = useRuntimeConfig();
const pkg = JSON.parse(runtimeConfig.pkg);

const { data } = await useAsyncData("info", () => {
  return queryContent("/info")
    .findOne()
    .then((data) => {
      data.pkg = pkg;
      data.subtitle = pkg.description;
      return data;
    });
});

if (data) useContentHead(data as Ref<ParsedContent>);

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
        <p class="text-white">v{{ pkg.version }}</p>
        <h1 class="text-white">{{ data.coverTitle }}</h1>
        <h2 class="text-white h3">{{ pkg.name }}</h2>
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
