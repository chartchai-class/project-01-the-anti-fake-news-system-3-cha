<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from "vue-router"
import { useVotesStore } from "@/stores/votes"

const route = useRoute()
const newsId = String(route.params.id ?? "")
const votes = useVotesStore()

const summary = computed(() => votes.summary(newsId))
const totalVotes = computed(() => summary.value.notFake + summary.value.fake)

const result = computed(() => {
  if (summary.value.notFake > summary.value.fake) return "Not Fake"
  if (summary.value.fake > summary.value.notFake) return "Fake"
  return "Tie"
})

const notFakePercentage = computed(() => {
  if (totalVotes.value === 0) return 0
  return Math.round((summary.value.notFake / totalVotes.value) * 100)
})

const fakePercentage = computed(() => {
  if (totalVotes.value === 0) return 0
  return Math.round((summary.value.fake / totalVotes.value) * 100)
})

const resultColor = computed(() => {
  if (result.value === "Not Fake") return "text-emerald-600"
  if (result.value === "Fake") return "text-red-600"
  return "text-yellow-600"
})

const resultBg = computed(() => {
  if (result.value === "Not Fake") return "bg-emerald-50 border-emerald-200"
  if (result.value === "Fake") return "bg-red-50 border-red-200"
  return "bg-yellow-50 border-yellow-200"
})
</script>

<template>
  <div class="p-8">
    <!-- Header -->
    <div class="text-center mb-8">
      <h3 class="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
        Voting Summary
      </h3>
      <p class="text-gray-500 text-sm">Current session results</p>
    </div>

    <!-- Vote Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- Not Fake Card -->
      <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg">
        <div class="absolute top-0 right-0 w-[100px] h-[90px] bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-bl-3xl"></div>
        <div class="p-6 relative">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-emerald-600">{{ notFakePercentage }}%</div>
              <div class="text-xs text-gray-500">of total votes</div>
            </div>
          </div>
          <div class="mb-2">
            <div class="text-sm font-medium text-gray-600 mb-1">Not Fake News</div>
            <div class="text-3xl font-bold text-emerald-700">{{ summary.notFake }}</div>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out"
                 :style="{ width: `${notFakePercentage}%` }"></div>
          </div>
        </div>
      </div>

      <!-- Fake Card -->
      <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg">
        <div class="absolute top-0 right-0 w-[100px] h-[90px] bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-bl-3xl"></div>
        <div class="p-6 relative">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-red-600">{{ fakePercentage }}%</div>
              <div class="text-xs text-gray-500">of total votes</div>
            </div>
          </div>
          <div class="mb-2">
            <div class="text-sm font-medium text-gray-600 mb-1">Fake News</div>
            <div class="text-3xl font-bold text-red-700">{{ summary.fake }}</div>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-gradient-to-r from-red-400 to-red-500 h-2 rounded-full transition-all duration-1000 ease-out"
                 :style="{ width: `${fakePercentage}%` }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="space-y-4">
      <!-- Total Votes -->
      <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
            </svg>
          </div>
          <span class="font-medium text-gray-700">Total Votes</span>
        </div>
        <span class="text-xl font-bold text-gray-900">{{ totalVotes }}</span>
      </div>

      <!-- Final Result -->
      <div class="p-6 rounded-2xl border-2 transition-all duration-300" :class="resultBg">
        <div class="text-center">
          <div class="mb-3">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full">
              <div class="w-3 h-3 rounded-full"
                   :class="{
                     'bg-emerald-500': result === 'Not Fake',
                     'bg-red-500': result === 'Fake',
                     'bg-yellow-500': result === 'Tie'
                   }"></div>
              <span class="text-sm font-medium text-gray-600">Community</span>
            </div>
          </div>
          <div class="text-3xl font-bold mb-2" :class="resultColor">
            {{ result }}
          </div>
          <p v-if="result === 'Tie'" class="text-gray-600 text-sm">
            The community is equally divided on this news
          </p>
          <p v-else-if="result === 'Not Fake'" class="text-gray-600 text-sm">
            Believes this news is Not Fake
          </p>
          <p v-else class="text-gray-600 text-sm">
            Believes this news is Fake
          </p>
        </div>
      </div>
    </div>

    <!-- Visual Separator -->
    <div v-if="totalVotes > 0" class="mt-8 relative">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="bg-white px-4 text-gray-500">Based on {{ totalVotes }} vote{{ totalVotes !== 1 ? 's' : '' }}</span>
      </div>
    </div>
  </div>
</template>
