"use client";

import { ArrowBigRight, Search, Users, Plus, X, Hash, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Room = {
  id: string;
  name: string;
  onlineUsers: number;
  description: string;
};

const Page = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  const fetchRooms = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chatroom`);
      const data = await res.json();
      setRooms(data.rooms || []);
    } catch {
      console.error("Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (showModal) {
      setTimeout(() => nameRef.current?.focus(), 50);
    } else {
      setForm({ name: "", description: "" });
      setError("");
    }
  }, [showModal]);

  const createRoom = async () => {
    if (!form.name.trim()) {
      setError("Room name is required");
      return;
    }

    try {
      setCreating(true);
      setError("");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chatroom/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          description: form.description.trim(),
        }),
      });

      if (!res.ok) throw new Error("Failed to create room");

      const data = await res.json();
      router.push(`/chat/${data.room.id}`);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setCreating(false);
    }
  };

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-x-hidden">

      {/* Background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />

      <div className="relative z-10 px-4 py-8 max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Chaos Feed
            </h1>
            <p className="text-white/40 text-sm mt-1">
              Join the noise in real-time rooms
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold shadow-lg shadow-pink-500/20 hover:scale-[1.03] active:scale-95 transition flex-shrink-0"
          >
            <Plus size={16} />
            Create Room
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 rounded-2xl border border-purple-500/20 bg-[#0d0d10] px-4 py-3 flex items-center gap-3 shadow-lg">
          <Search size={18} className="text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rooms..."
            className="bg-transparent flex-1 outline-none text-sm text-white placeholder:text-white/30"
          />
        </div>

        {/* Rooms Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 size={28} className="animate-spin text-white/20" />
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <Hash size={36} className="text-white/10" />
            <p className="text-white/30 text-sm">
              {search ? "No rooms match your search." : "No rooms yet. Create the first one."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="
                  group
                  bg-gradient-to-b from-[#111118] to-[#0d0d10]
                  border border-purple-500/10
                  rounded-3xl
                  p-5
                  flex flex-col justify-between
                  shadow-[0_0_30px_rgba(168,85,247,0.08)]
                  hover:shadow-[0_0_40px_rgba(236,72,153,0.15)]
                  hover:border-purple-500/30
                  transition-all duration-300
                "
              >
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="font-bold text-lg tracking-wide">
                      #{room.name}
                    </h2>
                    <div className="flex items-center gap-1 text-sm text-green-400 font-semibold">
                      <Users strokeWidth={2.5} size={16} />
                      {room.onlineUsers ?? 0}
                    </div>
                  </div>

                  <p className="text-white/40 text-sm mt-2 leading-relaxed">
                    {room.description || "No description."}
                  </p>
                </div>

                <button
                  onClick={() => router.push(`/chat/${room.id}`)}
                  className="
                    mt-6 w-full
                    flex justify-center items-center gap-2
                    py-3 rounded-2xl
                    bg-gradient-to-r from-purple-500 to-pink-500
                    font-semibold text-white
                    hover:scale-[1.02] active:scale-95 transition
                    shadow-lg shadow-pink-500/20
                    group-hover:shadow-pink-500/40
                  "
                >
                  Enter Room
                  <ArrowBigRight size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Room Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="w-full max-w-md bg-[#0d0d10] border border-purple-500/20 rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.7)] overflow-hidden">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <h2 className="font-bold text-base">Create a Room</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white/80 transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/50 font-medium">Room name</label>
                <input
                  ref={nameRef}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && createRoom()}
                  placeholder="e.g. late night vibes"
                  maxLength={40}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none placeholder:text-white/20 focus:border-purple-500/50 transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/50 font-medium">
                  Description <span className="text-white/20">(optional)</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="What's this room about?"
                  maxLength={120}
                  rows={3}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none placeholder:text-white/20 focus:border-purple-500/50 transition resize-none"
                />
              </div>

              {error && (
                <p className="text-xs text-red-400">{error}</p>
              )}
            </div>

            {/* Modal footer */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-white/50 hover:text-white/80 hover:border-white/20 transition"
              >
                Cancel
              </button>
              <button
                onClick={createRoom}
                disabled={creating || !form.name.trim()}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {creating ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Room"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
