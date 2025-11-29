<script setup lang="ts">
import { useProgress } from '@tresjs/cientos'

const { hasFinishLoading, progress } = await useProgress()
</script>

<template>
  <Transition
    name="fade-loader"
  >
    <div
      v-if="!hasFinishLoading"
      class="absolute t-0 l-0 w-full h-full z-20 flex justify-center items-center font-mono"
    >
      <div class="-mt-20 flex gap-2 items-center w-200px text-sm">
        <AppLoader class="text-2xl" />
        <code >Loading {{ progress }} %</code>
      </div>
    </div>
  </Transition>
  <TresCanvas
    :clearAlpha="0"
  >
    <TheExperience />
  </TresCanvas>
</template>

<style scoped lang="scss">
/*
Je ne comprends pas pourquoi, mais je suis obligé de mettre des
classes personnalisées pour les transitions ici, sinon ça ne fonctionne pas si je les mets dans _base.scss
*/
.fade-loader-enter-active,
.fade-loader-leave-active {
  transition: opacity 0.3s ease;
}

.fade-loader-enter-from,
.fade-loader-leave-to {
  opacity: 0;
}
</style>
