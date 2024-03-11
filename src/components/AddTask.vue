<script setup>
import { inject, ref } from 'vue'
import { supabase } from '../supabase'
import { onClickOutside } from '@vueuse/core'
import { Icon } from '@iconify/vue'

import Textarea from 'primevue/textarea'

import { useToast } from 'primevue/usetoast'
import InputText from 'primevue/inputtext'

const emit = defineEmits(['handleAddModal'])

const toast = useToast()

const modalWindow = ref(null)

const task = ref('')

const description = ref('')

const isLoading = ref(false)

const addTask = async () => {
  try {
    isLoading.value = true

    const { data, error } = await supabase
      .from('todos')
      .insert([{ task: `${task.value}`, description: `${description.value}` }])
    if (error) {
      console.log(error)
    } else if (task.value === '') {
      toast.add({ severity: 'error', summary: 'Error', detail: 'task cannot be empty', life: 3000 })
    }
  } finally {
    isLoading.value = false
    task.value = ''
    description.value = ''
    emit('handleAddModal')
  }
}

onClickOutside(modalWindow, () => emit('handleAddModal'))
</script>

<template>
  <div class="absolute flex top-0 left-0 w-full h-full bg-black/70 z-10">
    <div
      ref="modalWindow"
      class="flex flex-col h-96 mt-24 items-center flex-col gap-4 p-10 w-96 mx-auto rounded-xl shadow-xl bg-zinc-100 dark:bg-zinc-900 transition ease-in-out delay-150"
    >
      <InputText v-model="task" placeholder="enter task" class="w-2/3" />
      <Textarea v-model="description" placeholder="enter description" class="w-2/3" />
      <button
        @click="addTask()"
        class="w-40 transition ease-in-out mt-2 cursor-pointer p-2 rounded-xl dark:bg-zinc-300 bg-zinc-300 outline-none hover:bg-zinc-400 active:bg-zinc-500 dark:hover:bg-zinc-400 dark:active:bg-zinc-500 hover:text-white delay-150 text-black hover:delay-0"
      >
        <p v-if="!isLoading">add</p>
        <Icon class="mx-auto" v-else icon="svg-spinners:ring-resize" />
      </button>
    </div>
  </div>
</template>
