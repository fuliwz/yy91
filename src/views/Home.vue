<template><div class="container py-3"><div class="row"><template v-if="loading"><div class="col-video mb-3" v-for="i in 10" :key="i"><VideoCardSkeleton /></div></template><template v-else><div class="col-video mb-3" v-for="v in list" :key="v.vod_id"><VideoCard :item="v" /></div></template></div><Pagination :page="page" :total="totalPage" @change="changePage" /></div></template>
<script setup>
import { ref,watch } from 'vue'; import { useRoute,useRouter } from 'vue-router'; import { getHome } from '../api/cms'; import VideoCard from '../components/VideoCard.vue'; import VideoCardSkeleton from '../components/VideoCardSkeleton.vue'; import Pagination from '../components/Pagination.vue'
const route=useRoute(),router=useRouter(),list=ref([]),loading=ref(false),page=ref(1),totalPage=ref(1)
function getPageFromRoute(){const value=Number(route.query.page||1);return Number.isInteger(value)&&value>0?value:1}
async function loadData(){page.value=getPageFromRoute();loading.value=true;try{const r=await getHome(page.value);list.value=r?.data?.list||[];totalPage.value=Number(r?.data?.pagecount||1)}catch(error){console.error('首页加载失败:',error);list.value=[];totalPage.value=1}finally{loading.value=false}document.title=`18XX - 第${page.value}页 - 高清影视站`}
function changePage(nextPage){const target=Number(nextPage);if(target===page.value)return;router.push({name:'home',query:target>1?{page:String(target)}:{}})} watch(()=>route.fullPath,loadData,{immediate:true})
</script>
