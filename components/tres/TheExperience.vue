<script setup lang="ts">
//import { OrbitControls } from '@tresjs/cientos'

import TheDog from './TheDog.vue'
</script>

<template>
  <TresPerspectiveCamera
    :position="[7, 3, 2]"
    :look-at="[0, 1, 0.4]"
  />
<!--  <OrbitControls :target="[0, 1, 0]" />-->
  <TresAmbientLight :intensity="1" />
  <Suspense>
    <Environment preset="sunset" :background="false" :blur="1" />
  </Suspense>
  <TheDog />
  <!-- Render the animated model here -->
</template>
