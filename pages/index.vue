<script setup lang="ts">
import type { Ref } from "vue";
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";
import type { IPage } from "@/types/types";

const { locale: currentLocale } = useI18n();

const { data } = await useAsyncData(`home-${currentLocale.value}`, () =>
  queryContent<IPage>()
    .where({ _locale: currentLocale.value, _path: "/" })
    .findOne(),
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
    <div class="page-index__content-wrapper">
      <div class="container mx-auto mt-8">
        <div class="page-index__content">
          <ContentRenderer v-if="data" class="nuxt-content" :value="data" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.page-index {
  $self: &;

  &__cover {
    transition: min-height 0.25s;
    transition-timing-function: ease-out;
    min-height: 100svh;

    @apply flex flex-col;

    > * {
      @apply flex-grow;
    }
  }

  &__content-wrapper {
    @apply py-16 md:py-24;
  }

  &__content {
    @apply xl:w-8/12;
  }

  & :deep(.nuxt-content) {
    .sheet-elevation + .sheet-elevation {
      @apply mt-8 lg:mt-14 xl:mt-20;
    }
  }
}
</style>
