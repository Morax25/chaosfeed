"use client";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] flex justify-center items-center flex-col gap-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-700/20 blur-3xl pointer-events-none animate-pulse" />

      <div className="relative h-max w-full px-5 py-10 flex justify-center items-center">
        <div className="absolute w-72 h-72 rounded-full border border-purple-500/20 animate-[spin_18s_linear_infinite]" />
        <div className="absolute w-60 h-60 rounded-full border border-pink-500/20 animate-[spin_24s_linear_infinite_reverse]" />

        <div className="relative flex items-center justify-center">
          <div className="absolute w-40 h-40 bg-gradient-to-br from-purple-600/30 to-pink-500/30 blur-2xl rounded-full animate-[pulse_4s_ease-in-out_infinite]" />

          <div className="relative h-32 w-32 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600/80 to-pink-500/80 p-[2px] animate-[transform_6s_ease-in-out_infinite] [animation-name:float]">
            <div className="flex items-center justify-center h-full w-full bg-[#0a0a0f] rounded-2xl backdrop-blur-xl">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-16 h-16 bg-purple-500/20 blur-xl rounded-full animate-pulse" />
                <svg
                  viewBox="0 0 120 120"
                  xmlns="http://www.w3.org/2000/svg"
                  width="52"
                  height="52"
                  className="animate-[fadeIn_1s_ease-in]"
                >
                  <polygon
                    points="60,10 103.3,35 103.3,85 60,110 16.7,85 16.7,35"
                    fill="black"
                    stroke="url(#grad)"
                    strokeWidth="8"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 animate-[fadeIn_1.2s_ease-in]">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            chaos
          </span>
          <span className="text-3xl font-bold tracking-tight text-white">
            feed
          </span>
        </div>
        <p className="text-sm text-white/40 text-center max-w-[200px]">
          your daily dose of disorder
        </p>
      </div>

      <div className="relative mt-4 w-64">
        <div className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,rgba(131,58,180,0.6),rgba(252,78,78,0.6))] blur-lg animate-pulse" />
        <button
          onClick={() => {
            router.push("/app");
          }}
          className="relative cursor-pointer w-full py-4 rounded-full bg-[#0a0a0f] border border-purple-500/40 text-white font-bold text-sm tracking-[0.2em] uppercase ring-1 ring-inset ring-white/5 hover:border-purple-400/70 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
        >
          Enter Feed
        </button>
      </div>
    </div>
  );
};

export default page;