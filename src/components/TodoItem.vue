<script setup>
const props = defineProps({
  id: Number,
  task: String,
  description: String,
  userId: String
})
</script>

<template>
  <div class="flex flex-col">
    <span>{{ id }}.</span>
    <h1>{{ task }}</h1>
  </div>
</template>
