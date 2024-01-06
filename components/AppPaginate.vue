<script setup lang="ts">
/**
 * A component for pagination.
 */

import { defineProps } from 'vue';

interface IProps {
  tag?: string
  max?: number
  pageCount: number
  modelValue: number
}

const props = withDefaults(defineProps<IProps>(), {
  tag: 'div',
  max: 7,
});

const emit = defineEmits(['update:modelValue']);

const goToPageValue = ref<HTMLInputElement>();

const currentPage = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

/* function onClickPage(page: number | string) {
  if (typeof page === 'string')
    return;

  currentPage.value = page;
} */

function onFormSubmit(event: Event) {
  event.preventDefault();
  currentPage.value = goToPageValue.value?.valueAsNumber || 1;
}
</script>

<template>
  <nav class="paginate">
    <div class="paginate__button-group">
      <!-- Button first page      -->
      <button
        class="paginate__button"
        :disabled="modelValue <= 1"
        title="First page"
        @click="currentPage = 1"
      >
        <Icon name="mdi:chevron-double-left" />
      </button>

      <!-- Button prev     -->
      <button
        class="paginate__button"
        :disabled="modelValue <= 1"
        title="Previous page"
        @click="currentPage = currentPage - 1"
      >
        <Icon name="mdi:chevron-left" />
      </button>

      <!--  Current page     -->
      <span class="paginate__label">
        {{ modelValue }} / {{ pageCount }}
      </span>
      <span>{{}}</span>

      <!--      <li v-for="page in pageCount" :key="page">
          <button
            :disabled="modelValue === page"
            @click="onClickPage(page)"
          >
            {{ page }}
          </button>
        </li> -->

      <!-- Button next      -->
      <button
        class="paginate__button"
        :disabled="modelValue >= pageCount"
        title="Next page"
        @click="currentPage = currentPage + 1"
      >
        <Icon name="material-symbols:chevron-right" />
      </button>

      <!-- Button last page      -->
      <button
        class="paginate__button"
        :disabled="modelValue >= pageCount"
        title="Last page"
        @click="currentPage = pageCount"
      >
        <Icon name="mdi:chevron-double-right" />
      </button>
    </div>

    <!--  Input go to page     -->
    <form class="paginate__form" @submit.prevent="onFormSubmit">
      <label for="goToPageValue">Go to page</label>
      <input
        id="goToPageValue"
        ref="goToPageValue"
        class="paginate__input" type="number" name="goToPageValue" min="1" :max="pageCount"
        :value="props.modelValue"
      >
      <button type="submit">
        Go<Icon name="mdi:chevron-right" />
      </button>
    </form>
  </nav>
</template>

<style scoped lang="scss">
.paginate {
  @apply flex flex-wrap gap-2 items-center justify-between  text-sm;

  &__button-group {
    @apply flex items-center;
  }

  &__button {
    @apply flex items-center justify-center w-5 h-5;

    &:disabled {
      @apply opacity-50 cursor-not-allowed;
    }
  }

  &__label {
    @apply px-3;
  }

  &__form {
    @apply flex gap-2 items-center text-sm text-muted-text;

    button {
      @apply font-medium text-body-txt;
    }
  }

  &__input {
    @apply w-auto px-1.5 py-1  bg-snowstorm-nord-6 text-body-txt
    dark:bg-polarnight-nord-2 dark:text-body-txt;
  }
}
</style>
