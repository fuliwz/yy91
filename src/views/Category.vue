<template>
  <main class="page-shell container">
    <div class="page-head"><div><div class="page-kicker">CATEGORY</div><h1 class="page-title">{{ getClassName() }}</h1><p class="page-subtitle">浏览本分类最新收录的精彩影片</p></div><span class="badge-soft"><i class="bi bi-collection-play"></i> 共 {{totalPage}} 页</span></div>
    <div class="row video-grid"><template v-if="loading"><div class="col-video mb-3" v-for="i in 10" :key="'sk-'+i"><VideoCardSkeleton /></div></template><template v-else><div class="col-video mb-3" v-for="v in list" :key="v.vod_id"><VideoCard :item="v" /></div></template></div>
    <Pagination :page="page" :total="totalPage" @change="changePage" />
  </main>
</template>
<script setup>
import {ref,watch} from 'vue';import {useRoute,useRouter} from 'vue-router';import {getCategory} from '../api/cms';import VideoCard from '../components/VideoCard.vue';import VideoCardSkeleton from '../components/VideoCardSkeleton.vue';import Pagination from '../components/Pagination.vue'
const route=useRoute(),router=useRouter(),list=ref([]),loading=ref(false),page=ref(1),totalPage=ref(1),classList=ref([])
async function loadClass(){try{const res=await fetch('/class.json');if(!res.ok)throw new Error(`HTTP ${res.status}`);classList.value=await res.json()}catch{classList.value=[]}}
function getPageFromRoute(){const value=Number(route.params.page||1);return Number.isInteger(value)&&value>0?value:1}function getClassName(){const current=classList.value.find(c=>c.type_id==route.params.id);return current?.type_name||'分类'}
async function loadData(){page.value=getPageFromRoute();loading.value=true;try{const r=await getCategory(route.params.id,page.value);list.value=r?.data?.list||[];totalPage.value=Number(r?.data?.pagecount||1);document.title=`${getClassName()} - 第${page.value}页 - 高清影视站`}catch(error){console.error('分类加载失败:',error);list.value=[];totalPage.value=1}finally{loading.value=false}}
function changePage(nextPage){const target=Number(nextPage);if(target===page.value)return;const params={id:route.params.id};if(target>1)params.page=String(target);router.push({name:'category',params})}watch(()=>route.fullPath,async()=>{await loadClass();await loadData()},{immediate:true})
</script>
