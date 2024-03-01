<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <div
    v-auto-animate
    class="w-full h-screen flex flex-col bg-white dark:bg-zinc-950 z-0 transition ease-in-out delay-150"
  >
    <Header />

    <router-view></router-view>
  </div>
</template>
