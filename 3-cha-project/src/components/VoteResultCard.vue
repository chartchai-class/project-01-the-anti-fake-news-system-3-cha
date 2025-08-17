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

</script>

<template>
  <h3 class="mb-3 text-lg font-semibold">Summary (this session)</h3>
    <div class="grid grid-cols-2 gap-4">
      <div class="rounded border p-4">
        <div class="text-sm text-gray-500">Not Fake</div>
        <div class="text-2xl font-bold">{{ summary.notFake }}</div>
      </div>
      <div class="rounded border p-4">
        <div class="text-sm text-gray-500">Fake</div>
        <div class="text-2xl font-bold">{{ summary.fake }}</div>
      </div>
    </div>

    <div class="mb-2 text-sm text-gray-600">
      Total votes: {{ totalVotes }}
    </div>
    <div class="text-lg font-semibold">
      Result: {{ result }}
    </div>
</template>
