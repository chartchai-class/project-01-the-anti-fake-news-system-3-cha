<script setup lang="ts">
import { toRefs, computed } from 'vue'
import { type New } from '@/types'

const props = defineProps<{
  news: New
}>()

const { news } = toRefs(props)

// Status configuration for styling
const statusConfig = computed(() => {
  const isFakeNews = news.value.status.toLowerCase() === 'fake news'
  return {
    bgGradient: isFakeNews 
      ? 'from-red-50 to-red-100' 
      : 'from-green-50 to-green-100',
    textColor: isFakeNews ? 'text-red-700' : 'text-green-700',
    borderColor: isFakeNews ? 'border-red-200' : 'border-green-200',
    icon: isFakeNews ? '⚠️' : '✅',
    badgeGradient: isFakeNews 
      ? 'from-red-500 to-red-600' 
      : 'from-green-500 to-green-600'
  }
})
</script>

<template>
  <article class="max-w-none space-y-8 animate-[fade-in-up_0.6s_ease-out_forwards] opacity-0">
    <div class="text-center space-y-4">
      <!-- Status Badge -->
      <div class="flex justify-center">
        <span :class="[
          'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-lg',
          `bg-gradient-to-r ${statusConfig.badgeGradient} text-white`
        ]">
          <span class="text-base">{{ statusConfig.icon }}</span>
          {{ news.status }}
        </span>
      </div>
      
      <!-- Title -->
      <h1 class="text-[50px] md:text-[70px] font-bold text-left text-gray-900 leading-tight">
        {{ news.topic }}
      </h1>
      
      <!-- Reporter Info -->
      <div class="flex flex-wrap justify-start items-center gap-4 text-sm text-gray-600">
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
          </svg>
          <span>{{ news.date }}</span>
        </div>
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
          </svg>
          <span>{{ news.time }}</span>
        </div>
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
          </svg>
          <span class="font-medium">{{ news.reporter }}</span>
        </div>
      </div>
    </div>
    
    <!-- Verification Status -->
    <header class="text-center space-y-6 mb-12">
      <div :class="[
        'mx-auto p-6 rounded-2xl border-2 shadow-lg mt-10',
        `bg-gradient-to-r ${statusConfig.bgGradient}`,
        statusConfig.borderColor
      ]">
        <div class="flex items-center justify-center gap-4">
          <div :class="[
            'w-[60px] h-[60px] rounded-full flex items-center justify-center text-4xl shadow-lg',
            `bg-gradient-to-r ${statusConfig.badgeGradient} text-white`
          ]">
            {{ statusConfig.icon }}
          </div>
          <div class="text-center">
            <h3 :class="['text-[22px] font-bold', statusConfig.textColor]">
              Verification Status: {{ news.status }}
            </h3>
            <p :class="['text-[15px] opacity-80', statusConfig.textColor]">
              {{ news.status.toLowerCase() === 'fake news' 
                ? 'This content has been flagged as potentially misleading' 
                : 'This content has been verified as authentic' }}
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- image news -->
    <section class="mb-12">
      <div class="relative group">
        <div class="overflow-hidden rounded-3xl shadow-2xl bg-gray-100">
          <img 
            :src="news.imageLink" 
            :alt="news.topic" 
            class="w-full h-[70vh] object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p class="text-sm font-medium">{{ news.topic }}</p>
            <p class="text-xs opacity-80 mt-1">Photo related to the article content</p>
          </div>
        </div>
      </div>
    </section>
    <!-- full details -->
    <section class="max-w-none">
      <div class="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100">
        <div class="space-y-6">
          <div class="text-gray-800 text-lg leading-loose space-y-6 text-justify">
            <template v-for="(paragraph, index) in news.fullDetail.split('\n\n')" :key="index">
              <p v-if="paragraph.trim()">
                {{ paragraph.trim() }}
              </p>
            </template>
          </div>
        </div>

        <!-- Footer full detail -->
        <footer class="mt-12 pt-8 border-t-2 border-gray-100">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-r from-[#19B917] to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {{ news.reporter.charAt(0).toUpperCase() }}
              </div>
              <div>
                <h5 class="font-bold text-gray-900">{{ news.reporter }}</h5>
                <p class="text-sm text-gray-600">News Reporter</p>
              </div>
            </div>
            <div class="text-right text-sm text-gray-600 space-y-1">
              <div class="flex items-center gap-2 justify-end">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
                <span>Published: {{ news.date }}</span>
              </div>
              <div class="flex items-center gap-2 justify-end">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
                <span>Time: {{ news.time }}</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>

    <section class="mt-12">
      <div class="bg-gradient-to-r from-gray-50 to-white rounded-3xl shadow-lg p-8 border border-gray-100">
        <h4 class="text-2xl font-bold text-gray-900 mb-6 text-center">What do you think?</h4>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <!-- Vote -->
          <RouterLink 
            :to="{ name: 'news-vote-view', params: { id: news.id } }"
            class="flex-1 max-w-xs bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-center flex items-center justify-center gap-3"
          >
          <svg height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 473.931 473.931" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle style="fill:#ffd500;" cx="236.966" cy="236.966" r="236.966"></circle> 
            <path style="fill:#AFAFAF;" d="M411.691,277.306v-17.878h-5.759c-20.265-38.585-88.223-66.963-168.985-66.963 c-80.755,0-148.713,28.378-168.978,66.963h-6.196v26.305h0.116c2.398,49.133,79.827,88.582,175.058,88.582 c96.743,0,175.174-40.707,175.174-90.921C412.121,281.343,411.949,279.319,411.691,277.306z"></path> 
            <path style="fill:#99999A;" d="M236.947,192.465c-80.755,0-148.713,28.378-168.978,66.963h-6.196v26.305h0.116 c2.398,49.133,79.827,88.582,175.058,88.582V192.465z"></path> <ellipse style="fill:#C1C1C1;" cx="236.966" cy="263.195" rx="175.174" ry="90.925"></ellipse> 
            <path style="fill:#AFAFAF;" d="M61.773,263.18c0-50.214,78.431-90.925,175.174-90.925v181.85 C140.204,354.105,61.773,313.399,61.773,263.18z"></path> <ellipse style="fill:#EB5453;" cx="236.966" cy="242.316" rx="122.127" ry="63.389"></ellipse>
            <path style="fill:#DA494A;" d="M114.82,242.316c0-13.126,0-72.766,0-72.766s79.973,9.377,122.127,9.377 c40.508,0,122.127-9.377,122.127-9.377s0,58.787,0,72.766c0,35.012-54.678,63.389-122.127,63.389S114.82,277.328,114.82,242.316z"></path> <path style="fill:#D04646;" d="M114.82,242.316c0-13.126,0-72.766,0-72.766s79.973,9.377,122.127,9.377v126.782 C169.502,305.706,114.82,277.328,114.82,242.316z"></path> <ellipse style="fill:#EB5453;" cx="236.966" cy="169.539" rx="122.127" ry="63.389"></ellipse> 
            <path style="fill:#E95E5D;" d="M114.82,169.547h244.251c0,35.012-54.678,63.389-122.127,63.389S114.82,204.562,114.82,169.547z"></path> <path style="fill:#DC494A;" d="M114.82,169.547c0-35.004,54.678-63.389,122.127-63.389V232.94 C169.502,232.94,114.82,204.562,114.82,169.547z"></path> 
            <path style="fill:#D64747;" d="M114.82,169.547c0,0,54.678,0.891,122.127,0.891v62.499 C169.502,232.94,114.82,204.562,114.82,169.547z"></path> <g> 
            <path style="fill:#F6EBD3;" d="M154.321,155.62l10.933,16.752l10.971-16.872c0.569-0.887,1.003-1.5,1.287-1.845 c0.277-0.352,0.752-0.666,1.411-0.943c0.666-0.277,1.557-0.415,2.705-0.415c0.834,0,1.609,0.109,2.324,0.322 c0.707,0.221,1.265,0.505,1.673,0.861c0.408,0.355,0.614,0.718,0.614,1.081c0,0.251-0.067,0.524-0.198,0.812 c-0.138,0.292-0.299,0.572-0.498,0.853c-0.198,0.281-0.393,0.565-0.591,0.857l-11.693,16.325c-0.415,0.629-0.834,1.22-1.25,1.785 c-0.415,0.565-0.898,1.055-1.448,1.482c-0.546,0.427-1.28,0.778-2.193,1.048c-0.906,0.273-2.024,0.408-3.341,0.408 c-1.325,0-2.432-0.131-3.349-0.4c-0.906-0.266-1.643-0.617-2.208-1.055c-0.554-0.434-1.044-0.932-1.463-1.489 c-0.419-0.558-0.834-1.145-1.25-1.774l-11.495-16.187c-0.198-0.296-0.4-0.584-0.614-0.868c-0.206-0.284-0.382-0.591-0.52-0.92 c-0.146-0.329-0.221-0.606-0.221-0.834c0-0.58,0.453-1.111,1.351-1.587s2.032-0.715,3.39-0.715c1.665,0,2.851,0.262,3.543,0.797 C152.888,153.618,153.599,154.456,154.321,155.62z"></path> 
            <path style="fill:#F6EBD3;" d="M212.244,152.293c5.006,0,9.302,0.528,12.89,1.575c3.588,1.051,6.309,2.548,8.15,4.483 c1.848,1.938,2.769,4.209,2.769,6.825c0,1.931-0.505,3.682-1.512,5.261c-1.014,1.583-2.529,2.952-4.554,4.108 c-2.017,1.164-4.494,2.047-7.431,2.66c-2.945,0.614-6.316,0.92-10.114,0.92c-3.779,0-7.154-0.314-10.144-0.943 c-2.99-0.636-5.474-1.519-7.476-2.668c-1.994-1.149-3.51-2.529-4.524-4.142c-1.021-1.613-1.534-3.353-1.534-5.231 c0-1.92,0.535-3.674,1.601-5.283c1.066-1.601,2.601-2.96,4.617-4.086c2.024-1.126,4.486-1.987,7.382-2.586 C205.265,152.593,208.554,152.293,212.244,152.293z M226.145,165.143c0-1.826-0.576-3.412-1.717-4.752 c-1.141-1.343-2.769-2.357-4.89-3.046c-2.118-0.685-4.546-1.025-7.293-1.025c-1.949,0-3.764,0.191-5.422,0.569 c-1.65,0.385-3.076,0.935-4.277,1.661c-1.197,0.722-2.14,1.65-2.829,2.784c-0.696,1.13-1.036,2.402-1.036,3.809 c0,1.422,0.344,2.705,1.036,3.85c0.688,1.149,1.665,2.103,2.922,2.859c1.265,0.752,2.72,1.325,4.348,1.695 c1.639,0.374,3.435,0.561,5.384,0.561c2.507,0,4.801-0.322,6.9-0.973s3.772-1.646,5.006-3.001 C225.523,168.783,226.145,167.122,226.145,165.143z"></path> 
            <path style="fill:#F6EBD3;" d="M271.513,156.896h-10.671v18.148c0,1.044-0.453,1.818-1.351,2.324 c-0.898,0.509-2.062,0.76-3.487,0.76c-1.456,0-2.638-0.254-3.543-0.767c-0.913-0.513-1.366-1.283-1.366-2.316v-18.148h-10.671 c-1.665,0-2.907-0.195-3.719-0.572c-0.812-0.378-1.22-0.883-1.22-1.508c0-0.644,0.423-1.156,1.272-1.534 c0.842-0.374,2.069-0.561,3.667-0.561h31.09c1.688,0,2.945,0.198,3.772,0.58c0.819,0.389,1.235,0.894,1.235,1.515 c0,0.625-0.415,1.13-1.257,1.508C274.439,156.705,273.182,156.896,271.513,156.896z"></path> <path style="fill:#F6EBD3;" d="M312.441,156.619h-22.028v6.14h20.288c1.489,0,2.608,0.176,3.341,0.52 c0.737,0.344,1.104,0.804,1.104,1.369c0,0.565-0.359,1.029-1.089,1.392c-0.715,0.359-1.841,0.535-3.353,0.535h-20.288v7.106h22.787 c1.534,0,2.698,0.187,3.48,0.55c0.775,0.374,1.164,0.861,1.164,1.478c0,0.591-0.389,1.066-1.164,1.441 c-0.782,0.367-1.946,0.554-3.48,0.554H286.63c-2.133,0-3.663-0.247-4.599-0.733c-0.935-0.486-1.396-1.28-1.396-2.369v-18.78 c0-0.73,0.206-1.325,0.621-1.785s1.066-0.797,1.957-1.007c0.891-0.21,2.024-0.318,3.412-0.318h25.811 c1.564,0,2.728,0.183,3.48,0.539c0.76,0.363,1.134,0.831,1.134,1.407c0,0.591-0.374,1.066-1.134,1.426 C315.165,156.443,314.005,156.619,312.441,156.619z"></path> </g> </g>
          </svg>
            Vote on this News
          </RouterLink>
          <!-- Comments -->
          <RouterLink 
            :to="{ name: 'news-comment-list-view', params: { id: news.id } }"
            class="flex-1 max-w-xs bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-center flex items-center justify-center gap-3"
          >
          <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"> 
            <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/> 
          </svg>
            View Comments
          </RouterLink>
        </div>
      </div>
    </section>
  </article>
</template>
