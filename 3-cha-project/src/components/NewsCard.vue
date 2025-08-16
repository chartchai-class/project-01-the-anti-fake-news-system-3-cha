<template>
  <RouterLink :to="{ name: 'news-detail-view', params: { id: news.id } }">
    <div class="flex flex-col md:flex-row items-start p-3 bg-white border border-gray-200 rounded-lg shadow-sm mb-3">
      <div class="flex-1 pr-0 md:pr-3 font-amiri order-2 md:order-1">
        <h2 class="font-sans text-lg font-bold mb-1">{{ news.topic }}</h2>
        <p class="text-xs text-gray-700 leading-tight">{{ truncatedDetail }}</p>

        <div class="flex items-center mt-2 text-xs text-gray-500">
          <div :class="newsTypeClass">{{ news.status }}</div>
          <span class="ml-1">By {{ news.reporter }}</span>
          <span class="ml-1">{{ news.date }}</span>
        </div>
      </div>

      <div class="w-24 h-24 flex-shrink-0 order-1 md:order-2 mb-2 md:mb-0">
        <img :src="news.imageLink" :alt="news.topic" class="w-full h-full rounded-md object-cover" />
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type NewsItem } from '@/types';

const props = defineProps<{
  news: NewsItem
}>();

// Logic for truncating the short detail based on your requirement
const truncatedDetail = computed(() => {
  const wordLimit = 80;
  if (props.news.shortDetail.length > wordLimit) {
    return props.news.shortDetail.substring(0, wordLimit) + '...';
  }
  return props.news.shortDetail;
});

// Tailwind class for the news type based on status
const newsTypeClass = computed(() => {
  if (props.news.status.toLowerCase() === 'fake news') {
    return 'bg-[#808080] text-white font-bold py-1 px-2 rounded-full text-xs';
  } else {
    return 'bg-[#19B917] text-white font-bold py-1 px-2 rounded-full text-xs';
  }
});
</script>