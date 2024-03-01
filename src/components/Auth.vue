<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import { Icon } from '@iconify/vue'

const toast = useToast()
const errorMsg = ref('')
const isSignedUp = ref()

const loading = ref(false)
const email = ref('')
const password = ref('')

const signIn = ref(false)

const handleSignUp = async () => {
  loading.value = true
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: window.location.origin
    }
  })
  if (error) {
    errorMsg.value = error.message
    showToast()
  } else if (data) {
  }
}

const handleSignIn = () => {
  signIn.value = true
}

const handleLogin = async () => {
  try {
    loading.value = true
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
      options: {
        emailRedirectTo: window.location.origin
      }
    })

    if (error) {
      errorMsg.value = error.message
      showToast()
    } else if (data) {
      isSignedUp.value = true
      showToast()
    }
  } finally {
    loading.value = false
  }
}

const handleGithub = async () => {
  try {
    loading.value = true
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        emailRedirectTo: window.location.origin
      }
    })

    if (error) {
      errorMsg.value = error.message
      showToast()
    } else {
      isSignedUp.value = true
    }
  } finally {
    loading.value = false
  }
}

const handleDiscord = async () => {
  try {
    loading.value = true
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        emailRedirectTo: window.location.origin
      }
    })

    if (error) {
      errorMsg.value = error.message
      showToast()
    } else {
      isSignedUp.value = true
    }
  } finally {
    loading.value = false
  }
}

const showToast = () => {
  if (errorMsg.value) {
    toast.add({ severity: 'error', summary: 'Error', detail: errorMsg.value, life: 3000 })
  } else if (isSignedUp.value) {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Logged in.',
      life: 3000
    })
  }
}
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-zinc-500 transition ease-in-out delay-150">
      {{ signIn ? 'login' : 'registration' }}
    </h1>
    <div class="flex gap-4 items-center justify-between">
      <button
        @click="() => handleGithub()"
        class="w-15 transition ease-in-out mt-2 px-4 py-2 rounded-xl bg-zinc-300 outline-none hover:bg-zinc-400 active:bg-zinc-500 dark:active:bg-zinc-700 delay-150 text-black hover:delay-0"
      >
        <Icon class="text-black transition ease-in-out" icon="mdi:github" width="32" />
      </button>
      <button
        @click="() => handleDiscord()"
        class="w-15 transition ease-in-out mt-2 px-4 py-2 rounded-xl bg-zinc-300 outline-none hover:bg-zinc-400 active:bg-zinc-500 dark:active:bg-zinc-700 delay-150 text-black hover:delay-0"
      >
        <Icon class="text-black transition ease-in-out" icon="ic:baseline-discord" width="32" />
      </button>
    </div>
    <form @submit.prevent="handleSignUp">
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
        <div class="flex items-center mx-auto" v-if="!signIn">
          <input
            v-if="!signIn"
            type="submit"
            class="w-40 transition ease-in-out mt-2 cursor-pointer p-2 rounded-xl dark:bg-zinc-300 bg-zinc-300 outline-none hover:bg-zinc-400 active:bg-zinc-500 dark:hover:bg-zinc-400 dark:active:bg-zinc-500 hover:text-white delay-150 text-black hover:delay-0"
            :value="loading ? 'loading' : 'sign up'"
            :disabled="loading"
          />
        </div>
        <div class="flex items-center mx-auto" v-else>
          <form @submit.prevent="handleLogin">
            <button label="error" severity="danger">
              <input
                type="submit"
                class="w-40 transition ease-in-out mt-8 cursor-pointer p-2 rounded-xl dark:bg-zinc-300 bg-zinc-300 outline-none hover:bg-zinc-400 active:bg-zinc-500 dark:hover:bg-zinc-500 dark:active:bg-zinc-600 hover:text-white delay-150 text-black hover:delay-0"
                :value="loading ? 'loading' : 'sign in'"
                :disabled="loading"
              />
            </button>
          </form>
        </div>
      </div>
    </form>
  </div>
  <div class="flex justify-center gap-6 mt-8">
    <h1 class="transition ease-in-out delay-150">{{ signIn ? '' : 'already have an account?' }}</h1>
    <button
      @click="() => handleSignIn()"
      class="transition ease-in-out delay-150 hover:delay-0 font-bold text-zinc-400 hover:text-black dark:hover:text-white"
    >
      {{ signIn ? '' : 'sign in' }}
    </button>
    <Toast position="top-right" />
  </div>
</template>
