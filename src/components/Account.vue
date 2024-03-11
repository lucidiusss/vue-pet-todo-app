<script setup>
import { supabase } from '../supabase.js'
import { onMounted, ref, toRefs } from 'vue'
import InputText from 'primevue/inputtext'
import { Icon } from '@iconify/vue'

const props = defineProps(['session'])
const { session } = toRefs(props)

const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_url = ref('')
const fullname = ref('')

onMounted(() => {
  getProfile()
})

async function getProfile() {
  try {
    loading.value = true
    const { user } = session.value

    const { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url, full_name`)
      .eq('id', user.id)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      username.value = data.username
      fullname.value = data.full_name
      website.value = data.website
      avatar_url.value = data.avatar_url
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function updateProfile() {
  try {
    loading.value = true
    const { user } = session.value

    const updates = {
      id: user.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_url.value,
      full_name: fullname.value,
      updated_at: new Date()
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form
    v-auto-animate
    class="form-widget w-full h-72 grid grid-rows-1 text-center justify-center gap-5 relative"
    @submit.prevent="updateProfile"
  >
    <div class="flex flex-col">
      <img
        :src="`https://avatar.iran.liara.run/username?username=` + fullname"
        alt="avatar"
        class="w-20 m-auto"
      />
      <input type="text" v-model="username" disabled class="w-40 bg-transparent text-center" />
      <input type="text" v-model="fullname" disabled class="w-40 bg-transparent text-center" />
      <input
        type="text"
        v-model="session.user.email"
        disabled
        class="w-40 bg-transparent text-center"
      />
    </div>
    <div class="flex flex-col items-center gap-5">
      <input
        v-if="!loading"
        type="submit"
        class="w-40 transition ease-in-out cursor-pointer p-2 rounded-xl dark:bg-zinc-300 bg-zinc-300 outline-none hover:bg-zinc-400 active:bg-zinc-500 dark:hover:bg-zinc-500 dark:active:bg-zinc-600 hover:text-white delay-150 text-black hover:delay-0"
        value="update"
        :disabled="loading"
      />
      <Icon class="mx-auto" icon="svg-spinners:ring-resize" v-else />
      <button
        class="w-40 transition ease-in-out cursor-pointer p-2 rounded-xl dark:bg-zinc-300 bg-zinc-300 outline-none hover:bg-zinc-400 active:bg-zinc-500 dark:hover:bg-zinc-500 dark:active:bg-zinc-600 hover:text-white delay-150 text-black hover:delay-0"
        @click="signOut"
        :disabled="loading"
      >
        log out
      </button>
    </div>
    <router-link to="/">
      <button class="absolute top-0 left-0">
        <Icon
          icon="material-symbols:arrow-left-alt"
          class="w-5 h-5 hover:-translate-x-1 text-zinc-500 hover:text-black dark:hover:text-white transition delay-150 ease-in-out hover:delay-0"
        />
      </button>
    </router-link>
  </form>
</template>
