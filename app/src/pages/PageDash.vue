<script setup>
import { ref } from "vue";
import TheNavbar from "@/components/TheNavbar.vue";
import TheFilterbar from "@/components/TheFilterbar.vue";
import TheFooter from "@/components/TheFooter.vue";
import FilterList from "@/components/FilterList.vue";
import DogList from "@/components/DogList.vue";

// Breed Filters
const breedFilters = ref([]);
function addBreedFilter(breed) {
  breedFilters.value.push(breed);
}
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <!-- Headers -->
    <header class="bg-purple-900 pb-24">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <TheNavbar @open-modal="" />
        <TheFilterbar @add-breed-filter="addBreedFilter" />
      </div>
    </header>
    <!-- Main Panels -->
    <main class="-mt-24 pb-8 grow">
      <div class="mx-auto max-w-3xl h-full px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div
          class="h-full grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8"
        >
          <DogList />
          <FilterList />
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
