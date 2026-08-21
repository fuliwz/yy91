<template>
  <div class="player-container">
    <video ref="video" controls playsinline></video>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const video = ref(null)
defineExpose({ video })
</script>
