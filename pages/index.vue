<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IPage } from "@/types/types";

gsap.registerPlugin(ScrollTrigger);

const { locale: currentLocale } = useI18n();

const { data } = await useAsyncData(`home-${currentLocale.value}`, () =>
  queryContent<IPage>()
    .where({ _locale: currentLocale.value, _path: "/" })
    .findOne(),
);

if (data) useContentHead(data as any); // TODO: fix type

// Animation setup
const contextScope = ref<gsap.Context[]>();
let ctx: gsap.Context;

onMounted(() => {
  if (!process.client) return;

  const scrollTriggerConfig: ScrollTrigger.Vars = {
    start: "top 90%",
    end: "100 84%",
    scrub: ScrollTrigger.isTouch === 1 ? true : 2.8,
    markers: false,
  };

  ctx = gsap.context((self) => {
    if (!self || !self.selector) return;
    self.selector(".sheet-elevation").map((sheet: HTMLElement) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          ...scrollTriggerConfig,
          trigger: sheet,
        },
      });

      tl.fromTo(
        sheet,
        {
          filter: "saturate(0%) blur(5px)",
          opacity: 0,
          y: 120,
        },
        {
          filter: "saturate(100%) blur(0px)",
          opacity: 1,
          y: 0,
        },
      );

      return tl;
    }, contextScope.value);

    self.selector(["h2", "h3"]).map((sheet: HTMLElement) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          ...scrollTriggerConfig,
          trigger: sheet,
        },
      });

      tl.fromTo(
        sheet,
        {
          opacity: 0,
          x: 20,
        },
        {
          opacity: 1,
          x: 0,
        },
      );

      return tl;
    });
  }, contextScope.value);
});

onUnmounted(() => {
  if (!process.client) return;
  ctx.revert();
});
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
        <div ref="contextScope" class="page-index__content">
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
