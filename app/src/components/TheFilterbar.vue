<script setup>
import { ref, onMounted } from "vue";
import fetchClient from "@/services/fetch-api";
import BaseSearchBox from "@/components/BaseSearchBox.vue";
import BaseButtonIcon from "@/components/BaseButtonIcon.vue";

const emit = defineEmits(["addBreedFilter"]);

// Retrieve dog breeds
const breedList = ref([]);
onMounted(async () => {
  const response = await fetchClient.get("/dogs/breeds");
  breedList.value = response.data;
});
</script>

<template>
  <div class="hidden border-t border-white border-opacity-20 py-5 lg:block">
    <div class="grid grid-cols-3 items-center gap-8">
      <div class="col-span-2">Other Filters</div>
      <div class="flex h-full items-center">
        <BaseSearchBox
          :selections="breedList"
          placeholder="Filter by Breed"
          @item-selected="$emit('addBreedFilter', $event)"
        />
      </div>
    </div>
  </div>
</template>
