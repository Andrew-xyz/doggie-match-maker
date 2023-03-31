<script setup>
import { ref, reactive, watchEffect, watch, computed } from "vue";
import DogListItem from "./DogListItem.vue";
import BaseScroller from "./BaseScroller.vue";
import BaseButtonIcon from "./BaseButtonIcon.vue";
import BaseButtonText from "./BaseButtonText.vue";
import fetchClient from "@/services/fetch-api";

const props = defineProps({
  breeds: { type: Array, default: [] },
  zipCodes: { type: Array, default: [] },
  ageMin: { type: Number, default: 0 },
  ageMax: { type: Number, default: 15 },
});
const emit = defineEmits(["updateSelectedDogIds"]);

// Initialize lists
const dogIds = ref([]);
const dogList = ref([]);
const dogParams = reactive(props);

// Toggle sort direction
const sortAscending = ref(true);
const dogSort = computed(() => {
  if (sortAscending.value) return "breed:asc";
  else return "breed:desc";
});

// Retrieve initial dog Ids on filter change
const nextUrl = ref("/dogs/search");
watchEffect(async () => {
  // Reset current list
  dogList.value = [];
  // Issue base request
  const response = await fetchClient.get("/dogs/search", {
    params: { ...dogParams, sort: dogSort.value },
  });
  dogIds.value = response.data.resultIds;
  nextUrl.value = response.data.next;
});

// Retrieve dog list upon receipt of additional Ids
watch(dogIds, async () => {
  const response = await fetchClient.post("/dogs", dogIds.value);
  dogList.value = dogList.value.concat(response.data);
});

// Retrieve additional dog Ids
async function retrieveDogs() {
  if (nextUrl.value && dogList.value.length > 0) {
    const response = await fetchClient.get(nextUrl.value);
    dogIds.value = response.data.resultIds;
    nextUrl.value = response.data.next;
  }
}

// Add / Remove / Clear selected Dogs
const selectedDogIds = ref([]);
function addRemoveDogId(id) {
  const index = selectedDogIds.value.indexOf(id);
  if (index !== -1) selectedDogIds.value.splice(index, 1);
  else selectedDogIds.value.push(id);
}
function clearDogIds() {
  selectedDogIds.value = [];
  emit("updateSelectedDogIds", selectedDogIds.value);
}

// Update Selected Dogs
watch(selectedDogIds.value, () => {
  emit("updateSelectedDogIds", selectedDogIds.value);
});
</script>

<template>
  <div class="h-full w-full lg:grid grid-cols-1 gap-4 lg:col-span-2">
    <div
      class="flex flex-col h-full overflow-hidden rounded-lg bg-white shadow"
    >
      <div
        class="flex flex-row items-center w-full h-16 py-2 pr-2 pl-[12px] bg-purple-900/75 text-white font-bold"
      >
        <div class="w-1/6">
          <BaseButtonText
            class="w-full h-8 bg-white/50 text-purple-900/75 hover:bg-white transition-all duration-300"
            text="Clear"
            @click="clearDogIds"
          />
        </div>

        <div
          class="flex flex-row items-center pl-8 w-7/12 cursor-pointer"
          @click="sortAscending = !sortAscending"
        >
          <BaseButtonIcon
            :name="sortAscending ? 'filterdown' : 'filterup'"
            class="w-8 h-8 pt-1"
          />
          <div>Breed</div>
        </div>
        <div class="flex w-3/12 justify-center">Zip Code</div>
      </div>
      <BaseScroller class="w-full grow h-12" @bottom="retrieveDogs">
        <template v-for="dog in dogList">
          <DogListItem
            :id="dog.id"
            :img="dog.img"
            :name="dog.name"
            :age="dog.age"
            :zip-code="dog.zip_code"
            :breed="dog.breed"
            :selected="selectedDogIds.indexOf(dog.id) >= 0"
            @click="addRemoveDogId(dog.id)"
          />
        </template>
      </BaseScroller>
    </div>
  </div>
</template>
