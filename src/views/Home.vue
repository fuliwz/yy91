<template>
  <main class="page-shell container">
    <section class="hero glass-panel">
      <div class="hero-copy"><div class="hero-kicker"><span></span> NEW RELEASES</div><h1>发现你喜欢的<br/><em>精彩影片</em></h1><p>每日更新海量高清内容，快速找到正在热播的影片。</p><div class="hero-actions"><span class="hero-pill"><i class="bi bi-lightning-charge-fill"></i> 每日更新</span><span class="hero-pill"><i class="bi bi-badge-hd-fill"></i> 高清画质</span></div></div>
      <div class="hero-art"><div class="art-glow"></div><div class="art-ring"></div><i class="bi bi-play-fill"></i></div>
    </section>
    <div class="page-head mt-4"><div><div class="page-kicker">TRENDING NOW</div><h2 class="page-title">热门影片</h2><p class="page-subtitle">精选最新内容，持续为你更新</p></div><span class="badge-soft"><i class="bi bi-fire"></i> 第 {{page}} 页</span></div>
    <div class="row video-grid"><template v-if="loading"><div class="col-video mb-3" v-for="i in 10" :key="i"><VideoCardSkeleton /></div></template><template v-else><div class="col-video mb-3" v-for="v in list" :key="v.vod_id"><VideoCard :item="v" /></div></template></div>
    <Pagination :page="page" :total="totalPage" @change="changePage" />
  </main>
</template>
<script setup>
import {ref,watch} from 'vue';import {useRoute,useRouter} from 'vue-router';import {getHome} from '../api/cms';import VideoCard from '../components/VideoCard.vue';import VideoCardSkeleton from '../components/VideoCardSkeleton.vue';import Pagination from '../components/Pagination.vue'
const route=useRoute(),router=useRouter(),list=ref([]),loading=ref(false),page=ref(1),totalPage=ref(1)
function getPageFromRoute(){const value=Number(route.query.page||1);return Number.isInteger(value)&&value>0?value:1}
async function loadData(){page.value=getPageFromRoute();loading.value=true;try{const r=await getHome(page.value);list.value=r?.data?.list||[];totalPage.value=Number(r?.data?.pagecount||1)}catch(error){console.error('首页加载失败:',error);list.value=[];totalPage.value=1}finally{loading.value=false}document.title=`18XX - 第${page.value}页 - 高清影视站`}
function changePage(nextPage){const target=Number(nextPage);if(target===page.value)return;router.push({name:'home',query:target>1?{page:String(target)}:{}})}watch(()=>route.fullPath,loadData,{immediate:true})
</script>
<style scoped>
.hero{position:relative;min-height:300px;overflow:hidden;padding:48px 52px;display:flex;align-items:center;background:linear-gradient(110deg,#15151a 0%,#111114 52%,#1a1115 100%)}.hero-copy{position:relative;z-index:2}.hero-kicker{font-size:11px;letter-spacing:.18em;font-weight:900;color:#aaa}.hero-kicker span{display:inline-block;width:7px;height:7px;border-radius:50%;background:#f0446f;margin-right:7px;box-shadow:0 0 14px #f0446f}.hero h1{font-size:clamp(34px,5vw,58px);line-height:1.05;letter-spacing:-.055em;margin:13px 0 15px;font-weight:900}.hero h1 em{font-style:normal;color:#f0446f}.hero p{max-width:430px;color:#888893;margin:0;font-size:14px}.hero-actions{display:flex;gap:8px;margin-top:24px}.hero-pill{padding:8px 12px;border-radius:999px;background:#202026;color:#aaa;font-size:11px}.hero-pill i{color:#f5c96a;margin-right:4px}.hero-art{position:absolute;right:4%;top:0;width:48%;height:100%;overflow:hidden;display:grid;place-items:center}.art-glow{position:absolute;width:260px;height:260px;border-radius:50%;background:rgba(240,68,111,.16);filter:blur(45px)}.art-ring{width:260px;height:260px;border:1px solid rgba(240,68,111,.22);border-radius:50%;box-shadow:0 0 100px rgba(240,68,111,.13),inset 0 0 80px rgba(240,68,111,.08)}.hero-art i{position:absolute;width:88px;height:88px;display:grid;place-items:center;padding-left:5px;border-radius:50%;background:linear-gradient(135deg,#f0446f,#ff7697);font-size:45px;box-shadow:0 18px 50px rgba(240,68,111,.35)}
@media(max-width:650px){.hero{min-height:240px;padding:28px 24px}.hero h1{font-size:34px}.hero p{font-size:12px;max-width:280px}.hero-art{opacity:.45;right:-15%;width:65%}.hero-actions{margin-top:18px}.page-head{align-items:center}.page-title{font-size:26px}}
</style>