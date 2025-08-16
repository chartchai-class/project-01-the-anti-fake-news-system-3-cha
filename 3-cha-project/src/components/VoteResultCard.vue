<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  votes: {
    type: Object,
    required: true
  }
})


const totalVotes = computed(() => props.votes.fake + props.votes.notFake)


const fakePercent = computed(() => {
  return totalVotes.value > 0 ? Math.round((props.votes.fake / totalVotes.value) * 100) : 0
})
const notFakePercent = computed(() => {
  return totalVotes.value > 0 ? Math.round((props.votes.notFake / totalVotes.value) * 100) : 0
})


const finalResult = computed(() => {
  if (props.votes.fake === props.votes.notFake) return 'Undecided'
  return props.votes.fake > props.votes.notFake ? 'Fake' : 'Not Fake'
})
</script>

<template>
  <div class="border p-4 rounded-lg shadow bg-white w-[800px]">

    <h2 class=" text-[40px] text-gray-400 font-bold mb-10 text-left ">
      Vote Result : <span :class="finalResult === 'Fake' ? 'text-red-600' : 'text-green-600'">
        {{ finalResult }} New
      </span>
    </h2>

    <!-- show the percentage of fake and not fake news -->
    <div class="flex justify-between mb-3">
      <span class="text-[25px] text-green-600 font-semibold">Not Fake New</span>
      <span class="text-[15px] font-semibold mt-2">{{ notFakePercent }}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-10 mb-10">
      <div class="bg-green-500 h-10 rounded-full text-xs text-right pr-2 text-white"
           :style="{ width: notFakePercent + '%' }">
      </div>
    </div>

    <div class="flex justify-between mb-3">
      <span class="text-[25px] text-red-600 font-semibold">Fake New</span>
      <span class="text-[15px] font-semibold mt-3">{{ fakePercent }}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-10 mb-3">
      <div class="bg-red-500 h-10 rounded-full text-xs text-right pr-2 text-white"
           :style="{ width: fakePercent + '%' }">
      </div>
    </div>

    <!-- show the total votes -->
    <p class="text-[20px] text-gray-500 mb-3 mt-6">voted : {{ totalVotes }} people</p>

  </div>
</template>