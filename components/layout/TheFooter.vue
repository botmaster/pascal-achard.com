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
  <footer class="the-footer">
    <div class="the-footer__container">
      <div class="the-footer__socials wrapper-outline">
        <div class="the-footer__socials-icons">
          <a
            v-for="(item, index) in links"
            :key="index"
            :href="item.href"
            target="_blank"
            rel="noopener"
            class="social-item"
            :aria-label="item['aria-label']"
            :title="item['aria-label']"
          >
            <span class="social-item__icon">
              <Icon :name="item.icon.name" />
            </span>
          </a>
        </div>
        <p class="the-footer__copyright">
          <span class="sr-only">copyright</span>Pascal Achard <sup><Icon name="material-symbols:copyright-outline" size="0.8em" /></sup> {{ new Date().getFullYear() }}
        </p>
      </div>

      <div
        class="the-footer__theme-switcher"
      >
        <theme-switcher-component
          v-model="colorMode.preference"
          :theme-list="themeList"
          size="md"
          class="wrapper-outline"
        />
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.the-footer {
  @apply relative py-6;

  &__container {
    @apply mx-4 md:mx-8 flex flex-col gap-y-4 items-start md:flex-row md:justify-between md:items-center;
  }

  &__socials {
    @apply overflow-y-clip md:flex md:gap-4 md:items-baseline;
  }

  &__socials-icons {
    @apply flex flex-wrap items-baseline gap-4;
  }

  &__copyright {
    @apply text-muted-text text-xs mt-2 md:mt-0;
  }

  &__theme-switcher {
    @apply inline-flex md:block;
  }
}

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
    svg {
      fill: currentColor;
    }
  }
}
</style>
