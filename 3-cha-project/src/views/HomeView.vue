<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <div class="flex flex-col items-start text-sm font-sans mb-4">
      <div class="flex items-center">
        <svg class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7-7-7m9 4v7a1 1 0 01-1 1h-3" />
        </svg>
        <RouterLink class="font-bold text-gray-700" :to="{ name: 'home-view' }">Home</RouterLink>
      </div>
      <span class="mt-1 ml-5 text-gray-500">{{ filteredNewsCount }} ({{ newsCount }})</span>
    </div>

    <div class="flex justify-end mb-4 space-x-2">
      <div class="relative inline-block text-left">
        <select v-model="filter" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <option value="all" disabled>Type</option>
          <option value="all">All News</option>
          <option value="fake news">Fake News</option>
          <option value="real news">Real News</option>
        </select>
      </div>

      <div class="relative inline-block text-left">
        <select v-model="limit" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <option disabled selected value="null">Items per page</option>
          <option value="2">2 news per page</option>
          <option value="4">4 news per page</option>
          <option value="6">6 news per page</option>
        </select>
      </div>
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
          :class="{
            'bg-gray-200 hover:bg-gray-300': p !== page,
            'bg-[#19B917] text-white': p === page
          }"
          class="py-1 px-3 rounded-md"
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
import { ref, computed, watch } from 'vue';
import NewsCard from '@/components/NewsCard.vue';
import axios from 'axios';
import type { New } from '@/types';

const newsList = ref<New[]>([]);
const page = ref(1);
const limit = ref<any>(null); // Change initial limit to null to match the placeholder value
const filter = ref('all');

// Reset page to 1 when filter changes
watch(filter, () => {
  page.value = 1;
});

// Reset page to 1 when limit changes
watch(limit, () => {
  page.value = 1;
});

const filteredNews = computed(() => {
  if (filter.value === 'all') {
    return newsList.value;
  }
  if (filter.value === 'fake news') {
    return newsList.value.filter(news => news.status.toLowerCase() === 'fake news');
  }
  if (filter.value === 'real news') {
    return newsList.value.filter(news => news.status.toLowerCase() === 'not-fake news');
  }
  return newsList.value;
});

const newsCount = computed(() => filteredNews.value.length);
const filteredNewsCount = computed(() => {
  if (filter.value === 'fake news') {
    return 'Fake News';
  } else if (filter.value === 'real news') {
    return 'Real News';
  } else {
    return 'All News';
  }
});

const totalPages = computed(() => {
  if (limit.value === null) {
    return Math.ceil(filteredNews.value.length / 4);
  }
  return Math.ceil(filteredNews.value.length / Number(limit.value));
});

const paginatedNews = computed(() => {
  const currentLimit = limit.value === null ? 4 : Number(limit.value);
  const start = (page.value - 1) * currentLimit;
  const end = start + currentLimit;
  return filteredNews.value.slice(start, end);
});

const fetchNews = async () => {
  try {
    const response = await axios.get('https://my-json-server.typicode.com/Ameyukiko/dataNew/news');
    newsList.value = response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
  }
};

fetchNews();
</script>