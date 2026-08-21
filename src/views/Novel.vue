<template>
  <main class="page-shell container">
    <div class="page-head">
      <div>
        <div class="page-kicker">NOVEL</div>
        <h1 class="page-title">小说专区</h1>
        <p class="page-subtitle">分类浏览小说内容，点击进入阅读</p>
      </div>
    </div>

    <div class="novel-list" v-if="list.length">
      <article v-for="item in list" :key="item.id || item.novel_id" class="novel-item">
        <h3>{{ item.title || item.name }}</h3>
        <p>{{ item.description || '暂无简介' }}</p>
        <RouterLink :to="`/novel/read/${item.id || item.novel_id}`">开始阅读</RouterLink>
      </article>
    </div>

    <div v-else class="empty-panel">暂无小说内容</div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { getNovels } from '../api/novel'

const list = ref([])

document.title = 'YY91 - 小说专区'

async function load(){
  try {
    const res = await getNovels()
    list.value = res?.data?.list || res?.list || []
  } catch {
    list.value = []
  }
}
load()
</script>
