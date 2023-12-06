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
const contextScope = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

onMounted(() => {
  if (!process.client) return;

  ctx = gsap.context((self) => {
    if (!self || !self.selector) return;
    self.selector(".sheet-elevation").map((sheet: HTMLElement) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          start: "top 90%",
          end: "top 64%",
          scrub: ScrollTrigger.isTouch === 1 ? true : 2.8,
          markers: true,
          trigger: sheet,
        },
      });

      tl.fromTo(
        sheet,
        {
          filter: "saturate(0%) blur(5px)",
          opacity: 0,
          y: 160,
        },
        {
          filter: "saturate(100%) blur(0px)",
          opacity: 1,
          y: 0,
        },
      );

      return tl;
    }, contextScope.value || undefined);
  }, contextScope.value || undefined);
});

onUnmounted(() => {
  if (!process.client) return;
  ctx.revert();
});
</script>

<template>
  <main class="page-index">
    <div class="page-index__cover">
      <AppLoader class="!absolute inset-0 m-auto z-0"></AppLoader>
      <CoverComponent
        v-if="data"
        :title="data.coverTitle"
        :subtitle="data.coverSubtitle ?? ''"
        :uptitle="data.coverUpTitle ?? ''"
        :info="data.coverInfo"
      ></CoverComponent>
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
    min-height: calc(
      100svh - 2px
    ); // Because of lighthouse LCP issue with 100svh.  //TODO: fix LCP issue
    @apply relative flex flex-col;

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
