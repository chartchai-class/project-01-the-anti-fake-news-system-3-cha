import { defineStore } from "pinia"
import { useNewsStore } from "@/stores/new"

type VoteChoice = "not_fake" | "fake"

export interface VoteItem {
  newsId: string;
  name: string;
  vote: VoteChoice;
  comment?: string;
  imageUrl?: string;
  createdAt: string;
}

export interface VoteSummary {
  notFake: number;
  fake: number;
  comments: VoteItem[];
}

export const useVotesStore = defineStore("votes", {
  state: () => ({ byId: {} as Record<string, VoteSummary> }),
    getters: {
    summary: (s) => (id: string): VoteSummary => {

      const newsStore = useNewsStore()
      const news = newsStore.news?.id === Number(id) ? newsStore.news : null

      const baseNotFake = news?.votesNotFake ?? 0
      const baseFake = news?.votesFake ?? 0
      const baseComments = (news?.comments ?? []).map(c => ({
        newsId: String(news?.id),
        name: c.user,
        vote: c.vote.toLowerCase() === "not fake" ? "not_fake" : "fake",
        comment: c.comment,
        imageUrl: c.imageUrl,
        createdAt: c.createdAt
      } as VoteItem))

      const extra = s.byId[id] ?? { notFake: 0, fake: 0, comments: [] }

      return {
        notFake: baseNotFake + extra.notFake,
        fake: baseFake + extra.fake,
        comments: [...baseComments, ...extra.comments].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      }

    }
  },
  actions: {
    castVote(v: VoteItem) {
      const cur = this.byId[v.newsId] ?? { notFake: 0, fake: 0, comments: [] }

      if (v.vote === "not_fake") {
        cur.notFake++
      } else {
        cur.fake++
      }

      cur.comments.unshift(v)
      this.byId[v.newsId] = cur
    },
  },
})
