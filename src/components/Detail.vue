<template>
<div v-if="vod">
<h1>{{vod.vod_name}}</h1>
<img :src="vod.vod_pic" width="300">
<p>{{vod.vod_content}}</p>
<div v-for="item in playList" :key="item.url"><button @click="play(item.url)">{{item.name}}</button></div>
</div>
</template>
<script setup>
import { ref,onMounted } from 'vue'; import { useRoute,useRouter } from 'vue-router'; import { getDetail } from '../api/cms';
const route=useRoute();const router=useRouter();const vod=ref(null);const playList=ref([]);
function play(url){router.push('/play?url='+encodeURIComponent(url))}
onMounted(async()=>{const res=await getDetail(route.params.id);vod.value=res.data.list[0];playList.value=vod.value.vod_play_url.split('#').map(v=>{let a=v.split('$');return{name:a[0],url:a[1]}})})
</script>
