<template>
  <div class="app-shell">
    <Header />
    <main class="page-container">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()

watch(() => route.fullPath, () => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  if (route.meta?.title) document.title = route.meta.title
}, { immediate: true })
</script>

<style>
.app-shell {
  min-height: 100vh;
  background: #111;
  color: #eee;
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}
</style>
