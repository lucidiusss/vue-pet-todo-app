<script setup>
import Account from '../components/Account.vue'
import Auth from '../components/Auth.vue'
import { onMounted, ref } from 'vue'
import { supabase } from '../supabase'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <div
    v-auto-animate
    class="p-10 w-1/3 text-zinc-500 mx-auto rounded-md shadow-xl mt-14 bg-zinc-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 transition ease-in-out delay-150"
  >
    <Account v-if="session" :session="session" />
    <Auth v-else />
  </div>
</template>
