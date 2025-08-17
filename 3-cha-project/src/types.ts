export interface New {
  id: number;
  topic: string;
  shortDetail: string;
  fullDetail: string;
  reporter: string;
  status: string;
  date: string;
  time: string;
  imageLink: string;
  votesFake: number;
  votesNotFake: number;
  comments: Comment[];
}

export interface Comment {
  id: number;
  user: string;
  vote: string;
  comment: string;
  imageUrl: string;
  createdAt: string;
}


export interface MessageState {
  messages: string
}

export interface EventState {
  event: Event | null
}
