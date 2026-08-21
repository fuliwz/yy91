<template>
  <router-link :to="`/play/${item.vod_id}`" class="video-card">
    <div class="poster">
      <img :src="item.vod_pic || '/fallback.jpg'" :alt="item.vod_name" loading="lazy" decoding="async" />
      <div class="overlay"></div>
      <span class="type" v-if="item.type_name">{{item.type_name}}</span>
      <span class="views"><i class="bi bi-eye"></i>{{item.vod_hits || 0}}</span>
      <span class="play"><i class="bi bi-play-fill"></i></span>
    </div>
    <div class="content">
      <h3>{{item.vod_name}}</h3>
      <p><span>{{item.vod_remarks || '高清'}}</span><span>·</span><span>{{item.type_name || '影片'}}</span></p>
    </div>
  </router-link>
</template>

<script setup>
defineProps({item:{type:Object,required:true}})
</script>

<style scoped>
.video-card{display:block;color:#fff;transition:.25s}
.video-card:hover{transform:translateY(-5px)}
.poster{position:relative;aspect-ratio:16/9;background:#17171b;border-radius:14px;overflow:hidden}
.poster img{width:100%;height:100%;object-fit:cover;transition:.45s}
.video-card:hover img{transform:scale(1.07)}
.overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(0,0,0,.65))}
.type,.views{position:absolute;top:10px;background:rgba(0,0,0,.55);backdrop-filter:blur(8px);font-size:11px;padding:5px 8px;border-radius:8px;color:#ddd}
.type{left:10px}.views{right:10px}
.views i{margin-right:4px;color:#f0446f}
.play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(.6);opacity:0;width:52px;height:52px;border-radius:50%;display:grid;place-items:center;background:#f0446f;font-size:30px;transition:.25s}
.video-card:hover .play{opacity:1;transform:translate(-50%,-50%) scale(1)}
.content{padding:10px 3px}
h3{font-size:14px;line-height:1.45;margin:0;font-weight:750;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
p{display:flex;gap:6px;color:#777;font-size:11px;margin:6px 0 0}
@media(max-width:560px){.poster{border-radius:10px}.play{width:38px;height:38px;font-size:22px}h3{font-size:12px}}
</style>
