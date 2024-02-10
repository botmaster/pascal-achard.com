<script setup lang="ts">
// Define props
import type { IArticleTag } from '~/types/types';

defineProps<{
  tags: IArticleTag[]
  pending: boolean
}>();

// Define emits
const emit = defineEmits(['clearFilters']);

const { t } = useI18n();

// Define model
const selectedOptions = defineModel<IArticleTag[]>('selectedOptions', { required: true });
const search = defineModel<string>('search', { required: true });
const status = defineModel<string>('status', { required: true });
const sort = defineModel<string>('sort', { required: true });

// Computed - Has any filters
const hasFilters = computed<boolean>(() => {
  return status.value !== '' || search.value !== '' || selectedOptions.value.length > 0;
});
</script>

<template>
  <div class="flex flex-col flex-wrap gap-x-6 gap-y-1.5 lg:flex-row lg:items-end">
    <div class="lg:mr-8">
      <input
        v-model.lazy="search" autocomplete="search" name="search" type="text"
        placeholder="Search an article" class="form-input min-w-64"
      >
    </div>

    <div>
      <label class="mb-1 block" for="selectStatus">{{ t('pages.readings.filters.statusLabel') }}</label>
      <select id="selectStatus" v-model="status" class="form-select">
        <option value="">
          {{ t('pages.readings.filters.status.all') }}
        </option>
        <option value="To read">
          {{ t('pages.readings.filters.status.toRead') }}
        </option>
        <option value="Read">
          {{ t('pages.readings.filters.status.read') }}
        </option>
        <option value="Reading">
          {{ t('pages.readings.filters.status.inProgress') }}
        </option>
        <option value="Canceled">
          {{ t('pages.readings.filters.status.canceled') }}
        </option>
      </select>
    </div>

    <div>
      <MultiSelectTag v-model="selectedOptions" :options="tags" />
    </div>

    <div>
      <label class="mb-1 block" for="selectSort">{{ t('pages.readings.sort.sortLabel') }}</label>
      <select id="selectSort" v-model="sort" class="form-select">
        <option value="Created time">
          {{ t('pages.readings.sort.createdTime') }}
        </option>
        <option value="Last edited time">
          {{ t('pages.readings.sort.lastEditedTime') }}
        </option>
        <option value="Name">
          {{ t('pages.readings.sort.name') }}
        </option>
        <option value="Score">
          {{ t('pages.readings.sort.score') }}
        </option>
      </select>
    </div>

    <div v-if="hasFilters" class="leading-none lg:mb-2">
      <button class="inline-flex items-center" @click="emit('clearFilters')">
        <Icon class="mr-1.5" name="material-symbols:cancel" />
        {{ t('common.clearFilters') }}
      </button>
    </div>
    <Transition name="fade">
      <AppLoader v-if="pending" class="m-1 text-2xl" />
    </Transition>
  </div>
</template>
