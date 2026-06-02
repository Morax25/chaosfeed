"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { Socket } from "socket.io-client"
import { fetchPosts } from "@/actions/posts"

type User = {
  userId: string
  username: string
  pfp: string
}

type Post = {
  id: string
  content: string
  likes: number
  likedByMe?: boolean
  user: User
  comments: number
  createdAt?: number
}

type Comment = {
  id: string
  postId: string
  text: string
  createdAt: number
  user: User
}

type State = {
  socket: Socket | null
  user: User | null
  userCount: number
  feed: Post[]
  comments: Comment[]

  // actions
  fetchFeed: () => Promise<void>

  setSocket: (s: Socket) => void
  setUser: (u: User) => void
  setUserCount: (count: number) => void
  setFeed: (f: Post[]) => void
  setComments: (c: Comment[]) => void

  addPost: (p: Post) => void
  upsertPost: (p: Post) => void
  addComment: (c: Comment) => void

  updatePostCommentCount: (postId: string, count: number) => void
  updatePostLikes: (postId: string, likes: number, likedByMe: boolean) => void
}

export const useAppStore = create<State>()(
  persist(
    (set, get) => ({
      socket: null,
      user: null,
      userCount: 0,
      feed: [],
      comments: [],

      // -------------------------
      // SOCKET / USER
      // -------------------------
      setSocket: (s) => set({ socket: s }),
      setUser: (u) => set({ user: u }),
      setUserCount: (count) => set({ userCount: count }),
      setFeed: (f) => set({ feed: f }),
      setComments: (c) => set({ comments: c }),

      // -------------------------
      // FEED FETCH (NEW FIX)
      // -------------------------
      fetchFeed: async () => {
        try {
          const data = await fetchPosts() // change if needed

          set({
            feed: data?.posts || [],
          })
        } catch (err) {
          console.error("fetchFeed failed:", err)
        }
      },

      // -------------------------
      // POSTS
      // -------------------------
      addPost: (p) => {
        const state = get()
        const exists = state.feed.some((x) => x.id === p.id)
        if (exists) return

        set({ feed: [p, ...state.feed] })
      },

      upsertPost: (p) =>
        set((state) => {
          const index = state.feed.findIndex((x) => x.id === p.id)

          if (index !== -1) {
            const updated = [...state.feed]
            updated[index] = p
            return { feed: updated }
          }

          return { feed: [p, ...state.feed] }
        }),

      // -------------------------
      // COMMENTS
      // -------------------------
      addComment: (c) =>
        set((state) => ({
          comments: [c, ...state.comments],
        })),

      // -------------------------
      // UPDATES
      // -------------------------
      updatePostCommentCount: (postId, count) =>
        set((state) => ({
          feed: state.feed.map((p) =>
            p.id === postId ? { ...p, comments: count } : p
          ),
        })),

      updatePostLikes: (postId, likes, likedByMe) =>
        set((state) => ({
          feed: state.feed.map((p) =>
            p.id === postId ? { ...p, likes, likedByMe } : p
          ),
        })),
    }),
    {
      name: "chaos-user",
      storage: createJSONStorage(() => localStorage),

      // only persist user
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
)
