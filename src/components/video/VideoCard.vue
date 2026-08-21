<template>
  <article class="video-card" @click="open">
    <div class="cover">
      <img :src="item.cover || '/fallback.jpg'" :alt="item.title" loading="lazy" />
      <span class="play">▶</span>
    </div>
    <h3>{{ item.title }}</h3>
  </article>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({ item: { type: Object, default: () => ({}) } })
const router = useRouter()
const open = () => router.push(`/play/${props.item.id}`)
</script>
