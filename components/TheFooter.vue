<script setup lang="ts">
interface ILink {
  href: string
  'aria-label': string
  icon: {
    title: string
    name: string
  }
}

const { t } = useI18n();

// links
const links: ILink[] = [
  {
    'href': 'https://github.com/botmaster',
    'aria-label': 'GitHub',
    'icon': {
      title: 'GitHub icon',
      name: 'cib:github',
    },
  },
  {
    'href': 'https://www.linkedin.com/in/pascal-achard',
    'aria-label': 'LinkedIn',
    'icon': {
      title: 'LinkedIn icon',
      name: 'cib:linkedin',
    },
  },
  {
    'href': 'https://codepen.io/botmaster/',
    'aria-label': 'CodePen',
    'icon': {
      title: 'CodePen icon',
      name: 'cib:codepen',
    },
  },
  {
    'href': 'https://www.instagram.com/botmaster/',
    'aria-label': 'Instagram',
    'icon': {
      title: 'Instagram icon',
      name: 'cib:instagram',
    },
  },
  {
    'href': 'https://twitter.com/botmaster',
    'aria-label': 'Twitter',
    'icon': {
      title: 'Twitter icon',
      name: 'cib:twitter',
    },
  },
  {
    'href': 'https://www.last.fm/user/botmaster',
    'aria-label': 'Last.fm',
    'icon': {
      title: 'Last.fm icon',
      name: 'cib:last-fm',
    },
  },
];

// IntersectionObserver
const target = ref(null);
const targetIsVisible = ref(false);

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting;
});

// Color mode
const colorMode = useColorMode();
const themeList = computed(() => [
  {
    name: 'system',
    label: t('theme.auto'),
    icon: 'material-symbols:computer',
  },
  { name: 'dark', label: t('theme.dark'), icon: 'material-symbols:dark-mode' },
  {
    name: 'light',
    label: t('theme.light'),
    icon: 'material-symbols:light-mode',
  },
]);
</script>

<template>
  <footer ref="target" class="py-6 md:py-8">
    <div class="mx-4 md:mx-8">
      <div class="md:flex md:justify-between md:items-center">
        <div class="flex gap-4 mb-4 md:mb-0">
          <a
            v-for="(item, index) in links"
            :key="index"
            :href="item.href"
            target="_blank"
            rel="noopener"
            class="social-item"
            :class="{ 'is-inview': targetIsVisible }"
            :aria-label="item['aria-label']"
            :title="item['aria-label']"
          >
            <span class="social-item__icon">
              <Icon :name="item.icon.name" />
            </span>
          </a>
        </div>
        <div
          class="theme-switcher-wrapper"
          :class="{ 'is-inview': targetIsVisible }"
        >
          <theme-switcher-component
            v-model="colorMode.preference"
            :theme-list="themeList"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.social-item {
  $self: &;

  &.is-inview {
    #{$self}__icon {
      transform: none;
      opacity: 1;
    }

    @for $i from 1 through 6 {
      &:nth-child(#{$i}) {
        #{$self}__icon {
          transition-delay: $i * 0.1s;
        }
      }
    }
  }

  &__icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    font-size: 24px;

    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.4s cubic-bezier(0.215, 0.61, 0.355, 1),
      transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);

    svg {
      fill: currentColor;
    }
  }
}

.theme-switcher-wrapper {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.4s cubic-bezier(0.215, 0.61, 0.355, 1),
    transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  &.is-inview {
    transition-delay: 0.7s;
    transform: none;
    opacity: 1;
  }
}
</style>
