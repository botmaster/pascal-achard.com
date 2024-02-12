<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router';

import type { IArticle, IArticleTag, IPage } from '~/types/types';
import { useArticleDatabaseInfoStore } from '~/stores/article-database-info.store';

const { locale: currentLocale, t } = useI18n();

// Fetch Content data
const { data: contentData } = await useAsyncData(`readings-content-${currentLocale.value}`, () =>
  queryContent<IPage>()
    .where({ _locale: currentLocale.value, _path: '/readings' })
    .findOne());

if (contentData?.value)
  useContentHead(contentData as Ref<IPage>);

const DEFAULT_LIMIT = 12;

const pageListCollection = ref<IArticle[]>([]);
const cursor = ref<string | null>(null);
const isLoadingMore = ref(false);
const selectedTags = ref<IArticleTag[]>([]);

// Route query
const pageSize = useRouteQuery('pageSize', DEFAULT_LIMIT, { transform: Number });
const status = useRouteQuery('status', '', { transform: String });
const search = useRouteQuery('search', '', { transform: String });
const sort = useRouteQuery('sort', 'Created time', { transform: String });

// Pinia store
const databaseStore = useArticleDatabaseInfoStore();
const articlesStore = useArticlesStore();

// Fetch database info
const { error: fetchDatabaseError, pending: fetchDatabasePending } = await useAsyncData('database-info', () => databaseStore.fetchDatabase());

// Fetch page list
const { error, pending, refresh } = await useAsyncData('page-list', () => articlesStore.fetchArticles({
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
}));

function clearFilters() {
  cursor.value = null;
  status.value = '';
  search.value = '';
  selectedTags.value = [];
}

function loadMore() {
  isLoadingMore.value = true;
  cursor.value = articlesStore.articlesResponse?.response.next_cursor || null;
}

watch(
  () => articlesStore.articlesResponse,
  async (newVal) => {
    if (!newVal)
      return;

    if (isLoadingMore.value) {
      isLoadingMore.value = false;
      pageListCollection.value = [...pageListCollection.value, ...newVal.articles];
    }
    else {
      pageListCollection.value = newVal.articles;
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
      <template v-if="error || fetchDatabaseError">
        <p class="font-code">
          <Icon name="material-symbols:error" class="text-xl text-danger" />
          Oups
        </p>
        <p v-if="error">
          {{ error }}
        </p>
        <p v-if="fetchDatabaseError">
          {{ fetchDatabaseError }}
        </p>
      </template>
      <template v-else>
        <!-- Action bar       -->
        <ArticleListActionBar
          v-model:selected-options="selectedTags" v-model:search="search" v-model:status="status"
          v-model:sort="sort" :tags="databaseStore.tagList" :pending="pending || fetchDatabasePending" @clear-filters="clearFilters"
        />

        <!--  Article list      -->
        <TransitionGroup
          v-if="pageListCollection && pageListCollection.length > 0" tag="ul"
          name="group-fade"
          class="card-layout relative mt-12 "
        >
          <li v-for="item in pageListCollection" :key="item.id as string">
            <ArticleCard :item="item" />
          </li>
        </TransitionGroup>
        <template v-else>
          <p class="mt-8 lg:text-xl">
            {{ t('common.noData') }}. {{ t('pages.readings.filtersTooRestrictive') }}
          </p>
        </template>

        <!-- Load more and page size selector -->
        <div class="mt-10 flex flex-col items-center gap-2 lg:flex-row">
          <div v-if="articlesStore.hasMore" class="flex items-center gap-2 leading-none">
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
