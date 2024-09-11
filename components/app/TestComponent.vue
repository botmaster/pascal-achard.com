<script setup>
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue';
import { ref } from 'vue';

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
];
const selectedPeople = ref([people[0], people[1]]);
</script>

<template>
  <Combobox v-model="selectedPeople" as="div" multiple>
    <ul v-if="selectedPeople.length > 0">
      <li v-for="person in selectedPeople" :key="person.id">
        {{ person.name }}
      </li>
    </ul>
    <ComboboxInput />
    <ComboboxOptions>
      <ComboboxOption v-for="person in people" :key="person.id" :value="person">
        {{ person.name }}
      </ComboboxOption>
    </ComboboxOptions>
  </Combobox>
</template>
