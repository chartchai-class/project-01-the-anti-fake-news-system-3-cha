<script setup lang="ts">
import { computed, ref } from 'vue'
import { useVotesStore } from "@/stores/votes"
import { useRoute } from "vue-router"
import CommentCard from "@/components/CommentCard.vue"
import VoteResultCard from "@/components/VoteResultCard.vue";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const route = useRoute()
const newsId = String(route.params.id ?? "")
const votes = useVotesStore()
const summary = computed(() => votes.summary(newsId))
const totalComments = computed(() => summary.value.comments.length)
const commentsSection = ref<HTMLElement | null>(null)

const currentPage = ref(1)
const commentsPerPage = 3
const totalPages = computed(() => Math.ceil(totalComments.value / commentsPerPage))


const paginatedComments = computed(() => {
  const start = (currentPage.value - 1) * commentsPerPage
  const end = start + commentsPerPage
  return summary.value.comments.slice(start, end)
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    NProgress.start()
    currentPage.value = page

    if (commentsSection.value) {
      commentsSection.value.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
     setTimeout(() => {
      NProgress.done()
    }, 300)
  }
}

const prevPage = () => goToPage(currentPage.value - 1)
const nextPage = () => goToPage(currentPage.value + 1)
</script>

<template>
  <section class="mt-16 px-6 max-w-4xl mx-auto">
    <!-- Vote Results Card with enhanced styling -->
    <div class="mb-12">
      <VoteResultCard />
    </div>

    <!-- Comments Header -->
    <div class="mb-8" ref="commentsSection">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Comments
        </h2>
        <div class="flex items-center space-x-2">
          <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span class="text-sm font-medium text-gray-500">{{ totalComments }} comments</span>
        </div>
      </div>

      <!-- Decorative line -->
      <div class="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
    </div>

    <!-- Comments Content -->
    <div class="min-h-[400px] relative">
      <!-- Empty State -->
      <div v-if="totalComments === 0"
           class="flex flex-col items-center justify-center py-16 text-center">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
            </path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">No comments yet</h3>
        <p class="text-gray-500 max-w-sm">Be the first to share your thoughts on this story!</p>
      </div>

      <!-- Comments List -->
      <div v-else class="space-y-6">
        <div v-for="c in paginatedComments"
             :key="c.createdAt + c.name"
             class="transform transition-all duration-300 hover:scale-[1.01] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CommentCard
            :name="c.name"
            :vote="c.vote"
            :createdAt="c.createdAt"
            :comment="c.comment"
            :imageUrl="c.imageUrl"
            class="shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-xl border border-gray-200/50 bg-white/80 backdrop-blur-sm"
          />
        </div>
      </div>
    </div>

    <!-- Enhanced Pagination -->
    <div v-if="totalPages > 1" class="mt-12 mb-8">
      <div class="flex items-center justify-center space-x-1">
        <!-- Previous Button -->
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 disabled:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Previous
        </button>

        <!-- Page Numbers -->
        <div class="flex items-center space-x-1 mx-4">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'w-10 h-10 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              currentPage === page
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 transform scale-105'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm'
            ]"
          >
            {{ page }}
          </button>
        </div>

        <!-- Next Button -->
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 disabled:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <!-- Page Info -->
      <div class="text-center mt-4">
        <span class="text-sm text-gray-500">
          Showing {{ ((currentPage - 1) * commentsPerPage) + 1 }} to
          {{ Math.min(currentPage * commentsPerPage, totalComments) }} of
          {{ totalComments }} comments
        </span>
      </div>
    </div>
  </section>
</template>
