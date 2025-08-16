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

// Tailwind class for the news type based on status
const newsTypeClass = computed(() => {
  if (props.news.status.toLowerCase() === 'fake news') {
    return 'bg-[#FF0000] text-white font-bold py-1 px-2 rounded-full text-xs';
  } else {
    return 'bg-[#19B917] text-white font-bold py-1 px-2 rounded-full text-xs';
  }
});
</script>

<template>
  <RouterLink :to="{ name: 'news-detail-view', params: { id: news.id } }">
    <div class="flex flex-col md:flex-row items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-4 w-full lg:w-[800px] h-auto lg:h-[240px]">
      <div class="flex-1 pr-4 font-amiri order-2 md:order-1 self-stretch flex flex-col justify-between h-[150px] overflow-hidden">
        <div>
          <h2 class="font-sans text-xl font-bold mb-2">{{ news.topic }}</h2>
          <p class="text-sm text-gray-700 leading-relaxed">{{ truncatedDetail }}</p>
        </div>

        <div class="flex items-center mt-4">
          <div :class="newsTypeClass">{{ news.status }}</div>
          <NewsReporter 
            :reporter="news.reporter" 
            :date="news.date" 
            :time="news.time"
            class="ml-2"
          />
        </div>
      </div>

      <div class="w-32 h-32 flex-shrink-0 order-1 md:order-2">
        <img :src="news.imageLink" :alt="news.topic" class="w-full h-full rounded-md object-cover" />
      </div>
    </div>
  </RouterLink>
</template>