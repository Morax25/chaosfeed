"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [prevTimeLeft, setPrevTimeLeft] = useState<number | null>(null);
  const [extended, setExtended] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [skullActive, setSkullActive] = useState(false);
  const [heartPopped, setHeartPopped] = useState(false);
  const [justPosted, setJustPosted] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const prevExpiresAt = useRef<number | undefined>(expiresAt);

  useEffect(() => {
    const timeout = setTimeout(() => setJustPosted(false), 1800);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!id || !expiresAt) return;

    if (prevExpiresAt.current && expiresAt > prevExpiresAt.current) {
      setExtended(true);

      setTimeout(() => {
        setExtended(false);
      }, 700);
    }

    prevExpiresAt.current = expiresAt;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));

      setPrevTimeLeft((prev) => prev);

      setTimeLeft((prev) => {
        setPrevTimeLeft(prev);
        return remaining;
      });

      if (remaining <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [id, expiresAt]);

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
    setHeartPopped(true);
    setTimeout(() => setHeartPopped(false), 400);
    socket?.emit("like_post", { postId: id });
  };

  const handleSkull = () => {
    setSkullActive(true);
    setTimeout(() => setSkullActive(false), 700);
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

  const isUrgent = timeLeft !== null && timeLeft <= 10 && timeLeft > 0;

  const timerPillClass = extended
    ? "bg-emerald-500/10 border-emerald-500/35 text-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.25)]"
    : isUrgent
      ? "bg-red-500/10 border-red-500/35 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
      : "bg-white/[0.04] border-white/10 text-zinc-500";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -24, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 340, damping: 26, mass: 0.65 }}
    >
      <Card
        className={[
          "text-white bg-[#0f0f17]/90 w-full rounded-[18px] overflow-hidden",
          "border border-white/[0.07] transition-all duration-1000",
          justPosted
            ? "ring-1 ring-purple-500/30 shadow-[0_0_32px_rgba(139,92,246,0.18)]"
            : "ring-0 shadow-none",
        ].join(" ")}
      >
        <CardHeader className="pb-2 px-4 pt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-9 w-9 ring-2 ring-white/[0.07] transition-transform duration-200 hover:scale-[1.07] cursor-pointer">
                <AvatarImage src={pfp} />
                <AvatarFallback className="font-bold text-lg bg-gradient-to-br from-violet-500 to-pink-500 text-white">
                  {username?.slice(0, 2)?.toUpperCase() || "UN"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h1 className="text-[14px] font-semibold text-white/90 leading-tight tracking-[-0.01em]">
                  {username || "N/A"}
                </h1>
                <p className="flex items-center gap-1 text-[11px] font-semibold text-violet-400/80 mt-0.5">
                  <TrendingUp
                    size={10}
                    className="text-blue-400"
                    strokeWidth={2.5}
                  />
                  Trending
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.div
                animate={
                  extended
                    ? {
                        scale: [1, 1.12, 1],
                        transition: {
                          duration: 0.45,
                          ease: [0.34, 1.56, 0.64, 1],
                        },
                      }
                    : isUrgent
                      ? {}
                      : { scale: 1 }
                }
                className={[
                  "flex items-center gap-1.5 px-2.5 py-[5px] rounded-full border",
                  "text-[12px] font-bold cursor-default select-none transition-colors duration-500",
                  timerPillClass,
                  isUrgent ? "animate-pulse" : "",
                ].join(" ")}
              >
                <Clock
                  size={12}
                  strokeWidth={2.5}
                  className={[
                    "transition-transform duration-500 flex-shrink-0",
                    extended ? "rotate-[360deg]" : "",
                  ].join(" ")}
                />
                <div className="min-w-[30px] text-center overflow-hidden relative h-[16px]">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={extended ? "ext" : timeLeft}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 8, opacity: 0 }}
                      transition={{
                        duration: 0.18,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="absolute inset-0 flex items-center justify-center tracking-wide"
                    >
                      {extended ? "+10s" : `${timeLeft ?? "…"}s`}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className={[
                    "w-[30px] h-[30px] rounded-full flex items-center justify-center",
                    "text-zinc-500 hover:text-white hover:bg-white/[0.08]",
                    "transition-all duration-200 cursor-pointer",
                    menuOpen ? "rotate-90 bg-white/[0.06] text-white" : "",
                  ].join(" ")}
                >
                  <MoreHorizontal size={16} strokeWidth={2} />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.93, y: -6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.93, y: -6 }}
                      transition={{
                        duration: 0.15,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="absolute right-0 top-10 z-50 w-44 rounded-2xl border border-white/[0.08] bg-[#0f0f17] shadow-2xl shadow-black/60 overflow-hidden"
                    >
                      <button
                        onClick={handleReport}
                        disabled={reporting}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[13px] text-red-400/90 hover:bg-white/[0.05] hover:text-red-300 transition-all duration-150 disabled:opacity-40 cursor-pointer group"
                      >
                        {reporting ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <Flag
                            size={13}
                            strokeWidth={2.5}
                            className="transition-transform duration-200 group-hover:rotate-12"
                          />
                        )}
                        {reporting ? "Reporting…" : "Report post"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-3 pb-3">
          <div className="p-3.5 rounded-[13px] bg-black/50 border border-white/[0.07]">
            <p className="text-[14px] leading-relaxed text-zinc-200 tracking-[-0.005em]">
              {title}
            </p>

            <div className="mt-3 pt-3 border-t border-white/[0.07] flex items-center">
              <div className="flex items-center gap-1">
                <motion.div
                  onClick={handleLike}
                  whileTap={{ scale: 0.88 }}
                  className={[
                    "flex items-center gap-1.5 text-[13px] font-semibold cursor-pointer",
                    "px-2.5 py-1.5 rounded-lg transition-colors duration-150",
                    likedByMe
                      ? "text-pink-500 hover:bg-pink-500/10"
                      : "text-zinc-500 hover:text-pink-400 hover:bg-pink-500/[0.07]",
                  ].join(" ")}
                >
                  <motion.div
                    animate={
                      heartPopped
                        ? {
                            scale: [1, 1.5, 0.9, 1.15, 1],
                            transition: { duration: 0.38, ease: "easeInOut" },
                          }
                        : { scale: 1 }
                    }
                  >
                    <Heart
                      size={17}
                      strokeWidth={2.5}
                      fill={likedByMe ? "currentColor" : "none"}
                    />
                  </motion.div>
                  <span>{likes || 0}</span>
                </motion.div>

                <motion.div
                  onClick={() => router.push(`/feed/${id}`)}
                  whileTap={{ scale: 0.88 }}
                  className="flex items-center gap-1.5 text-[13px] font-semibold text-zinc-500 hover:text-blue-400 hover:bg-blue-500/[0.07] px-2.5 py-1.5 rounded-lg transition-colors duration-150 cursor-pointer"
                >
                  <MessageCircle size={17} strokeWidth={2.5} />
                  <span>{comments || 0}</span>
                </motion.div>
              </div>

              <motion.div
                onClick={handleSkull}
                whileTap={{ scale: 0.82 }}
                className="ml-auto w-[30px] h-[30px] rounded-lg flex items-center justify-center cursor-pointer hover:bg-red-500/[0.08] transition-colors duration-150"
              >
                <motion.div
                  animate={
                    skullActive
                      ? {
                          rotate: [0, -14, 14, -8, 8, -3, 0],
                          scale: [1, 1.3, 1.3, 1.15, 1.15, 1.05, 1],
                          transition: { duration: 0.55, ease: "easeInOut" },
                        }
                      : { rotate: 0, scale: 1 }
                  }
                >
                  <SkullIcon
                    size={17}
                    strokeWidth={2}
                    className={[
                      "transition-colors duration-200",
                      skullActive
                        ? "text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]"
                        : "text-zinc-600 group-hover:text-red-500",
                    ].join(" ")}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Posts;
