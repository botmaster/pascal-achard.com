<template>
  <div
    class="sheet-elevation"
    :class="[
      `sheet-elevation--is-${props.shadow}`,
      { 'sheet-elevation--is-borderless': props.isBorderless },
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
  shadow: {
    type: String as PropType<"sm" | "default" | "md" | "lg" | "none">,
    default: "default",
    required: false,
  },
  isBorderless: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.sheet-elevation {
  $self: &;

  @apply bg-white dark:bg-polarnight-nord-0 rounded-lg px-3 py-6 md:px-8 md:py-8;

  &--is-borderless {
    @apply p-0;
  }

  &--is-default {
    @apply drop-shadow;
  }

  &--is-md {
    @apply drop-shadow-md;
  }

  &--is-sm {
    @apply drop-shadow-sm;
  }

  &--is-lg {
    @apply drop-shadow-lg;
  }

  &--is-nome {
    @apply drop-shadow-none;
  }
}
</style>
