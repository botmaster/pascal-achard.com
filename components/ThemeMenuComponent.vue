<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ITheme } from "~/types/theme";

const props = withDefaults(
  defineProps<{
    themeList: ITheme[];
    modelValue: string;
    isUnkown?: boolean;
  }>(),
  {}
);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const { t } = useI18n();

const currentTheme = computed<ITheme | undefined>(() => {
  return props.themeList.find((theme) => theme.name === props.modelValue);
});

const clickHandler = (theme: ITheme) => {
  emit("update:modelValue", theme.name);
};
</script>

<template>
  <Menu as="div" class="menu">
    <MenuButton class="menu-button"
      ><span class="sr-only">{{ t("navigation.themeSelector") }}</span>
      <ClientOnly>
        <Icon :name="currentTheme?.icon || 'material-symbols:computer'" />
        <template #fallback>
          <Icon name="material-symbols:computer" />
        </template>
      </ClientOnly>
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 -translate-y-2 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 -translate-y-2 opacity-0"
    >
      <MenuItems class="menu-items">
        <MenuItem
          v-for="(theme, index) in props.themeList"
          v-slot="{ active }"
          :key="index"
        >
          <button
            :title="theme.label"
            class="menu-item-btn"
            :class="[
              { 'is-current': modelValue === theme.name },
              {
                'is-active': active,
              },
            ]"
            @click="clickHandler(theme)"
          >
            <Icon :name="theme.icon" /><span class="menu-item-btn__label">{{
              theme.label
            }}</span>
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
    dark:bg-body-backgrounddark ring-1 ring-inset ring-snowstorm-nord-4 dark:ring-polarnight-nord-2 focus:outline-none;
  }
}

.menu-item-btn {
  @apply flex items-end gap-2 text-left no-underline;

  &__label {
    @apply text-base leading-none;
  }

  &.is-current {
    @apply text-primary;
  }

  &.is-active {
    @apply text-frost-nord-10 dark:text-snowstorm-nord-6 outline-dotted outline-1 outline-offset-2;
  }
}
</style>
