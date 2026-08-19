<template><div class="container py-3"><div class="row"><template v-if="loading"><div class="col-video mb-3" v-for="i in 10" :key="'sk-'+i"><VideoCardSkeleton /></div></template><template v-else><div class="col-video mb-3" v-for="v in list" :key="v.vod_id"><VideoCard :item="v" /></div></template></div><Pagination :page="page" :total="totalPage" @change="changePage" /></div></template>
<script setup>
import { ref,watch } from 'vue'; import { useRoute,useRouter } from 'vue-router'; import { searchVideo } from '../api/cms'; import VideoCard from '../components/VideoCard.vue'; import VideoCardSkeleton from '../components/VideoCardSkeleton.vue'; import Pagination from '../components/Pagination.vue'
const route=useRoute(),router=useRouter(),list=ref([]),loading=ref(false),wd=ref(''),page=ref(1),totalPage=ref(20)
function syncRoute(){wd.value=(route.query.wd||'').trim();page.value=Number(route.query.page||1)}
function safeList(res){return res?.data?.list||res?.data?.data||[]} function safePageCount(res){return res?.data?.pagecount||res?.data?.totalPage||20}
async function loadData(){syncRoute();if(!wd.value){list.value=[];return}loading.value=true;try{const res=await searchVideo(wd.value,page.value);list.value=safeList(res);totalPage.value=safePageCount(res)}catch(e){console.error('search error:',e);list.value=[]}loading.value=false;document.title=`${wd.value}相关视频-18XX`}
function changePage(p){router.push({path:'/search',query:{wd:wd.value,page:p}})} watch(()=>route.query,loadData,{immediate:true})
</script>
