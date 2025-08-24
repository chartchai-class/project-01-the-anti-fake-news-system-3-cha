<script setup lang="ts">
import { useNewsStore } from '@/stores/new'
import { storeToRefs } from 'pinia'

const store = useNewsStore()
const { news } = storeToRefs(store)

</script>

<template>
  <div v-if="news" class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    
    <!-- Header Section with News Info -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="container mx-auto px-4 py-6">
        <div class="max-w-4xl mx-auto">
          
          <!-- Back Button -->
          <div class="mb-4">
            <RouterLink :to="{ name: 'home-view' }" 
              class="inline-flex items-center gap-2 text-gray-600 hover:text-[#19B917] font-medium transition-colors duration-200 group">
              <svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              <span>Back to Dashboard</span>
            </RouterLink>
          </div>

        </div>
      </div>
    </div>

    <!-- Navigation Tabs Section -->
    <div class="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div class="container mx-auto px-4 py-4">
        <nav class="flex justify-center">
          <div class="inline-flex bg-gray-100 rounded-2xl p-1 shadow-inner">
            
            <RouterLink :to="{ name: 'news-detail-view', params:{ id: news.id } }"
                        class="nav-tab"
                        :class="{ 'nav-tab-active': $route.name === 'news-detail-view' }">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              <span class="font-medium">Details</span>
            </RouterLink>

            <RouterLink :to="{ name: 'news-vote-view', params:{ id: news.id } }"
                        class="nav-tab"
                        :class="{ 'nav-tab-active': $route.name === 'news-vote-view' }">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12.75 6.75 10.5 5.5 11.75 9 15.25 18.5 5.75 17.25 4.5 9 12.75z"/>
              </svg>
              <span class="font-medium">Vote</span>
            </RouterLink>

            <RouterLink :to="{ name: 'news-comment-list-view', params:{ id: news.id } }"
                        class="nav-tab"
                        :class="{ 'nav-tab-active': $route.name === 'news-comment-list-view' }">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z"/>
              </svg>
              <span class="font-medium">Comments</span>
            </RouterLink>
            
          </div>
        </nav>
      </div>
    </div>

    <!-- Content Section with Proper Spacing -->
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Add some top margin to separate from navigation -->
        <div class="mt-4">
          <RouterView :news="news" />
        </div>
      </div>
    </div>
    
  </div>
</template>