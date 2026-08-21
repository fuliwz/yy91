<template>
  <main class="page-shell container">
    <div class="page-head"><div><div class="page-kicker">SEARCH RESULTS</div><h1 class="page-title">搜索：{{wd || '请输入关键词'}}</h1><p class="page-subtitle">{{wd ? `为你找到相关影片，第 ${page} 页` : '使用顶部搜索框开始探索'}}</p></div><span v-if="wd" class="badge-soft"><i class="bi bi-search"></i> 第 {{page}} 页</span></div>
    <div v-if="!wd" class="empty-state glass-panel"><i class="bi bi-search"></i><h3>开始搜索</h3><p>输入影片、演员或分类名称，发现更多内容。</p></div>
    <div v-else class="row video-grid"><template v-if="loading"><div class="col-video mb-3" v-for="i in 10" :key="'sk-'+i"><VideoCardSkeleton /></div></template><template v-else><div class="col-video mb-3" v-for="v in list" :key="v.vod_id"><VideoCard :item="v" /></div></template></div>
    <Pagination v-if="wd" :page="page" :total="totalPage" @change="changePage" />
  </main>
</template>
<script setup>
import {ref,watch} from 'vue';import {useRoute,useRouter} from 'vue-router';import {searchVideo} from '../api/cms';import VideoCard from '../components/VideoCard.vue';import VideoCardSkeleton from '../components/VideoCardSkeleton.vue';import Pagination from '../components/Pagination.vue'
const route=useRoute(),router=useRouter(),list=ref([]),loading=ref(false),wd=ref(''),page=ref(1),totalPage=ref(1)
function decodeKeyword(value){const text=String(value||'').trim();try{return decodeURIComponent(text)}catch{return text}}
function syncRoute(){wd.value=decodeKeyword(route.query.wd);const value=Number(route.query.page||1);page.value=Number.isInteger(value)&&value>0?value:1}
async function loadData(){syncRoute();if(!wd.value){list.value=[];totalPage.value=1;return}loading.value=true;try{const res=await searchVideo(wd.value,page.value);list.value=res?.data?.list||res?.data?.data||[];totalPage.value=Number(res?.data?.pagecount||res?.data?.totalPage||1);document.title=`${wd.value}相关视频 - YY91 高清影视站`}catch(error){console.error('搜索失败:',error);list.value=[];totalPage.value=1}finally{loading.value=false}}
function changePage(nextPage){const target=Number(nextPage);if(target===page.value)return;router.push({name:'search',query:{wd:wd.value,page:String(target)}})}
watch(()=>route.fullPath,loadData,{immediate:true})
</script>
<style scoped>.empty-state{text-align:center;padding:90px 20px}.empty-state i{font-size:48px;color:#f0446f}.empty-state h3{margin:18px 0 8px}.empty-state p{color:#777}</style>
