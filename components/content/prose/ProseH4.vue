<script setup lang="ts">
import { computed, useRuntimeConfig } from "#imports";

const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(() => props.id && headings?.anchorLinks?.h4);

const { root, splitMe } = useProseHeadingEffect();
</script>

<template>
  <h4 :id="id" ref="root" class="fouc-hidden">
    <a
      v-if="id && generate"
      ref="splitMe"
      :href="`#${id}`"
      class="inline-block"
    >
      <slot />
    </a>
    <slot v-else><span ref="splitMe"></span></slot>
  </h4>
</template>

<style lang="scss" scoped></style>
