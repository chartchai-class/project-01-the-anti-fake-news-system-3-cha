<script setup lang="ts">
import { toRefs, computed } from 'vue'
import { type New } from '@/types'

const props = defineProps<{
  news: New
}>()

const { news } = toRefs(props)

// Status configuration for styling
const statusConfig = computed(() => {
  const isFakeNews = news.value.status.toLowerCase() === 'fake news'
  return {
    bgGradient: isFakeNews 
      ? 'from-red-50 to-red-100' 
      : 'from-green-50 to-green-100',
    textColor: isFakeNews ? 'text-red-700' : 'text-green-700',
    borderColor: isFakeNews ? 'border-red-200' : 'border-green-200',
    icon: isFakeNews ? '⚠️' : '✅',
    badgeGradient: isFakeNews 
      ? 'from-red-500 to-red-600' 
      : 'from-green-500 to-green-600'
  }
})
</script>

<template>

      <!-- Status new -->
      <div class="flex justify-center">
        <span :class="[
          'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-lg',
          `bg-gradient-to-r ${statusConfig.badgeGradient} text-white`
        ]">
          <span class="text-base">{{ statusConfig.icon }}</span>
          {{ news.status }}
        </span>
      </div>
    
  <div class="m-[200px] mt-[50px]">
    <h1 class="text-[50px] font-bold text-left ">{{ news.topic }}</h1>
    <p class="text-left mt-[-10px]">Date: {{  news.date }} | Time: {{ news.time }} | STATUS: {{ news.status }}</p>
    <p class="text-left underline underline-offset-8 ">By {{ news.reporter }}</p>
    <div class=" text-center m-[100px] mt-[50px] mb-[50px]" >
        <img :src="news.imageLink" :alt="news.topic" class="w-[1000px] h-[700px] text-center rounded-md object-cover" />
    </div>
    <p class="text-[18px] text-justify">{{ news.fullDetail }}</p>

  </div>
</template>
