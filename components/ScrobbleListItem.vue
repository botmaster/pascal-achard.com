<script setup lang="ts">
import { Size, type Track } from '~/types/types';

// Props type definition
interface Props {
  track: Track
  tag?: string
  titleTag?: string
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'article',
  titleTag: 'h3',
});

// Computed - Get track image
const trackImage = computed(() => {
  // Get the Medium image
  return props.track?.image?.find(image => image.size === Size.Medium);
});
</script>

<template>
  <Component :is="tag" class="track-item">
    <a v-if="trackImage?.['#text']" :href="props.track.url" class="track-item__media">
      <img :src="trackImage['#text']" alt="">
    </a>
    <div class="track-item__content">
      <!-- Title      -->
      <Component :is="titleTag" class="track-item__title">
        {{ props.track.name }}
      </Component>

      <!-- Meta     -->
      <p class="track-item__meta">
        <span>
          {{ props.track.artist.name }}
        </span>
        <span>
          {{ props.track.album['#text'] }}
        </span>
        <span v-if="props.track.url">
          <a :href="props.track.url" target="_blank">Détails</a>
        </span>
      </p>
      <p class="track-item__meta">
        <span v-if="props.track.date?.uts" class="block">
          <time :datetime="new Date(props.track.date.uts * 1000).toISOString()">
            <ClientOnly>
              <span v-if="track.date">
                Scrobblé le : {{ new Date(Number(track.date?.uts) * 1000).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }) }}
              </span>
            </ClientOnly>
          </time>
        </span>
      </p>
    </div>
  </Component>
</template>

<style scoped lang="scss">
.track-item {
  @apply grid gap-3 grid-cols-[auto,1fr] items-start;

  &__media {
    > img {
      @apply w-20 aspect-square object-cover;
    }
  }

  &__content {
    //
  }

  &__meta {
    @apply  text-sm text-muted-text leading-tight;

    > span {
      &:not(:last-of-type) {
        //@apply inline-flex items-center;
        &:after {
          @apply inline-block mx-1;
          content: "•";
        }
      }
    }
  }

  &__title {
    @apply font-display text-xl leading-none mb-1;
  }
}
</style>
