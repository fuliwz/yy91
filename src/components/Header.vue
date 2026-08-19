<template>
  <header class="site-header">
    <div class="header-inner">
      <button class="icon-btn mobile-menu" @click="drawerOpen = true" aria-label="菜单"><i class="bi bi-list"></i></button>
      <router-link class="brand" to="/">
        <span class="brand-mark"><i class="bi bi-play-fill"></i></span>
        <span>18XX</span>
      </router-link>
      <nav class="desktop-nav">
        <router-link to="/" class="nav-link"><i class="bi bi-house-door"></i> 首页</router-link>
        <router-link v-for="c in classList.slice(0,6)" :key="c.type_id" class="nav-link" :to="{name:'category',params:{id:c.type_id}}">{{ c.type_name }}</router-link>
      </nav>
      <form class="search-box" @submit.prevent="goSearch">
        <i class="bi bi-search search-icon"></i>
        <input v-model="keyword" class="search-input" placeholder="搜索影片、演员或分类" />
        <button type="submit" class="search-submit"><i class="bi bi-arrow-right"></i></button>
      </form>
      <button class="icon-btn desktop-more" @click="drawerOpen = true" aria-label="更多分类"><i class="bi bi-grid-3x3-gap"></i></button>
    </div>
  </header>

  <div v-if="friendLinks.length" class="quick-links">
    <div class="quick-inner"><span><i class="bi bi-stars"></i> 热门推荐</span><a v-for="item in friendLinks" :key="item.url" :href="item.url" target="_blank" rel="noopener noreferrer">{{ item.name }}</a></div>
  </div>

  <div v-if="drawerOpen" class="drawer-mask" @click="drawerOpen=false"></div>
  <aside class="drawer" :class="{open:drawerOpen}">
    <div class="drawer-head"><div><div class="drawer-kicker">EXPLORE</div><strong>分类导航</strong></div><button class="close-btn" @click="drawerOpen=false"><i class="bi bi-x-lg"></i></button></div>
    <div v-if="loading" class="drawer-loading"><div class="spinner"></div><span>加载分类中...</span></div>
    <div v-else class="drawer-body">
      <router-link class="drawer-item" to="/" @click="drawerOpen=false"><i class="bi bi-house-door"></i><span>首页</span></router-link>
      <router-link v-for="c in classList" :key="c.type_id" class="drawer-item" :to="{name:'category',params:{id:c.type_id}}" @click="drawerOpen=false"><i class="bi bi-play-btn"></i><span>{{c.type_name}}</span></router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import linksConfig from '../config/links.config.js';
const router=useRouter();const keyword=ref('');const classList=ref([]);const friendLinks=ref([]);const drawerOpen=ref(false);const loading=ref(false);
function goSearch(){const wd=keyword.value.trim();if(!wd)return;drawerOpen.value=false;router.push({name:'search',query:{wd,page:'1'}})}
async function loadClass(){loading.value=true;try{const res=await fetch('/class.json');if(!res.ok)throw new Error(`HTTP ${res.status}`);classList.value=await res.json()}catch{classList.value=[]}finally{loading.value=false}}
function loadLinks(){const domain=window.location.hostname.replace(/^www\./,'');const key=Object.keys(linksConfig).find(k=>k!=='*'&&(domain===k||domain.endsWith('.'+k)));friendLinks.value=linksConfig[key]||linksConfig['*']||[]}
onMounted(()=>{loadClass();loadLinks()})
</script>

