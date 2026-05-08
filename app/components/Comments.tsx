import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import React from "react";
import Comment from "./Comment";

const Comments = () => {
  return (
    <div className="h-full relative flex flex-col w-full p-2">
      <div className="flex-shrink-0 rounded-[10px] sticky-top flex gap-2.5 items-center">
        <input
          type="text"
          placeholder="Inject oxygen (10s+)"
          className="flex-1 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:bg-slate-800/60 transition-all duration-300"
        />
        <button className="bg-purple-600/90 cursor-pointer hover:bg-purple-600 text-white rounded-lg p-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/20 active:scale-95">
          <Send size={18} strokeWidth={2.5} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 mt-4 relative">
        <div className="sticky top-0 h-8 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none z-10" />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <div className="sticky bottom-0 h-8 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
};

export default Comments;
