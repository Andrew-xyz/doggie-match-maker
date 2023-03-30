<script setup>
import { ref } from "vue";

const props = defineProps({
  id: { type: String },
  img: { type: String },
  name: { type: String },
  age: { type: Number },
  zipCode: { type: Number },
  breed: { type: String },
});
const emit = defineEmits(["add", "remove"]);

// Select / de-select an entry
const selected = ref(false);
function selectDog() {
  selected.value = !selected.value;
  selected.value ? emit("add", props) : emit("remove", props);
}
</script>

<template>
  <main
    :class="[
      selected ? 'bg-gray-100 border-l-purple-900' : 'bg-white border-l-white',
      'flex flex-row w-full h-18 items-center p-2 hover:bg-gray-100 rounded-l cursor-pointer border-l-4 border-b border-b-gray-300',
    ]"
    @click="selectDog"
  >
    <div class="flex items-center justify-center w-1/6 h-16 rounded-full">
      <img
        :class="[
          selected ? 'ring ring-purple-900 ring-offset-2' : 'ring-0',
          'w-16 h-auto aspect-square rounded-full',
        ]"
        :src="img"
      />
    </div>
    <div class="flex w-1/12 justify-center">{{ age }}</div>
    <div class="flex flex-col w-7/12 pl-8">
      <div>{{ breed }}</div>
      <div :class="selected ? 'text-purple-900' : ''">{{ name }}</div>
    </div>
    <div class="flex w-1/6 justify-center">{{ zipCode }}</div>
  </main>
</template>
