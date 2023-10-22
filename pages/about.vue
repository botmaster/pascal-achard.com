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

const latestVersions = ref<Record<string, string>>({});

const fetchLatestVersion = async (pkgName: string) => {
  const response = await fetch(`https://unpkg.com/${pkgName}/package.json`);
  const data = await response.json();
  return data.version;
};

// On mounted
onMounted(async () => {
  // fetch latest versions in parallel
  await Promise.all(
    Object.keys(dependencies.value).map(async (pkgName) => {
      latestVersions.value[pkgName] = "loading...";
      latestVersions.value[pkgName] = await fetchLatestVersion(pkgName);
    }),
  );
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
        <ul class="!list-none">
          <li
            v-for="(value, key, index) in dependencies"
            :key="index"
            class="md:flex gap-2 align-baseline"
          >
            <p class="!mb-0">
              {{ key }}: <span class="text-primary-content">{{ value }}</span>
            </p>

            <ClientOnly>
              <p class="m-0 leading-[inherit] ml-auto">
                <span v-if="latestVersions[key]" class="text-xs">
                  latest: {{ latestVersions[key] }}
                  <span
                    v-if="latestVersions[key] !== value.replace('^', '').trim()"
                    ><Icon name="material-symbols:arrow-circle-up"></Icon
                  ></span>
                  <span v-else
                    ><Icon name="material-symbols:check-box-rounded"></Icon
                  ></span>
                </span>
              </p>
            </ClientOnly>
          </li>
        </ul>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped></style>
