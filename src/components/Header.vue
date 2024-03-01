<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { Icon } from '@iconify/vue'

const darkMode = ref(false)

const enableDarkMode = () => {
  if (!darkMode.value) {
    document.documentElement.classList.add('dark')
    darkMode.value = true
  }
}

const disableDarkMode = () => {
  if (darkMode.value) {
    document.documentElement.classList.remove('dark')
    darkMode.value = false
  }
}

onMounted(() => {
  const darkModeStorage = localStorage.getItem('darkMode')
  if (darkModeStorage === 'true') {
    enableDarkMode()
  } else {
    disableDarkMode()
  }
})

watch(darkMode, () => {
  if (darkMode.value) {
    localStorage.setItem('darkMode', 'true')
  } else {
    localStorage.setItem('darkMode', 'false')
  }
})
</script>

<template v-auto-animate>
  <div class="px-4 mt-5 flex justify-between transition ease-in-out delay-150">
    <div class="flex gap-4">
      <router-link to="/">
        <button
          class="mr-4 text-zinc-500 dark:text-zinc-500 hover:underline hover:text-black dark:hover:text-white transition"
        >
          home
        </button>
      </router-link>
    </div>
    <div class="flex rounded-md p-1 transition ease-in-out delay-150 gap-4">
      <router-link to="/profile">
        <button
          class="text-zinc-500 dark:text-zinc-500 hover:underline hover:text-black dark:hover:text-white transition"
        >
          <p class="text-shadow">profile</p>
        </button>
      </router-link>

      <button
        @click="darkMode ? disableDarkMode() : enableDarkMode()"
        class="transition ease-in-out delay-150"
      >
        <Icon
          v-if="!darkMode"
          class="text-zinc-500 hover:text-black transition ease-in-out"
          icon="material-symbols-light:sunny-outline"
          width="24"
        />
        <Icon
          v-if="darkMode"
          class="text-zinc-500 hover:text-white transition ease-in-out"
          icon="solar:moon-line-duotone"
          width="24"
        />
      </button>
    </div>
  </div>
</template>
