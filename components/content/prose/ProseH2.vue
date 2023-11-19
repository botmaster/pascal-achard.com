<script setup lang="ts">
import { computed, useRuntimeConfig } from "#imports";

const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(() => props.id && headings?.anchorLinks?.h2);

const { root } = useProseHeadingEffect();
</script>

<template>
  <h2 :id="id" ref="root" class="fouc-hidden overflow-hidden">
    <a v-if="id && generate" :href="`#${id}`" class="inline-block">
      <slot />
    </a>
    <slot v-else />
  </h2>
</template>

<style lang="scss" scoped></style>
