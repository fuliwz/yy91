<template>
  <Header />

  <AdContainer />

  <router-view />

  <Footer />
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import AdContainer from './components/AdContainer.vue'

const route = useRoute()

/**
 * 页面统一处理：路由变化后滚动到顶部。
 * 广告生命周期由 AdContainer 独立管理。
 */
watch(
  () => route.fullPath,
  () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    if (!document.title || document.title === '18xx') {
      document.title = '18xx'
    }
  },
  { immediate: true }
)
</script>
