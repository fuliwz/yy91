<template>
  <div class="app-shell">
    <Header />
    <AdContainer />
    <main class="main-container">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import AdContainer from './components/AdContainer.vue'

const route = useRoute()

const defaultTitle = 'YY91 - 高清视频资源站'

watch(
  () => route.fullPath,
  () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const title = route.meta?.title
    document.title = title ? `${title} - YY91` : defaultTitle

    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.appendChild(description)
    }
    description.content = route.meta?.description || 'YY91 高清视频在线浏览平台'
  },
  { immediate: true }
)
</script>

<style scoped>
.main-container {
  min-height: calc(100vh - 120px);
}
</style>
