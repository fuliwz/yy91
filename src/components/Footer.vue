<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="footer-mark"><i class="bi bi-play-fill"></i></span>
        <div><strong>YY91</strong><small>Discover · Watch · Enjoy</small></div>
      </div>
      <div class="footer-copy">© 2026 YY91 · All rights reserved.</div>
    </div>
  </footer>
</template>
<script setup>
import {onMounted} from 'vue';
const loadScript=src=>new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=src;script.async=true;script.onload=resolve;script.onerror=reject;document.body.appendChild(script)});
onMounted(()=>{loadScript('/tj.js').catch(()=>{})})
</script>
<style scoped>
.site-footer{margin-top:50px;border-top:1px solid rgba(255,255,255,.06);background:#0b0b0d}.footer-inner{max-width:1440px;margin:auto;padding:26px 18px;display:flex;align-items:center;justify-content:space-between;gap:20px}.footer-brand{display:flex;align-items:center;gap:10px}.footer-mark{width:30px;height:30px;display:grid;place-items:center;border-radius:8px;background:#1c1c21;color:#f0446f}.footer-brand strong{display:block;font-size:13px}.footer-brand small{display:block;color:#666;font-size:9px;margin-top:2px}.footer-copy{font-size:10px;color:#5d5d65}@media(max-width:560px){.footer-inner{flex-direction:column;align-items:flex-start;padding:22px 12px}.footer-copy{font-size:9px}}
</style>