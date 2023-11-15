<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

// Loading images
/* const { isReady } = useImage({
  src: coverImageSrc,
  srcset: [coverImage1024, coverImage1936, coverImage2560].join(", "),
  sizes: "(max-width: 1024px) 100vw, 2560px",
}); */

// Effects setup
const root = ref<HTMLElement | null>(null);
const coverBgImg = ref<HTMLElement | null>(null);
const coverUptitle = ref<HTMLElement | null>(null);
const coverTitle = ref<HTMLElement | null>(null);
const coverSubtitle = ref<HTMLElement | null>(null);
const coverInfo = ref<HTMLElement | null>(null);

let ctx: gsap.Context;

onMounted(() => {
  if (!process.client) return;

  // Context.
  ctx = gsap.context((self) => {
    if (!self || !self.selector || !root.value) return;

    // Intro Timeline
    const tlIntro = gsap.timeline({
      onStart: () => {
        console.log("Intro Timeline start");
      },
      defaults: {
        ease: "power2.Out",
        overwrite: "auto",
      },
      overwrite: "auto",
    });

    tlIntro.set(root.value, {
      autoAlpha: 1,
    });

    tlIntro.from(
      coverBgImg.value,
      {
        autoAlpha: 0,
        duration: 0.4,
        ease: "linear",
      },
      0,
    );
    tlIntro.from(
      coverUptitle.value,
      {
        autoAlpha: 0,
        x: 10,
        duration: 0.8,
      },
      "-=0.1",
    );
    tlIntro.from(
      coverTitle.value,
      {
        autoAlpha: 0,
        x: 10,
        duration: 0.8,
      },
      "-=0.5",
    );
    tlIntro.from(
      coverSubtitle.value,
      {
        autoAlpha: 0,
        x: 10,
        duration: 0.8,
      },
      "-=0.5",
    );
    if (props.info) {
      tlIntro.from(
        coverInfo.value,
        {
          autoAlpha: 0,
          x: 10,
          duration: 0.8,
        },
        "-=0.5",
      );
    }

    // Scrub Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        markers: false,
        start: "bottom 90%",
        end: ScrollTrigger.isTouch === 1 ? "bottom 30%" : "bottom 50%",
        scrub: ScrollTrigger.isTouch === 1 ? 0.8 : 2.8,
        trigger: root.value,
        toggleActions: "restart none none none",
      },
      onStart: () => {
        console.log("Scrub Timeline start");
        tlIntro.pause();
        tlIntro.time(tlIntro.totalDuration());
        tlIntro.kill();
      },
      overwrite: "auto",
      defaults: {
        overwrite: "auto",
      },
    });

    tl.set(root.value, {
      autoAlpha: 1,
    });

    tl.to(
      coverBgImg.value,
      {
        autoAlpha: 0,
      },
      "<",
    );

    tl.to(
      coverUptitle.value,
      {
        autoAlpha: 0,
        y: -200,
      },
      "<",
    );

    tl.to(
      coverTitle.value,
      {
        autoAlpha: 0,
        y: -110,
      },
      "<",
    );

    tl.to(
      coverSubtitle.value,
      {
        autoAlpha: 0,
        y: -60,
      },
      "<",
    );

    if (props.info) {
      tl.to(
        coverInfo.value,
        {
          autoAlpha: 0,
          y: -15,
        },
        "<",
      );
    }
  }, root.value || undefined);
});

onBeforeUnmount(() => {
  if (!process.client) return;
  ctx.revert();
});
</script>

<template>
  <div ref="root" class="cover">
    <div class="cover__background">
      <img
        ref="coverBgImg"
        alt="Pascal Achard - Senior Frontend Developer"
        class="cover__bg-image"
        height="1280"
        sizes="(max-width: 1024px) 100vw, 2560px"
        src="/images/pascal-achard/pascal-achard.jpg"
        srcset="
          /images/pascal-achard/20102017-DSC06728_ufitab_c_scale_w_1024.jpg 1024w,
          /images/pascal-achard/20102017-DSC06728_ufitab_c_scale_w_1936.jpg 1936w,
          /images/pascal-achard/20102017-DSC06728_ufitab_c_scale_w_2560.jpg 2560w
        "
        width="1920"
      />
    </div>

    <div class="cover__dimmer"></div>
    <div class="container mx-auto px-container md:px-container-md relative">
      <div>
        <p
          ref="coverUptitle"
          class="text-polarnight-nord-0 dark:text-white block"
        >
          {{ uptitle }}
        </p>
        <h1 ref="coverTitle" class="text-polarnight-nord-0 dark:text-white">
          {{ title }}
        </h1>
        <h2
          ref="coverSubtitle"
          class="text-polarnight-nord-0 dark:text-white h3"
        >
          {{ subtitle }}
        </h2>
        <p
          v-if="info"
          ref="coverInfo"
          class="text-polarnight-nord-0 dark:text-white mt-0"
        >
          {{ info }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cover {
  @apply invisible relative flex items-end overflow-hidden py-6 md:py-32;

  &__background {
    @apply absolute inset-0 block w-full h-full;
  }

  &__dimmer {
    @apply absolute inset-0 bg-body-background dark:bg-body-backgrounddark opacity-60;
  }

  &__bg-image {
    object-fit: cover;
    @apply inset-0 w-full h-full object-cover;
  }
}
</style>
