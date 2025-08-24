<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import NewsCard from '@/components/NewsCard.vue';
import axios from 'axios';
import type { New } from '@/types';
import NProgress from 'nprogress';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// State variables to hold the news data, current page, items per page limit, and filter.
const newsList = ref<New[]>([]);
const page = ref(1);
const limit = ref<number | null>(null);
const filter = ref('all');
const isLoading = ref(false); // New state variable for the loading spinner
const animationKey = ref(0); // A new key to force animation re-render

// Function to handle the start and end of the loading state. nprogress is used for the top loading bar.
const startLoading = () => {
  isLoading.value = true;
  NProgress.start();
};

const stopLoading = () => {
  isLoading.value = false;
  NProgress.done();
};

// Function to scroll the page to the top smoothly.
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Computed property to filter the news list based on the selected filter option.
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

// Computed properties for display.
const newsCount = computed(() => filteredNews.value.length);
const filteredNewsCount = computed(() => {
  if (filter.value === 'fake news') {
    return 'Fake News';
  } else if (filter.value === 'real news') {
    return 'Not-Fake News';
  }
  return 'All News';
});

const totalPages = computed(() => {
  const currentLimit = limit.value === null ? 4 : Number(limit.value);
  return Math.ceil(filteredNews.value.length / currentLimit);
});

const paginatedNews = computed(() => {
  const currentLimit = limit.value === null ? 4 : Number(limit.value);
  const start = (page.value - 1) * currentLimit;
  const end = start + currentLimit;
  return filteredNews.value.slice(start, end);
});

// Function to fetch news data from the API.
const fetchNews = async () => {
  try {
    const response = await axios.get<New[]>('https://db-news-theta.vercel.app/api/news');
    newsList.value = response.data;
  } catch (err: unknown) {
    // Narrow the error safely (works for generic errors and Axios errors)
    let message = 'Unknown error';
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      const data = err.response?.data;
      message = status
        ? `Request failed with status ${status}${data ? `: ${JSON.stringify(data)}` : ''}`
        : (err.message ?? 'Network error');
    } else if (err instanceof Error) {
      message = err.message;
    } else if (typeof err === 'string') {
      message = err;
    }

    console.error('Error fetching news:', err);
    router.push({ name: 'network-error', query: { message } });
  }
};

// Watchers to trigger loading and scroll on changes.
watch(filter, () => {
  startLoading();
  page.value = 1; // Reset to the first page when the filter changes
  scrollToTop();
  animationKey.value++; // Increment key to force animation re-render
  setTimeout(() => { stopLoading(); }, 300); // Simulate a brief loading time
});

watch(limit, (newLimit) => {
  startLoading();
  page.value = 1;
  router.replace({
    query: {
      ...route.query,
      page: String(page.value),
      limit: String(newLimit),
    },
  });
  scrollToTop();
  animationKey.value++;
  setTimeout(() => { stopLoading(); }, 300);
});

watch(page, (newPage) => {
  startLoading();
  router.replace({
    query: {
      ...route.query,
      page: String(newPage),
      limit: String(limit.value ?? 4),
    },
  });
  scrollToTop();
  setTimeout(() => { stopLoading(); }, 300);
});


// Fetch news data when the component is first mounted.
onMounted(() => {
  const query = route.query;
  if (query.page) page.value = Number(query.page);
  if (query.limit) limit.value = Number(query.limit);
  fetchNews();
});

</script>

<template>
  <!-- Link to the NProgress CSS file. This is necessary to load the core styles. -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />

  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-300 relative">
    <!-- Loading spinner in the top right corner, visible only when `isLoading` is true. -->

    <div class="container mx-auto px-4 py-8 max-w-6xl">

      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-gradient-to-r from-[#19B917] to-green-600"></div>
              <span class="text-lg font-semibold text-gray-800">{{ filteredNewsCount }}</span>
              <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                {{ newsCount }} news
              </span>
            </div>
          </div>

          <div class="flex gap-3 w-full sm:w-auto">
            <div class="relative flex-1 sm:flex-none ">
              <select v-model="filter"
                class="w-full sm:w-44 appearance-none bg-green-500 border-2 rounded-[50px] px-4 py-3 pr-8 text-white font-medium shadow-sm hover:border-[#19B917] focus:border-[#19B917] focus:ring-4 focus:ring-green-100 focus:outline-none transition-all duration-200">
                <option value="all" class="text-gray-700 bg-white">All News</option>
                <option value="fake news" class="text-gray-700 bg-white">Fake News </option>
                <option value="real news" class="text-gray-700 bg-white">Not-Fake News </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>

            <div class="relative flex-1 sm:flex-none">
              <select v-model="limit"
                class="w-full sm:w-48 appearance-none bg-green-500 border-2 rounded-[50px] px-4 py-3 pr-8 text-white font-medium shadow-sm hover:border-[#19B917] focus:border-[#19B917] focus:ring-4 focus:ring-green-100 focus:outline-none transition-all duration-200">
                <option disabled selected value="null" class="text-gray-700 bg-white">News per page</option>
                <option value="2" class="text-gray-700 bg-white">2 news per page</option>
                <option value="4" class="text-gray-700 bg-white">4 news per page</option>
                <option value="6" class="text-gray-700 bg-white">6 news per page</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-6 mb-8">
        <div v-if="paginatedNews.length === 0" class="col-span-full">
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-700 mb-2">No news found</h3>
            <p class="text-gray-500">Try adjusting your filter settings to see more results.</p>
          </div>
        </div>

        <NewsCard
          v-for="(news, index) in paginatedNews"
          :key="news.id + '-' + animationKey"
          :news="news"
          :class="[
            'transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
            'animate-fade-in-up opacity-0',
            { 'delay-100': index % 2 === 1 }
          ]"
        />
      </div>

      <div v-if="totalPages > 1" class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="text-gray-600 font-medium">
            Page {{ page }} of {{ totalPages }}
            <span class="text-gray-400">•</span>
            Showing {{ paginatedNews.length }} of {{ newsCount }} News
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="page--; scrollToTop()"
              :disabled="page === 1"
              class="group flex items-center gap-2 bg-gray-100 hover:bg-[#19B917] hover:text-white text-gray-700 font-medium py-2 px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              <span class="hidden sm:inline">Previous</span>
            </button>

            <div class="flex gap-1">
              <template v-for="p in totalPages" :key="p">
                <button
                  v-if="p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2)"
                  @click="page = p; scrollToTop()"
                  :class="{
                    'bg-gradient-to-r from-[#19B917] to-green-600 text-white shadow-lg scale-110': p === page,
                    'bg-gray-100 hover:bg-gray-200 text-gray-700': p !== page
                  }"
                  class="w-10 h-10 rounded-xl font-medium transition-all duration-200 hover:shadow-md transform hover:scale-105"
                >
                  {{ p }}
                </button>
                <span v-else-if="(p === page - 3 && page > 4) || (p === page + 3 && page < totalPages - 3)"
                  class="flex items-center px-2 text-gray-400">
                  ...
                </span>
              </template>
            </div>

            <button
              @click="page++; scrollToTop()"
              :disabled="page === totalPages"
              class="group flex items-center gap-2 bg-gray-100 hover:bg-[#19B917] hover:text-white text-gray-700 font-medium py-2 px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span class="hidden sm:inline">Next</span>
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>