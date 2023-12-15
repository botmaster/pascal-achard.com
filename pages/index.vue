<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { IPage } from '@/types/types';

gsap.registerPlugin(ScrollTrigger);

const { locale: currentLocale } = useI18n();

const { data } = await useAsyncData(`home-${currentLocale.value}`, () =>
  queryContent<IPage>()
    .where({ _locale: currentLocale.value, _path: '/' })
    .findOne());

if (data)
  useContentHead(data as any); // TODO: fix type

// Animation setup
const contextScope = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

const colorMode = useColorMode();

// map of color mode colors
const colors: { [key: string]: string[] } = {
  light: [],
  dark: [],
};

const colorMap = ref(['']);

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
    if (!process.client)
      return;
    colorMap.value = colors[colorMode.value] || [];
  },
  { flush: 'post' },
);

const isClient = computed(() => process.client);

onMounted(() => {
  if (!process.client)
    return;

  ctx = gsap.context((self) => {
    if (!self || !self.selector)
      return;
    self.selector('.sheet-elevation').map((sheet: HTMLElement) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          start: 'top 90%',
          end: 'top 64%',
          scrub: ScrollTrigger.isTouch === 1 ? true : 2.8,
          markers: false,
          trigger: sheet,
        },
        defaults: {
          ease: 'power1.out',
        },
      });

      tl.fromTo(
        sheet,
        {
          filter: 'brightness(200%) blur(100px)',
          opacity: 0.6,
          y: 100,
        },
        {
          filter: 'brightness(100%) blur(0px)',
          opacity: 1,
          y: 0,
        },
      );

      return tl;
    });
  }, contextScope.value || undefined);
});

onUnmounted(() => {
  if (!process.client)
    return;
  ctx.revert();
});
</script>

<template>
  <main class="page-index">
    <div class="page-index__cover">
      <AppLoader class="!absolute inset-0 m-auto z-0" />
      <CoverComponent
        v-if="data"
        :title="data.coverTitle"
        :subtitle="data.coverSubtitle ?? ''"
        :uptitle="data.coverUpTitle ?? ''"
        :info="data.coverInfo"
      />
    </div>
    <div ref="contextScope" class="page-index__section-wrapper">
      <section
        v-for="(element, index) in data?.body?.children"
        :key="index"
        :style="
          isClient
            ? `background-color: hsl(var(${colorMap[index % colorMap.length]}))`
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
    @apply relative xl:fixed xl:top-0 w-full flex flex-col;

    > * {
      @apply flex-grow;
    }
  }

  &__section-wrapper {
    @apply relative xl:mt-[calc(100vh)];
  }

  &__content-wrapper {
    @apply py-8 md:py-24;
  }

  &__content {
    @apply xl:w-1/2 ml-auto;
  }
}
</style>
