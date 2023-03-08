<script setup lang="ts">
// Color mode
const colorMode = useColorMode();
const themeList = [
  { name: "system", label: "Changer le thème", icon: "mi-computer" },
  { name: "dark", label: "Changer le thème", icon: "mi-moon" },
  { name: "light", label: "Changer le thème", icon: "mi-sun" },
];
</script>

<template>
  <header
    class="z-10 fixed inset-x-0 top-0 py-1 bg-body-background/40 dark:bg-body-backgrounddark backdrop-blur"
  >
    <div class="mx-2 md:mx-8">
      <div class="flex justify-between items-center">
        <p></p>
        <div class="flex items-center gap-4">
          <NuxtLink to="/about">About</NuxtLink>
          <theme-switcher-component
            v-model="colorMode.preference"
            :theme-list="themeList"
            size="sm"
            is-narrow
          />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss"></style>
