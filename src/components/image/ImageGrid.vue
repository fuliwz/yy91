<template>
  <section class="image-grid">
    <article v-for="item in list" :key="item.id || item.image_id" class="image-card">
      <img loading="lazy" :src="item.cover || item.url" :alt="item.title || item.name || 'image'" @error="handleError">
      <h3>{{ item.title || item.name }}</h3>
    </article>
  </section>
</template>

<script setup>
defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

function handleError(event){
  event.target.src = '/fallback.jpg'
}
</script>
