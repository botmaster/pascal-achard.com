<script setup lang="ts">
// const { data, error } = await useAsyncData('test', () => $fetch('/api/test'));

import { useTestStore } from '~/stores/test.store';

const testStore = useTestStore();

const { data, error } = await useAsyncData('test', () => testStore.fetchTest());
</script>

<template>
  <h1>test</h1>
  <div v-if="data">
    <p>Data:</p>
    -> {{ data }}
  </div>
  <div v-if="error">
    <p>Error:</p>
    -> {{ error }}
  </div>
</template>

<style scoped lang="scss">
  h1 {
    color: red;
  }
</style>
