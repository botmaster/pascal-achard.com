<script setup lang="ts">
defineProps({
  uptitle: {
    type: String,
    default: "Hi, that's me",
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

const isScrolling = ref(false);
const scrollPosition = ref(0);

const scrollPercent = computed(() => {
  if (process.client) {
    return parseFloat((scrollPosition.value / window.innerHeight).toFixed(2));
  }
  return 0;
});

const imageStyle = computed(() => {
  return {
    transform: `translateY(${Math.round(
      scrollPosition.value * 0.4
    )}px) perspective(50px) translateZ(${scrollPercent.value / 0.08}px)`,
  };
});

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});

const onScroll = () => {
  if (!isScrolling.value) {
    window.requestAnimationFrame(() => {
      scrollPosition.value = window.scrollY;
      isScrolling.value = false;
    });
    isScrolling.value = true;
  }
};
</script>

<template>
  <div class="cover">
    <div class="cover__background">
      <img
        :style="imageStyle"
        alt="Pascal Achard - Senior Frontend Developer"
        class="inset-0 w-full h-full"
        height="1280"
        sizes="(max-width: 1024px) 100vw, 2560px"
        src="~/assets/images/pascal-achard/pascal-achard.jpg"
        srcset="
          ~/assets/images/pascal-achard/20102017-DSC06728_ufitab_c_scale_w_1024.jpg 1024w,
          ~/assets/images/pascal-achard/20102017-DSC06728_ufitab_c_scale_w_1936.jpg 1936w,
          ~/assets/images/pascal-achard/20102017-DSC06728_ufitab_c_scale_w_2560.jpg 2560w
        "
        width="1920"
      />
      <!--      <nuxt-img
        :style="imageStyle"
        src="/cover-image.jpg"
        class="inset-0 w-full h-full"
        sizes="lg:100vw xl:100vw xxl:1936px"
        format="webp"
        alt="Pascal Achard - Senior Frontend Developer"
      />-->
    </div>

    <div
      :style="{
        // backgroundColor: `rgba(0, 0, 0, ${0.5 + scrollPercent * 0.5})`,
        opacity: 0.5 + scrollPercent,
      }"
      class="cover__dimmer absolute inset-0"
    ></div>
    <div class="container mx-auto px-container md:px-container-md relative">
      <div>
        <p
          :style="{
            transform: `translateY(-${0.36 * scrollPosition}px)`,
            opacity: 1 - scrollPercent * 2.1,
          }"
          class="text-white block"
        >
          {{ uptitle }}
        </p>
        <h1
          :style="{
            transform: `translateY(-${0.26 * scrollPosition}px)`,
            opacity: 1 - scrollPercent * 1.9,
          }"
          class="text-white"
        >
          {{ title }}
        </h1>
        <h2
          :style="{
            transform: `translateY(-${0.18 * scrollPosition}px)`,
            opacity: 1 - scrollPercent * 1.7,
          }"
          class="text-white h3"
        >
          {{ subtitle }}
        </h2>
        <p
          v-if="info"
          :style="{
            transform: `translateY(-${0.12 * scrollPosition}px)`,
            opacity: 1 - scrollPercent * 1.5,
          }"
          class="text-white mt-0"
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

    > img {
      transform: scale(1);
      display: block;
      object-fit: cover;
    }
  }

  &__dimmer {
    @apply bg-polarnight-nord-0;
    // background-color: rgba(0, 0, 0, 0.5);
  }

  h2 {
    @apply text-white;
  }
}
</style>
