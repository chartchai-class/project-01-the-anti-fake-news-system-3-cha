<script setup lang="ts">
import { computed, ref } from "vue"
import { useRoute } from "vue-router"
import { useVotesStore } from "@/stores/votes"

type Choice = "not_fake" | "fake"
const route = useRoute()
const newsId = String(route.params.id ?? "")
const votes = useVotesStore()

const choice = ref<Choice | "">("")
const name = ref(""); const comment = ref(""); const imageUrl = ref("")
const summary = computed(() => votes.summary(newsId))
const canSubmit = computed(() => choice.value!=="" && name.value.trim()!=="")

function onSubmit() {
  votes.castVote({
    newsId,
    name: name.value.trim(),
    comment: comment.value.trim() || undefined,
    imageUrl: imageUrl.value.trim() || undefined,
    choice: choice.value as Choice,
    createdAt: new Date().toISOString(),
  })
  choice.value=""; name.value=""; comment.value=""; imageUrl.value=""
}
</script>
<template>
  <div class="mx-auto max-w-3xl p-6">

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

    <section class="mt-10">
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

      <h4 class="mt-6 mb-2 text-base font-semibold">Latest comments</h4>
      <div v-if="summary.comments.length===0" class="text-sm text-gray-500">No comments yet.</div>
      <ul v-else class="space-y-3">
        <li v-for="c in summary.comments" :key="c.createdAt+c.name" class="rounded border p-4">
          <div class="mb-1 text-sm text-gray-500">
            <span class="font-medium">{{ c.name }}</span> •
            <span>{{ c.choice==='not_fake'?'Not Fake New':'Fake New' }}</span> •
            <span>{{ new Date(c.createdAt).toLocaleString() }}</span>
          </div>
          <p class="mb-2 whitespace-pre-wrap">{{ c.comment }}</p>
          <img v-if="c.imageUrl" :src="c.imageUrl" class="max-h-40 rounded" alt="attachment" />
        </li>
      </ul>
    </section>
  </div>
</template>


