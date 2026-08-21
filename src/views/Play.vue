<template>
  <main class="page-shell container">
    <section class="play-card glass-panel">
      <Player ref="playerRef" :src="playUrl" />
    </section>

    <section class="video-info">
      <span class="badge-soft">正在播放</span>
      <h1>{{ video?.title || video?.vod_name || '加载中...' }}</h1>
      <p>{{ video?.remark || video?.vod_remarks || '高清在线播放' }}</p>
    </section>

    <section class="description glass-panel" v-if="video">
      <div class="section-label">影片简介</div>
      <p>{{ video.description || video.vod_content || '暂无简介' }}</p>
    </section>
  </main>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Player from '../components/video/Player.vue'
import { getVideoDetail } from '../api/video'

const route = useRoute()
const playerRef = ref(null)
const video = ref(null)
const playUrl = ref('')

async function load(){
  const id = route.params.id
  if(!id) return

  const res = await getVideoDetail(id)
  video.value = res?.data || res || null
  playUrl.value = video.value?.url || video.value?.play_url || video.value?.vod_play_url || ''

  document.title = `${video.value?.title || video.value?.vod_name || '播放'} - YY91`
}

watch(()=>route.params.id, load, {immediate:true})
</script>

<style scoped>
.player-wrap{background:#000;border-radius:16px;overflow:hidden;aspect-ratio:16/9}
.video-info{padding:22px 4px}
.video-info h1{font-size:clamp(22px,4vw,36px);font-weight:900;margin:12px 0 8px}
.video-info p{color:#888}
.description{padding:22px;line-height:1.8;color:#aaa}
.section-label{font-weight:800;color:#fff;margin-bottom:8px}
</style>
