<script setup>
import { ref, computed } from "vue";
import TheNavbar from "@/components/TheNavbar.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheFilters from "@/components/TheFilters.vue";
import DogList from "@/components/DogList.vue";
import fetchClient from "@/services/fetch-api";

// Dog list filters
const breedFilters = ref([]);
const zipCodeFilters = ref([]);
const ageMinFilter = ref(0);
const ageMaxFilter = ref(25);

// Selected Dogs
const selectedDogs = ref([]);
function addDog(dog) {
  if (!selectedDogs.value.includes(dog)) selectedDogs.value.push(dog);
}
function removeDog(dog) {
  const index = selectedDogs.value.indexOf(dog);
  if (index !== -1) selectedDogs.value.splice(index, 1);
}

const selectedDogIDs = computed(() => {
  const dogIDs = [];
  selectedDogs.value.forEach((dog) => {
    if (dog.id) dogIDs.push(dog.id);
  });
  return dogIDs;
});
async function findMatch() {
  const response = await fetchClient.post("/dogs/match", selectedDogIDs.value);
  console.log(response.data);
}
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <!-- Headers -->
    <header class="bg-purple-900 pb-24">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <TheNavbar @open-modal="" />
      </div>
    </header>
    <!-- Main Panels -->
    <main class="-mt-24 pb-8 pt-2 grow">
      <div class="mx-auto max-w-3xl h-full px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div
          class="h-full grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8"
        >
          <DogList
            :breeds="breedFilters"
            :zip-codes="zipCodeFilters"
            :age-min="ageMinFilter"
            :age-max="ageMaxFilter"
            @add="addDog"
            @remove="removeDog"
          />
          <TheFilters
            @update-breed-filters="breedFilters = $event"
            @update-zip-code-filters="zipCodeFilters = $event"
            @update-age-max-filter="ageMinFilter = $event"
            @update-age-min-filter="ageMaxFilter = $event"
            @find-match="findMatch"
          />
        </div>
      </div>
    </main>
    <!-- Footer -->
    <footer>
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <TheFooter />
      </div>
    </footer>
  </div>
</template>
