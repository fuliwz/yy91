<template>
  <div class="novel-item" @click="read">
    <h3>{{ item.title }}</h3>
    <p>{{ item.description || '暂无简介' }}</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({ item: { type: Object, default: () => ({}) } })
const router = useRouter()
const read = () => router.push(`/novel/read/${props.item.id}`)
</script>
