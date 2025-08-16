<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialias">
    <header>
      <h1>Anti-Fake News</h1>
      <div class="wrapper">
        <nav class="py-6 p-[80px]">
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{name: 'home-view'}">Home</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>