<template>
  <main class="page-shell container">
    <div class="page-head">
      <div>
        <div class="page-kicker">IMAGE</div>
        <h1 class="page-title">图片专区</h1>
        <p class="page-subtitle">浏览图片分类与内容</p>
      </div>
    </div>

    <div class="image-grid" v-if="list.length">
      <article v-for="item in list" :key="item.id || item.image_id" class="image-card">
        <img :src="item.cover || item.url" :alt="item.title || 'image'">
        <h3>{{ item.title || item.name }}</h3>
      </article>
    </div>

    <div v-else class="empty-panel">暂无图片内容</div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { getImages } from '../api/image'

const list = ref([])

document.title = 'YY91 - 图片专区'

async function load(){
  try {
    const res = await getImages()
    list.value = res?.data?.list || res?.list || []
  } catch {
    list.value = []
  }
}
load()
</script>
