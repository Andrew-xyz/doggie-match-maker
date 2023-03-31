<script setup>
import { ref, reactive, watchEffect } from "vue";
import BaseModal from "./BaseModal.vue";
import fetchClient from "@/services/fetch-api";

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  matchId: { type: String, default: "" },
});
defineEmits(["close"]);

const matchParams = reactive(props);

// Get Matched Dog for Display
const dogMatch = ref({});
watchEffect(async () => {
  if (matchParams.isOpen) {
    const response = await fetchClient.post("/dogs", [matchParams.matchId]);
    dogMatch.value = response.data[0];
  }
});
</script>

<template>
  <BaseModal class="w-full max-w-lg" :open="isOpen" @close="$emit('close')">
    <div class="flex flex-col w-full h-fit space-y-4">
      <div
        class="flex flex-col w-full items-center justify-center bg-purple-900/75 py-3"
      >
        <div class="text-2xl sm:text-3xl text-white font-bold">
          CONGRATULATIONS!
        </div>
        <div class="text-xl text-white">It's a match!</div>
      </div>
      <div class="flex flex-row space-x-8 items-center p-4">
        <div class="w-fit h-full">
          <img
            class="w-44 h-auto aspect-square rounded-full"
            :src="dogMatch.img"
          />
        </div>
        <div class="flex flex-col grow h-full pb-2">
          <div class="text-5xl sm:text-6xl text-purple-900 text-center">
            {{ dogMatch.name }}
          </div>
          <div class="text-xl text-gray-500 text-center">
            {{ dogMatch.breed }}
          </div>
          <div class="text-gray-500 text-center">
            {{ "Age: " + dogMatch.age + " years" }}
          </div>
          <div class="text-gray-500 text-center">
            {{ "From: " + dogMatch.zip_code }}
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