<style scoped>
.site-header{position:sticky;top:0;z-index:1000;background:rgba(9,9,11,.88);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,.07)}
.header-inner{height:72px;max-width:1440px;margin:auto;padding:0 18px;display:flex;align-items:center;gap:20px}.brand{display:flex;align-items:center;gap:9px;color:#fff;font-size:20px;font-weight:900;letter-spacing:-.04em;flex:none}.brand:hover{color:#fff}.brand-mark{width:34px;height:34px;display:grid;place-items:center;border-radius:10px;background:linear-gradient(135deg,#f0446f,#ff7898);box-shadow:0 7px 22px rgba(240,68,111,.3);color:#fff}.brand-mark i{font-size:19px;margin-left:2px}
.desktop-nav{display:flex;align-items:center;gap:3px;overflow:hidden}.nav-link{padding:9px 10px;color:#a7a7b0;font-size:13px;font-weight:650;white-space:nowrap;border-radius:9px}.nav-link:hover,.nav-link.router-link-active{color:#fff;background:#1b1b20}.nav-link i{margin-right:5px;color:#f0446f}
.search-box{margin-left:auto;width:min(310px,32vw);height:40px;display:flex;align-items:center;border:1px solid rgba(255,255,255,.1);background:#151518;border-radius:12px;transition:.2s}.search-box:focus-within{border-color:rgba(240,68,111,.6);box-shadow:0 0 0 4px rgba(240,68,111,.08)}.search-icon{color:#777782;margin-left:12px}.search-input{width:100%;border:0;outline:0;background:transparent;color:#fff;padding:0 9px;font-size:13px}.search-input::placeholder{color:#66666f}.search-submit{width:34px;height:32px;margin-right:4px;border:0;border-radius:8px;background:#25252a;color:#bbb;transition:.2s}.search-submit:hover{background:#f0446f;color:#fff}
.icon-btn{width:40px;height:40px;border:1px solid rgba(255,255,255,.08);border-radius:10px;background:#151518;color:#bbb}.icon-btn:hover{background:#222229;color:#fff}.mobile-menu{display:none}.quick-links{border-bottom:1px solid rgba(255,255,255,.05);background:#0d0d10}.quick-inner{max-width:1440px;margin:auto;padding:8px 18px;display:flex;align-items:center;gap:9px;overflow:auto;white-space:nowrap}.quick-inner span{font-size:12px;color:#f5c96a;font-weight:700}.quick-inner a{padding:4px 9px;border-radius:999px;background:#17171b;color:#9898a2;font-size:11px}.quick-inner a:hover{color:#fff;background:#25252b}
.drawer-mask{position:fixed;inset:0;background:rgba(0,0,0,.68);backdrop-filter:blur(4px);z-index:1001}.drawer{position:fixed;top:0;right:0;width:min(380px,92vw);height:100vh;background:#111114;border-left:1px solid rgba(255,255,255,.08);transform:translateX(100%);transition:.28s cubic-bezier(.2,.8,.2,1);z-index:1002;box-shadow:-30px 0 80px rgba(0,0,0,.45);display:flex;flex-direction:column}.drawer.open{transform:translateX(0)}.drawer-head{padding:26px 24px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.07)}.drawer-kicker{color:#f0446f;font-size:10px;font-weight:900;letter-spacing:.16em;margin-bottom:5px}.drawer-head strong{font-size:22px}.close-btn{width:38px;height:38px;border:1px solid rgba(255,255,255,.08);background:#19191d;border-radius:10px;color:#aaa}.drawer-body{padding:16px;overflow:auto}.drawer-item{display:flex;align-items:center;gap:13px;padding:13px 14px;margin-bottom:4px;border-radius:11px;color:#aaa;font-size:14px}.drawer-item i{width:20px;color:#777}.drawer-item:hover,.drawer-item.router-link-active{background:#1e1e24;color:#fff}.drawer-item.router-link-active i{color:#f0446f}.drawer-loading{flex:1;display:grid;place-items:center;color:#888;gap:10px}.spinner{width:28px;height:28px;border:3px solid #29292e;border-top-color:#f0446f;border-radius:50%;animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
@media(max-width:1050px){.desktop-nav{display:none}.desktop-more{display:none}.mobile-menu{display:block}.header-inner{gap:10px}.search-box{width:auto;flex:1;max-width:420px}}
@media(max-width:560px){.header-inner{height:62px;padding:0 10px}.brand{font-size:17px}.brand-mark{width:30px;height:30px;border-radius:9px}.search-box{height:38px}.search-input{font-size:12px}.search-submit{display:none}.quick-inner{padding:7px 10px}}
</style>