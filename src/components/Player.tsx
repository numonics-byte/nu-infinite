"use client";

import { Play, Pause } from "lucide-react";
import { TRACKS, usePlayer } from "@/context/PlayerContext";


function formatTime(s: number) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function Player() {
  const { currentTrack, isPlaying, play, currentTime, duration, progress } = usePlayer();

  return (
    <section id="music" className="relative py-16 md:py-36 overflow-hidden bg-bg">
      {/* Giant background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        <span
          className="font-heading font-black uppercase text-[20vw] text-white/[0.03] leading-none tracking-tighter"
        >
          MUSIC
        </span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20 gap-4">
          <div>
            <p className="font-heading font-black uppercase tracking-[0.4em] text-[#FFD700] text-xs mb-4">
              Latest Tracks
            </p>
            <h2
              className="font-heading font-black uppercase tracking-tighter leading-none text-[clamp(3rem,9vw,7rem)] text-shadow-gold"
              style={{
                WebkitTextStroke: "2px #FFD700",
                color: "transparent",
              }}
            >
              PURE FIRE
            </h2>
          </div>
          <span className="font-body text-white/30 font-bold tracking-widest text-sm uppercase">
            [ {TRACKS.length.toString().padStart(2, "0")} TRACKS ]
          </span>
        </div>

        {/* Track list */}
        <div className="space-y-3 md:space-y-5">
          {TRACKS.map((track, i) => {
            const isActive = currentTrack?.id === track.id;
            const isThisPlaying = isActive && isPlaying;

            return (
              <div
                key={track.id}
                onClick={() => play(track)}
                className="group relative flex items-center gap-4 md:gap-8 px-4 md:px-10 py-4 md:py-7 rounded-2xl md:rounded-3xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
                style={{
                  borderWidth: 4,
                  borderStyle: "solid",
                  borderColor: isActive ? "#FF1480" : "rgba(255,20,128,0.2)",
                  backgroundColor: isActive ? "rgba(255,20,128,0.07)" : "rgba(26,8,48,0.5)",
                  boxShadow: isActive ? "0 0 20px rgba(255,20,128,0.25), 8px 8px 0 rgba(255,215,0,0.35)" : "none",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Inner pattern on active */}
                {isActive && (
                  <div className="absolute inset-0 pattern-dots opacity-10 rounded-3xl pointer-events-none" />
                )}

                {/* Track number */}
                <span
                  className="font-heading font-black text-2xl md:text-6xl tabular-nums leading-none shrink-0"
                  style={{ color: "#FFD700" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title + progress */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-black uppercase tracking-tighter text-base md:text-4xl text-white leading-none truncate group-hover:text-shadow-sm transition-all duration-300">
                    {track.title}
                  </h3>
                  {isActive && (
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-none"
                          style={{ width: `${progress * 100}%`, backgroundColor: "#FF1480" }}
                        />
                      </div>
                      <span
                        className="font-heading font-bold text-xs tabular-nums shrink-0"
                        style={{ color: "#FFD700" }}
                      >
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Play/Pause button */}
                <button
                  aria-label={isThisPlaying ? "Pause" : `Play ${track.title}`}
                  className="shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center border-3 md:border-4 transition-all duration-300 hover:scale-110"
                  style={{
                    borderColor: "#FFD700",
                    backgroundColor: isActive ? "#FF1480" : "transparent",
                    color: isActive ? "#09090E" : "#FFD700",
                  }}
                >
                  {isThisPlaying ? (
                    <Pause size={20} fill="currentColor" />
                  ) : (
                    <Play size={20} fill="currentColor" className="ml-0.5" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Streaming CTA */}
        <div className="mt-16 text-center">
          <p className="font-body text-white/40 text-sm mb-6 uppercase tracking-widest">
            Find us on
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-heading font-black uppercase tracking-widest text-xs text-white/70 border border-white/10 rounded-full px-7 py-3 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all duration-200"
              style={{ backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.03)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 11-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 01.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.973-.519.781.781 0 01.52-.973c3.632-1.102 8.147-.568 11.233 1.329a.78.78 0 01.257 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 11-.543-1.793c3.563-1.08 9.484-.871 13.223 1.327a.937.937 0 01-.063 1.623z" />
              </svg>
              Spotify
            </a>
            <a
              href="https://music.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-heading font-black uppercase tracking-widest text-xs text-white/70 border border-white/10 rounded-full px-7 py-3 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all duration-200"
              style={{ backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.03)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208A6.15 6.15 0 00.09 4.779C.03 5.17.01 5.57 0 5.96v12.08c.01.39.03.79.09 1.18.16 1.04.52 1.98 1.16 2.8.52.65 1.17 1.15 1.93 1.47.69.29 1.41.43 2.16.47.39.03.79.04 1.18.04h11.96c.39 0 .79-.01 1.18-.04.75-.04 1.47-.18 2.16-.47.76-.32 1.41-.82 1.93-1.47.64-.82 1-1.76 1.16-2.8.06-.39.08-.79.09-1.18V6.04c0-.065-.004-.13-.008-.195L23.994 6.124zm-6.854 2.522L11.92 11.9a2.28 2.28 0 01-.41.21l-3.226 1.43L6.06 14.2v-4.94l.001-.013a2.76 2.76 0 011.467-2.4l4.84-2.72a2.75 2.75 0 012.77 0l2.003 1.126a.283.283 0 01.143.25.284.284 0 01-.144.249z" />
              </svg>
              Apple Music
            </a>
            <a
              href="https://soundcloud.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-heading font-black uppercase tracking-widest text-xs text-white/70 border border-white/10 rounded-full px-7 py-3 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all duration-200"
              style={{ backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.03)" }}
            >
              SoundCloud
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
