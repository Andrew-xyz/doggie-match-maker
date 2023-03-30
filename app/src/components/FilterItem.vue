<script setup>
import BaseButtonIcon from "./BaseButtonIcon.vue";

const props = defineProps({
  filterType: { type: String, default: "breed" },
  filterDescription: { default: "Mutt" },
});
</script>

<template>
  <div
    class="flex flex-row p-2 m-1 items-center h-10 hover:bg-yellow-500/50 transition-all duration-300 cursor-pointer rounded-full border-2 border-purple-900"
  >
    <div class="flex flex-row w-fit items-center space-x-2 truncate">
      <BaseButtonIcon
        class="w-8 h-8 fill-purple-900 pt-1"
        :name="filterType"
        :disabled="true"
      />
      <div class="h-fit">{{ filterDescription }}</div>
    </div>
  </div>
</template>
