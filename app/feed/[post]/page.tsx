"use client"

import { useEffect, useState } from "react"
import Comments from "@/app/components/Comments"
import Posts from "@/app/components/Posts"
import { useAppStore } from "@/store/useAppStore"
import { useParams } from "next/navigation"

const Page = () => {
  const { post } = useParams<{ post: string }>()

  const socket = useAppStore((s) => s.socket)
  const feed = useAppStore((s) => s.feed)
  const setFeed = useAppStore((s) => s.setFeed)

  const [loading, setLoading] = useState(true)

  const safeFeed = Array.isArray(feed) ? feed.filter(Boolean) : []

  const currentPost = safeFeed.find((p) => p?.id === post)

  useEffect(() => {
    if (!post) return

    let mounted = true

    const fetchFromApi = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/feed/${post}`
        )

        const json = await res.json()

        if (!mounted) return

        const postData = json?.data

        if (postData) {
          setFeed([postData].filter(Boolean))
        }

        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }

    fetchFromApi()

    return () => {
      mounted = false
    }
  }, [post, setFeed])

  useEffect(() => {
    if (!socket) return

    const handlePostUpdate = (data: any) => {
      if (!data?.id) return

      setFeed([data].filter(Boolean))
      setLoading(false)
    }

    const handlePostDelete = (data: any) => {
      if (!data?.id) return
      setFeed([])
    }

    socket.on("post_updated", handlePostUpdate)
    socket.on("post_liked", handlePostUpdate)
    socket.on("post_created", handlePostUpdate)
    socket.on("post_deleted", handlePostDelete)

    return () => {
      socket.off("post_updated", handlePostUpdate)
      socket.off("post_liked", handlePostUpdate)
      socket.off("post_created", handlePostUpdate)
      socket.off("post_deleted", handlePostDelete)
    }
  }, [socket, setFeed])

  if (loading && !currentPost) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-400 gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-fuchsia-500 border-t-transparent" />
        Loading chaos...
      </div>
    )
  }

  if (!currentPost) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-zinc-400">
        Post not found
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row relative gap-5">
      <div className="w-full lg:w-1/2">
        <Posts
          id={currentPost.id}
          createdAt={currentPost.createdAt}
          title={currentPost.content}
          pfp={currentPost.user?.pfp}
          username={currentPost.user?.username}
          comments={currentPost.comments}
          likes={currentPost.likes}
        />
      </div>

      <div className="w-full h-130 md:h-200 lg:h-110 overflow-y-auto lg:w-1/2 md:pl-5">
        <Comments />
      </div>
    </div>
  )
}

export default Page