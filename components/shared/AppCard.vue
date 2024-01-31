<script setup lang="ts">
// Typescript Props with default values
interface Props {
  as?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'article',
});
</script>

<template>
  <Component :is="props.as" class="card">
    <figure v-if="$slots.image" class="card__img-wrapper">
      <slot name="image" />
    </figure>

    <div class="card__body">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </footer>
  </Component>
</template>

<style scoped lang="scss">
.card {
  @apply relative p-0 overflow-hidden flex flex-col bg-white dark:bg-polarnight-nord-0 rounded-lg
  border-[1px]  border-snowstorm-nord-4 dark:border-polarnight-nord-2;

  &__img-wrapper {
    @apply relative aspect-video bg-snowstorm-nord-4 dark:bg-polarnight-nord-3;

    :slotted(img) {
      @apply absolute inset-0 size-full object-cover;
    }
  }

  &__body {
    @apply flex-grow  px-4 py-2.5;
  }

  &__title {
    @apply font-body text-base font-bold capitalize leading-tight;
  }

  &__footer {
    @apply  px-4 py-2.5 text-sm text-muted-text;
  }
}
</style>
