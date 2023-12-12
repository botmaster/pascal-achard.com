<script setup lang="ts">
const props = defineProps<{
  name: string
}>();

const icon = defineAsyncComponent(
  () => import(`~/assets/svgs/${props.name}.svg?component`),
);
</script>

<template>
  <component :is="icon" />
</template>

<style scoped></style>
