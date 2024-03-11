<script setup>
import { inject, ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { supabase } from '../supabase'
import Textarea from 'primevue/textarea'

const props = defineProps({
  taskId: Number,
  taskToShow: String,
  descriptionToShow: String
})

const modalWindow = ref(null)
const { showTaskInfo } = inject('modals')

const handleTaskInfo = () => {
  if (showTaskInfo.value) {
    showTaskInfo.value = false
  } else {
    showTaskInfo.value = true
  }
}

onClickOutside(modalWindow, () => handleTaskInfo())
</script>

<template>
  <div class="absolute flex top-0 left-0 w-full h-full bg-black/70 z-10">
    <div
      ref="modalWindow"
      class="flex flex-col h-96 mt-24 items-center flex-col gap-4 p-10 w-96 mx-auto rounded-xl shadow-xl bg-zinc-100 dark:bg-zinc-900 transition ease-in-out delay-150"
    >
      <div>
        <p>task</p>
        <Textarea :placeholder="taskToShow" disabled autoResize class="w-full h-full" />
      </div>
      <div>
        <p>description</p>
        <Textarea :placeholder="descriptionToShow" disabled autoResize class="w-full h-full" />
      </div>
    </div>
  </div>
</template>
