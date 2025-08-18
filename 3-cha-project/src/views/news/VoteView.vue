<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVotesStore } from '@/stores/votes'
import VoteResultCard from '@/components/VoteResultCard.vue'
import { useMessageStore } from '@/stores/message'

type Choice = 'not_fake' | 'fake'
const route = useRoute()
const router = useRouter()
const newsId = String(route.params.id ?? '')
const votes = useVotesStore()
const messageStore = useMessageStore()

const choice = ref<Choice | ''>('')
const name = ref('')
const comment = ref('')
const imageUrl = ref('')
const isSubmitting = ref(false)
const canSubmit = computed(
  () => choice.value !== '' && name.value.trim() !== '' && !isSubmitting.value,
)

async function onSubmit() {
  if (!canSubmit.value) {
    messageStore.updateMessages('Please select your voting option and fill in your name before submitting.')
    return
  }

  isSubmitting.value = true

  // Add a small delay for better UX
  setTimeout(() => {
    votes.castVote({
      newsId,
      name: name.value.trim(),
      comment: comment.value.trim() || undefined,
      imageUrl: imageUrl.value.trim() || undefined,
      vote: choice.value as 'not_fake' | 'fake',
      createdAt: new Date().toISOString(),
    })

    messageStore.updateMessages('Voting successful! Thank you 🙌')
    setTimeout(() => messageStore.resetMessages(), 1000)

    router.push({ name: 'news-comment-list-view', params: { id: newsId } })

    choice.value = ''
    name.value = ''
    comment.value = ''
    imageUrl.value = ''
    isSubmitting.value = false
  }, 500)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <div class="mx-auto max-w-4xl p-6">
      <!-- Enhanced Result Card with backdrop -->
      <div class="relative">
        <div
          class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20"
        ></div>
        <div
          class="relative backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20"
        >
          <VoteResultCard />
        </div>
      </div>

      <!-- Enhanced Voting Section -->
      <section class="mt-12">
        <div class="text-center mb-8">
          <h2
            class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
          >
            Can we trust this news?
          </h2>
          <p class="text-gray-600 text-lg">Vote and let us know.</p>
        </div>

        <form class="space-y-8" @submit.prevent="onSubmit">
          <!-- Vote Options -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label class="group cursor-pointer">
              <input type="radio" value="not_fake" v-model="choice" class="sr-only" />
              <div
                class="relative overflow-hidden rounded-2xl border-2 transition-all duration-300 bg-white hover:shadow-xl"
                :class="
                  choice === 'not_fake'
                    ? 'border-emerald-500 shadow-lg shadow-emerald-500/20 bg-gradient-to-br from-emerald-50 to-green-50'
                    : 'border-gray-200 hover:border-emerald-300'
                "
              >
                <div class="p-6 text-center">
                  <div
                    class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-300"
                    :class="
                      choice === 'not_fake'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-400 group-hover:bg-emerald-100 group-hover:text-emerald-600'
                    "
                  >
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-emerald-700 mb-2">Not Fake News</h3>
                  <p class="text-gray-600">This news seems real.</p>
                </div>
                <div
                  v-if="choice === 'not_fake'"
                  class="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 animate-pulse"
                ></div>
              </div>
            </label>

            <label class="group cursor-pointer">
              <input type="radio" value="fake" v-model="choice" class="sr-only" />
              <div
                class="relative overflow-hidden rounded-2xl border-2 transition-all duration-300 bg-white hover:shadow-xl"
                :class="
                  choice === 'fake'
                    ? 'border-red-500 shadow-lg shadow-red-500/20 bg-gradient-to-br from-red-50 to-pink-50'
                    : 'border-gray-200 hover:border-red-300'
                "
              >
                <div class="p-6 text-center">
                  <div
                    class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-300"
                    :class="
                      choice === 'fake'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-400 group-hover:bg-red-100 group-hover:text-red-600'
                    "
                  >
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-red-700 mb-2">Fake News</h3>
                  <p class="text-gray-600">This news seems false .</p>
                </div>
                <div
                  v-if="choice === 'fake'"
                  class="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 animate-pulse"
                ></div>
              </div>
            </label>
          </div>

          <!-- Form Fields -->
          <div
            class="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
          >
            <div class="space-y-6">
              <!-- Name Input -->
              <div class="group">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                <div class="relative">
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    v-model.trim="name"
                    class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors duration-200 bg-white/50 backdrop-blur-sm placeholder-gray-400"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      v-if="name.trim()"
                      class="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Comment Textarea -->
              <div class="group">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Your Comment</label>
                <textarea
                  rows="4"
                  placeholder="Comment here..."
                  v-model.trim="comment"
                  class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors duration-200 bg-white/50 backdrop-blur-sm placeholder-gray-400 resize-none"
                ></textarea>
              </div>

              <!-- Image URL Input -->
              <div class="group">
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Image (Optional)</label
                >
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  v-model.trim="imageUrl"
                  class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors duration-200 bg-white/50 backdrop-blur-sm placeholder-gray-400"
                />

                <!-- Image Preview -->
                <transition name="fade" mode="out-in">
                  <div
                    v-if="imageUrl"
                    class="mt-4 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200"
                  >
                    <div class="flex items-center justify-center">
                      <img
                        :src="imageUrl"
                        alt="Preview"
                        class="max-h-48 max-w-full object-contain rounded-lg shadow-md"
                        @error="imageUrl = ''"
                      />
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <!-- Submit Button -->
          <div class="flex justify-center pt-6">
            <button
              type="submit"
              :disabled="!canSubmit"
              class="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
            >
              <span v-if="!isSubmitting" class="flex items-center gap-2">
                <svg
                  class="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                  ></path>
                </svg>
                Submit Vote
              </span>
              <span v-else class="flex items-center gap-2">
                <svg
                  class="w-5 h-5 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  ></path>
                </svg>
                Submitting...
              </span>
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar for webkit browsers */
textarea::-webkit-scrollbar {
  width: 6px;
}
textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
textarea::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}
textarea::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
