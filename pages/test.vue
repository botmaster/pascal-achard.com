<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import type { Recenttracks, Track } from '~/types/types';
import AppPaginate from '~/components/AppPaginate.vue';

definePageMeta({
  layout: 'content',
});

const config = useRuntimeConfig();

const page = ref(1);
const pageSize = ref(50);
const recentTracksData = ref<Recenttracks>();

await fetchData({ currentPage: page.value, currentPageSize: pageSize.value });

// Computed data
const trackList = computed<Track[]>(() => recentTracksData.value?.track || []);

async function fetchData({ currentPage, currentPageSize }: { currentPage: number, currentPageSize: number }) {
  console.log('fetchData');

  return useFetch<Record<string, Recenttracks>>(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=botmaster&api_key=${config.public.lastFmApiKey}&format=json&extended=1&limit=${currentPageSize}&page=${currentPage}`).then((data) => {
    console.log('data', data.data.value);

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
  <div>
    <h2 class="mb-8">
      Test
    </h2>
    <!--    <pre class="grid gap-x-4 gap-y-2 grid-cols-2 items-center content-start">
      <code>total:</code>
      <code>{{ recentTracksData?.["@attr"].total }}</code>
      <code>pageCount:</code>
      <code>{{ pageCount }}</code>
      <code>currentPageSize:</code>
      <code>{{ currentPageSize }}</code>
      <code>currentPage:</code>
      <code>{{ currentPage }}</code>
      <code>isFirstPage:</code>
      <code>{{ isFirstPage }}</code>
      <code>isLastPage:</code>
      <code>{{ isLastPage }}</code>
    </pre> -->

    <div>
      <p class="uppercase text-sm text-muted-text">
        Scrobbles
      </p>
      <p class="flex gap-[1ch] font-display text-4xl text-primary leading-none">
        <i18n-n tag="span" :value="Number(recentTracksData?.['@attr'].total || 0)" /> 🤯
      </p>
    </div>

    <p class="mt-8 text-sm text-muted-text">
      {{ currentPageSize }} scrobbles per page
    </p>

    <ul v-if="recentTracksData" class="grid gap-6 mt-2 max-h-[50vh] overflow-y-auto bg-accent/10 p-2" data-lenis-prevent>
      <li v-for="track in trackList" :key="track.id" class="flex gap-6 items-start">
        <!-- Image     -->
        <img v-if="track.image[3]['#text']" :src="track.image[3]['#text']" alt="" loading="lazy" class="w-20 aspect-square object-cover shrink-0">

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
</template>

<style scoped lang="scss">

</style>
