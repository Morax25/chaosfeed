"use client"

import { useEffect } from "react"
import Comments from "@/app/components/Comments"
import Posts from "@/app/components/Posts"
import { useAppStore } from "@/store/useAppStore"
import { useParams } from "next/navigation"

const Page = () => {
  const { post } = useParams<{ post: string }>()

  const feed = useAppStore((s) => s.feed)
  const socket = useAppStore((s) => s.socket)
  const setFeed = useAppStore((s) => s.setFeed)

  const currentPost = feed.find((p) => p.id === post)

  useEffect(() => {
    if (!socket) return

    socket.emit("get_post", { postId: post })

    socket.on("post_data", (data: any) => {
      setFeed([data])
    })

    return () => {
      socket.off("post_data")
    }
  }, [socket, post, setFeed])

  if (!currentPost) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-zinc-400">
        Loading chaos...
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row relative gap-5">
      <div className="w-full lg:w-1/2">
        <Posts
          id={currentPost.id}
          createdAt={currentPost.createdAt ?? Date.now()}
          title={currentPost.content}
          pfp={currentPost.user.pfp}
          username={currentPost.user.username}
        />
      </div>

      <div className="w-full h-130 md:h-200 lg:h-110 overflow-y-auto lg:w-1/2 md:pl-5">
        <Comments />
      </div>
    </div>
  )
}

export default Page