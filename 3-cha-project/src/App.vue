<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- Main container with responsive padding -->
  <div class="font-sans text-gray-700 antialiased p-4">
    <header class="mb-8 mt-12">
      <h1 class="text-4xl md:text-5xl font-bold font-sans text-[#19B917] text-center">Anti-Fake News System</h1>
    </header>

    <!-- This container is for the Home link and logo, using a flexbox for dynamic alignment -->
    <div class="flex justify-center">
      <div class="flex items-center text-black">
        <svg class="h-6 w-6 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <RouterLink class="font-bold text-[#19B917]" exact-active-class="text-[#19B917]" :to="{name: 'home-view'}">Home</RouterLink>
      </div>
    </div>
    
    <RouterView />
  </div>
</template>
