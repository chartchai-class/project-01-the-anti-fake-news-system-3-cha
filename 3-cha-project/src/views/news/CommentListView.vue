<script setup lang="ts">
import { computed, ref } from 'vue'
import { useVotesStore } from "@/stores/votes"
import { useRoute } from "vue-router"
import CommentCard from "@/components/CommentCard.vue"
import VoteResultCard from "@/components/VoteResultCard.vue";

const route = useRoute()
const newsId = String(route.params.id ?? "")
const votes = useVotesStore()
const summary = computed(() => votes.summary(newsId))
const totalComments = computed(() => summary.value.comments.length)


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
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevPage = () => goToPage(currentPage.value - 1)
const nextPage = () => goToPage(currentPage.value + 1)
</script>

<template>
  <section class="mt-10">
    <VoteResultCard />

    <h4 class="mt-6 mb-2 text-base font-semibold">
      Latest comments ( {{ totalComments }} )
    </h4>

    <div v-if="totalComments === 0" class="text-sm text-gray-500">
      No comments yet.
    </div>

    <ul v-else class="space-y-3">
      <CommentCard
        v-for="c in paginatedComments"
        :key="c.createdAt + c.name"
        :name="c.name"
        :vote="c.vote"
        :createdAt="c.createdAt"
        :comment="c.comment"
        :imageUrl="c.imageUrl"
      />
    </ul>

    <div class="flex justify-center mt-4 items-center space-x-2">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-3 py-1 rounded border bg-gray-200 disabled:opacity-50"
      >
        Previous
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-3 py-1 rounded border',
          currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
        ]"
      >
        {{ page }}
      </button>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded border bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </section>
</template>
