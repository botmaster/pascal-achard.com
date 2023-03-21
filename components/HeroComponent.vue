<script setup lang="ts"></script>

<template>
  <div class="hero">
    <div class="hero__background">
      <slot name="background">
        <img src="https://picsum.photos/1920/1080" alt="" />
      </slot>
    </div>

    <div class="hero__dimmer"></div>
    <div class="hero__content">
      <slot name="content">
        <h1>Titre</h1>
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  @apply relative flex items-end overflow-hidden py-6 min-h-[30vh] md:py-32 md:min-h-[60vh];

  &__background {
    @apply absolute inset-0 block w-full h-full;

    :slotted(img) {
      @apply w-full h-full object-cover object-center;
    }
  }

  &__dimmer {
    @apply absolute inset-0 bg-polarnight-nord-0/50;
    // background-color: rgba(0, 0, 0, 0.5);
  }

  &__content {
    @apply relative container mx-auto;
  }

  h1,
  h2 {
    @apply text-white;
  }
}
</style>
