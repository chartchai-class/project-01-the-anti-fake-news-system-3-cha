export interface New {
  id: number;
  topic: string;
  shortDetail: string;
  fullDetail: string;
  reporter: string;
  status: string;
  date: string;
  imageLink: string;
  votesFake: number;
  votesNotFake: number;
}

export interface MessageState {
  messages: string
}

export interface EventState {
  event: Event | null
}