<script setup lang="ts">
import type { ITheme } from '~/types/types';

const props = withDefaults(
  defineProps<{
    themeList: ITheme[]
    modelValue: string
    size?: 'xs' | 'sm' | 'md' | 'lg'
  }>(),
  {
    size: 'lg',
  },
);

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>();

const classes = computed(() => {
  return {
    'theme-switcher--is-xs': props.size === 'xs',
    'theme-switcher--is-sm': props.size === 'sm',
    'theme-switcher--is-md': props.size === 'md',
    'theme-switcher--is-lg': props.size === 'lg',
  };
});

function clickHandler(theme: ITheme) {
  emit('update:modelValue', theme.name);
}
</script>

<template>
  <div class="theme-switcher" :class="classes">
    <client-only>
      <button
        v-for="(theme, index) in themeList"
        :key="index"
        :title="theme.label"
        class="btn-theme"
        :class="[{ 'is-current': modelValue === theme.name }]"
        @click="clickHandler(theme)"
      >
        <Icon :name="theme.icon" />
      </button>
    </client-only>
  </div>
</template>

<style lang="scss" scoped>
.theme-switcher {
  display: flex;
  align-items: center;
  gap: 1rem;

  .btn-theme {
    @apply leading-[0];

    &.is-current {
      @apply text-primary;
    }
  }

  &--is-xs {
    .btn-theme {
      @apply text-base leading-[0];
    }
  }

  &--is-sm {
    .btn-theme {
      @apply text-lg leading-[0];
    }
  }

  &--is-md {
    .btn-theme {
      @apply text-xl leading-[0];
    }
  }

  &--is-lg {
    .btn-theme {
      @apply text-2xl leading-[0];
    }
  }
}
</style>
