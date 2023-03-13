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
  <Menu as="div" class="menu">
    <MenuButton class="menu-button"
      ><Icon :name="currentTheme.icon" /><span class="sr-only"
        >Sélecteur de thème</span
      ></MenuButton
    >
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-75 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-75 opacity-0"
    >
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
    </transition>
  </Menu>
</template>

<style scoped lang="scss">
.menu {
  @apply text-left;

  &-button {
    //;
  }

  &-items {
    @apply absolute min-w-min top-full right-0 mt-3 px-5 py-4 space-y-3 rounded-lg bg-body-background
    dark:bg-body-backgrounddark ring-1 ring-inset ring-snowstorm-nord-4 dark:ring-polarnight-nord-2;
  }
}

.menu-item-btn {
  @apply flex items-center gap-2 text-left no-underline;

  &.is-current {
    @apply text-frost-nord-10 dark:text-[inherit];
  }
}
</style>
