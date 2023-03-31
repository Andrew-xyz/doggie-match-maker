<script setup>
import BaseButtonText from "./BaseButtonText.vue";
defineEmits(["loginReset"]);
</script>

<template>
  <div class="flex flex-col w-56 h-48 items-center justify-between">
    <div class="flex grow w-full text-lg text-center">
      <div class="m-auto">Invalid credentials. Please try again.</div>
    </div>

    <div class="mt-8 flex justify-center">
      <BaseButtonText
        class="w-32 h-10 rounded-xl bg-yellow-400 bg-opacity-50 !text-white shadow-xl backdrop-blur-md hover:bg-yellow-600"
        text="Try Again"
        @click="$emit('loginReset')"
      />
    </div>
  </div>
</template>
