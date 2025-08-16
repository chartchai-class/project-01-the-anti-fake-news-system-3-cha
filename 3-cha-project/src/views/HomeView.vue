<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <h1 class="text-3xl font-bold font-sans mb-4 text-center">Anti-Fake News System</h1>

    <div class="flex justify-center my-4 space-x-4">
      <button 
        @click="filter = 'all'" 
        class="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md font-sans text-sm"
        :class="{'bg-black text-white': filter === 'all'}"
      >
        All News
      </button>
      <button 
        @click="filter = 'fake news'" 
        class="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md font-sans text-sm"
        :class="{'bg-[#808080] text-white': filter === 'fake news'}"
      >
        Fake News
      </button>
      <button 
        @click="filter = 'real news'" 
        class="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md font-sans text-sm"
        :class="{'bg-[#19B917] text-white': filter === 'real news'}"
      >
        Real News
      </button>
    </div>

    <div class="flex flex-col items-center">
      <NewsCard 
        v-for="news in paginatedNews" 
        :key="news.id" 
        :news="news" 
      />
    </div>

    <div class="flex justify-center items-center mt-6">
      <div class="flex space-x-2 font-sans text-sm">
        <button 
          @click="page--" 
          :disabled="page === 1" 
          class="bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button 
          v-for="p in totalPages" 
          :key="p" 
          @click="page = p" 
          :class="{'bg-black text-white': p === page}"
          class="bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded-md"
        >
          {{ p }}
        </button>
        <button 
          @click="page++" 
          :disabled="page === totalPages" 
          class="bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import NewsCard from '@/components/NewsCard.vue';
import axios from 'axios';
import type { NewsItem } from '@/types';

const newsList = ref<NewsItem[]>([]);
const page = ref(1);
const limit = ref(4);
const filter = ref('all');

const filteredNews = computed(() => {
  if (filter.value === 'all') {
    return newsList.value;
  }
  // This is the updated filter logic
  if (filter.value === 'fake news') {
    return newsList.value.filter(news => news.status.toLowerCase() === 'fake news');
  }
  if (filter.value === 'real news') {
    return newsList.value.filter(news => news.status.toLowerCase() === 'not-fake news');
  }
  return newsList.value;
});

const totalPages = computed(() => {
  return Math.ceil(filteredNews.value.length / limit.value);
});

const paginatedNews = computed(() => {
  const start = (page.value - 1) * limit.value;
  const end = start + limit.value;
  return filteredNews.value.slice(start, end);
});

const fetchNews = async () => {
  try {
    const response = await axios.get('http://localhost:3000/news');
    newsList.value = response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
  }
};

watchEffect(() => {
  fetchNews();
});
</script>