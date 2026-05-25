"use client";

import { SendHorizonal, Users } from "lucide-react";
import { useState } from "react";

type Props = {
  roomId: string;
};

type Message = {
  id: number;
  text: string;
  own: boolean;
};

const ChatRoom = ({ roomId }: Props) => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to the room 🔥",
      own: false,
    },
    {
      id: 2,
      text: "Chaos starts here",
      own: true,
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: message,
        own: true,
      },
    ]);

    // socket.emit("message", {
    //   roomId,
    //   message
    // })

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden">

      {/* background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />

      {/* header */}
      <div className="relative z-10 border-b border-white/10 backdrop-blur-xl px-4 py-4">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="font-bold text-lg">
              Room #{roomId}
            </h1>

            <p className="text-xs text-white/40">
              Chaos Feed
            </p>
          </div>

          <div className="flex items-center gap-2 text-white/60">
            <Users size={18} />
            <span className="text-sm">124</span>
          </div>

        </div>

      </div>

      {/* messages */}

      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4 relative z-10">

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[75%] px-4 py-3 rounded-3xl text-sm ${
              msg.own
                ? "self-end bg-gradient-to-r from-purple-600 to-pink-500"
                : "self-start bg-[#101014] border border-white/5"
            }`}
          >
            {msg.text}
          </div>
        ))}

      </div>

      {/* input */}

      <div className="relative z-10 p-4 border-t border-white/10">

        <div className="flex items-center gap-3 rounded-full bg-[#0b0b10] border border-purple-500/20 px-2 py-2 shadow-[0_0_20px_rgba(168,85,247,0.15)]">

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Type chaos..."
            className="bg-transparent flex-1 px-3 outline-none text-sm"
          />

          <button
            onClick={sendMessage}
            className="
            h-11
            w-11
            rounded-full
            flex
            justify-center
            items-center
            bg-gradient-to-r
            from-purple-500
            to-pink-500
            cursor-pointer
            active:scale-95
            transition
            "
          >
            <SendHorizonal size={18} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default ChatRoom;
