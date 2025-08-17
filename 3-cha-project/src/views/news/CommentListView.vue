<script setup lang="ts">
import { computed} from 'vue'
import { useVotesStore } from "@/stores/votes"
import { useRoute } from "vue-router"
import CommentCard from "@/components/CommentCard.vue"
import VoteResultCard from "@/components/VoteResultCard.vue";

const route = useRoute()
const newsId = String(route.params.id ?? "")
const votes = useVotesStore()
const summary = computed(() => votes.summary(newsId))
const totalComments = computed(() => summary.value.comments.length)
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
        v-for="c in summary.comments"
        :key="c.createdAt + c.name"
        :name="c.name"
        :vote="c.vote"
        :createdAt="c.createdAt"
        :comment="c.comment"
        :imageUrl="c.imageUrl"
      />
    </ul>
  </section>
</template>
