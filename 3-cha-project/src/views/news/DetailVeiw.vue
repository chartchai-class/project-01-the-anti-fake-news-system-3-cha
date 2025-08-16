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
    <p class="text-left mt-[-15px]">Date: {{  news.date }} | Time: {{ news.time }} | STATUS: {{ news.status }}</p>
    <p class="text-left underline underline-offset-8 ">By {{ news.reporter }}</p>
    <div class=" text-center m-[100px] mt-[50px] mb-[50px]" >
        <img :src="news.imageLink" :alt="news.topic" class="w-[1000px] h-[700px] text-center rounded-md object-cover" />
    </div>
    <p class="text-[18px] text-justify">{{ news.fullDetail }}</p>


  </div>
</template>