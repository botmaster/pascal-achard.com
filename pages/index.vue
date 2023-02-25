<script setup lang="ts">
const toto = "toto";
console.log(toto);
</script>

<template>
  <div>
    <h1>Je suis la page d'accueil</h1>
    <p class="myClass">
      {{ toto }}
    </p>
    <MySuperComponent />
  </div>
</template>

<style scoped></style>
