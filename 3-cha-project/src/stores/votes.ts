import { defineStore } from "pinia"
type Choice = "not_fake" | "fake"
export interface VoteItem {
  newsId: string; name: string; choice: Choice;
  comment?: string; imageUrl?: string; createdAt: string;
}
export interface VoteSummary { notFake: number; fake: number; comments: VoteItem[] }

export const useVotesStore = defineStore("votes", {
  state: () => ({ byId: {} as Record<string, VoteSummary> }),
  getters: {
    summary: (s) => (id: string): VoteSummary =>
      s.byId[id] ?? { notFake: 0, fake: 0, comments: [] },
  },
  actions: {
    castVote(v: VoteItem) {
      const cur = this.byId[v.newsId] ?? { notFake: 0, fake: 0, comments: [] }
      v.choice === "not_fake" ? cur.notFake++ : cur.fake++
      cur.comments.unshift(v)
      this.byId[v.newsId] = cur
    },
  },
})
