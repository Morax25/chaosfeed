"use client";

import { ArrowBigRight, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const rooms = [
  {
    id: "gaming",
    name: "Gaming",
    online: "2",
    desc: "Live gaming discussions",
  },
  {
    id: "coding",
    name: "Coding",
    online: 10,
    desc: "React, Node, AI and architecture",
  },
  {
    id: "memes",
    name: "Memes",
    online: 2,
    desc: "Internet chaos lives here",
  },
  {
    id: "music",
    name: "Music",
    online: 1,
    desc: "Talk playlists and artists",
  },
  {
    id: "anime",
    name: "Anime",
    online: 8,
    desc: "Shows, manga and theories",
  },
];

const Page = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-x-hidden">

      {/* background glow effects */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />

      <div className="relative z-10 px-4 py-8 max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Chaos Feed
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Join the noise in real-time rooms
          </p>
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
              {/* Top section */}
              <div>
                <div className="flex justify-between items-start">
                  <h2 className="font-bold text-lg tracking-wide">
                    #{room.name}
                  </h2>

                  <div className="flex items-center gap-1 text-sm text-green-400 font-semibold">
                    <Users strokeWidth={2.5} size={16} />
                    {room.online}
                  </div>
                </div>

                <p className="text-white/40 text-sm mt-2 leading-relaxed">
                  {room.desc}
                </p>
              </div>

              {/* Button */}
              <button
                onClick={() => router.push(`/chat/${room.id}`)}
                className="
                  mt-6
                  w-full
                  flex justify-center items-center gap-2
                  py-3
                  rounded-2xl
                  bg-gradient-to-r from-purple-500 to-pink-500
                  font-semibold
                  text-white
                  hover:scale-[1.02]
                  active:scale-95
                  transition
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
      </div>
    </div>
  );
};

export default Page;
