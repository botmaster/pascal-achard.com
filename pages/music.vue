<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import type { IPage, Recenttracks, Track } from '~/types/types';

definePageMeta({
  layout: false,
});

const config = useRuntimeConfig();

const { locale: currentLocale } = useI18n();

const { data } = await useAsyncData(`music-${currentLocale.value}`, () =>
  queryContent<IPage>()
    .where({ _locale: currentLocale.value, _path: '/music' })
    .findOne());

if (data)
  useContentHead(data as any); // TODO: fix type

const page = ref(1);
const pageSize = ref(50);
const recentTracksData = ref<Recenttracks>();

await fetchData({ currentPage: page.value, currentPageSize: pageSize.value });

// Computed data
const trackList = computed<Track[]>(() => {
  // Remove first track if it's the now playing track
  if (recentTracksData.value?.track?.[0]?.['@attr']?.nowplaying)
    return recentTracksData.value?.track?.slice(1) || [];

  return recentTracksData.value?.track || [];
});

// Computed - Get now playing track
const nowPlayingTrack = computed<Track | undefined>(() => {
  if (recentTracksData.value?.track?.[0]?.['@attr']?.nowplaying)
    return recentTracksData.value?.track?.[0];

  return undefined;
});

async function fetchData({ currentPage, currentPageSize }: { currentPage: number, currentPageSize: number }) {
  return useFetch<Record<string, Recenttracks>>(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=botmaster&api_key=${config.public.lastFmApiKey}&format=json&extended=1&limit=${currentPageSize}&page=${currentPage}`).then((data) => {
    // Add an id to each track
    data?.data?.value?.recenttracks?.track?.forEach((track) => {
      track.id = uuidv4();
    });

    recentTracksData.value = data?.data?.value?.recenttracks;
  });
}

const {
  currentPage,
  currentPageSize,
  pageCount,
} = useOffsetPagination({
  total: recentTracksData.value?.['@attr'].total || 0,
  page: 1,
  pageSize,
  onPageChange: fetchData,
  onPageSizeChange: fetchData,
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
        <h1>
          {{ data?.coverTitle }}
        </h1>
      </template>

      <ContentRenderer v-if="data" class="nuxt-content" :value="data" />

      <div class="mt-8">
        <p class="uppercase text-sm text-muted-text">
          Scrobbles
        </p>
        <p class="flex gap-[1ch] font-display text-4xl text-primary leading-none">
          <i18n-n tag="span" :value="Number(recentTracksData?.['@attr'].total || 0)" /> 🤯
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

        <ul v-if="recentTracksData" class="grid gap-6 mt-2 max-h-[50vh] overflow-y-auto rounded bg-primary/5 px-3 py-3 dark:bg-primary/15" data-lenis-prevent>
          <li v-for="track in trackList" :key="track.id" class="flex gap-3 items-start">
            <!-- Image     -->
            <a v-if="track.image[3]['#text']" :href="track.url" target="_blank" class="shrink-0">
              <img :src="track.image[3]['#text']" alt="" loading="lazy" class="w-20 aspect-square object-cover">
            </a>

            <!--  Meta    -->
            <div class="flex-grow">
              <h3 class="font-black text-xl leading-none">
                {{ track.name }}
              </h3>
              <div class="flex flex-wrap mt-1 leading-tight text-sm">
                <span>Artist: {{ track.artist.name }}</span><span>&nbsp;-&nbsp;</span>
                <span>Album: {{ track.album["#text"] }}</span><span>&nbsp;-&nbsp;</span>

                <!-- Date         -->
                <span v-if="track.date">
                  Date: {{ track.date["#text"] }}
                </span><span>&nbsp;-&nbsp;</span>
                <ClientOnly>
                  <span v-if="track.date">
                    Local date: {{ new Date(Number(track.date?.uts) * 1000).toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }) }}
                  </span><span>&nbsp;-&nbsp;</span>
                </ClientOnly>

                <!-- Link         -->
                <span v-if="track.url">
                  Track on : <a :href="track.url">Last.fm</a>
                </span><span>&nbsp;-&nbsp;</span>

                <!-- Now Playing ?         -->
                <span v-if="track['@attr']?.nowplaying">
                  Now Playing
                  <Icon name="material-symbols:android-now-playing-outline" />
                </span>
              </div>
            </div>
          </li>
        </ul>
        <div class="mt-6 text-center">
          <AppPaginate v-model="currentPage" :page-count="pageCount" />
        </div>
      </div>
    </NuxtLayout>
  </main>
</template>

<style scoped lang="scss">

</style>
