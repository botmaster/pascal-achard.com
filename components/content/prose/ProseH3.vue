<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports';

const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(() => props.id && headings?.anchorLinks?.h3);

const { root, splitMe } = useProseHeadingEffect();

const slots = useSlots();

// Computed - Slot content
const slotContent = computed(() => {
  if (slots.default)
    return slots.default()[0].children;
  else return '';
});
</script>

<template>
  <h3 :id="id" ref="root" class="heading">
    <span class="sr-only">{{ slotContent }}</span>
    <a
      v-if="id && generate"
      ref="splitMe"
      :href="`#${id}`"
      class="inline-block"
      tabindex="-1"
      aria-hidden="true"
    >
      <slot />
    </a>
    <span v-else ref="splitMe" aria-hidden="true"><slot /></span>
  </h3>
</template>

<style lang="scss" scoped>
.heading {
  @apply overflow-x-visible overflow-y-clip opacity-0;

  will-change: transform;

  :deep(.word) {
    will-change: transform;
  }
}
</style>
