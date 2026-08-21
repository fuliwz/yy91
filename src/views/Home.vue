<template>
  <main class="page-shell container">
    <section class="hero glass-panel">
      <div class="hero-copy">
        <div class="page-kicker">YY91 · STREAM</div>
        <h1>发现<br/><em>热门影视</em></h1>
        <p>极速浏览最新影视资源，简洁、快速、适配移动端。</p>
        <div class="hero-actions">
          <span class="hero-pill">每日更新</span>
          <span class="hero-pill">高清播放</span>
        </div>
      </div>
    </section>

    <section class="mt-4">
      <div class="page-head">
        <div>
          <div class="page-kicker">LATEST</div>
          <h2 class="page-title">最新影片</h2>
        </div>
        <span class="badge-soft">第 {{ page }} 页</span>
      </div>

      <div class="row video-grid">
        <template v-if="loading">
          <div class="col-video mb-3" v-for="i in 12" :key="i"><VideoCardSkeleton/></div>
        </template>
        <template v-else>
          <div class="col-video mb-3" v-for="item in list" :key="item.vod_id">
            <VideoCard :item="item"/>
          </div>
        </template>
      </div>
      <Pagination :page="page" :total="totalPage" @change="changePage"/>
    </section>
  </main>
</template>

<script setup>
import {ref,watch} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {getHome} from '../api/cms'
import VideoCard from '../components/VideoCard.vue'
import VideoCardSkeleton from '../components/VideoCardSkeleton.vue'
import Pagination from '../components/Pagination.vue'

const route=useRoute()
const router=useRouter()
const list=ref([])
const loading=ref(false)
const page=ref(1)
const totalPage=ref(1)

async function load(){
 page.value=Math.max(1,Number(route.query.page||1))
 loading.value=true
 try{
  const res=await getHome(page.value)
  list.value=res?.data?.list||[]
  totalPage.value=Number(res?.data?.pagecount||1)
 }finally{
  loading.value=false
 }
 document.title=`YY91 - 最新影视 - 第${page.value}页`
}
function changePage(p){router.push({name:'home',query:p>1?{page:p}: {}})}
watch(()=>route.fullPath,load,{immediate:true})
</script>
