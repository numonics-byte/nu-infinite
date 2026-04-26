"use client";

import { useEffect, useRef } from "react";

// ─── Parallax speed per layer ─────────────────────────────────────────────
// 5 layers: sky (barely moves) → foreground PNG (fastest)
const SPEEDS = [0.02, 0.07, 0.14, 0.38, 0.6];

// ─── Main component ───────────────────────────────────────────────────────
export default function FloridaParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRefs  = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));
  const rafRef     = useRef<number>(0);

  useEffect(() => {
    function update() {
      const section = sectionRef.current;
      if (!section) return;
      const rect    = section.getBoundingClientRect();
      // px the section has entered the viewport from the bottom (0 = just touched bottom edge)
      const entered = Math.max(0, window.innerHeight - rect.top);

      layerRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `translateY(${-entered * SPEEDS[i]}px)`;
      });
    }

    function onScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function layerRef(i: number) {
    return (el: HTMLDivElement | null) => { layerRefs.current[i] = el; };
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden h-[50vh] md:h-[80vh]"
      aria-hidden="true"
    >
      {/* ── Layer 0 · Sky (furthest, barely moves) ──────────────────── */}
      <div
        ref={layerRef(0)}
        className="absolute inset-0 will-change-transform"
        style={{
          background:
            "linear-gradient(180deg, #C0003C 0%, #E03200 35%, #FF6800 60%, #FFB800 80%, #FF8800 100%)",
        }}
      />

      {/* ── Layer 1 · Glowing sun + distant purple treeline ──────────── */}
      <div ref={layerRef(1)} className="absolute inset-0 will-change-transform">
        {/* Sun disc */}
        <div
          className="absolute"
          style={{
            width: 200,
            height: 200,
            background:
              "radial-gradient(circle, #FFE050 25%, #FFAA00 55%, rgba(255,130,0,0.3) 75%, transparent 90%)",
            borderRadius: "50%",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            boxShadow: "0 0 80px 30px rgba(255, 180, 0, 0.35)",
          }}
        />
        {/* Distant jagged treeline — two layers for depth */}
        <svg
          viewBox="0 0 1920 220"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,220 L0,170 C80,120 160,160 240,130 C320,100 400,145 480,115
               C560,85  640,130 720,100 C800,70  880,120 960,88
               C1040,56 1120,110 1200,80 C1280,50 1360,100 1440,72
               C1520,44 1600,95  1680,68 C1760,41 1840,88  1920,65 L1920,220 Z"
            fill="#5C1852"
            opacity="0.95"
          />
          <path
            d="M0,220 L0,190 C100,165 200,188 300,172 C400,156 500,178 600,162
               C700,146 800,172 900,158 C1000,144 1100,168 1200,154
               C1300,140 1400,165 1500,150 C1600,135 1700,160 1800,148 L1920,155 L1920,220 Z"
            fill="#3E0C30"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* ── Layer 2 · Main florida_everglades.png ────────────────────── */}
      <div ref={layerRef(2)} className="absolute inset-0 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/florida_everglades.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* ── Layer 3 · Foreground PNG (RGBA transparency) ─────────────── */}
      <div ref={layerRef(3)} className="absolute inset-0 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/foreground.png"
          alt=""
          className="absolute bottom-0 w-full h-full object-cover object-bottom"
        />
      </div>

      {/* ── Layer 4 · Bottom fade into page background ───────────────── */}
      <div
        ref={layerRef(4)}
        className="absolute inset-0 will-change-transform pointer-events-none"
      >
        {/* Irregular ground silhouette along the very bottom */}
        <svg
          viewBox="0 0 1920 240"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,240 L0,195 Q120,158 240,172 Q360,186 480,162 Q600,138 720,158
               Q840,178 960,155 Q1080,132 1200,155 Q1320,178 1440,160
               Q1560,142 1680,160 Q1800,178 1920,165 L1920,240 Z"
            fill="#09090E"
          />
        </svg>

        {/* Smooth gradient fade into the page background */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "22%",
            background: "linear-gradient(to bottom, transparent 0%, #09090E 100%)",
          }}
        />
      </div>
    </section>
  );
}
