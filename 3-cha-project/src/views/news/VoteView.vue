<script setup lang="ts">
import { computed, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useVotesStore } from "@/stores/votes"
import VoteResultCard from "@/components/VoteResultCard.vue"

type Choice = "not_fake" | "fake"
const route = useRoute()
const router = useRouter()
const newsId = String(route.params.id ?? "")
const votes = useVotesStore()

const choice = ref<Choice | "">("")
const name = ref("")
const comment = ref("")
const imageUrl = ref("")
const canSubmit = computed(() => choice.value!=="" && name.value.trim()!=="")

function onSubmit() {
  votes.castVote({
  newsId,
  name: name.value.trim(),
  comment: comment.value.trim() || undefined,
  imageUrl: imageUrl.value.trim() || undefined,
  vote: choice.value as "not_fake" | "fake",
  createdAt: new Date().toISOString(),
})


  router.push({ name: "news-comment-list-view", params: { id: newsId } })

  choice.value = ""
  name.value = ""
  comment.value = ""
  imageUrl.value = ""
}
</script>

<template>
  <div class="mx-auto max-w-3xl p-6">
    <VoteResultCard />

    <section class="mt-8">
      <h2 class="text-xl font-bold">VOTE</h2>

      <form class="mt-4 space-y-4" @submit.prevent="onSubmit">
        <label class="flex items-center gap-3 rounded border p-4">
          <input type="radio" value="not_fake" v-model="choice" />
          <span class="text-green-700 font-semibold">Not Fake New</span>
        </label>
        <label class="flex items-center gap-3 rounded border p-4">
          <input type="radio" value="fake" v-model="choice" />
          <span class="text-red-600 font-semibold">Fake New</span>
        </label>

        <input class="w-full rounded border px-4 py-3" type="text"
               placeholder="type your name" v-model.trim="name" />

        <textarea class="w-full rounded border px-4 py-3" rows="4"
                  placeholder="comment here" v-model.trim="comment"></textarea>

        <div class="space-y-2">
          <input class="w-full rounded border px-4 py-3" type="url"
                 placeholder="image URL (optional)" v-model.trim="imageUrl" />
          <div v-if="imageUrl" class="flex items-center justify-center rounded border p-4">
            <img :src="imageUrl" alt="preview" class="max-h-40 object-contain" @error="imageUrl=''" />
          </div>
        </div>

        <div class="flex justify-end">
          <button type="submit" class="rounded bg-green-600 px-5 py-2 text-white disabled:opacity-50"
                  :disabled="!canSubmit">submit</button>
        </div>
      </form>
    </section>
  </div>
</template>
