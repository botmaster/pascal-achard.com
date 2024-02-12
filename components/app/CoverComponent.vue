<script setup lang="ts">
import { Expo, gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Props type definition
interface IProps {
  uptitle: string
  title: string
  subtitle: string
  info?: string
  scrollToTarget?: HTMLElement | string
}

const props = defineProps<IProps>();

const { t } = useI18n();

// Effects setup
const root = ref<HTMLElement | null>(null);
const coverBg = ref<HTMLElement | null>(null);
const coverDimmer = ref<HTMLElement | null>(null);
const coverUptitle = ref<HTMLElement | null>(null);
const coverTitle = ref<HTMLElement | null>(null);
const coverSubtitle = ref<HTMLElement | null>(null);
const coverInfo = ref<HTMLElement | null>(null);
const iconScroll = ref<HTMLElement | null>(null);
const shortcuts = ref<HTMLElement | null>(null);

const { bubblesContainer } = useBubblesEffect();

let ctx: gsap.Context;

function initEffects() {
  ctx = gsap.context((self) => {
    if (!self || !self.selector || !root.value)
      return;

    // Intro Timeline
    const tlIntro = gsap.timeline({
      defaults: {
        ease: 'expo.out',
        duration: 1.4,
        force3D: true,
        immediateRender: true,
      },
    });

    tlIntro.set(root.value, {
      autoAlpha: 1,
    });

    tlIntro.to(
      coverDimmer.value,
      {
        opacity: 0.6,
        duration: 0.8,
        ease: 'linear',
        startAt: {
          opacity: 1,
        },
      },
      0.1,
    );

    tlIntro.to(
      self.selector('.line-mask'),
      {
        startAt: {
          y: 310,
        },
        y: 0,
        stagger: 0.15,
      },
      0,
    );

    tlIntro.to(
      self.selector('.line-mask > *'),
      {
        startAt: {
          y: 60,
        },
        y: 0,
        stagger: 0.25,
      },
      0,
    );

    tlIntro.to(
      shortcuts.value?.children as HTMLCollection,
      {
        startAt: {
          x: 15,
          opacity: 0,
        },
        x: 0,
        opacity: 1,
        stagger: 0.2,
      },
      '>-0.8',
    );

    tlIntro.to(
      iconScroll.value,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        startAt: {
          y: -60,
          opacity: 0,
        },
      },
      '>-0.8',
    );

    // Scrub Timeline
    const tl = gsap.timeline({
      scrollTrigger: {

        start: 'bottom 92%',
        end: ScrollTrigger.isTouch === 1 ? 'bottom 30%' : 'bottom 50%',
        scrub: ScrollTrigger.isTouch === 1 ? 0.8 : 2.8,
        trigger: root.value,
        toggleActions: 'restart none none none',
      },
      onStart: () => {
        if (!self || !self.selector)
          return;
        self.selector('.line-mask').map((el: HTMLElement) => {
          return gsap.set(el, {
            overflow: 'visible',
          });
        });

        tlIntro.pause();
        tlIntro.time(tlIntro.totalDuration());
        tlIntro.kill();
      },
      overwrite: 'auto',
      defaults: {
        overwrite: 'auto',
      },
    });

    tl.set(root.value, {
      autoAlpha: 1,
    });

    tl.to(
      coverDimmer.value,
      {
        autoAlpha: 0,
      },
      '<',
    );

    tl.to(
      coverUptitle.value,
      {
        autoAlpha: 0,
        y: -200,
      },
      '<',
    );

    tl.to(
      coverTitle.value,
      {
        autoAlpha: 0,
        y: -110,
      },
      '<',
    );

    tl.to(
      coverSubtitle.value,
      {
        autoAlpha: 0,
        y: -60,
      },
      '<',
    );

    if (props.info) {
      tl.to(
        coverInfo.value,
        {
          autoAlpha: 0,
          y: -30,
        },
        '<',
      );
    }

    tl.to(
      shortcuts.value,
      {
        autoAlpha: 0,
        y: props.info ? -15 : -30,
      },
      '<',
    );

    tl.to(
      iconScroll.value,
      {
        autoAlpha: 0,
        y: 100,
      },
      '<',
    );
  }, root.value || undefined);
}

