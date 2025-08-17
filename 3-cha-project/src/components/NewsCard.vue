<script setup lang="ts">
import { computed } from 'vue';
import { type New } from '@/types';
import NewsReporter from '@/components/NewsReporter.vue';

const props = defineProps<{
  news: New
}>();

// Logic for truncating the short detail based on your requirement
const truncatedDetail = computed(() => {
  const wordLimit = 150;
  if (props.news.shortDetail.length > wordLimit) {
    return props.news.shortDetail.substring(0, wordLimit) + '...';
  }
  return props.news.shortDetail;
});

// Enhanced styling for the news status badge
const newsTypeClass = computed(() => {
  if (props.news.status.toLowerCase() === 'fake news') {
    return {
      badge: 'bg-gradient-to-r from-red-500 to-red-600 text-white',
      border: 'border-red-200',
      glow: 'shadow-red-100',
      icon: '❌'
    };
  } else {
    return {
      badge: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
      border: 'border-green-200', 
      glow: 'shadow-green-100',
      icon: '✅'
    };
  }
});

// Determine if content is fake news for styling
const isFakeNews = computed(() => props.news.status.toLowerCase() === 'fake news');
</script>

<template>
  <RouterLink :to="{ name: 'news-detail-view', params: { id: news.id } }" class="block group">
    <article class="relative bg-white border-2 border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:border-gray-200 group-hover:scale-[1.01] backdrop-blur-sm">
      
      <!-- Status Indicator Bar -->
      <div :class="[
        'absolute top-0 left-0 right-0 h-1 transition-all duration-300',
        isFakeNews ? 'bg-gradient-to-r from-red-400 to-red-600' : 'bg-gradient-to-r from-green-400 to-green-600'
      ]"></div>

      <div class="p-6">
        <div class="flex flex-col lg:flex-row gap-6">
          
          <!-- Content Section -->
          <div class="flex-1 space-y-4">
            
            <!-- Title -->
            <div class="space-y-3">
              <h2 class="text-xl lg:text-2xl font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors duration-200 line-clamp-2">
                {{ news.topic }}
              </h2>
              
              <!-- Status Badge -->
              <div class="flex items-center gap-3">
                <span :class="[
                  newsTypeClass.badge,
                  'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-lg'
                ]">
                  <span class="text-base">{{ newsTypeClass.icon }}</span>
                  {{ news.status }}
                </span>
                
                <!-- Reading Time Estimate -->
                <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                  📖 ~{{ Math.ceil(news.shortDetail.length / 200) }} min read
                </span>
              </div>
            </div>

            <!-- Description -->
            <div class="text-gray-600 leading-relaxed text-base space-y-2">
              <p class="line-clamp-3">{{ truncatedDetail }}</p>
            </div>

            <!-- Reporter Info -->
            <div class="pt-4 border-t border-gray-100">
              <NewsReporter 
                :reporter="news.reporter" 
                :date="news.date" 
                :time="news.time"
                class="flex items-center gap-3"
              />
            </div>
          </div>

          <!-- Image Section -->
          <div class="lg:w-80 h-48 lg:h-64 flex-shrink-0 relative overflow-hidden rounded-xl group">
            <img 
              :src="news.imageLink" 
              :alt="news.topic" 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            <!-- Image Overlay with Gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Status Indicator on Image -->
            <div class="absolute top-3 right-3">
              <div :class="[
                'w-3 h-3 rounded-full shadow-lg',
                isFakeNews ? 'bg-red-500' : 'bg-green-500'
              ]"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hover Effect Border Glow -->
      <div :class="[
        'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none',
        isFakeNews ? 'shadow-2xl shadow-red-100' : 'shadow-2xl shadow-green-100'
      ]"></div>

      <!-- Read More Indicator -->
      <div class="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <div class="flex items-center gap-2 text-gray-500 text-sm font-medium">
          <span>Read more</span>
          <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </article>
  </RouterLink>
</template>

<style scoped>
/* Line clamp utilities for text truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom hover animations */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 0 0 currentColor;
  }
  50% {
    box-shadow: 0 0 20px 5px currentColor;
  }
}

.group:hover .status-glow {
  animation: pulse-glow 2s infinite;
}

/* Custom scrollbar for any overflow content */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

/* Focus styles for accessibility */
.group:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>