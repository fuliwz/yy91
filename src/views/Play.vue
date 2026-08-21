<template>
  <main class="page-shell container">
    <section class="play-card glass-panel">
      <div class="player-wrap">
        <video ref="video" playsinline controls class="video-player"></video>
      </div>
    </section>

    <section class="video-info">
      <span class="badge-soft"><i class="bi bi-play-circle"></i> 正在播放</span>
      <h1>{{ vod?.vod_name || '加载中...' }}</h1>
      <p>{{ vod?.vod_remarks || '高清在线播放' }}</p>
    </section>

    <section class="description glass-panel" v-if="vod?.vod_content">
      <div class="section-label">影片简介</div>
      <p>{{ vod.vod_content }}</p>
    </section>

    <section class="recommend-section">
      <div class="page-kicker">YOU MAY ALSO LIKE</div>
      <h2 class="section-title">相关推荐</h2>
      <div class="row video-grid">
        <div class="col-video mb-3" v-for="item in recommend" :key="item.vod_id">
          <VideoCard :item="item" />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import Hls from 'hls.js'
import { getDetail, getCategoryLatest } from '../api/cms'
import VideoCard from '../components/VideoCard.vue'

const route = useRoute()
const video = ref(null)
const vod = ref(null)
const recommend = ref([])
let player = null
let hls = null

function destroyPlayer(){
  hls?.destroy(); hls=null
  player?.destroy(); player=null
}

function initPlayer(url){
  if(!video.value || !url) return
  destroyPlayer()
  player = new Plyr(video.value,{controls:['play','progress','current-time','mute','volume','fullscreen']})
  if(Hls.isSupported()){
    hls=new Hls({enableWorker:true})
    hls.loadSource(url)
    hls.attachMedia(video.value)
  }else{
    video.value.src=url
  }
}

async function loadData(){
  const id=route.params.id
  if(!id)return
  try{
    const res=await getDetail(id)
    vod.value=res?.data?.list?.[0]||null
    const url=vod.value?.vod_play_url?.split('#')?.[0]?.split('$')?.[1]
    initPlayer(url)
    if(vod.value?.type_id){
      const rec=await getCategoryLatest(vod.value.type_id,12)
      recommend.value=(rec?.data?.list||[]).filter(v=>v.vod_id!==vod.value.vod_id)
    }
    document.title=`${vod.value?.vod_name||'播放'} - 高清影视`
  }catch(e){console.error(e)}
}

watch(()=>route.params.id,loadData,{immediate:true})
onBeforeUnmount(destroyPlayer)
</script>

<style scoped>
.player-wrap{background:#000;border-radius:16px;overflow:hidden;aspect-ratio:16/9}
.video-player{width:100%;height:100%}
.video-info{padding:22px 4px}
.video-info h1{font-size:clamp(22px,4vw,36px);font-weight:900;margin:12px 0 8px}
.video-info p{color:#888;font-size:14px}
.description{padding:22px;line-height:1.8;color:#aaa}
.section-label{font-weight:800;color:#fff;margin-bottom:8px}
.recommend-section{margin-top:40px}
</style>
