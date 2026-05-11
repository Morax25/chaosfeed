"use client";

import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import Comment from "./Comment";
import { useAppStore } from "@/store/useAppStore";

const Comments = ({ postId }: { postId: string }) => {
  const socket = useAppStore((s) => s.socket);
  const comments = useAppStore((s) => s.comments);
  const setComments = useAppStore((s) => s.setComments);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!socket || !postId) return;
    setComments([]);
    socket.emit("get_comments", { postId });
  }, [socket, postId]);

  const handleSend = () => {
    if (!text.trim() || !socket) return;
    socket.emit("add_comment", { postId, text: text.trim() });
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  const postComments = comments.filter((c) => c.postId === postId);

  return (
    <div className="h-full relative flex flex-col w-full p-2">
      <div className="flex-shrink-0 rounded-[10px] sticky-top flex gap-2.5 items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Inject oxygen (10s+)"
          className="flex-1 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:bg-slate-800/60 transition-all duration-300"
        />
        <button
          onClick={handleSend}
          className="bg-purple-600/90 cursor-pointer hover:bg-purple-600 text-white rounded-lg p-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/20 active:scale-95"
        >
          <Send size={18} strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 mt-4 relative">
        <div className="sticky top-0 h-8 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none z-10" />

        {postComments.length === 0 && (
          <p className="text-center text-gray-500 text-sm mt-10">
            No comments yet. Be the first to inject chaos!
          </p>
        )}

        {postComments.map((comment) => (
          <Comment
            key={comment.id}
            username={comment.user.username}
            pfp={comment.user.pfp}
            text={comment.text}
            timestamp={comment.createdAt}
          />
        ))}

        <div className="sticky bottom-0 h-8 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
};

export default Comments;