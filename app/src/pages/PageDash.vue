<script setup>
import { ref } from "vue";
import TheNavbar from "@/components/TheNavbar.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheFilters from "@/components/TheFilters.vue";
import ModalMatch from "../components/ModalMatch.vue";
import DogList from "@/components/DogList.vue";
import fetchClient from "@/services/fetch-api";

// Dog list filters
const breedFilters = ref([]);
const zipCodeFilters = ref([]);
const ageMinFilter = ref(0);
const ageMaxFilter = ref(15);

// Selected Dogs
const selectedDogIds = ref([]);

// Match Finder
const matchId = ref("");
const matchModalOpen = ref(false);
async function findMatch() {
  if (selectedDogIds.value.length) {
    const response = await fetchClient.post(
      "/dogs/match",
      selectedDogIds.value
    );
    matchId.value = response.data.match;
    matchModalOpen.value = true;
  }
}
function clearMatch() {
  matchModalOpen.value = false;
  matchId.value = "";
}
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <!-- Headers -->
    <header class="bg-purple-900 pb-24">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <TheNavbar @open-modal="modalOpen = true" />
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
            @update-selected-dog-ids="selectedDogIds = $event"
          />
          <TheFilters
            @update-breed-filters="breedFilters = $event"
            @update-zip-code-filters="zipCodeFilters = $event"
            @update-age-min-filter="ageMinFilter = $event"
            @update-age-max-filter="ageMaxFilter = $event"
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

  <!-- Modals -->
  <ModalMatch
    :is-open="matchModalOpen"
    :match-id="matchId"
    @close="clearMatch"
  />
</template>
