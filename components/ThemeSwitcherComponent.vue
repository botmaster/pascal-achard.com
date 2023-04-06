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

<script setup lang="ts">
import { ITheme } from "~/types/theme";

const props = withDefaults(
  defineProps<{
    themeList: ITheme[];
    modelValue: string;
    size?: "xs" | "sm" | "md" | "lg";
  }>(),
  {
    size: "lg",
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const classes = computed(() => {
  return {
    "theme-switcher--is-xs": props.size === "xs",
    "theme-switcher--is-sm": props.size === "sm",
    "theme-switcher--is-md": props.size === "md",
    "theme-switcher--is-lg": props.size === "lg",
  };
});

const clickHandler = (theme: ITheme) => {
  emit("update:modelValue", theme.name);
};
</script>

<style lang="scss" scoped>
.theme-switcher {
  display: flex;
  align-items: center;
  gap: 1rem;

  .btn-theme {
    &.is-current {
      @apply text-primary;
    }
  }

  &--is-xs {
    .btn-theme {
      @apply text-base leading-none;
    }
  }

  &--is-sm {
    .btn-theme {
      @apply text-lg leading-none;
    }
  }

  &--is-md {
    .btn-theme {
      @apply text-xl leading-none;
    }
  }

  &--is-lg {
    .btn-theme {
      @apply text-2xl leading-none;
    }
  }
}
</style>
