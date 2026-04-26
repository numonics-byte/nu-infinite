const ITEMS = [
  "DRUM & BASS",
  "NUMONICS",
  "THE INFINITE",
  "HEAVY BASSLINES",
  "PURE ENERGY",
  "SOUTH FLORIDA",
  "DALLAS TX",
  "UNDERGROUND SOUND",
  "ROLLING BEATS",
  "INFINITE FREQUENCIES",
];

export default function TickerStrip() {
  const repeated = [...ITEMS, ...ITEMS];

  return (
    <div
      className="w-full overflow-hidden border-y-4 border-[#FFD700] py-3.5 relative"
      style={{ background: "#FF1480" }}
      aria-hidden="true"
    >
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{
          animation: "marquee 22s linear infinite",
          width: "max-content",
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="font-heading font-black uppercase tracking-widest text-white text-sm md:text-base inline-flex items-center gap-8"
          >
            {item}
            <span className="text-[#FFD700] text-lg">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
