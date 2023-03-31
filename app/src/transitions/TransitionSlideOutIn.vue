<template>
  <transition
    mode="out-in"
    enter-active-class="transition ease-in-out duration-300"
    enter-from-class="transform -translate-x-full"
    enter-to-class="transform translate-x-0"
    leave-active-class="transition ease-in-out duration-300"
    leave-from-class="transform translate-x-0"
    leave-to-class="transform -translate-x-full"
  >
    <slot />
  </transition>
</template>
