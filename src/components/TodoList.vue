<script setup>
import { onMounted, ref } from 'vue'
import TodoItem from './TodoItem.vue'
import { supabase } from '../supabase'

const todos = ref([])

onMounted(async () => {
  try {
    const { data, error } = await supabase.from('todos').select('')
    todos.value = data

    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  }
})
</script>

<template>
  <div class="transition ease-in-out delay-150">
    <div>
      <TodoItem
        v-if="todos && todos.length > 0"
        v-for="todo in todos"
        :id="todo.id"
        :key="todo.id"
        :task="todo.task"
        :description="todo.description"
      />
      <div class="flex justify-center mx-auto transition ease-in-out delay-150" v-else>
        <h1
          class="dark:text-zinc-700 text-zinc-300 transition ease-in-out delay-150 text-3xl text-center"
        >
          no tasks
        </h1>
      </div>
    </div>
  </div>
</template>
