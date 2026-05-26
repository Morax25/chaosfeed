"use client";

import { ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center relative overflow-x-hidden px-4 py-5">

      {/* background glow */}
      <div className="absolute top-1/2 left-1/2 w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-7">

        {/* ================= LOGO (UNCHANGED) ================= */}
        <div className="flex flex-col items-center gap-4 scale-[0.8] sm:scale-100">

          <div className="relative h-max w-full px-5 py-8 flex justify-center items-center">
            <div className="h-30 rotate-15 animate-[spin_10s_linear_infinite] w-30 bg-[linear-gradient(90deg,rgba(131,58,180,1)_0%,rgba(252,78,78,1)_100%,rgba(252,176,69,1)_100%)] rounded-[20px] shadow-lg shadow-red-300/40"></div>

            <div className="absolute flex justify-center items-center inset-0 backdrop-blur-md rounded-2xl">
              <div className="h-30 w-30 rotate-350 flex items-center justify-center bg-[linear-gradient(90deg,rgba(131,58,180,1)_0%,rgba(252,78,78,1)_100%,rgba(252,176,69,1)_100%)] rounded-[10px]">
                <div className="flex items-center justify-center h-25 w-25 bg-black rounded-[10px] rotate-8">
                  <svg viewBox="0 0 120 120" width="50" height="50">
                    <polygon
                      points="60,10 103.3,35 103.3,85 60,110 16.7,85 16.7,35"
                      fill="black"
                      stroke="#7C3AED"
                      strokeWidth="10"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* WORDMARK */}
          <div className="text-center space-y-1">
            <div className="flex items-baseline gap-1.5 justify-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Chaos
              </span>
              <span className="text-3xl font-bold text-white">Feed</span>
            </div>

            <p className="text-xs text-white/40 max-w-[240px] leading-snug">
              Post anything. Talk freely. Everything disappears unless people engage.
            </p>
          </div>
        </div>

        {/* ================= CTA (BIGGER) ================= */}
        <div className="w-full flex justify-center">
          <button
            onClick={() => router.push("/feed")}
            className="w-60 py-3.5 rounded-full cursor-pointer bg-[#0a0a0f] border border-purple-500/40 text-white text-xs font-semibold tracking-[0.2em] uppercase
            shadow-[0_0_25px_rgba(168,85,247,0.25)]
            hover:scale-[1.03] active:scale-95 transition"
          >
            Enter <ArrowBigRight className="inline ml-1" size={16} />
          </button>
        </div>

        {/* ================= INFO CARDS (ENHANCED CONTENT) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full px-2">

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-xs text-white/90">No Signup Needed</p>
            <p className="text-[11px] text-white/40">
              Open instantly → system assigns you a random identity & avatar
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-xs text-white/90">Live Feed</p>
            <p className="text-[11px] text-white/40">
              Posts appear instantly across users without refresh or delay
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-xs text-white/90">Short-Lived Posts</p>
            <p className="text-[11px] text-white/40">
              Every post dies quickly unless people interact with it
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-xs text-white/90">Chat Rooms</p>
            <p className="text-[11px] text-white/40">
              Jump into random conversations with strangers instantly
            </p>
          </div>

        </div>

        {/* ================= TAGS ================= */}
        <div className="flex flex-wrap justify-center gap-1.5 px-2">
          {[
            "anonymous chat",
            "confessions",
            "chaos posting",
            "talk to strangers",
            "random feed",
            "random chat",
            "no identity",
          ].map((t, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 border border-white/10 text-white/50"
            >
              {t}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}
