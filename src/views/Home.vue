<template>
  <main class="page-shell container">
    <section class="hero glass-panel">
      <div class="hero-copy">
        <div class="page-kicker">YY91 · MEDIA</div>
        <h1>发现<br/><em>全新内容中心</em></h1>
        <p>视频、小说、图片统一内容架构，快速访问每日更新资源。</p>
        <div class="hero-actions">
          <span class="hero-pill">视频更新</span>
          <span class="hero-pill">小说阅读</span>
          <span class="hero-pill">图片浏览</span>
        </div>
      </div>
    </section>

    <section class="mt-4">
      <div class="page-head">
        <div>
          <div class="page-kicker">VIDEO</div>
          <h2 class="page-title">最新视频</h2>
        </div>
        <span class="badge-soft">第 {{ page }} 页</span>
      </div>

      <VideoGrid :items="list" :loading="loading" />
      <Pagination :page="page" :total="totalPage" @change="changePage"/>
    </section>
  </main>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getVideoList } from '../api/video'
import VideoGrid from '../components/video/VideoGrid.vue'
import Pagination from '../components/Pagination.vue'

const route = useRoute()
const router = useRouter()
const list = ref([])
const loading = ref(false)
const page = ref(1)
const totalPage = ref(1)

async function load(){
  page.value = Math.max(1, Number(route.query.page || 1))
  loading.value = true
  try {
    const res = await getVideoList({page: page.value})
    list.value = res?.data?.list || res?.list || []
    totalPage.value = Number(res?.data?.pagecount || res?.pagecount || 1)
  } catch(e) {
    list.value = []
  } finally {
    loading.value = false
  }
  document.title = `YY91 - 最新视频 - 第${page.value}页`
}

function changePage(p){
  router.push({name:'home', query:p > 1 ? {page:p} : {}})
}

watch(()=>route.fullPath, load, {immediate:true})
</script>
