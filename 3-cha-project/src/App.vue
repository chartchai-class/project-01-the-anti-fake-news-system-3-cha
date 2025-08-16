<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialiased">
    <header>
      <div class="px-8 py-4 text-left">
        <div class="flex items-center text-black">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7-7-7m9 4v7a1 1 0 01-1 1h-3" />
          </svg>
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{name: 'home-view'}">Home</RouterLink>
        </div>
      </div>
    </header>
    <h1 class="text-2xl md:text-3xl font-bold font-sans text-[#19B917] mb-8">Anti-Fake News</h1>
    <RouterView />
  </div>
</template>