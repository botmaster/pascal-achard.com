<script setup lang="ts">
import { computed, useRuntimeConfig } from "#imports";

const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(() => props.id && headings?.anchorLinks?.h3);

const { root } = useProseHeadingEffect();
</script>

<template>
  <h3 :id="id" ref="root" class="fouc-hidden overflow-hidden">
    <a v-if="id && generate" :href="`#${id}`" class="inline-block">
      <slot />
    </a>
    <slot v-else />
  </h3>
</template>

<style lang="scss" scoped></style>
