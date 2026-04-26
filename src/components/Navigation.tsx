"use client";

import { useState } from "react";

const NAV_LINKS = [
  { href: "#about",    label: "About" },
  { href: "#music",    label: "Music" },
  { href: "#bookings", label: "Bookings" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 z-50 bg-[#09090E]/85 backdrop-blur-xl border-b-4 border-[#FF1480]">
      <div className="flex justify-between items-center px-5 md:px-10 py-4">

        {/* Logo: animated soundwave + wordmark */}
        <a href="#" aria-label="Numonics + The Infinite — back to top" className="flex items-center gap-3">
          <svg width="52" height="32" viewBox="0 0 78 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect className="sw-bar" x="0"  y="20" width="5" height="8"  fill="#FF1480" style={{ animationDelay: "0.00s" }} />
            <rect className="sw-bar" x="8"  y="12" width="5" height="24" fill="#FFD700" style={{ animationDelay: "0.15s" }} />
            <rect className="sw-bar" x="16" y="4"  width="5" height="40" fill="#FF1480" style={{ animationDelay: "0.30s" }} />
            <rect className="sw-bar" x="24" y="8"  width="5" height="32" fill="#FFD700" style={{ animationDelay: "0.10s" }} />
            <rect className="sw-bar" x="32" y="0"  width="5" height="48" fill="#FF1480" style={{ animationDelay: "0.45s" }} />
            <rect className="sw-bar" x="40" y="6"  width="5" height="36" fill="#FF1480" style={{ animationDelay: "0.20s" }} />
            <rect className="sw-bar" x="48" y="14" width="5" height="20" fill="#FFD700" style={{ animationDelay: "0.55s" }} />
            <rect className="sw-bar" x="56" y="2"  width="5" height="44" fill="#FF1480" style={{ animationDelay: "0.35s" }} />
            <rect className="sw-bar" x="64" y="10" width="5" height="28" fill="#FFD700" style={{ animationDelay: "0.05s" }} />
            <rect className="sw-bar" x="72" y="18" width="5" height="12" fill="#FF1480" style={{ animationDelay: "0.40s" }} />
          </svg>
          <div className="hidden sm:block font-heading font-black text-sm md:text-base uppercase leading-none tracking-tighter">
            <span className="text-[#FF1480]">NUMONICS</span>
            <span className="text-[#FFD700]"> + </span>
            <span className="text-white">THE INFINITE</span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-10 items-center">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-heading font-black uppercase tracking-widest text-sm text-white hover:text-[#FF1480] transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Book Us CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#bookings"
            className="hidden md:flex items-center font-heading font-black uppercase tracking-widest text-sm text-white rounded-full px-5 py-2 border border-[#FF1480]/40 hover:border-[#FF1480]/70 hover:bg-[#FF1480]/10 transition-all duration-200"
            style={{ backdropFilter: "blur(12px)", background: "rgba(255,20,128,0.08)" }}
          >
            BOOK US
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer"
          >
            <span
              className={`block w-6 h-0.5 bg-[#FF1480] transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white/50 transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#FF1480] transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t-4 border-[#FF1480] bg-[#09090E] pattern-dots">
          {NAV_LINKS.map(({ href, label }, i) => {
            const colors = ["#FF1480", "#FFD700", "#FF1480"];
            return (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-5 font-heading font-black uppercase tracking-widest text-white border-b-2 border-dashed border-white/10 hover:text-black transition-colors cursor-pointer text-lg"
                style={{ backgroundColor: menuOpen ? "transparent" : undefined }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors[i % 3])}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {label}
              </a>
            );
          })}
          <a
            href="#bookings"
            onClick={() => setMenuOpen(false)}
            className="block mx-6 my-4 text-center font-heading font-black uppercase tracking-widest text-white rounded-full px-5 py-3 border border-[#FF1480]/40 hover:bg-[#FF1480]/10 transition-all duration-200"
            style={{ backdropFilter: "blur(12px)", background: "rgba(255,20,128,0.08)" }}
          >
            BOOK US
          </a>
        </div>
      )}
    </nav>
  );
}
