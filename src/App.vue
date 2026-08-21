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
  window.scrollTo({ top: 0 })
  if (route.meta?.title) {
    document.title = route.meta.title
  }
}, { immediate: true })
</script>

<style>
:root {
  --yy-bg: #0b0d12;
  --yy-panel: #151922;
  --yy-text: #f5f7fa;
  --yy-muted: #9aa4b2;
  --yy-radius: 14px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--yy-bg);
  color: var(--yy-text);
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.app-shell {
  min-height: 100vh;
  background: var(--yy-bg);
}

.page-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
}

@media (max-width: 768px) {
  .page-container {
    padding: 12px;
  }
}
</style>
