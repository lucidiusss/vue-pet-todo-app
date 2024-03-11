<script setup>
import { ref, provide } from 'vue'
import { supabase } from '../supabase'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import { Icon } from '@iconify/vue'

import SignUp from './SignUp.vue'
import SignIn from './SignIn.vue'

const toast = useToast()
const errorMsg = ref('')
const isSignedUp = ref()

const loading = ref(false)
const email = ref('')
const password = ref('')

provide('data', {
  email,
  password
})

const signInButton = ref(false)

const handleSignUp = async () => {
  try {
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
      console.log(error)
      showToast()
    } else if (data) {
      isSignedUp.value = true
      console.log(data)
      showToast()
    }
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
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
      console.log(error)
      showToast()
    } else if (data) {
      isSignedUp.value = true
      console.log(data)
      showToast()
    }
  } catch (error) {
    console.log(error)
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
      detail: 'check your email for further instructions!',
      life: 3000
    })
  }
}
</script>

<template>
  <div class="relative flex flex-col items-center">
    <SignUp
      v-if="!signInButton"
      @handle-discord="handleDiscord"
      @handle-github="handleGithub"
      @handle-sign-up="handleSignUp"
      :loading="loading"
    />
    <SignIn
      v-else
      @handle-discord="handleDiscord"
      @handle-github="handleGithub"
      @handle-login="handleLogin"
      @sign-in-button="signInButton"
      :loading="loading"
    />

    <div class="flex justify-center gap-6 mt-8">
      <h1 class="transition ease-in-out delay-150">
        {{ signInButton ? 'dont have an account?' : 'already have an account?' }}
      </h1>
      <button
        @click="() => (signInButton = !signInButton)"
        class="transition ease-in-out delay-150 hover:delay-0 font-bold text-zinc-400 hover:text-black dark:hover:text-white"
      >
        {{ signInButton ? 'sign up' : 'sign in' }}
      </button>
      <router-link to="/">
        <button class="absolute top-0 left-0">
          <Icon
            icon="material-symbols:arrow-left-alt"
            class="w-5 h-5 hover:-translate-x-1 text-zinc-500 hover:text-black dark:hover:text-white transition delay-150 ease-in-out hover:delay-0"
          />
        </button>
      </router-link>
    </div>

    <Toast position="top-right" />
  </div>
</template>
