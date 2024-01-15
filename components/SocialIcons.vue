<script setup lang="ts">
import type { ISocialLink } from '~/types/types';

const props = defineProps<{ links?: Array<ISocialLink> }>();
</script>

<template>
  <div class="social-icons">
    <a
      v-for="(item, index) in props.links"
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
</template>

<style lang="scss" scoped>
.social-icons {
  @apply flex flex-wrap items-baseline gap-4;
}

.social-item {
  $self: &;

  &__icon {
    display: inline-block;

    svg {
      fill: currentColor;
    }
  }
}
</style>
