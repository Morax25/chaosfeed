"use client";

import { ArrowBigRight, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const rooms = [
  {
    id: "gaming",
    name: "Gaming",
    online: 1234,
    desc: "Live gaming discussions",
  },
  {
    id: "coding",
    name: "Coding",
    online: 532,
    desc: "React, Node, AI and architecture",
  },
  {
    id: "memes",
    name: "Memes",
    online: 843,
    desc: "Internet chaos lives here",
  },
  {
    id: "music",
    name: "Music",
    online: 291,
    desc: "Talk playlists and artists",
  },
  {
    id: "anime",
    name: "Anime",
    online: 674,
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* background glows */}

      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-pink-500/10 blur-[120px]" />

      <div className="relative z-10 px-4 py-8">

        {/* title */}

        <div className="mb-8">

          <h1 className="
          text-4xl
          font-bold
          bg-gradient-to-r
          from-purple-400
          to-pink-400
          bg-clip-text
          text-transparent
          ">
            Chaos Feed
          </h1>

          <p className="text-white/40 text-sm mt-1">
            Join the noise
          </p>

        </div>

        {/* search */}

        <div className="
        mb-6
        rounded-full
        border
        border-purple-500/20
        bg-[#0d0d10]
        px-4
        py-3
        flex
        items-center
        gap-3
        ">

          <Search
            size={18}
            className="text-white/40"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search room..."
            className="bg-transparent flex-1 outline-none text-sm"
          />

        </div>

        {/* rooms */}

        <div className="flex flex-col gap-4">

          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="
              bg-[#0d0d10]
              border
              border-purple-500/10
              rounded-3xl
              p-4
              backdrop-blur-lg
              shadow-[0_0_20px_rgba(168,85,247,0.1)]
              "
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="font-bold text-lg">
                    #{room.name}
                  </h2>

                  <p className="text-white/40 text-sm mt-1">
                    {room.desc}
                  </p>

                </div>

                <div className="flex items-center font-semibold gap-1 text-sm text-green-400">

                  <Users strokeWidth={3} size={16} />

                  {room.online}

                </div>

              </div>

              <button
                onClick={() =>
                  router.push(`/chat/${room.id}`)
                }
                className="
                mt-4
                w-full
                flex
                justify-center
                items-center
                gap-2
                py-3
                rounded-full
                bg-gradient-to-r
                from-purple-500
                to-pink-500
                font-semibold
                active:scale-95
                transition
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
