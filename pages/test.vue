<script setup lang="ts">
const config = useRuntimeConfig();

const limit = ref(10);

const { data, error } = await useFetch('/api/notion-page-list', {
  query: {
    database_id: config.public.notionDatabaseId,
    limit,
  },
  method: 'POST',
});

const pageList = computed(() => {
  if (!data.value)
    return [];

  return data.value.sanitizedResponse;
});

const imageUrls = ref<Record<string, string>>({});

// Function to load image from Notion page id
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

watch(
  () => pageList.value,
  async (newVal) => {
    if (!process.client)
      return;
    await Promise.all(newVal.map(async (item) => {
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
        cursor: {{ data.next_cursor }}
        has more: {{ data.has_more }}
        reslults lenght: {{ data.results?.length }}
      </pre>

        <h3>Database list</h3>
        <p>
          <button @click="limit += 10">
            Load more
          </button>
        </p>
        <ul v-if="pageList && pageList.length > 0" class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <li v-for="item in pageList" :key="item!.id as string">
            <div class="wrapper-outline flow bg-white px-3">
              <header class="relative aspect-video bg-snowstorm-nord-4 dark:bg-polarnight-nord-3">
                <img v-if="imageUrls[item!.id]" loading="lazy" :src="imageUrls[item!.id]" alt="" class="absolute inset-0 size-full object-cover">
              </header>
              <div class="flow">
                <h3 class="font-body text-lg font-bold capitalize leading-tight">
                  {{ item?.title }}
                </h3>
                <p v-if="item?.tags.length" class="inline-flex gap-2">
                  <span v-for="(tag, index) in item.tags" :key="index" class="rounded bg-snowstorm-nord-4 px-1 py-0.5 text-xs leading-[1] dark:bg-polarnight-nord-3">{{ tag }}</span>
                </p>
              </div>
              <footer>
                <p>Details <a :href="item!.url" target="_blank">here</a> </p>
              </footer>
            </div>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
