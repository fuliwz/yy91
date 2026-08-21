<template>
  <main class="page-shell container">
    <section class="page-head"><div><div class="page-kicker">SEARCH</div><h1 class="page-title">搜索：{{wd||'请输入关键词'}}</h1></div></section>
    <div v-if="wd"><VideoGrid :list="list" :loading="loading"/></div>
    <div v-else class="empty-state glass-panel">请输入搜索关键词</div>
    <Pagination v-if="wd" :page="page" :total="totalPage" @change="changePage"/>
  </main>
</template>
<script setup>
import {ref,watch} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {search} from '../api/search'
import VideoGrid from '../components/video/VideoGrid.vue'
import Pagination from '../components/Pagination.vue'
const route=useRoute(),router=useRouter()
const wd=ref(''),list=ref([]),loading=ref(false),page=ref(1),totalPage=ref(1)
async function load(){
 wd.value=decodeURIComponent(route.query.wd||'')
 page.value=Number(route.query.page||1)
 if(!wd.value)return
 loading.value=true
 try{const res=await search(wd.value,page.value);list.value=res?.data?.list||[];totalPage.value=Number(res?.data?.pagecount||1)}catch(e){list.value=[]}
 finally{loading.value=false}
}
function changePage(p){router.push({name:'search',query:{wd:wd.value,page:p}})}
watch(()=>route.fullPath,load,{immediate:true})
</script>