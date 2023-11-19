<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useImage } from "@vueuse/core";
import coverImageSrc from "@/assets/images/pascal-achard/pascal-achard.jpg";
import coverImage1024 from "@/assets/images/pascal-achard/20102017-DSC06728_ufitab_c_scale_w_1024.jpg";
import coverImage1936 from "@/assets/images/pascal-achard/20102017-DSC06728_ufitab_c_scale_w_1936.jpg";
import coverImage2560 from "@/assets/images/pascal-achard/20102017-DSC06728_ufitab_c_scale_w_2560.jpg";

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
const { isReady, isLoading } = useImage({
  src: coverImageSrc,
  srcset: [
    `${coverImage1024} 1024w`,
    `${coverImage1936} 1936w`,
    `${coverImage2560} 2560w`,
  ].join(", "),
  sizes: "(max-width: 1024px) 100vw, 2560px",
  crossorigin: "anonymous",
  referrerPolicy: "no-referrer",
});

// Effects setup
const root = ref<HTMLElement | null>(null);
const coverBgImg = ref<HTMLElement | null>(null);
const coverUptitle = ref<HTMLElement | null>(null);
const coverTitle = ref<HTMLElement | null>(null);
const coverSubtitle = ref<HTMLElement | null>(null);
const coverInfo = ref<HTMLElement | null>(null);

let ctx: gsap.Context;

function initEffects() {
  console.log("initEffects");
  ctx = gsap.context((self) => {
    if (!self || !self.selector || !root.value) return;

    // Intro Timeline
    const tlIntro = gsap.timeline({
      defaults: {
        ease: "expo.out",
        duration: 3,
        force3D: true,
      },
    });

    tlIntro.set(root.value, {
      autoAlpha: 1,
    });

    tlIntro.from(
      coverBgImg.value,
      {
        opacity: 0,
        duration: 1.5,
        ease: "linear",
      },
      0,
    );

    tlIntro.from(
      self.selector(".line-mask"),
      {
        y: 310,
        stagger: 0.3,
      },
      0.2,
    );

    tlIntro.from(
      self.selector(".line-mask > *"),
      {
        y: 50,
        stagger: 0.5,
      },
      0.2,
    );

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
        if (!self || !self.selector) return;
        self.selector(".line-mask").map((el: HTMLElement) => {
          return gsap.set(el, {
            overflow: "visible",
          });
        });

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
}

onMounted(() => {
  console.log("onMounted");
  console.log("isReady", isReady.value);
  if (!process.client) return;

  if (isReady.value) {
    initEffects();
  } else {
    // watch isReady
    watch(isReady, async (value, oldValue) => {
      console.log("isReady old value", oldValue);
      console.log("isReady", value);
      if (value) {
        await nextTick();
        initEffects();
      }
    });
  }
});

onBeforeUnmount(() => {
  if (!process.client) return;
  ctx.revert();
});
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center h-full">
    <p>...</p>
  </div>
  <div v-else ref="root" class="cover">
    <div class="cover__background">
      <img
        ref="coverBgImg"
        alt="Pascal Achard - Senior Frontend Developer"
        class="cover__bg-image"
        height="1280"
        sizes="(max-width: 1024px) 100vw, 2560px"
        :src="coverImageSrc"
        :srcset="`${coverImage1024} 1024w, ${coverImage1936} 1936w, ${coverImage2560} 2560w`"
      />
    </div>

    <div class="cover__dimmer"></div>
    <div class="container mx-auto px-container md:px-container-md relative">
      <div>
        <div class="line-mask">
          <p ref="coverUptitle" class="text-polarnight-nord-0 dark:text-white">
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
  </div>
</template>

<style scoped lang="scss">
.cover {
  @apply opacity-0 relative flex items-end overflow-hidden py-6 md:py-32;

  &__background {
    @apply absolute inset-0 block w-full h-full;
  }

  &__dimmer {
    @apply absolute inset-0 bg-body-background dark:bg-body-backgrounddark opacity-60;
  }

  &__bg-image {
    @apply inset-0 w-full h-full object-cover;
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
