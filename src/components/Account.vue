<script setup>
import { supabase } from '../supabase.js'
import { onMounted, ref, toRefs } from 'vue'

const props = defineProps(['session'])
const { session } = toRefs(props)

const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_url = ref('')

onMounted(() => {
  getProfile()
})

async function getProfile() {
  try {
    loading.value = true
    const { user } = session.value

    const { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      username.value = data.username
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
  <form class="form-widget" @submit.prevent="updateProfile">
    <div class="flex flex-row w-full justify-between">
      <div class="flex flex-col gap-4">
        <label class="mr-4" for="email">email:</label>
        <label class="mr-4" for="username">Name</label>
        <label class="mr-4" for="website">Website</label>
      </div>
      <div class="flex flex-col gap-4">
        <input id="email" type="text" :value="session.user.email" disabled />
        <input id="username" type="text" v-model="username" />
        <input id="website" type="url" v-model="website" />
      </div>
    </div>
    <div class="flex flex-col">
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'loading ...' : 'update'"
        :disabled="loading"
      />
      <div>
        <button class="button block" @click="signOut" :disabled="loading">Sign Out</button>
      </div>
    </div>
  </form>
</template>
