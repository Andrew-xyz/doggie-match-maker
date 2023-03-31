<script setup>
defineProps({
  text: { type: String, required: true },
});
</script>

<template>
  <button
    type="submit"
    class="rounded-lg px-2 shadow-xl transition-all duration-300"
  >
    {{ text }}
  </button>
</template>
