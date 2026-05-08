"use client";
import { ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full bg-black flex justify-center items-center flex-col gap-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl pointer-events-none" />

      <div className="relative h-max w-full px-5 py-10 min-h-20 flex justify-center items-center">
        <div className="h-30 rotate-15 animate-[spin_10s_linear_infinite] w-30 bg-[linear-gradient(90deg,rgba(131,58,180,1)_0%,_rgba(252,78,78,1)_100%,_rgba(252,176,69,1)_100%)] rounded-[20px] shadow-lg shadow-red-300/40"></div>
        <div className="absolute flex justify-center items-center inset-0 shadow-2xl shadow-gray-800/10 backdrop-blur-md rounded-2xl shadow-xl">
          <div className="h-30 w-30 rotate-350 flex items-center justify-center bg-[linear-gradient(90deg,rgba(131,58,180,1)_0%,_rgba(252,78,78,1)_100%,_rgba(252,176,69,1)_100%)] rounded-[10px] shadow-sm shadow-red-300/40">
            <div className="flex items-center justify-center h-25 w-25 bg-black rounded-[10px] rotate-8">
              <div>
                <svg
                  viewBox="0 0 120 120"
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                >
                  <polygon
                    points="60,10 103.3,35 103.3,85 60,110 16.7,85 16.7,35"
                    fill="black"
                    stroke="#7C3AED"
                    strokeWidth="10"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Chaos
          </span>
          <span className="text-3xl font-bold tracking-tight text-white">
            Feed
          </span>
        </div>
        <p className="text-sm text-white/40 text-center max-w-[200px]">
          Every second counts
        </p>
      </div>

      <div className="relative mt-4 w-64">
        <button
          onClick={() => {
            router.push("/feed");
          }}
          className="w-full flex justify-center items-center gap-1 cursor-pointer py-4 rounded-full bg-[#0a0a0f] border border-purple-500/40 text-white font-bold text-sm tracking-[0.2em] uppercase
            shadow-[0_0_10px_rgba(168,85,247,0.4),0_0_20px_rgba(236,72,153,0.3)]
            animate-[pulse_2s_ease-in-out_infinite]"
        >
          Enter <ArrowBigRight size={18}/>
        </button>
      </div>
    </div>
  );
};

export default page;
