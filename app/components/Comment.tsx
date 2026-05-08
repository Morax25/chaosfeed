"use client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageCircle } from 'lucide-react';
import React, { useState } from 'react'

const Comment = ({ username = "Username", pfp = "https://github.com/shadcn.png", text = "Comment content goes here", timestamp = "2 hours ago" }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(5);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex items-start gap-3 w-full">
      <div className="flex-shrink-0">
        <Avatar className="h-10 w-10">
          <AvatarImage src={pfp} alt="user"/>
          <AvatarFallback>N/A</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm text-white">{username}</p>
          <span className="text-xs text-gray-500">{timestamp}</span>
        </div>

        <div className="bg-gray-900/60 rounded-[10px] p-3 text-white text-sm leading-relaxed border border-white/10 shadow-md">
          {text}
        </div>

        <div className="flex justify-start items-center font-bold text-sm gap-4">
          <button
            onClick={handleLike}
            className={`flex hover:text-pink-600 hover:scale-120 transition cursor-pointer items-center justify-center gap-1 ${
              isLiked ? "text-pink-600" : ""
            }`}
          >
            <Heart size={20} strokeWidth={3} fill={isLiked ? "currentColor" : "none"} />
            <p>{likeCount}</p>
          </button>

          <button className="flex items-center hover:text-pink-600 transition hover:scale-115 cursor-pointer justify-center gap-1">
            <MessageCircle strokeWidth={3} size={18} />
            <p>2</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Comment
