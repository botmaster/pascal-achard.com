<script setup lang="ts">
import type { Recenttracks, Track } from '~/types/last-fm/types';
import type { IPage } from '~/types/types';
import { v4 as uuidv4 } from 'uuid';

definePageMeta({
  layout: false,
});

const config = useRuntimeConfig();

const { locale: currentLocale, t } = useI18n();

const playlistListRef = ref<HTMLElement | null>(null);

// Fetch Content data
const { data: contentData } = await useAsyncData(`lab-${currentLocale.value}`, () =>
  queryContent<IPage>()
    .where({ _locale: currentLocale.value, _path: '/lab' })
    .findOne());

if (contentData?.value)
  useContentHead(contentData as Ref<IPage>);

// Fetch Last.fm data
const page = ref(1);
const pageSize = ref(50);

const { data: lastFmData, pending, error } = await useFetch(`https://ws.audioscrobbler.com/2.0/`, {
  params: {
    method: 'user.getrecenttracks',
    user: 'botmaster',
    api_key: config.public.lastFmApiKey,
    format: 'json',
    extended: 1,
    limit: pageSize,
    page,
  },
  transform: (data: { recenttracks?: Recenttracks }) => {
    // Add an id to each track
    data.recenttracks?.track?.forEach((track) => {
      track.id = uuidv4();
    });
    return data.recenttracks;
  },
  onResponse() {
    scrollListToTop();
  },
});

// Computed data
const trackList = computed<Track[]>(() => {
  // Remove first track if it's the now playing track
  if (lastFmData.value?.track?.[0]?.['@attr']?.nowplaying)
    return lastFmData.value?.track?.slice(1) || [];

  return lastFmData.value?.track || [];
});

// Computed - Get now playing track
const nowPlayingTrack = computed<Track | undefined>(() => {
  if (lastFmData.value?.track?.[0]?.['@attr']?.nowplaying)
    return lastFmData.value?.track?.[0];

  return undefined;
});

const {
  currentPage,
  currentPageSize,
  pageCount,
} = useOffsetPagination({
  total: lastFmData?.value ? lastFmData.value['@attr'].total : 0,
  page: 1,
  pageSize,
  onPageChange(returnValue) {
    page.value = returnValue.currentPage;
  },
});

// Scroll to top of the list when page changes
function scrollListToTop() {
  const listElement = playlistListRef.value;
  if (listElement) {
    listElement.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }
}
</script>

<template>
  <main>
    <NuxtLayout name="content">
      <template #heroContent>
        <p class="h3">
          🧪
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

      <ContentRenderer v-if="contentData" class="nuxt-content" :value="contentData" />

      <div class="mt-6 flex flex-col gap-4 lg:mt-8 lg:flex-row lg:gap-14">
        <div>
          <p class="text-sm uppercase text-primary">
            {{ t('pages.lab.scrobbles') }}
          </p>
          <p class="display flex gap-4 text-4xl font-black leading-none">
            <i18n-n tag="span" :value="Number(lastFmData?.['@attr'].total || 0)" />
            🤯
          </p>
        </div>

        <div>
          <p class="text-sm uppercase text-primary">
            {{ t('pages.lab.nowPlaying') }}
          </p>
          <ScrobbleListItem v-if="nowPlayingTrack" :track="nowPlayingTrack" size="large" tag="div" title-tag="p" />
          <p v-else class="display flex gap-4 text-4xl leading-none">
            {{ t('pages.lab.listeningNothing') }}<span>😴</span>
          </p>
        </div>
      </div>
      <h4 class="mt-16 flex items-center gap-2">
        {{ t('pages.lab.scrobblesHistory') }}<Transition name="fade">
          <AppLoader v-if="pending" class="inline-block text-[0.8em]" />
        </Transition>
      </h4>

      <p class="mt-4 text-sm text-muted-text">
        {{ t('pages.lab.tracksPerPage', currentPageSize) }}. {{ t('pages.lab.orderedByDate') }}. {{ t('pages.lab.newestFirst') }}.
      </p>

      <pre v-if="error" class="overflow-x-auto text-xs">{{ error }}</pre>

      <ul
        v-else-if="trackList?.length"
        ref="playlistListRef"
        class="-ml-4 mt-6 grid max-h-[50vh] gap-6 overflow-y-auto pl-4 transition-opacity duration-300 ease-in-out xl:grid-cols-2"
        data-lenis-prevent
        :class="{ 'opacity-20': pending }"
      >
        <ScrobbleListItem v-for="track in trackList" :key="track.id" :track="track" tag="li" title-tag="p" />
      </ul>
      <div class="mt-6 overflow-hidden text-center">
        <AppPaginate v-model="currentPage" :page-count="pageCount" />
      </div>
    </NuxtLayout>
  </main>
</template>
