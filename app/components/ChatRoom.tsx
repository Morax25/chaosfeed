"use client";

import { SendHorizonal, ArrowLeft, ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";

type Props = {
  roomId: string;
};

type Message = {
  id: number;
  text: string;
  own: boolean;
  time: string;
  userId: string;
  username: string;
  pfp: string;
};

const ChatRoom = ({ roomId }: Props) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState<any>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [sendPulse, setSendPulse] = useState(0);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const socket = useAppStore((state) => state.socket);
  const user = useAppStore((state) => state.user);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    bottomRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isAtBottom) scrollToBottom();
  }, [messages, isAtBottom]);

  // Track scroll position to toggle the "jump to latest" affordance
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const distanceFromBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight;
      setIsAtBottom(distanceFromBottom < 120);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SOCKET_URL}/api/chatroom/${roomId}`
        );

        if (res.status === 404) {
          router.push("/chat");
          return;
        }

        if (!res.ok) throw new Error("Failed to load messages");

        const data = await res.json();

        setRoom(data.room);
        setMessages(
          data.messages.map((msg: any) => ({
            id: msg.id,
            text: msg.text,
            own: msg.userId === user?.userId,
            userId: msg.userId,
            username: msg.username,
            pfp: msg.pfp,
            time: new Date(msg.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }))
        );
      } catch (error) {
        console.error("Failed to load messages:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) loadMessages();
  }, [roomId, user]);

  useEffect(() => {
    if (!socket || !user) return;

    socket.emit("join-room", { roomId });

    socket.on("receive-message", (data: any) => {
      setMessages((prev) => [
        ...prev,
        {
          id: data.id,
          text: data.text,
          own: data.userId === user.userId,
          userId: data.userId,
          username: data.username,
          pfp: data.pfp,
          time: new Date(data.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    socket.on("user-count", (count: number) => {
      setOnlineUsers(count);
    });

    socket.on("room_deleted", ({ roomId: deletedId }: { roomId: string }) => {
      if (deletedId === roomId) {
        router.push("/chat");
      }
    });

    return () => {
      // Only remove listeners here, leave-room is handled explicitly
      socket.off("receive-message");
      socket.off("user-count");
      socket.off("room_deleted");
    };
  }, [socket, roomId, user]);

  // Explicit leave handler — called on back button and unmount
  const handleLeave = () => {
    if (socket) {
      socket.emit("leave-room", { roomId });
    }
    router.push("/chat");
  };

  // Catch browser back / tab close / refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (socket) {
        socket.emit("leave-room", { roomId });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // Emit leave when component unmounts (route change, etc.)
      if (socket) {
        socket.emit("leave-room", { roomId });
      }
    };
  }, [socket, roomId]);

  const sendMessage = () => {
    if (!message.trim() || !socket || !user) return;

    socket.emit("send-message", {
      roomId,
      text: message,
      timestamp: new Date(),
      userId: user.userId,
    });

    setMessage("");
    setSendPulse((p) => p + 1);
    setIsAtBottom(true);
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#030305] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-2 w-2 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"
                animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
          <p className="text-white/25 text-xs tracking-[0.2em] uppercase">
            loading room
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#030305] text-white flex flex-col relative overflow-hidden">
      {/* Ambient background — slow breathing gradient orbs */}
      <motion.div
        className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-purple-600/20 blur-[100px]"
        animate={{ x: [0, 40, 0], y: [0, 20, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 h-[380px] w-[380px] rounded-full bg-pink-500/15 blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, -25, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 border-b border-white/[0.06] bg-black/30 backdrop-blur-2xl"
      >
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <motion.button
              onClick={handleLeave}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Leave room"
              className="p-2 rounded-xl text-white/40 hover:text-white/80 hover:bg-white/[0.06] transition-colors flex-shrink-0"
            >
              <ArrowLeft size={16} />
            </motion.button>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-purple-400/80 font-medium">
                  #
                </span>
                <span className="text-sm font-semibold tracking-tight truncate">
                  {room.name}
                </span>
              </div>
              {room.description && (
                <p className="text-[11px] text-white/35 truncate">
                  {room.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 pl-3 pr-1 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
            <span className="relative flex h-2 w-2">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-green-400"
                animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="text-xs text-white/40">
              <span className="text-white/70 font-medium">{onlineUsers}</span>{" "}
              online
            </span>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto relative z-10 scrollbar-none"
      >
        <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-1">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center h-64 gap-2"
            >
              <p className="text-white/25 text-sm">no messages yet</p>
              <p className="text-white/10 text-xs">start the chaos</p>
            </motion.div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => {
                const prevMsg = messages[i - 1];
                const isGrouped = prevMsg?.userId === msg.userId;

                return (
                  <motion.div
                    key={msg.id}
                    layout="position"
                    initial={{ opacity: 0, y: 14, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`flex ${msg.own ? "justify-end" : "justify-start"} ${isGrouped ? "mt-0.5" : "mt-4"}`}
                  >
                    <div
                      className={`flex items-end gap-2 max-w-[75%] ${msg.own ? "flex-row-reverse" : ""}`}
                    >
                      {!isGrouped ? (
                        <img
                          src={msg.pfp}
                          alt={msg.username}
                          className="h-7 w-7 rounded-full object-cover flex-shrink-0 border border-white/10"
                        />
                      ) : (
                        <div className="w-7 flex-shrink-0" />
                      )}

                      <div
                        className={`flex flex-col gap-0.5 ${msg.own ? "items-end" : "items-start"}`}
                      >
                        {!isGrouped && (
                          <span
                            className={`text-[11px] text-white/35 px-1 ${msg.own ? "text-right" : ""}`}
                          >
                            {msg.own ? "you" : msg.username}
                          </span>
                        )}

                        <div className="flex items-end gap-1.5">
                          {msg.own && (
                            <span className="text-[10px] text-white/20 mb-0.5">
                              {msg.time}
                            </span>
                          )}

                          <div
                            className={`px-3.5 py-2 rounded-2xl text-sm leading-relaxed break-words shadow-sm ${
                              msg.own
                                ? "bg-gradient-to-br from-purple-500/25 to-pink-500/20 border border-white/[0.1] text-white rounded-br-md"
                                : "bg-white/[0.04] border border-white/[0.06] text-white/80 rounded-bl-md"
                            }`}
                          >
                            {msg.text}
                          </div>

                          {!msg.own && (
                            <span className="text-[10px] text-white/20 mb-0.5">
                              {msg.time}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Jump to latest */}
        <AnimatePresence>
          {!isAtBottom && messages.length > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsAtBottom(true);
                scrollToBottom();
              }}
              className="sticky bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl text-xs text-white/70 shadow-lg"
            >
              <ArrowDown size={12} />
              jump to latest
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Composer */}
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
        className="relative z-10 px-4 py-3 bg-black/20 backdrop-blur-xl border-t border-white/[0.05]"
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 px-2 py-2 rounded-2xl bg-white/[0.03] border border-white/[0.07] transition-colors focus-within:border-purple-400/30 focus-within:bg-white/[0.05]">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Send chaos..."
              className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-white/20 text-white/90"
            />

            <motion.button
              key={sendPulse}
              onClick={sendMessage}
              disabled={!socket || !message.trim()}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 1 }}
              animate={{ scale: [1.18, 1] }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-9 w-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0 shadow-[0_0_16px_rgba(168,85,247,0.35)]"
            >
              <SendHorizonal size={15} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatRoom;
