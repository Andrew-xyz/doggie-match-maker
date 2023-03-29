<script setup>
import { useRouter } from "vue-router";
import fetchClient from "@/services/fetch-api";
import BaseButtonIcon from "@/components/BaseButtonIcon.vue";

const emit = defineEmits(["openModal"]);

// Log out and return to splash screen
const router = useRouter();
async function logout() {
  const response = await fetchClient.post("/auth/logout");
  router.push({ name: "login" });
}
</script>

<template>
  <div class="relative flex items-center py-2 justify-between">
    <!-- Logo -->
    <div class="static">
      <a href="#">
        <span class="sr-only">Doggie Match Maker</span>
        <img
          class="h-12 w-auto"
          src="@/assets/logo.svg"
          alt="Doggie Match Maker"
        />
      </a>
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
