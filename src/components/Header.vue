<template>
  <nav class="navbar navbar-dark nav-glass px-3">
    <button class="btn btn-menu me-2" @click="drawerOpen = true"><i class="bi bi-list"></i></button>
    <router-link class="navbar-brand brand" to="/">18XX</router-link>
    <form class="search-box ms-auto" @submit.prevent="goSearch"><input v-model="keyword" class="search-input" placeholder="搜索影片 / 演员 / 分类" /><button class="search-btn" type="submit"><i class="bi bi-search"></i></button></form>
  </nav>
  <div v-if="friendLinks.length" class="container py-3"><div class="d-flex align-items-center flex-wrap gap-2"><span class="text-info small me-2">友情推荐：</span><a v-for="item in friendLinks" :key="item.url" :href="item.url" target="_blank" rel="noopener noreferrer" class="badge bg-primary text-decoration-none">{{ item.name }}</a></div></div>
  <div v-if="drawerOpen" class="drawer-mask" @click="drawerOpen = false"></div>
  <div class="drawer" :class="{ open: drawerOpen }">
    <div class="drawer-header"><span>分类导航</span><button class="close-btn" @click="drawerOpen = false">×</button></div>
    <div v-if="loading" class="loading-box"><div class="spinner"></div><p>加载分类中...</p></div>
    <div v-else class="drawer-body">
      <router-link class="nav-item" to="/" @click="drawerOpen = false"><i class="bi bi-house"></i>首页</router-link>
      <router-link v-for="c in classList" :key="c.type_id" class="nav-item" :to="{ name: 'category', params: { id: c.type_id } }" @click="drawerOpen = false"><i class="bi bi-play-circle"></i>{{ c.type_name }}</router-link>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'; import { useRouter } from 'vue-router'; import linksConfig from '../config/links.config.js'
const router=useRouter();const keyword=ref('');const classList=ref([]);const friendLinks=ref([]);const drawerOpen=ref(false);const loading=ref(false)
function goSearch(){const wd=keyword.value.trim();if(!wd)return;drawerOpen.value=false;router.push({name:'search',query:{wd,page:'1'}})}
async function loadClass(){loading.value=true;try{const res=await fetch('/class.json');if(!res.ok)throw new Error(`HTTP ${res.status}`);classList.value=await res.json()}catch{classList.value=[]}finally{loading.value=false}}
function loadLinks(){const domain=window.location.hostname.replace(/^www\./,'');const matchKey=Object.keys(linksConfig).find(key=>key!=='*'&&(domain===key||domain.endsWith('.'+key)));friendLinks.value=linksConfig[matchKey]||linksConfig['*']||[]}
onMounted(()=>{loadClass();loadLinks()})
</script>
<style scoped>
.nav-glass{background:rgba(10,15,30,.85);backdrop-filter:blur(12px);border-bottom:1px solid #1e2a44;position:sticky;top:0;z-index:1000}.brand{color:#4da3ff!important;font-weight:800}.btn-menu{border:1px solid #2b6fff;color:#cfe3ff;background:transparent}.btn-menu:hover{background:#2b6fff;color:#fff}.search-box{display:flex;align-items:center;background:#0f172a;border:1px solid #1e2a44;border-radius:999px;overflow:hidden}.search-input{border:none;outline:none;background:transparent;color:#fff;padding:6px 12px;width:200px}.search-btn{background:#2b6fff;border:none;color:#fff;padding:6px 12px}.drawer-mask{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:998}.drawer{position:fixed;top:0;left:0;width:280px;height:100vh;background:#0f172a;border-right:1px solid #1e2a44;transform:translateX(-100%);transition:.25s ease;z-index:999;display:flex;flex-direction:column}.drawer.open{transform:translateX(0)}.drawer-header{display:flex;justify-content:space-between;padding:12px;color:#fff;border-bottom:1px solid #1e2a44}.close-btn{background:transparent;border:none;color:#fff;font-size:20px}.drawer-body{flex:1;overflow-y:auto;padding:10px}.nav-item{display:flex;align-items:center;gap:8px;padding:10px 12px;margin-bottom:6px;color:#cfe3ff;text-decoration:none;border-radius:8px}.nav-item:hover{background:#1e2a44;color:#4da3ff;transform:translateX(4px)}.loading-box{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#4da3ff;padding:20px}.spinner{width:28px;height:28px;border:3px solid #1e2a44;border-top-color:#4da3ff;border-radius:50%;animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
</style>
