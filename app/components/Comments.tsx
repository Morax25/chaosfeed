"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import Comment from "./Comment";
import { useAppStore } from "@/store/useAppStore";

const Comments = ({ postId }: { postId: string }) => {
  const socket = useAppStore((s) => s.socket);
  const comments = useAppStore((s) => s.comments);
  const setComments = useAppStore((s) => s.setComments);
  const [text, setText] = useState("");
  const [sendPulse, setSendPulse] = useState(0);

  useEffect(() => {
    if (!socket || !postId) return;
    setComments([]);
    socket.emit("get_comments", { postId });
  }, [socket, postId]);

  const handleSend = () => {
    if (!text.trim() || !socket) return;
    socket.emit("add_comment", { postId, text: text.trim() });
    setText("");
    setSendPulse((p) => p + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  const postComments = comments.filter((c) => c.postId === postId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full relative flex flex-col w-full p-2"
    >
      <div className="flex-shrink-0 rounded-[10px] sticky-top flex gap-2.5 items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Inject oxygen (10s+)"
          className="flex-1 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:bg-slate-800/60 transition-all duration-300"
        />
        <motion.button
          key={sendPulse}
          onClick={handleSend}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 1 }}
          animate={{ scale: [1.22, 1] }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="bg-purple-600/90 cursor-pointer hover:bg-purple-600 text-white rounded-lg p-2 transition-colors duration-300 hover:shadow-lg hover:shadow-purple-600/20"
        >
          <Send size={18} strokeWidth={2.5} />
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 mt-4 relative">
        <div className="sticky top-0 h-8 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none z-10" />

        <AnimatePresence mode="wait">
          {postComments.length === 0 && (
            <motion.p
              key="empty"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-center text-gray-500 text-sm mt-10"
            >
              No comments yet. Be the first to inject chaos!
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {postComments.map((comment, i) => (
            <motion.div
              key={comment.id}
              layout="position"
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
                delay: Math.min(i * 0.03, 0.3),
              }}
            >
              <Comment
                username={comment.user.username}
                pfp={comment.user.pfp}
                text={comment.text}
                timestamp={comment.createdAt}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="sticky bottom-0 h-8 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-10" />
      </div>
    </motion.div>
  );
};

export default Comments;
