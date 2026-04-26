"use client";

import { useState } from "react";

const INQUIRY_TYPES = [
  "Live Performance / DJ Set",
  "Custom Production",
  "Licensing & Sync",
  "Collaboration",
  "Other",
];

const SERVICES = [
  { label: "Live Performance", desc: "Full DJ sets and live PA for clubs, festivals, and events." },
  { label: "Custom Production", desc: "Original DnB tracks built from scratch for your project." },
  { label: "Licensing & Sync", desc: "Music for film, TV, commercials, and games." },
  { label: "Collaboration", desc: "Artist features, remixes, and co-production sessions." },
];

export default function Bookings() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="bookings" className="relative py-16 md:py-36 overflow-hidden bg-bg">
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="font-heading font-black uppercase tracking-[0.4em] text-[#FF1480] text-xs mb-4">
            Inquiries
          </p>
          <h2 className="font-heading font-black uppercase tracking-tighter text-[clamp(3rem,9vw,7rem)] leading-none text-shadow-orange text-white mb-6">
            BOOK US
          </h2>
          <p className="font-body text-white/60 text-xl max-w-xl mx-auto leading-relaxed">
            Ready to bring Numonics + The Infinite to your stage, studio, or screen?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left: Services ── */}
          <div>
            <h3 className="font-heading font-black uppercase tracking-tighter text-2xl text-[#FFD700] text-shadow-gold mb-8">
              WHAT WE DO
            </h3>
            <div className="space-y-5">
              {SERVICES.map((svc, i) => {
                const colors = ["#FF1480", "#FFD700", "#FF1480", "#FFD700"];
                const accent = colors[i % colors.length];
                return (
                  <div
                    key={svc.label}
                    className="flex gap-4 p-4 md:p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      borderColor: `${accent}30`,
                      backgroundColor: `${accent}08`,
                    }}
                  >
                    <div>
                      <h4
                        className="font-heading font-black uppercase tracking-tight text-base mb-1"
                        style={{ color: accent }}
                      >
                        {svc.label}
                      </h4>
                      <p className="font-body text-white/60 text-sm leading-relaxed">
                        {svc.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div
            className="relative rounded-3xl p-6 md:p-10"
            style={{
              backdropFilter: "blur(20px)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >

            <div className="relative z-10">
              {status === "sent" ? (
                <div className="text-center py-10">
                  <span className="block text-6xl mb-6 animate-bounce-subtle" aria-hidden="true">
                    ✦
                  </span>
                  <h3 className="font-heading font-black uppercase tracking-tighter text-3xl text-[#FFD700] text-shadow-gold mb-3">
                    MESSAGE SENT
                  </h3>
                  <p className="font-body text-white/60 mb-8">
                    We&apos;ll get back to you shortly. Stay tuned.
                  </p>
                  <button
                    onClick={() => { setStatus("idle"); setForm({ name: "", email: "", type: "", message: "" }); }}
                    className="font-heading font-black uppercase tracking-widest text-sm text-white/70 rounded-full px-8 h-12 border border-white/15 hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
                    style={{ backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.04)" }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-heading font-black uppercase tracking-tighter text-2xl text-white text-shadow-md mb-8">
                    GET IN TOUCH
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="font-heading font-black text-[0.65rem] uppercase tracking-[0.3em] text-[#FF1480]">
                          Name
                        </label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="bg-[#09090E] border-4 border-[#FF1480]/40 focus:border-[#FF1480] rounded-2xl px-5 py-3.5 text-white font-body text-base placeholder:text-white/20 outline-none transition-colors duration-200 focus:shadow-[0_0_15px_rgba(255,20,128,0.3)]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-heading font-black text-[0.65rem] uppercase tracking-[0.3em] text-[#FFD700]">
                          Email
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="bg-[#09090E] border-4 border-[#FFD700]/40 focus:border-[#FFD700] rounded-2xl px-5 py-3.5 text-white font-body text-base placeholder:text-white/20 outline-none transition-colors duration-200"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-heading font-black text-[0.65rem] uppercase tracking-[0.3em] text-[#FF1480]">
                        Inquiry Type
                      </label>
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="bg-[#09090E] border-4 border-[#FF1480]/40 focus:border-[#FF1480] rounded-2xl px-5 py-3.5 text-white font-body text-base outline-none transition-colors duration-200 appearance-none cursor-pointer"
                      >
                        <option value="">Select inquiry type</option>
                        {INQUIRY_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-heading font-black text-[0.65rem] uppercase tracking-[0.3em] text-[#FFD700]">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your project, event, or vision..."
                        className="bg-[#09090E] border-4 border-[#FFD700]/40 focus:border-[#FFD700] rounded-2xl px-5 py-3.5 text-white font-body text-base placeholder:text-white/20 outline-none transition-colors duration-200 resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <p className="font-body text-[#FF1480] text-sm border-2 border-[#FF1480]/40 rounded-xl px-4 py-2">
                        Something went wrong. Please try again.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full font-heading font-black uppercase tracking-widest text-sm text-white rounded-full h-14 border border-[#FF1480]/40 hover:border-[#FF1480]/70 hover:bg-[#FF1480]/10 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer mt-2"
                      style={{ backdropFilter: "blur(12px)", background: "rgba(255,20,128,0.08)" }}
                    >
                      {status === "sending" ? "SENDING..." : "SEND INQUIRY"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
