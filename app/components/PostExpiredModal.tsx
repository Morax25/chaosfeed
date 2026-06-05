"use client";

import { MessageCircle, Clock, Heart, TrendingUp, Flame, Award, Eye, Zap } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  duration: number;
  comments: number;
  likes: number;
};

const CIRCUMFERENCE = 2 * Math.PI * 54;

const getRank = (comments: number, likes: number, duration: number) => {
  const score = comments * 3 + likes * 2 + Math.floor(duration / 1000);
  if (score >= 200) return {
    label: "Legendary",
    Icon: Award,
    color: "from-yellow-400 to-orange-400",
    textColor: "text-yellow-400",
    glow: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    outerFrom: "#d97706", outerTo: "#facc15",
    innerFrom: "#f59e0b", innerTo: "#fde68a",
    glowRgb: "rgba(250,204,21,0.3)",
    outerDash: 300, innerDash: 200,
  };
  if (score >= 100) return {
    label: "Viral",
    Icon: Flame,
    color: "from-purple-500 to-pink-500",
    textColor: "text-pink-400",
    glow: "bg-purple-500/10",
    border: "border-purple-500/20",
    outerFrom: "#7C3AED", outerTo: "#A855F7",
    innerFrom: "#DC2626", innerTo: "#F87171",
    glowRgb: "rgba(168,85,247,0.3)",
    outerDash: 315, innerDash: 220,
  };
  if (score >= 50) return {
    label: "Trending",
    Icon: TrendingUp,
    color: "from-blue-400 to-purple-400",
    textColor: "text-blue-400",
    glow: "bg-blue-500/10",
    border: "border-blue-500/20",
    outerFrom: "#2563EB", outerTo: "#60A5FA",
    innerFrom: "#7C3AED", innerTo: "#A78BFA",
    glowRgb: "rgba(96,165,250,0.3)",
    outerDash: 260, innerDash: 170,
  };
  if (score >= 20) return {
    label: "Noticed",
    Icon: Eye,
    color: "from-purple-400 to-pink-400",
    textColor: "text-purple-400",
    glow: "bg-purple-500/10",
    border: "border-purple-500/20",
    outerFrom: "#7C3AED", outerTo: "#C084FC",
    innerFrom: "#4F46E5", innerTo: "#818CF8",
    glowRgb: "rgba(192,132,252,0.3)",
    outerDash: 190, innerDash: 120,
  };
  return {
    label: "Quiet Storm",
    Icon: Zap,
    color: "from-zinc-400 to-zinc-600",
    textColor: "text-zinc-400",
    glow: "bg-white/5",
    border: "border-white/10",
    outerFrom: "#52525B", outerTo: "#A1A1AA",
    innerFrom: "#3F3F46", innerTo: "#71717A",
    glowRgb: "rgba(161,161,170,0.15)",
    outerDash: 120, innerDash: 70,
  };
};

const AnimatedNumber = ({ value }: { value: number }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);

  return <>{display}</>;
};

