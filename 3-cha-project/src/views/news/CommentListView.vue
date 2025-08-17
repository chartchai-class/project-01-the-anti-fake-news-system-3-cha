<script setup lang="ts">
import { computed} from 'vue'
import { useVotesStore } from "@/stores/votes"
import { useRoute } from "vue-router"


const route = useRoute()
const newsId = String(route.params.id ?? "")
const votes = useVotesStore()
const summary = computed(() => votes.summary(newsId))
const totalComments = computed(() => summary.value.comments.length)



</script>

<template>
  <section class="mt-10">


    <h4 class="mt-6 mb-2 text-base font-semibold">
      Latest comments
    </h4>

    <div v-if="totalComments === 0" class="text-sm text-gray-500">
      No comments yet.
    </div>

  </section>
</template>
