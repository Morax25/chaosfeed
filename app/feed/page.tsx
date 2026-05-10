"use client"

import { useEffect, useState } from "react"
import Posts from "../components/Posts"
import { useAppStore } from "@/store/useAppStore"
import { fetchPosts } from "../../actions/posts"

const Page = () => {
  const feed = useAppStore((s) => s.feed)
  const setFeed = useAppStore((s) => s.setFeed)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const load = async () => {
      try {
        setLoading(true)
        const posts = await fetchPosts()

        if (mounted) {
          setFeed(posts || [])
        }
      } catch (err) {
        console.error("Failed to load feed:", err)
        if (mounted) setFeed([])
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [setFeed])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 rounded-full border-2 border-fuchsia-500/30 border-t-fuchsia-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="pt-2 px-2 sm:px-4 flex flex-col gap-5">
      {feed.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-fuchsia-600/20 rounded-full" />
            <div className="relative px-6 py-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_40px_rgba(192,38,211,0.15)]">
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                Be the first to start chaos
              </h2>
              <p className="text-sm text-zinc-400 mt-2">
                No posts yet. Drop something and ignite the feed.
              </p>
              <div className="mt-4 flex justify-center">
                <span className="px-3 py-1 text-xs rounded-full bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20">
                  realtime • ephemeral • raw
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        feed.map((item) => (
          <Posts
            id={item.id}
            key={item.id}
            title={item.content}
            username={item.user?.username}
            pfp={item.user?.pfp}
            createdAt={item.createdAt}
          />
        ))
      )}
    </div>
  )
}

export default Page