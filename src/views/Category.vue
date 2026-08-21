<template>
  <main class="page-shell container">
    <section class="page-head">
      <div><div class="page-kicker">VIDEO CATEGORY</div><h1 class="page-title">{{ title }}</h1><p class="page-subtitle">浏览最新视频内容</p></div>
    </section>
    <VideoGrid :list="list" :loading="loading" />
    <Pagination :page="page" :total="totalPage" @change="changePage" />
  </main>
</template>

<script setup>
import {ref,watch} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {getVideoCategory} from '../api/video'
import VideoGrid from '../components/video/VideoGrid.vue'
import Pagination from '../components/Pagination.vue'

const route=useRoute(),router=useRouter()
const list=ref([]),loading=ref(false),page=ref(1),totalPage=ref(1),title=ref('分类')

async function load(){
 page.value=Number(route.params.page||1)
 loading.value=true
 try{
  const res=await getVideoCategory(route.params.id,page.value)
  list.value=res?.data?.list||res?.list||[]
  totalPage.value=Number(res?.data?.pagecount||1)
 }catch(e){list.value=[]}
 finally{loading.value=false}
}
function changePage(p){router.push({name:'category',params:{id:route.params.id,page:p}})}
watch(()=>route.fullPath,load,{immediate:true})
</script>