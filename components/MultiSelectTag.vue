<script lang="ts" setup>
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/vue';

// Props
const props = defineProps<{
  options: { id: string, name: string }[]
}>();

const selectedOption = defineModel<string[]>({ required: true });

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

function displayValue(options: { id: string }[]) {
  return options.map(option => option.name).join(', ');
}
</script>

<template>
  <Combobox v-model="selectedOption" multiple nullable by="id">
    <div class="multi-select form-multiselect">
      <div
        class="multi-select__label-container"
      >
        <!--        <span v-if="selectedOption.length === 0" class="multi-select__label">Select an option</span> -->
        <ComboboxInput
          class="multi-select__label" :display-value="displayValue"
          placeholder="Select an option"
          @change="query = $event.target.value"
        />
      </div>

      <ComboboxButton
        class="ml-auto flex items-center"
      >
        <span>v</span>
      </ComboboxButton>

      <ComboboxOptions
        class="multi-select__options"
      >
        <div
          v-if="filteredOption.length === 0 && query !== ''"
          class="multi-select__nothing-found"
        >
          Nothing found.
        </div>
        <ComboboxOption
          v-for="option in filteredOption" :key="option.id" v-slot="{ active, selected }"
          :value="option" as="template"
        >
          <li
            class="multi-select__option" :aria-selected="selected" :class="{ active }"
          >
            <!--            <span class="block truncate" :class="[selected && 'font-semibold']">
              {{ option.name }}
            </span>

            <span
              v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-4"
              :class="[active ? 'text-white' : 'text-accent']"
            >
              ok
            </span> -->
            <input class="form-checkbox" type="checkbox" :checked="selected"><span :class="[selected && 'font-semibold']">{{ option.name }}</span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<style scoped lang="scss">
.multi-select {
  @apply w-full relative flex items-center bg-white px-3
  rounded-md border-0 py-1.5 text-body-txt shadow-sm ring-1 ring-inset ring-polarnight-nord-3
  focus:ring-2 focus:ring-inset focus:ring-accent sm:max-w-xs sm:text-sm sm:leading-6;

  &__label-container {
    @apply flex items-center overflow-x-clip;
  }

  &__label {
    color: red;
  }

  &__options {
    @apply absolute left-0 top-[100%] z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm;
  }

  &__option {
    @apply relative flex items-center gap-2 cursor-default select-none py-2 pl-3 pr-9;

    &.active {
      @apply bg-accent text-accent-content;
    }

  }

  &__nothing-found {
    @apply relative cursor-default select-none px-4 py-2;
  }
}
</style>
