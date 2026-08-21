<template>
  <div class="player-wrapper">
    <video ref="videoRef" class="video-player" controls playsinline></video>
    <div v-if="error" class="player-error">{{ error }}</div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Hls from 'hls.js'

const props = defineProps({
  url: { type: String, default: '' }
})

const videoRef = ref(null)
const error = ref('')
let hls = null

function destroyPlayer () {
  if (hls) {
    hls.destroy()
    hls = null
  }
}

function loadVideo () {
  destroyPlayer()
  error.value = ''

  if (!videoRef.value || !props.url) return

  if (Hls.isSupported()) {
    hls = new Hls()
    hls.loadSource(props.url)
    hls.attachMedia(videoRef.value)
    hls.on(Hls.Events.ERROR, () => {
      error.value = '视频加载失败'
    })
  } else {
    videoRef.value.src = props.url
  }
}

watch(() => props.url, loadVideo)
onMounted(loadVideo)
onBeforeUnmount(destroyPlayer)
</script>

<style scoped>
.player-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
}
.video-player {
  width: 100%;
  height: 100%;
}
.player-error {
  color: #fff;
  text-align: center;
  padding: 20px;
}
</style>
