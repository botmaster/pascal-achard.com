<template>
  <div>
    <p class="myClass">
      {{ toto }}
    </p>
    <MySuperComponent />
  </div>
</template>
<script setup lang="ts">
const toto = "toto";
console.log(toto);
</script>

<style>
.myClass {
  @apply text-red;
}
</style>
