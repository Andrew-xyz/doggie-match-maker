<script setup>
import { ref, watch, onMounted } from "vue";
import FilterItem from "./FilterItem.vue";
import FilterSelections from "./FilterSelections.vue";
import BaseSearchBox from "./BaseSearchBox.vue";
import BaseButtonText from "./BaseButtonText.vue";
import fetchClient from "@/services/fetch-api";

const emit = defineEmits([
  "updateBreedFilters",
  "updateZipCodeFilters",
  "updateAgeMaxFilter",
  "updateAgeMinFilter",
  "findMatch",
]);

// Retrieve all dog breeds on initial loadout
const breedList = ref([]);
onMounted(async () => {
  const response = await fetchClient.get("/dogs/breeds");
  breedList.value = response.data;
});

// Add / Remove Breed Filters
const breedFilters = ref([]);
function addRemoveBreedFilter(breed) {
  const index = breedFilters.value.indexOf(breed);
  if (index !== -1) breedFilters.value.splice(index, 1);
  else breedFilters.value.push(breed);
}
// Update Breed Filters
watch(breedFilters.value, () => {
  emit("updateBreedFilters", breedFilters.value);
});

// Add / Remove Zip Code Filters
const zipCodeFilters = ref([]);
function addRemoveZipCode(zipCode) {
  const index = zipCodeFilters.value.indexOf(zipCode);
  if (index !== -1) zipCodeFilters.value.splice(index, 1);
  else if (zipCode) zipCodeFilters.value.push(zipCode);
}
// Update Zip Code Filters
watch(zipCodeFilters.value, () => {
  emit("updateZipCodeFilters", zipCodeFilters.value);
});
</script>

<template>
  <div class="h-full w-full lg:grid grid-cols-1 gap-4">
    <div
      class="flex flex-col h-full overflow-hidden rounded-lg bg-white shadow"
    >
      <div class="flex flex-row items-center w-full h-16 p-4 bg-purple-900/75">
        <BaseSearchBox
          :selections="breedList"
          placeholder="Filter by Breed"
          @item-selected="addRemoveBreedFilter"
        />
      </div>

      <div class="flex flex-col w-full grow overflow-y-auto h-12">
        <FilterSelections
          @update-age-min="$emit('updateAgeMinFilter', $event)"
          @update-age-max="$emit('updateAgeMaxFilter', $event)"
          @add-zip-code="addRemoveZipCode"
        />
        <div class="flex w-full grow h-12 px-4 overflow-y-auto">
          <div class="flex flex-row w-full h-fit flex-wrap">
            <FilterItem
              v-for="breed in breedFilters"
              filter-type="breed"
              :filter-description="breed"
              @click="addRemoveBreedFilter(breed)"
            />
            <FilterItem
              v-for="zipCode in zipCodeFilters"
              filter-type="zipcode"
              :filter-description="zipCode"
              @click="addRemoveZipCode(zipCode)"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center w-full h-fit p-4">
        <BaseButtonText
          class="w-full h-10 bg-purple-900/75 hover:bg-purple-900/50 hover:scale-105 text-white font-bold"
          text="Find my match!"
          @click="$emit('findMatch')"
        />
      </div>
    </div>
  </div>
</template>
