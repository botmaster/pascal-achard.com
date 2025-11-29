<script setup lang="ts">
import { useProgress } from '@tresjs/cientos'

const { hasFinishLoading, progress } = await useProgress()
</script>

<template>
  <Transition
    name="fade-overlay"
    enter-active-class="opacity-1 transition-opacity duration-200"
    leave-active-class="opacity-0 transition-opacity duration-200"
  >
    <div
      v-show="!hasFinishLoading"
      class="absolute bg-default t-0 l-0 w-full h-full z-20 flex justify-center items-center font-mono"
    >
      <div class="flex gap-2 items-center w-200px text-sm">
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

</style>
