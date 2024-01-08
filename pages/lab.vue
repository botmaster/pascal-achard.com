<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import type { IPage, Recenttracks, Track } from '~/types/types';

definePageMeta({
  layout: false,
});

const config = useRuntimeConfig();

const { locale: currentLocale } = useI18n();

const playlistListRef = ref<HTMLElement | null>(null);

// Fetch Content data
const { data: contentData } = await useAsyncData(`lab-${currentLocale.value}`, () =>
  queryContent<IPage>()
    .where({ _locale: currentLocale.value, _path: '/lab' })
    .findOne());

if (contentData)
  useContentHead(contentData as any); // TODO: fix type

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
    scrollListToTop();
  },
});

// Scroll to top of the list when page changes
function scrollListToTop() {
  const listElement = playlistListRef.value as HTMLElement;
  if (listElement) {
    listElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
</script>

<template>
  <main>
    <NuxtLayout name="content">
      <template #heroBackground>
        <img
          src="@/assets/images/music/hero-bg.jpg"
          width="2170"
          height="1074"
          alt=""
        >
      </template>
      <template #heroContent>
        <p class="h3">
          🧪
        </p><p />
        <h1 class="text-white">
          {{ contentData?.coverTitle }}
        </h1>
        <p class="text-white h3">
          {{ contentData?.coverSubtitle }}
        </p>
        <p class="text-white">
          {{ contentData?.coverDescription }}
        </p>
      </template>

      <ContentRenderer v-if="contentData" class="nuxt-content" :value="contentData" />

      <div class="flex flex-col gap-4 lg:flex-row lg:gap-14 mt-6">
        <div>
          <p class="uppercase text-sm text-primary">
            Scrobbles
          </p>
          <p class="flex gap-4 font-display text-4xl  leading-none">
            <i18n-n tag="span" :value="Number(lastFmData?.['@attr'].total || 0)" />
            🤯
          </p>
        </div>

        <div v-if="nowPlayingTrack">
          <p class="uppercase text-sm text-primary">
            Now Playing
          </p>
          <ScrobbleListItem :track="nowPlayingTrack" size="large" tag="div" title-tag="p" />
        </div>
      </div>
      <h4 class="mt-10 flex items-center gap-2">
        Scrobbles history <Transition name="fade">
          <AppLoader v-if="pending" class="inline-block text-[0.8em]" />
        </Transition>
      </h4>

      <p class="mt-4 text-sm text-muted-text">
        {{ currentPageSize }} scrobbles per page. Ordered by date. Newest first.
      </p>

      <pre v-if="error" class="text-xs overflow-x-auto">{{ error }}</pre>

      <ul
        v-else-if="trackList?.length"
        ref="playlistListRef"
        class="grid gap-6 mt-2 max-h-[50vh] overflow-y-auto pl-4 -ml-4"
        data-lenis-prevent
      >
        <ScrobbleListItem v-for="track in trackList" :key="track.id" :track="track" tag="li" title-tag="p" />
      </ul>
      <div class="mt-6 text-center">
        <AppPaginate v-model="currentPage" :page-count="pageCount" />
      </div>
    </NuxtLayout>
  </main>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
