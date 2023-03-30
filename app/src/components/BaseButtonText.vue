<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button
    type="submit"
    class="rounded-lg px-10 py-2 shadow-xl transition-all duration-300"
  >
    {{ text }}
  </button>
</template>
