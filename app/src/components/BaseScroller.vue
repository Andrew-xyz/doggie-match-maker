<script setup>
import { ref, toRefs, watch } from "vue";
import { useScroll } from "@vueuse/core";

const emit = defineEmits(["left", "right", "top", "bottom"]);

// Scroller setup
const el = ref(null);
const { arrivedState } = useScroll(el);
const { left, right, top, bottom } = toRefs(arrivedState);

// Watchers
watch(left, () => {
  if (left.value) emit("left");
});
watch(right, () => {
  if (right.value) emit("right");
});
watch(top, () => {
  if (top.value) emit("top");
});
watch(bottom, () => {
  if (bottom.value) emit("bottom");
});
</script>

<template>
  <div class="overflow-y-auto" ref="el">
    <slot />
  </div>
</template>
