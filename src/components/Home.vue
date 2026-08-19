<template><div class="container py-3"><div class="row"><template v-if="loading"><div class="col-video mb-3" v-for="i in 10" :key="i"><VideoCardSkeleton /></div></template><template v-else><div class="col-video mb-3" v-for="v in list" :key="v.vod_id"><VideoCard :item="v" /></div></template></div><Pagination :page="page" :total="totalPage" @change="changePage" /></div></template>
<script setup>
import { ref, onMounted } from 'vue'; import { getHome } from '../api/cms'; import VideoCard from '../components/VideoCard.vue'; import VideoCardSkeleton from '../components/VideoCardSkeleton.vue'; import Pagination from '../components/Pagination.vue'
const list=ref([]),loading=ref(true),page=ref(1),totalPage=ref(1)
async function loadData(){loading.value=true;const r=await getHome(page.value);list.value=r.data.list||[];totalPage.value=r.data.pagecount||1;loading.value=false;document.title=`18XX - 第${page.value}页 - 高清色情AV`}
function changePage(p){page.value=p;loadData();window.scrollTo({top:0,behavior:'smooth'})} onMounted(loadData)
</script>
