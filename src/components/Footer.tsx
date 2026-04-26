"use client";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Spotify",   href: "https://open.spotify.com" },
  { label: "SoundCloud",href: "https://soundcloud.com" },
  { label: "YouTube",   href: "https://youtube.com" },
];

const NAV = [
  { label: "About",    href: "#about" },
  { label: "Music",    href: "#music" },
  { label: "Bookings", href: "#bookings" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full py-12 md:py-20 border-t border-white/10 overflow-hidden bg-bg">
      {/* Giant BG text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        <span className="font-heading font-black uppercase text-[18vw] text-white/[0.025] leading-none tracking-tighter whitespace-nowrap">
          N∞
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <div>
              <div className="font-heading font-black uppercase tracking-tighter text-2xl md:text-3xl leading-none mb-1">
                <span className="text-[#FF1480]">NUMONICS</span>
                <span className="text-[#FFD700]"> + </span>
                <span className="text-white">THE INFINITE</span>
              </div>
              <p className="font-heading font-black uppercase tracking-[0.4em] text-white/30 text-xs mt-2">
                Drum & Bass
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {SOCIALS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading font-black text-[0.7rem] uppercase tracking-widest text-white/40 hover:text-[#FF1480] transition-colors duration-200 cursor-pointer"
                >
                  {label}
                </a>
              ))}
            </div>

            <p className="font-body text-white/20 text-xs">
              &copy;{year} Numonics + The Infinite. All rights reserved.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <p className="font-heading font-black uppercase tracking-[0.3em] text-[#FFD700] text-xs mb-2">
              Navigate
            </p>
            {NAV.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="font-heading font-black uppercase tracking-widest text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4 items-start md:items-end">
            <p className="font-body text-white/50 text-sm max-w-xs md:text-right leading-relaxed">
              Heavy basslines, relentless rhythm.
            </p>
            <a
              href="#bookings"
              className="font-heading font-black uppercase tracking-widest text-sm text-white rounded-full px-8 h-12 flex items-center border border-[#FF1480]/40 hover:border-[#FF1480]/70 hover:bg-[#FF1480]/10 transition-all duration-200"
              style={{ backdropFilter: "blur(12px)", background: "rgba(255,20,128,0.08)" }}
            >
              BOOK NOW
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
