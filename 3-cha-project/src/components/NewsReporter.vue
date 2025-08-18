<template>
  <div class="flex items-center text-xs text-gray-500">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
    <span class="mr-1">By</span>
    <span class="mr-2 font-medium">{{ reporter }}</span>
    <span class="mr-2">{{ date }}</span>
    <span>|</span>
    <span class="ml-2">{{ time }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  reporter: string;
  date: string;
  time: string;
}>();
</script>