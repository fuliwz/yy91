<template>
  <main class="page-shell container">
    <div class="player-layout">
      <section class="player-main">
        <div class="player-wrap"><video ref="video" controls class="w-100"></video></div>
        <div class="video-heading"><div><span class="badge-soft"><i class="bi bi-play-circle"></i> 正在播放</span><h1>{{vod?.vod_name||'加载中...'}}</h1><p>{{vod?.vod_remarks||'高清在线播放'}}</p></div></div>
        <div class="description glass-panel" v-if="vod?.vod_content"><div class="section-label">影片简介</div><p>{{vod.vod_content}}</p></div>
      </section>
    </div>
    <section class="recommend-section"><div class="section-head"><div><div class="page-kicker">YOU MAY ALSO LIKE</div><h2 class="section-title">相关推荐</h2></div></div><div class="row video-grid"><div class="col-video mb-3" v-for="item in recommend" :key="item.vod_id"><VideoCard :item="item" /></div></div></section>
  </main>
</template>
<script setup>
import {ref,watch,onBeforeUnmount} from 'vue';import {useRoute} from 'vue-router';import Plyr from 'plyr';import 'plyr/dist/plyr.css';import Hls from 'hls.js';import {getDetail,getCategoryLatest} from '../api/cms';import VideoCard from '../components/VideoCard.vue'
const route=useRoute(),video=ref(null),vod=ref(null),recommend=ref([]);let player=null,hls=null
function destroyPlayer(){hls?.destroy();hls=null;player?.destroy();player=null;if(video.value){video.value.removeAttribute('src');video.value.load()}}
function initPlayer(url){if(!video.value||!url)return;destroyPlayer();player=new Plyr(video.value,{controls:['play','progress','current-time','mute','volume','fullscreen']});if(Hls.isSupported()){hls=new Hls();hls.loadSource(url);hls.attachMedia(video.value)}else video.value.src=url}
async function loadData(){const id=route.params.id;if(!id)return;destroyPlayer();vod.value=null;recommend.value=[];try{const r=await getDetail(id);vod.value=r?.data?.list?.[0]||null;if(!vod.value)return;const url=vod.value.vod_play_url?.split('#')?.[0]?.split('$')?.[1];initPlayer(url);if(vod.value.type_id){const rec=await getCategoryLatest(vod.value.type_id,12);recommend.value=(rec?.data?.list||[]).filter(v=>v.vod_id!==vod.value.vod_id)}document.title=`${vod.value.vod_name} - 18XX - 在线观看`}catch(error){console.error('播放页加载失败:',error)}}watch(()=>route.params.id,loadData,{immediate:true});onBeforeUnmount(destroyPlayer)
</script>
<style scoped>.player-main{max-width:1100px;margin:auto}.video-heading{padding:20px 2px}.video-heading h1{margin:12px 0 5px;font-size:clamp(22px,3vw,34px);font-weight:850;letter-spacing:-.03em}.video-heading p{margin:0;color:#777780;font-size:13px}.description{padding:20px 22px;color:#96969f;font-size:13px;line-height:1.8}.section-label{color:#fff;font-weight:750;margin-bottom:8px}.description p{margin:0}.recommend-section{margin-top:42px}.section-head{margin-bottom:15px}</style>
