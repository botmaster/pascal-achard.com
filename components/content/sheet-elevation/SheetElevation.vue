<template>
  <div
    class="sheet-elevation"
    :class="[
      `sheet-elevation--is-${props.shadow}`,
      { 'sheet-elevation--is-borderless': props.isBorderless },
    ]"
  >
    <div class="sheet-elevation__content">
      <slot />
    </div>
    <div class="sheet-elevation__shadow"></div>
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

  @apply relative px-3 py-6 md:px-8 md:py-8;

  &__shadow {
    @apply absolute inset-0 bg-white dark:bg-polarnight-nord-0 rounded-lg -z-10;
  }

  &--is-borderless {
    @apply p-0;
  }

  &--is-default {
    #{$self}__shadow {
      @apply drop-shadow;
    }
  }

  &--is-md {
    #{$self}__shadow {
      @apply drop-shadow-md;
    }
  }

  &--is-sm {
    #{$self}__shadow {
      @apply drop-shadow-sm;
    }
  }

  &--is-lg {
    #{$self}__shadow {
      @apply drop-shadow-lg;
    }
  }

  &--is-nome {
    #{$self}__shadow {
      @apply drop-shadow-none;
    }
  }
}
</style>
