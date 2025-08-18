<script setup lang="ts">
interface Props {
  name: string
  vote: "fake" | "not_fake"
  createdAt: string
  comment?: string | null
  imageUrl?: string
}

const props = defineProps<Props>()

const getVoteStyle = (vote: string) => {
  return vote === 'not_fake'
    ? 'bg-green-100 text-green-800 border-green-200'
    : 'bg-red-100 text-red-800 border-red-200'
}
</script>

<template>
  <li class="list-none group relative bg-white rounded-xlgroup relative bg-white rounded-xl border border-gray-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-gray-300/80 backdrop-blur-sm">
  <!-- Vote Badge - Top Right -->
  <div class="absolute top-4 right-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
    <div :class="[
      'flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border shadow-sm transition-all duration-300',
      getVoteStyle(props.vote)
    ]">
      <!-- Vote Icon -->
      <svg v-if="props.vote === 'not_fake'" class="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
      <svg v-else class="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
      </svg>
      {{ props.vote === 'not_fake' ? 'Not Fake' : 'Fake New' }}
    </div>
  </div>


    <!-- User Info Header -->
    <div class="flex items-start space-x-3 mb-4 pr-20">
      <!-- Avatar -->
      <div class="flex-shrink-0">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
          {{ props.name.charAt(0).toUpperCase() }}
        </div>
      </div>

      <!-- User Details -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center space-x-2 mb-1">
          <h4 class="font-semibold text-gray-900 truncate">{{ props.name }}</h4>
        </div>

        <!-- Timestamp with Fresh Styling -->
        <div class="flex items-center space-x-2 text-sm">
          <div class="flex items-center space-x-2 bg-green-50 rounded-full px-4 py-2 border-2 border-green-100">
            <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center border border-green-200">
              <div class="text-xs">🕐</div>
            </div>
            <span class="font-semibold text-green-800">
              {{ new Date(props.createdAt).toLocaleDateString('ENG', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) }}
            </span>
          </div>
        </div>
      </div>
    </div>


   <!-- Comment Content -->
      <!-- Fresh Green Comment Bubble -->
    <div v-if="props.comment" class="mb-6 relative z-10">
      <div class="relative">
        <!-- Green Speech Bubble Tail -->
        <div class="absolute -top-2 left-8 w-4 h-4 bg-gradient-to-br from-green-50 to-emerald-50 border-l-2 border-t-2 border-green-200 transform rotate-45"></div>

        <!-- Comment Content -->
        <div class="bg-gradient-to-br from-green-50/80 to-emerald-50/80 rounded-3xl p-6 border-2 border-green-200/60 shadow-inner relative backdrop-blur-sm">

          <p class="text-gray-800 leading-relaxed whitespace-pre-wrap font-medium relative z-10 pr-8">
            {{ props.comment }}
          </p>
        </div>
      </div>
    </div>



    <!-- Image Attachment -->
    <div v-if="props.imageUrl" class="mb-2">
      <div class="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-100 group/image">
        <img
          :src="props.imageUrl"
          class="w-full max-h-48 object-cover transition-transform duration-300 group-hover/image:scale-105"
          alt="User attachment"
        />
        <!-- Image Overlay -->

      </div>
    </div>

    <!-- Interaction Footer -->
    <div class="flex items-center justify-between pt-3 border-t border-gray-100">
      <div class="flex items-center space-x-4">
        <!-- Like Button -->
        <button class="flex items-center space-x-1.5 text-gray-500 hover:text-blue-600 transition-colors duration-200 group/like">
          <svg class="w-4 h-4 group-hover/like:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          <span class="text-xs font-medium">Helpful</span>
        </button>

        <!-- Reply Button -->
        <button class="flex items-center space-x-1.5 text-gray-500 hover:text-green-600 transition-colors duration-200 group/reply">
          <svg class="w-4 h-4 group-hover/reply:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
          </svg>
          <span class="text-xs font-medium">Reply</span>
        </button>
      </div>

      <!-- Share Button -->
      <button class="text-gray-400 hover:text-gray-600 transition-colors duration-200 group/share">
        <svg class="w-4 h-4 group-hover/share:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
        </svg>
      </button>
    </div>

    <!-- Subtle hover gradient overlay -->
    <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-50/0 via-purple-50/0 to-pink-50/0 group-hover:from-blue-50/30 group-hover:via-purple-50/20 group-hover:to-pink-50/30 transition-all duration-500 pointer-events-none"></div>
  </li>
</template>
