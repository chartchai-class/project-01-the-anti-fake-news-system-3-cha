<script setup lang="ts">
interface Props {
  name: string
  vote: "fake" | "not_fake"
  createdAt: string
  comment?: string | null
  imageUrl?: string
}

const props = defineProps<Props>()
</script>

<template>
  <li class="rounded border p-4">
    <div class="mb-1 text-sm text-gray-500">
      <span class="font-medium">{{ props.name }}</span> •
      <span>{{ props.vote === 'not_fake' ? 'Not Fake News' : 'Fake News' }}</span> •
      <span>{{ new Date(props.createdAt).toLocaleString() }}</span>
    </div>
    <p class="mb-2 whitespace-pre-wrap">{{ props.comment }}</p>
    <img
      v-if="props.imageUrl"
      :src="props.imageUrl"
      class="max-h-40 rounded"
      alt="attachment"
    />
  </li>
</template>
