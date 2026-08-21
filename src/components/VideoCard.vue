<template>
  <router-link :to="`/play/${item.vod_id}`" class="video-card">
    <div class="poster">
      <img
        :src="item.vod_pic || '/fallback.jpg'"
        :alt="item.vod_name"
        loading="lazy"
        decoding="async"
        @error="handleImageError"
      />
      <div class="overlay"></div>
      <span v-if="item.type_name" class="badge">{{ item.type_name }}</span>
      <span class="views"><i class="bi bi-eye"></i>{{ item.vod_hits || 0 }}</span>
      <span class="play"><i class="bi bi-play-fill"></i></span>
    </div>
    <div class="content">
      <h3>{{ item.vod_name }}</h3>
      <p>{{ item.vod_remarks || '高清播放' }} · {{ item.type_name || '视频' }}</p>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  item: { type: Object, required: true }
})

function handleImageError(event) {
  event.target.src = '/fallback.jpg'
}
</script>

<style scoped>
.video-card{display:block;color:#fff;transition:.25s}
.video-card:hover{transform:translateY(-4px)}
.poster{position:relative;aspect-ratio:16/9;background:#17171b;border-radius:16px;overflow:hidden}
.poster img{width:100%;height:100%;object-fit:cover;transition:.4s}
.video-card:hover img{transform:scale(1.06)}
.overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.7))}
.badge,.views{position:absolute;top:10px;background:rgba(0,0,0,.5);backdrop-filter:blur(8px);padding:5px 9px;border-radius:10px;font-size:11px;color:#ddd}
.badge{left:10px}.views{right:10px}.views i{margin-right:4px;color:#ff4d7d}
.play{position:absolute;left:50%;top:50%;width:54px;height:54px;display:grid;place-items:center;transform:translate(-50%,-50%) scale(.7);opacity:0;background:#ff4d7d;border-radius:50%;font-size:30px;transition:.25s}
.video-card:hover .play{opacity:1;transform:translate(-50%,-50%) scale(1)}
.content{padding:10px 3px}h3{font-size:14px;line-height:1.45;margin:0;font-weight:700;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}p{font-size:12px;color:#9299a8;margin:6px 0 0}
@media(max-width:600px){.poster{border-radius:12px}.play{width:40px;height:40px;font-size:22px}h3{font-size:12px}}
</style>
