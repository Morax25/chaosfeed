"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useDrawer } from "@/store/drawerStore";

interface CreatePostProps {
  onPublish?: (content: string) => void;
}

const CreatePost = ({ onPublish }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const openDrawer = useDrawer((state) => state.openDrawer);
  const onClose = useDrawer((state) => state.closeDrawer);
  const handlePublish = async () => {
    if (!content.trim()) return;

    setIsPublishing(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    onPublish?.(content);

    setContent("");
    toast.success("Post published");
    setIsPublishing(false);
    onClose()
  };

  const isDisabled = !content.trim() || isPublishing;

  return (
    <Card className="w-full h-fit bg-black border border-white/10 rounded-[15px] overflow-hidden overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <CardContent className="p-0 flex flex-col">
        <div className="px-4 py-3 border-b border-white/15 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 border border-fuchsia-400/20 flex items-center justify-center shrink-0">
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-fuchsia-400 to-purple-500" />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">
              Create Feed
            </span>
            <span className="text-xs text-zinc-500">
              Share something with everyone
            </span>
          </div>
        </div>

        <div className="px-4 py-4 flex flex-col">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening right now?"
            maxLength={280}
            className="min-h-[110px] bg-transparent text-white placeholder:text-zinc-500 text-[15px] leading-relaxed resize-none outline-none"
          />

          <div className="mt-3 flex items-center justify-between">
            <span
              className={`text-xs transition-colors ${
                content.length > 240 ? "text-red-500" : "text-zinc-500"
              }`}
            >
              {content.length}/280
            </span>

            <span className="text-xs text-fuchsia-400/70 font-medium">
              Auto expires in 60s
            </span>
          </div>
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={handlePublish}
            disabled={isDisabled}
            className={`
      w-full h-12 rounded-xl
      flex items-center justify-center gap-2
      text-sm font-semibold tracking-wide
      border
      transition-colors duration-200
      ${
        isDisabled
          ? "bg-zinc-800 border-white/5 text-zinc-500 cursor-not-allowed"
          : `
            cursor-pointer
            bg-purple-600
            border-fuchsia-400/20
            text-white
            hover:brightness-110
            active:brightness-95
            shadow-[0_0_25px_rgba(192,38,211,0.25)]
          `
      }
    `}
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

        {!isDisabled && (
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-fuchsia-500/60 to-transparent" />
        )}
      </CardContent>
    </Card>
  );
};

export default CreatePost;
