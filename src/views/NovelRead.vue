<template>
  <main class="page-shell container">
    <article class="reading-panel">
      <header class="reading-header">
        <h1>{{ book.title || '小说阅读' }}</h1>
        <p class="chapter-title">{{ chapter.title || '正文' }}</p>
      </header>

      <section class="reading-content">
        <p v-for="(line, index) in contentLines" :key="index">
          {{ line }}
        </p>
      </section>

      <footer class="reading-actions">
        <button @click="changeChapter(-1)">上一章</button>
        <button @click="changeChapter(1)">下一章</button>
      </footer>
    </article>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getNovelChapter } from '@/api/novel'

const route = useRoute()

const book = ref({})
const chapter = ref({})

const contentLines = computed(() => {
  const text = chapter.value.content || ''
  return text.split('\n').filter(Boolean)
})

async function loadChapter() {
  const data = await getNovelChapter(route.params.id)
  book.value = data.book || {}
  chapter.value = data.chapter || {}
  document.title = `${chapter.value.title || '小说阅读'} - YY91`
}

function changeChapter(step) {
  // 章节切换逻辑预留，由小说 API 返回 next/prev 后接入
  console.log(step)
}

loadChapter()
</script>
