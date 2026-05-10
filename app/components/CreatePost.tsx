"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { useDrawer } from "@/store/drawerStore"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppStore } from "@/store/useAppStore"

const CreatePost = () => {
  const [content, setContent] = useState("")
  const [isPublishing, setIsPublishing] = useState(false)

  const user = useAppStore((s) => s.user)
  const socket = useAppStore((s) => s.socket)
  const addPost = useAppStore((s) => s.addPost)
  const onClose = useDrawer((s) => s.closeDrawer)

const handlePublish = () => {
  if (!content.trim() || !socket) return

  socket.emit("create_post", {
    content: content.trim(),
  })

  setContent("")
  toast.success("Publishing...")
  onClose()
}
  const isDisabled = !content.trim() || isPublishing

  return (
    <Card className="w-full h-fit bg-black border border-white/10 rounded-[15px] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <CardContent className="p-0 flex flex-col">

        <div className="px-4 py-3 border-b border-white/15 flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user?.pfp} />
            <AvatarFallback>
              {user?.username?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">
              {user?.username}
            </span>
            <span className="text-xs text-zinc-500">
              Share something with everyone
            </span>
          </div>
        </div>

        <div className="px-4 py-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening right now?"
            maxLength={280}
            className="min-h-[110px] bg-transparent text-white placeholder:text-zinc-500 text-[15px] resize-none outline-none w-full"
          />
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={handlePublish}
            disabled={isDisabled}
            className="w-full h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold bg-purple-600 text-white disabled:opacity-40"
          >
            {isPublishing ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                Publish Feed
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>

      </CardContent>
    </Card>
  )
}

export default CreatePost