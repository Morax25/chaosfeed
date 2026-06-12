"use client";

import { useEffect, useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Clock,
  Heart,
  MessageCircle,
  TrendingUp,
  MoreHorizontal,
  Flag,
  Loader2,
  CheckCircle2,
  SkullIcon,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { reportPost } from "@/actions/posts";
import { toast } from "sonner";

const Posts = ({
  title,
  pfp,
  username,
  id,
  createdAt,
  expiresAt,
  comments,
  likes,
  likedByMe = false,
}: {
  title: string;
  pfp: string;
  username: string;
  id: string;
  createdAt: any;
  expiresAt?: number;
  comments: number;
  likes: number;
  likedByMe?: boolean;
}) => {
  const router = useRouter();
  const socket = useAppStore((s) => s.socket);
  const user = useAppStore((s) => s.user);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [extended, setExtended] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [skullActive, setSkullActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const prevExpiresAt = useRef<number | undefined>(expiresAt);

  useEffect(() => {
    if (!id || !expiresAt) return;
    if (prevExpiresAt.current && expiresAt > prevExpiresAt.current) {
      setExtended(true);
      setTimeout(() => setExtended(false), 500);
    }
    prevExpiresAt.current = expiresAt;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        socket?.emit("post_expired", { postId: id });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [id, expiresAt, socket]);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLike = () => {
    socket?.emit("like_post", { postId: id });
  };
  const handleSkull = () => {
    setSkullActive(true);
    setTimeout(() => setSkullActive(false), 600);
  };
  const handleReport = async () => {
    setReporting(true);
    setMenuOpen(false);
    if (!user?.userId) return console.error("User not found");
    try {
      const res = await reportPost(user?.userId, id, title);
      toast.success(res.message, {
        icon: <CheckCircle2 size={15} className="text-green-400" />,
        className: "bg-gray-900 border border-white/10 text-white text-sm",
      });
    } catch {
      toast.error("Something went wrong. Please try again.", {
        className: "bg-gray-900 border border-white/10 text-white text-sm",
      });
    } finally {
      setReporting(false);
    }
  };
  const isUrgent = timeLeft !== null && timeLeft <= 10;
  const timerPillBase =
    "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[13px] font-bold transition-all duration-500 cursor-default select-none";
  const timerPillVariant = extended
    ? "bg-green-500/15 border border-green-500/50 text-green-400 shadow-[0_0_16px_rgba(34,197,94,0.4)] scale-110"
    : isUrgent
    ? "bg-red-500/15 border border-red-500/50 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.3)] animate-pulse"
    : "bg-white/[0.06] border border-white/10 text-zinc-400";

  return (
    <Card className="text-white bg-gray-900/80 w-full h-max rounded-[15px] overflow-hidden border-white/10">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <Avatar className="h-10 w-10 ring-2 ring-white/10 transition-transform duration-300 hover:scale-105 cursor-pointer">
              <AvatarImage src={pfp} />
              <AvatarFallback className="font-bold text-xl bg-gray-300 text-gray-800">
                {username?.slice(0, 2)?.toUpperCase() || "UN"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="text-white text-[15px] font-semibold leading-tight">
                {username || "N/A"}
              </h1>
              <p className="flex items-center gap-1 text-xs font-bold text-pink-400 mt-0.5">
                <TrendingUp
                  size={12}
                  className="text-blue-400 transition-transform duration-300 hover:translate-y-[-2px]"
                />
                Trending
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`${timerPillBase} ${timerPillVariant}`}>
              <Clock
                size={13}
                className={
                  extended
                    ? "rotate-[360deg] transition-transform duration-500"
                    : "transition-transform duration-300"
                }
              />
              <span className="min-w-[36px] text-center tracking-wide transition-all duration-300">
                {extended ? "+10s" : `${timeLeft ?? "..."}s`}
              </span>
            </div>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer hover:rotate-90 active:scale-90"
              >
                <MoreHorizontal size={18} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-9 z-50 w-44 rounded-xl border border-white/10 bg-gray-900 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                  <button
                    onClick={handleReport}
                    disabled={reporting}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 transition-all duration-200 disabled:opacity-50 cursor-pointer group"
                  >
                    {reporting ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Flag
                        size={14}
                        className="transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110"
                      />
                    )}
                    {reporting ? "Reporting…" : "Report post"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="p-3.5 rounded-[10px] bg-black border border-white/10 shadow-inner">
          <p className="text-[15px] leading-relaxed text-zinc-100">{title}</p>

          <div className="mt-3 pt-3 border-t border-white/10 flex items-center">
            <div className="flex items-center gap-4">
              <div
                onClick={handleLike}
                className={`flex items-center gap-1.5 text-sm font-bold transition-all duration-200 cursor-pointer group ${
                  likedByMe ? "text-pink-500" : "text-zinc-400 hover:text-pink-500"
                }`}
              >
                <Heart
                  size={19}
                  strokeWidth={2.5}
                  fill={likedByMe ? "currentColor" : "none"}
                />
                <span>
                  {likes || 0}
                </span>
              </div>

              <div
                onClick={() => router.push(`/feed/${id}`)}
                className="flex items-center gap-1.5 text-sm font-bold text-zinc-400 hover:text-pink-500 transition-all duration-200 cursor-pointer group"
              >
                <MessageCircle
                  size={18}
                  strokeWidth={2.5}
                />
                <span>
                  {comments || 0}
                </span>
              </div>
            </div>

            <div className="ml-auto">
              <div
                onClick={handleSkull}
                className="p-1.5 rounded-full cursor-pointer transition-all duration-200 hover:bg-red-500/10 group"
              >
                <SkullIcon
                  size={19}
                  className={`transition-all duration-300 text-red-500
                    group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]
                    group-hover:scale-125
                    ${skullActive ? "animate-bounce scale-110 text-red-400" : ""}
                  `}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default Posts;
