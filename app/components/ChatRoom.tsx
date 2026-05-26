"use client";

import { SendHorizonal, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/useAppStore";

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
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const socket = useAppStore((state) => state.socket);
  const user = useAppStore((state) => state.user);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load message history from API on mount
  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/api/chatroom/${roomId}`);
        const data = await res.json();

        if (data.messages) {
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
        }
      } catch (error) {
        console.error("Failed to load messages:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadMessages();
    }
  }, [roomId, user]);

  // Socket listeners for real-time updates
  useEffect(() => {
    if (!socket || !user) return;

    // Join room
    socket.emit("join-room", { roomId });

    // Receive new messages in real-time
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

    // Update user count
    socket.on("user-count", (count: number) => {
      setOnlineUsers(count);
    });

    // Cleanup
    return () => {
      socket.emit("leave-room", { roomId });
      socket.off("receive-message");
      socket.off("user-count");
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white/60">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#030305] text-white flex flex-col relative overflow-hidden">

      {/* === BACKGROUND LAYER (depth system) === */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.18),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(236,72,153,0.12),transparent_50%)]" />
      <div className="absolute inset-0 backdrop-blur-[120px] opacity-30" />

      {/* === TOP BAR (glass premium header) === */}
      <div className="relative z-10 border-b border-white/10 bg-white/[0.03] backdrop-blur-2xl">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide">
              # {roomId}
            </span>
            <span className="text-[11px] text-white/40">
              realtime chaos stream
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Users size={15} className="text-white/70" />
            <span className="text-sm font-medium text-white/80">
              {onlineUsers} online
            </span>
          </div>

        </div>
      </div>

      {/* === CHAT AREA === */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col gap-4">

          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-white/40 text-sm">
              No messages yet. Start the chaos! 🔥
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.own ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-2 max-w-[70%] ${msg.own ? "flex-row-reverse" : ""}`}>

                  {/* Avatar */}
                  <img
                    src={msg.pfp}
                    alt={msg.username}
                    className="h-8 w-8 rounded-full object-cover flex-shrink-0 border border-white/10"
                  />

                  <div className={`flex flex-col ${msg.own ? "items-end" : "items-start"}`}>

                    {/* Username */}
                    <span className="text-xs text-white/60 mb-1">
                      {msg.username}
                    </span>

                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-2 rounded-2xl break-words ${
                        msg.own
                          ? "bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 text-white rounded-br-md shadow-[0_10px_30px_rgba(168,85,247,0.25)]"
                          : "bg-white/[0.04] border border-white/10 text-white/90 rounded-bl-md shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Time */}
                    <span className="text-[10px] text-white/30 mt-1">
                      {msg.time}
                    </span>

                  </div>
                </div>
              </div>
            ))
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* === INPUT BAR (floating glass style) === */}
      <div className="relative z-10 px-4 py-3">
        <div className="max-w-5xl mx-auto">

          <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4)]">

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
              className="
                flex-1 bg-transparent
                px-3 py-2
                text-sm
                outline-none
                placeholder:text-white/30
              "
            />

            <button
              onClick={sendMessage}
              disabled={!socket || !message.trim()}
              className="
                h-10 w-10
                rounded-xl
                flex items-center justify-center
                bg-gradient-to-br from-purple-500 to-pink-500
                shadow-[0_10px_20px_rgba(236,72,153,0.25)]
                hover:scale-105 active:scale-95
                transition
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              <SendHorizonal size={18} />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
