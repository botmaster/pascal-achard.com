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

// Effects setup
const contextScope = ref<gsap.Context[]>();
let ctx: gsap.Context;

onMounted(() => {
  if (!process.client) return;

  const scrollTriggerConfig: ScrollTrigger.Vars = {
    markers: false,
    start: "bottom 90%",
    end: ScrollTrigger.isTouch === 1 ? "bottom 30%" : "bottom 50%",
    scrub: ScrollTrigger.isTouch === 1 ? true : 2.8,
  };

  ctx = gsap.context((self) => {
    if (!self || !self.selector) return;

    const trigger = self.selector(".cover__background");

    const tl = gsap.timeline({
      scrollTrigger: {
        ...scrollTriggerConfig,
        trigger,
      },
    });

    tl.to(
      self.selector("#cover__uptitle"),
      {
        opacity: -0.3,
        y: -200,
      },
      0,
    );
    tl.to(
      self.selector("#cover__title"),
      {
        opacity: -0.2,
        y: -110,
      },
      0,
    );
    tl.to(
      self.selector("#cover__subtitle"),
      {
        opacity: -0.1,
        y: -60,
      },
      0,
    );

    if (props.info) {
      tl.to(
        self.selector("#cover__info"),
        {
          opacity: 0,
          y: -15,
        },
        0,
      );
    }

    tl.to(
      self.selector("#cover__bg-img"),
      {
        opacity: -0.5,
      },
      0,
    );
  }, contextScope.value);
});

onUnmounted(() => {
  if (!process.client) return;
  ctx.revert();
});
</script>

<template>
  <div ref="contextScope" class="cover">
    <div class="cover__background">
      <img
        id="cover__bg-img"
        alt="Pascal Achard - Senior Frontend Developer"
        class="cover__bg-image"
        height="1280"
        sizes="(max-width: 1024px) 100vw, 2560px"
        src="@/assets/images/pascal-achard/pascal-achard.jpg"
        srcset="
          @/assets/images/pascal-achard/20102017-DSC06728_ufitab_c_scale_w_1024.jpg 1024w,
          @/assets/images/pascal-achard/20102017-DSC06728_ufitab_c_scale_w_1936.jpg 1936w,
          @/assets/images/pascal-achard/20102017-DSC06728_ufitab_c_scale_w_2560.jpg 2560w
        "
        width="1920"
      />
    </div>

    <div class="cover__dimmer"></div>
    <div class="container mx-auto px-container md:px-container-md relative">
      <div>
        <p
          id="cover__uptitle"
          class="text-polarnight-nord-0 dark:text-white block"
        >
          {{ uptitle }}
        </p>
        <h1 id="cover__title" class="text-polarnight-nord-0 dark:text-white">
          {{ title }}
        </h1>
        <h2
          id="cover__subtitle"
          class="text-polarnight-nord-0 dark:text-white h3"
        >
          {{ subtitle }}
        </h2>
        <p
          v-if="info"
          id="cover__info"
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
  @apply relative flex items-end overflow-hidden py-6 md:py-32;

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
