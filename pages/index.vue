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

const colorMode = useColorMode();

// map of color mode colors
const colors: { [key: string]: string[] } = {
  light: ["--color-nord-4", "--color-nord-5", "--color-nord-6"],
  dark: ["--color-nord-1", "--color-nord-2", "--color-nord-3"],
};

const colorMap = ref([""]);

/*
watch(
  colorMode,
  (newValue, oldValue) => {
    console.log("colorMode changed newValue, oldValue", newValue, oldValue);
    if (!process.client) return;
    colorMap.value = colors[newValue.value] || [];
  },
  { immediate: false },
);
*/

// WatchEffect
watchEffect(
  () => {
    if (!process.client) return;
    colorMap.value = colors[colorMode.value] || [];
  },
  { flush: "post" },
);

const isClient = computed(() => process.client);

onMounted(() => {
  if (!process.client) return;

  // colorMap.value = colors[colorMode.value] || [];

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
          x: -40,
        },
        {
          filter: "saturate(100%) blur(0px)",
          opacity: 1,
          x: 0,
        },
      );

      return tl;
    });
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
    <div ref="contextScope">
      <section
        v-for="(element, index) in data?.body?.children"
        :key="index"
        :style="
          isClient
            ? `background-color: rgb(var(${colorMap[index % colorMap.length]}))`
            : ''
        "
        class="page-index__content-wrapper"
      >
        <div class="container mx-auto">
          <div class="page-index__content">
            <Component :is="element.tag">
              <ContentRendererMarkdown
                v-if="element"
                class="nuxt-content"
                :value="element"
              />
            </Component>
          </div>
        </div>
      </section>
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
    @apply py-16 md:py-24 overflow-hidden;
  }

  &__content {
    @apply xl:w-8/12;
  }

  /*& :deep(.nuxt-content) {
    .sheet-elevation + .sheet-elevation {
      @apply mt-8 lg:mt-14 xl:mt-20;
    }
  }*/
}
</style>
