<template>
  <RouterLink :to="{ name: 'news-detail-view', params: { id: news.id } }">
    <div class="flex flex-col md:flex-row items-start p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-4">
      <div class="flex-1 pr-0 md:pr-4 font-amiri order-2 md:order-1">
        <h2 class="font-sans text-xl font-bold mb-2">{{ news.topic }}</h2>
        <p class="text-sm text-gray-700 leading-relaxed">{{ truncatedDetail }}</p>

        <div class="flex items-center mt-4 text-xs text-gray-500">
          <div :class="newsTypeClass">{{ news.status }}</div>
          <span class="ml-2">By {{ news.reporter }}</span>
          <span class="ml-2">{{ news.date }}</span>
        </div>
      </div>

      <div class="w-40 h-auto flex-shrink-0 order-1 md:order-2 mb-4 md:mb-0">
        <img :src="news.imageLink" :alt="news.topic" class="w-full h-auto rounded-md object-cover" />
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type New } from '@/types';

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