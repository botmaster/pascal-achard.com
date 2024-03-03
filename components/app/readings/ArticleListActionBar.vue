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
const type = defineModel<string>('type', { required: true });
const sort = defineModel<string>('sort', { required: true });

// Computed - Has any filters
const hasFilters = computed<boolean>(() => {
  return status.value !== '' || type.value !== '' || search.value !== '' || selectedOptions.value.length > 0;
});

// Map status
const mapStatus = computed<Record<string, string>>(() => {
  return {
    'all': t('pages.readings.filters.status.all'),
    'To read': t('pages.readings.filters.status.toRead'),
    'Read': t('pages.readings.filters.status.read'),
    'Reading': t('pages.readings.filters.status.inProgress'),
    'Canceled': t('pages.readings.filters.status.canceled'),
  };
});

// Map type
const mapType = computed<Record<string, string>>(() => {
  return {
    all: t('pages.readings.filters.type.all'),
    Article: t('pages.readings.filters.type.article'),
    Podcast: t('pages.readings.filters.type.podcast'),
    Video: t('pages.readings.filters.type.video'),
  };
});

// Map sort
const mapSort = computed<Record<string, string>>(() => {
  return {
    'Created time': t('pages.readings.sort.createdTime'),
    'Last edited time': t('pages.readings.sort.lastEditedTime'),
    'Name': t('pages.readings.sort.name'),
    'Score': t('pages.readings.sort.score'),
  };
});
</script>

<template>
  <div>
    <div class="flex flex-col flex-wrap gap-x-4 gap-y-1.5 md:flex-row md:items-end">
      <div class="flex-grow md:mr-auto lg:max-w-80">
        <input
          v-model.lazy="search" autocomplete="search" name="search" type="text"
          :placeholder="t('pages.readings.filters.searchPlaceHolder')" class="form-input min-w-64"
        >
      </div>

      <Transition name="fade">
        <AppLoader v-if="pending" class="m-1 text-2xl" />
      </Transition>

      <div>
        <label class="mb-1 block" for="selectStatus">{{ t('pages.readings.filters.statusLabel') }}</label>
        <select id="selectStatus" v-model="status" class="form-select">
          <option value="">
            {{ t('pages.readings.filters.status.all') }}
          </option>
          <option value="To read">
            {{ mapStatus['To read'] }}
          </option>
          <option value="Read">
            {{ mapStatus.Read }}
          </option>
          <option value="Reading">
            {{ mapStatus.Reading }}
          </option>
          <option value="Canceled">
            {{ mapStatus.Canceled }}
          </option>
        </select>
      </div>

      <div>
        <label class="mb-1 block" for="selectType">{{ t('pages.readings.filters.typeLabel') }}</label>
        <select id="selectType" v-model="type" class="form-select">
          <option value="">
            {{ t('pages.readings.filters.type.all') }}
          </option>
          <option value="Article">
            {{ mapType.Article }}
          </option>
          <option value="Video">
            {{ mapType.Video }}
          </option>
          <option value="Podcast">
            {{ mapType.Podcast }}
          </option>
        </select>
      </div>

      <div>
        <MultiSelectTag v-model="selectedOptions" :options="tags" :placeholder="t('pages.readings.filters.tagsPlaceHolder')" />
      </div>

      <div>
        <label class="mb-1 block" for="selectSort">{{ t('pages.readings.sort.sortLabel') }}</label>
        <select id="selectSort" v-model="sort" class="form-select">
          <option value="Created time">
            {{ mapSort['Created time'] }}
          </option>
          <option value="Last edited time">
            {{ mapSort['Last edited time'] }}
          </option>
          <option value="Name">
            {{ mapSort.Name }}
          </option>
          <option value="Score">
            {{ mapSort.Score }}
          </option>
        </select>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="hasFilters" class="mt-4 flex items-start gap-6">
        <p class="flex-grow text-sm">
          {{ t('common.article', 1) }} <i18n-t v-if="status" keypath="pages.readings.filters.message.withStatus" tag="span" scope="global">
            <strong>{{ mapStatus[status] }}</strong>
          </i18n-t>  <i18n-t v-if="type" keypath="pages.readings.filters.message.withType" tag="span" scope="global">
            <strong>{{ mapType[type] }}</strong>
          </i18n-t> <i18n-t v-if="selectedOptions.length > 0" tag="span" keypath="pages.readings.filters.message.withTags" scope="global">
            <strong>{{ selectedOptions.map(tag => tag.name).toString() }}</strong>
          </i18n-t> <i18n-t v-if="search" tag="span" keypath="pages.readings.filters.message.withSearch" scope="global">
            <strong>{{ search }}</strong>
          </i18n-t> <i18n-t tag="span" keypath="pages.readings.filters.message.sortedBy" scope="global">
            <strong>{{ mapSort[sort] }}</strong>
          </i18n-t>.
        </p>
        <button class="inline-flex flex-shrink-0 items-center" @click="emit('clearFilters')">
          <Icon class="mr-1.5" name="material-symbols:cancel" />
          {{ t('common.clearFilters') }}
        </button>
      </div>
    </Transition>
  </div>
</template>
