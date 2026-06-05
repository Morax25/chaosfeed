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
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { reportPost } from "@/actions/posts";

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
  const [reportMessage, setReportMessage] = useState<string | null>(null);
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

  const handleReport = async () => {
    setReporting(true);
    setMenuOpen(false);
    if (!user?.userId) return console.error("User not found");
    try {
      const res = await reportPost(user?.userId, id, title);
      setReportMessage(res.message);
    } catch {
      setReportMessage("Something went wrong. Please try again.");
    } finally {
      setReporting(false);
      setTimeout(() => setReportMessage(null), 4000);
    }
  };

  const isUrgent = timeLeft !== null && timeLeft <= 10;

  return (
    <Card className="text-white bg-gray-900/80 w-full h-max rounded-[15px] overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={pfp} />
              <AvatarFallback className="font-bold text-xl bg-gray-300 text-gray-800">
                {username?.slice(0, 2)?.toUpperCase() || "UN"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-white text-lg">{username || "N/A"}</h1>
              <p className="flex gap-1 items-center font-bold text-pink-400">
                <TrendingUp className="text-blue-500" size={15} /> Trending
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 10px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 700,
                transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                background: extended
                  ? "rgba(34,197,94,0.15)"
                  : isUrgent
                  ? "rgba(239,68,68,0.15)"
                  : "rgba(255,255,255,0.06)",
                border: extended
                  ? "1px solid rgba(34,197,94,0.5)"
                  : isUrgent
                  ? "1px solid rgba(239,68,68,0.5)"
                  : "1px solid rgba(255,255,255,0.1)",
                color: extended ? "#4ade80" : isUrgent ? "#f87171" : "#d4d4d8",
                boxShadow: extended
                  ? "0 0 16px rgba(34,197,94,0.4)"
                  : isUrgent
                  ? "0 0 12px rgba(239,68,68,0.3)"
                  : "none",
                transform: extended ? "scale(1.1)" : "scale(1)",
              }}
            >
              <Clock
                size={14}
                style={{
                  transition: "transform 0.5s ease",
                  transform: extended ? "rotate(360deg)" : "rotate(0deg)",
                }}
              />
              <span
                style={{
                  transition: "all 0.3s ease",
                  minWidth: "36px",
                  textAlign: "center",
                  letterSpacing: extended ? "0.5px" : "0",
                }}
              >
                {extended ? "+10s" : `${timeLeft ?? "..."}s`}
              </span>
            </div>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="p-1.5 rounded-full hover:bg-white/10 transition text-gray-400 hover:text-white"
              >
                <MoreHorizontal size={18} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-8 z-50 w-44 rounded-xl border border-white/10 bg-gray-900 shadow-xl overflow-hidden">
                  <button
                    onClick={handleReport}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 transition"
                  >
                    <Flag size={15} />
                    Report post
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="p-3 text-lg rounded-[10px] bg-black border border-white/10 shadow-lg">
          <p>{title}</p>

          <div className="mt-3 border-t border-t-gray-400/30 flex items-center font-bold text-sm gap-4 pt-3">
            <div
              onClick={handleLike}
              className={`flex transition cursor-pointer items-center gap-1 ${
                likedByMe ? "text-pink-500" : "hover:text-pink-600"
              }`}
            >
              <Heart
                size={20}
                strokeWidth={3}
                fill={likedByMe ? "currentColor" : "none"}
              />
              <p>{likes || 0}</p>
            </div>

            <div
              onClick={() => router.push(`/feed/${id}`)}
              className="flex items-center hover:text-pink-600 transition cursor-pointer gap-1"
            >
              <MessageCircle size={18} strokeWidth={3} />
              <p>{comments || 0}</p>
            </div>

            {reporting && (
              <div className="ml-auto flex items-center gap-1.5 text-xs text-gray-400">
                <Loader2 size={13} className="animate-spin" />
                Reporting...
              </div>
            )}

            {reportMessage && !reporting && (
              <div className="ml-auto flex items-center gap-1.5 text-xs text-green-400">
                <CheckCircle2 size={13} />
                {reportMessage}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Posts;
