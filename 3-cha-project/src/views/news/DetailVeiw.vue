<script setup lang="ts">
import { toRefs} from 'vue'
import { type New } from '@/types'

const props = defineProps<{
  news: New
}>()

const { news } = toRefs(props)
</script>

<template>
  <div>
    <h1>{{ news.topic }}</h1>
    <p>Date: {{  news.date }} | Time: {{ news.time }} | STATUS: {{ news.status }}</p>
    <p>By {{ news.reporter }}</p>
    <p>{{ news.imageLink }}</p>
    <p>{{ news.fullDetail }}</p>


  </div>
</template>