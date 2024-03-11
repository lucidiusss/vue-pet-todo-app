<script setup>
import { onMounted, ref, watch } from 'vue'
import TodoItem from './TodoItem.vue'
import { supabase } from '../supabase'
import Skeleton from 'primevue/skeleton'
import AddTask from './AddTask.vue'

import ScrollPanel from 'primevue/scrollpanel'

import { Icon } from '@iconify/vue'

const todos = ref([])
const isLoading = ref(false)
const modal = ref(false)

const handleAddModal = () => {
  modal.value = !modal.value
}

const fetchTodos = async () => {
  try {
    const { data, error } = await supabase.from('todos').select('*')
    todos.value = data

    const list = supabase
      .channel('custom-all-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'todos' }, (payload) => {
        console.log('Change received!', payload)
        fetchTodos()
      })
      .subscribe()

    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  }
}

onMounted(async () => {
  isLoading.value = true
  await fetchTodos()
  isLoading.value = false
})
</script>

<template>
  <div class="relative transition ease-in-out delay-150 mt-10">
    <div
      class="flex justify-center mt-10 mx-auto transition ease-in-out delay-150"
      v-if="todos.length === 0"
    >
      <h1
        class="dark:text-zinc-800 text-zinc-200 transition ease-in-out delay-150 text-3xl text-center"
      >
        no tasks yet.
      </h1>
    </div>
    <div class="">
      <div>
        <ScrollPanel style="width: 100%; height: 400px">
          <Skeleton v-for="todo in todos" v-if="isLoading" height="50px" width="100%" />
          <TodoItem
            v-for="todo in todos"
            :id="todo.id"
            :key="todo.id"
            :task="todo.task"
            :description="todo.description"
          />
        </ScrollPanel>
      </div>
      <div class="ml-5">
        <button
          @click="handleAddModal()"
          class="relative mt-10 text-zinc-500 hover:text-black dark:hover:text-white transition ease-in-out delay-150 hover:delay-0"
        >
          <Icon class="absolute top-1 -left-5" icon="ep:circle-plus" />add task
        </button>
      </div>
    </div>
  </div>
  <Transition name="modal">
    <AddTask v-if="modal" @handle-add-modal="handleAddModal()" />
  </Transition>
</template>