onMounted(() => {
  if (!process.client)
    return;
  initEffects();
});

onBeforeUnmount(() => {
  if (!process.client)
    return;
  ctx.revert();
});
</script>

<template>
  <div ref="root" class="cover">
    <div ref="coverBg" class="cover__background" />
    <div ref="bubblesContainer" class="cover__bubbles" />
    <div ref="coverDimmer" class="cover__dimmer" />
    <div class="cover__content">
      <div class="container mx-auto">
        <div class="line-mask">
          <p ref="coverUptitle">
            {{ uptitle }}
          </p>
        </div>
        <div class="line-mask">
          <h1 ref="coverTitle" class="text-polarnight-nord-0 dark:text-white">
            {{ title }}
          </h1>
        </div>
        <div class="line-mask">
          <h2
            ref="coverSubtitle"
            class="h3 text-polarnight-nord-0 dark:text-white"
          >
            {{ subtitle }}
          </h2>
        </div>
        <div v-if="info" class="line-mask">
          <p
            ref="coverInfo"
            class="mt-0 text-polarnight-nord-0 dark:text-white"
          >
            {{ info }}
          </p>
        </div>
        <p ref="shortcuts" class="mt-0.5 flex flex-wrap gap-3 md:gap-5">
          <a
            class="inline-flex items-center leading-[0]"
            href="https://www.linkedin.com/in/pascal-achard" target="_blank" rel="noopener"
          >
            <Icon class="mr-1" size="1.2em" name="mdi:linkedin" />
            <span class="leading-none">{{ t('miscellaneous.contactMe') }}</span>
          </a>
          <a
            class="inline-flex items-center leading-[0]"
            href="/pdf/CV-Pascal-Achard-2023.pdf"
            target="_blank"
            rel="noopener"
          >
            <Icon class="mr-1 " name="mdi:file-document" size="1.2em" />
            <span class="leading-none">CV <span class="text-xs no-underline">(PDF, 46Ko)</span></span>
          </a>
        </p>
      </div>
    </div>
    <div class="cover__bottom-gradient" />
    <div class="container absolute inset-x-0 bottom-4 z-40 mx-auto xl:bottom-4">
      <div class="text-center xl:ml-auto xl:w-1/2">
        <template v-if="props.scrollToTarget">
          <button ref="iconScroll" :title="t('miscellaneous.scrollToContent')" class="inline-block" @click.prevent="$lenisInstance.scrollTo(scrollToTarget, { easing: Expo.easeInOut, lerp: 0 })">
            <Icon name="pajamas:scroll-down" class="text-xl xl:text-2xl" />
          </button>
        </template>
        <template v-else>
          <span ref="iconScroll" :title="t('miscellaneous.scrollToContent')" class="inline-block">
            <Icon name="pajamas:scroll-down" class="text-xl xl:text-2xl" />
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cover {
  @apply relative opacity-0 flex items-end overflow-hidden py-12 md:py-32 text-polarnight-nord-0 dark:text-white;

  &__background {
    @apply absolute inset-0 block w-full h-full bg-transparent z-0;
    background-image: linear-gradient(to right top, #88c0d0, #84c4d2, #7fc7d4, #7bcbd5, #77ced5, #74d1d5, #72d3d4, #70d6d3, #6fd9d1, #6edccf, #6fdfcc, #71e2c9);
  }

  &__bubbles {
    @apply absolute inset-0 z-[20] block w-full h-full overflow-hidden blur-2xl mix-blend-plus-lighter dark:mix-blend-luminosity;
  }

  &__dimmer {
    @apply absolute inset-0 bg-body-background z-30;
  }

  &__content {
    @apply relative z-40;
  }

  &__bottom-gradient {
    @apply absolute inset-x-0 z-[25] bottom-0 h-[80%] bg-gradient-to-t from-body-background to-transparent;
  }
}

:deep(.bubble) {
  @apply absolute block rounded-full bottom-0 bg-[red];
  will-change: transform, opacity, filter;
}

.line-mask {
  @apply relative block overflow-y-clip;
  //will-change: opacity, transform;
  > * {
    will-change: opacity, transform;
  }
}
</style>
