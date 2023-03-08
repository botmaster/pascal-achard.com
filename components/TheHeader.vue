<script setup lang="ts">
// Color mode
const colorMode = useColorMode();
const themeList = [
  { name: "system", label: "System", icon: "mi-computer" },
  { name: "dark", label: "Dark", icon: "mi-moon" },
  { name: "light", label: "Light", icon: "mi-sun" },
];
</script>

<template>
  <header class="z-10 fixed inset-x-0 top-0 py-1">
    <div class="mx-2 md:mx-8 md:mt-4">
      <div class="flex justify-between items-center">
        <p></p>
        <nav
          class="flex items-center gap-4 text-2xl bg-body-background dark:bg-body-backgrounddark rounded-none px-6 py-2"
        >
          <NuxtLink class="no-underline" to="/about">About</NuxtLink>
          <ThemeMenuComponent
            v-model="colorMode.preference"
            :theme-list="themeList"
          />
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss"></style>
