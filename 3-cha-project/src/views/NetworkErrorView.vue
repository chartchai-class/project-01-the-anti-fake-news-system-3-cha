<template>
  <main class="min-h-[60vh] grid place-items-center px-6 py-16 text-center">
    <div class="space-y-6 max-w-xl">
      <div class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
        <span class="inline-block h-2 w-2 rounded-full animate-pulse"></span>
        Network Error
      </div>

      <h1 class="text-2xl md:text-3xl font-semibold">
        Unable to connect to the server
      </h1>
      <p class="text-sm text-gray-500">
        We couldn’t fetch the data. Please check your internet connection or try again later.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-3">
        <button
          class="rounded-2xl px-4 py-2 shadow border hover:shadow-md transition"
          @click="retry"
          aria-label="Retry"
        >
          Retry
        </button>

        <RouterLink
          :to="from || '/'"
          class="rounded-2xl px-4 py-2 shadow border hover:shadow-md transition"
          aria-label="Go back to previous"
        >
          ← Previous Page
        </RouterLink>

        <RouterLink
          to="/"
          class="rounded-2xl px-4 py-2 shadow border hover:shadow-md transition"
          aria-label="Back to home"
        >
          Back to Home
        </RouterLink>
      </div>

      <p v-if="details" class="text-xs text-gray-400 break-words">
        Details: <code>{{ details }}</code>
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const from = (route.query.from as string) || '/'
const details = (route.query.message as string) || ''
function retry() {
  if (from && from !== route.fullPath) window.location.assign(from)
  else window.location.reload()
}
</script>
