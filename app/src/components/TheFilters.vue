<script setup>
import { ref, watch, onMounted } from "vue";
import FilterListItem from "./FilterListItem.vue";
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
function addBreedFilter(breed) {
  if (!breedFilters.value.includes(breed)) breedFilters.value.push(breed);
}
function removeBreedFilter(breed) {
  const index = breedFilters.value.indexOf(breed);
  if (index !== -1) breedFilters.value.splice(index, 1);
}

// Update Breed Filters
watch(breedFilters.value, () => {
  emit("updateBreedFilters", breedFilters.value);
});
</script>

<template>
  <div class="h-full grid grid-cols-1 gap-4 order-first lg:order-last">
    <div
      class="flex flex-col h-full overflow-hidden rounded-lg bg-white shadow"
    >
      <header
        class="flex flex-row items-center w-full h-16 p-4 bg-purple-900/75"
      >
        <BaseSearchBox
          :selections="breedList"
          placeholder="Filter by Breed"
          @item-selected="addBreedFilter"
        />
      </header>

      <main class="flex flex-col w-full grow overflow-y-auto h-12">
        <FilterListItem
          v-for="breed in breedFilters"
          filter-type="breed"
          :filter-description="breed"
          @remove="removeBreedFilter(breed)"
        />
      </main>

      <footer class="flex items-center w-full h-fit p-4">
        <BaseButtonText
          class="w-full bg-purple-900/75 hover:bg-purple-900/50 hover:scale-105 text-white font-bold"
          text="Find my match!"
          @click="$emit('findMatch')"
        />
      </footer>
    </div>
  </div>
</template>
