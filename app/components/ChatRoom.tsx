"use client";

import { SendHorizonal, Users, ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const socket = useAppStore((state) => state.socket);
  const user = useAppStore((state) => state.user);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/api/chatroom/${roomId}`);

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
      if (deletedId === roomId) router.push("/chat");
    });

    return () => {
      socket.emit("leave-room", { roomId });
      socket.off("receive-message");
      socket.off("user-count");
      socket.off("room_deleted");
    };
  }, [socket, roomId, user]);

  const sendMessage = () => {
    if (!message.trim() || !socket || !user) return;

    socket.emit("send-message", {
      roomId,
      text: message,
      timestamp: new Date(),
      userId: user.userId,
    });

    setMessage("");
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#030305] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
          <p className="text-white/30 text-xs tracking-wide">loading room</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#030305] text-white flex flex-col relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(168,85,247,0.1),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(236,72,153,0.07),transparent_60%)]" />

      <div className="relative z-10 border-b border-white/[0.06] bg-black/20 backdrop-blur-2xl">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => router.push("/chat")}
              className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition flex-shrink-0"
            >
              <ArrowLeft size={16} />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-purple-400/70">#</span>
                <span className="text-sm font-semibold truncate">{room.name}</span>
              </div>
              {room.description && (
                <p className="text-[11px] text-white/30 truncate">{room.description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
            <span className="text-xs text-white/40">
              <span className="text-white/60 font-medium">{onlineUsers}</span> online
            </span>
          </div>

        </div>
      </div>

      <div className="flex-1 overflow-y-auto relative z-10 scrollbar-none">
        <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-1">

          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-2">
              <p className="text-white/20 text-sm">no messages yet</p>
              <p className="text-white/10 text-xs">start the chaos</p>
            </div>
          ) : (
            messages.map((msg, i) => {
              const prevMsg = messages[i - 1];
              const isGrouped = prevMsg?.userId === msg.userId;

              return (
                <div
                  key={msg.id}
                  className={`flex ${msg.own ? "justify-end" : "justify-start"} ${isGrouped ? "mt-0.5" : "mt-4"}`}
                >
                  <div className={`flex items-end gap-2 max-w-[75%] ${msg.own ? "flex-row-reverse" : ""}`}>

                    {!isGrouped ? (
                      <img
                        src={msg.pfp}
                        alt={msg.username}
                        className="h-7 w-7 rounded-full object-cover flex-shrink-0 border border-white/10"
                      />
                    ) : (
                      <div className="w-7 flex-shrink-0" />
                    )}

                    <div className={`flex flex-col gap-0.5 ${msg.own ? "items-end" : "items-start"}`}>

                      {!isGrouped && (
                        <span className={`text-[11px] text-white/30 px-1 ${msg.own ? "text-right" : ""}`}>
                          {msg.own ? "you" : msg.username}
                        </span>
                      )}

                      <div className="flex items-end gap-1.5">
                        {msg.own && (
                          <span className="text-[10px] text-white/20 mb-0.5">{msg.time}</span>
                        )}

                        <div
                          className={`px-3.5 py-2 rounded-2xl text-sm leading-relaxed break-words ${
                            msg.own
                              ? "bg-white/[0.08] border border-white/[0.08] text-white rounded-br-md"
                              : "bg-white/[0.04] border border-white/[0.06] text-white/80 rounded-bl-md"
                          }`}
                        >
                          {msg.text}
                        </div>

                        {!msg.own && (
                          <span className="text-[10px] text-white/20 mb-0.5">{msg.time}</span>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              );
            })
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      <div className="relative z-10 px-4 py-3 bg-black/10 backdrop-blur-xl border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 px-2 py-2 rounded-2xl bg-white/[0.03] border border-white/[0.07]">

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

            <button
              onClick={sendMessage}
              disabled={!socket || !message.trim()}
              className="h-9 w-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-105 active:scale-95 transition-transform disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
            >
              <SendHorizonal size={15} />
            </button>

          </div>
        </div>
      </div>

    </div>
  );
};

export default ChatRoom;
