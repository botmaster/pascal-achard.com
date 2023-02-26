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
    <p>
      <button class="btn btn--black">Button</button>
    </p>
    <MySuperComponent />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque
      ducimus ea eos hic similique sint temporibus veritatis. Deserunt dolore
      doloribus iste porro quas unde. Accusantium harum qui repudiandae vel.
    </p>
  </main>
</template>

<style scoped lang="scss">
.myClass {
  color: red;
}
</style>
