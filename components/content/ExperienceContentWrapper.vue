<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import {Mesh} from "three";
const boxRef = ref<Mesh>()

function onRender() {
  if (boxRef.value) {
    boxRef.value.rotation.y +=  0.01
    boxRef.value.rotation.x +=  0.01
  }
}
</script>

<template>
  <div class="w-full aspect-video">
    <TresCanvas :clear-alpha="0" :antialias="false" @render="onRender">

      <TresPerspectiveCamera
        :position="[4.3, 3.2, 6]"
        :look-at="[0, 2.5, 0]"
      />
      <TresAmbientLight :intensity="1" />
      <TresDirectionalLight :position="[5, 10, 5]" :intensity="2" />
      <TresDirectionalLight :position="[-5, 5, 0]" :intensity="1.2" color="blue"  />
      <TresMesh ref="boxRef" :position="[0, 3, 0]">
        <TresBoxGeometry :args="[2.5,2.5,2.5]" />
        <TresMeshNormalMaterial />
      </TresMesh>
      <ContactShadows :opacity="0.5" :scale="10" :blur="2" :far="10" />
    </TresCanvas>
  </div>
</template>
