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
    isNarrow?: boolean;
    size?: "sm" | "md" | "lg";
  }>(),
  {
    isNarrow: false,
    size: "lg",
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const classes = computed(() => {
  return {
    "theme-switcher--is-narrow": props.isNarrow,
    "theme-switcher--is-sm": props.size === "sm",
    "theme-switcher--is-md": props.size === "md",
    "theme-switcher--is-lg": props.size === "lg",
  };
});

const clickHandler = (theme: ITheme) => {
  emit(
    "update:modelValue",
    props.isNarrow
      ? props.themeList.at(props.themeList.indexOf(theme) + 1)?.name ??
          props.themeList[0].name
      : theme.name
  );
};
</script>

<style lang="scss" scoped>
.theme-switcher {
  display: flex;
  align-items: center;
  gap: 1rem;

  .btn-theme {
    &.is-current {
      @apply text-frost-nord-10 dark:text-snowstorm-nord-6;
    }
  }

  &--is-narrow {
    @apply flex-col;

    .btn-theme {
      @apply hidden;

      &.is-current {
        @apply block;
      }
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
