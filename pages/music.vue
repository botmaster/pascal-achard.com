<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import type { IPage, Recenttracks, Track } from '~/types/types';

definePageMeta({
  layout: false,
});

const config = useRuntimeConfig();

const { locale: currentLocale } = useI18n();

// Fetch Content data
const { data: contentData } = await useAsyncData(`music-${currentLocale.value}`, () =>
  queryContent<IPage>()
    .where({ _locale: currentLocale.value, _path: '/music' })
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
  },
});
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
        <h1 class="text-white">
          {{ contentData?.coverTitle }}
        </h1>
      </template>

      <ContentRenderer v-if="contentData" class="nuxt-content" :value="contentData" />

      <div class="mt-8">
        <p class="uppercase text-sm text-muted-text">
          Scrobbles
        </p>
        <p class="flex gap-[1ch] font-display text-4xl text-primary leading-none">
          <i18n-n tag="span" :value="Number(lastFmData?.['@attr'].total || 0)" />
          🤯
        </p>
      </div>

      <div class="mt-8">
        <p class="uppercase text-sm text-muted-text">
          Now Playing
        </p>
        <p class="flex gap-[1ch] font-display text-4xl text-primary leading-none">
          <span v-if="nowPlayingTrack">
            {{ nowPlayingTrack.name }}
          </span>
          <span v-else>
            Nothing 😢
          </span>
        </p>
        <!--  Track now playing meta        -->
        <div v-if="nowPlayingTrack" class="flex flex-wrap mt-1 leading-tight text-sm">
          <span>Artist: {{ nowPlayingTrack.artist.name }}</span><span>&nbsp;-&nbsp;</span>
          <span>Album: {{ nowPlayingTrack.album["#text"] }}</span><span>&nbsp;-&nbsp;</span>

          <!-- Link         -->
          <span v-if="nowPlayingTrack.url">
            Track on : <a :href="nowPlayingTrack.url">Last.fm</a>
          </span>
        </div>

        <h4 class="mt-10">
          Scrobbles history
        </h4>

        <p class="mt-4 text-sm text-muted-text">
          {{ currentPageSize }} scrobbles per page. Ordered by date. Newest first.
        </p>
        <p v-if="pending">
          Fetching...
        </p>
        <pre v-else-if="error" class="text-xs overflow-x-auto">{{ error }}</pre>

        <ul
          v-else-if="trackList?.length"
          class="grid gap-6 mt-2 max-h-[50vh] overflow-y-auto"
          data-lenis-prevent
        >
          <ScrobbleListItem v-for="track in trackList" :key="track.id" :track="track" tag="li" title-tag="p" />
        </ul>
        <div class="mt-6 text-center">
          <AppPaginate v-model="currentPage" :page-count="pageCount" />
        </div>
        <p>
          pending: {{ pending }}
        </p>

        <p>
          error: {{ error }}
        </p>
      </div>
    </NuxtLayout>
  </main>
</template>

<style scoped lang="scss">

</style>
