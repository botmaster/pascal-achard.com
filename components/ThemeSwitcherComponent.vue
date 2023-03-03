<template>
  <div class="flex gap-4">
    <client-only>
      <button
        v-for="(theme, index) in themeList"
        :key="index"
        :title="theme.label"
        class="btn-theme"
        :class="{ 'is-current': modelValue === theme.name }"
        @click="clickHandler(theme)"
      >
          <Icon :name="theme.icon" />
      </button>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { ITheme } from "~/types/theme";

defineProps<{
  themeList: ITheme[];
  modelValue: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const clickHandler = (theme: ITheme) => {
  emit("update:modelValue", theme.name);
};
</script>

<style lang="scss" scoped>
.btn-theme {
  @apply text-2xl;

  &.is-current {
    @apply text-frost-nord-10 dark:text-snowstorm-nord-6;
  }
}
</style>
