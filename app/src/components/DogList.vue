<script setup>
import { ref, reactive, watchEffect, watch, computed } from "vue";
import DogListItem from "./DogListItem.vue";
import BaseScroller from "./BaseScroller.vue";
import BaseButtonIcon from "./BaseButtonIcon.vue";
import fetchClient from "@/services/fetch-api";

const props = defineProps({
  breeds: {
    type: Array,
    default: [],
  },
  zipCodes: {
    type: Array,
    default: [],
  },
  ageMin: {
    type: Number,
    default: 0,
  },
  ageMax: {
    type: Number,
    default: 25,
  },
});
const emit = defineEmits(["add", "remove"]);

// Initialize lists
const dogIDs = ref([]);
const dogList = ref([]);
const dogParams = reactive(props);

// Toggle sort direction
const sortAscending = ref(true);
const dogSort = computed(() => {
  if (sortAscending.value) return "breed:asc";
  else return "breed:desc";
});

// Retrieve initial dog IDs on filter change
const nextUrl = ref("/dogs/search");
watchEffect(async () => {
  // Reset current list
  dogList.value = [];
  // Issue base request
  const response = await fetchClient.get("/dogs/search", {
    params: { ...dogParams, sort: dogSort.value },
  });
  dogIDs.value = response.data.resultIds;
  nextUrl.value = response.data.next;
});

// Retrieve dog list upon receipt of additional IDs
watch(dogIDs, async () => {
  const response = await fetchClient.post("/dogs", dogIDs.value);
  dogList.value = dogList.value.concat(response.data);
});

// Retrieve additional dog IDs
async function retrieveDogs() {
  if (nextUrl.value && dogList.value.length > 0) {
    const response = await fetchClient.get(nextUrl.value);
    dogIDs.value = response.data.resultIds;
    nextUrl.value = response.data.next;
  }
}
</script>

<template>
  <div
    class="h-full grid grid-cols-1 gap-4 lg:col-span-2 order-last lg:order-first"
  >
    <div
      class="flex flex-col h-full overflow-hidden rounded-lg bg-white shadow"
    >
      <header
        class="flex flex-row items-center w-full h-16 py-2 pr-2 pl-[12px] bg-purple-900/75 text-white font-bold"
      >
        <div class="w-1/6"></div>
        <div class="flex w-1/12 justify-center">Age</div>
        <div class="flex flex-row items-center pl-8 w-7/12">
          <BaseButtonIcon
            :name="sortAscending ? 'filterdown' : 'filterup'"
            class="w-8 h-8 pt-1"
            @click="sortAscending = !sortAscending"
          />
          <div>Breed</div>
        </div>
        <div class="flex w-1/6 justify-center">Zip Code</div>
      </header>
      <BaseScroller class="w-full grow h-12" @bottom="retrieveDogs">
        <template v-for="dog in dogList">
          <DogListItem
            :id="dog.id"
            :img="dog.img"
            :name="dog.name"
            :age="dog.age"
            :zip-code="dog.zip_code"
            :breed="dog.breed"
            @add="$emit('add', $event)"
            @remove="$emit('remove', $event)"
          />
        </template>
      </BaseScroller>
    </div>
  </div>
</template>
