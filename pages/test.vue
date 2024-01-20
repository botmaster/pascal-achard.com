<script setup lang="ts">
import type { SanitizedResponse } from '~/server/api/notion-page-list.post';

const config = useRuntimeConfig();

const pageListCollection = ref<SanitizedResponse[]>([]);
const limit = ref(20);
const startCursor = ref<string | null>(null);

// Fetch page list
const { data, error, pending } = await useFetch('/api/notion-page-list', {
  query: {
    database_id: config.public.notionDatabaseId,
    limit,
    start_cursor: startCursor,
  },
  method: 'POST',
});

const imageUrls = ref<Record<string, string>>({});

// Fetch image url
async function getImageUrl(pageId: string) {
  // If client side return
  if (!process.client)
    return '';
  return await $fetch('/api/notion-page-image', {
    query: {
      page_id: pageId,
    },
    method: 'POST',
  });
}

function loadMore() {
  startCursor.value = data.value?.response.next_cursor || null;
}

// Computed - Has more
const hasMore = computed<boolean>(() => {
  return data.value?.response.has_more || false;
});

// Computed - Map status color to tailwind color
const statusColor = computed<Record<string, string>>(() => {
  return {
    red: 'badge--is-danger',
    green: 'badge--is-success',
    blue: 'badge--is-info',
  };
});

watch(
  () => data.value,
  async (newVal) => {
    if (!newVal)
      return;
    pageListCollection.value = [...pageListCollection.value, ...newVal.results as SanitizedResponse[]];

    if (!process.client)
      return;
    await nextTick();
    await Promise.all(newVal.results.map(async (item) => {
      imageUrls.value[item!.id] = await getImageUrl(item!.id);
    }));
  },
  { immediate: true },
);
</script>

<template>
  <div class="container mx-auto">
    <h2 class="mb-8 flex-row overflow-hidden">
      Test
    </h2>
    <div class="flow">
      <template v-if="error">
        <p>Oups</p>
        <p>{{ error }}</p>
      </template>
      <template v-else>
        <h3>Request result</h3>
        <pre v-if="data" class="overflow-x-auto">
        cursor: {{ data.response.next_cursor }}
        has more: {{ data.response.has_more }}
        results length: {{ data.results?.length }}
      </pre>

        <h3>Database list <span class="font-body text-xs font-normal capitalize">{{ pageListCollection.length }} articles</span></h3>
        <ul v-if="pageListCollection && pageListCollection.length > 0" class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <li v-for="item in pageListCollection" :key="item.id as string">
            <article class="wrapper-outline relative flex h-full flex-col bg-white px-3 dark:bg-polarnight-nord-0">
              <header class="relative aspect-video overflow-hidden rounded bg-snowstorm-nord-4 dark:bg-polarnight-nord-3">
                <img v-if="imageUrls[item!.id]" loading="lazy" :src="imageUrls[item.id]" alt="" class="absolute inset-0 size-full object-cover">
                <div v-if="item.status" class="absolute right-2 top-1.5">
                  <span class="badge shadow-md" :class="item.status.color ? statusColor[item.status.color] : 'badge--is-neutral'">{{ item.status.name }}</span>
                </div>
              </header>
              <div class="mt-4 flex-grow">
                <h3 class="font-body text-base font-bold capitalize leading-tight">
                  <span class="mr-[1ch]">{{ item.title }}</span>
                </h3>
                <p v-if="item.tags.length" class="mt-2 flex flex-wrap gap-2">
                  <span v-for="(tag, index) in item.tags" :key="index" class="badge badge--is-neutral badge--is-small">{{ tag }}</span>
                </p>
                <p v-if="item.score" class="mt-2 text-xs">
                  {{ item.score }}
                </p>
              </div>

              <footer class="mt-4">
                <p class="truncate text-sm text-muted-text">
                  <Icon name="material-symbols:link" class="text-lg" /> <a :href="item.url" target="_blank">{{ item.url }}</a>
                </p>
              </footer>
            </article>
          </li>
        </ul>
        <p v-if="hasMore">
          <button :disabled="pending" @click="loadMore">
            Load more
          </button>
        </p>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
