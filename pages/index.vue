<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";
import { Ref } from "vue";
import type { IPage } from "@/types/types";

const { locale: currentLocale } = useI18n();

const { data } = await useAsyncData(`home-${currentLocale.value}`, () =>
  queryContent<IPage>()
    .where({ _locale: currentLocale.value, _path: "/" })
    .findOne()
);

if (data) useContentHead(data as Ref<ParsedContent>);
</script>

<template>
  <main class="page-index">
    <div class="page-index__cover">
      <cover-component
        v-if="data"
        :title="data.coverTitle"
        :subtitle="data.coverSubtitle ?? ''"
        :uptitle="data.coverUpTitle ?? ''"
        :info="data.coverInfo"
      ></cover-component>
    </div>
    <div class="page-index__content">
      <div class="container mx-auto mt-8">
        <SheetElevation v-if="data" shadow="lg" class="xl:w-9/12">
          <ContentRenderer class="nuxt-content" :value="data" />
        </SheetElevation>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.page-index {
  &__cover {
    transition: min-height 0.25s;
    transition-timing-function: ease-out;
    min-height: 100svh;

    @apply flex flex-col;

    > * {
      @apply flex-grow;
    }
  }

  &__content {
    @apply py-16 md:py-24;
  }
}
</style>
