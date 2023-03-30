<script setup>
import BaseButtonIcon from "./BaseButtonIcon.vue";

const props = defineProps({
  filterType: { type: String, default: "breed" },
  filterDescription: { type: String, default: "Mutt" },
});
const emit = defineEmits(["remove"]);
</script>

<template>
  <div
    class="flex flex-row p-1 items-center justify-between w-full h-10 hover:bg-yellow-500/50 transition-all duration-300"
  >
    <div class="flex flex-row grow items-center space-x-2 truncate">
      <BaseButtonIcon
        class="w-8 h-8 fill-purple-900 pt-1"
        :name="filterType"
        :disabled="true"
      />
      <div class="h-fit cursor-default">{{ filterDescription }}</div>
    </div>
    <BaseButtonIcon
      class="min-w-fit w-7 h-7 fill-purple-900 hover:fill-purple-500"
      name="close"
      @click="$emit('remove')"
    />
  </div>
</template>
