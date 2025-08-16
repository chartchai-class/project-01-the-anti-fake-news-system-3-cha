<script setup lang="ts">
import { useNewsStore} from '@/stores/new'
import { storeToRefs } from 'pinia'

const store = useNewsStore()
const { news } = storeToRefs(store)

</script>

<template>
    <div v-if="news">
        <nav>
            <RouterLink :to="{ name: 'news-detail-view' }">Details</RouterLink> 
            |
            <RouterLink :to="{ name: 'news-vote-view' }">Vote</RouterLink>
        </nav>
        <RouterView v-if="news" :news="news" />
    </div>
</template>