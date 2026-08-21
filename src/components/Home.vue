<template>
  <main class="page-shell home-page">
    <section class="home-banner glass-panel">
      <div>
        <h1>YY91 高清视频资源站</h1>
        <p>精选内容聚合，快速浏览与播放。</p>
      </div>
    </section>

    <section class="content-section">
      <div class="section-header">
        <h2>最新视频</h2>
        <span>Page {{ page }}</span>
      </div>

      <div class="video-grid">
        <template v-if="loading">
          <VideoCardSkeleton v-for="i in 10" :key="i" />
        </template>
        <template v-else>
          <VideoCard
            v-for="item in list"
            :key="item.vod_id"
            :item="item"
          />
        </template>
      </div>
    </section>

    <Pagination
      :page="page"
      :total="totalPage"
      @change="changePage"
    />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getHome } from '../api/cms'
import VideoCard from './VideoCard.vue'
import VideoCardSkeleton from './VideoCardSkeleton.vue'
import Pagination from './Pagination.vue'

const list = ref([])
const loading = ref(true)
const page = ref(1)
const totalPage = ref(1)

async function loadData () {
  loading.value = true
  try {
    const r = await getHome(page.value)
    list.value = r?.data?.list || []
    totalPage.value = r?.data?.pagecount || 1
  } finally {
    loading.value = false
  }
}

function changePage (p) {
  page.value = p
  loadData()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(loadData)
</script>
