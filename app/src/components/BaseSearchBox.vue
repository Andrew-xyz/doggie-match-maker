<script setup>
import { ref, computed } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import BaseButtonIcon from "./BaseButtonIcon.vue";

const props = defineProps({
  selections: { type: Array, default: [] },
  placeholder: { type: String, default: "Filter" },
});
const emit = defineEmits(["itemSelected"]);

// Filter items via user input
const query = ref("");
const filteredSelection = computed(() =>
  query.value === ""
    ? props.selections
    : props.selections.filter((selected) =>
        selected
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);

// Emit the selected item
const selected = ref("");
function selectItem(selection) {
  selected.value = "";
  emit("itemSelected", selection);
}
</script>

<template>
  <div class="w-full">
    <Combobox v-model="selected">
      <div class="relative mt-1">
        <div
          class="relative opacity-50 w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <ComboboxInput
            class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            :displayValue="(selection) => selection"
            :placeholder="placeholder"
            @change="query = $event.target.value"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <BaseButtonIcon
              name="chevronupdown"
              class="w-5 h-5 stroke-gray-500"
            />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <div
              v-if="filteredSelection.length === 0 && query !== ''"
              class="relative cursor-default select-none py-2 px-4 text-gray-700"
            >
              No Items Found.
            </div>

            <ComboboxOption
              v-for="selection in filteredSelection"
              as="template"
              :key="filteredSelection.indexOf(selection)"
              :value="selection"
              v-slot="{ selected, active }"
              @click="selectItem(selection)"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-purple-900/50 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span class="block truncate font-normal">
                  {{ selection }}
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>
