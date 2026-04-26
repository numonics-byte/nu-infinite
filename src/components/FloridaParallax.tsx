"use client";

import { useEffect, useRef } from "react";

// ─── Layer config ─────────────────────────────────────────────────────────
// 7 layers with wide speed spread for dramatic depth separation
const LAYER_CONFIG = [
  { speed: 0.01, scale: 0,    driftX: 0    },  // 0 – sky gradient
  { speed: 0.06, scale: 0,    driftX: 0    },  // 1 – sun + distant treeline
  { speed: 0.10, scale: 0,    driftX: 0    },  // 2 – atmospheric haze
  { speed: 0.22, scale: 0.02, driftX: 0    },  // 3 – everglades midground
  { speed: 0.36, scale: 0.03, driftX: 0.02 },  // 4 – mid-depth cypress SVGs
  { speed: 0.55, scale: 0.05, driftX: 0.04 },  // 5 – foreground PNG
  { speed: 0.70, scale: 0,    driftX: 0    },  // 6 – bottom page fade
];

const LERP_FACTOR = 0.08; // smoothing factor (lower = smoother / more lag)

// ─── Main component ───────────────────────────────────────────────────────
export default function FloridaParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRefs  = useRef<(HTMLDivElement | null)[]>(Array(7).fill(null));
  const currentY   = useRef<number[]>(Array(7).fill(0));
  const targetY    = useRef<number[]>(Array(7).fill(0));
  const currentX   = useRef<number[]>(Array(7).fill(0));
  const targetX    = useRef<number[]>(Array(7).fill(0));
  const currentS   = useRef<number[]>(Array(7).fill(1));
  const targetS    = useRef<number[]>(Array(7).fill(1));
  const rafRef     = useRef<number>(0);
  const running    = useRef(true);

  useEffect(() => {
    function computeTargets() {
      const section = sectionRef.current;
      if (!section) return;
      const rect    = section.getBoundingClientRect();
      // Only start parallax once the ENTIRE section is visible
      // (rect.bottom <= viewportHeight means the bottom edge is on-screen)
      const fullyVisible = rect.bottom <= window.innerHeight;
      const scrolledPast = fullyVisible
        ? window.innerHeight - rect.bottom  // how far past fully-visible
        : 0;
      const entered  = Math.max(0, scrolledPast);
      const progress = Math.min(1, entered / section.offsetHeight);

      LAYER_CONFIG.forEach((cfg, i) => {
        targetY.current[i] = -entered * cfg.speed;
        targetX.current[i] = entered * cfg.driftX * (i % 2 === 0 ? 1 : -1);
        targetS.current[i] = 1 + progress * cfg.scale;
      });
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function animate() {
      if (!running.current) return;

      computeTargets();

      let needsUpdate = false;
      layerRefs.current.forEach((el, i) => {
        if (!el) return;

        const dy = Math.abs(targetY.current[i] - currentY.current[i]);
        const dx = Math.abs(targetX.current[i] - currentX.current[i]);
        const ds = Math.abs(targetS.current[i] - currentS.current[i]);

        if (dy > 0.1 || dx > 0.1 || ds > 0.0001) {
          needsUpdate = true;
          currentY.current[i] = lerp(currentY.current[i], targetY.current[i], LERP_FACTOR);
          currentX.current[i] = lerp(currentX.current[i], targetX.current[i], LERP_FACTOR);
          currentS.current[i] = lerp(currentS.current[i], targetS.current[i], LERP_FACTOR);
        }

        el.style.transform =
          `translate3d(${currentX.current[i]}px, ${currentY.current[i]}px, 0) scale(${currentS.current[i]})`;
      });

      if (needsUpdate) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Idle — wait for next scroll
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    // Kick off continuous animation loop
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      running.current = false;
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
      {/* ── Layer 0 · Sky gradient (furthest) ─────────────────────────── */}
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
            width: 220,
            height: 220,
            background:
              "radial-gradient(circle, #FFE050 20%, #FFAA00 50%, rgba(255,130,0,0.3) 72%, transparent 88%)",
            borderRadius: "50%",
            top: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            boxShadow: "0 0 100px 40px rgba(255, 180, 0, 0.4), 0 0 200px 80px rgba(255, 100, 0, 0.15)",
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

      {/* ── Layer 2 · Atmospheric haze (aerial perspective) ───────────── */}
      <div
        ref={layerRef(2)}
        className="absolute inset-0 will-change-transform pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(92,24,82,0.35) 0%, rgba(62,12,48,0.2) 40%, rgba(192,0,60,0.08) 70%, transparent 100%)",
        }}
      />

      {/* ── Layer 3 · Main florida_everglades.png (midground) ────────── */}
      <div ref={layerRef(3)} className="absolute inset-0 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/florida_everglades.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* ── Layer 4 · Mid-depth cypress silhouettes (SVG) ────────────── */}
      <div ref={layerRef(4)} className="absolute inset-0 will-change-transform pointer-events-none">
        <svg
          viewBox="0 0 1920 600"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
          style={{ height: "65%" }}
        >
          {/* Left cluster */}
          <path
            d="M-20,600 L-20,320 C-10,310 0,250 10,200 C15,175 20,160 25,200
               C30,240 35,180 40,150 C45,130 50,180 55,220
               C60,260 70,200 75,280 C80,340 90,350 100,360 L120,600 Z"
            fill="#1A0820"
            opacity="0.7"
          />
          {/* Left-center tree */}
          <path
            d="M280,600 L280,380 C290,360 300,290 310,240 C315,210 320,190 325,240
               C330,280 340,220 345,200 C350,180 355,230 360,270
               C370,350 380,370 390,380 L400,600 Z"
            fill="#12061A"
            opacity="0.55"
          />
          {/* Right-center tree */}
          <path
            d="M1500,600 L1500,350 C1510,330 1520,260 1530,210 C1535,185 1540,165 1545,210
               C1550,250 1560,190 1565,170 C1570,155 1575,200 1580,240
               C1590,320 1600,340 1610,350 L1620,600 Z"
            fill="#1A0820"
            opacity="0.65"
          />
          {/* Right cluster */}
          <path
            d="M1780,600 L1780,290 C1790,275 1800,210 1810,160 C1815,140 1820,125 1825,160
               C1830,200 1840,140 1845,120 C1850,105 1855,145 1860,185
               C1865,225 1875,260 1885,300 C1890,340 1900,360 1910,380 L1940,600 Z"
            fill="#12061A"
            opacity="0.6"
          />
          {/* Ground fill connecting the trees */}
          <path
            d="M0,600 L0,480 Q200,440 400,460 Q600,480 800,450 Q1000,420 1200,455
               Q1400,490 1600,460 Q1800,430 1920,470 L1920,600 Z"
            fill="#0D0414"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* ── Layer 5 · Foreground PNG (RGBA, closest to viewer) ────────── */}
      <div ref={layerRef(5)} className="absolute inset-0 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/foreground.png"
          alt=""
          className="absolute bottom-0 w-full h-full object-cover object-bottom"
        />
      </div>

      {/* ── Layer 6 · Bottom fade into page background ───────────────── */}
      <div
        ref={layerRef(6)}
        className="absolute inset-0 will-change-transform pointer-events-none"
      >
        {/* Irregular ground silhouette */}
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

        {/* Smooth gradient fade */}
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
