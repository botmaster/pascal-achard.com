<script setup lang="ts">
const toto = "toto";
console.log(toto);
</script>

<template>
  <main class="mainClass">
    <h1>Je suis la page d'accueil</h1>
    <p class="myClass">
      {{ toto }}
    </p>
    <MySuperComponent />
  </main>
</template>

<style scoped lang="scss">
.myClass {
  color: red;
}
</style>
