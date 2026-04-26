import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Background: hero image ── */}
      <Image
        src="/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
        className="object-cover object-center"
        style={{ zIndex: 0 }}
      />

      {/* ── Gradient overlays for text readability ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(9,9,14,0.55) 0%, rgba(9,9,14,0.15) 35%, rgba(9,9,14,0.6) 65%, rgba(9,9,14,0.97) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Main content ── */}
      <div
        className="relative mt-auto px-6 md:px-12 pb-20 md:pb-28 pt-36 text-center max-w-7xl mx-auto w-full"
        style={{ zIndex: 4 }}
      >


        {/* Hero heading — three stacked lines */}
        <h1 className="font-heading font-black uppercase leading-none tracking-tighter mb-8">
          <span
            className="block text-[clamp(3.5rem,13vw,10rem)] text-white text-shadow-xl"
          >
            NUMONICS
          </span>
          <span
            className="block text-[clamp(2.5rem,9vw,7rem)] text-[#FFD700] text-shadow-gold"
            style={{ lineHeight: "0.85" }}
          >
            +
          </span>
          <span
            className="block text-[clamp(2.2rem,10vw,7.5rem)] gradient-text"
          >
            THE INFINITE
          </span>
        </h1>

        {/* Tagline */}
        <p className="font-body text-lg md:text-2xl text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
          Heavy basslines. Relentless rhythm.
          <br />
          <span className="text-[#FF1480] font-bold whitespace-nowrap">Pure Drum &amp; Bass.</span>
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#music"
            className="flex items-center gap-2 font-heading font-black uppercase tracking-widest text-sm text-white rounded-full px-10 h-14 border border-white/20 hover:border-[#FF1480]/60 hover:bg-[#FF1480]/10 transition-all duration-300"
            style={{ backdropFilter: "blur(16px)", background: "rgba(255,20,128,0.08)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            LISTEN NOW
          </a>
          <a
            href="#bookings"
            className="flex items-center font-heading font-black uppercase tracking-widest text-sm text-white/60 rounded-full px-10 h-14 border border-white/10 hover:border-white/25 hover:text-white hover:bg-white/5 transition-all duration-300"
            style={{ backdropFilter: "blur(16px)", background: "rgba(255,255,255,0.03)" }}
          >
            BOOK US
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-subtle"
        style={{ zIndex: 4 }}
        aria-hidden="true"
      >
        <span className="text-white/30 font-heading text-[0.6rem] uppercase tracking-[0.4em]">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="6" y="4" width="4" height="8" rx="2" fill="#FF1480" />
          <rect x="0" y="0" width="16" height="24" rx="8" stroke="#FF1480" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </section>
  );
}
