<script setup lang="ts">
import { toRefs} from 'vue'
import { type New } from '@/types'

const props = defineProps<{
  news: New
}>()

const { news } = toRefs(props)
</script>

<template>
  <div class="m-[200px] mt-[50px]">
    <h1 class="text-[50px] font-bold text-left ">{{ news.topic }}</h1>
    <p class="text-left">Date: {{  news.date }} | Time: {{ news.time }} | STATUS: {{ news.status }}</p>
    <p class="text-left underline underline-offset-8 ">By {{ news.reporter }}</p>
    <div class=" text-center m-[100px]" >
        <img :src="news.imageLink" :alt="news.topic" class="w-[20] h-50px] rounded-md object-cover" />
    </div>
    <p>{{ news.fullDetail }}</p>


  </div>
</template>