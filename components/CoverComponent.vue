<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const props = defineProps({
  uptitle: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    default: null,
  },
});

// Preload image with rel="preload" and as="image" with head
useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: '/images/pascal-achard/20102017-DSC06728_ufitab_c_scale_w_2560.jpg',
    },
  ],
});

// Effects setup
const root = ref<HTMLElement | null>(null);
const coverBg = ref<HTMLElement | null>(null);
const coverDimmer = ref<HTMLElement | null>(null);
const coverUptitle = ref<HTMLElement | null>(null);
const coverTitle = ref<HTMLElement | null>(null);
const coverSubtitle = ref<HTMLElement | null>(null);
const coverInfo = ref<HTMLElement | null>(null);
const iconScroll = ref<HTMLElement | null>(null);

let ctx: gsap.Context;

function initEffects() {
  ctx = gsap.context((self) => {
    if (!self || !self.selector || !root.value)
      return;

    // Intro Timeline
    const tlIntro = gsap.timeline({
      defaults: {
        ease: 'expo.out',
        duration: 3,
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
        stagger: 0.3,
      },
      0,
    );

    tlIntro.to(
      self.selector('.line-mask > *'),
      {
        startAt: {
          y: 50,
        },
        y: 0,
        stagger: 0.5,
      },
      0,
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
      '-=1.5',
    );

    // Scrub Timeline
    const tl = gsap.timeline({
      scrollTrigger: {

        start: 'bottom 99%',
        end: ScrollTrigger.isTouch === 1 ? 'bottom 30%' : 'bottom 50%',
        scrub: ScrollTrigger.isTouch === 1 ? 0.8 : 2.8,
        trigger: root.value,
        toggleActions: 'restart none none none',
        markers: false,
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
        autoAlpha: 0.8,
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
          y: -15,
        },
        '<',
      );
    }

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
            class="text-polarnight-nord-0 dark:text-white h3"
          >
            {{ subtitle }}
          </h2>
        </div>
        <div v-if="info" class="line-mask">
          <p
            ref="coverInfo"
            class="text-polarnight-nord-0 dark:text-white mt-0"
          >
            {{ info }}
          </p>
        </div>
      </div>
    </div>
    <div class="container mx-auto absolute left-0 bottom-1.5 xl:bottom-4 right-0">
      <div class="xl:w-1/2 xl:ml-auto text-center">
        <span ref="iconScroll" class="inline-block">
          <Icon name="pajamas:scroll-down" class="xl:text-2xl" />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cover {
  @apply relative invisible flex items-end overflow-hidden py-6 md:py-32 text-polarnight-nord-0 dark:text-white;

  &__background {
    @apply absolute inset-0 block w-full h-full bg-center bg-no-repeat bg-cover z-0;
    background-image: url("/images/pascal-achard/20102017-DSC06728_ufitab_c_scale_w_1024.jpg");

    @media screen and (min-width: 1024px) {
      background-image: url("/images/pascal-achard/20102017-DSC06728_ufitab_c_scale_w_1936.jpg");
    }

    @media screen and (min-width: 1280px) {
      background-image: url("/images/pascal-achard/20102017-DSC06728_ufitab_c_scale_w_2560.jpg");
    }
  }

  &__dimmer {
    @apply absolute inset-0 bg-body-background opacity-60;
  }

  &__bg-image {
    @apply inset-0 w-full h-full object-cover;
  }

  &__content {
    @apply relative z-10;
  }
}

.line-mask {
  @apply relative block overflow-hidden;
  //will-change: opacity, transform;
  > * {
    will-change: opacity, transform;
  }
}
</style>
