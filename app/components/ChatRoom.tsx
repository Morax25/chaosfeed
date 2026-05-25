"use client";

import { SendHorizonal, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  roomId: string;
};

type Message = {
  id: number;
  text: string;
  own: boolean;
  time: string;
};

const ChatRoom = ({ roomId }: Props) => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Welcome to the room 🔥", own: false, time: "now" },
    { id: 2, text: "Chaos starts here", own: true, time: "now" },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: message,
        own: true,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setMessage("");
  };

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
              124 online
            </span>
          </div>

        </div>
      </div>

      {/* === CHAT AREA === */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col gap-3">

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.own ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex flex-col max-w-[78%]">

                {/* MESSAGE BUBBLE */}
                <div
                  className={`
                    relative px-4 py-3 text-[14px] leading-relaxed
                    rounded-2xl
                    transition-all duration-200
                    break-words

                    ${
                      msg.own
                        ? `
                          bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500
                          text-white
                          rounded-br-md
                          shadow-[0_10px_30px_rgba(168,85,247,0.25)]
                        `
                        : `
                          bg-white/[0.04]
                          border border-white/10
                          text-white/90
                          rounded-bl-md
                          shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                        `
                    }
                  `}
                >
                  {msg.text}
                </div>

                {/* TIME */}
                <span
                  className={`text-[10px] text-white/30 mt-1 px-1 ${
                    msg.own ? "text-right" : "text-left"
                  }`}
                >
                  {msg.time}
                </span>

              </div>
            </div>
          ))}

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
              className="
                h-10 w-10
                rounded-xl
                flex items-center justify-center
                bg-gradient-to-br from-purple-500 to-pink-500
                shadow-[0_10px_20px_rgba(236,72,153,0.25)]
                hover:scale-105 active:scale-95
                transition
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
