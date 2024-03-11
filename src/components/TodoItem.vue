<script setup>
import { Icon } from '@iconify/vue'
import { inject, provide, ref, watch } from 'vue'
import DeleteTask from './DeleteTask.vue'
import UpdateTask from './UpdateTask.vue'
import TaskInfo from './TaskInfo.vue'
import { supabase } from '@/supabase'

const props = defineProps({
  id: Number,
  task: String,
  description: String,
  userId: String
})

const isLoading = ref(false)
const taskToShow = ref('')
const descriptionToShow = ref('')
const showTaskInfo = ref(false)
const updateModal = ref(false)
const deleteModal = ref(false)
const taskIdListener = ref()

const updateModalBtn = () => {
  taskIdListener.value = props.id
  if (updateModal.value) {
    updateModal.value = false
  } else {
    updateModal.value = true
  }
}

const deleteModalBtn = () => {
  taskIdListener.value = props.id
  if (deleteModal.value) {
    deleteModal.value = false
  } else {
    deleteModal.value = true
  }
}

const handleTaskInfo = () => {
  taskIdListener.value = props.id
  if (showTaskInfo.value) {
    showTaskInfo.value = false
  } else {
    showTaskInfo.value = true
  }
}

watch(showTaskInfo, async () => {
  if (showTaskInfo.value) {
    try {
      isLoading.value = true
      const { data } = await supabase.from('todos').select().eq('id', props.id)
      taskToShow.value = data[0].task
      descriptionToShow.value = data[0].description
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  } else {
    showTaskInfo.value = false
  }
})

provide('modals', {
  updateModal,
  deleteModal,
  showTaskInfo
})
</script>

<template>
  <div
    class="flex cursor-pointer mt-2 border mr-5 dark:border-zinc-800 border-zinc-200 rounded-md p-2 transition delay-150 ease-in-out hover:border-zinc-400 dark:hover:border-zinc-500 hover:delay-0"
  >
    <div
      class="2xl:w-[550px] xl:w-[360px] lg-[250px] md:w-[135px] sm:w-[60px] flex justify-between"
    >
      <p
        @click="handleTaskInfo()"
        class="text-zinc-500 transition delay-150 ease-in-out truncate overflow-hidden"
      >
        {{ task }}
      </p>
      <div class="flex gap-2">
        <button
          @click="updateModalBtn()"
          class="transition delay-150 ease-in-out text-zinc-500 hover:text-black dark:hover:text-white hover:delay-0"
        >
          <Icon class="w-4 h-4" icon="material-symbols:edit-outline-rounded" />
        </button>
        <button
          @click="deleteModalBtn()"
          class="transition delay-150 ease-in-out text-zinc-500 hover:text-black dark:hover:text-white hover:delay-0"
        >
          <Icon class="w-4 h-4" icon="material-symbols:delete-outline-rounded" />
        </button>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <Transition name="modal">
      <DeleteTask v-if="deleteModal" :task-id="taskIdListener" />
    </Transition>
    <Transition name="modal">
      <TaskInfo
        v-if="showTaskInfo"
        :task-id="taskIdListener"
        :task-to-show="taskToShow"
        :description-to-show="descriptionToShow"
      />
    </Transition>
    <Transition name="modal">
      <UpdateTask v-if="updateModal" :task-id="taskIdListener" />
    </Transition>
  </Teleport>
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
