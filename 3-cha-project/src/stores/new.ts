import { defineStore } from 'pinia';
import type { New } from '@/types';

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: null as New | null
  }),
  actions: {
    setNews(news: New) {
      this.news = news;
    }
  }
});