<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'

import TheDog from './TheDog.vue'
</script>

<template>
  <TresPerspectiveCamera
    :position="[4.3, 3.2, 6]"
    :look-at="[0, 1, 0.4]"
  />
  <OrbitControls :target="[0, 1, 0.4]"  :enableZoom="false" />
  <TresAmbientLight :intensity="1" />
  <Suspense>
    <Environment preset="sunset" :background="false" :blur="1" />
  </Suspense>
  <TheDog />
  <ContactShadows :opacity="0.5" :scale="10" :blur="2" :far="10" />
</template>
