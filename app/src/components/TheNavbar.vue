<script setup>
import { useRouter } from "vue-router";
import BaseButtonIcon from "@/components/BaseButtonIcon.vue";
import fetchClient from "@/services/fetch-api";

const emit = defineEmits(["openModal"]);

// Log out and return to splash screen
const router = useRouter();
async function logout() {
  const response = await fetchClient.post("/auth/logout");
  router.push({ name: "login" });
}
</script>

<template>
  <div
    class="relative flex items-center py-2 justify-between border-b border-white border-opacity-20"
  >
    <!-- Logo -->
    <div class="flex flex-row items-center space-x-4">
      <a href="#">
        <span class="sr-only">Doggie Match Maker</span>
        <img class="h-12 w-auto" src="@/assets/logo.svg" />
      </a>
      <div class="text-yellow-500 text-lg sm:text-2xl truncate">
        Doggie Match Maker
      </div>
    </div>
    <div class="flex flex-row w-fit h-fit space-x-4">
      <BaseButtonIcon
        class="w-8 h-8 fill-yellow-500 hover:fill-yellow-400"
        name="paw"
        @click="$emit('openModal')"
      />
      <BaseButtonIcon
        class="w-8 h-8 stroke-yellow-500 hover:stroke-yellow-400"
        name="logout"
        @click="logout"
      />
    </div>
  </div>
</template>
