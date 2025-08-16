export interface NewsItem {
  id: number;
  topic: string;
  shortDetail: string;
  fullDetail: string;
  status: string;
  reporter: string;
  date: string;
  time: string;
  imageLink: string;
}

export interface MessageState {
  messages: string
}

export interface EventState {
  event: Event | null
}