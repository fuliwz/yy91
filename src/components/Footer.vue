<template>
  <div class="footer">Copyright © 2026</div>
</template>
<script setup>
import { onMounted } from "vue"
const loadScript=(src)=>new Promise((resolve,reject)=>{const script=document.createElement("script");script.src=src;script.async=true;script.onload=resolve;script.onerror=reject;document.body.appendChild(script)})
onMounted(()=>{loadScript("/tj.js")})
</script>
<style scoped>
.footer { text-align:center; padding:20px 0; font-size:12px; color:#888; }
</style>
