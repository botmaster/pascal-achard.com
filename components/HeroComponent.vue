<script setup lang="ts">
import { gsap } from 'gsap';

const root = ref<HTMLElement | null>(null);
const bubbles = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!process.client)
    return;

  const bubbleCount = 20;
  const bubbleSizeMin = 300;
  const bubbleSizeMax = 800;
  const bubbleColors = [
    'hsl(var(--color-primary)/100)',
    'hsl(var(--color-red)/100)',
    'hsl(var(--color-yellow)/100)',
  ];

  const createBubble = () => {
    const size = gsap.utils.random(bubbleSizeMin, bubbleSizeMax);
    const bubble = document.createElement('span');
    bubble.dataset.size = `${size}`;
    bubble.classList.add('bubble');
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.backgroundColor = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
    bubble.style.left = `${gsap.utils.random(-15, 100)}%`;
    return bubble;
  };

  const animateBubble = (bubble: HTMLElement) => {
    gsap.to(bubble, {
      force3D: true,
      duration: gsap.utils.random(3, 10),
      opacity: 0,
      scale: gsap.utils.random(0.5, 0.8),
      y: root.value?.clientHeight ? root.value.clientHeight * 0.5 * -1 + (bubble.clientHeight / 2) : 0,
      ease: 'linear',
      repeat: -1,
      delay: gsap.utils.random(0, 30) * -1,
      startAt: { y: bubble.clientHeight, opacity: 1.3 },
      onRepeat: (self) => {
        gsap.set(self, { left: `${gsap.utils.random(-15, 100)}%` });
      },
      onRepeatParams: [bubble],
    });
  };

  const createBubbles = () => {
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = createBubble();
      bubbles.value?.appendChild(bubble);
      animateBubble(bubble);
    }
  };

  createBubbles();

  gsap.to(bubbles.value, {
    force3D: true,
    duration: 1,
    opacity: 1,
    ease: 'none',
    startAt: { opacity: 0 },
  });
});
</script>

<template>
  <div ref="root" class="hero">
    <div class="hero__background">
      <slot name="background">
        <!--        <img src="https://picsum.photos/1920/1080" alt=""> -->
      </slot>
    </div>

    <div ref="bubbles" class="hero__bubbles">
      coucou
    </div>

    <div class="hero__dimmer" />
    <div class="hero__content">
      <slot name="content">
        <h1>Titre</h1>
      </slot>
    </div>
    <div class="hero__bottom-gradient" />
  </div>
</template>

<style scoped lang="scss">
.hero {
  @apply relative flex items-end overflow-hidden py-6 min-h-[30vh] md:py-32 md:min-h-[60vh];

  &__background {
    @apply absolute inset-0 z-0 block w-full h-full;
    background-image: linear-gradient(to right top, #88c0d0, #84c4d2, #7fc7d4, #7bcbd5, #77ced5, #74d1d5, #72d3d4, #70d6d3, #6fd9d1, #6edccf, #6fdfcc, #71e2c9);

    :slotted(img) {
      @apply w-full h-full object-cover object-center;
    }
  }

  &__bubbles {
    @apply absolute inset-0 z-[2] block w-full h-full overflow-hidden  blur-2xl mix-blend-plus-lighter;

  }

  &__dimmer {
    @apply absolute inset-0 z-[1]  dark:bg-primary dark:opacity-0 hidden;
  }

  &__content {
    @apply relative z-10 container mx-auto;
  }

  &__bottom-gradient {
    @apply absolute inset-x-0 z-[3] bottom-0 h-[80%] bg-gradient-to-t from-body-background to-transparent;
  }

  h1,
  h2 {
    @apply text-white;
  }
}

:deep(.bubble) {
  @apply absolute block rounded-full bottom-0  will-change-transform bg-[red];
}
</style>
