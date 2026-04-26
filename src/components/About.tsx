export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-36 overflow-hidden bg-bg">
      {/* Background pattern layers */}
      <div className="absolute inset-0 pattern-stripes pointer-events-none" />
      <div className="absolute inset-0 pattern-mesh pointer-events-none" />

      {/* Floating decorative images */}
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src="/float-gun.png"
        alt=""
        aria-hidden="true"
        className="hidden sm:block absolute top-12 left-[3%] w-16 md:w-24 animate-spin-slow select-none pointer-events-none object-contain"
      />
      <img
        src="/float-speaker.png"
        alt=""
        aria-hidden="true"
        className="hidden sm:block absolute top-[45%] right-[2%] w-16 md:w-24 animate-float select-none pointer-events-none object-contain"
      />
      <img
        src="/float-plant.png"
        alt=""
        aria-hidden="true"
        className="hidden sm:block absolute bottom-16 left-[6%] w-14 md:w-20 animate-wiggle select-none pointer-events-none object-contain"
      />
      <img
        src="/float-florida.png"
        alt=""
        aria-hidden="true"
        className="hidden sm:block absolute bottom-20 right-[8%] w-16 md:w-24 animate-bounce-subtle select-none pointer-events-none object-contain"
      />
      {/* eslint-enable @next/next/no-img-element */}

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="font-heading font-black uppercase tracking-[0.4em] text-[#39FF14] text-xs mb-4">
            The Duo
          </p>
          <h2 className="font-heading font-black uppercase tracking-tighter text-shadow-lg text-[clamp(3rem,8vw,7rem)] leading-none text-white">
            WHO WE ARE
          </h2>
        </div>

        {/* Artist cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

          {/* ── Numonics card ── */}
          <div className="relative bg-[#1A0830]/80 backdrop-blur-sm border-4 border-[#FF1480] rounded-3xl p-6 md:p-12 sm:rotate-1 sm:hover:rotate-2 hover:scale-[1.02] transition-all duration-300 shadow-hard">
            {/* Inner pattern */}
            <div className="absolute inset-0 pattern-dots opacity-15 rounded-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <span className="inline-block bg-[#FF1480] text-black font-heading font-black text-xs uppercase tracking-[0.3em] px-4 py-2 rounded-full border-2 border-[#FFD700]">
                  Producer
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/float-gator.png"
                  alt=""
                  aria-hidden="true"
                  className="w-14 md:w-20 animate-float object-contain"
                />
              </div>

              <h3 className="font-heading font-black uppercase tracking-tighter text-[clamp(2rem,5vw,3.5rem)] leading-none text-white text-shadow-md mb-6">
                NUMONICS
              </h3>

              <div className="w-16 h-1.5 bg-[#FF1480] mb-6 rounded-full" />

              <p className="font-body text-white/80 text-base md:text-lg leading-relaxed">
                Multi-platinum producer from South Florida, now operating out of Dallas, TX.
                Credits span hip-hop heavyweights, A24 films, HBO, NBC, TNT, and global events
                including the Olympics and the Super Bowl. As one half of Numonics + The Infinite,
                he channels decades of sonic architecture into a new chapter — pure Drum & Bass.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {["Dallas TX", "Multi-Platinum", "Sync / Film", "Hip-Hop"].map((tag) => (
                  <span
                    key={tag}
                    className="font-heading font-black text-[0.65rem] uppercase tracking-widest text-[#FF1480] border-2 border-[#FF1480]/40 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── George The Infinite card ── */}
          <div className="relative bg-[#0A1A08]/80 backdrop-blur-sm border-4 border-[#39FF14] rounded-3xl p-6 md:p-12 sm:-rotate-1 md:translate-y-8 sm:hover:-rotate-2 hover:scale-[1.02] transition-all duration-300 shadow-hard-green">
            {/* Inner pattern */}
            <div className="absolute inset-0 pattern-dots-green opacity-15 rounded-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <span className="inline-block bg-[#39FF14] text-[#09090E] font-heading font-black text-xs uppercase tracking-[0.3em] px-4 py-2 rounded-full border-2 border-[#8800FF]">
                  Producer & DJ
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/float-face.png"
                  alt=""
                  aria-hidden="true"
                  className="w-14 md:w-20 animate-float-reverse object-contain"
                />
              </div>

              <h3 className="font-heading font-black uppercase tracking-tighter text-[clamp(1.6rem,4vw,2.8rem)] leading-none text-white text-shadow-green mb-6">
                GEORGE THE INFINITE
              </h3>

              <div className="w-16 h-1.5 bg-[#39FF14] mb-6 rounded-full" />

              <p className="font-body text-white/80 text-base md:text-lg leading-relaxed">
                A Drum & Bass producer and DJ with roots deep in the underground scene.
                His sound moves between liquid soul and high-octane jump-up, with an obsessive
                attention to sub bass design and rhythmic tension. As one half of Numonics + The
                Infinite, he brings technical fire and floor-tested instinct to every track.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {["Drum & Bass", "Liquid DnB", "Jump-Up", "DJ Sets"].map((tag) => (
                  <span
                    key={tag}
                    className="font-heading font-black text-[0.65rem] uppercase tracking-widest text-[#39FF14] border-2 border-[#39FF14]/40 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
