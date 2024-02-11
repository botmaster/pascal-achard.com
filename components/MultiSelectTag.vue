<script lang="ts" setup>
import { Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions } from '@headlessui/vue';

// Interfaces
interface IMultiSelectTagOption {
  id: string
  name: string
  color: 'blue' | 'brown' | 'default' | 'gray' | 'green' | 'orange' | 'pink' | 'purple' | 'red' | 'yellow'
}

// Props
const props = withDefaults(defineProps<{
  options: IMultiSelectTagOption[]
  placeholder?: string
}>(), {
  placeholder: 'Select an option',
});

// Model
const selectedOptions = defineModel<IMultiSelectTagOption[]>({ required: true });

const query = ref('');

const filteredOption = computed(() =>
  query.value === ''
    ? props.options
    : props.options.filter(option =>
      option.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.value.toLowerCase().replace(/\s+/g, '')),
    ),
);

function displayValue(options: IMultiSelectTagOption[]) {
  return options.map(option => option.name).join(', ');
}
</script>

<template>
  <Combobox v-model="selectedOptions" as="div" multiple nullable by="id">
    <ComboboxLabel class="mb-1 block">
      Tags
    </ComboboxLabel>
    <div class="multi-select form-multiselect">
      <div
        class="multi-select__values-container"
      >
        <p class="multi-select__value">
          <span v-if="selectedOptions.length === 0" class="multi-select__label">{{ props.placeholder }}</span> <span
            v-else
          >{{ displayValue(selectedOptions) }}</span>
        </p>
      </div>

      <ComboboxButton
        class="multi-select__button" tabindex="0"
      />

      <ComboboxOptions
        class="multi-select__options"
        as="div"
      >
        <div class="multi-select__options-header">
          <ComboboxInput
            class="multi-select__search-input"
            placeholder="Search..."
            @change="query = $event.target.value"
          />
        </div>
        <ul class="multi-select__option-list" data-lenis-prevent>
          <li
            v-if="filteredOption.length === 0 && query !== ''"
            class="multi-select__nothing-found"
          >
            Nothing found.
          </li>
          <ComboboxOption
            v-for="option in filteredOption" :key="option.id" v-slot="{ active, selected }"
            :value="option" as="template"
          >
            <li
              class="multi-select__option" :aria-selected="selected" :class="{ active }"
            >
              <input class="form-checkbox" type="checkbox" :checked="selected"><span
                class="badge badge--is-small badge--is-neutral"
                :class="[selected && 'font-semibold']"
              >{{ option.name }}</span>
            </li>
          </ComboboxOption>
        </ul>
        <div class="multi-select__options-footer">
          <div class="flex gap-1.5">
            <span class="text-xs">
              {{ selectedOptions.length }} / {{ props.options.length }} selected
            </span>
            <button v-if="selectedOptions.length > 0" class="ml-auto text-xs" @click="selectedOptions = []">
              Clear selection
            </button>
          </div>
        </div>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<style scoped lang="scss">
.multi-select {
  @apply  w-full relative flex items-center bg-white min-w-48 p-0;

  &__values-container {
    @apply min-w-0 max-w-64 flex-grow;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    padding-left: 0.75rem;
  }

  &__value {
    @apply truncate;
  }

  &__button {
    @apply ml-auto w-8 inline-block leading-none self-stretch;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
  }

  &__options {
    @apply absolute left-0 top-[100%] z-10 mt-1  w-full rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm;
  }

  &__options-header {
   @apply px-2 py-2;
  }

  &__search-input {
    @apply w-full px-3 py-1.5 text-body-txt border-0 rounded-md shadow-sm;
  }

  &__option-list {
    @apply relative overflow-auto max-h-60;
  }

  &__options-footer {
    @apply px-2 py-2;
  }

  &__option {
    @apply relative flex items-center gap-2 cursor-default select-none py-1.5 px-3;

    &.active {
      @apply bg-accent text-accent-content;
    }

  }

  &__nothing-found {
    @apply relative cursor-default select-none px-4 py-2;
  }
}
</style>
