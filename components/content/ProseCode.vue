<!--<template>
  <div>
    <pre class="text-xs text-black">
      {{ JSON.parse(jsonString) }}
    </pre>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  jsonString: {
    type: String,
    default: "",
  },
});
</script>

<style scoped></style>-->

<script lang="ts">
import { defineComponent } from "#imports";

export default defineComponent({
  props: {
    code: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: null,
    },
    filename: {
      type: String,
      default: null,
    },
    highlights: {
      type: Array as () => number[],
      default: () => [],
    },
    meta: {
      type: String,
      default: null,
    },
    extra: {
      type: String,
      default: null,
    },
  },
});
</script>

<template>
  {{ $props }}
  <pre v-if="extra">
    {{ JSON.parse(extra) }}
  </pre>
  <slot />
</template>

<style>
pre code .line {
  display: block;
  min-height: 1rem;
}
</style>
