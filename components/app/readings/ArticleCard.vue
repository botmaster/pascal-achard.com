<script setup lang="ts">
import type { IArticle } from '~/types/types';

defineProps<{
  item: IArticle
}>();

const { locale: currentLocale } = useI18n();

// Computed - Map status color to tailwind color
const statusColor = computed<Record<string, string>>(() => {
  return {
    red: 'badge--is-danger',
    green: 'badge--is-success',
    blue: 'badge--is-info',
  };
});
</script>

<template>
  <AppCard
    :data-pageid="item.id"
    class="h-full"
  >
    <template #image>
      <img v-if="item.image" loading="lazy" :src="item.image" alt="">
      <div v-if="item.status" class="absolute right-2 top-1.5">
        <span
          class="badge shadow-md"
          :class="item.status.color ? statusColor[item.status.color] : 'badge--is-neutral'"
        >{{
          item.status.name
        }}</span>
      </div>
    </template>

    <h3 class="font-body text-base font-bold capitalize leading-tight">
      <span class="mr-[0.3em]">{{ item.title }}</span>
    </h3>
    <p v-if="item.tags.length" class="mt-2 flex flex-wrap gap-2">
      <span
        v-for="tag in item.tags"
        :key="tag.id"
        class="badge badge--is-neutral badge--is-small"
      >{{ tag.name }}</span>
    </p>
    <p v-if="item.score" class="mt-2 text-xs">
      {{ item.score.name }}
    </p>

    <template #footer>
      <p v-if="item.createdTime" class="mt-2 text-xs font-normal text-muted-text">
        {{ new Date(item.createdTime).toLocaleDateString(currentLocale) }}
      </p>
      <p class="truncate">
        <Icon name="material-symbols:link" class="text-lg" /> <a :href="item.url" target="_blank">{{ item.url }}</a>
      </p>
    </template>
  </AppCard>
</template>

<style scoped lang="scss">

</style>
