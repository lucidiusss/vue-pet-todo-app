<script setup>
import { supabase } from '../supabase'
import { ref, inject } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import Textarea from 'primevue/textarea'
import InputText from 'primevue/inputtext'

const props = defineProps({
  taskId: Number
})

const modalWindow = ref(null)

const task = ref('')
const description = ref('')

const { updateModal } = inject('modals')

const isLoading = ref(false)

const updateTask = async () => {
  try {
    isLoading.value = true
    const { data, error } = await supabase
      .from('todos')
      .update({ task: task.value, description: description.value })
      .eq('id', props.taskId)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
    updateModal.value = false
  }
}

const handleUpdateModal = () => {
  updateModal.value = !updateModal.value
}
onClickOutside(modalWindow, () => handleUpdateModal())
</script>

<template>
  <div class="absolute flex top-0 left-0 w-full h-full bg-black/70 z-10">
    <div
      ref="modalWindow"
      class="flex flex-col h-96 mt-24 items-center justify-between gap-4 p-10 w-96 mx-auto rounded-xl shadow-xl bg-zinc-100 dark:bg-zinc-900 transition ease-in-out delay-150"
    >
      <div class="flex flex-col gap-4 w-96 h-56 items-center">
        <InputText v-model="task" placeholder="update task" class="w-2/3" />
        <Textarea v-model="description" placeholder="update description" class="w-2/3" />
      </div>
      <div>
        <button
          @click="updateTask()"
          class="w-40 transition ease-in-out mt-2 cursor-pointer p-2 rounded-xl dark:bg-zinc-300 bg-zinc-300 outline-none hover:bg-zinc-400 active:bg-zinc-500 dark:hover:bg-zinc-400 dark:active:bg-zinc-500 hover:text-white delay-150 text-black hover:delay-0"
        >
          <p v-if="!isLoading">update</p>
          <Icon class="mx-auto" v-else icon="svg-spinners:ring-resize" />
        </button>
      </div>
    </div>
  </div>
</template>
