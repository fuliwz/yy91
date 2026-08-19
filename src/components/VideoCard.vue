<template>
  <router-link :to="`/play/${item.vod_id}`" class="video-card">
    <div class="thumb-wrap">
      <img
        :src="item.vod_pic"
        class="thumb"
        loading="lazy"
        decoding="async"
      />

      <div class="thumb-shade"></div>

      <!-- 分类 -->
      <span
        v-if="item.type_name"
        class="tag category"
      >
        {{ item.type_name }}
      </span>

      <!-- 时长 -->
      <span
        v-if="durationText"
        class="tag time"
      >
        <i class="bi bi-clock"></i>
        {{ durationText }}
      </span>

      <!-- 播放按钮 -->
      <span class="play-btn">
        <i class="bi bi-play-fill"></i>
      </span>

      <!-- 播放量 -->
      <span class="duration">
        <i class="bi bi-eye"></i>
        {{ item.vod_hits || 0 }}
      </span>
    </div>

    <div class="info">
      <div class="title">
        {{ item.vod_name }}
      </div>

      <div class="meta">
        <span>{{ item.type_name || "高清影片" }}</span>
        <span>•</span>
        <span>{{ item.vod_hits || 0 }} 播放</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

/**
 * 自动兼容不同 CMS 的时长字段
 */
const durationText = computed(() => {
  return (
    props.item.vod_duration ||
    props.item.vod_len ||
    props.item.vod_runtime ||
    props.item.duration ||
    ""
  );
});
</script>

<style scoped>
.video-card{
display:block;
color:#f3f3f5;
transition:transform .22s ease;
}

.video-card:hover{
color:#fff;
transform:translateY(-4px);
}

.thumb-wrap{
position:relative;
aspect-ratio:16/9;
width:100%;
overflow:hidden;
border-radius:12px;
background:#19191d;
box-shadow:0 8px 24px rgba(0,0,0,.22);
}

.thumb{
width:100%;
height:100%;
display:block;
object-fit:cover;
transition:transform .45s cubic-bezier(.2,.7,.2,1),filter .35s;
}

.thumb-shade{
position:absolute;
inset:0;
background:linear-gradient(
180deg,
rgba(0,0,0,.12),
transparent 42%,
rgba(0,0,0,.75)
);
opacity:.8;
}

.video-card:hover .thumb{
transform:scale(1.06);
filter:brightness(.86);
}

.tag{
position:absolute;
z-index:2;
top:8px;
padding:4px 7px;
border-radius:6px;
font-size:10px;
font-weight:700;
line-height:1;
background:rgba(8,8,10,.72);
backdrop-filter:blur(8px);
color:#eee;
display:flex;
align-items:center;
gap:4px;
}

.category{
left:8px;
border:1px solid rgba(255,255,255,.12);
}

.time{
right:8px;
color:#f5c96a;
}

.play-btn{
position:absolute;
z-index:3;
left:50%;
top:50%;
width:48px;
height:48px;
display:grid;
place-items:center;
transform:translate(-50%,-50%) scale(.7);
border-radius:50%;
background:rgba(240,68,111,.94);
color:#fff;
font-size:25px;
padding-left:2px;
opacity:0;
box-shadow:0 10px 35px rgba(240,68,111,.4);
transition:.25s;
}

.video-card:hover .play-btn{
opacity:1;
transform:translate(-50%,-50%) scale(1);
}

.duration{
position:absolute;
z-index:2;
bottom:8px;
left:8px;
font-size:10px;
color:#ddd;
}

.duration i{
color:#f5c96a;
}

.info{
padding:10px 2px 6px;
}

.title{
font-size:14px;
font-weight:750;
line-height:1.4;
display:-webkit-box;
-webkit-line-clamp:2;
-webkit-box-orient:vertical;
overflow:hidden;
}

.meta{
display:flex;
gap:6px;
margin-top:5px;
color:#707078;
font-size:10px;
}

.meta span:first-child{
color:#9a9aa4;
}

@media(max-width:560px){

.thumb-wrap{
border-radius:9px;
}

.info{
padding-top:7px;
}

.title{
font-size:12px;
}

.meta{
font-size:9px;
}

.tag{
top:6px;
padding:3px 5px;
}

.category{
left:6px;
}

.time{
right:6px;
}

.play-btn{
width:38px;
height:38px;
font-size:20px;
}
}
</style>
