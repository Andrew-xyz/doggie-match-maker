<script setup>
const emit = defineEmits(["loginReset"]);
</script>

<template>
  <div class="flex flex-col w-56 h-48 items-center justify-between">
    <div class="flex grow w-full text-lg text-center">
      <div class="m-auto">Invalid credentials. Please try again.</div>
    </div>

    <div class="mt-8 flex justify-center text-base text-black">
      <button
        @click="$emit('loginReset')"
        class="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
      >
        Retry
      </button>
    </div>
  </div>
</template>
