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

    <div class="text-center space-y-4">
      <!-- Status Badge -->
      <div class="flex justify-center">
        <span :class="[
          'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-lg',
          `bg-gradient-to-r ${statusConfig.badgeGradient} text-white`
        ]">
          <span class="text-base">{{ statusConfig.icon }}</span>
          {{ news.status }}
        </span>
      </div>
      
      <!-- Title -->
      <h1 class="text-[50px] md:text-[70px] font-bold text-left text-gray-900 leading-tight">
        {{ news.topic }}
      </h1>
      
      <!-- Reporter Info -->
      <div class="flex flex-wrap justify-start items-center gap-4 text-sm text-gray-600">
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
          </svg>
          <span>{{ news.date }}</span>
        </div>
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
          </svg>
          <span>{{ news.time }}</span>
        </div>
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
          </svg>
          <span class="font-medium">{{ news.reporter }}</span>
        </div>
      </div>
    </div>
    
    <!-- Verification Status -->
    <header class="text-center space-y-6 mb-12">
      <div :class="[
        'mx-auto p-6 rounded-2xl border-2 shadow-lg mt-10',
        `bg-gradient-to-r ${statusConfig.bgGradient}`,
        statusConfig.borderColor
      ]">
        <div class="flex items-center justify-center gap-4">
          <div :class="[
            'w-[60px] h-[60px] rounded-full flex items-center justify-center text-4xl shadow-lg',
            `bg-gradient-to-r ${statusConfig.badgeGradient} text-white`
          ]">
            {{ statusConfig.icon }}
          </div>
          <div class="text-center">
            <h3 :class="['text-[22px] font-bold', statusConfig.textColor]">
              Verification Status: {{ news.status }}
            </h3>
            <p :class="['text-[15px] opacity-80', statusConfig.textColor]">
              {{ news.status.toLowerCase() === 'fake news' 
                ? 'This content has been flagged as potentially misleading' 
                : 'This content has been verified as authentic' }}
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- image news -->
    <div class=" text-center m-[100px] mt-[50px] mb-[50px]" >
        <img :src="news.imageLink" :alt="news.topic" class="w-[1000px] h-[700px] text-center rounded-md object-cover" />
    </div>
    <!-- full details -->
    <p class="text-[18px] text-justify">{{ news.fullDetail }}</p>
</template>
