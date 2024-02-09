<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router';

import type { PartialDatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { IPage } from '~/types/types';
import type { INotionArticle } from '~/server/api/notion-page-list.post';
import type { IMultiSelectTagOption } from '~/components/MultiSelectTag.vue';

const config = useRuntimeConfig();
const { locale: currentLocale, t } = useI18n();

// Fetch Content data
const { data: contentData } = await useAsyncData(`readings-${currentLocale.value}`, () =>
  queryContent<IPage>()
    .where({ _locale: currentLocale.value, _path: '/readings' })
    .findOne());

if (contentData?.value)
  useContentHead(contentData as Ref<IPage>);

const DEFAULT_LIMIT = 12;

const observerRoot = ref<HTMLElement | null>(null);

const pageListCollection = ref<INotionArticle[]>([]);
const cursor = ref<string | null>(null);
const pageSize = useRouteQuery('pageSize', DEFAULT_LIMIT, { transform: Number });
const status = useRouteQuery('status', '', { transform: String });
const search = useRouteQuery('search', '', { transform: String });
const sort = useRouteQuery('sort', 'Created time', { transform: String });
const isLoadingMore = ref(false);
const selectedTags = ref<IMultiSelectTagOption[]>([]);

// Fetch database info
const { data: database } = await useAsyncData('database-info', () =>
  $fetch('/api/notion-database-info', {
    params: {
      database_id: config.public.notionDatabaseId,
    },
    method: 'GET',
  }));

// Computed - Get "tags" multi-select value from dbResponse
const tagList = computed<IMultiSelectTagOption[]>(() => {
  const data = database.value as PartialDatabaseObjectResponse;
  const selectProperty = data.properties.Tags as {
    type: 'multi_select'
    multi_select: {
      options: Array<IMultiSelectTagOption>
    }
    id: string
    name: string
  };
  return selectProperty.multi_select.options || [];
});

// Fetch page list
const { data: pageList, error, pending, refresh } = await useAsyncData('page-list', () =>
  $fetch('/api/notion-page-list', {
    body: {
      database_id: config.public.notionDatabaseId,
      page_size: pageSize.value,
      start_cursor: cursor.value,
      sorts: [
        {
          property: sort.value.replace(/\+/g, ' '),
          direction: sort.value === 'Name' ? 'ascending' : 'descending',
        },
      ],
      filter: {
        and: [
          {
            property: 'Status',
            select: {
              equals: status.value.replace(/\+/g, ' '),
            },
          },
          {
            property: 'Name',
            rich_text: {
              contains: search.value,
            },
          },
          {
            or: selectedTags.value.map(tag => ({
              property: 'Tags',
              multi_select: {
                contains: tag.name,
              },
            })),
          },
        ],
      },
    },
    method: 'POST',
  }));

function clearFilters() {
  cursor.value = null;
  status.value = '';
  search.value = '';
  selectedTags.value = [];
}

function loadMore() {
  isLoadingMore.value = true;
  cursor.value = pageList.value?.response.next_cursor || null;
}

// Computed - Has more
const hasMore = computed<boolean>(() => {
  return pageList.value?.response.has_more || false;
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
  () => pageList.value,
  async (newVal) => {
    if (!newVal)
      return;

    if (isLoadingMore.value) {
      isLoadingMore.value = false;
      pageListCollection.value = [...pageListCollection.value, ...newVal.results as INotionArticle[]];
    }
    else {
      pageListCollection.value = newVal.results as INotionArticle[];
    }
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

// Watch search change
watch(
  () => search.value,
  async (newVal) => {
    if (!newVal && newVal !== '')
      return;
    cursor.value = null;
    await refresh();
  },
  { immediate: false },
);

// Watch sort change
watch(
  () => sort.value,
  async (newVal) => {
    if (!newVal && newVal !== '')
      return;
    cursor.value = null;
    await refresh();
  },
  { immediate: false },
);

// Watch selectedOptions change
watch(
  () => selectedTags.value,
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
    <ContentRenderer v-if="contentData" class="nuxt-content mb-10" :value="contentData" />
    <div class="flow">
      <template v-if="error">
        <p class="font-code">
          <Icon name="material-symbols:error" class="text-xl text-danger" />
          Oups
        </p>
        <p>{{ error }}</p>
      </template>
      <template v-else>
        <!-- Action bar       -->
        <ArticleListActionBar
          v-model:selected-options="selectedTags" v-model:search="search" v-model:status="status"
          v-model:sort="sort" :tags="tagList" :pending="pending" @clear-filters="clearFilters"
        />

        <!--  Article list      -->
        <TransitionGroup
          v-if="pageListCollection && pageListCollection.length > 0" ref="observerRoot" tag="ul"
          name="group-fade"
          class="card-layout relative mt-12 "
        >
          <li v-for="item in pageListCollection" :key="item.id as string">
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
        </TransitionGroup>
        <template v-else>
          <p class="mt-8 lg:text-xl">
            {{ t('common.noData') }}. {{ t('pages.readings.filtersTooRestrictive') }}
          </p>
        </template>

        <!-- Load more and page size selector -->
        <div class="mt-10 flex flex-col items-center gap-2 lg:flex-row">
          <div v-if="hasMore" class="flex items-center gap-2 leading-none">
            <button :disabled="pending" class="group" @click="loadMore">
              {{ t('common.loadMore') }}
              <Icon class="ml-1 block transition-transform group-hover:animate-spin" name="material-symbols:refresh" />
            </button>
            <Transition name="fade">
              <AppLoader v-if="isLoadingMore" class="text-2xl" />
            </Transition>
          </div>
          <div v-if="pageListCollection.length >= 6" class="flex items-center gap-2 lg:ml-auto">
            <label class="flex-none" for="selectPageSize">{{ t('pages.readings.filters.pageSizes') }}</label>
            <select id="selectPageSize" v-model="pageSize" class="form-select w-auto">
              <option :value="6">
                6
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
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-layout {
  --min: 22ch;
  --gap: 1rem;

  display: grid;
  grid-gap: var(--gap);
  /* min() with 100% prevents overflow
  in extra narrow spaces */
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--min)), 1fr));

  > * {
    will-change: opacity, transform;
  }
}

/* 1. declare transition */
.group-fade-move,
.group-fade-enter-active,
.group-fade-leave-active {
  transition: opacity 0.6s cubic-bezier(0.55, 0, 0.1, 1), transform 0.6s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.group-fade-enter-from,
.group-fade-leave-to {
  opacity: 0;
  transform: translate(0, 20px);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.group-fade-leave-active {
  position: absolute;
  display: none;
}
</style>
