"use client";

import { useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, X } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";

function formatTime(s: number) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function NowPlaying() {
  const {
    currentTrack,
    isPlaying,
    progress,
    currentTime,
    duration,
    togglePlay,
    seek,
    playNext,
    playPrev,
  } = usePlayer();
  const [dismissed, setDismissed] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  if (!currentTrack || dismissed) return null;

  function handleBarClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    seek((e.clientX - rect.left) / rect.width);
  }

  return (
    <div className="fixed bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 z-50 w-[min(580px,calc(100vw-1rem))]"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div
        className="relative overflow-hidden rounded-2xl md:rounded-3xl border-3 md:border-4 border-[#FF1480] px-4 md:px-5 py-3 md:py-4 backdrop-blur-2xl"
        style={{
          background: "rgba(9, 9, 14, 0.92)",
          boxShadow: "0 0 30px rgba(255,20,128,0.45), 0 0 60px rgba(136,0,255,0.25), 6px 6px 0 #FFD700",
        }}
      >
        {/* Subtle inner pattern */}
        <div className="absolute inset-0 pattern-dots opacity-10 rounded-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Track info row */}
          <div className="flex items-center justify-between mb-3">
            <div className="min-w-0 flex-1 pr-4">
              <span className="block text-[#FF1480] font-heading font-black text-[0.55rem] uppercase tracking-[0.35em] mb-0.5">
                Now Playing
              </span>
              <h4 className="font-heading font-black uppercase tracking-tighter text-base text-white truncate text-shadow-sm">
                {currentTrack.title}
              </h4>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-heading text-xs text-white/40 tabular-nums font-bold">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <button
                onClick={() => setDismissed(true)}
                aria-label="Close player"
                className="text-white/30 hover:text-white hover:text-[#FF1480] transition-colors p-1 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div
            ref={barRef}
            onClick={handleBarClick}
            aria-label="Seek"
            role="slider"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="w-full h-1.5 bg-white/10 rounded-full cursor-pointer mb-4 group relative"
          >
            <div
              className="h-full bg-[#FF1480] rounded-full transition-none relative"
              style={{ width: `${progress * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FF1480] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_#FF1480]" />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={playPrev}
              aria-label="Previous track"
              className="text-white/40 hover:text-[#39FF14] transition-colors cursor-pointer hover:scale-110"
            >
              <SkipBack size={22} fill="currentColor" />
            </button>

            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="w-12 h-12 rounded-full flex items-center justify-center border-4 border-[#FF1480] bg-[#FF1480] hover:scale-110 transition-transform cursor-pointer glow-accent"
            >
              {isPlaying ? (
                <Pause size={18} fill="currentColor" className="text-black" />
              ) : (
                <Play size={18} fill="currentColor" className="text-black ml-0.5" />
              )}
            </button>

            <button
              onClick={playNext}
              aria-label="Next track"
              className="text-white/40 hover:text-[#39FF14] transition-colors cursor-pointer hover:scale-110"
            >
              <SkipForward size={22} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
