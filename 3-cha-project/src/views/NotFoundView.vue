<template>
  <main class="min-h-[60vh] grid place-items-center px-6 py-16 text-center">
    <div class="space-y-6">
      <p class="text-7xl font-extrabold tracking-tight">404</p>
      <h1 class="text-2xl md:text-3xl font-semibold">Page Not Found</h1>
      <p class="text-sm text-gray-500">
        The page you are looking for doesn’t exist or the URL might be wrong.
      </p>

      <div class="flex items-center justify-center gap-3">
        <RouterLink
          to="/"
          class="rounded-2xl px-4 py-2 shadow border hover:shadow-md transition"
          aria-label="Back to home"
        >
          ← Back to Home
        </RouterLink>

        <button
          class="rounded-2xl px-4 py-2 shadow border hover:shadow-md transition"
          @click="goBack"
          aria-label="Go back"
        >
          Go Back
        </button>
      </div>
      <p class="text-xs text-gray-400">Request URL: <code>{{ $route.fullPath }}</code></p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push({ path: '/' })
}
</script>
