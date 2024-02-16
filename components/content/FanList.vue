<script setup lang="ts">
import { fanItems } from '~/data/fanItems';
</script>

<template>
  <p>
    <template v-for="(item, index) in fanItems" :key="item.label">
      <a :href="item.url" rel="nofollow" target="_blank">{{ item.label }}</a><span v-if="index !== fanItems.length - 1">, </span>
    </template>...
  </p>
</template>