const PostExpiredModal = ({ duration, comments, likes }: Props) => {
  const seconds = Math.floor(duration / 1000);
  const score = comments * 3 + likes * 2 + Math.floor(duration / 1000);
  const rank = getRank(comments, likes, duration);
  const rankLetter = score >= 200 ? "S" : score >= 100 ? "A" : score >= 50 ? "B" : score >= 20 ? "C" : "D";

  const [visible, setVisible] = useState(false);
  const [arcActive, setArcActive] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 50);
    const t2 = setTimeout(() => setArcActive(true), 300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const outerOffset = arcActive ? CIRCUMFERENCE - rank.outerDash : CIRCUMFERENCE;
  const innerOffset = arcActive ? CIRCUMFERENCE - rank.innerDash : CIRCUMFERENCE;

  return (
    <div
      className={`flex flex-col items-center gap-6 py-4 text-white transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* ── Rank ring ── */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-[148px] h-[148px] flex items-center justify-center">

          {/* glow — matches page's purple-600/10 blur-3xl style */}
          <div className={`absolute inset-0 rounded-full ${rank.glow} blur-2xl pointer-events-none`} />

          <svg
            width="148" height="148" viewBox="0 0 148 148" fill="none"
            className="absolute inset-0 -rotate-90"
          >
            <defs>
              <linearGradient id={`outer-${rankLetter}`} x1="0" y1="0" x2="148" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={rank.outerFrom} />
                <stop offset="100%" stopColor={rank.outerTo} />
              </linearGradient>
              <linearGradient id={`inner-${rankLetter}`} x1="0" y1="0" x2="148" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={rank.innerFrom} />
                <stop offset="100%" stopColor={rank.innerTo} />
              </linearGradient>
            </defs>
            {/* tracks */}
            <circle cx="74" cy="74" r="54" stroke="white" strokeOpacity="0.06" strokeWidth="9" fill="none" />
            <circle cx="74" cy="74" r="40" stroke="white" strokeOpacity="0.04" strokeWidth="7" fill="none" />
            {/* outer arc */}
            <circle
              cx="74" cy="74" r="54"
              stroke={`url(#outer-${rankLetter})`}
              strokeWidth="9" strokeLinecap="round" fill="none"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={outerOffset}
              className="transition-[stroke-dashoffset] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            />
            {/* inner arc */}
            <circle
              cx="74" cy="74" r="40"
              stroke={`url(#inner-${rankLetter})`}
              strokeWidth="7" strokeLinecap="round" fill="none"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={innerOffset}
              className="transition-[stroke-dashoffset] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-150"
            />
          </svg>

          {/* center rank letter */}
          <div
            className={`relative z-10 text-center transition-all duration-500 delay-500 ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <div className="text-5xl font-black text-white leading-none tracking-tighter">{rankLetter}</div>
            <div className="text-[10px] font-medium text-white/30 tracking-[0.18em] uppercase mt-0.5">RANK</div>
          </div>
        </div>

        {/* rank label */}
        <div className="flex flex-col items-center gap-1">
          <span className={`text-3xl font-black tracking-tight bg-gradient-to-r ${rank.color} bg-clip-text text-transparent`}>
            {rank.label}
          </span>
          <span className="text-xs text-white/40 tracking-widest uppercase">
            your post has faded
          </span>
        </div>
      </div>

      {/* ── Stats grid ── */}
      <div className="w-full grid grid-cols-3 gap-3">
        {[
          { icon: <Clock size={18} strokeWidth={1.8} />, value: seconds, label: "seconds", color: "text-fuchsia-400" },
          { icon: <MessageCircle size={18} strokeWidth={1.8} />, value: comments, label: "comments", color: "text-blue-400" },
          { icon: <Heart size={18} strokeWidth={1.8} />, value: likes, label: "likes", color: "text-pink-400" },
        ].map((stat, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-2 rounded-2xl p-4 bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 ${
              visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2.5 scale-95"
            }`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className={stat.color}>{stat.icon}</span>
            <span className="text-2xl font-black tabular-nums text-white">
              <AnimatedNumber value={stat.value} />
            </span>
            <span className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* ── Chaos score ── */}
      <div
        className={`w-full rounded-2xl p-5 flex flex-col items-center gap-1 backdrop-blur-md border transition-all duration-500 delay-300 ${rank.glow} ${rank.border} ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <span className="text-xs text-white/40 uppercase tracking-widest">chaos score</span>
        <span className={`text-5xl font-black tabular-nums mt-1 bg-gradient-to-r ${rank.color} bg-clip-text text-transparent`}>
          <AnimatedNumber value={score} />
        </span>
        <div className="flex gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`w-8 h-2 rounded-full transition-all duration-300 ${
                i < Math.ceil(score / 40) ? `bg-gradient-to-r ${rank.color}` : "bg-white/10"
              } ${visible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}`}
              style={{
                transitionDelay: `${0.4 + i * 0.08}s`,
                transformOrigin: "bottom",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostExpiredModal;
