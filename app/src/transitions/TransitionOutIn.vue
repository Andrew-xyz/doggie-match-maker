<template>
  <transition
    mode="out-in"
    enter-active-class="transition ease-in-out duration-300"
    enter-from-class="transform opacity-0"
    enter-to-class="transform opacity-100"
    leave-active-class="transition ease-in-out duration-300"
    leave-from-class="transform opacity-100"
    leave-to-class="transform opacity-0"
  >
    <slot />
  </transition>
</template>
