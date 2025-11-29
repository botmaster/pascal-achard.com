<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const { state: model, nodes } = useGLTF('/models/husky.glb', {
  draco: true,
})
const rig = computed(() => {
  console.log('Nodes:', nodes.value)
  return nodes.value.Root_Scene
})

const animations = computed(() => model.value?.animations || [])
console.log('Loaded animations:', animations.value)

const { actions } = useAnimations(animations, rig)
console.log('Available actions:', actions)
const currentAction = ref<AnimationAction>()

const transitionToAnimation = (animationName: string, duration = 0.5) => {
  if (!actions) { return }

  const nextAction = actions[animationName]
  if (!nextAction) { return }

  // Fade out current animation
  if (currentAction.value) {
    currentAction.value.fadeOut(duration)
  }

  // Fade in new animation
  nextAction.reset()
  nextAction.setEffectiveWeight(1)
  nextAction.play()
  nextAction.fadeIn(duration)

  currentAction.value = nextAction
}

// Définir la séquence d'animations
const animationSequence = [
  { name: 'Idle', duration: 1000, fadeDuration: 0.5 },
  { name: 'Idle', duration: 5000, fadeDuration: 0.5 },
  { name: 'Walk', duration: 5000, fadeDuration: 0.5 },
  { name: 'Gallop', duration: 5000, fadeDuration: 0.5 },
  { name: 'Gallop_Jump', duration: 1000, fadeDuration: 0.5 },
  { name: 'Gallop', duration: 4000, fadeDuration: 0.5 },
  { name: 'Walk', duration: 3000, fadeDuration: 0.5 },
  { name: 'Idle_2', duration: 3000, fadeDuration: 0.5 },
  { name: 'Idle', duration: 0, fadeDuration: 0.5 },
]

const isPlaying = ref(false)

const playAnimationSequence = async () => {
  if (!actions || isPlaying.value) { return }

  isPlaying.value = true

  for (const step of animationSequence) {
    console.log('Step:', step)
    transitionToAnimation(step.name, step.fadeDuration)
    if (step.duration > 0) {
      await new Promise(resolve => setTimeout(resolve, step.duration))
    }
  }

  isPlaying.value = false
}

watch(actions, (newValue) => {
  console.log('Actions ready:', newValue)
  if (!newValue) { return }
  playAnimationSequence()
}, { immediate: true })

/* // Example: Transition from Idle to Cheer
const playCheerAnimation = () => {
  transitionToAnimation('Walk', 0.3)
}

const playIdleAnimation = () => {
  transitionToAnimation('Idle', 0.3)
}

watch(actions, (actions) => {
  if (!actions) { return }
  console.log('Actions:', actions)

  // Start with Idle animation
  playIdleAnimation()

  // After 5 seconds, switch to Cheer animation
  setTimeout(() => {
    playCheerAnimation()
  }, 5000)
}, { immediate: true }) */
</script>

<template>
  <primitive v-if="rig" :object="rig" />
</template>
