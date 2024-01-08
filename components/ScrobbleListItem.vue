<script setup lang="ts">
import { Size, type Track } from '~/types/types';

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
  // Get the Medium image
  let size = Size.Large;
  switch (props.size) {
    case 'small':
      size = Size.Medium;
      break;
    case 'large':
      size = Size.Large;
      break;
  }
  return props.track?.image?.find(image => image.size === size);
});
</script>

<template>
  <Component :is="tag" class="track-item" :class="sizeClass">
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

  @apply grid  grid-cols-[auto,1fr] items-start;

  &__media {
    @apply shadow-lg shadow-primary dark:shadow-primary/30 rounded-md overflow-hidden;
    > img {
      @apply  aspect-square object-cover;
    }
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
    @apply font-display leading-[1] mb-[0.1em];
  }

  &--small {
    @apply gap-2;
    #{$self}__media {
      > img {
        @apply w-12;
      }
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
      > img {
        @apply w-20;
      }
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
      > img {
        @apply w-28;
      }
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
