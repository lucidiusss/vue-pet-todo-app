<script setup>
import { onMounted, provide, ref } from 'vue'
import TodoList from '../components/TodoList.vue'
import { supabase } from '../supabase'

const isSession = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    isSession.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    isSession.value = _session
  })
})
</script>

<template>
  <div
    class="p-10 w-1/3 h-full mx-auto rounded-xl shadow-xl m-14 bg-zinc-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 transition ease-in-out delay-150"
  >
    <h1 class="text-zinc-500 transition ease-in-out delay-150 text-xl text-center">todo list</h1>
    <TodoList v-if="isSession" />
    <div v-else>
      <h1
        class="dark:text-zinc-700 text-zinc-300 transition ease-in-out delay-150 text-xl text-center"
      >
        you have to log in to see your tasks
      </h1>
    </div>
  </div>
</template>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.15s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1, 1);
}
</style>
