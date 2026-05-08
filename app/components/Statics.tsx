import React from 'react';

interface StatsProps {
  rank?: string;
  totalViews?: number;
  lifespan?: string;
  onViewAnalytics?: () => void;
  onReturnToFeed?: () => void;
}

const Statics: React.FC<StatsProps> = ({
  rank = 'S',
  totalViews = 1248,
  lifespan = '4m 12s',
  onViewAnalytics,
  onReturnToFeed,
}) => {
  return (
    <div className="min-h-screen bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-[340px] bg-gradient-to-br from-slate-900 to-slate-950 border border-purple-600/20 rounded-[20px] p-8 text-center">

        {/* Header Line */}
        <div className="w-16 h-0.5 bg-purple-600/30 mx-auto mb-6" />

        {/* Title */}
        <h2 className="text-2xl font-medium text-white mb-2 tracking-tight">Post-Mortem</h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-400 mb-8">Your pulse has expired.</p>

        {/* Circular Progress with Rank */}
        <div className="flex justify-center mb-8">
          <svg width="140" height="140" viewBox="0 0 140 140" className="drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            {/* Outer Circle (Purple) */}
            <circle cx="70" cy="70" r="65" fill="none" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="8" opacity="0.5" />
            <circle
              cx="70"
              cy="70"
              r="65"
              fill="none"
              stroke="url(#purpleGradient)"
              strokeWidth="8"
              strokeDasharray="204.203 408.406"
              strokeLinecap="round"
            />

            {/* Middle Circle (Coral/Red) */}
            <circle cx="70" cy="70" r="48" fill="none" stroke="rgba(220, 38, 38, 0.2)" strokeWidth="8" opacity="0.5" />
            <circle
              cx="70"
              cy="70"
              r="48"
              fill="none"
              stroke="url(#coralGradient)"
              strokeWidth="8"
              strokeDasharray="150.796 301.593"
              strokeLinecap="round"
              transform="rotate(-50 70 70)"
            />

            {/* Center Circle */}
            <circle cx="70" cy="70" r="32" fill="#0f172a" />

            {/* S Letter */}
            <text
              x="70"
              y="75"
              fontSize="32"
              fontWeight="600"
              fill="#ffffff"
              textAnchor="middle"
              fontFamily="system-ui"
            >
              {rank}
            </text>

            {/* RANK Label */}
            <text
              x="70"
              y="102"
              fontSize="11"
              fontWeight="500"
              fill="#a78bfa"
              textAnchor="middle"
              letterSpacing="1px"
            >
              RANK
            </text>

            <defs>
              <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="1" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="coralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
                <stop offset="100%" stopColor="#dc2626" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {/* Total Views */}
          <div className="bg-slate-800/50 border border-purple-600/15 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-xl font-semibold text-white mb-1">{totalViews.toLocaleString()}</p>
            <p className="text-xs text-gray-400">Total Views</p>
          </div>

          {/* Lifespan */}
          <div className="bg-slate-800/50 border border-purple-600/15 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-xl font-semibold text-white mb-1">{lifespan}</p>
            <p className="text-xs text-gray-400">Lifespan</p>
          </div>
        </div>

        {/* View Full Analytics Button */}
        <button
          onClick={onViewAnalytics}
          className="w-full bg-purple-600/10 border border-purple-600/30 text-white py-3 rounded-xl text-sm font-medium transition-all hover:border-purple-600/50 hover:bg-purple-600/20 mb-3"
        >
          View Full Analytics
        </button>

        {/* Return to Feed Link */}
        <button
          onClick={onReturnToFeed}
          className="text-xs text-gray-500 hover:text-gray-400 transition-colors font-normal bg-none border-none p-0 cursor-pointer"
        >
          Return to Feed
        </button>
      </div>
    </div>
  );
};

export default Statics;
