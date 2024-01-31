<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router';
import type { SanitizedResponse } from '~/server/api/notion-page-list.post';
import type { IPage } from '~/types/types';

const config = useRuntimeConfig();
const { locale: currentLocale, t } = useI18n();

// Fetch Content data
const { data: contentData } = await useAsyncData(`reading-${currentLocale.value}`, () =>
  queryContent<IPage>()
    .where({ _locale: currentLocale.value, _path: '/reading' })
    .findOne());

if (contentData?.value)
  useContentHead(contentData as Ref<IPage>);

const DEFAULT_LIMIT = 6;

const pageListCollection = ref<SanitizedResponse[]>([]);
const cursor = ref<string | null>(null);
const pageSize = useRouteQuery('pageSize', DEFAULT_LIMIT, { transform: Number });
const status = useRouteQuery('status', '', { transform: String });
const isLoadingMore = ref(false);

// Fetch page list
const { data, error, pending, refresh } = await useAsyncData('page-list', () =>
  $fetch('/api/notion-page-list', {
    body: {
      database_id: config.public.notionDatabaseId,
      page_size: pageSize.value,
      start_cursor: cursor.value,
      sorts: [
        {
          property: 'Created time',
          direction: 'descending',
        },
      ],
      filter: {
        property: 'Status',
        select: {
          equals: status.value.replace(/\+/g, ' '),
        },
      },
    },
    method: 'POST',
  }));

const imageUrls = ref<Record<string, string>>({});

// Fetch image url
async function getImageUrl(pageId: string) {
  // If client side return
  if (!process.client)
    return '';
  return await $fetch('/api/notion-page-image', {
    body: {
      page_id: pageId,
    },
    method: 'POST',
  });
}

function loadMore() {
  isLoadingMore.value = true;
  cursor.value = data.value?.response.next_cursor || null;
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

    if (isLoadingMore.value) {
      isLoadingMore.value = false;
      pageListCollection.value = [...pageListCollection.value, ...newVal.results as SanitizedResponse[]];
    }
    else {
      pageListCollection.value = newVal.results as SanitizedResponse[];
    }

    if (!process.client)
      return;
    await nextTick();
    await Promise.all(newVal.results.map(async (item) => {
      imageUrls.value[item!.id] = await getImageUrl(item!.id);
    }));
  },
  { immediate: true },
);

// Watch cursor change
watch(
  () => cursor.value,
  async (newVal) => {
    if (!newVal)
      return;
    await refresh();
  },
  { immediate: false },
);

// Watch status change
watch(
  () => status.value,
  async (newVal) => {
    if (!newVal && newVal !== '')
      return;
    cursor.value = null;
    await refresh();
  },
  { immediate: false },
);

// Watch page size change
watch(
  () => pageSize.value,
  async (newVal) => {
    if (!newVal)
      return;
    cursor.value = null;
    await refresh();
  },
  { immediate: false },
);
</script>

<template>
  <HeroComponent>
    <template #content>
      <p class="h3">
        📙
      </p>
      <h1 class="dark:text-white">
        {{ contentData?.coverTitle }}
      </h1>
      <p class="h3 dark:text-white">
        {{ contentData?.coverSubtitle }}
      </p>
      <p class="dark:text-white">
        {{ contentData?.coverDescription }}
      </p>
    </template>
  </HeroComponent>
  <div class="container mx-auto mb-12 mt-8 md:mb-24 md:mt-20">
    <h2 class="mb-8 flex-row overflow-hidden">
      {{ t('pages.reading.bdd') }}
    </h2>
    <div class="flow">
      <template v-if="error">
        <p class="font-code">
          <Icon name="material-symbols:error" class="text-xl text-danger" /> Oups
        </p>
        <p>{{ error }}</p>
      </template>
      <template v-else>
        <h3>
          {{ t('pages.reading.articleList') }}
        </h3>
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2">
            <label class="" for="selectStatus">Status</label>
            <select id="selectStatus" v-model="status">
              <option value="">
                {{ t('pages.reading.filtres.status.all') }}
              </option>
              <option value="To read">
                {{ t('pages.reading.filtres.status.toRead') }}
              </option>
              <option value="Read">
                {{ t('pages.reading.filtres.status.read') }}
              </option>
              <option value="Reading">
                {{ t('pages.reading.filtres.status.inProgress') }}
              </option>
              <option value="Canceled">
                {{ t('pages.reading.filtres.status.canceled') }}
              </option>
            </select>
          </div>
          <div v-if="pageListCollection.length >= DEFAULT_LIMIT" class="flex items-center gap-2">
            <label class="flex-none" for="selectPageSize">{{ t('pages.reading.filtres.pageSizes') }}</label>
            <select id="selectPageSize" v-model="pageSize">
              <option :value="DEFAULT_LIMIT">
                {{ DEFAULT_LIMIT }}
              </option>
              <option :value="12">
                12
              </option>
              <option :value="24">
                24
              </option>
              <option :value="48">
                48
              </option>
            </select>
          </div>
          <Transition name="fade">
            <AppLoader v-if="pending" class="text-2xl" />
          </Transition>
        </div>

        <ul
          v-if="pageListCollection && pageListCollection.length > 0"
          class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <li v-for="item in pageListCollection" :key="item.id as string">
            <AppCard class="h-full">
              <template #image>
                <img v-if="imageUrls[item!.id]" loading="lazy" :src="imageUrls[item.id]" alt="">
                <div v-if="item.status" class="absolute right-2 top-1.5">
                  <span
                    class="badge shadow-md"
                    :class="item.status.color ? statusColor[item.status.color] : 'badge--is-neutral'"
                  >{{ item.status.name
                  }}</span>
                </div>
              </template>

              <h3 class="font-body text-base font-bold capitalize leading-tight">
                <span class="mr-[1ch]">{{ item.title }}</span>
              </h3>
              <p v-if="item.tags.length" class="mt-2 flex flex-wrap gap-2">
                <span
                  v-for="(tag, index) in item.tags" :key="index"
                  class="badge badge--is-neutral badge--is-small"
                >{{ tag }}</span>
              </p>
              <p v-if="item.score" class="mt-2 text-xs">
                {{ item.score }}
              </p>

              <template #footer>
                <p class="truncate">
                  <Icon name="material-symbols:link" class="text-lg" />
                  <a :href="item.url" target="_blank">{{ item.url }}</a>
                </p>
              </template>
            </AppCard>
          </li>
        </ul>
        <p v-if="hasMore" class="flex items-center gap-2 leading-none">
          <button :disabled="pending" @click="loadMore">
            <Icon name="material-symbols:refresh" />
            Load more
          </button>
          <Transition name="fade">
            <AppLoader v-if="isLoadingMore" class="text-base" />
          </Transition>
        </p>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
