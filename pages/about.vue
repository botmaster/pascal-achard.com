<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
  layout: false,
});

const runtimeConfig = useRuntimeConfig();

const { data } = await useAsyncData("About", () => {
  return queryContent("/about")
    .findOne()
    .then((data) => {
      data.pkg = runtimeConfig.pkg;
      return data;
    });
});
</script>

<template>
  <div>
    <NuxtLayout name="custom">
      <template #heroBackground>
        <img src="~/assets/images/hero.jpg" alt="" />
      </template>
      <template #heroContent>&nbsp;</template>
      <pre class="text-xs text-black">
        {{ JSON.parse(runtimeConfig.pkg) }}
      </pre>
      <ContentRenderer class="nuxt-content" :value="data" />
    </NuxtLayout>
  </div>
</template>

<style scoped></style>
