<template>
  <article class="image-card" @click="$emit('click', item)">
    <img :src="item.cover || '/fallback.jpg'" :alt="item.title" loading="lazy" />
    <h3>{{ item.title }}</h3>
  </article>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['click'])
</script>
