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
          <div class="flex-1 flex flex-col">
            
            <!-- Title and Description container -->
            <div class="space-y-4 flex-grow">
              
              <!-- Title - removed line-clamp-2 to prevent text cutoff -->
              <div class="space-y-3">
                <h2 class="text-xl lg:text-4xl font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors duration-200">
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
                </div>
              </div>

              <!-- Description - changed font size and removed line-clamp-3 -->
              <div class="text-gray-600 leading-relaxed text-2xl space-y-2">
                <p>{{ truncatedDetail }}</p>
              </div>
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
      <div class="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <div class="flex items-center gap-2 text-white text-sm font-medium">
          <span>Read more</span>
          <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </article>
  </RouterLink>
</template>