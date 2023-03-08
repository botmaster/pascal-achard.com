<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ITheme } from "~/types/theme";

const props = withDefaults(
  defineProps<{
    themeList: ITheme[];
    modelValue: string;
    size?: "xs" | "sm" | "md" | "lg";
  }>(),
  {
    size: "md",
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const currentTheme = computed<ITheme>(() => {
  const theme = props.themeList.find(
    (theme) => theme.name === props.modelValue
  );
  if (!theme) {
    throw new Error("No theme found");
  }
  return theme;
});

const clickHandler = (theme: ITheme) => {
  emit("update:modelValue", theme.name);
};
</script>

<template>
  <ClientOnly>
    <Menu as="div" class="menu">
      <MenuButton class="menu-button"
        ><Icon :name="currentTheme.icon"
      /></MenuButton>
      <MenuItems as="ul" class="menu-items">
        <MenuItem
          v-for="(theme, index) in props.themeList"
          v-slot="{}"
          :key="index"
          as="li"
        >
          <button
            :title="theme.label"
            class="menu-item-btn"
            :class="[{ 'is-current': modelValue === theme.name }]"
            @click="clickHandler(theme)"
          >
            <Icon :name="theme.icon" /><span>{{ theme.label }}</span>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  </ClientOnly>
</template>

<style scoped lang="scss">
.menu {
  @apply relative inline-block text-left drop-shadow-none;

  &-button {
    //
  }

  &-items {
    @apply absolute top-full left-1/2 mt-3 -translate-x-1/2 space-y-1 rounded-sm bg-body-background dark:bg-body-backgrounddark  ring-1 ring-inset ring-snowstorm-nord-4 px-2 py-1.5 text-sm;
  }
}

.menu-item-btn {
  @apply flex items-center gap-2 text-left no-underline;

  &.is-current {
    @apply text-frost-nord-10 dark:text-[inherit];
  }
}
</style>
