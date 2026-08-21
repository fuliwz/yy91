<template>
  <main class="page-shell container">
    <section class="hero glass-panel">
      <div class="hero-copy">
        <div class="hero-kicker"><span></span> YY91 ONLINE</div>
        <h1>发现喜欢的<br><em>精彩内容</em></h1>
        <p>每日更新高清内容，快速浏览分类并进入播放。</p>
      </div>
    </section>
    <div class="page-head mt-4">
      <div>
        <div class="page-kicker">TRENDING NOW</div>
        <h2 class="page-title">热门影片</h2>
      </div>
      <span class="badge-soft">第 {{ page }} 页</span>
    </div>
    <div class="row video-grid">
      <template v-if="loading">
        <div class="col-video mb-3" v-for="i in 10" :key="i"><VideoCardSkeleton /></div>
      </template>
      <template v-else>
        <div class="col-video mb-3" v-for="v in list" :key="v.vod_id"><VideoCard :item="v" /></div>
      </template>
    </div>
    <Pagination :page="page" :total="totalPage" @change="changePage" />
  </main>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getHome } from '../api/cms'
import VideoCard from '../components/VideoCard.vue'
import VideoCardSkeleton from '../components/VideoCardSkeleton.vue'
import Pagination from '../components/Pagination.vue'
import { setSEO } from '../utils/seo'

const route = useRoute()
const router = useRouter()
const list = ref([])
const loading = ref(false)
const page = ref(1)
const totalPage = ref(1)

function getPageFromRoute(){
  const value = Number(route.query.page || 1)
  return value > 0 ? value : 1
}

async function loadData(){
  page.value = getPageFromRoute()
  loading.value = true
  try {
    const res = await getHome(page.value)
    list.value = res?.data?.list || []
    totalPage.value = Number(res?.data?.pagecount || 1)
  } catch(e){
    list.value = []
  } finally {
    loading.value = false
  }
  setSEO({
    title: `YY91 - 热门影片 第${page.value}页`,
    description: 'YY91 高清影片在线浏览与播放'
  })
}

function changePage(p){
  router.push({name:'home', query:p > 1 ? {page:String(p)} : {}})
}

watch(()=>route.fullPath, loadData, {immediate:true})
</script>
