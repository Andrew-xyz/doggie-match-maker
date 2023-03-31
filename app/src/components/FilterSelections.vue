<script setup>
import { ref } from "vue";
import BaseButtonText from "./BaseButtonText.vue";

const emit = defineEmits(["updateAgeMin", "updateAgeMax", "addZipCode"]);

const ageMin = ref(0);
const ageMax = ref(15);
const zipCode = ref(null);

// Add a Zip Code to Filters
function addZipCode() {
  emit("addZipCode", zipCode.value);
  zipCode.value = null;
}
</script>

<template>
  <div class="my-2 mx-4 px-2 border border-gray-300 rounded-lg bg-gray-100">
    <!-- Age -->
    <form>
      <div class="grid grid-cols-2 p-2 gap-y-2 gap-x-4">
        <div class="col-span-2 text-center font-bold text-base text-purple-900">
          Age
        </div>
        <div class="flex flex-row items-center space-x-4">
          <label for="min">Min</label>
          <input
            v-model="ageMin"
            @change.lazy="$emit('updateAgeMin', ageMin)"
            type="number"
            name="min"
            min="0"
            :max="ageMax"
            class="w-full rounded-md border border-gray-300 bg-white pl-6 text-base font-medium text-gray-500 text-center outline-none focus:border-purple-900 focus:ring-1 focus:ring-purple-900 focus:shadow-md"
          />
        </div>
        <div class="flex flex-row items-center space-x-4">
          <label for="max">Max</label>
          <input
            v-model="ageMax"
            @change.lazy="$emit('updateAgeMax', ageMax)"
            type="number"
            name="max"
            :min="ageMin"
            max="15"
            class="w-full rounded-md border border-gray-300 bg-white pl-6 text-base font-medium text-gray-500 text-center outline-none focus:border-purple-900 focus:ring-1 focus:ring-purple-900 focus:shadow-md"
          />
        </div>
      </div>
    </form>

    <!-- Zip Code -->
    <form @submit.prevent="addZipCode">
      <div class="grid grid-cols-2 gap-y-2 gap-x-4 pb-4">
        <label
          class="col-span-2 text-center font-bold text-base text-purple-900"
          for="zipcode"
          >Zip Code</label
        >
        <div class="flex flex-row items-center">
          <input
            v-model="zipCode"
            name="zipcode"
            class="w-full h-10 rounded-md border border-gray-300 bg-white text-base font-medium text-gray-500 text-center outline-none focus:border-purple-900 focus:ring-1 focus:ring-purple-900 focus:shadow-md"
          />
        </div>
        <BaseButtonText
          class="font-bold text-white bg-purple-900/75 hover:bg-purple-900/50"
          text="Add"
        />
      </div>
    </form>
  </div>
</template>
