<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports';

const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(() => props.id && headings?.anchorLinks?.h2);

const { root, splitMe } = useProseHeadingEffect();

const slots = useSlots();

// Computed - Slot content
const slotContent = computed(() => {
  if (slots.default)
    return slots.default()[0].children;
});
</script>

<template>
  <h2 :id="id" ref="root" class="fouc-hidden">
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
  </h2>
</template>

<style lang="scss" scoped></style>
