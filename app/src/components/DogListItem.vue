<script setup>
defineProps({
  id: { type: String },
  img: { type: String },
  name: { type: String },
  age: { type: Number },
  zipCode: { type: Number },
  breed: { type: String },
  selected: { type: Boolean, default: false },
});
</script>

<template>
  <div
    :class="[
      selected ? 'bg-gray-100 border-l-purple-900' : 'bg-white border-l-white',
      'flex flex-row w-full h-18 items-center p-2 hover:bg-gray-100 rounded-l cursor-pointer border-l-4 border-b border-b-gray-300 hover:-translate-y-1 transition-all duration-300',
    ]"
  >
    <div class="flex items-center w-1/6 h-16 pl-4 rounded-full">
      <div class="flex items-center justify-center w-fit h-fit relative">
        <img
          :class="[
            selected ? 'ring ring-purple-900 ring-offset-2' : 'ring-0',
            'w-16 h-auto aspect-square rounded-full',
          ]"
          :src="img"
        />
        <div
          class="absolute top-0 -right-2 rounded-full bg-purple-900 w-6 h-6 z-10 text-white text-center"
        >
          {{ age }}
        </div>
      </div>
    </div>
    <div class="flex flex-col w-7/12 pl-8">
      <div :class="[selected ? 'text-purple-900' : '', 'font-bold text-xl']">
        {{ name }}
      </div>
      <div class="text-gray-500">{{ breed }}</div>
    </div>
    <div class="flex w-3/12 justify-center text-gray-500">{{ zipCode }}</div>
  </div>
</template>
