<script setup>
import { supabase } from '../supabase'
import { inject, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { Icon } from '@iconify/vue'

const props = defineProps({
  taskId: Number
})

const modalWindow = ref(null)

const { deleteModal } = inject('modals')
const isLoading = ref(false)

const handleDeleteModal = () => {
  if (deleteModal.value) {
    deleteModal.value = false
  } else {
    deleteModal.value = true
  }
}

const deleteTask = async () => {
  try {
    isLoading.value = true
    const { error } = await supabase.from('todos').delete().eq('id', props.taskId)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
    deleteModal.value = false
  }
}

onClickOutside(modalWindow, () => handleDeleteModal())
</script>

<template>
  <div class="absolute top-0 left-0 w-full h-full bg-black/70 z-10">
    <div
      ref="modalWindow"
      class="flex h-34 items-center mt-24 flex-col p-10 w-96 mx-auto rounded-xl shadow-xl bg-zinc-100 dark:bg-zinc-900 transition ease-in-out delay-150"
    >
      <p class="text-zinc-500">you sure you want to delete the task?</p>
      <div class="flex gap-4 mt-5">
        <button
          @click="handleDeleteModal()"
          class="w-20 transition ease-in-out mt-2 cursor-pointer p-2 rounded-xl dark:bg-zinc-300 bg-zinc-300 outline-none hover:bg-zinc-400 active:bg-zinc-500 dark:hover:bg-zinc-400 dark:active:bg-zinc-500 hover:text-white delay-150 text-black hover:delay-0"
        >
          cancel
        </button>
        <button
          @click="deleteTask()"
          class="w-20 transition ease-in-out mt-2 cursor-pointer p-2 rounded-xl dark:bg-zinc-300 bg-zinc-300 outline-none hover:bg-zinc-400 active:bg-zinc-500 dark:hover:bg-zinc-400 dark:active:bg-zinc-500 hover:text-white delay-150 text-black hover:delay-0"
        >
          <p v-if="!isLoading">delete</p>
          <Icon class="mx-auto" v-else icon="svg-spinners:ring-resize" />
        </button>
      </div>
    </div>
  </div>
</template>
