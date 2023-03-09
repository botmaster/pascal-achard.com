<script setup lang="ts"></script>

<template>
  <div class="hero">
    <div class="hero__background">
      <img src="~/assets/images/hero.jpg" alt="" />
    </div>

    <div class="hero__dimmer absolute inset-0"></div>
    <div class="relative container mx-auto">
      <h1 class="text-white">Hero</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  @apply relative flex items-end overflow-hidden py-6 md:py-32 md:min-h-[60vh];

  &__background {
    @apply absolute inset-0 block w-full h-full;

    > img {
      @apply block object-cover bg-center w-full h-full;
    }
  }

  &__dimmer {
    @apply bg-polarnight-nord-0/30;
    // background-color: rgba(0, 0, 0, 0.5);
  }

  h2 {
    @apply text-white;
  }
}
</style>
