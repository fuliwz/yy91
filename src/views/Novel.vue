<template>
  <section class="module-page">
    <h1>小说</h1>
    <div class="grid">
      <div v-for="i in 12" :key="i" class="card">小说内容 {{ i }}</div>
    </div>
  </section>
</template>

<style scoped>
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px}.card{padding:20px;background:#1d1d1d;border-radius:12px}
</style>
