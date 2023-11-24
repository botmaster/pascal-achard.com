<script setup lang="ts">
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

if (data) useContentHead(data as any); // TODO: fix type

const dependencies = computed(() => {
  const merged = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };
  // Sort by key alphabetically
  return Object.keys(merged)
    .sort()
    .reduce(
      (obj, key) => {
        obj[key] = merged[key];
        return obj;
      },
      {} as Record<string, string>,
    );
});

const latestVersions = ref<Record<string, string>>({});

const fetchLatestVersion = async (pkgName: string) => {
  try {
    const response = await fetch(`https://unpkg.com/${pkgName}/package.json`);
    const data = await response.json();
    return data.version;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to fetch version for package ${pkgName}:`, error);
    return null;
  }
};

const fetchLatestVersions = async () => {
  // fetch latest versions in parallel
  const promises = Object.keys(dependencies.value).map(async (pkgName) => {
    latestVersions.value[pkgName] = "loading";
    try {
      latestVersions.value[pkgName] = await fetchLatestVersion(pkgName);
    } catch (error) {
      latestVersions.value[pkgName] = "error";
    }
  });
  await Promise.all(promises);
};

const depsTarget = ref<HTMLElement | null>(null);

if (process.client) {
  useIntersectionObserver(depsTarget, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      // If latest versions are not yet fetched, fetch them
      if (Object.keys(latestVersions.value).length === 0) {
        fetchLatestVersions();
      }
    }
  });
}
</script>

<template>
  <main>
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
        <table ref="depsTarget" class="deps-table">
          <thead>
            <tr>
              <th class=""></th>
              <th class=""></th>
              <th class="autowidth"></th>
              <th class=""></th>
              <th class=""></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key, index) in dependencies" :key="index">
              <td>{{ key }}</td>
              <template v-if="latestVersions[key] === 'error'">
                <td colspan="4" class="right">
                  <span title="Failed to fetch latest version">
                    <Icon
                      name="ic:baseline-error"
                      class="text-aurora-nord-11"
                    ></Icon>
                  </span>
                </td>
              </template>

              <template v-else-if="latestVersions[key] === 'loading'">
                <td colspan="4" class="right">
                  <span title="Loading">
                    <Icon
                      name="eos-icons:three-dots-loading"
                      class="text-primary"
                    ></Icon>
                  </span>
                </td>
              </template>

              <template
                v-else-if="
                  latestVersions[key] !== value.replace('^', '').trim()
                "
              >
                <td class="right">{{ value }}</td>
                <td class="text-center">
                  <Icon name="mdi:arrow-right-thin"></Icon>
                </td>
                <td class="right">{{ latestVersions[key] }}</td>
                <td>
                  <span title="Update available"
                    ><Icon
                      name="material-symbols:arrow-circle-up"
                      class="text-base text-aurora-nord-14"
                    ></Icon
                  ></span>
                </td>
              </template>

              <template v-else-if="latestVersions[key]">
                <td colspan="3" class="right">{{ value }}</td>
                <td>
                  <span title="Up to date"
                    ><Icon
                      name="material-symbols:check-box-rounded"
                      class="text-base text-primary"
                    ></Icon
                  ></span>
                </td>
              </template>

              <template v-else>
                <td colspan="4" class="right"></td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </NuxtLayout>
  </main>
</template>

<style scoped lang="scss">
.deps-table {
  @apply table-auto w-full font-code;

  tr {
    @apply text-xs lg:text-sm;
  }

  th,
  td {
    @apply text-left align-middle;
  }

  td {
    @apply border-b border-b-snowstorm-nord-4 py-1 dark:border-b-polarnight-nord-2;

    &:not(:first-child) {
      @apply w-px whitespace-nowrap;
    }

    &:not(:first-child):not(:last-child) {
      @apply px-1 lg:px-2;
    }
  }

  td.autowidth {
    @apply w-px;
  }

  td.right {
    @apply text-right;
  }
}
</style>
