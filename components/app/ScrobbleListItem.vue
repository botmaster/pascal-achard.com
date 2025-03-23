<script setup lang="ts">
import type { Track } from '~/types/last-fm/types';
import { Size } from '~/types/last-fm/types';

// Props type definition
interface Props {
  track: Track
  tag?: string
  titleTag?: string
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'article',
  titleTag: 'h3',
  size: 'medium',
});

const sizeMap = {
  small: '--small',
  medium: '--medium',
  large: '--large',
};

const sizeClass = computed(() => `track-item${sizeMap[props.size]}`);

// Computed - Get track image
const trackImage = computed(() => {
  let size = Size.Medium;
  switch (props.size) {
    case 'small':
      size = Size.Small;
      break;
    case 'large':
      size = Size.Large;
      break;
  }
  return props.track?.image?.find(image => image.size === size);
});

const image = computed<{
  src: string
  alt: string
  width: number
  height: number
  loading: 'lazy' | 'eager'
}>(() => {
  let width = 80;
  let height = 80;
  switch (props.size) {
    case 'small':
      width = 40;
      height = 40;
      break;
    case 'large':
      width = 140;
      height = 140;
      break;
  }

  return {
    src: trackImage.value?.['#text'] || '',
    alt: props.track.name || '',
    width,
    height,
    loading: 'lazy',
  };
});
</script>

<template>
  <Component :is="tag" class="track-item" :class="sizeClass">
    <a v-if="trackImage?.['#text']" target="_blank" rel="noopener" :href="props.track.url" class="track-item__media">
      <img v-show="image.src" v-bind="image" :loading="image.loading">
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
      <p v-if="props.track.date?.uts" class="track-item__meta">
        <span class="block">
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
  $self: &;

  @apply grid grid-cols-[auto,1fr] items-start;

  &__media {
    @apply relative flex items-center justify-center shadow-lg shadow-primary/10 rounded-md overflow-hidden aspect-square bg-snowstorm-nord-6 dark:bg-polarnight-nord-3;

    > img {
      @apply object-cover w-full h-full;
    }

  }

  &__content {
    @apply pr-2;
  }

  &__meta {
    @apply text-muted-text leading-tight;

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
    @apply display leading-[1] mb-[0.1em] line-clamp-2;
  }

  &--small {
    @apply gap-2;
    #self__media {
      @apply size-12;
    }
    #{$self}__title {
      @apply text-base leading-none;;
    }
    #{$self}__meta {
      @apply text-xs;
    }
  }

  &--medium {
    @apply gap-3;
    #{$self}__media {
      @apply size-20;
    }
    #{$self}__title {
      @apply text-xl leading-none;;
    }
    #{$self}__meta {
      @apply text-sm;
    }
  }

  &--large {
    @apply gap-5;
    #{$self}__media {
      @apply size-28;
    }
    #{$self}__title {
      @apply text-4xl leading-none;
    }
    #{$self}__meta {
      @apply text-base;
    }
  }
}
</style>
