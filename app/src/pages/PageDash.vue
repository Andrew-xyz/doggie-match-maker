<script setup>
import { ref, computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import BaseButtonText from "@/components/BaseButtonText.vue";
import TheNavbar from "@/components/TheNavbar.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheFilters from "@/components/TheFilters.vue";
import ModalMatch from "@/components/ModalMatch.vue";
import DogList from "@/components/DogList.vue";
import TransitionSlideOutIn from "@/transitions/TransitionSlideOutIn.vue";
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
  }
  matchModalOpen.value = true;
}
function clearMatch() {
  matchModalOpen.value = false;
  matchId.value = "";
}

// Mobile Support
const listActive = ref(true);
const { width, height } = useWindowSize();
const onMobile = computed(() => {
  return width.value < 1024;
});
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
    <main class="-mt-24 pb-2 pt-2 grow overflow-y-auto">
      <div class="mx-auto max-w-3xl h-full px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div
          class="h-full flex flex-col lg:grid items-start gap-4 lg:grid-cols-3 lg:gap-8"
        >
          <div class="flex lg:hidden flex-row w-full h-10 space-x-4">
            <BaseButtonText
              class="h-full grow bg-[#8356a5] hover:bg-[#c1abd3] text-white font-bold"
              text="Dog List"
              @click="listActive = true"
            />
            <BaseButtonText
              class="h-full grow bg-[#8356a5] hover:bg-[#c1abd3] text-white font-bold"
              text="Filters"
              @click="listActive = false"
            />
          </div>
          <template v-if="onMobile">
            <TransitionSlideOutIn>
              <KeepAlive>
                <DogList
                  v-if="listActive"
                  :breeds="breedFilters"
                  :zip-codes="zipCodeFilters"
                  :age-min="ageMinFilter"
                  :age-max="ageMaxFilter"
                  @update-selected-dog-ids="selectedDogIds = $event"
                />
                <TheFilters
                  v-else
                  @update-breed-filters="breedFilters = $event"
                  @update-zip-code-filters="zipCodeFilters = $event"
                  @update-age-min-filter="ageMinFilter = $event"
                  @update-age-max-filter="ageMaxFilter = $event"
                  @find-match="findMatch"
                />
              </KeepAlive>
            </TransitionSlideOutIn>
          </template>
          <template v-else>
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
          </template>
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
