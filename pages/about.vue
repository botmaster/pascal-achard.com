<script setup lang="ts">
import type { Ref } from "vue";
import { definePageMeta } from "#imports";
import type { IPage } from "@/types/types";

definePageMeta({
  layout: false,
});

const runtimeConfig = useRuntimeConfig();
const pkg = JSON.parse(runtimeConfig.public.pkg);

const { locale: currentLocale } = useI18n();

const { data } = await useAsyncData(`about-${currentLocale.value}`, () =>
  queryContent<IPage>()
    .where({ _locale: currentLocale.value, _path: "/about" })
    .findOne()
    .then((data) => {
      data.pkg = pkg;
      data.subtitle = pkg.description;
      return data;
    }),
);

if (data) useContentHead(data as Ref<IPage>);

const dependencies = computed(() => {
  return {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };
});
</script>

<template>
  <div>
    <NuxtLayout v-if="data" name="content">
      <template #heroBackground>
        <img
          sizes="(max-width: 2170px) 100vw, 2170px"
          srcset="
            @/assets/images/infos/hero_rsbr7p_c_scale_w_768.jpg   768w,
            @/assets/images/infos/hero_rsbr7p_c_scale_w_1773.jpg 1773w,
            @/assets/images/infos/hero_rsbr7p_c_scale_w_2170.jpg 2170w
          "
          src="@/assets/images/infos/hero_rsbr7p_c_scale_w_2170.jpg"
          width="2170"
          height="1074"
          alt=""
        />
      </template>
      <template #heroContent>
        <p class="dark:text-white">v{{ pkg.version }}</p>
        <h1 class="dark:text-white">{{ data.coverTitle }}</h1>
        <h2 class="dark:text-white h3">{{ pkg.name }}</h2>
      </template>
      <ContentRenderer class="nuxt-content" :value="data" />
      <div class="nuxt-content mt-2">
        <div class="flex">
          <ul class="!list-none">
            <li v-for="(value, key, index) in dependencies" :key="index">
              <span>
                {{ key }}: <span class="text-primary-content">{{ value }}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped></style>
