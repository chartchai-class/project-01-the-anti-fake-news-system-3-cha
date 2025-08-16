import { defineStore } from 'pinia';
import type { NewsItem } from '@/types';

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: null as NewsItem | null
  }),
  actions: {
    setNews(news: NewsItem) {
      this.news = news;
    }
  }
});