<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoginFormDefault from "@/components/LoginFormDefault.vue";
import LoginFormFailure from "@/components/LoginFormFailure.vue";
import TransitionFadeOutIn from "@/transitions/TransitionFadeOutIn.vue";

// Successful login
const router = useRouter();
function handleSuccess() {
  router.push({ name: "dash" });
}

// Failed login
const loginFailure = ref(false);
function handleFailure() {
  loginFailure.value = true;
}
</script>

<template>
  <img
    class="flex w-full h-full absolute object-cover overflow-hidden z-0"
    src="@/assets/splash-img.webp"
  />
  <div
    class="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
  >
    <div
      class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8"
    >
      <div class="text-white">
        <div class="mb-8 flex flex-col items-center">
          <img src="@/assets/logo.svg" width="150" alt="" srcset="" />
          <h1 class="mb-2 text-2xl">Doggie Match Maker</h1>
          <span class="text-gray-300">Enter Contact Info</span>
        </div>
        <TransitionFadeOutIn>
          <LoginFormDefault
            v-if="!loginFailure"
            @login-success="handleSuccess"
            @login-failure="handleFailure"
          />
          <LoginFormFailure v-else @login-reset="loginFailure = false" />
        </TransitionFadeOutIn>
      </div>
    </div>
  </div>
</template>
