<template>
  <section class="video-grid">
    <VideoCard v-for="item in items" :key="item.id" :item="item" />
  </section>
</template>

<script setup>
import VideoCard from './VideoCard.vue'
defineProps({ items: { type: Array, default: () => [] } })
</script>
