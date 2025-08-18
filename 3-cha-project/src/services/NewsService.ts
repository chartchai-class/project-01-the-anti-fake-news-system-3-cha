import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://db-news-theta.vercel.app/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getNews(perPage: number, page: number) {
    return apiClient.get(`/api/news?_limit=${perPage}&_page=${page}`);
  },
  getNew(id: number) {
    return apiClient.get(`/api/news/${id}`);
  },
};
