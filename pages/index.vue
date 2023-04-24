<script setup lang="ts">
import type {
  MarkdownParsedContent,
  ParsedContent,
} from "@nuxt/content/dist/runtime/types";
import { Ref } from "vue";

// Todo: move to a separate file.
interface IPage extends MarkdownParsedContent {
  coverTitle: string;
  coverSubtitle: string;
  coverInfo: string;
}

const { locale: currentLocale } = useI18n();

const { data } = await useAsyncData(`home-${currentLocale.value}`, () =>
  queryContent<IPage>()
    .where({ _locale: currentLocale.value, _path: "/" })
    .findOne()
);

if (data) useContentHead(data as Ref<ParsedContent>);

onMounted(() => {
  // console.log("mounted");
  resizeHandler();
  // We listen to the resize event
  window.addEventListener("resize", resizeHandler);
});

onBeforeUnmount(() => {
  // console.log("unmounted");
  window.removeEventListener("resize", resizeHandler);
});

const resizeHandler = () => {
  // console.log("resize");
  // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
  const vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
</script>

<template>
  <main class="page-index">
    <div class="page-index__cover">
      <cover-component
        v-if="data"
        :title="data.coverTitle"
        :subtitle="data.coverSubtitle"
        :uptitle="data.coverUpTitle"
        :info="data.coverInfo"
      ></cover-component>
    </div>
    <div class="page-index__content">
      <div class="container mx-auto mt-8">
        <SheetElevation v-if="data" shadow="lg" class="md:w-9/12">
          <ContentRenderer class="nuxt-content" :value="data" />
        </SheetElevation>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.page-index {
  &__cover {
    //transition: all 1s;

    // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    min-height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
    min-height: calc(var(--vh, 1vh) * 100);

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
