<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message';
import { storeToRefs } from 'pinia'
import { SpeedInsights } from "@vercel/speed-insights/vue"
const messageStore = useMessageStore()
const { messages } = storeToRefs(messageStore)
</script>

<template>
  <SpeedInsights/>
  <Transition
  enter-active-class="animate-fadeInUp"
  leave-active-class="animate-fadeOutDown"
>
  <div v-if="messages"
    class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50
           bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0
           px-6 py-4 rounded-2xl shadow-2xl animate-slide-down
           flex items-center gap-4 max-w-[500px] w-full mx-4 backdrop-blur-sm">

    <!-- Success Icon with Animation -->
    <div class="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
      <svg width="18px" height="18px" viewBox="0 0 1024 1024" fill="currentColor">
        <path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"/>
      </svg>
    </div>

    <!-- Message Text -->
    <div class="flex-1 font-medium leading-relaxed">
      {{ messages }}
    </div>

    <!-- Enhanced Close Button -->
    <button @click="messageStore.resetMessages()"
      class="flex-shrink-0 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group">
      <svg class="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
</Transition>

  <!-- App Container -->
  <div>
    <!-- Header-->
    <header class="relative overflow-hidden bg-gradient-to-r from-[#19B917] via-green-600 to-emerald-600 shadow-2xl">

      <div class="container mx-auto px-4 py-12 relative">
        <div class="text-center">
          <!-- Title : Anti-Fake News -->
          <h1 class="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight animate-fade-in-up">
            <span class="inline-block hover:scale-105 transition-transform duration-300">
              Anti-Fake
            </span>
            <span class="inline-block bg-white text-[#19B917] px-4 py-2 rounded-2xl ml-2 hover:scale-105 transition-transform duration-300 shadow-xl">
              News
            </span>
          </h1>

          <!-- Subtitle -->
          <p class="text-xl md:text-2xl text-green-100 font-medium mb-8 animate-fade-in-up animation-delay-200">
            Website to help check fake news By Voting
          </p>

        </div>
      </div>

      <!-- logo -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg class="w-full h-6 md:h-12" viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1200,160,1248,128,1296,112L1344,96L1344,200L1296,200C1248,200,1152,200,1056,200C960,200,864,200,768,200C672,200,576,200,480,200C384,200,288,200,192,200C96,200,48,200,24,200L0,200Z"
            fill="rgb(249 250 251)"/>
        </svg>
      </div>
    </header>

    <!-- Home Button -->
    <nav class="bg-white shadow-lg border-b border-gray-100 sticky z-40 backdrop-blur-sm bg-white/95">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-center">
          <RouterLink
            :to="{name: 'home-view'}"
            exact-active-class="text-[#19B917] bg-green-50 scale-105"
            class="group flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-gray-700 hover:text-[#19B917] hover:bg-green-50 transition-all duration-300 hover:scale-105 transform hover:shadow-md"
          >
            <!-- Home Icon -->
            <div class="relative">
              <svg class="h-6 w-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <!-- Home Icon effect -->
              <div class="absolute inset-0 rounded-full bg-[#19B917] opacity-0 group-hover:opacity-20 scale-150 transition-opacity duration-300"></div>
            </div>

            <span class="text-lg">Home</span>

            <!-- Arrow indicator -->
            <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- show all news -->
    <main class="relative">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white mt-16">
      <div class="container mx-auto px-4 py-12">
        <div class="text-center">
          <!-- Logo -->
          <div class="w-16 h-16 bg-gradient-to-r from-[#19B917] to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <!-- Title and Description -->
          <h3 class="text-2xl font-bold mb-2">Anti-Fake News System</h3>
          <p class="text-gray-400 text-lg mb-6">Protecting information integrity with Community-powered fact-checking through voting</p>
          <div class="text-sm text-gray-500">
            © 2025 Anti-Fake News System. Built with Vue.js & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
