<script setup>
import { ref } from "vue";
import BaseButtonText from "./BaseButtonText.vue";
import fetchClient from "@/services/fetch-api";

const emit = defineEmits(["loginSuccess", "loginFailure"]);

const name = ref("");
const email = ref("");
const data = ref(null);

async function login() {
  const response = await fetchClient.post(
    "/auth/login",
    JSON.stringify({ name: name.value, email: email.value })
  );
  data.value = response;
  if (data.value.status === 200) emit("loginSuccess");
  else emit("loginFailure");
}
</script>

<template>
  <form
    @submit.prevent="login"
    class="flex flex-col w-56 h-48 items-center justify-between"
  >
    <div class="flex flex-col w-fit h-fit">
      <div class="mb-4 text-base">
        <label class="sr-only" for="user">Username</label>
        <input
          class="rounded-xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md hover:ring-2 focus:ring-2 !ring-purple-900 !ring-inset placeholder-opacity-50 focus:placeholder-opacity-25"
          type="text"
          name="user"
          placeholder="username"
          v-model="name"
        />
      </div>

      <div class="mb-4 text-base">
        <label class="sr-only" for="email">Email</label>
        <input
          class="rounded-xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md hover:ring-2 focus:ring-2 !ring-purple-900 !ring-inset placeholder-opacity-50 focus:placeholder-opacity-25"
          type="email"
          name="email"
          placeholder="your-email@fetch.com"
          v-model="email"
        />
      </div>
    </div>

    <div class="mt-8 flex justify-center">
      <BaseButtonText
        class="w-32 h-10 rounded-xl bg-yellow-400 bg-opacity-50 text-white shadow-xl backdrop-blur-md hover:bg-yellow-600"
        text="Login"
      />
    </div>
  </form>
</template>
