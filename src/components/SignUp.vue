<script setup>
import { inject } from 'vue'

import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import { Icon } from '@iconify/vue'

defineProps({
  loading: Boolean
})

const { email, password } = inject('data')

const emit = defineEmits(['handleDiscord', 'handleGithub', 'handleSignUp'])
</script>

<template>
  <h1 class="text-zinc-500 transition ease-in-out delay-150">registration</h1>
  <div class="flex gap-4 items-center justify-between">
    <button
      @click="() => emit('handleGithub')"
      class="w-15 transition ease-in-out mt-2 px-4 py-2 rounded-xl bg-zinc-300 outline-none hover:bg-zinc-400 active:bg-zinc-500 dark:active:bg-zinc-700 delay-150 text-black hover:delay-0"
    >
      <Icon class="text-black transition ease-in-out" icon="mdi:github" width="32" />
    </button>
    <button
      @click="() => emit('handleDiscord')"
      class="w-15 transition ease-in-out mt-2 px-4 py-2 rounded-xl bg-zinc-300 outline-none hover:bg-zinc-400 active:bg-zinc-500 dark:active:bg-zinc-700 delay-150 text-black hover:delay-0"
    >
      <Icon class="text-black transition ease-in-out" icon="ic:baseline-discord" width="32" />
    </button>
  </div>
  <form @submit.prevent="() => emit('handleSignUp')">
    <div class="flex flex-col gap-10 mt-10 transition ease-in-out delay-150">
      <FloatLabel>
        <InputText
          class="p-2 rounded-xl bg-zinc-200 dark:bg-zinc-500 outline-none text-zinc-700 transition ease-in-out delay-150"
          type="email"
          v-model="email"
        />
        <label class="" for="email"><p class="text-zinc-400">email</p></label>
      </FloatLabel>
      <FloatLabel
        ><InputText
          class="p-2 rounded-xl bg-zinc-200 dark:bg-zinc-500 outline-none text-zinc-700 transition ease-in-out delay-150"
          type="password"
          v-model="password"
        />
        <label for="password"><p class="text-zinc-400">password</p></label></FloatLabel
      >
      <div class="flex items-center mx-auto">
        <input
          v-if="!loading"
          type="submit"
          value="sign up"
          class="w-40 transition ease-in-out mt-2 cursor-pointer p-2 rounded-xl dark:bg-zinc-300 bg-zinc-300 outline-none hover:bg-zinc-400 active:bg-zinc-500 dark:hover:bg-zinc-400 dark:active:bg-zinc-500 hover:text-white delay-150 text-black hover:delay-0"
          :disabled="loading"
        />
        <Icon v-else icon="svg-spinners:ring-resize" />
      </div>
    </div>
  </form>
</template>
